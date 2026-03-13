import { ReactNode, memo } from "react";
import Navbar from "./Navbar";
import SEOHead from "./SEOHead";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  showSidebar?: boolean;
}

const Layout = memo(({ children, title, description, keywords, showSidebar = false }: LayoutProps) => {
  return (
    <>
      <SEOHead title={title} description={description} keywords={keywords} />
      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main className="w-full px-4 sm:px-6 py-10">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-8 flex-col lg:flex-row">
              <div className={`flex-1 ${showSidebar ? 'lg:max-w-3xl' : 'max-w-4xl mx-auto w-full'} space-y-8`}>
                <div className="space-y-6">
                  {children}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
});

Layout.displayName = 'Layout';

export default Layout;
