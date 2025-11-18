import { FileText } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-2xl font-bold text-foreground hover:text-primary transition-colors">
            <FileText className="h-7 w-7 text-primary" />
            <span>Convertify</span>
          </a>
          <div className="text-sm text-muted-foreground">
            Free Online Tools
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
