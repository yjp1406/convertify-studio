import { memo } from "react";
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const ToolCard = memo(({ icon: Icon, title, description, onClick }: ToolCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] border-border"
      onClick={onClick}
    >
      <CardHeader>
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Click to use tool
        </div>
      </CardContent>
    </Card>
  );
});

ToolCard.displayName = 'ToolCard';

export default ToolCard;
