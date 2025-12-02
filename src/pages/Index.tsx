import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { useNavigate, Link } from "react-router-dom";
import { 
  FileImage, 
  FileDown, 
  FileText,
  Image as ImageIcon,
  Minimize,
  Scissors,
  Combine,
  Shield,
  Zap,
  Globe,
  Lock,
  CheckCircle
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const navigate = useNavigate();
  
  const tools = [
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
      icon: ImageIcon,
      title: "WebP to JPG",
      description: "Convert WebP images to JPG format",
      path: "/webp-to-jpg"
    },
    {
      icon: ImageIcon,
      title: "HEIC to JPG",
      description: "Convert Apple HEIC photos to JPG",
      path: "/heic-to-jpg"
    },
    {
      icon: Combine,
      title: "Merge PDF",
      description: "Combine multiple PDFs into one file",
      path: "/merge-pdf"
    },
    {
      icon: Scissors,
      title: "Split PDF",
      description: "Extract pages from your PDF document",
      path: "/split-pdf"
    },
    {
      icon: Minimize,
      title: "Compress PDF",
      description: "Reduce PDF file size without losing quality",
      path: "/compress-pdf"
    },
  ];

  return (
    <Layout 
      title="Convertify - Free Online File Converter & Tools"
      description="Convert PDF to image, compress files, merge PDFs and more with our free online tools. Fast, secure, and no installation required."
      keywords="pdf converter, image converter, compress pdf, merge pdf, pdf to image, image to pdf, file converter"
    >
      <div className="w-full">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Free Online Image & PDF Converter Tools
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Convert, compress, and edit your files with our free online tools. 
            Fast, secure, and easy to use – all processing happens in your browser.
          </p>
        </div>

        {/* What is Convertify Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">What is Convertify?</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              Convertify is a collection of free, browser-based file conversion tools designed for 
              everyone. Whether you need to convert images between formats, merge multiple PDFs into 
              one document, compress files for email, or extract pages from a PDF, our tools handle 
              it instantly without requiring downloads or sign-ups.
            </p>
            <p className="text-muted-foreground">
              Built with privacy as a core principle, every conversion happens directly on your device. 
              Your files are never uploaded to any server, ensuring complete confidentiality for 
              sensitive documents, personal photos, and business materials.
            </p>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Tools Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Tools</h2>
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
        </section>

        <Separator className="my-12" />

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Convertify?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">100% Secure & Private</h3>
              <p className="text-sm text-muted-foreground">
                Files are processed locally in your browser. Nothing is uploaded to our servers – 
                your data stays completely private.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                No waiting for uploads or server processing. Conversions happen instantly 
                on your device for immediate results.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Globe className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Works Everywhere</h3>
              <p className="text-sm text-muted-foreground">
                Use on any device with a modern browser – Windows, Mac, Linux, iPhone, 
                iPad, or Android. No app installation required.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">No Account Needed</h3>
              <p className="text-sm text-muted-foreground">
                Start using tools immediately. No sign-up, no email verification, 
                no barriers between you and getting work done.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Professional Quality</h3>
              <p className="text-sm text-muted-foreground">
                Our tools produce professional-grade output. Maintain image quality, 
                preserve document formatting, and achieve optimal compression.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">Completely Free</h3>
              <p className="text-sm text-muted-foreground">
                Every tool is free to use without limits. No premium tiers, 
                no watermarks, no hidden costs.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* How It Works Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Select Your File</h3>
                <p className="text-sm text-muted-foreground">
                  Choose the tool you need and upload your file by clicking or 
                  dragging it onto the drop zone.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Instant Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Your file is processed directly in your browser. Conversion 
                  happens locally without any server uploads.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Download Result</h3>
                <p className="text-sm text-muted-foreground">
                  Click download to save your converted file. It is ready to use, 
                  share, or upload wherever you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Is It Safe Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Is It Safe?</h2>
          <div className="max-w-3xl mx-auto bg-muted/30 rounded-lg p-8">
            <p className="text-muted-foreground mb-4">
              <strong>Absolutely.</strong> Convertify takes a fundamentally different approach to 
              file processing than most online tools. We use client-side technology, which means 
              your files never leave your device.
            </p>
            <p className="text-muted-foreground mb-4">
              When you select a file, our JavaScript code processes it directly in your browser 
              using your computer's or phone's processing power. The converted file is generated 
              locally and made available for download. At no point does your file travel across 
              the internet to any server.
            </p>
            <p className="text-muted-foreground">
              This design makes it impossible for us to see, store, or access your files. There 
              is no data to breach because no data is transmitted. You get the convenience of 
              online tools with the security of desktop software.
            </p>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Trusted Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-6">Trusted by Users Worldwide</h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              Thousands of users rely on Convertify daily for their file conversion needs. 
              From students preparing assignments to professionals handling sensitive documents, 
              our tools serve diverse needs with consistent reliability.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <p className="text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Browser-Based Processing</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">8+</p>
                <p className="text-sm text-muted-foreground">Free Conversion Tools</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">Files Uploaded to Servers</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-card border border-border rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Choose a tool above and start converting. No sign-up required – just 
            select your file and get instant results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/about" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Learn More About Us
            </Link>
            <Link 
              to="/blog" 
              className="inline-flex items-center justify-center rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              Read Our Blog
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
