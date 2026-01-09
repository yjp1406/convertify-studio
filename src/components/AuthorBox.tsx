import { Link } from "react-router-dom";
import { User, Mail } from "lucide-react";

interface AuthorBoxProps {
  showFullBio?: boolean;
}

export default function AuthorBox({ showFullBio = false }: AuthorBoxProps) {
  return (
    <div className="bg-muted/30 border border-border rounded-lg p-6 my-8">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <User className="h-8 w-8 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-1">Written by Yagnesh</h3>
          <p className="text-sm text-muted-foreground mb-3">
            Creator of Convertify Studio
          </p>
          
          {showFullBio ? (
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                I'm a web developer who built Convertify Studio after getting frustrated with 
                online file converters that required sign-ups, uploaded files to unknown servers, 
                or bombarded users with ads. I wanted to create something different: tools that 
                respect your privacy and just work.
              </p>
              <p>
                Every tool on this site processes files directly in your browser using JavaScript 
                and WebAssembly. I spent months researching and implementing efficient client-side 
                processing techniques to make conversions fast without compromising security.
              </p>
              <p>
                When I'm not building Convertify, I use these tools daily for my own work – 
                converting screenshots, compressing PDFs for email, and merging documents. 
                This hands-on experience helps me understand what users actually need.
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              I built Convertify Studio because file conversion should be simple, free, and private. 
              After years of frustration with online tools that upload your files to unknown servers, 
              I created a solution that processes everything locally in your browser. No uploads, 
              no accounts, no compromises on privacy.
            </p>
          )}
          
          <div className="flex items-center gap-4 mt-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              Get in touch
            </Link>
            <Link 
              to="/about" 
              className="text-sm text-primary hover:underline"
            >
              Learn more about Convertify
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
