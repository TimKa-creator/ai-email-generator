"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SignupPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password.length < 6) {
      toast.error(t.auth.signup.pwTooShort);
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      if (data.session) {
        toast.success(t.auth.signup.created);
        router.push("/dashboard");
      } else {
        toast.success(t.auth.signup.createdConfirm);
        router.push("/login");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t.auth.signup.failed;
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-10">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t.auth.signup.title}</CardTitle>
          <CardDescription>{t.auth.signup.subtitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">{t.auth.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.auth.emailPlaceholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">{t.auth.passwordLabel}</Label>
              <Input
                id="password"
                type="password"
                placeholder={t.auth.signupPasswordPlaceholder}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="mt-1 w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2Icon className="size-4 animate-spin" />
                  {t.auth.signup.submitting}
                </>
              ) : (
                t.auth.signup.submit
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          <p>
            {t.auth.signup.haveAccount}{" "}
            <Link
              href="/login"
              className="font-medium text-foreground hover:underline"
            >
              {t.auth.signup.signInLink}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </section>
  );
}
