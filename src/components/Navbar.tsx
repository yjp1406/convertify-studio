import { FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Tools", href: "/#tools" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 glass-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-bg shadow-sm">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              Convertify
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </Link>
            ))}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border/50 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
