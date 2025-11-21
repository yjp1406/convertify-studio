import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

interface PdfFile {
  name: string;
  blob: Blob;
  pages: number;
}

const MergePdf = () => {
  const [pdfFiles, setPdfFiles] = useState<PdfFile[]>([]);
  const [isMerging, setIsMerging] = useState(false);

  const faqs = [
    {
      question: "How do I merge PDF files online?",
      answer: "Upload multiple PDF files using our merger tool, arrange them in your preferred order, and click 'Merge PDFs'. The tool will combine all PDFs into a single document that you can download immediately."
    },
    {
      question: "Is there a limit to how many PDFs I can merge?",
      answer: "You can merge multiple PDF files in one go. Each file should be under 20MB. For optimal performance, we recommend merging 2-10 PDFs at a time."
    },
    {
      question: "Does merging PDFs reduce quality?",
      answer: "No, our PDF merger preserves the original quality of all documents. Pages are copied exactly as they appear in the source files without any compression or quality loss."
    },
    {
      question: "Can I rearrange PDF files before merging?",
      answer: "Yes, you can remove PDFs from the list if you change your mind. The files will be merged in the order you uploaded them."
    },
    {
      question: "Are my PDF files uploaded to a server?",
      answer: "No, all PDF merging happens locally in your browser using client-side JavaScript. Your files never leave your device, ensuring complete privacy and security."
    },
    {
      question: "What happens to bookmarks and links when merging?",
      answer: "Basic merging preserves the content and pages from each PDF. However, bookmarks and internal links may need to be recreated in the merged document."
    }
  ];

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    try {
      const arrayBuffer = await fileBlob.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pageCount = pdfDoc.getPageCount();

      setPdfFiles(prev => [...prev, {
        name: fileName,
        blob: fileBlob,
        pages: pageCount
      }]);
      
      toast.success(`Added ${fileName} (${pageCount} pages)`);
    } catch (error) {
      toast.error("Invalid PDF file");
      console.error(error);
    }
  };

  const handleRemovePdf = (index: number) => {
    setPdfFiles(prev => {
      const newFiles = [...prev];
      newFiles.splice(index, 1);
      return newFiles;
    });
    toast.success("PDF removed");
  };

  const handleMerge = async () => {
    if (pdfFiles.length < 2) {
      toast.error("Please upload at least 2 PDF files to merge");
      return;
    }

    setIsMerging(true);
    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of pdfFiles) {
        const arrayBuffer = await pdfFile.blob.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        copiedPages.forEach((page) => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'merged.pdf';
      a.click();
      URL.revokeObjectURL(url);

      toast.success(`Successfully merged ${pdfFiles.length} PDFs!`);
    } catch (error) {
      toast.error("Failed to merge PDFs");
      console.error(error);
    } finally {
      setIsMerging(false);
    }
  };

  const totalPages = pdfFiles.reduce((sum, file) => sum + file.pages, 0);

  return (
    <>
      <FAQSchema faqs={faqs} />
      <WebAppSchema 
        name="Merge PDF Files"
        description="Free online tool to merge multiple PDF files into one document. Fast, secure, browser-based PDF combining."
        url="https://convertify.app/merge-pdf"
      />
      <Layout
        title="Merge PDF Files Online – Free PDF Combiner Tool"
        description="Merge multiple PDF files into one document online for free. Combine PDFs quickly and securely in your browser. No upload required."
        keywords="merge pdf, combine pdf, pdf merger, join pdf files, merge pdf online"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Merge PDF Files
            </h1>
            <p className="text-muted-foreground">
              Combine multiple PDF documents into a single file
            </p>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="pdf"
            maxSizeMB={20}
            multiple={true}
          />

          {pdfFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  PDF Files ({pdfFiles.length}) - {totalPages} total pages
                </h2>
              </div>

              <div className="space-y-2">
                {pdfFiles.map((file, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{file.pages} pages</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemovePdf(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={handleMerge}
                  size="lg"
                  disabled={isMerging || pdfFiles.length < 2}
                  className="min-w-[200px]"
                >
                  {isMerging ? (
                    "Merging..."
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Merge PDFs
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <article className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Merge PDF Files: Complete Guide</h2>
              <p className="text-muted-foreground">
                Merging PDF files is essential for combining related documents, creating comprehensive reports, or organizing multiple 
                files into a single, manageable document. Our free online PDF merger makes this process simple and secure, allowing you 
                to combine unlimited PDF files directly in your browser without uploading them to any server.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Merge PDF Files?</h2>
              <p className="text-muted-foreground mb-4">
                Combining multiple PDFs into one document offers several practical benefits:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Simplified Sharing:</strong> Send one file instead of multiple attachments in emails or file transfers.</li>
                <li><strong>Better Organization:</strong> Keep related documents together in a single, easy-to-manage file.</li>
                <li><strong>Professional Presentations:</strong> Create comprehensive proposals, reports, or portfolios.</li>
                <li><strong>Streamlined Workflows:</strong> Reduce file clutter and improve document management.</li>
                <li><strong>Archive Creation:</strong> Combine records, receipts, or documents for long-term storage.</li>
                <li><strong>Legal Documents:</strong> Merge contracts, exhibits, and supporting documents into one file.</li>
                <li><strong>Academic Papers:</strong> Combine research papers, appendices, and references.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Merge PDFs Online</h2>
              <p className="text-muted-foreground mb-4">
                Using our PDF merger tool is straightforward and fast:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload First PDF:</strong> Click the upload area or drag and drop your first PDF file.</li>
                <li><strong>Add More PDFs:</strong> Continue uploading additional PDF files one by one.</li>
                <li><strong>Review File List:</strong> Check the order and number of pages for each PDF.</li>
                <li><strong>Remove Unwanted Files:</strong> Click the X button to remove any PDFs you don't want to include.</li>
                <li><strong>Merge:</strong> Click "Merge PDFs" to combine all files into a single document.</li>
                <li><strong>Download:</strong> Your merged PDF will automatically download to your device.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases for PDF Merging</h2>
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Business Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Combine invoices, purchase orders, contracts, and supporting documents into comprehensive business packages.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Academic Materials</h3>
                  <p className="text-sm text-muted-foreground">
                    Merge lecture notes, study guides, assignments, and reference materials into organized study documents.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Legal Documents</h3>
                  <p className="text-sm text-muted-foreground">
                    Combine contracts, exhibits, evidence, and supporting documentation for legal proceedings.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Reports & Proposals</h3>
                  <p className="text-sm text-muted-foreground">
                    Create comprehensive reports by merging cover pages, main content, appendices, and references.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Best Practices for Merging PDFs</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Check Page Counts:</strong> Verify each PDF's page count before merging to ensure completeness.</li>
                <li><strong>Consistent Formatting:</strong> For professional results, ensure source PDFs have similar page sizes and orientation.</li>
                <li><strong>Logical Order:</strong> Upload files in the order you want them to appear in the final document.</li>
                <li><strong>File Names:</strong> Use descriptive file names to easily identify documents in your list.</li>
                <li><strong>Review Before Merging:</strong> Double-check your file list and remove any unwanted documents.</li>
                <li><strong>Backup Originals:</strong> Keep original PDF files as backups before merging.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Key Features of Our PDF Merger</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Browser-Based Processing:</strong> All merging happens locally - your files never leave your device.</li>
                <li><strong>No File Limits:</strong> Merge as many PDFs as you need, up to 20MB each.</li>
                <li><strong>Quality Preservation:</strong> Original PDF quality and formatting are maintained perfectly.</li>
                <li><strong>Fast Processing:</strong> Instant merging without waiting for server uploads or processing.</li>
                <li><strong>Completely Free:</strong> No subscriptions, accounts, or hidden charges.</li>
                <li><strong>Privacy Focused:</strong> Your documents remain private and secure on your device.</li>
                <li><strong>Cross-Platform:</strong> Works on any device with a modern web browser.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Technical Details</h2>
              <p className="text-muted-foreground mb-4">
                Our PDF merger uses advanced client-side technology to process your documents:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>PDF-lib Technology:</strong> Professional-grade PDF manipulation library for accurate merging.</li>
                <li><strong>Page Copying:</strong> Each page is precisely copied maintaining all content and formatting.</li>
                <li><strong>Metadata Handling:</strong> Document metadata from the first PDF is preserved in the merged file.</li>
                <li><strong>Memory Efficient:</strong> Optimized processing for handling large documents smoothly.</li>
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

            <section>
              <h2 className="text-xl font-semibold mb-3">Security and Privacy</h2>
              <p className="text-muted-foreground mb-4">
                We take your privacy seriously. All PDF merging operations are performed entirely in your browser using JavaScript. 
                Your files are never uploaded to any server, transmitted over the internet, or stored anywhere except your own device. 
                This ensures complete confidentiality for sensitive business documents, legal papers, or personal files.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Tips for Large Document Merging</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Browser Memory:</strong> For very large PDFs (100+ pages each), merge in smaller batches for best performance.</li>
                <li><strong>File Optimization:</strong> Consider compressing large PDFs before merging to reduce final file size.</li>
                <li><strong>Page Orientation:</strong> Mix portrait and landscape pages as needed - orientation is preserved.</li>
                <li><strong>Testing:</strong> For important documents, test with a few pages first to verify the merge quality.</li>
              </ul>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default MergePdf;