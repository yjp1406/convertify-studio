import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-white mt-10">
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
            <li><Link to="/jpg-to-png">JPG to PNG</Link></li>
            <li><Link to="/png-to-jpg">PNG to JPG</Link></li>
            <li><Link to="/webp-to-jpg">WebP to JPG</Link></li>
            <li><Link to="/heic-to-jpg">HEIC to JPG</Link></li>
            <li><Link to="/image-to-pdf">Image to PDF</Link></li>
            <li><Link to="/merge-pdf">Merge PDF</Link></li>
            <li><Link to="/split-pdf">Split PDF</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-medium mb-3">Company</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-medium mb-3">Legal</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-and-conditions">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Convertify. All rights reserved.
      </div>
    </footer>
  );
}
