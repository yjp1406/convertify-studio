import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import { Button } from "@/components/ui/button";
import { Download, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { convertImageFormat, downloadBlob } from "@/utils/imageConverter";

interface ConvertedFile {
  name: string;
  blob: Blob;
  preview: string;
  originalSize: number;
  convertedSize: number;
}

const JpgToPng = () => {
  const [files, setFiles] = useState<ConvertedFile[]>([]);
  const [isConverting, setIsConverting] = useState(false);

  const faqs = [
    {
      question: "How do I convert JPG to PNG online?",
      answer: "Simply upload your JPG file using our converter tool, and it will automatically convert it to PNG format. Click the download button to save your converted PNG image."
    },
    {
      question: "Is this JPG to PNG converter free?",
      answer: "Yes, our JPG to PNG converter is completely free to use. There are no hidden fees, subscriptions, or limitations on the number of conversions."
    },
    {
      question: "What's the difference between JPG and PNG?",
      answer: "JPG uses lossy compression and doesn't support transparency, making it ideal for photos. PNG uses lossless compression and supports transparency, making it perfect for graphics, logos, and images requiring transparent backgrounds."
    },
    {
      question: "Does converting JPG to PNG improve image quality?",
      answer: "Converting JPG to PNG won't restore quality lost from JPG compression, but it will preserve the current quality without further degradation. PNG is ideal when you need transparency or want to prevent further quality loss from editing."
    },
    {
      question: "Are my files secure when converting JPG to PNG?",
      answer: "Yes, all conversions happen locally in your browser. Your files are never uploaded to any server, ensuring complete privacy and security."
    }
  ];

  const handleFileSelect = async (fileBlob: Blob, fileName: string) => {
    setIsConverting(true);
    try {
      const file = new File([fileBlob], fileName, { type: fileBlob.type });
      const convertedBlob = await convertImageFormat(file, 'image/png');
      const preview = URL.createObjectURL(convertedBlob);
      const newFileName = fileName.replace(/\.[^/.]+$/, '.png');

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

  return (
    <>
      <FAQSchema faqs={faqs} />
      <WebAppSchema 
        name="JPG to PNG Converter"
        description="Free online tool to convert JPG images to PNG format"
        url="https://convertify.app/jpg-to-png"
      />
      <Layout
        title="JPG to PNG Converter Online – Free, Fast, No Upload"
        description="Convert JPG to PNG online for free. Preserve image quality with our fast, secure JPG to PNG converter. No upload required - all conversions happen in your browser."
        keywords="jpg to png, jpeg to png, jpg to png converter, image converter, jpg png"
        showSidebar={true}
      >
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              JPG to PNG Converter
            </h1>
            <p className="text-muted-foreground">
              Convert your JPG images to PNG format instantly
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
              <h2 className="text-2xl font-bold mb-4">JPG to PNG Converter: Everything You Need to Know</h2>
              <p className="text-muted-foreground">
                Converting JPG images to PNG format is a common task for designers, photographers, and anyone working with digital images. 
                Our free online JPG to PNG converter makes this process simple, fast, and secure. Unlike other converters that require uploading 
                your files to a server, our tool processes everything locally in your browser, ensuring your images remain private and secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Convert JPG to PNG?</h2>
              <p className="text-muted-foreground mb-4">
                While both JPG and PNG are popular image formats, they serve different purposes. JPG uses lossy compression, which reduces 
                file size but can introduce artifacts and quality loss. PNG, on the other hand, uses lossless compression, preserving every 
                detail of your image. Here are key reasons to convert JPG to PNG:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Transparency Support:</strong> PNG supports alpha channels, allowing for transparent backgrounds - essential for logos and graphics.</li>
                <li><strong>Lossless Quality:</strong> PNG maintains image quality even after multiple edits, perfect for professional work.</li>
                <li><strong>Better for Text and Graphics:</strong> PNG handles sharp edges and text better than JPG, preventing blur and artifacts.</li>
                <li><strong>Web Optimization:</strong> PNG is ideal for web graphics that require crisp, clear rendering.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">How to Use Our JPG to PNG Converter</h2>
              <p className="text-muted-foreground mb-4">
                Converting your JPG images to PNG format is incredibly simple with our tool:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload Your JPG:</strong> Click the upload area or drag and drop your JPG file into the converter.</li>
                <li><strong>Automatic Conversion:</strong> The tool instantly converts your JPG to PNG format using advanced algorithms.</li>
                <li><strong>Preview Your Image:</strong> Review the converted PNG with a visual preview and file size information.</li>
                <li><strong>Download:</strong> Click the download button to save your new PNG file to your device.</li>
                <li><strong>Multiple Files:</strong> Need to convert more? Simply upload another file or use the "Download All" feature for batch conversions.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Understanding JPG vs PNG</h2>
              <p className="text-muted-foreground mb-4">
                To make informed decisions about image formats, it's important to understand the key differences between JPG and PNG:
              </p>
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">JPG (JPEG) Format:</h3>
                  <p className="text-sm text-muted-foreground">
                    JPG uses lossy compression, which means it sacrifices some image data to achieve smaller file sizes. This makes it excellent 
                    for photographs and complex images with many colors, where minor quality loss is imperceptible. However, JPG doesn't support 
                    transparency and can create artifacts around text and sharp edges.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">PNG Format:</h3>
                  <p className="text-sm text-muted-foreground">
                    PNG uses lossless compression, preserving all image data without any quality loss. It supports full alpha channel transparency, 
                    making it ideal for logos, icons, and graphics that need transparent backgrounds. PNG files are typically larger than JPGs but 
                    maintain perfect quality even after multiple edits and saves.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Benefits of Our Online Converter</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>100% Free:</strong> No subscriptions, no hidden fees, unlimited conversions.</li>
                <li><strong>Complete Privacy:</strong> All processing happens in your browser - your files never leave your device.</li>
                <li><strong>Fast Conversion:</strong> Instant conversion with no waiting in upload queues.</li>
                <li><strong>No Installation:</strong> Works directly in your web browser, no software to download.</li>
                <li><strong>Multiple Files:</strong> Convert multiple JPG images in succession.</li>
                <li><strong>High Quality:</strong> Maintains maximum image quality during conversion.</li>
                <li><strong>Cross-Platform:</strong> Works on Windows, Mac, Linux, iOS, and Android.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Common Use Cases</h2>
              <p className="text-muted-foreground mb-4">
                Our JPG to PNG converter serves various professional and personal needs:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Creating logos and branding materials with transparent backgrounds</li>
                <li>Preparing images for web design and development</li>
                <li>Converting screenshots for documentation and tutorials</li>
                <li>Optimizing graphics for presentations and reports</li>
                <li>Preserving image quality for professional photography</li>
                <li>Creating graphics for social media and marketing materials</li>
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

export default JpgToPng;
