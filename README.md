<div align="center">

<h1>Meishi (名刺)</h1>

<p>プロフェッショナルなメール署名を、30秒で。</p>

<p>
  <a href="https://meishi.ekagu.qzz.io">Live Demo</a> ·
  <a href="https://dashboard.ekagu.qzz.io">Launch App</a> ·
  <a href="https://github.com/nianyi778/meshi/issues">Report Bug</a> ·
  <a href="https://github.com/nianyi778/meshi/issues">Request Feature</a>
</p>

<p>
  <img src="https://img.shields.io/github/license/nianyi778/meshi?style=flat-square" alt="License" />
  <img src="https://img.shields.io/github/stars/nianyi778/meshi?style=flat-square" alt="Stars" />
  <img src="https://img.shields.io/github/forks/nianyi778/meshi?style=flat-square" alt="Forks" />
  <img src="https://img.shields.io/github/issues/nianyi778/meshi?style=flat-square" alt="Issues" />
</p>

</div>

---

**Meishi** is a free, open-source email signature generator built for the Japanese market and beyond. No account required. No watermarks. No paywalls.

Create beautiful, professional email signatures in seconds — export as PNG, copy as HTML, or set directly in Gmail.

## ✨ Features

- **5 templates** — Classic, Modern, Minimal, Corporate, Elegant
- **Full customization** — colors, fonts, border styles, spacing
- **One-click export** — PNG download, HTML copy, Gmail setup guide
- **7 languages** — Japanese, English, Chinese, Korean, Thai, Vietnamese, Indonesian
- **Privacy first** — all data stays in your browser, nothing sent to servers
- **100% free** — no account, no watermark, no limits

## 📸 Screenshots

> Landing page: [meishi.ekagu.qzz.io](https://meishi.ekagu.qzz.io)
> App: [dashboard.ekagu.qzz.io](https://dashboard.ekagu.qzz.io)

## 🗂 Project Structure

This is a pnpm monorepo:

```
.
├── apps/
│   ├── landing/        # Landing page (Next.js + vinext → Cloudflare Workers)
│   └── web/            # Signature generator app (Next.js + vinext → Cloudflare Workers)
└── packages/
    ├── core/           # Business logic, templates, types, constants
    ├── ui/             # Shared UI components (shadcn/ui)
    ├── i18n/           # i18n message files (7 languages)
    ├── tsconfig/       # Shared TypeScript config
    └── eslint-config/  # Shared ESLint config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install

```bash
git clone https://github.com/nianyi778/meshi.git
cd meshi
pnpm install
```

### Dev

```bash
# Run both apps
pnpm dev

# Or individually
pnpm dev:landing   # http://localhost:3000
pnpm dev:web       # http://localhost:3001
```

### Build

```bash
pnpm build
```

### Type check & Lint

```bash
pnpm type-check
pnpm lint
```

## ☁️ Deployment (Cloudflare Workers)

This project uses [vinext](https://github.com/nianyi778/vinext) to deploy Next.js apps to Cloudflare Workers.

```bash
# Deploy landing page
pnpm --filter @meishi/landing deploy:vinext

# Deploy signature generator
pnpm --filter @meishi/web deploy:vinext
```

**Live URLs:**

- Landing: `https://meishi.ekagu.qzz.io`
- App: `https://dashboard.ekagu.qzz.io`

## 🛠 Tech Stack

| Layer         | Tech                            |
| ------------- | ------------------------------- |
| Framework     | Next.js 15 (App Router)         |
| Runtime       | Cloudflare Workers (via vinext) |
| Styling       | Tailwind CSS                    |
| UI Components | shadcn/ui                       |
| Animation     | Framer Motion                   |
| i18n          | next-intl                       |
| State         | Zustand                         |
| Monorepo      | pnpm workspaces                 |

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repo
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m 'feat: add some feature'`
4. Push to the branch: `git push origin feat/your-feature`
5. Open a Pull Request

Please open an issue first for major changes to discuss what you'd like to change.

## 📋 Roadmap

- [ ] More templates
- [ ] Dark mode support
- [ ] QR code in signature
- [ ] Outlook direct integration
- [ ] Team/organization sharing

## 📄 License

MIT © [nianyi778](https://github.com/nianyi778)

---

<div align="center">
  <sub>If this project helped you, consider giving it a ⭐ on GitHub!</sub>
</div>
