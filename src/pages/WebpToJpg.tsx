import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const WebpToJpg = () => {
  const [originalImage, setOriginalImage] = useState<{ name: string; url: string } | null>(null);
  const [convertedImage, setConvertedImage] = useState<{ url: string; blob: Blob } | null>(null);
  const [isConverting, setIsConverting] = useState(false);

  const faqs = [
    {
      question: "How do I convert WebP to JPG?",
      answer: "Simply upload your WebP image using our converter tool. The conversion happens instantly in your browser, and you can download the JPG file immediately."
    },
    {
      question: "What is WebP format?",
      answer: "WebP is a modern image format developed by Google that provides superior lossless and lossy compression for images on the web. However, it's not universally supported by all applications, making conversion to JPG useful."
    },
    {
      question: "Why convert WebP to JPG?",
      answer: "JPG is more widely supported across devices, applications, and platforms. Converting WebP to JPG ensures maximum compatibility when sharing images or using them in various software."
    },
    {
      question: "Does conversion reduce quality?",
      answer: "Our converter maintains high quality during conversion. JPG uses lossy compression, so there may be minimal quality loss, but it's optimized to preserve image details."
    },
    {
      question: "Is my image uploaded to a server?",
      answer: "No, all conversions happen locally in your browser. Your images never leave your device, ensuring complete privacy and security."
    },
    {
      question: "Can I convert multiple WebP images?",
      answer: "Currently, you can convert one image at a time. Simply convert one, download it, and upload the next WebP file."
    }
  ];

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    if (!fileBlob.type.includes('webp')) {
      toast.error("Please select a WebP image file");
      return;
    }

    const url = URL.createObjectURL(fileBlob);
    setOriginalImage({ name: fileName, url });
    setConvertedImage(null);

    // Start conversion automatically
    setIsConverting(true);
    try {
      const img = new Image();
      img.src = url;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Fill with white background for transparency
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const convertedUrl = URL.createObjectURL(blob);
            setConvertedImage({ url: convertedUrl, blob });
            toast.success("WebP converted to JPG successfully!");
          } else {
            toast.error("Conversion failed");
          }
          setIsConverting(false);
        },
        'image/jpeg',
        0.95
      );
    } catch (error) {
      toast.error("Failed to convert image");
      console.error(error);
      setIsConverting(false);
    }
  };

  const handleDownload = () => {
    if (!convertedImage || !originalImage) return;

    const a = document.createElement('a');
    a.href = convertedImage.url;
    a.download = originalImage.name.replace(/\.webp$/i, '.jpg');
    a.click();
    toast.success("JPG downloaded!");
  };

  return (
    <>
      <SEOHead
        title="WebP to JPG Converter - Free Online WebP to JPEG Tool"
        description="Convert WebP images to JPG format online for free. Fast, secure browser-based conversion with no upload required."
        keywords="webp to jpg, webp to jpeg, convert webp, image converter, webp converter"
      />
      <FAQSchema faqs={faqs} />
      <WebAppSchema
        name="WebP to JPG Converter"
        description="Convert WebP images to JPG format online for free. Fast, secure, browser-based conversion."
        url="https://convertify.app/webp-to-jpg"
      />
      <Layout
        title="WebP to JPG Converter - Convert WebP to JPEG Online Free"
        description="Convert WebP images to JPG format online for free. Fast, secure browser-based conversion with no upload required."
        keywords="webp to jpg, webp to jpeg, convert webp, image converter"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              WebP to JPG Converter
            </h1>
            <p className="text-muted-foreground">
              Convert WebP images to widely compatible JPG format
            </p>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="images"
            maxSizeMB={50}
          />

          {isConverting && (
            <div className="text-center">
              <p className="text-muted-foreground">Converting...</p>
            </div>
          )}

          {originalImage && convertedImage && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">Original (WebP)</h3>
                  <div className="border border-border rounded-lg overflow-hidden bg-card">
                    <img src={originalImage.url} alt="Original" className="w-full h-auto" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">Converted (JPG)</h3>
                  <div className="border border-border rounded-lg overflow-hidden bg-card">
                    <img src={convertedImage.url} alt="Converted" className="w-full h-auto" />
                  </div>
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
              <h2 className="text-2xl font-bold mb-4">WebP to JPG Converter: Complete Guide</h2>
              <p className="text-muted-foreground">
                WebP is a modern image format that offers excellent compression, but it's not universally supported. Converting WebP to JPG 
                ensures your images work everywhere - from social media to email clients and older applications. Our free online converter 
                makes this process instant and secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Convert WebP to JPG?</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Universal Compatibility:</strong> JPG works on all devices, browsers, and applications without exceptions.</li>
                <li><strong>Social Media:</strong> Many platforms prefer JPG for profile pictures and uploads.</li>
                <li><strong>Editing Software:</strong> Older photo editing tools may not support WebP format.</li>
                <li><strong>Printing:</strong> Print services typically require JPG or PNG formats.</li>
                <li><strong>Email Attachments:</strong> JPG ensures recipients can view images regardless of their email client.</li>
                <li><strong>Legacy Systems:</strong> Older websites and applications often don't recognize WebP files.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Convert WebP to JPG</h2>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload WebP Image:</strong> Click the upload area or drag and drop your WebP file.</li>
                <li><strong>Automatic Conversion:</strong> The tool instantly converts your image to JPG format.</li>
                <li><strong>Preview Results:</strong> Compare the original and converted images side by side.</li>
                <li><strong>Download JPG:</strong> Click the download button to save your JPG file.</li>
                <li><strong>Convert More:</strong> Upload another WebP image to convert additional files.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Understanding Image Formats</h2>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">WebP Format</h3>
                  <p className="text-sm text-muted-foreground">
                    Developed by Google, WebP provides superior compression and quality compared to JPG and PNG. It's ideal for web use 
                    but has limited support in older systems and some applications.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">JPG Format</h3>
                  <p className="text-sm text-muted-foreground">
                    JPG (JPEG) is the most widely used image format for photographs and complex images. It offers good compression with 
                    acceptable quality loss and works everywhere. Perfect for sharing and maximum compatibility.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Key Features</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Instant Conversion:</strong> WebP to JPG conversion happens in seconds, right in your browser.</li>
                <li><strong>High Quality Output:</strong> Maintains image quality with optimized compression settings.</li>
                <li><strong>No Upload Required:</strong> All processing happens locally on your device for complete privacy.</li>
                <li><strong>Preview Before Download:</strong> See both original and converted images before saving.</li>
                <li><strong>Free and Unlimited:</strong> Convert as many WebP images as you need, completely free.</li>
                <li><strong>No Software Installation:</strong> Works directly in your web browser, no apps needed.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Website Images:</strong> Convert WebP images downloaded from websites for use in presentations or documents.</li>
                <li><strong>Social Media Uploads:</strong> Ensure your images are compatible with all social platforms.</li>
                <li><strong>Photo Editing:</strong> Convert WebP files before importing into photo editing software.</li>
                <li><strong>Email Attachments:</strong> Convert to JPG for guaranteed compatibility with all email clients.</li>
                <li><strong>Printing:</strong> Prepare images for print services that require JPG format.</li>
                <li><strong>Archive Conversion:</strong> Convert WebP image collections to more widely compatible JPG.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Tips for Best Results</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Check Quality:</strong> Always preview the converted JPG before downloading to ensure quality meets your needs.</li>
                <li><strong>Keep Originals:</strong> Save original WebP files as backup in case you need higher quality later.</li>
                <li><strong>File Size:</strong> JPG files may be larger than WebP, especially for images with transparency.</li>
                <li><strong>Transparency Note:</strong> WebP transparency is converted to white background in JPG format.</li>
                <li><strong>Batch Processing:</strong> For multiple conversions, process files one at a time for best results.</li>
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

export default WebpToJpg;
