import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { convertImageFormat, downloadBlob } from "@/utils/imageConverter";

interface ConvertedFile {
  name: string;
  blob: Blob;
  preview: string;
  originalSize: number;
  convertedSize: number;
}

const ConvertToWebp = () => {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const faqs = [
    {
      question: "How do I convert JPG or PNG to WebP?",
      answer: "Simply upload your JPG or PNG file using our converter tool, and it will automatically convert it to WebP format. Click the download button to save your converted WebP image."
    },
    {
      question: "Is this WebP converter free?",
      answer: "Yes, our JPG/PNG to WebP converter is completely free to use. There are no hidden fees, subscriptions, or limitations on the number of conversions."
    },
    {
      question: "What is WebP format and why should I use it?",
      answer: "WebP is a modern image format developed by Google that provides superior compression. WebP images are 25-35% smaller than JPG or PNG files at equivalent visual quality, making them ideal for websites and faster loading times."
    },
    {
      question: "Does converting to WebP reduce image quality?",
      answer: "WebP uses smart compression to minimize file size while maintaining excellent visual quality. Our converter uses high-quality settings to ensure your images look great while benefiting from smaller file sizes."
    },
    {
      question: "Are my files secure when converting to WebP?",
      answer: "Yes, all conversions happen locally in your browser. Your files are never uploaded to any server, ensuring complete privacy and security."
    },
    {
      question: "Which browsers support WebP images?",
      answer: "WebP is supported by all modern browsers including Chrome, Firefox, Edge, Safari, and Opera. This makes it safe to use WebP for web projects targeting current browser versions."
    }
  ];

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(fileBlob.type)) {
      toast.error("Please upload a JPG or PNG file");
      return;
    }

    setIsConverting(true);
    try {
      const file = new File([fileBlob], fileName, { type: fileBlob.type });
      const convertedBlob = await convertImageFormat(file, 'image/webp', 0.90);
      const preview = URL.createObjectURL(convertedBlob);
      const newFileName = fileName.replace(/\.[^/.]+$/, '.webp');

      setFiles(prev => [...prev, {
        name: newFileName,
        blob: convertedBlob,
        preview,
        originalSize: fileBlob.size,
        convertedSize: convertedBlob.size
      }]);

      const savings = ((1 - convertedBlob.size / fileBlob.size) * 100).toFixed(0);
      toast.success(`Converted! File size reduced by ${savings}%`);
    } catch (error) {
      toast.error("Failed to convert image");
      console.error(error);
    } finally {
      setIsConverting(false);
    }
  };

  const handleDownload = (file: ConvertedFile) => {
    downloadBlob(file.blob, file.name);
    toast.success("Download started!");
  };

  const handleDownloadAll = () => {
    files.forEach(file => downloadBlob(file.blob, file.name));
    toast.success(`Downloaded ${files.length} file(s)!`);
  };

  const handleClear = () => {
    files.forEach(file => URL.revokeObjectURL(file.preview));
    setFiles([]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const calculateSavings = (original: number, converted: number): string => {
    const savings = ((1 - converted / original) * 100).toFixed(1);
    return savings;
  };

  return (
    <>
      <FAQSchema faqs={faqs} />
      <WebAppSchema 
        name="JPG & PNG to WebP Converter"
        description="Free online tool to convert JPG and PNG images to WebP format for smaller file sizes"
        url="https://convertify.app/convert-to-webp"
      />
      <Layout
        title="Convert JPG & PNG to WebP Online – Free, Fast, Smaller Files"
        description="Convert JPG and PNG images to WebP format online for free. Reduce file size by 25-35% with our fast, secure converter. No upload required - all conversions happen in your browser."
        keywords="jpg to webp, png to webp, convert to webp, webp converter, image compression, webp format"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Convert to WebP
            </h1>
            <p className="text-muted-foreground">
              Convert JPG and PNG images to WebP for smaller file sizes and faster loading
            </p>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="images"
            maxSizeMB={20}
            multiple={true}
          />

          {isConverting && (
            <div className="text-center text-muted-foreground">
              Converting image...
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-foreground">
                  Converted Images ({files.length})
                </h2>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={handleClear}>
                    Clear All
                  </Button>
                  {files.length > 1 && (
                    <Button onClick={handleDownloadAll}>
                      Download All
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid gap-4">
                {files.map((file, index) => (
                  <div key={index} className="rounded-lg border border-border bg-card p-4">
                    <div className="flex gap-4 items-start">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img 
                          src={file.preview} 
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground truncate mb-2">
                          {file.name}
                        </h3>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Original: {formatFileSize(file.originalSize)}</p>
                          <p>WebP: {formatFileSize(file.convertedSize)}</p>
                          <p className="text-green-600 dark:text-green-400 font-medium">
                            Saved: {calculateSavings(file.originalSize, file.convertedSize)}%
                          </p>
                        </div>
                      </div>
                      <Button onClick={() => handleDownload(file)} className="flex-shrink-0">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <article className="prose prose-sm max-w-none space-y-6 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Convert JPG & PNG to WebP: Smaller Files, Same Quality</h2>
              <p className="text-muted-foreground">
                WebP is a modern image format developed by Google that delivers superior compression compared to traditional formats like JPG and PNG. 
                Our free online converter transforms your JPG and PNG images into WebP format, typically reducing file sizes by 25-35% while maintaining 
                excellent visual quality. Unlike other converters that require uploading your files to a server, our tool processes everything locally 
                in your browser, ensuring your images remain private and secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Convert to WebP?</h2>
              <p className="text-muted-foreground mb-4">
                WebP offers the best of both worlds: the compression efficiency of JPG and the transparency support of PNG. Here are key reasons 
                to convert your images to WebP:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Smaller File Sizes:</strong> WebP images are typically 25-35% smaller than JPG and PNG at equivalent quality.</li>
                <li><strong>Faster Loading:</strong> Smaller files mean faster page loads, improving user experience and SEO rankings.</li>
                <li><strong>Transparency Support:</strong> Unlike JPG, WebP supports alpha channel transparency like PNG.</li>
                <li><strong>Wide Browser Support:</strong> All modern browsers support WebP, making it safe for web use.</li>
                <li><strong>Better Compression:</strong> WebP uses both lossy and lossless compression techniques.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Use Our WebP Converter</h2>
              <p className="text-muted-foreground mb-4">
                Converting your JPG or PNG images to WebP format is incredibly simple:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload Your Image:</strong> Click the upload area or drag and drop your JPG or PNG file.</li>
                <li><strong>Automatic Conversion:</strong> The tool instantly converts your image to WebP format.</li>
                <li><strong>See Your Savings:</strong> View the file size reduction percentage for each converted image.</li>
                <li><strong>Download:</strong> Click the download button to save your new WebP file.</li>
                <li><strong>Batch Convert:</strong> Upload multiple files and use "Download All" for batch conversions.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">WebP vs JPG vs PNG: Understanding the Differences</h2>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">JPG (JPEG):</h3>
                  <p className="text-sm text-muted-foreground">
                    Best for photographs with complex colors. Uses lossy compression. Doesn't support transparency. 
                    Files are larger than WebP at equivalent quality.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">PNG:</h3>
                  <p className="text-sm text-muted-foreground">
                    Best for graphics, logos, and images requiring transparency. Uses lossless compression. 
                    Files are significantly larger than WebP, especially for photographs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">WebP:</h3>
                  <p className="text-sm text-muted-foreground">
                    Best for web use. Supports both lossy and lossless compression plus transparency. 
                    Produces the smallest files while maintaining quality. Supported by all modern browsers.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Benefits of Our Online Converter</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>100% Free:</strong> No subscriptions, no hidden fees, unlimited conversions.</li>
                <li><strong>Complete Privacy:</strong> All processing happens in your browser - files never leave your device.</li>
                <li><strong>Fast Conversion:</strong> Instant conversion with no waiting in upload queues.</li>
                <li><strong>No Installation:</strong> Works directly in your web browser, no software to download.</li>
                <li><strong>Size Savings Display:</strong> See exactly how much space you've saved with each conversion.</li>
                <li><strong>High Quality:</strong> Uses optimized compression settings for best quality-to-size ratio.</li>
                <li><strong>Cross-Platform:</strong> Works on Windows, Mac, Linux, iOS, and Android.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Optimizing images for websites to improve page load speed</li>
                <li>Reducing bandwidth costs for image-heavy web applications</li>
                <li>Improving Core Web Vitals and SEO rankings</li>
                <li>Creating smaller image files for email and messaging</li>
                <li>Saving storage space without sacrificing image quality</li>
                <li>Preparing images for modern web projects and PWAs</li>
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

export default ConvertToWebp;
