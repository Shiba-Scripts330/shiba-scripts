# 🐕 Shiba Scripts - FiveM Script Marketplace

Premium FiveM script marketplace built with Next.js 14, featuring Discord authentication, Stripe payments, license key protection, and full multi-language support.

## ✨ Features

- **Multi-language** — 8 languages (EN, JA, ZH, ZH-TW, KO, ES, FR, DE) with next-intl
- **Discord OAuth** — Login with Discord via NextAuth.js
- **Stripe Payments** — Secure checkout with webhook integration
- **License System** — Unique key per purchase + FiveM validation API
- **Dark Mode** — System-aware with toggle
- **Responsive** — Mobile-first SaaS design with Shiba dog theme
- **Admin Panel** — Product/order/user management
- **SEO** — hreflang tags, multi-language URLs, sitemap ready

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Auth | NextAuth.js (Discord) |
| Payments | Stripe |
| Database | Supabase (PostgreSQL) |
| i18n | next-intl |
| Animation | Framer Motion |
| Language | TypeScript |

## 📦 Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see below).

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema:
   ```
   supabase/schema.sql
   ```
3. Copy your project URL and keys to `.env.local`

### 4. Set up Discord OAuth

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create an application
3. Add OAuth2 redirect: `http://localhost:3000/api/auth/callback/discord`
4. Copy Client ID and Secret to `.env.local`

### 5. Set up Stripe

1. Create account at [stripe.com](https://stripe.com)
2. Copy Publishable Key and Secret Key to `.env.local`
3. Set up webhook endpoint: `https://your-domain.com/api/stripe/webhook`
4. Listen for `checkout.session.completed` events
5. Copy Webhook Secret to `.env.local`

### 6. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🗂 Project Structure

```
shiba-scripts/
├── public/
│   └── locales/          # Translation files (8 languages)
│       ├── en/common.json
│       ├── ja/common.json
│       └── ...
├── src/
│   ├── app/
│   │   ├── [locale]/     # i18n routed pages
│   │   │   ├── page.tsx          # Home
│   │   │   ├── scripts/          # Scripts list + detail
│   │   │   ├── categories/       # Category pages
│   │   │   ├── login/            # Discord login
│   │   │   ├── account/          # User dashboard
│   │   │   ├── support/          # Support + FAQ
│   │   │   ├── docs/             # Documentation
│   │   │   └── admin/            # Admin panel
│   │   └── api/
│   │       ├── auth/             # NextAuth endpoints
│   │       ├── stripe/           # Checkout + webhook
│   │       ├── validate-license/ # License validation API
│   │       ├── download/         # Protected downloads
│   │       ├── products/         # Product CRUD
│   │       └── admin/            # Admin endpoints
│   ├── components/       # React components
│   ├── lib/              # Utilities + configs
│   └── types/            # TypeScript types
├── supabase/
│   └── schema.sql        # Database schema
├── fivem-protection/
│   └── shiba_license/    # FiveM Lua license checker
└── .env.example
```

## 🔑 License Validation API

### Endpoint
```
POST /api/validate-license
GET  /api/validate-license?key=SHIBA-XXXX&product_id=xxx
```

### Request Body (POST)
```json
{
  "license_key": "SHIBA-XXXX-XXXX-XXXX-XXXX",
  "product_id": "optional-product-uuid"
}
```

### Response
```json
{
  "valid": true,
  "product_id": "uuid",
  "message": "License is valid"
}
```

## 🎮 FiveM Integration

1. Copy `fivem-protection/shiba_license/` to your server's `resources/` folder
2. Edit `config.lua` with your API URL and license keys
3. Add to `server.cfg`:
   ```
   ensure shiba_license
   ```
4. The system validates licenses on server start and stops unauthorized resources

## 🚀 Deploy

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🌍 Adding a New Language

1. Create `public/locales/{code}/common.json`
2. Add the locale to `src/lib/i18n-config.ts`
3. Add localized product fields to your database

## 📄 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Your app URL |
| `NEXTAUTH_URL` | Same as app URL |
| `NEXTAUTH_SECRET` | Random secret for NextAuth |
| `DISCORD_CLIENT_ID` | Discord OAuth client ID |
| `DISCORD_CLIENT_SECRET` | Discord OAuth client secret |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `ADMIN_DISCORD_IDS` | Comma-separated admin Discord IDs |

---

Built with 🐕 by Shiba Scripts
