import { memo } from "react";
import { LucideIcon, ArrowRight } from "lucide-react";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const ToolCard = memo(({ icon: Icon, title, description, onClick }: ToolCardProps) => {
  return (
    <div
      className="group cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[var(--shadow-card-hover)]"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/15">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-muted-foreground/40 transition-all group-hover:text-primary group-hover:translate-x-0.5 flex-shrink-0 mt-1" />
      </div>
    </div>
  );
});

ToolCard.displayName = 'ToolCard';

export default ToolCard;
