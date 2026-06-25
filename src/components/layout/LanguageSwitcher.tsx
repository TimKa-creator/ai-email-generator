"use client";

import { Languages } from "lucide-react";

import { useTranslation } from "@/i18n/LanguageProvider";
import { LOCALES, localeLabels, type Locale } from "@/i18n/locales";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageSwitcher = () => {
  const { locale, setLocale, t } = useTranslation();

  return (
    <Select
      value={locale}
      onValueChange={(value) => setLocale(value as Locale)}
    >
      <SelectTrigger
        size="sm"
        className="gap-1.5"
        aria-label={t.common.language}
      >
        <Languages className="size-4 text-muted-foreground" />
        <SelectValue>
          {(value) => localeLabels[value as Locale] ?? String(value)}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((code) => (
          <SelectItem key={code} value={code}>
            {localeLabels[code]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
