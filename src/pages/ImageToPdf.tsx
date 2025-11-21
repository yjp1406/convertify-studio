import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

interface ImageFile {
  name: string;
  blob: Blob;
  preview: string;
}

const ImageToPdf = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [singlePdf, setSinglePdf] = useState(true);
  const [isConverting, setIsConverting] = useState(false);

  const faqs = [
    {
      question: "How do I convert images to PDF?",
      answer: "Upload your images (JPG, PNG, WebP, or HEIC) using our converter. Choose whether to create a single PDF with all images or separate PDFs for each image. Click convert, and download your PDF file(s)."
    },
    {
      question: "Can I convert multiple images to one PDF?",
      answer: "Yes! By default, our converter combines all uploaded images into a single PDF file. You can toggle this option to create separate PDF files for each image instead."
    },
    {
      question: "What image formats are supported?",
      answer: "Our converter supports JPG, JPEG, PNG, WebP, and HEIC image formats. All images are processed locally in your browser for maximum privacy and security."
    },
    {
      question: "Is there a limit to how many images I can convert?",
      answer: "You can convert multiple images in succession. Each image must be under 20MB. For optimal performance, we recommend processing batches of 10-20 images at a time."
    },
    {
      question: "Does the converter maintain image quality?",
      answer: "Yes, our converter preserves the original image quality and dimensions when creating PDF files. The images are embedded at their native resolution."
    },
    {
      question: "Are my images uploaded to a server?",
      answer: "No, all conversion happens locally in your browser using client-side JavaScript. Your images never leave your device, ensuring complete privacy and security."
    }
  ];

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    const preview = URL.createObjectURL(fileBlob);
    setImages(prev => [...prev, {
      name: fileName,
      blob: fileBlob,
      preview
    }]);
    toast.success(`Added ${fileName}`);
  };

  const imageToPdfBytes = async (imageBlob: Blob): Promise<Uint8Array> => {
    const arrayBuffer = await imageBlob.arrayBuffer();
    const imageBytes = new Uint8Array(arrayBuffer);
    
    const pdfDoc = await PDFDocument.create();
    
    let image;
    if (imageBlob.type === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      image = await pdfDoc.embedJpg(imageBytes);
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    return await pdfDoc.save();
  };

  const handleConvert = async () => {
    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsConverting(true);
    try {
      if (singlePdf) {
        // Combine all images into one PDF
        const pdfDoc = await PDFDocument.create();

        for (const image of images) {
          const arrayBuffer = await image.blob.arrayBuffer();
          const imageBytes = new Uint8Array(arrayBuffer);
          
          let embeddedImage;
          if (image.blob.type === 'image/png') {
            embeddedImage = await pdfDoc.embedPng(imageBytes);
          } else {
            embeddedImage = await pdfDoc.embedJpg(imageBytes);
          }

          const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);
          page.drawImage(embeddedImage, {
            x: 0,
            y: 0,
            width: embeddedImage.width,
            height: embeddedImage.height,
          });
        }

        const pdfBytes = await pdfDoc.save();
        const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'converted-images.pdf';
        a.click();
        URL.revokeObjectURL(url);

        toast.success("PDF created successfully!");
      } else {
        // Create separate PDFs for each image
        for (const image of images) {
          const pdfBytes = await imageToPdfBytes(image.blob);
          const blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          const pdfName = image.name.replace(/\.[^/.]+$/, '.pdf');
          a.download = pdfName;
          a.click();
          URL.revokeObjectURL(url);
        }

        toast.success(`Created ${images.length} PDF file(s)!`);
      }
    } catch (error) {
      toast.error("Failed to convert images to PDF");
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <>
      <FAQSchema faqs={faqs} />
      <WebAppSchema 
        name="Image to PDF Converter"
        description="Free online tool to convert images to PDF format. Combine multiple images into one PDF."
        url="https://convertify.app/image-to-pdf"
      />
      <Layout
        title="Image to PDF Converter – Free Online JPG PNG to PDF"
        description="Convert images to PDF online for free. Combine multiple JPG, PNG, WebP images into one PDF or create separate PDFs. Fast, secure, browser-based conversion."
        keywords="image to pdf, jpg to pdf, png to pdf, convert image to pdf, combine images to pdf"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Image to PDF Converter
            </h1>
            <p className="text-muted-foreground">
              Convert JPG, PNG, WebP images to PDF format
            </p>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="images"
            maxSizeMB={20}
            multiple={true}
          />

          {images.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Images ({images.length})
                </h2>
                <div className="flex items-center gap-2">
                  <Label htmlFor="single-pdf">Single PDF</Label>
                  <Switch
                    id="single-pdf"
                    checked={singlePdf}
                    onCheckedChange={setSinglePdf}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="rounded-lg overflow-hidden border border-border bg-card aspect-square">
                      <img 
                        src={image.preview} 
                        alt={image.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                    <p className="text-xs text-muted-foreground mt-1 truncate">
                      {image.name}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <Button 
                  onClick={handleConvert}
                  size="lg"
                  disabled={isConverting}
                  className="min-w-[200px]"
                >
                  {isConverting ? (
                    "Converting..."
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Convert to PDF
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          <article className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Convert Images to PDF: Complete Guide</h2>
              <p className="text-muted-foreground">
                Converting images to PDF is a common task for creating documents, portfolios, presentations, and archives. Our free online 
                image to PDF converter makes this process simple and secure, allowing you to combine multiple images into a single PDF or 
                create separate PDFs for each image - all processed locally in your browser without uploading files to any server.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Convert Images to PDF?</h2>
              <p className="text-muted-foreground mb-4">
                PDF format offers numerous advantages over individual image files for many use cases:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Professional Documents:</strong> Create professional-looking documents from scanned images or photos.</li>
                <li><strong>Easy Sharing:</strong> Send multiple images as a single file, simplifying email attachments and file transfers.</li>
                <li><strong>Consistent Viewing:</strong> PDFs display identically across all devices and platforms.</li>
                <li><strong>Print Ready:</strong> PDF is the standard format for professional printing services.</li>
                <li><strong>Portfolio Creation:</strong> Combine artwork, photos, or design samples into a cohesive portfolio.</li>
                <li><strong>Digital Archives:</strong> Organize and preserve important documents, receipts, and records.</li>
                <li><strong>Reduced File Count:</strong> Manage fewer files by combining related images into single PDFs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Use Our Image to PDF Converter</h2>
              <p className="text-muted-foreground mb-4">
                Converting your images to PDF is straightforward with our user-friendly tool:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload Images:</strong> Click the upload area or drag and drop your image files (JPG, PNG, WebP, HEIC).</li>
                <li><strong>Add Multiple Images:</strong> Upload additional images one by one to include them in your PDF.</li>
                <li><strong>Choose PDF Mode:</strong> Toggle between single PDF (combines all images) or separate PDFs (one per image).</li>
                <li><strong>Preview Images:</strong> Review your images in the grid view and remove any you don't want to include.</li>
                <li><strong>Convert:</strong> Click "Convert to PDF" to process your images.</li>
                <li><strong>Download:</strong> Your PDF file(s) will automatically download to your device.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Supported Image Formats</h2>
              <p className="text-muted-foreground mb-4">
                Our converter supports all major image formats:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">JPG/JPEG</h3>
                  <p className="text-sm text-muted-foreground">
                    The most common image format, ideal for photographs and complex images with many colors.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">PNG</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for graphics, screenshots, and images with transparency (though transparency is flattened in PDF).
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">WebP</h3>
                  <p className="text-sm text-muted-foreground">
                    Modern image format offering excellent compression, commonly used on websites.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">HEIC</h3>
                  <p className="text-sm text-muted-foreground">
                    Apple's efficient format used by iPhones and iPads, offering great quality at smaller file sizes.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Single PDF vs. Separate PDFs</h2>
              <p className="text-muted-foreground mb-4">
                Choose the conversion mode that best fits your needs:
              </p>
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Single PDF Mode (Default)</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Combines all uploaded images into one PDF file, with each image on its own page.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Best for:</strong> Creating documents, portfolios, multi-page reports, or organizing related images together.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Separate PDFs Mode</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Creates individual PDF files for each uploaded image.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    <strong>Best for:</strong> Converting multiple unrelated images, creating individual document scans, or batch processing.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Document Scanning:</strong> Convert phone photos of documents, receipts, or business cards into PDFs.</li>
                <li><strong>Portfolio Creation:</strong> Combine artwork, photography, or design work into a professional portfolio.</li>
                <li><strong>Presentation Materials:</strong> Create PDF handouts from presentation slides or images.</li>
                <li><strong>Recipe Books:</strong> Compile recipe photos into an organized digital cookbook.</li>
                <li><strong>Study Materials:</strong> Convert textbook pages or notes photos into searchable PDFs.</li>
                <li><strong>Real Estate Listings:</strong> Create property brochures from multiple photos.</li>
                <li><strong>Product Catalogs:</strong> Compile product images into shareable catalogs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>100% Browser-Based:</strong> All processing happens locally - your images never leave your device.</li>
                <li><strong>No File Size Limits:</strong> Convert images up to 20MB each, suitable for high-resolution photos.</li>
                <li><strong>Unlimited Conversions:</strong> Convert as many images as you need, completely free.</li>
                <li><strong>Quality Preservation:</strong> Images are embedded at native resolution without quality loss.</li>
                <li><strong>Flexible Output:</strong> Choose between single combined PDF or individual PDFs.</li>
                <li><strong>Privacy Focused:</strong> No uploads, no accounts, complete privacy.</li>
                <li><strong>Cross-Platform:</strong> Works on any device with a modern web browser.</li>
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

export default ImageToPdf;
