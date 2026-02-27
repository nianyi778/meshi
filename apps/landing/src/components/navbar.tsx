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
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.15]);
  const blur = useTransform(scrollY, [0, 80], [0, 20]);
  const navY = useTransform(scrollY, [0, 80], [8, 0]);

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
        style={{ y: navY }}
      >
        <motion.div className="mx-auto max-w-6xl px-4 pt-3 lg:px-6">
          <motion.nav
            className="flex h-14 items-center justify-between rounded-2xl px-5 lg:px-6"
            style={{
              backgroundColor: useTransform(
                bgOpacity,
                (v) => `rgba(15,23,42,${v * 0.95})`
              ),
              backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
              WebkitBackdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
              boxShadow: useTransform(
                bgOpacity,
                (v) =>
                  `0 1px 3px rgba(0,0,0,${v * 0.1}), 0 8px 24px rgba(0,0,0,${v * 0.15})`
              ),
              border: useTransform(
                borderOpacity,
                (v) => `1px solid rgba(200,164,78,${v})`
              ),
            }}
          >
            {/* Logo */}
            <a
              href={`/${locale}`}
              className="flex items-center gap-2.5 no-underline cursor-pointer"
            >
              <span
                className="text-lg font-extrabold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Meishi
              </span>
              <span
                className="h-4 w-px"
                style={{ backgroundColor: "var(--color-brand-accent)" }}
              />
              <span
                className="text-sm font-medium tracking-wider text-white/70"
                style={{ fontFamily: "var(--font-heading)" }}
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
                    className="relative text-[13px] font-medium cursor-pointer transition-colors duration-200 text-white/60 hover:text-white"
                    style={{ fontFamily: "var(--font-sans)" }}
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
                href={`https://dashboard.ekagu.qzz.io/${locale}/generator`}
                className="group inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-bold shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
                style={{
                  backgroundColor: "var(--color-brand-cta)",
                  color: "var(--color-brand-dark)",
                  fontFamily: "var(--font-sans)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-brand-cta-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-brand-cta)";
                }}
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
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 cursor-pointer md:hidden transition-colors duration-200 text-white/80"
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
          style={{
            backgroundColor: "rgba(15,23,42,0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div className="flex h-full flex-col items-center justify-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMobile}
                className="text-2xl font-semibold cursor-pointer transition-colors duration-200 text-white/80 hover:text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {label}
              </a>
            ))}

            <div
              className="h-px w-12"
              style={{ backgroundColor: "var(--color-brand-accent)" }}
            />

            <LanguageSwitcher />

            <a
              href={`https://dashboard.ekagu.qzz.io/${locale}/generator`}
              onClick={closeMobile}
              className="inline-flex items-center gap-2 rounded-lg px-7 py-3.5 text-base font-bold cursor-pointer shadow-lg transition-all duration-200"
              style={{
                backgroundColor: "var(--color-brand-cta)",
                color: "var(--color-brand-dark)",
              }}
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
