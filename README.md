# Landing Page — Lar Interior

Página de captura do Desafio de 7 Dias. HTML único, sem build, sem dependências.

Contexto e copy: [[Landing Page - Em Breve]] | Arquitetura: [[Arquitetura - Dados e Tracking]] | Credenciais: [[credenciais-supabase]]

---

## Estrutura

```
lar-interior-site/
├── index.html       # HTML + CSS + JS inline
├── api/
│   └── subscribe.js # função serverless Vercel (Supabase → Brevo)
└── README.md
```

---

## Testar localmente

Abrir o `index.html` direto no navegador (duplo clique). Em `file://` ou `localhost` a função serverless não existe — a página detecta isso automaticamente e entra em **modo de teste** (só mostra a tela de sucesso, sem enviar nada).

---

## Status da infraestrutura

| Etapa | Status |
|---|---|
| Supabase — projeto criado (região SP) | ✅ |
| Supabase — tabelas `contacts` + `lead_events` + RLS | ✅ |
| Brevo — lista criada (ID: 2) | ✅ |
| Brevo — API key gerada | ✅ |
| Brevo — atributo `WHATSAPP` criado | ✅ |
| Vercel — projeto conectado ao Git | ⬜ |
| Vercel — 4 env vars configuradas | ⬜ |
| Deploy + domínio `larinterior.serenamentefeliz.com` | ⬜ |
| Automação de boas-vindas no Brevo | ⬜ |

---

## Próximos passos para ir ao ar

### 1. Conectar ao Git e fazer deploy na Vercel

**Opção A — CLI (recomendado):**
```bash
npm i -g vercel
cd "C:\Users\Yan\Desktop\Yan\Obsidian\Vault Zuppas\Vault Zuppas\20 - Projetos\Lar Interior\lar-interior-site"
vercel
```
Segue o wizard: conecta ao GitHub, nome do projeto `lar-interior-site`, framework **Other**.

**Opção B — arrastar e soltar:**
- vercel.com/new → arrastar a pasta `lar-interior-site/`

### 3. Configurar as 4 env vars na Vercel

Vercel → projeto → **Settings → Environment Variables** (marcar Production + Preview + Development):

```
SUPABASE_URL              = https://ddgtoebsmmyneumolycy.supabase.co
SUPABASE_SERVICE_ROLE_KEY = sb_secret_3Mu9B0sLgtG-vh0uHPTZTw_UUmLv4ms
BREVO_API_KEY             = xsmtpsib-38f256584d67612325ce0b376f88a1cbe907978db0cc973611c7557017fdc22c-smR2Vf71geocY2uq
BREVO_LIST_ID             = 2
```

Após salvar as vars → **Deployments → Redeploy** (ou `vercel --prod` no terminal).

### 4. Conectar domínio

- Vercel → projeto → **Settings → Domains** → adicionar `larinterior.serenamentefeliz.com`
- No DNS do `serenamentefeliz.com`: criar `CNAME larinterior → cname.vercel-dns.com`
- A Vercel mostra o valor exato do CNAME após adicionar o domínio

### 5. Automação de boas-vindas no Brevo

- Brevo → **Automations** → criar automação
- Gatilho: **"Contact added to a list"** → Lista de Espera - Desafio 7 Dias - Lar Interior
- Ação: enviar e-mail de boas-vindas (copy em [[Landing Page - Em Breve]])

---

## Manutenção

**Atualizar prova social** — quando tiver leads reais, editar no `index.html`:
```html
<span class="social-proof" id="socialProof" data-count="47">
  <strong id="waitingCount">47</strong>&nbsp;mulheres na lista
```
Trocar `0` pelo número real — o elemento aparece automaticamente quando `data-count > 0`.

**Substituir foto da Liz** — no `index.html`, trocar:
```html
<div class="liz-photo">foto<br/>Liz</div>
```
por:
```html
<img class="liz-photo" src="liz.jpg" alt="Liz Zuppa" />
```
Adicionar `liz.jpg` na pasta raiz e ajustar o CSS de `.liz-photo` (remover `background` e centralização de texto).

**Próximo deploy** — `vercel --prod` na pasta do projeto.
