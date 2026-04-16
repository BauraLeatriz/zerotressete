# zerotressete — Guia Detalhado de Implementação

## Status Atual

✅ **Concluído:**
- Hub principal com design cyberpunk holográfico
- 4 páginas: Home, Tech, Dev, Garage
- Backend Node.js + Express + tRPC
- Banco de dados MySQL/TiDB
- Autenticação OAuth integrada

---

## ETAPA 1: Backend de Agendamento (Resend)

### 1.1 Criar conta no Resend

1. Acesse [resend.com](https://resend.com)
2. Clique em **Sign Up**
3. Preencha com seu e-mail
4. Confirme o e-mail
5. Vá para **Settings** → **API Keys**
6. Copie a chave (começa com `re_`)

### 1.2 Adicionar a chave ao Manus

1. No painel do Manus, clique em **Settings** → **Secrets**
2. Clique em **Add Secret**
3. Preencha:
   - **Key:** `RESEND_API_KEY`
   - **Value:** Cole a chave que você copiou
4. Clique em **Save**

### 1.3 Instalar Resend no projeto

Execute no terminal:
```bash
cd /home/ubuntu/zerotressete
pnpm add resend
```

### 1.4 Criar um tipo para agendamentos

Edite `drizzle/schema.ts` e adicione no final:

```ts
export const schedules = mysqlTable("schedules", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  device: varchar("device", { length: 255 }).notNull(),
  problem: text("problem").notNull(),
  preferredDate: varchar("preferredDate", { length: 10 }),
  status: mysqlEnum("status", ["pendente", "confirmado", "concluído"]).default("pendente").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Schedule = typeof schedules.$inferSelect;
export type InsertSchedule = typeof schedules.$inferInsert;
```

Depois execute:
```bash
pnpm db:push
```

### 1.5 Criar função de envio de e-mail

Crie o arquivo `server/email.ts`:

```ts
import { Resend } from "resend";
import { ENV } from "./_core/env";

const resend = new Resend(ENV.resendApiKey);

export async function sendScheduleConfirmation(email: string, data: {
  name: string;
  device: string;
  problem: string;
  preferredDate?: string;
}) {
  try {
    const result = await resend.emails.send({
      from: "noreply@zerotressete.com",
      to: email,
      subject: "Agendamento recebido - zerotressete tech",
      html: `
        <h2>Olá ${data.name},</h2>
        <p>Recebemos sua solicitação de agendamento!</p>
        <h3>Detalhes:</h3>
        <ul>
          <li><strong>Dispositivo:</strong> ${data.device}</li>
          <li><strong>Problema:</strong> ${data.problem}</li>
          <li><strong>Data preferida:</strong> ${data.preferredDate || "A definir"}</li>
        </ul>
        <p>Entraremos em contato em até 24h para confirmar.</p>
        <p>Obrigado!</p>
      `,
    });

    return result;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw error;
  }
}

export async function sendScheduleNotification(ownerEmail: string, data: {
  name: string;
  email: string;
  phone?: string;
  device: string;
  problem: string;
  preferredDate?: string;
}) {
  try {
    const result = await resend.emails.send({
      from: "noreply@zerotressete.com",
      to: ownerEmail,
      subject: `Nova solicitação de agendamento - ${data.device}`,
      html: `
        <h2>Nova solicitação de agendamento</h2>
        <h3>Cliente:</h3>
        <ul>
          <li><strong>Nome:</strong> ${data.name}</li>
          <li><strong>E-mail:</strong> ${data.email}</li>
          <li><strong>Telefone:</strong> ${data.phone || "Não informado"}</li>
        </ul>
        <h3>Serviço:</h3>
        <ul>
          <li><strong>Dispositivo:</strong> ${data.device}</li>
          <li><strong>Problema:</strong> ${data.problem}</li>
          <li><strong>Data preferida:</strong> ${data.preferredDate || "A definir"}</li>
        </ul>
      `,
    });

    return result;
  } catch (error) {
    console.error("Erro ao enviar notificação:", error);
    throw error;
  }
}
```

### 1.6 Adicionar a chave ao env.ts

Edite `server/_core/env.ts` e adicione:

```ts
export const ENV = {
  // ... outras variáveis
  resendApiKey: process.env.RESEND_API_KEY,
  ownerEmail: process.env.OWNER_EMAIL || "seu-email@example.com",
};
```

### 1.7 Criar o endpoint de agendamento

Edite `server/routers.ts` e adicione:

```ts
import { z } from "zod";
import { publicProcedure } from "./_core/trpc";
import { sendScheduleConfirmation, sendScheduleNotification } from "./email";
import { getDb } from "./db";
import { schedules } from "../drizzle/schema";
import { ENV } from "./_core/env";

export const appRouter = router({
  // ... routers existentes
  
  schedule: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          email: z.string().email(),
          phone: z.string().optional(),
          device: z.string().min(1),
          problem: z.string().min(1),
          date: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) throw new Error("Database not available");

        // Salvar no banco de dados
        await db.insert(schedules).values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          device: input.device,
          problem: input.problem,
          preferredDate: input.date,
        });

        // Enviar e-mail para o cliente
        await sendScheduleConfirmation(input.email, {
          name: input.name,
          device: input.device,
          problem: input.problem,
          preferredDate: input.date,
        });

        // Enviar notificação para o dono
        await sendScheduleNotification(ENV.ownerEmail, {
          name: input.name,
          email: input.email,
          phone: input.phone,
          device: input.device,
          problem: input.problem,
          preferredDate: input.date,
        });

        return { success: true };
      }),
  }),
});
```

### 1.8 Atualizar o formulário no frontend

Edite `client/src/pages/Tech.tsx` e substitua a função `handleSubmit`:

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSubmitting(true);
  try {
    await trpc.schedule.create.mutate({
      name: form.name,
      email: form.email,
      phone: form.phone,
      device: form.device,
      problem: form.problem,
      date: form.date,
    });
    toast.success("Agendamento enviado com sucesso!", {
      description: "Você receberá um e-mail de confirmação em breve.",
    });
    setForm({ name: "", email: "", phone: "", device: "", problem: "", date: "" });
  } catch (error) {
    toast.error("Erro ao enviar agendamento", {
      description: "Tente novamente mais tarde.",
    });
  } finally {
    setSubmitting(false);
  }
};
```

Também adicione no topo do arquivo:
```tsx
import { trpc } from "@/lib/trpc";
```

### 1.9 Adicionar o e-mail do dono

No painel do Manus, vá para **Settings** → **Secrets** e adicione:
- **Key:** `OWNER_EMAIL`
- **Value:** Seu e-mail (ex: seu-email@gmail.com)

---

## ETAPA 2: Galeria de Fotos para Garage

### 2.1 Preparar as fotos

1. Tire fotos dos seus projetos (Fusca, CNC, impressora 3D, etc.)
2. Redimensione para ~1200x800px
3. Comprima em [tinypng.com](https://tinypng.com)

### 2.2 Upload das fotos

Execute no terminal:
```bash
manus-upload-file /caminho/para/foto1.jpg /caminho/para/foto2.jpg
```

Você receberá URLs como:
```
https://d2xsxph8kpxj0f.cloudfront.net/...../foto1.webp
https://d2xsxph8kpxj0f.cloudfront.net/...../foto2.webp
```

### 2.3 Criar componente de galeria

Crie `client/src/components/Gallery.tsx`:

```tsx
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryProps {
  images: Array<{ url: string; title: string }>;
  projectTitle: string;
}

