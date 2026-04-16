# zerotressete — Guia de Implementação

## Visão Geral

Você tem um hub único em `zerotressete.com` com 4 rotas:
- `/` — Hub principal
- `/tech` — Consertos eletrônicos
- `/dev` — Portfólio de desenvolvimento
- `/garage` — Projetos maker e carros

Os subdomínios (`tech.zerotressete`, `dev.zerotressete`, `garage.zerotressete`) redirecionam para essas rotas.

---

## ETAPA 1: Backend de Agendamento para Tech

### O que será feito?

Atualmente, o formulário de agendamento em `/tech` funciona localmente (mostra um toast de sucesso, mas não envia nada). Vamos conectar a um serviço real de e-mail para que você receba as solicitações.

### Opções de Serviço

| Serviço | Custo | Facilidade | Melhor Para |
|---------|-------|-----------|------------|
| **Resend** | Grátis até 100/dia | ⭐⭐⭐ Muito fácil | Pequenas empresas |
| **EmailJS** | Grátis até 200/mês | ⭐⭐⭐ Muito fácil | Sem backend |
| **Stripe Emails** | Grátis (com Stripe) | ⭐⭐ Médio | Se usar Stripe depois |
| **Backend customizado** | Depende | ⭐ Difícil | Máximo controle |

**Recomendação:** Usar **Resend** — é gratuito, super simples e profissional.

---

### Passo 1: Criar conta no Resend

1. Acesse [resend.com](https://resend.com)
2. Clique em "Sign Up"
3. Crie uma conta com seu e-mail
4. Confirme o e-mail
5. Vá para **Settings** → **API Keys**
6. Copie a chave (começa com `re_...`)

### Passo 2: Adicionar a chave ao projeto

No painel de gerenciamento do Manus:
1. Clique em **Settings** → **Secrets**
2. Clique em **Add Secret**
3. Nome: `RESEND_API_KEY`
4. Valor: Cole a chave que você copiou
5. Clique em **Save**

### Passo 3: Modificar o formulário de Tech

O formulário atual está em `client/src/pages/Tech.tsx`. Vou modificá-lo para:
1. Enviar os dados para um endpoint do backend
2. O backend usa Resend para enviar um e-mail

**Mas há um problema:** O projeto atual é **web-static** (apenas frontend). Para ter um backend, preciso fazer um upgrade.

### Passo 4: Upgrade para web-db-user (Backend)

Isso vai adicionar:
- Servidor Node.js/Express
- Banco de dados
- Capacidade de rodar código no servidor

**Você quer que eu faça esse upgrade agora?** Se sim, vou:
1. Adicionar o backend
2. Criar um endpoint `/api/schedule` que recebe o formulário
3. Usar Resend para enviar e-mail
4. Você recebe as solicitações no seu e-mail

---

## ETAPA 2: Galeria de Fotos para Garage

### O que será feito?

Adicionar uma galeria de fotos dos projetos (Fusca em restauração, builds maker, etc.) com lightbox interativa.

### Passo 1: Preparar as fotos

1. Tire fotos dos seus projetos (Fusca, CNC, impressora 3D, etc.)
2. Redimensione para ~1200x800px (para web)
3. Comprima com [tinypng.com](https://tinypng.com) (reduz tamanho sem perder qualidade)

### Passo 2: Upload das fotos

Use o comando no terminal:
```bash
manus-upload-file /caminho/para/foto1.jpg /caminho/para/foto2.jpg /caminho/para/foto3.jpg
```

Você receberá URLs como:
```
https://d2xsxph8kpxj0f.cloudfront.net/...../foto1.webp
https://d2xsxph8kpxj0f.cloudfront.net/...../foto2.webp
```

### Passo 3: Adicionar à página Garage

Vou criar um componente de galeria que:
- Mostra miniaturas em grid
- Abre em lightbox ao clicar
- Tem navegação com setas
- Fecha com ESC ou clique fora

Cada projeto terá uma galeria própria:
```
Fusca 1972
├── foto-motor.jpg
├── foto-lataria.jpg
└── foto-interior.jpg

CNC Caseira
├── foto-estrutura.jpg
├── foto-funcionando.jpg
└── foto-detalhe.jpg
```

---

## ETAPA 3: Configurar Subdomínios

### O que será feito?

Apontar `tech.zerotressete.com`, `dev.zerotressete.com` e `garage.zerotressete.com` para o hub principal, mas com redirecionamentos automáticos.

### Passo 1: Configurar DNS (no seu registrador)

Você disse que já tem o domínio `zerotressete`. Onde você registrou? (GoDaddy, Namecheap, Hostinger, etc.)

Vou precisar adicionar registros DNS:

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

### Passo 2: Configurar no Manus

1. No painel do Manus, vá para **Settings** → **Domains**
2. Clique em **Add Domain**
3. Digite `tech.zerotressete.com`
4. Siga as instruções para verificar o domínio
5. Repita para `dev.zerotressete.com` e `garage.zerotressete.com`

### Passo 3: Redirecionamentos automáticos

Adiciono código no `App.tsx` para:
- Se alguém acessa `tech.zerotressete.com`, redireciona para `/tech`
- Se alguém acessa `dev.zerotressete.com`, redireciona para `/dev`
- Se alguém acessa `garage.zerotressete.com`, redireciona para `/garage`

Isso é feito com um hook que detecta o hostname.

---

## Resumo do Que Fazer

### Imediatamente (sem código):
1. ✅ Criar conta no Resend
2. ✅ Copiar a API Key
3. ✅ Adicionar ao Manus Secrets

### Próximas (com minha ajuda):
1. Fazer upgrade para **web-db-user** (backend)
2. Implementar endpoint de agendamento
3. Criar galeria de fotos na Garage
4. Configurar subdomínios

---

## Qual Etapa Você Quer Começar?

**Recomendo a ordem:**
1. **Primeiro:** Etapa 1 (Backend de Agendamento) — é a mais importante para sua empresa
2. **Depois:** Etapa 3 (Subdomínios) — melhora a profissionalidade
3. **Por último:** Etapa 2 (Galeria) — é mais visual/complementar

**Qual você quer que eu implemente primeiro?**
