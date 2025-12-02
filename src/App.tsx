import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PdfToImage from "./pages/PdfToImage";
import JpgToPng from "./pages/JpgToPng";
import PngToJpg from "./pages/PngToJpg";
import ImageToPdf from "./pages/ImageToPdf";
import MergePdf from "./pages/MergePdf";
import CompressPdf from "./pages/CompressPdf";
import WebpToJpg from "./pages/WebpToJpg";
import HeicToJpg from "./pages/HeicToJpg";
import SplitPdf from "./pages/SplitPdf";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";

// Blog pages
import BlogIndex from "./pages/blog/Index";
import JpgToPngQuality from "./pages/blog/JpgToPngQuality";
import HeicConversionGuide from "./pages/blog/HeicConversionGuide";
import PdfCompressionExplained from "./pages/blog/PdfCompressionExplained";
import BestImageTools2025 from "./pages/blog/BestImageTools2025";
import ReducePdfForEmail from "./pages/blog/ReducePdfForEmail";
import OnlineConverterSecurity from "./pages/blog/OnlineConverterSecurity";
import WebpFormatGuide from "./pages/blog/WebpFormatGuide";
import MergePdfsTutorial from "./pages/blog/MergePdfsTutorial";
import ImageFormatsExplained from "./pages/blog/ImageFormatsExplained";
import FixPdfTooLargeError from "./pages/blog/FixPdfTooLargeError";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
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
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
