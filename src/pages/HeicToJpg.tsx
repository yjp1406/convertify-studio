import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import heic2any from "heic2any";

const HeicToJpg = () => {
  const [originalImage, setOriginalImage] = useState<{ name: string; size: number } | null>(null);
  const [convertedImage, setConvertedImage] = useState<{ url: string; blob: Blob } | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionError, setConversionError] = useState<string | null>(null);

  const faqs = [
    {
      question: "How do I convert HEIC to JPG?",
      answer: "Upload your HEIC or HEIF file using our converter tool. The conversion happens automatically in your browser using advanced conversion libraries, and you can download the JPG file immediately."
    },
    {
      question: "What is HEIC format?",
      answer: "HEIC (High Efficiency Image Container) is a modern image format used by Apple devices since iOS 11. It offers better compression than JPG while maintaining quality, but it's not widely supported outside the Apple ecosystem."
    },
    {
      question: "Why convert HEIC to JPG?",
      answer: "JPG is universally compatible with all devices, operating systems, and applications. Converting HEIC to JPG ensures your photos can be viewed and shared anywhere without compatibility issues."
    },
    {
      question: "Will I lose quality when converting HEIC to JPG?",
      answer: "Our converter maintains high quality during conversion. While JPG uses lossy compression, we use optimized settings to preserve as much detail as possible from your HEIC images."
    },
    {
      question: "Is my photo uploaded to a server?",
      answer: "No, all conversions happen entirely in your browser using client-side JavaScript. Your photos never leave your device, ensuring complete privacy and security."
    },
    {
      question: "My browser says it doesn't support HEIC. What should I do?",
      answer: "HEIC conversion requires modern browser features. Try using the latest version of Chrome, Firefox, or Edge. Safari has the best HEIC support. If issues persist, you may need to convert using a desktop application."
    }
  ];

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    const fileType = fileBlob.type.toLowerCase();
    const fileExt = fileName.toLowerCase();
    
    if (!fileType.includes('heic') && !fileType.includes('heif') && 
        !fileExt.endsWith('.heic') && !fileExt.endsWith('.heif')) {
      toast.error("Please select a HEIC or HEIF file");
      return;
    }

    setOriginalImage({ name: fileName, size: fileBlob.size });
    setConvertedImage(null);
    setConversionError(null);
    setIsConverting(true);

    try {
      // Convert HEIC to JPG using heic2any
      const convertedBlob = await heic2any({
        blob: fileBlob,
        toType: 'image/jpeg',
        quality: 0.95
      });

      // heic2any may return Blob or Blob[]
      const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      
      const url = URL.createObjectURL(resultBlob);
      setConvertedImage({ url, blob: resultBlob });
      toast.success("HEIC converted to JPG successfully!");
    } catch (error: any) {
      console.error('Conversion error:', error);
      const errorMessage = error?.message || "Failed to convert HEIC file";
      setConversionError(errorMessage);
      
      if (errorMessage.includes('not supported') || errorMessage.includes('HEIC')) {
        toast.error("Your browser doesn't support HEIC conversion. Try using Chrome or Safari.");
      } else {
        toast.error("Conversion failed. The file may be corrupted or incompatible.");
      }
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedImage || !originalImage) return;

    const a = document.createElement('a');
    a.href = convertedImage.url;
    a.download = originalImage.name.replace(/\.(heic|heif)$/i, '.jpg');
    a.click();
    toast.success("JPG downloaded!");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <>
      <SEOHead
        title="HEIC to JPG Converter - Free Online HEIC to JPEG Tool"
        description="Convert HEIC and HEIF images to JPG format online for free. Fast, secure browser-based conversion for Apple photos."
        keywords="heic to jpg, heic to jpeg, convert heic, heif to jpg, apple photos converter"
      />
      <FAQSchema faqs={faqs} />
      <WebAppSchema
        name="HEIC to JPG Converter"
        description="Convert HEIC and HEIF images to JPG format online for free. Fast, secure, browser-based conversion."
        url="https://convertify.app/heic-to-jpg"
      />
      <Layout
        title="HEIC to JPG Converter - Convert Apple HEIC Photos to JPEG Free"
        description="Convert HEIC and HEIF images to JPG format online for free. Fast, secure browser-based conversion for Apple photos."
        keywords="heic to jpg, heic to jpeg, convert heic, heif to jpg, apple photos"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              HEIC to JPG Converter
            </h1>
            <p className="text-muted-foreground">
              Convert Apple HEIC photos to universally compatible JPG format
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-1">Browser Compatibility Note</p>
                <p>HEIC conversion works best in Chrome, Firefox, Edge, and Safari. If you encounter issues, try a different browser or update to the latest version.</p>
              </div>
            </div>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="images"
            maxSizeMB={50}
          />

          {isConverting && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-4">Converting HEIC to JPG...</p>
              <p className="text-sm text-muted-foreground mt-2">This may take a moment for large files</p>
            </div>
          )}

          {conversionError && (
            <div className="bg-destructive/10 border border-destructive rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-destructive mb-1">Conversion Failed</p>
                  <p className="text-muted-foreground">{conversionError}</p>
                </div>
              </div>
            </div>
          )}

          {originalImage && convertedImage && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Conversion Complete</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Original (HEIC)</p>
                      <p className="font-medium text-foreground">{formatFileSize(originalImage.size)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Converted (JPG)</p>
                      <p className="font-medium text-foreground">{formatFileSize(convertedImage.blob.size)}</p>
                    </div>
                  </div>
                </div>

                <div className="border border-border rounded-lg overflow-hidden bg-card">
                  <img src={convertedImage.url} alt="Converted" className="w-full h-auto" />
                </div>
              </div>

              <div className="flex justify-center">
                <Button onClick={handleDownload} size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download JPG
                </Button>
              </div>
            </div>
          )}

          <article className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">HEIC to JPG Converter: Complete Guide</h2>
              <p className="text-muted-foreground">
                HEIC (High Efficiency Image Container) is Apple's default photo format introduced in iOS 11. While it offers excellent 
                compression and quality, it's not universally supported. Converting HEIC to JPG ensures your photos work on all devices, 
                platforms, and applications. Our free online converter makes this process simple and secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Convert HEIC to JPG?</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Universal Compatibility:</strong> JPG works on all devices - Windows, Android, Mac, iOS, and Linux.</li>
                <li><strong>Social Media:</strong> Most platforms prefer JPG for uploads and display.</li>
                <li><strong>Sharing Made Easy:</strong> Recipients can view JPG files without special software or codecs.</li>
                <li><strong>Professional Use:</strong> Many professional tools and workflows require JPG format.</li>
                <li><strong>Web Publishing:</strong> JPG is the standard format for website images and online galleries.</li>
                <li><strong>Printing Services:</strong> Print shops typically require JPG or PNG formats.</li>
                <li><strong>Email Attachments:</strong> Ensure recipients can view photos regardless of their device or email client.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Convert HEIC to JPG</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload HEIC File:</strong> Click the upload area or drag and drop your HEIC or HEIF file.</li>
                <li><strong>Automatic Processing:</strong> The tool converts your image using advanced browser-based libraries.</li>
                <li><strong>Wait for Conversion:</strong> Large files may take a few moments to process completely.</li>
                <li><strong>Preview Result:</strong> View the converted JPG image and check file size.</li>
                <li><strong>Download JPG:</strong> Click the download button to save your converted image.</li>
                <li><strong>Convert More:</strong> Upload another HEIC file to convert additional photos.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Understanding HEIC Format</h2>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">What is HEIC?</h3>
                  <p className="text-sm text-muted-foreground">
                    HEIC uses HEVC (High Efficiency Video Coding) compression to create smaller files with better quality than JPG. 
                    Apple adopted it as the default format for iPhone and iPad photos, reducing storage usage while maintaining quality.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">HEIC vs JPG</h3>
                  <p className="text-sm text-muted-foreground">
                    HEIC files are typically 50% smaller than equivalent JPG files at the same quality level. However, JPG has universal 
                    support across all platforms and devices, making it more practical for sharing and compatibility.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Browser-Based Conversion:</strong> No software installation required, works directly in your web browser.</li>
                <li><strong>Complete Privacy:</strong> All conversion happens locally on your device, files never uploaded to servers.</li>
                <li><strong>High Quality Output:</strong> Maintains photo quality with optimized JPG compression settings.</li>
                <li><strong>Free and Unlimited:</strong> Convert as many HEIC files as you need without restrictions or fees.</li>
                <li><strong>File Size Preview:</strong> See both original and converted file sizes before downloading.</li>
                <li><strong>Fast Processing:</strong> Most conversions complete in seconds, even for large images.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>iPhone Photos:</strong> Convert iPhone photos for use on Windows PCs or Android devices.</li>
                <li><strong>Social Media:</strong> Prepare photos for platforms that don't fully support HEIC format.</li>
                <li><strong>Photo Editing:</strong> Convert before importing into editing software that doesn't support HEIC.</li>
                <li><strong>Website Upload:</strong> Convert for website galleries and content management systems.</li>
                <li><strong>Email Sharing:</strong> Ensure recipients can view your photos in any email client.</li>
                <li><strong>Professional Printing:</strong> Convert for print services that require JPG format.</li>
                <li><strong>Archive Conversion:</strong> Convert entire photo libraries for maximum compatibility.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Tips for Best Results</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Use Modern Browser:</strong> Chrome, Firefox, Edge, and Safari provide the best HEIC conversion support.</li>
                <li><strong>Check File Size:</strong> Compare original and converted sizes - JPG may be larger in some cases.</li>
                <li><strong>Keep Originals:</strong> Always retain original HEIC files as backup for highest quality.</li>
                <li><strong>Batch Export on iPhone:</strong> For multiple files, use iPhone's built-in export as JPG feature.</li>
                <li><strong>Quality Check:</strong> Preview converted images to ensure quality meets your needs.</li>
                <li><strong>Large Files:</strong> Be patient with large HEIC files - conversion may take up to a minute.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Troubleshooting</h2>
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Conversion Failed Error</h3>
                  <p className="text-sm text-muted-foreground">
                    Try using a different browser (Chrome or Safari recommended). Ensure your browser is updated to the latest version. 
                    Some older browsers don't support the required conversion libraries.
                  </p>
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">File Not Recognized</h3>
                  <p className="text-sm text-muted-foreground">
                    Ensure your file is actually in HEIC or HEIF format. Some files may have incorrect extensions. Try opening the 
                    file on an iPhone or Mac to verify it's a valid HEIC image.
                  </p>
                </div>
              </div>
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

export default HeicToJpg;
