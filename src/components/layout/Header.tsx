"use client";

import Link from "next/link";
import { Mail } from "lucide-react";

import { useTranslation } from "@/i18n/LanguageProvider";
import AuthButtons from "@/components/layout/AuthButtons";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import ThemeToggle from "@/components/layout/ThemeToggle";

const Header = () => {
  const { t } = useTranslation();

  const navLinks = [
    { href: "/#features", label: t.nav.features },
    { href: "/pricing", label: t.nav.pricing },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Mail className="size-5 text-primary" />
          <span className="tracking-tight">{t.common.appName}</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side: theme + language + auth */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <AuthButtons />
        </div>
      </div>
    </header>
  );
};

export default Header;
