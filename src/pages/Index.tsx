import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { 
  FileImage, 
  FileDown, 
  FileText,
  Image as ImageIcon,
  Minimize,
  Scissors,
  Combine
} from "lucide-react";

const Index = () => {
  const tools = [
    {
      icon: FileDown,
      title: "PDF to Image",
      description: "Convert PDF files to high-quality images"
    },
    {
      icon: FileImage,
      title: "Image to PDF",
      description: "Combine multiple images into a single PDF"
    },
    {
      icon: Minimize,
      title: "Compress PDF",
      description: "Reduce PDF file size without losing quality"
    },
    {
      icon: ImageIcon,
      title: "Image Converter",
      description: "Convert between JPG, PNG, WebP, and more"
    },
    {
      icon: Minimize,
      title: "Compress Image",
      description: "Optimize images for web and mobile"
    },
    {
      icon: Scissors,
      title: "Split PDF",
      description: "Extract pages from your PDF document"
    },
    {
      icon: Combine,
      title: "Merge PDF",
      description: "Combine multiple PDFs into one file"
    },
    {
      icon: FileText,
      title: "Edit PDF",
      description: "Add text, images, and signatures to PDFs"
    }
  ];

  return (
    <Layout 
      title="Convertify - Free Online File Converter & Tools"
      description="Convert PDF to image, compress files, merge PDFs and more with our free online tools. Fast, secure, and no installation required."
      keywords="pdf converter, image converter, compress pdf, merge pdf, pdf to image, image to pdf, file converter"
    >
      <div className="w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Free Online File Converter
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert, compress, and edit your files with our free online tools. 
            Fast, secure, and easy to use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.map((tool, index) => (
            <ToolCard
              key={index}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              onClick={() => console.log(`Clicked: ${tool.title}`)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col gap-2 bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-semibold text-foreground">
              Why Choose Convertify?
            </h3>
            <ul className="text-sm text-muted-foreground space-y-2 text-left">
              <li>✓ 100% Free - No hidden charges</li>
              <li>✓ Secure - Files are processed locally</li>
              <li>✓ Fast - Instant conversions</li>
              <li>✓ No Installation - Works in your browser</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
