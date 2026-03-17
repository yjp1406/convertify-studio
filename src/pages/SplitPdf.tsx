import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

// Lazy load PDF libraries
let pdfLibLoaded: typeof import('pdf-lib') | null = null;
let pdfjsLoaded: { getDocument: any; GlobalWorkerOptions: any } | null = null;

const loadPdfLib = async () => {
  if (!pdfLibLoaded) {
    pdfLibLoaded = await import('pdf-lib');
  }
  return pdfLibLoaded;
};

const loadPdfjs = async () => {
  if (!pdfjsLoaded) {
    const pdfjs = await import('pdfjs-dist/legacy/build/pdf');
    const pdfjsWorker = await import('pdfjs-dist/legacy/build/pdf.worker.min.js?url');
    pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
    pdfjsLoaded = {
      getDocument: pdfjs.getDocument,
      GlobalWorkerOptions: pdfjs.GlobalWorkerOptions,
    };
  }
  return pdfjsLoaded;
};

interface PageInfo {
  pageNumber: number;
  selected: boolean;
  thumbnail?: string;
}

const SplitPdf = () => {
  const [pdfFile, setPdfFile] = useState<{ name: string; blob: Blob } | null>(null);
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pageRange, setPageRange] = useState("");
  const [isGeneratingThumbnails, setIsGeneratingThumbnails] = useState(false);

  const faqs = [
    {
      question: "How do I split a PDF file?",
      answer: "Upload your PDF, then either select specific pages by checking boxes or enter a page range (e.g., '1-3, 5, 7-9'). Click 'Split PDF' to create a new PDF with only your selected pages."
    },
    {
      question: "Can I extract non-consecutive pages?",
      answer: "Yes! You can select any combination of pages. Either check individual page boxes or use comma-separated ranges like '1, 3, 5-8, 12' to extract specific pages in any order."
    },
    {
      question: "What happens to the original PDF?",
      answer: "Your original PDF remains unchanged. We create a new PDF file containing only the pages you selected, which you download separately."
    },
    {
      question: "Is there a page limit for splitting?",
      answer: "The tool can handle large PDFs, though processing very large documents (100+ pages) may take longer. File size limit is 50MB for optimal performance."
    },
    {
      question: "Is my PDF uploaded to a server?",
      answer: "No, all PDF processing happens locally in your browser. Your document never leaves your device, ensuring complete privacy and security."
    },
    {
      question: "Can I split one PDF into multiple files?",
      answer: "Currently, the tool extracts selected pages into a single new PDF. To create multiple files, run the split process multiple times with different page selections."
    }
  ];

  const generateThumbnails = async (file: Blob) => {
    setIsGeneratingThumbnails(true);
    try {
      const pdfjsLib = await loadPdfjs();
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pageCount = pdf.numPages;

      const pageInfos: PageInfo[] = [];
      for (let i = 1; i <= pageCount; i++) {
        try {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 0.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          if (context) {
            canvas.width = viewport.width;
            canvas.height = viewport.height;

          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise;

            pageInfos.push({
              pageNumber: i,
              selected: false,
              thumbnail: canvas.toDataURL('image/jpeg', 0.7)
            });
          }
        } catch (error) {
          console.error(`Error generating thumbnail for page ${i}:`, error);
          pageInfos.push({
            pageNumber: i,
            selected: false
          });
        }
      }

      setPages(pageInfos);
    } catch (error) {
      console.error('Error generating thumbnails:', error);
      toast.error("Failed to load PDF pages");
    } finally {
      setIsGeneratingThumbnails(false);
    }
  };

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    setPdfFile({ name: fileName, blob: fileBlob });
    setPages([]);
    setPageRange("");
    toast.success(`Loaded ${fileName}`);
    await generateThumbnails(fileBlob);
  };

  const togglePage = (pageNumber: number) => {
    setPages(prev => prev.map(p => 
      p.pageNumber === pageNumber ? { ...p, selected: !p.selected } : p
    ));
  };

  const selectAll = () => {
    setPages(prev => prev.map(p => ({ ...p, selected: true })));
  };

  const deselectAll = () => {
    setPages(prev => prev.map(p => ({ ...p, selected: false })));
  };

  const applyPageRange = () => {
    if (!pageRange.trim()) {
      toast.error("Please enter a page range");
      return;
    }

    try {
      const selectedPages = new Set<number>();
      const ranges = pageRange.split(',');

      for (const range of ranges) {
        const trimmed = range.trim();
        if (trimmed.includes('-')) {
          const [start, end] = trimmed.split('-').map(n => parseInt(n.trim()));
          if (isNaN(start) || isNaN(end)) {
            throw new Error("Invalid range format");
          }
          for (let i = start; i <= end; i++) {
            if (i >= 1 && i <= pages.length) {
              selectedPages.add(i);
            }
          }
        } else {
          const pageNum = parseInt(trimmed);
          if (isNaN(pageNum)) {
            throw new Error("Invalid page number");
          }
          if (pageNum >= 1 && pageNum <= pages.length) {
            selectedPages.add(pageNum);
          }
        }
      }

      setPages(prev => prev.map(p => ({
        ...p,
        selected: selectedPages.has(p.pageNumber)
      })));

      toast.success(`Selected ${selectedPages.size} pages`);
    } catch (error) {
      toast.error("Invalid page range format. Use format like: 1-3, 5, 7-9");
    }
  };

  const shouldUseCompatibilityFallback = (error: unknown) => {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    return (
      message.includes("encrypted") ||
      message.includes("invalid object") ||
      message.includes("input document")
    );
  };

  const splitWithPdfLib = async (arrayBuffer: ArrayBuffer, selectedPages: number[]) => {
    const { PDFDocument } = await loadPdfLib();

    let sourcePdf;
    try {
      sourcePdf = await PDFDocument.load(arrayBuffer);
    } catch (error) {
      const message = error instanceof Error ? error.message.toLowerCase() : "";
      if (!message.includes("encrypted")) {
        throw error;
      }
      sourcePdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
    }

    const newPdf = await PDFDocument.create();
    const copiedPages = await newPdf.copyPages(
      sourcePdf,
      selectedPages.map((pageNumber) => pageNumber - 1)
    );

    copiedPages.forEach((page) => {
      newPdf.addPage(page);
    });

    return newPdf.save();
  };

  const splitWithRenderedPages = async (arrayBuffer: ArrayBuffer, selectedPages: number[]) => {
    const pdfjsLib = await loadPdfjs();
    const { PDFDocument } = await loadPdfLib();
    const sourcePdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const outputPdf = await PDFDocument.create();

    for (const pageNumber of selectedPages) {
      const page = await sourcePdf.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas rendering is unavailable");
      }

      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);

      await page.render({
        canvasContext: context,
        viewport,
      }).promise;

      const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.92);
      const image = await outputPdf.embedJpg(jpegDataUrl);
      const outputPage = outputPdf.addPage([viewport.width, viewport.height]);
      outputPage.drawImage(image, {
        x: 0,
        y: 0,
        width: viewport.width,
        height: viewport.height,
      });
    }

    return outputPdf.save();
  };

  const handleSplit = async () => {
    if (!pdfFile) {
      toast.error("Please upload a PDF file");
      return;
    }

    const selectedPages = pages.filter((p) => p.selected).map((p) => p.pageNumber);
    if (selectedPages.length === 0) {
      toast.error("Please select at least one page");
      return;
    }

    setIsProcessing(true);
    try {
      const arrayBuffer = await pdfFile.blob.arrayBuffer();
      let pdfBytes: Uint8Array;

      try {
        pdfBytes = await splitWithPdfLib(arrayBuffer, selectedPages);
      } catch (error) {
        if (!shouldUseCompatibilityFallback(error)) {
          throw error;
        }

        toast.info("Protected PDF detected — using compatibility fallback");
        pdfBytes = await splitWithRenderedPages(arrayBuffer, selectedPages);
      }

      const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile.name.replace(/\.pdf$/i, `_pages_${selectedPages.join("-")}.pdf`);
      a.click();
      URL.revokeObjectURL(url);

      toast.success(`Extracted ${selectedPages.length} pages successfully!`);
    } catch (error) {
      toast.error("Failed to split PDF");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Split PDF Online - Free PDF Page Extractor Tool"
        description="Split PDF files by extracting specific pages. Select page ranges or individual pages to create new PDF documents. Free and secure."
        keywords="split pdf, extract pdf pages, pdf splitter, divide pdf, pdf page extractor"
      />
      <FAQSchema faqs={faqs} />
      <WebAppSchema
        name="Split PDF Tool"
        description="Split PDF files by extracting specific pages online for free. Fast, secure, browser-based PDF splitting."
        url="https://convertify.app/split-pdf"
      />
      <Layout
        title="Split PDF Online - Extract Pages from PDF Free"
        description="Split PDF files by extracting specific pages. Select page ranges or individual pages to create new PDF documents. Free and secure."
        keywords="split pdf, extract pdf pages, pdf splitter, divide pdf"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Split PDF - Extract Pages
            </h1>
            <p className="text-muted-foreground">
              Select specific pages or ranges to extract from your PDF
            </p>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="pdf"
            maxSizeMB={50}
          />

          {isGeneratingThumbnails && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Loading PDF pages...</p>
            </div>
          )}

          {pdfFile && pages.length > 0 && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-4">Page Selection</h3>
                
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="e.g., 1-3, 5, 7-9"
                      value={pageRange}
                      onChange={(e) => setPageRange(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={applyPageRange} variant="secondary">
                      Apply Range
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={selectAll} variant="outline" size="sm">
                      Select All
                    </Button>
                    <Button onClick={deselectAll} variant="outline" size="sm">
                      Deselect All
                    </Button>
                    <div className="ml-auto text-sm text-muted-foreground">
                      {pages.filter(p => p.selected).length} of {pages.length} pages selected
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {pages.map((page) => (
                  <div
                    key={page.pageNumber}
                    className={`relative border-2 rounded-lg p-2 cursor-pointer transition-all ${
                      page.selected
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => togglePage(page.pageNumber)}
                  >
                    <div className="absolute top-3 left-3 z-10">
                      <Checkbox
                        checked={page.selected}
                        onCheckedChange={() => togglePage(page.pageNumber)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    
                    {page.thumbnail ? (
                      <img
                        src={page.thumbnail}
                        alt={`Page ${page.pageNumber}`}
                        className="w-full h-auto rounded"
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-muted rounded flex items-center justify-center">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    
                    <p className="text-center text-sm font-medium text-foreground mt-2">
                      Page {page.pageNumber}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={handleSplit}
                  size="lg"
                  disabled={isProcessing || pages.filter(p => p.selected).length === 0}
                  className="min-w-[200px]"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Split PDF ({pages.filter(p => p.selected).length} pages)
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <article className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Split PDF Files: Complete Guide</h2>
              <p className="text-muted-foreground">
                PDF splitting is essential when you need to extract specific pages or sections from a larger document. Whether you're 
                separating chapters, extracting forms, or sharing specific sections, our free PDF splitter makes it simple and secure. 
                All processing happens in your browser - your documents never leave your device.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Split PDF Files?</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Extract Relevant Pages:</strong> Pull out specific pages you need without sharing the entire document.</li>
                <li><strong>Reduce File Size:</strong> Create smaller files by removing unnecessary pages.</li>
                <li><strong>Organize Documents:</strong> Separate multi-part documents into individual files for better organization.</li>
                <li><strong>Share Selectively:</strong> Send only relevant sections to recipients instead of the full document.</li>
                <li><strong>Email Size Limits:</strong> Split large PDFs to meet email attachment size restrictions.</li>
                <li><strong>Privacy Protection:</strong> Remove sensitive pages before sharing documents externally.</li>
                <li><strong>Archive Management:</strong> Break down large archives into manageable, categorized files.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Split PDF</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload PDF:</strong> Click the upload area or drag and drop your PDF file.</li>
                <li><strong>Wait for Preview:</strong> The tool generates thumbnails for all pages automatically.</li>
                <li><strong>Select Pages:</strong> Click individual page thumbnails or use the page range input (e.g., '1-3, 5, 7').</li>
                <li><strong>Review Selection:</strong> Check the counter to confirm how many pages you've selected.</li>
                <li><strong>Split PDF:</strong> Click the 'Split PDF' button to create a new PDF with selected pages.</li>
                <li><strong>Download:</strong> Your extracted PDF downloads automatically with a descriptive filename.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Page Selection Methods</h2>
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Visual Selection</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on page thumbnails to select or deselect them. Selected pages are highlighted with a colored border. 
                    This method is perfect when you can visually identify the pages you need.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Page Range Input</h3>
                  <p className="text-sm text-muted-foreground">
                    Enter page ranges using comma-separated values and dashes. Examples: '1-5' selects pages 1 through 5, 
                    '1, 3, 5' selects only those specific pages, '1-3, 7-10, 15' combines ranges and individual pages.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Bulk Actions</h3>
                  <p className="text-sm text-muted-foreground">
                    Use 'Select All' to quickly select every page, then deselect individual pages you don't need. Use 'Deselect All' 
                    to start fresh with your selection.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Page Thumbnails:</strong> Visual previews of all pages make selection easier and more accurate.</li>
                <li><strong>Flexible Selection:</strong> Choose pages individually, by ranges, or use combinations of both methods.</li>
                <li><strong>Browser-Based:</strong> All processing happens locally - your documents remain private and secure.</li>
                <li><strong>Large File Support:</strong> Handle PDFs up to 50MB with efficient processing.</li>
                <li><strong>No Page Limits:</strong> Extract any number of pages from documents of any size.</li>
                <li><strong>Free and Unlimited:</strong> Split as many PDFs as you need without restrictions or subscriptions.</li>
                <li><strong>Descriptive Filenames:</strong> Downloaded files include page numbers in the filename for easy identification.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Extract Forms:</strong> Pull specific forms or applications from multi-page document packages.</li>
                <li><strong>Separate Chapters:</strong> Split books or manuals into individual chapter files.</li>
                <li><strong>Email Compliance:</strong> Break large documents into smaller files that meet email size restrictions.</li>
                <li><strong>Privacy Redaction:</strong> Remove pages containing sensitive information before sharing.</li>
                <li><strong>Presentation Prep:</strong> Extract relevant slides or pages for specific presentations.</li>
                <li><strong>Archive Organization:</strong> Separate scanned document batches into individual categorized files.</li>
                <li><strong>Contract Sections:</strong> Extract specific contract sections or exhibits for review or signature.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Tips for Best Results</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Preview First:</strong> Review page thumbnails to ensure you're selecting the correct pages.</li>
                <li><strong>Use Page Ranges:</strong> For consecutive pages, use range notation (e.g., '1-10') instead of clicking each page.</li>
                <li><strong>Check Selection Count:</strong> Always verify the number of selected pages before splitting.</li>
                <li><strong>Descriptive Names:</strong> Rename downloaded files with meaningful names for better organization.</li>
                <li><strong>Keep Originals:</strong> Maintain the original PDF as a backup before splitting.</li>
                <li><strong>Multiple Extracts:</strong> For creating multiple split files, save each extraction before starting the next.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-muted/30 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default SplitPdf;
