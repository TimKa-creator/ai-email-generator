"use client";

import { useEffect, useState } from "react";
import { CopyIcon, Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import EmailForm from "@/components/dashboard/EmailForm";
import AiActions, { type RefineAction } from "@/components/dashboard/AiActions";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useTranslation } from "@/i18n/LanguageProvider";
import { supabase } from "@/lib/supabase";
import { FREE_WORD_LIMIT, countWords, currentPeriodStart } from "@/lib/quota";
import { streamGeneration, type GenerateError } from "@/lib/generate-client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const { session, loading } = useAuthGuard();
  const { t, locale } = useTranslation();

  const [result, setResult] = useState("");
  const [busy, setBusy] = useState(false);
  const [loadingAction, setLoadingAction] = useState<RefineAction | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [wordsUsed, setWordsUsed] = useState(0);

  // Refresh the monthly word counter on load and after each generation.
  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) return;

    let cancelled = false;
    supabase
      .from("usage")
      .select("words_used, period_start")
      .eq("user_id", userId)
      .maybeSingle<{ words_used: number; period_start: string }>()
      .then(({ data }) => {
        if (cancelled) return;
        const isCurrentPeriod =
          !!data && data.period_start >= currentPeriodStart();
        setWordsUsed((prev) => {
          // Authoritative value from the DB for the current month.
          if (isCurrentPeriod) return data!.words_used ?? 0;
          // No row yet, or it belongs to a past month. Only the initial load
          // (reloadKey === 0) may legitimately show 0 (new month / first use).
          // After a generation, keep the optimistic value so the bar never
          // snaps back to 0 while the write hasn't been read back yet.
          return reloadKey === 0 ? 0 : prev;
        });
      });

    return () => {
      cancelled = true;
    };
  }, [session, reloadKey]);

  const run = async (
    body: Record<string, unknown>,
    action: RefineAction | null = null
  ) => {
    setBusy(true);
    setLoadingAction(action);
    try {
      const finalText = await streamGeneration({ ...body, locale }, setResult);
      // Optimistically update word count so the bar doesn't snap back to 0
      // while waiting for the Supabase re-fetch. Only new generations consume quota.
      if (!action) {
        setWordsUsed((prev) => prev + countWords(finalText));
      }
      setReloadKey((key) => key + 1);
      toast.success(t.dashboard.ready);
    } catch (error) {
      toast.error((error as GenerateError).message);
    } finally {
      setBusy(false);
      setLoadingAction(null);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      toast.success(t.dashboard.copied);
    } catch {
      toast.error(t.dashboard.copyFail);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // During streaming, show live word count from result text; after done, use DB value.
  const liveWordsUsed = busy && result ? wordsUsed + countWords(result) : wordsUsed;
  const percent = Math.min(100, Math.round((liveWordsUsed / FREE_WORD_LIMIT) * 100));
  const barColor =
    percent >= 85
      ? "bg-destructive"
      : percent >= 60
        ? "bg-amber-500"
        : "bg-emerald-500";

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {t.dashboard.title}
          </h1>
          <p className="mt-1 text-muted-foreground">{t.dashboard.subtitle}</p>
        </div>
        <div className="w-full sm:w-56">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>
              {liveWordsUsed} / {FREE_WORD_LIMIT}
            </span>
            <span>{t.dashboard.wordsThisMonth}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className={`h-full rounded-full transition-all duration-300 ${barColor}`}
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Compose form */}
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.composeTitle}</CardTitle>
            <CardDescription>{t.dashboard.composeDesc}</CardDescription>
          </CardHeader>
          <CardContent>
            <EmailForm
              busy={busy}
              onSubmit={({ topic, tone, words }) =>
                run({ topic, tone, words })
              }
            />
          </CardContent>
        </Card>

        {/* Generated result */}
        <Card>
          <CardHeader>
            <CardTitle>{t.dashboard.resultTitle}</CardTitle>
            <CardDescription>{t.dashboard.resultDesc}</CardDescription>
            {result && (
              <CardAction>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={busy}
                >
                  <CopyIcon className="size-4" />
                  {t.dashboard.copy}
                </Button>
              </CardAction>
            )}
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {result ? (
              <>
                <Textarea
                  value={result}
                  onChange={(event) => setResult(event.target.value)}
                  disabled={busy}
                  className="min-h-72 resize-none font-sans text-sm leading-relaxed"
                />
                <AiActions
                  onAction={(action) => run({ action, text: result }, action)}
                  disabled={busy}
                  loadingAction={loadingAction}
                />
              </>
            ) : (
              <div className="flex min-h-72 items-center justify-center rounded-lg border border-dashed text-center text-sm text-muted-foreground">
                {t.dashboard.empty}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
