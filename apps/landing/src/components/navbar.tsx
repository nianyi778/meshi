"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState, useCallback } from "react";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const t = useTranslations();
  const locale = useLocale();

  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);
  const blur = useTransform(scrollY, [0, 80], [0, 16]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const NAV_LINKS = [
    { label: t("landing.nav.features"), href: "#features" },
    { label: t("landing.nav.templates"), href: "#templates" },
    { label: t("landing.nav.howItWorks"), href: "#how-it-works" },
  ];

  return (
    <>
      <motion.header
        className="fixed top-0 right-0 left-0 z-50"
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (v) => `rgba(255,255,255,${v * 0.92})`
          ),
          backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
          borderBottom: useTransform(
            borderOpacity,
            (v) => `1px solid rgba(14,165,233,${v})`
          ),
        }}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 no-underline">
            <span
              className="text-xl font-extrabold tracking-tight"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
              }}
            >
              Meishi
            </span>
            <span
              className="rounded-md px-1.5 py-0.5 text-xs font-bold"
              style={{
                backgroundColor: "var(--color-brand-primary)",
                color: "#fff",
              }}
            >
              名刺
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className="text-sm font-medium transition-colors duration-200 hover:opacity-70"
                  style={{
                    color: "var(--color-brand-text-body)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
            {/* Desktop CTA */}
            <a
              href={`/${locale}/generator`}
              className="items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md inline-flex"
              style={{
                backgroundColor: "var(--color-brand-cta)",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-brand-cta-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-brand-cta)")
              }
            >
              {t("common.createNow")}
              <ArrowRight size={15} strokeWidth={2.5} />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="inline-flex items-center justify-center rounded-md p-2 md:hidden"
            style={{ color: "var(--color-brand-text)" }}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={t("common.openMenu")}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md md:hidden"
        >
          <div className="flex h-full flex-col items-center justify-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMobile}
                className="text-xl font-semibold"
                style={{
                  color: "var(--color-brand-text)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {label}
              </a>
            ))}
            <LanguageSwitcher />
            <a
              href={`/${locale}/generator`}
              onClick={closeMobile}
              className="mt-4 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-base font-bold text-white"
              style={{ backgroundColor: "var(--color-brand-cta)" }}
            >
              {t("common.createNow")}
              <ArrowRight size={17} />
            </a>
          </div>
        </motion.div>
      )}
    </>
  );
}
