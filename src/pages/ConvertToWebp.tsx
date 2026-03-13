import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import FAQSchema from "@/components/FAQSchema";
import WebAppSchema from "@/components/WebAppSchema";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Zap, Shield, Gauge, ArrowRight, CheckCircle2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { convertImageFormat, downloadBlob } from "@/utils/imageConverter";
import { Progress } from "@/components/ui/progress";

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

  const handleRemoveFile = (index: number) => {
    setFiles(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const getSavingsPercent = (original: number, converted: number): number => {
    return Math.round((1 - converted / original) * 100);
  };

  const totalOriginal = files.reduce((sum, f) => sum + f.originalSize, 0);
  const totalConverted = files.reduce((sum, f) => sum + f.convertedSize, 0);

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
        <div className="space-y-10">
          {/* Hero Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-3.5 w-3.5" />
              Free & Instant Conversion
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
              Convert to <span className="text-primary">WebP</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Transform JPG & PNG images into WebP — up to 35% smaller with the same visual quality.
            </p>
          </div>

          {/* Upload Area */}
          <FileDropZone
            onFileSelect={handleFileSelect}
            acceptedTypes="images"
            maxSizeMB={20}
            multiple={true}
          />

          {/* Converting Indicator */}
          {isConverting && (
            <div className="flex items-center justify-center gap-3 py-4">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              <span className="text-sm font-medium text-muted-foreground">Converting image...</span>
            </div>
          )}

          {/* Results Section */}
          {files.length > 0 && (
            <div className="space-y-6">
              {/* Summary Bar */}
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        {files.length} file{files.length > 1 ? 's' : ''} converted
                      </p>
                      <p className="text-lg font-bold text-foreground">
                        Saved {formatFileSize(totalOriginal - totalConverted)}
                        <span className="ml-2 text-sm font-medium text-primary">
                          ({getSavingsPercent(totalOriginal, totalConverted)}% smaller)
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleClear} className="gap-1.5">
                      <Trash2 className="h-3.5 w-3.5" />
                      Clear
                    </Button>
                    {files.length > 1 && (
                      <Button size="sm" onClick={handleDownloadAll} className="gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        Download All
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* File Cards */}
              <div className="grid gap-3">
                {files.map((file, index) => {
                  const savingsPercent = getSavingsPercent(file.originalSize, file.convertedSize);
                  return (
                    <div
                      key={index}
                      className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex gap-4 items-center">
                        {/* Thumbnail */}
                        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted ring-1 ring-border">
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-foreground truncate">
                              {file.name}
                            </h3>
                            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary flex-shrink-0">
                              -{savingsPercent}%
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <span>{formatFileSize(file.originalSize)}</span>
                            <ArrowRight className="h-3 w-3 text-primary" />
                            <span className="font-medium text-foreground">{formatFileSize(file.convertedSize)}</span>
                          </div>
                          <Progress value={100 - savingsPercent} className="h-1.5" />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button size="sm" onClick={() => handleDownload(file)} className="gap-1.5">
                            <Download className="h-3.5 w-3.5" />
                            Save
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Feature Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Zap, title: "Lightning Fast", desc: "Instant in-browser conversion" },
              { icon: Shield, title: "100% Private", desc: "Files never leave your device" },
              { icon: Gauge, title: "Max Quality", desc: "Optimized compression settings" },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{feature.title}</p>
                  <p className="text-xs text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Content Article */}
          <article className="prose prose-sm max-w-none space-y-8 text-foreground">
            <section>
              <h2 className="text-2xl font-bold mb-4">Convert JPG & PNG to WebP: Smaller Files, Same Quality</h2>
              <p className="text-muted-foreground leading-relaxed">
                WebP is a modern image format developed by Google that delivers superior compression compared to traditional formats like JPG and PNG. 
                Our free online converter transforms your JPG and PNG images into WebP format, typically reducing file sizes by 25-35% while maintaining 
                excellent visual quality. Unlike other converters that require uploading your files to a server, our tool processes everything locally 
                in your browser, ensuring your images remain private and secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">Why Convert to WebP?</h2>
              <p className="text-muted-foreground mb-4">
                WebP offers the best of both worlds: the compression efficiency of JPG and the transparency support of PNG.
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
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li><strong>Upload Your Image:</strong> Click the upload area or drag and drop your JPG or PNG file.</li>
                <li><strong>Automatic Conversion:</strong> The tool instantly converts your image to WebP format.</li>
                <li><strong>See Your Savings:</strong> View the file size reduction percentage for each converted image.</li>
                <li><strong>Download:</strong> Click the download button to save your new WebP file.</li>
                <li><strong>Batch Convert:</strong> Upload multiple files and use "Download All" for batch conversions.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">WebP vs JPG vs PNG</h2>
              <div className="grid gap-3 not-prose">
                {[
                  { label: "JPG", color: "bg-accent", desc: "Best for photographs. Lossy compression. No transparency. Larger than WebP." },
                  { label: "PNG", color: "bg-accent", desc: "Best for graphics & logos. Lossless compression. Supports transparency. Much larger files." },
                  { label: "WebP", color: "bg-primary/10", desc: "Best for web. Lossy + lossless. Supports transparency. Smallest file sizes." },
                ].map((fmt) => (
                  <div key={fmt.label} className={`rounded-xl ${fmt.color} p-4 flex items-start gap-3`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background shadow-sm flex-shrink-0">
                      <ImageIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{fmt.label}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{fmt.desc}</p>
                    </div>
                  </div>
                ))}
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
              <div className="space-y-3 not-prose">
                {faqs.map((faq, index) => (
                  <details key={index} className="group rounded-xl border border-border bg-card shadow-sm">
                    <summary className="flex cursor-pointer items-center justify-between p-4 text-sm font-semibold text-foreground">
                      {faq.question}
                      <span className="ml-2 text-muted-foreground transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </div>
                  </details>
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
