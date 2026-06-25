"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/i18n/LanguageProvider";
import { WORD_PRESETS, FREE_WORDS_PER_EMAIL } from "@/lib/quota";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TONE_KEYS = [
  "formal",
  "friendly",
  "professional",
  "persuasive",
  "urgent",
  "casual",
  "enthusiastic",
  "empathetic",
  "confident",
  "apologetic",
] as const;

type ToneKey = (typeof TONE_KEYS)[number];

export interface UsageInfo {
  wordsUsed: number;
  limit: number;
}

interface EmailFormProps {
  onGenerate: (text: string) => void;
  onUsage?: (usage: UsageInfo) => void;
}

const EmailForm = ({ onGenerate, onUsage }: EmailFormProps) => {
  const { t, locale } = useTranslation();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState<ToneKey>("friendly");
  const [wordsMode, setWordsMode] = useState<string>("100");
  const [customWords, setCustomWords] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isCustom = wordsMode === "custom";
  const effectiveWords = isCustom ? parseInt(customWords, 10) : Number(wordsMode);
  const overFreeLimit =
    Number.isFinite(effectiveWords) && effectiveWords > FREE_WORDS_PER_EMAIL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!topic.trim()) {
      toast.error(t.dashboard.errorTopic);
      return;
    }

    if (isCustom && (!Number.isFinite(effectiveWords) || effectiveWords < 10)) {
      toast.error(t.dashboard.customInvalid);
      return;
    }

    if (overFreeLimit) {
      toast.error(t.dashboard.proError);
      return;
    }

    setIsLoading(true);

    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      if (!token) {
        throw new Error(t.auth.login.failed);
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ topic, tone, words: effectiveWords, locale }),
      });

      const data = (await response.json()) as {
        text?: string;
        error?: string;
        usage?: UsageInfo;
      };

      if (!response.ok || !data.text) {
        if (data.usage) onUsage?.(data.usage);
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }

      onGenerate(data.text);
      if (data.usage) onUsage?.(data.usage);
      toast.success(t.dashboard.ready);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to generate the email.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="topic" className="text-sm font-medium">
          {t.dashboard.topicLabel}
        </label>
        <Textarea
          id="topic"
          value={topic}
          onChange={(event) => setTopic(event.target.value)}
          placeholder={t.dashboard.topicPlaceholder}
          className="min-h-32 resize-none"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">{t.dashboard.toneLabel}</span>
          <Select
            value={tone}
            onValueChange={(value) => setTone(value as ToneKey)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {(value) => t.dashboard.tones[value as ToneKey]}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {TONE_KEYS.map((key) => (
                <SelectItem key={key} value={key}>
                  {t.dashboard.tones[key]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium">{t.dashboard.wordsLabel}</span>
          <Select
            value={wordsMode}
            onValueChange={(value) => setWordsMode(value as string)}
            disabled={isLoading}
          >
            <SelectTrigger className="w-full">
              <SelectValue>
                {(value) =>
                  value === "custom"
                    ? t.dashboard.wordsCustom
                    : `${value} ${t.dashboard.wordsUnit}`
                }
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {WORD_PRESETS.map((preset) => (
                <SelectItem key={preset} value={String(preset)}>
                  {preset} {t.dashboard.wordsUnit}
                </SelectItem>
              ))}
              <SelectItem value="custom">{t.dashboard.wordsCustom}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isCustom && (
        <div className="flex flex-col gap-2">
          <Input
            type="number"
            min={10}
            max={1000}
            value={customWords}
            onChange={(event) => setCustomWords(event.target.value)}
            placeholder={t.dashboard.customPlaceholder}
            disabled={isLoading}
            aria-label={t.dashboard.wordsLabel}
          />
          {overFreeLimit && (
            <p className="text-xs text-amber-600 dark:text-amber-500">
              <Link
                href="/pricing"
                className="font-medium underline underline-offset-2"
              >
                {t.dashboard.proNote}
              </Link>
            </p>
          )}
        </div>
      )}

      <Button type="submit" size="lg" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2Icon className="size-4 animate-spin" />
            {t.dashboard.generating}
          </>
        ) : (
          t.dashboard.generate
        )}
      </Button>
    </form>
  );
};

export default EmailForm;