export function Gallery({ images, projectTitle }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % images.length);
  };

  return (
    <>
      {/* Grid de miniaturas */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            className="cursor-pointer overflow-hidden rounded-lg h-48 md:h-56 transition-transform hover:scale-105"
            style={{ border: "1px solid oklch(1 0 0 / 0.06)" }}
          >
            <img
              src={img.url}
              alt={img.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            {/* Imagem */}
            <img
              src={images[selectedIndex].url}
              alt={images[selectedIndex].title}
              className="w-full rounded-lg"
            />

            {/* Título */}
            <p className="text-white text-center mt-4 text-sm">
              {images[selectedIndex].title} ({selectedIndex + 1} de {images.length})
            </p>

            {/* Botão fechar */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            {/* Botões de navegação */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
```

### 2.4 Usar a galeria na página Garage

Edite `client/src/pages/Garage.tsx` e adicione no topo:

```tsx
import { Gallery } from "@/components/Gallery";
```

Depois, na seção de projetos de carros, substitua o card do Fusca por:

```tsx
<div
  className="p-6 rounded-lg transition-all duration-300"
  style={{
    background: "oklch(0.12 0.025 265 / 0.9)",
    border: `1px solid ${ACCENT_BORDER}`,
  }}
>
  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Syne', sans-serif", color: "oklch(0.95 0.005 265)" }}>
    Fusca 1972 — Restauração Completa
  </h3>
  <p className="text-sm leading-relaxed opacity-55 mb-4" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
    Restauração do zero de um Fusca 1972. Motor, lataria, pintura, interior e elétrica completamente renovados.
  </p>
  
  <Gallery
    projectTitle="Fusca 1972"
    images={[
      { url: "https://seu-cdn-url/fusca-motor.webp", title: "Motor preparado" },
      { url: "https://seu-cdn-url/fusca-lataria.webp", title: "Lataria restaurada" },
      { url: "https://seu-cdn-url/fusca-interior.webp", title: "Interior renovado" },
    ]}
  />
</div>
```

---

## ETAPA 3: Configurar Subdomínios

### 3.1 Onde você registrou o domínio?

Você precisa acessar o painel de controle do seu registrador. Qual é? (GoDaddy, Namecheap, Hostinger, etc.)

### 3.2 Adicionar registros CNAME

No painel do seu registrador, vá para **DNS** ou **Gerenciar DNS** e adicione:

```
Tipo: CNAME
Nome: tech
Valor: zerotressete.manus.space

Tipo: CNAME
Nome: dev
Valor: zerotressete.manus.space

Tipo: CNAME
Nome: garage
Valor: zerotressete.manus.space
```

### 3.3 Configurar no Manus

1. No painel do Manus, vá para **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite `tech.zerotressete.com`
4. Siga as instruções para verificar
5. Repita para `dev.zerotressete.com` e `garage.zerotressete.com`

### 3.4 Adicionar redirecionamentos automáticos

Edite `client/src/App.tsx` e adicione no topo:

```tsx
import { useEffect } from "react";

function useSubdomainRedirect() {
  useEffect(() => {
    const hostname = window.location.hostname;
    
    if (hostname.startsWith("tech.")) {
      window.location.pathname = "/tech";
    } else if (hostname.startsWith("dev.")) {
      window.location.pathname = "/dev";
    } else if (hostname.startsWith("garage.")) {
      window.location.pathname = "/garage";
    }
  }, []);
}
```

E use no componente `App`:

```tsx
function App() {
  useSubdomainRedirect();
  
  return (
    // ... resto do código
  );
}
```

---

## Checklist de Implementação

### Etapa 1: Backend de Agendamento
- [ ] Criar conta no Resend
- [ ] Copiar API Key
- [ ] Adicionar `RESEND_API_KEY` ao Manus Secrets
- [ ] Instalar `pnpm add resend`
- [ ] Adicionar tabela `schedules` em `drizzle/schema.ts`
- [ ] Executar `pnpm db:push`
- [ ] Criar `server/email.ts`
- [ ] Atualizar `server/_core/env.ts`
- [ ] Adicionar router em `server/routers.ts`
- [ ] Atualizar formulário em `client/src/pages/Tech.tsx`
- [ ] Adicionar `OWNER_EMAIL` ao Manus Secrets
- [ ] Testar agendamento

### Etapa 2: Galeria de Fotos
- [ ] Tirar fotos dos projetos
- [ ] Comprimir em tinypng.com
- [ ] Upload com `manus-upload-file`
- [ ] Criar `client/src/components/Gallery.tsx`
- [ ] Integrar galeria em `client/src/pages/Garage.tsx`
- [ ] Testar lightbox

### Etapa 3: Subdomínios
- [ ] Adicionar registros CNAME no registrador
- [ ] Configurar domínios no Manus
- [ ] Adicionar redirecionamentos em `App.tsx`
- [ ] Testar subdomínios

---

## Dúvidas Frequentes

**P: Como faço para testar o agendamento localmente?**
R: O formulário funcionará normalmente. Os e-mails serão enviados de verdade se a `RESEND_API_KEY` estiver configurada.

**P: Posso usar outro serviço de e-mail em vez de Resend?**
R: Sim! Você pode usar SendGrid, Mailgun, ou até SMTP direto. Basta adaptar o `server/email.ts`.

**P: Os subdomínios precisam estar em registradores diferentes?**
R: Não. Todos os subdomínios apontam para o mesmo servidor (zerotressete.manus.space).

**P: Quanto custa Resend?**
R: Grátis até 100 e-mails por dia. Depois disso, $20/mês para 50k e-mails.

---

## Próximos Passos Sugeridos

Depois de implementar as 3 etapas, você pode:

1. **Adicionar pagamento com Stripe** — para cobrar pelos serviços de tech
2. **Integrar calendário** — Google Calendar ou Calendly para agendamentos
3. **Criar dashboard admin** — para gerenciar agendamentos e projetos
4. **Adicionar chat em tempo real** — para comunicação com clientes
5. **Configurar analytics** — para acompanhar visitantes e conversões

---

**Precisa de ajuda com alguma etapa? Me avise!**
