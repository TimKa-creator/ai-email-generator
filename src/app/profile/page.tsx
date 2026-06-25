"use client";

import { useEffect, useState } from "react";
import { Loader2Icon, LogOut, Mail, User } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import { useTranslation } from "@/i18n/LanguageProvider";
import { FREE_WORD_LIMIT, currentPeriodStart } from "@/lib/quota";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProfilePage() {
  const { session, loading } = useAuthGuard();
  const { t, locale } = useTranslation();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [wordsUsed, setWordsUsed] = useState(0);

  useEffect(() => {
    const userId = session?.user.id;
    if (!userId) return;

    supabase
      .from("usage")
      .select("words_used, period_start")
      .eq("user_id", userId)
      .maybeSingle<{ words_used: number; period_start: string }>()
      .then(({ data }) => {
        if (!data) return;
        setWordsUsed(
          data.period_start < currentPeriodStart() ? 0 : data.words_used ?? 0
        );
      });
  }, [session]);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      setIsSigningOut(false);
      return;
    }
    toast.success(t.profile.signedOut);
    // useAuthGuard reacts to the sign-out event and redirects to /login.
  };

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const now = new Date();
  const resetDate = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  ).toLocaleDateString(locale, { day: "numeric", month: "long" });
  const percent = Math.min(100, Math.round((wordsUsed / FREE_WORD_LIMIT) * 100));

  return (
    <section className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="mb-8 text-3xl font-bold tracking-tight">
        {t.profile.title}
      </h1>

      <Card>
        <CardHeader className="flex-row items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <User className="size-6" />
          </div>
          <div className="space-y-1">
            <CardTitle>{t.profile.accountTitle}</CardTitle>
            <CardDescription>{t.profile.accountDesc}</CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <Mail className="size-4 shrink-0 text-muted-foreground" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">
                {t.profile.emailLabel}
              </p>
              <p className="truncate text-sm font-medium">
                {session?.user.email}
              </p>
            </div>
          </div>

          {/* Usage / quota */}
          <div className="rounded-lg border border-border px-4 py-3">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium">{t.profile.usageTitle}</span>
              <span className="text-muted-foreground">
                {wordsUsed} / {FREE_WORD_LIMIT} {t.profile.wordsThisMonth}
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {t.profile.resetsOn} {resetDate}
            </p>
          </div>

          <Button
            variant="outline"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="w-full sm:w-auto"
          >
            {isSigningOut ? (
              <>
                <Loader2Icon className="size-4 animate-spin" />
                {t.profile.signingOut}
              </>
            ) : (
              <>
                <LogOut className="size-4" />
                {t.profile.signOut}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
