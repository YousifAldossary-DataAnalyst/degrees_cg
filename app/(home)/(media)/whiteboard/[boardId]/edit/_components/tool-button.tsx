
import Hint from "@/components/global/tool-tip";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  disabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={14}>
      <Button
        disabled={disabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "default" : "secondary"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};