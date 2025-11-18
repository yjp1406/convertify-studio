import { useState } from "react";
import Layout from "@/components/Layout";
import FileDropZone from "@/components/FileDropZone";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PdfToImage = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileSelect = (fileBlob: Blob, name: string) => {
    setFile(fileBlob);
    setFileName(name);
    toast.success(`File selected: ${name}`);
    console.log("File blob:", fileBlob);
    console.log("File size:", fileBlob.size, "bytes");
  };

  const handleConvert = () => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }
    
    // This is where you would implement the actual conversion logic
    toast.info("Conversion would happen here!");
    console.log("Converting file:", fileName);
  };

  return (
    <Layout
      title="PDF to Image Converter - Convertify"
      description="Convert PDF files to high-quality images. Free, fast, and secure online PDF to image converter."
      keywords="pdf to image, pdf converter, pdf to jpg, pdf to png"
    >
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            PDF to Image Converter
          </h1>
          <p className="text-muted-foreground">
            Convert your PDF files to high-quality images
          </p>
        </div>

        <FileDropZone
          onFileSelect={handleFileSelect}
          acceptedTypes="pdf"
          maxSizeMB={20}
        />

        {file && (
          <div className="flex justify-center">
            <Button 
              onClick={handleConvert}
              size="lg"
              className="min-w-[200px]"
            >
              Convert to Image
            </Button>
          </div>
        )}

        <div className="rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            How it works
          </h2>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li>1. Upload your PDF file using the drop zone above</li>
            <li>2. Click "Convert to Image" to start the conversion</li>
            <li>3. Download your converted images</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default PdfToImage;
