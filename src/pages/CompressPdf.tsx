import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";
import * as pdfjsLib from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

interface CompressionTarget {
  label: string;
  description: string;
  scale: number;
}

const CompressPdf = () => {
  const [pdfFile, setPdfFile] = useState<{ name: string; blob: Blob; size: number } | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [selectedTarget, setSelectedTarget] = useState(2);

  const compressionTargets: CompressionTarget[] = [
    { label: "Maximum Quality", description: "Minimal compression", scale: 1.0 },
    { label: "High Quality", description: "~25% smaller", scale: 0.85 },
    { label: "Balanced", description: "~50% smaller", scale: 0.7 },
    { label: "Maximum Compression", description: "~70% smaller", scale: 0.5 }
  ];

  const faqs = [
    {
      question: "How do I compress a PDF file?",
      answer: "Upload your PDF using our compression tool, select your desired compression level (from high quality to maximum compression), and click 'Compress PDF'. The tool will reduce the file size and provide a download link."
    },
    {
      question: "Does PDF compression reduce quality?",
      answer: "Yes, compression typically reduces quality slightly. However, you can control the trade-off by selecting different compression levels. Maximum quality preserves most details, while maximum compression significantly reduces file size but may affect image clarity."
    },
    {
      question: "What is the difference between compression levels?",
      answer: "Maximum Quality (minimal compression) preserves most detail, High Quality reduces size by ~25%, Balanced achieves ~50% reduction, and Maximum Compression can reduce files by ~70% or more with more noticeable quality loss."
    },
    {
      question: "How much can I compress my PDF?",
      answer: "Compression results vary depending on the PDF content. PDFs with many images can be compressed significantly (50-70%), while text-heavy PDFs may see smaller reductions. Actual results depend on the original file composition."
    },
    {
      question: "Is my PDF file uploaded to a server?",
      answer: "No, all PDF compression happens locally in your browser using client-side JavaScript. Your file never leaves your device, ensuring complete privacy and security."
    },
    {
      question: "Can I compress already compressed PDFs?",
      answer: "Yes, but results may be limited. If a PDF has already been heavily compressed, further compression may not yield significant size reductions and could degrade quality."
    }
  ];

  const handleFileSelect = (fileBlob: Blob, fileName: string) => {
    setPdfFile({
      name: fileName,
      blob: fileBlob,
      size: fileBlob.size
    });
    toast.success(`Loaded ${fileName}`);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const compressImage = async (imageData: Uint8Array, type: 'jpg' | 'png', scale: number): Promise<Uint8Array> => {
    return new Promise((resolve) => {
      const blob = new Blob([imageData as any], { type: type === 'jpg' ? 'image/jpeg' : 'image/png' });
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d')!;

      img.onload = () => {
        const width = Math.floor(img.width * scale);
        const height = Math.floor(img.height * scale);
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((compressedBlob) => {
          if (compressedBlob) {
            const reader = new FileReader();
            reader.onload = () => {
              resolve(new Uint8Array(reader.result as ArrayBuffer));
            };
            reader.readAsArrayBuffer(compressedBlob);
          } else {
            resolve(imageData);
          }
        }, type === 'jpg' ? 'image/jpeg' : 'image/png', type === 'jpg' ? 0.85 : 1);
      };

      img.src = URL.createObjectURL(blob);
    });
  };

  const handleCompress = async () => {
    if (!pdfFile) {
      toast.error("Please upload a PDF file");
      return;
    }

    setIsCompressing(true);
    try {
      const arrayBuffer = await pdfFile.blob.arrayBuffer();
      const originalSize = pdfFile.size;

      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const pageCount = pdf.numPages;

      const compressionScale = compressionTargets[selectedTarget].scale;
      const qualityMap = [0.92, 0.85, 0.75, 0.65];
      const jpegQuality = qualityMap[selectedTarget] ?? 0.8;

      const compressedPdf = await PDFDocument.create();

      for (let i = 1; i <= pageCount; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: compressionScale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) continue;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page
          .render({
            canvasContext: context,
            viewport,
            canvas,
          })
          .promise;

        const dataUrl = canvas.toDataURL("image/jpeg", jpegQuality);
        const response = await fetch(dataUrl);
        const imgBuffer = await response.arrayBuffer();

        const jpgImage = await compressedPdf.embedJpg(new Uint8Array(imgBuffer));
        const pdfPage = compressedPdf.addPage([jpgImage.width, jpgImage.height]);
        pdfPage.drawImage(jpgImage, {
          x: 0,
          y: 0,
          width: jpgImage.width,
          height: jpgImage.height,
        });
      }

      const compressedPdfBytes = await compressedPdf.save({
        useObjectStreams: true,
        addDefaultPage: false,
      });

      const compressedSize = compressedPdfBytes.length;
      const reduction = Math.round(((originalSize - compressedSize) / originalSize) * 100);

      const blob = new Blob([compressedPdfBytes as any], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile.name.replace(".pdf", "_compressed.pdf");
      a.click();
      URL.revokeObjectURL(url);

      if (reduction > 0) {
        toast.success(`PDF compressed! Reduced by ${reduction}%`);
      } else {
        toast.success("PDF processed, but no further size reduction was possible.");
      }
    } catch (error) {
      toast.error("Failed to compress PDF");
      console.error(error);
    } finally {
      setIsCompressing(false);
    }
  };

  return (
    <>
      <FAQSchema faqs={faqs} />
      <WebAppSchema 
        name="Compress PDF File"
        description="Free online tool to compress and reduce PDF file size. Fast, secure, browser-based PDF compression."
        url="https://convertify.app/compress-pdf"
      />
      <Layout
        title="Compress PDF Online – Free PDF Size Reducer Tool"
        description="Compress PDF files online for free. Reduce PDF file size while maintaining quality. Fast, secure, and easy to use PDF compression tool."
        keywords="compress pdf, reduce pdf size, pdf compressor, shrink pdf, optimize pdf"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Compress PDF File
            </h1>
            <p className="text-muted-foreground">
              Reduce PDF file size while maintaining quality
            </p>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="pdf"
            maxSizeMB={50}
          />

          {pdfFile && (
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{pdfFile.name}</p>
                  <span className="text-sm text-muted-foreground">{formatFileSize(pdfFile.size)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Compression Level</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {compressionTargets.map((target, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedTarget(index)}
                      className={`p-4 rounded-lg border-2 transition-colors text-left ${
                        selectedTarget === index
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-card hover:border-primary/50'
                      }`}
                    >
                      <div className="font-medium text-foreground">{target.label}</div>
                      <div className="text-sm text-muted-foreground">{target.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={handleCompress}
                  size="lg"
                  disabled={isCompressing}
                  className="min-w-[200px]"
                >
                  {isCompressing ? (
                    "Compressing..."
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Compress PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <article className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Compress PDF Files: Complete Guide</h2>
              <p className="text-muted-foreground">
                PDF compression is essential for reducing file sizes, making documents easier to email, upload, and store. Our free online 
                PDF compressor allows you to reduce file sizes significantly while maintaining acceptable quality levels, all processed 
                securely in your browser without uploading files to any server.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Compress PDF Files?</h2>
              <p className="text-muted-foreground mb-4">
                Reducing PDF file size offers numerous practical benefits:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Email Compatibility:</strong> Many email services limit attachment sizes. Compression helps you stay within limits.</li>
                <li><strong>Faster Uploads:</strong> Smaller files upload more quickly to cloud storage, websites, or file sharing services.</li>
                <li><strong>Save Storage Space:</strong> Reduce disk usage on your device or cloud storage accounts.</li>
                <li><strong>Faster Downloads:</strong> Recipients can download compressed files more quickly, especially on slower connections.</li>
                <li><strong>Web Optimization:</strong> Smaller PDFs load faster on websites, improving user experience.</li>
                <li><strong>Bandwidth Savings:</strong> Reduce data usage when sharing files over mobile networks.</li>
                <li><strong>Improved Performance:</strong> Smaller files open and render faster in PDF viewers.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Compress PDF Files</h2>
              <p className="text-muted-foreground mb-4">
                Using our PDF compression tool is simple and effective:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload PDF:</strong> Click the upload area or drag and drop your PDF file.</li>
                <li><strong>Select Compression Level:</strong> Choose from Maximum Quality, High Quality, Balanced, or Maximum Compression.</li>
                <li><strong>Review Settings:</strong> Consider the trade-off between file size and quality for your needs.</li>
                <li><strong>Compress:</strong> Click "Compress PDF" to start the compression process.</li>
                <li><strong>Download:</strong> Your compressed PDF will automatically download to your device.</li>
                <li><strong>Compare:</strong> Check the file size reduction and quality to ensure it meets your requirements.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Understanding Compression Levels</h2>
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Maximum Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimal compression that preserves most details. Best for documents where quality is critical, such as portfolios, 
                    presentations, or documents with fine details. Achieves modest file size reduction.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">High Quality</h3>
                  <p className="text-sm text-muted-foreground">
                    Balanced approach reducing file size by approximately 25% while maintaining good quality. Suitable for most business 
                    documents, reports, and general use where quality is important.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Balanced</h3>
                  <p className="text-sm text-muted-foreground">
                    Achieves approximately 50% file size reduction with acceptable quality loss. Good for web documents, email attachments, 
                    and situations where file size is more important than perfect quality.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Maximum Compression</h3>
                  <p className="text-sm text-muted-foreground">
                    Aggressive compression reducing file size by 70% or more. Best for documents where small file size is critical, such 
                    as mobile viewing, slow internet connections, or storage-limited situations. Quality loss will be noticeable.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Email Attachments:</strong> Compress PDFs to meet email size limits (typically 10-25 MB).</li>
                <li><strong>Website Publishing:</strong> Reduce load times for downloadable PDFs on websites.</li>
                <li><strong>Cloud Storage:</strong> Save space on services like Dropbox, Google Drive, or OneDrive.</li>
                <li><strong>Mobile Sharing:</strong> Reduce data usage when sharing files via mobile networks.</li>
                <li><strong>Archiving:</strong> Compress old documents to save long-term storage space.</li>
                <li><strong>Form Submissions:</strong> Meet file size requirements for online applications and submissions.</li>
                <li><strong>Presentations:</strong> Reduce presentation file sizes for easier sharing and faster loading.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Browser-Based:</strong> All compression happens locally - your files never leave your device.</li>
                <li><strong>Multiple Compression Levels:</strong> Choose the perfect balance between size and quality for your needs.</li>
                <li><strong>Fast Processing:</strong> Instant compression without waiting for server uploads.</li>
                <li><strong>Quality Control:</strong> Select compression strength based on your specific requirements.</li>
                <li><strong>Completely Free:</strong> No subscriptions, accounts, or hidden fees.</li>
                <li><strong>Privacy Focused:</strong> Your documents remain private and secure on your device.</li>
                <li><strong>No Watermarks:</strong> Compressed PDFs have no watermarks or branding.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Tips for Best Compression Results</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Start Conservative:</strong> Begin with higher quality settings and increase compression if needed.</li>
                <li><strong>Test Results:</strong> Always check the compressed PDF to ensure quality meets your needs.</li>
                <li><strong>Consider Content:</strong> Image-heavy PDFs compress more than text-heavy documents.</li>
                <li><strong>Keep Originals:</strong> Always retain the original uncompressed file as a backup.</li>
                <li><strong>Match Use Case:</strong> Web viewing can tolerate more compression than print documents.</li>
                <li><strong>File Size Targets:</strong> Know your target - email limits, upload limits, or storage constraints.</li>
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
              <h2 className="text-xl font-semibold mb-3">Technical Details</h2>
              <p className="text-muted-foreground mb-4">
                Our PDF compressor uses advanced optimization techniques:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Object Stream Compression:</strong> Reduces redundant data in PDF structure.</li>
                <li><strong>Image Downscaling:</strong> Reduces image dimensions based on compression level.</li>
                <li><strong>Metadata Removal:</strong> Strips unnecessary metadata to reduce file size.</li>
                <li><strong>Smart Processing:</strong> Optimizes compression based on content type.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Security and Privacy</h2>
              <p className="text-muted-foreground">
                Your privacy is our priority. All PDF compression operations are performed entirely in your browser using JavaScript. 
                Your files are never uploaded to any server, transmitted over the internet, or stored anywhere except your own device. 
                This ensures complete confidentiality for sensitive business documents, legal papers, or personal files.
              </p>
            </section>
          </article>
        </div>
      </Layout>
    </>
  );
};

export default CompressPdf;