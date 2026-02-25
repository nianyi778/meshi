# Meishi (名刺)

面向日本市场的商业化邮件签名生成器，支持多语言与 Gmail 签名配置。仓库采用 monorepo 架构，包含落地页与生成器应用。

## 主要功能

- 5 套签名模板（classic / modern / minimal / corporate / elegant）
- 可视化定制（配色、字体、边框、间距等）
- 一键导出 PNG + HTML，并支持 Gmail OAuth 签名写入
- i18n：ja（默认）、zh、en、ko、th、vi、id
- SEO：多语言 hreflang、结构化数据、sitemap/robots

## 项目结构

- `apps/landing`：落地页（Next.js）
- `apps/web`：签名生成器（Next.js）
- `packages/ui`：共享 UI 组件
- `packages/core`：业务逻辑/模板
- `packages/i18n`：多语言资源
- `packages/tsconfig`、`packages/eslint-config`

## 本地开发

```bash
pnpm install
pnpm dev
```

分别启动：

```bash
pnpm dev:landing
pnpm dev:web
```

## 构建与检查

```bash
pnpm build
pnpm lint
pnpm type-check
```

## 部署（Cloudflare Pages）

已部署到 Cloudflare Pages：

- 落地页：`https://meshi.ekagu.qzz.io`
- 生成器：`https://dashboard.ekagu.qzz.io`

若首次绑定自定义域名，请在 Cloudflare DNS 中添加：

| Type | Name | Target | Proxy |
|------|------|--------|-------|
| CNAME | meshi | meishi-landing-e6k.pages.dev | Proxied |
| CNAME | dashboard | meishi-app.pages.dev | Proxied |

> 注意：如果已存在同名记录（如 A/AAAA），需先删除再添加 CNAME。

## 许可

MIT
