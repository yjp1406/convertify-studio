import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-10">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        
        {/* Brand */}
        <div className="col-span-1">
          <h2 className="text-lg font-semibold">Convertify</h2>
          <p className="text-muted-foreground mt-2">
            Free image & PDF conversion tools.  
            <br />100% secure — files never leave your device.
          </p>
        </div>

        {/* Quick Tools */}
        <div>
          <h3 className="font-medium mb-3">Tools</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/jpg-to-png" className="hover:text-foreground transition-colors">JPG to PNG</Link></li>
            <li><Link to="/png-to-jpg" className="hover:text-foreground transition-colors">PNG to JPG</Link></li>
            <li><Link to="/webp-to-jpg" className="hover:text-foreground transition-colors">WebP to JPG</Link></li>
            <li><Link to="/heic-to-jpg" className="hover:text-foreground transition-colors">HEIC to JPG</Link></li>
            <li><Link to="/image-to-pdf" className="hover:text-foreground transition-colors">Image to PDF</Link></li>
            <li><Link to="/merge-pdf" className="hover:text-foreground transition-colors">Merge PDF</Link></li>
            <li><Link to="/split-pdf" className="hover:text-foreground transition-colors">Split PDF</Link></li>
            <li><Link to="/compress-pdf" className="hover:text-foreground transition-colors">Compress PDF</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-medium mb-3">Legal</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions" className="hover:text-foreground transition-colors">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Convertify. All rights reserved.
      </div>
    </footer>
  );
}
