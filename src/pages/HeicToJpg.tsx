import { useState, useCallback } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Download, AlertCircle, Trash2, Archive } from "lucide-react";
import { toast } from "sonner";
import heic2any from "heic2any";
import JSZip from "jszip";

interface ConvertedFile {
  id: string;
  originalName: string;
  originalSize: number;
  convertedBlob: Blob;
  convertedUrl: string;
  convertedSize: number;
}

const HeicToJpg = () => {
  const [convertedFiles, setConvertedFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [convertingCount, setConvertingCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

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
      question: "Can I convert multiple HEIC files at once?",
      answer: "Yes! You can upload multiple HEIC files at once and convert them all in one go. You can then download them individually or as a ZIP file."
    }
  ];

  const handleFileSelect = useCallback(async (fileBlob: Blob, fileName: string) => {
    const fileExt = fileName.toLowerCase();

    if (!fileBlob.type.includes('heic') && !fileBlob.type.includes('heif') &&
        !fileExt.endsWith('.heic') && !fileExt.endsWith('.heif')) {
      toast.error("Please select a HEIC or HEIF file");
      return;
    }

    setIsConverting(true);
    setConvertingCount(prev => prev + 1);
    setTotalCount(prev => prev + 1);

    try {
      const convertedBlob = await heic2any({
        blob: fileBlob,
        toType: 'image/jpeg',
        quality: 0.95
      });

      const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
      const url = URL.createObjectURL(resultBlob);
      const jpgName = fileName.replace(/\.(heic|heif)$/i, '.jpg');

      setConvertedFiles(prev => [...prev, {
        id: crypto.randomUUID(),
        originalName: fileName,
        originalSize: fileBlob.size,
        convertedBlob: resultBlob,
        convertedUrl: url,
        convertedSize: resultBlob.size
      }]);

      toast.success(`Converted ${jpgName}`);
    } catch (error: any) {
      console.error('Conversion error:', error);
      const msg = error?.message || "";
      if (msg.includes('not supported') || msg.includes('HEIC')) {
        toast.error(`Failed to convert ${fileName}: browser doesn't support HEIC conversion.`);
      } else {
        toast.error(`Failed to convert ${fileName}. File may be corrupted.`);
      }
    } finally {
      setConvertingCount(prev => {
        const next = prev - 1;
        if (next <= 0) setIsConverting(false);
        return next;
      });
    }
  }, []);

  const handleDownloadSingle = (file: ConvertedFile) => {
    const a = document.createElement('a');
    a.href = file.convertedUrl;
    a.download = file.originalName.replace(/\.(heic|heif)$/i, '.jpg');
    a.click();
  };

  const handleDownloadZip = async () => {
    if (convertedFiles.length === 0) return;
    toast.info("Creating ZIP file...");

    const zip = new JSZip();
    convertedFiles.forEach(file => {
      const jpgName = file.originalName.replace(/\.(heic|heif)$/i, '.jpg');
      zip.file(jpgName, file.convertedBlob);
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted-images.zip';
    a.click();
    URL.revokeObjectURL(url);
    toast.success("ZIP downloaded!");
  };

  const handleRemoveFile = (id: string) => {
    setConvertedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) URL.revokeObjectURL(file.convertedUrl);
      return prev.filter(f => f.id !== id);
    });
  };

  const handleClearAll = () => {
    convertedFiles.forEach(f => URL.revokeObjectURL(f.convertedUrl));
    setConvertedFiles([]);
    setTotalCount(0);
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
              Convert Apple HEIC photos to universally compatible JPG format — multiple files supported
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900 dark:text-blue-100">
                <p className="font-semibold mb-1">Browser Compatibility Note</p>
                <p>HEIC conversion works best in Chrome, Firefox, Edge, and Safari. Upload multiple files at once for batch conversion.</p>
              </div>
            </div>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="images"
            maxSizeMB={50}
            multiple={true}
          />

          {isConverting && (
            <div className="text-center py-6">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="text-muted-foreground mt-3">Converting files... ({convertingCount} remaining)</p>
            </div>
          )}

          {convertedFiles.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  Converted Files ({convertedFiles.length})
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleClearAll}>
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Clear All
                  </Button>
                  {convertedFiles.length >= 2 && (
                    <Button size="sm" onClick={handleDownloadZip}>
                      <Archive className="h-4 w-4 mr-1.5" />
                      Download ZIP
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid gap-3">
                {convertedFiles.map(file => (
                  <div key={file.id} className="flex items-center gap-4 bg-card border border-border rounded-lg p-3">
                    <img
                      src={file.convertedUrl}
                      alt={file.originalName}
                      className="h-14 w-14 rounded-md object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.originalName.replace(/\.(heic|heif)$/i, '.jpg')}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.originalSize)} → {formatFileSize(file.convertedSize)}
                      </p>
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <Button variant="ghost" size="icon" onClick={() => handleDownloadSingle(file)} title="Download">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveFile(file.id)} title="Remove">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-2">
                <Button size="lg" onClick={handleDownloadZip}>
                  <Archive className="h-4 w-4 mr-2" />
                  Download All as ZIP
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
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Convert HEIC to JPG</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload HEIC Files:</strong> Click the upload area or drag and drop one or more HEIC/HEIF files.</li>
                <li><strong>Automatic Processing:</strong> Each file is converted automatically in your browser.</li>
                <li><strong>Preview Results:</strong> View thumbnails and file sizes for all converted images.</li>
                <li><strong>Download:</strong> Download files individually or all at once as a ZIP archive.</li>
              </ol>
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
