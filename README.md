# 037 — zerotressete

> Três universos. Uma identidade. Eletrônica, software e mecânica.

Hub de projetos pessoais construído com React + Node.js. Dividido em três áreas:

- **[tech]** Consertos e manutenção de eletrônicos — notebooks, desktops, consoles, eletrônica geral
- **[dev]** Portfólio de desenvolvimento — projetos em JavaScript e Node.js
- **[garage]** Projetos maker, Arduino, impressão 3D e preparação de carros

---

## Stack

**Frontend**
- React + JavaScript (Vite)
- Tailwind CSS
- tRPC client
- Wouter (roteamento)

**Backend**
- Node.js + Express
- tRPC
- Drizzle ORM + SQLite
- Resend (e-mails)
- Zod (validação)

---

## Estrutura

```
zerotressete/
├── client/
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx       # Hub principal
│       │   ├── Tech.jsx       # Consertos eletrônicos
│       │   ├── Dev.jsx        # Portfólio dev
│       │   └── Garage.jsx     # Projetos maker
│       └── components/
│           └── Gallery.jsx    # Galeria com lightbox
├── server/
│   ├── routers.js             # tRPC — agendamentos
│   ├── email.js               # Envio via Resend
│   ├── schema.js              # Drizzle schema
│   └── env.js                 # Variáveis de ambiente
└── index.html
```

---

## Rodando localmente

**Pré-requisitos:** Node.js 18+, npm

```bash
# Clone o repositório
git clone https://github.com/BauraLeatriz/zerotressete.git
cd zerotressete

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com sua RESEND_API_KEY e OWNER_EMAIL

# Rode em modo desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173`

---

## Variáveis de ambiente

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
OWNER_EMAIL=seu@email.com
NODE_ENV=development
```

---

## Deploy

- **Frontend:** Vercel (deploy automático a cada push)
- **Backend:** Railway
- **Domínio:** GoDaddy → apontado para Vercel via DNS

---

## Projetos em destaque

| Projeto | Descrição | Status |
|---|---|---|
| zerotressete hub | Este site — vibe code com Manus AI + customização manual | ✅ Live |
| Linha Cidadã | API REST para gestão de demandas cidadãs (curso) | 🔧 Em desenvolvimento |
| Gol G3 Oni | Preparação e personalização do Gol G3 | 🚗 Em andamento |

---

## Autor

**Laura Beatriz (Baura)** — dev em formação, Minas Gerais 🌿

- GitHub: [@BauraLeatriz](https://github.com/BauraLeatriz)
- Instagram: [@zerotressete](https://instagram.com/zerotressete)

---

<sub>Feito com vibe code, café e muito multímetro.</sub>
