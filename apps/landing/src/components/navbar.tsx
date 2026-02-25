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
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.12]);
  const blur = useTransform(scrollY, [0, 80], [0, 20]);
  const navY = useTransform(scrollY, [0, 80], [8, 0]);
  const navScale = useTransform(scrollY, [0, 80], [0.98, 1]);

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
          y: navY,
        }}
      >
        <motion.div
          className="mx-auto max-w-6xl px-4 pt-3 lg:px-6"
          style={{ scale: navScale }}
        >
          <motion.nav
            className="flex h-14 items-center justify-between rounded-2xl px-5 lg:px-6"
            style={{
              backgroundColor: useTransform(
                bgOpacity,
                (v) => `rgba(255,255,255,${v * 0.88})`
              ),
              backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
              WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
              boxShadow: useTransform(
                bgOpacity,
                (v) =>
                  `0 1px 3px rgba(12,74,110,${v * 0.04}), 0 8px 24px rgba(14,165,233,${v * 0.06})`
              ),
              border: useTransform(
                borderOpacity,
                (v) => `1px solid rgba(14,165,233,${v})`
              ),
            }}
          >
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 no-underline cursor-pointer"
            >
              <span
                className="text-lg font-extrabold tracking-tight"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "var(--color-brand-text)",
                }}
              >
                Meishi
              </span>
              <span
                className="rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide"
                style={{
                  backgroundColor: "var(--color-brand-primary)",
                  color: "#fff",
                }}
              >
                名刺
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden items-center gap-7 md:flex">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="relative text-[13px] font-medium cursor-pointer transition-colors duration-200 hover:opacity-80"
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
                className="group items-center gap-1.5 rounded-xl px-4 py-2 text-[13px] font-bold text-white shadow-sm transition-all duration-200 hover:shadow-md inline-flex cursor-pointer"
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
                <ArrowRight
                  size={14}
                  strokeWidth={2.5}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 cursor-pointer md:hidden transition-colors duration-200"
              style={{ color: "var(--color-brand-text)" }}
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={t("common.openMenu")}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </motion.nav>
        </motion.div>
      </motion.header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
          style={{ backgroundColor: "rgba(240,249,255,0.97)", backdropFilter: "blur(20px)" }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMobile}
                className="text-2xl font-semibold cursor-pointer transition-colors duration-200"
                style={{
                  color: "var(--color-brand-text)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {label}
              </a>
            ))}

            {/* Decorative line */}
            <div
              className="h-px w-12"
              style={{ backgroundColor: "var(--color-brand-border)" }}
            />

            <LanguageSwitcher />

            <a
              href={`/${locale}/generator`}
              onClick={closeMobile}
              className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-bold text-white cursor-pointer shadow-lg transition-all duration-200"
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
