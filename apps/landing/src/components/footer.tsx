import { Heart } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Footer link columns                                                */
/* ------------------------------------------------------------------ */

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

const COLUMNS: FooterColumn[] = [
  {
    title: "プロダクト",
    links: [
      { label: "署名を作成", href: "/generator" },
      { label: "テンプレート", href: "#templates" },
      { label: "機能一覧", href: "#features" },
    ],
  },
  {
    title: "サポート",
    links: [
      { label: "使い方", href: "#how-it-works" },
      { label: "FAQ", href: "#" },
    ],
  },
  {
    title: "法的情報",
    links: [
      { label: "プライバシーポリシー", href: "#" },
      { label: "利用規約", href: "#" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Footer component                                                   */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Top section */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className="text-xl font-extrabold tracking-tight text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Meishi
              </span>
              <span className="rounded-md bg-sky-500 px-1.5 py-0.5 text-xs font-bold text-white">
                名刺
              </span>
            </div>
            <p
              className="mt-3 max-w-xs text-sm leading-[1.8] text-slate-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              メールに、プロフェッショナルを。
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-4 text-sm font-bold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-slate-800" />

        {/* Bottom bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p
            className="text-xs text-slate-500"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            © 2026 Meishi. All rights reserved.
          </p>
          <p
            className="inline-flex items-center gap-1 text-xs text-slate-500"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Made with
            <Heart size={12} className="text-red-400" fill="currentColor" />
            in Japan
          </p>
        </div>
      </div>
    </footer>
  );
}
