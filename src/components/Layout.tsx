import { ReactNode } from "react";
import Navbar from "./Navbar";
import AdTop from "./AdTop";
import AdBottom from "./AdBottom";
import AdSide from "./AdSide";
import SEOHead from "./SEOHead";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  showSidebar?: boolean;
}

const Layout = ({ children, title, description, keywords, showSidebar = false }: LayoutProps) => {
  return (
    <>
      <SEOHead title={title} description={description} keywords={keywords} />
      <div className="min-h-screen bg-background">
        <header className="w-full">
          <Navbar />
        </header>
        
        <main className="w-full px-4 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-8 flex-col lg:flex-row">
              <div className={`flex-1 ${showSidebar ? 'lg:max-w-3xl' : 'max-w-3xl mx-auto w-full'} space-y-8`}>
                {/* <AdTop /> */}
                
                <div className="space-y-6">
                  {children}
                </div>
                
                {/* <AdBottom /> */}
              </div>
              
              {/* {showSidebar && (
                <aside className="lg:w-80 flex-shrink-0">
                  <AdSide />
                </aside>
              )} */}
            </div>
          </div>
              <Footer />
        </main>
      </div>
    </>
  );
};

export default Layout;
