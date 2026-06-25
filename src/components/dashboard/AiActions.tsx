"use client";

import { AlignLeft, Loader2Icon, Smile, Wand2 } from "lucide-react";

import { useTranslation } from "@/i18n/LanguageProvider";
import { Button } from "@/components/ui/button";

export type RefineAction = "shorter" | "formal" | "emoji";

interface AiActionsProps {
  onAction: (action: RefineAction) => void;
  disabled?: boolean;
  loadingAction?: RefineAction | null;
}

const AiActions = ({ onAction, disabled, loadingAction }: AiActionsProps) => {
  const { t } = useTranslation();

  const actions = [
    { key: "shorter" as const, label: t.dashboard.actions.shorter, Icon: AlignLeft },
    { key: "formal" as const, label: t.dashboard.actions.formal, Icon: Wand2 },
    { key: "emoji" as const, label: t.dashboard.actions.emoji, Icon: Smile },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map(({ key, label, Icon }) => (
        <Button
          key={key}
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={() => onAction(key)}
        >
          {loadingAction === key ? (
            <Loader2Icon className="size-3.5 animate-spin" />
          ) : (
            <Icon className="size-3.5" />
          )}
          {label}
        </Button>
      ))}
    </div>
  );
};

export default AiActions;
