"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

import { useTranslation } from "@/i18n/LanguageProvider";
import UpgradeButton from "@/components/pricing/UpgradeButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight">{t.pricing.heading}</h1>
        <p className="mt-3 text-muted-foreground">{t.pricing.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 px-1 pt-6 md:grid-cols-3">
        {t.pricing.tiers.map((tier, index) => {
          const highlighted = index === 1;
          return (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              className="h-full"
            >
              <Card
                className={cn(
                  "h-full",
                  highlighted &&
                    "relative overflow-visible border-primary shadow-md ring-2 ring-primary md:scale-[1.03]"
                )}
              >
                {highlighted && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                    <Sparkles className="size-3.5" />
                    {t.pricing.mostPopular}
                  </span>
                )}
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold tracking-tight">
                      {tier.price}
                    </span>
                    {tier.period && (
                      <span className="text-sm text-muted-foreground">
                        {tier.period}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="flex flex-col gap-3 text-sm">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="size-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <UpgradeButton
                    label={tier.cta}
                    variant={highlighted ? "default" : "outline"}
                  />
                </CardFooter>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
