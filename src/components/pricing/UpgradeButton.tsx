"use client";

import { toast } from "sonner";

import { useTranslation } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";

interface UpgradeButtonProps {
  label: string;
  variant?: "default" | "outline" | "secondary";
}

const UpgradeButton = ({ label, variant = "default" }: UpgradeButtonProps) => {
  const { t } = useTranslation();

  return (
    <Button
      variant={variant}
      className="w-full"
      onClick={() => toast.info(t.pricing.stripeSoon)}
    >
      {label}
    </Button>
  );
};

export default UpgradeButton;
