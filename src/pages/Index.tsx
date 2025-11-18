import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  const tools = [
    {
      icon: FileDown,
      title: "PDF to Image",
      description: "Convert PDF files to high-quality images",
      path: "/pdf-to-image"
    },
    {
      icon: FileImage,
      title: "Image to PDF",
      description: "Combine multiple images into a single PDF",
      path: "/image-to-pdf"
    },
    {
      icon: FileImage,
      title: "JPG to PNG",
      description: "Convert JPG images to PNG format",
      path: "/jpg-to-png"
    },
    {
      icon: FileImage,
      title: "PNG to JPG",
      description: "Convert PNG images to JPG format",
      path: "/png-to-jpg"
    },
    {
      icon: Minimize,
      title: "Compress PDF",
      description: "Reduce PDF file size without losing quality",
      path: "#"
    },
    {
      icon: ImageIcon,
      title: "Image Converter",
      description: "Convert between JPG, PNG, WebP, and more",
      path: "#"
    },
    {
      icon: Minimize,
      title: "Compress Image",
      description: "Optimize images for web and mobile",
      path: "#"
    },
    {
      icon: Scissors,
      title: "Split PDF",
      description: "Extract pages from your PDF document",
      path: "#"
    },
    {
      icon: Combine,
      title: "Merge PDF",
      description: "Combine multiple PDFs into one file",
      path: "#"
    },
    {
      icon: FileText,
      title: "Edit PDF",
      description: "Add text, images, and signatures to PDFs",
      path: "#"
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
              onClick={() => tool.path !== "#" ? navigate(tool.path) : console.log(`Coming soon: ${tool.title}`)}
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
