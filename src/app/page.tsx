"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Copy,
  PenLine,
  Sparkles,
  SlidersHorizontal,
  Wand2,
  Zap,
} from "lucide-react";

import { useTranslation } from "@/i18n/LanguageProvider";
import { useSession } from "@/hooks/use-session";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const featureIcons = [Sparkles, SlidersHorizontal, Zap];
const stepIcons = [PenLine, SlidersHorizontal, Copy];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5 },
};

export default function Home() {
  const { t } = useTranslation();
  const { session } = useSession();

  const ctaHref = session ? "/dashboard" : "/signup";
  const ctaLabel = session ? t.hero.ctaAuthed : t.hero.ctaGuest;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Decorative gradient backdrop */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-primary/[0.06] via-background to-background" />
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-20 md:py-28 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-start gap-6 text-left"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-primary" />
              {t.hero.badge}
            </span>
            <h1 className="bg-gradient-to-br from-foreground to-foreground/55 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-6xl">
              {t.hero.title}
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={ctaHref} className={buttonVariants({ size: "lg" })}>
                {ctaLabel}
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/pricing"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </motion.div>

          {/* Product mock */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <Card className="mx-auto w-full max-w-md shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="size-4 text-primary" />
                  {t.hero.mockTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-medium text-muted-foreground">
                    {t.hero.mockTopicLabel}
                  </span>
                  <div className="rounded-lg border border-input bg-muted/30 px-3 py-2 text-sm">
                    {t.hero.mockTopic}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    {t.hero.mockToneLabel}:
                  </span>
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {t.hero.mockTone}
                  </span>
                </div>
                <div className="flex h-9 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-medium text-primary-foreground">
                  <Sparkles className="size-4" />
                  {t.hero.mockButton}
                </div>
                <div className="space-y-2 rounded-lg border border-dashed p-3">
                  <div className="h-2 w-2/3 rounded-full bg-muted-foreground/20" />
                  <div className="h-2 w-full rounded-full bg-muted-foreground/15" />
                  <div className="h-2 w-5/6 rounded-full bg-muted-foreground/15" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto w-full max-w-6xl px-4 py-16">
        <motion.div {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            {t.features.heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{t.features.subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {t.features.items.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="mt-2">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
                    {feature.description}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-16">
          <motion.div {...fadeUp} className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight">{t.how.heading}</h2>
            <p className="mt-3 text-muted-foreground">{t.how.subtitle}</p>
          </motion.div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.how.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="relative flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="size-5" />
                    <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-background text-xs font-semibold text-foreground ring-1 ring-border">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 py-16">
        <motion.div {...fadeUp} className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">{t.faq.heading}</h2>
        </motion.div>
        <div className="flex flex-col gap-3">
          {t.faq.items.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-border bg-card px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {faq.question}
                <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-24">
        <motion.div
          {...fadeUp}
          className="relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center text-primary-foreground"
        >
          <div className="pointer-events-none absolute -top-16 left-1/2 size-64 -translate-x-1/2 rounded-full bg-primary-foreground/10 blur-3xl" />
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            {t.cta.title}
          </h2>
          <p className="max-w-md text-primary-foreground/80">{t.cta.subtitle}</p>
          <Link
            href={ctaHref}
            className={buttonVariants({ variant: "secondary", size: "lg" })}
          >
            {session ? t.hero.ctaAuthed : t.cta.button}
            <ArrowRight className="size-4" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
