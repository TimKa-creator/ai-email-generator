"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { supabase } from "@/lib/supabase";
import { useSession } from "@/hooks/use-session";
import { useTranslation } from "@/i18n/LanguageProvider";
import { Button, buttonVariants } from "@/components/ui/button";

const AuthButtons = () => {
  const router = useRouter();
  const { session, loading } = useSession();
  const { t } = useTranslation();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success(t.profile.signedOut);
    router.push("/");
  };

  // Reserve space while resolving the session to avoid layout shift / flicker.
  if (loading) {
    return <div className="h-7 w-28" aria-hidden />;
  }

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/profile"
          className={buttonVariants({ variant: "ghost", size: "sm" })}
        >
          {t.common.profile}
        </Link>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          {t.common.logOut}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/login"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        {t.common.signIn}
      </Link>
      <Link href="/signup" className={buttonVariants({ size: "sm" })}>
        {t.common.getStarted}
      </Link>
    </div>
  );
};

export default AuthButtons;
