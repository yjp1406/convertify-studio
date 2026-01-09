import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Eager load - critical path
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load - tool pages (heavy PDF/image libraries)
const PdfToImage = lazy(() => import("./pages/PdfToImage"));
const JpgToPng = lazy(() => import("./pages/JpgToPng"));
const PngToJpg = lazy(() => import("./pages/PngToJpg"));
const ImageToPdf = lazy(() => import("./pages/ImageToPdf"));
const MergePdf = lazy(() => import("./pages/MergePdf"));
const CompressPdf = lazy(() => import("./pages/CompressPdf"));
const WebpToJpg = lazy(() => import("./pages/WebpToJpg"));
const HeicToJpg = lazy(() => import("./pages/HeicToJpg"));
const SplitPdf = lazy(() => import("./pages/SplitPdf"));

// Lazy load - static pages
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

// Lazy load - blog pages
const BlogIndex = lazy(() => import("./pages/blog/Index"));
const JpgToPngQuality = lazy(() => import("./pages/blog/JpgToPngQuality"));
const HeicConversionGuide = lazy(() => import("./pages/blog/HeicConversionGuide"));
const PdfCompressionExplained = lazy(() => import("./pages/blog/PdfCompressionExplained"));
const BestImageTools2025 = lazy(() => import("./pages/blog/BestImageTools2025"));
const ReducePdfForEmail = lazy(() => import("./pages/blog/ReducePdfForEmail"));
const OnlineConverterSecurity = lazy(() => import("./pages/blog/OnlineConverterSecurity"));
const WebpFormatGuide = lazy(() => import("./pages/blog/WebpFormatGuide"));
const MergePdfsTutorial = lazy(() => import("./pages/blog/MergePdfsTutorial"));
const ImageFormatsExplained = lazy(() => import("./pages/blog/ImageFormatsExplained"));
const FixPdfTooLargeError = lazy(() => import("./pages/blog/FixPdfTooLargeError"));
const FileFormatsGuide = lazy(() => import("./pages/blog/FileFormatsGuide"));

const queryClient = new QueryClient();

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pdf-to-image" element={<PdfToImage />} />
          <Route path="/jpg-to-png" element={<JpgToPng />} />
          <Route path="/png-to-jpg" element={<PngToJpg />} />
          <Route path="/image-to-pdf" element={<ImageToPdf />} />
          <Route path="/merge-pdf" element={<MergePdf />} />
          <Route path="/compress-pdf" element={<CompressPdf />} />
          <Route path="/webp-to-jpg" element={<WebpToJpg />} />
          <Route path="/heic-to-jpg" element={<HeicToJpg />} />
          <Route path="/split-pdf" element={<SplitPdf />} />
          
          {/* Blog routes */}
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/jpg-to-png-without-losing-quality" element={<JpgToPngQuality />} />
          <Route path="/blog/heic-conversion-guide" element={<HeicConversionGuide />} />
          <Route path="/blog/pdf-compression-explained" element={<PdfCompressionExplained />} />
          <Route path="/blog/best-free-image-tools-2025" element={<BestImageTools2025 />} />
          <Route path="/blog/reduce-pdf-size-for-email" element={<ReducePdfForEmail />} />
          <Route path="/blog/online-file-converter-security" element={<OnlineConverterSecurity />} />
          <Route path="/blog/what-is-webp" element={<WebpFormatGuide />} />
          <Route path="/blog/how-to-merge-pdfs" element={<MergePdfsTutorial />} />
          <Route path="/blog/image-formats-explained" element={<ImageFormatsExplained />} />
          <Route path="/blog/fix-pdf-too-large-error" element={<FixPdfTooLargeError />} />
          <Route path="/blog/file-formats-guide" element={<FileFormatsGuide />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
