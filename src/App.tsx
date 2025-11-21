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
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import About from "./pages/About";
import TermsAndConditions from "./pages/TermsAndConditions";

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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
