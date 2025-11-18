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

const PngToJpg = () => {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const faqs = [
    {
      question: "How do I convert PNG to JPG online?",
      answer: "Upload your PNG file to our converter, and it will automatically convert it to JPG format. The conversion happens instantly in your browser, and you can download the JPG file immediately."
    },
    {
      question: "Why convert PNG to JPG?",
      answer: "Converting PNG to JPG can significantly reduce file size, making images faster to load and easier to share. JPG is ideal for photographs and images where transparency is not needed."
    },
    {
      question: "Will I lose quality converting PNG to JPG?",
      answer: "JPG uses lossy compression, so there will be some quality loss. However, for most photographs and images, this loss is minimal and imperceptible. Our converter uses high-quality settings (92%) to minimize any degradation."
    },
    {
      question: "What happens to transparency when converting PNG to JPG?",
      answer: "JPG format doesn't support transparency. When converting PNG to JPG, any transparent areas will be replaced with a white background."
    },
    {
      question: "Is this PNG to JPG converter free?",
      answer: "Yes, our PNG to JPG converter is completely free with no limitations. Convert as many files as you need without any charges or subscriptions."
    }
  ];

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    setIsConverting(true);
    try {
      const file = new File([fileBlob], fileName, { type: fileBlob.type });
      const convertedBlob = await convertImageFormat(file, 'image/jpeg', 0.92);
      const preview = URL.createObjectURL(convertedBlob);
      const newFileName = fileName.replace(/\.[^/.]+$/, '.jpg');

      setFiles(prev => [...prev, {
        name: newFileName,
        blob: convertedBlob,
        preview,
        originalSize: fileBlob.size,
        convertedSize: convertedBlob.size
      }]);

      toast.success("Image converted successfully!");
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

  const formatFileSize = (bytes: number): string => {
    return (bytes / 1024).toFixed(2) + ' KB';
  };

  const calculateSavings = (original: number, converted: number): string => {
    const savings = ((original - converted) / original * 100).toFixed(1);
    return savings;
  };

  return (
    <>
      <FAQSchema faqs={faqs} />
      <WebAppSchema 
        name="PNG to JPG Converter"
        description="Free online tool to convert PNG images to JPG format and reduce file size"
        url="https://convertify.app/png-to-jpg"
      />
      <Layout
        title="PNG to JPG Converter Online – Free Image Compression"
        description="Convert PNG to JPG online for free. Reduce file size while maintaining quality with our fast PNG to JPG converter. No upload required - secure browser conversion."
        keywords="png to jpg, png to jpeg, png jpg converter, image converter, compress png"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              PNG to JPG Converter
            </h1>
            <p className="text-muted-foreground">
              Convert PNG images to JPG format and reduce file size
            </p>
          </div>

          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="images"
            maxSizeMB={20}
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
                {files.length > 1 && (
                  <Button onClick={handleDownloadAll}>
                    Download All
                  </Button>
                )}
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
                          <p>Converted: {formatFileSize(file.convertedSize)}</p>
                          <p className="text-primary font-medium">
                            Saved {calculateSavings(file.originalSize, file.convertedSize)}%
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
              <h2 className="text-2xl font-bold mb-4">Complete Guide to Converting PNG to JPG</h2>
              <p className="text-muted-foreground">
                Converting PNG images to JPG format is one of the most effective ways to reduce file sizes while maintaining visual quality. 
                Our free online PNG to JPG converter provides a simple, secure, and efficient solution for anyone needing to optimize images 
                for web use, email sharing, or storage. All conversions happen locally in your browser, ensuring your images remain private.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Convert PNG to JPG?</h2>
              <p className="text-muted-foreground mb-4">
                PNG files are often significantly larger than JPG files due to their lossless compression. Converting to JPG can reduce 
                file sizes by 50-80% in many cases, making them much more practical for various applications:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Faster Website Loading:</strong> Smaller JPG files load faster, improving user experience and SEO rankings.</li>
                <li><strong>Email Friendly:</strong> Reduced file sizes make it easier to share images via email without hitting attachment limits.</li>
                <li><strong>Storage Savings:</strong> Save significant storage space on your device or cloud storage.</li>
                <li><strong>Social Media Optimization:</strong> Many social platforms prefer or optimize for JPG format.</li>
                <li><strong>Bandwidth Efficiency:</strong> Smaller files mean less data usage, especially important for mobile users.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How Our PNG to JPG Converter Works</h2>
              <p className="text-muted-foreground mb-4">
                Our converter uses advanced browser technology to process your images locally:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload Your PNG:</strong> Drag and drop or click to select your PNG file from your device.</li>
                <li><strong>Automatic Processing:</strong> The image is instantly converted to JPG format with optimized quality settings.</li>
                <li><strong>Preview Results:</strong> See your converted image with detailed before/after file size comparison.</li>
                <li><strong>Download JPG:</strong> Save your optimized JPG file with a single click.</li>
                <li><strong>Batch Processing:</strong> Convert multiple images one after another for efficient workflow.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">PNG vs JPG: Technical Differences</h2>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">PNG (Portable Network Graphics):</h3>
                  <p className="text-sm text-muted-foreground">
                    PNG uses lossless compression, meaning no image data is lost during compression. It supports transparency through alpha 
                    channels and is ideal for graphics with sharp edges, text, and logos. However, this quality comes at the cost of larger 
                    file sizes, especially for photographs.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">JPG (Joint Photographic Experts Group):</h3>
                  <p className="text-sm text-muted-foreground">
                    JPG uses lossy compression that discards some image data to achieve much smaller file sizes. While some quality is lost, 
                    it's usually imperceptible in photographs. JPG doesn't support transparency but excels at compressing complex images with 
                    many colors and gradients. Our converter uses 92% quality to balance file size and visual quality.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Best Practices for PNG to JPG Conversion</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Choose the Right Source:</strong> PNG to JPG works best for photographs and complex images, not for graphics with text or sharp edges.</li>
                <li><strong>Consider Transparency:</strong> Remember that transparent areas will become white in JPG format.</li>
                <li><strong>Optimize for Purpose:</strong> Web images can use higher compression, while print materials may need higher quality.</li>
                <li><strong>Keep Original PNGs:</strong> Always maintain backups of original PNG files for future editing.</li>
                <li><strong>Batch Convert:</strong> Process multiple similar images together for consistency.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Advantages of Our Converter</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>No Upload Required:</strong> All processing happens in your browser - your files never leave your device.</li>
                <li><strong>Instant Results:</strong> Conversion happens in seconds with no server delays.</li>
                <li><strong>Completely Free:</strong> Unlimited conversions with no watermarks or restrictions.</li>
                <li><strong>High Quality:</strong> Uses optimized quality settings (92%) for best results.</li>
                <li><strong>Privacy Focused:</strong> Your images remain completely private on your device.</li>
                <li><strong>No Registration:</strong> Start converting immediately without creating an account.</li>
                <li><strong>File Size Stats:</strong> See exactly how much space you're saving with each conversion.</li>
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

export default PngToJpg;
