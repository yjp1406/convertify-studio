import { Link } from "react-router-dom";
import { Shield, FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-border/50 bg-card/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Brand */}
        <div className="col-span-1 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-bg">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">Convertify</span>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Free image & PDF conversion tools.<br />
            100% secure — files never leave your device.
          </p>
        </div>

        {/* Tools */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Tools</h3>
          <ul className="space-y-2.5 text-muted-foreground">
            <li><Link to="/jpg-to-png" className="hover:text-primary transition-colors">JPG to PNG</Link></li>
            <li><Link to="/png-to-jpg" className="hover:text-primary transition-colors">PNG to JPG</Link></li>
            <li><Link to="/convert-to-webp" className="hover:text-primary transition-colors">Convert to WebP</Link></li>
            <li><Link to="/webp-to-jpg" className="hover:text-primary transition-colors">WebP to JPG</Link></li>
            <li><Link to="/heic-to-jpg" className="hover:text-primary transition-colors">HEIC to JPG</Link></li>
            <li><Link to="/image-to-pdf" className="hover:text-primary transition-colors">Image to PDF</Link></li>
            <li><Link to="/merge-pdf" className="hover:text-primary transition-colors">Merge PDF</Link></li>
            <li><Link to="/compress-pdf" className="hover:text-primary transition-colors">Compress PDF</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Resources</h3>
          <ul className="space-y-2.5 text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link to="/blog/file-formats-guide" className="hover:text-primary transition-colors">Format Guide</Link></li>
            <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold text-foreground mb-4 text-xs uppercase tracking-wider">Legal</h3>
          <ul className="space-y-2.5 text-muted-foreground">
            <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 py-5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 text-primary" />
              <span>Privacy-first. Files processed locally — nothing uploaded to any server.</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Convertify Studio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
