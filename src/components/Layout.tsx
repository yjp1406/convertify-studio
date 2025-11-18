import { ReactNode } from "react";
import Navbar from "./Navbar";
import AdTop from "./AdTop";
import AdBottom from "./AdBottom";
import SEOHead from "./SEOHead";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const Layout = ({ children, title, description, keywords }: LayoutProps) => {
  return (
    <>
      <SEOHead title={title} description={description} keywords={keywords} />
      <div className="min-h-screen bg-background">
        <header className="w-full">
          <Navbar />
        </header>
        
        <main className="w-full px-4 py-8">
          <div className="mx-auto max-w-3xl space-y-8">
            <AdTop />
            
            <div className="space-y-6">
              {children}
            </div>
            
            <AdBottom />
          </div>
        </main>
      </div>
    </>
  );
};

export default Layout;
