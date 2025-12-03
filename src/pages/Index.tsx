import { memo, useMemo, useCallback } from "react";
import Layout from "@/components/Layout";
import ToolCard from "@/components/ToolCard";
import { useNavigate, Link } from "react-router-dom";
import { 
  FileImage, 
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

// Memoized sections to prevent unnecessary re-renders
const HeroSection = memo(() => (
  <div className="text-center mb-16">
    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
      Free Online Image & PDF Converter Tools
    </h1>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      Convert, compress, and edit your files with our free online tools. 
      Fast, secure, and easy to use – all processing happens in your browser.
    </p>
  </div>
));
HeroSection.displayName = 'HeroSection';

const WhatIsSection = memo(() => (
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
));
WhatIsSection.displayName = 'WhatIsSection';

const whyChooseItems = [
  { icon: Shield, title: "100% Secure & Private", desc: "Files are processed locally in your browser. Nothing is uploaded to our servers – your data stays completely private." },
  { icon: Zap, title: "Lightning Fast", desc: "No waiting for uploads or server processing. Conversions happen instantly on your device for immediate results." },
  { icon: Globe, title: "Works Everywhere", desc: "Use on any device with a modern browser – Windows, Mac, Linux, iPhone, iPad, or Android. No app installation required." },
  { icon: Lock, title: "No Account Needed", desc: "Start using tools immediately. No sign-up, no email verification, no barriers between you and getting work done." },
  { icon: CheckCircle, title: "Professional Quality", desc: "Our tools produce professional-grade output. Maintain image quality, preserve document formatting, and achieve optimal compression." },
  { icon: FileText, title: "Completely Free", desc: "Every tool is free to use without limits. No premium tiers, no watermarks, no hidden costs." },
];

const WhyChooseSection = memo(() => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold text-center mb-8">Why Choose Convertify?</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {whyChooseItems.map((item, idx) => (
        <div key={idx} className="bg-card border border-border rounded-lg p-6 text-center">
          <item.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
          <h3 className="font-semibold mb-2">{item.title}</h3>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
));
WhyChooseSection.displayName = 'WhyChooseSection';

const HowItWorksSection = memo(() => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
    <div className="max-w-4xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { num: "1", title: "Select Your File", desc: "Choose the tool you need and upload your file by clicking or dragging it onto the drop zone." },
          { num: "2", title: "Instant Processing", desc: "Your file is processed directly in your browser. Conversion happens locally without any server uploads." },
          { num: "3", title: "Download Result", desc: "Click download to save your converted file. It is ready to use, share, or upload wherever you need it." },
        ].map((step) => (
          <div key={step.num} className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary">{step.num}</span>
            </div>
            <h3 className="font-semibold mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
));
HowItWorksSection.displayName = 'HowItWorksSection';

const SafetySection = memo(() => (
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
));
SafetySection.displayName = 'SafetySection';

const TrustedSection = memo(() => (
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
));
TrustedSection.displayName = 'TrustedSection';

const CTASection = memo(() => (
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
));
CTASection.displayName = 'CTASection';

const tools = [
  { icon: FileImage, title: "Image to PDF", description: "Combine multiple images into a single PDF", path: "/image-to-pdf" },
  { icon: FileImage, title: "JPG to PNG", description: "Convert JPG images to PNG format", path: "/jpg-to-png" },
  { icon: FileImage, title: "PNG to JPG", description: "Convert PNG images to JPG format", path: "/png-to-jpg" },
  { icon: ImageIcon, title: "WebP to JPG", description: "Convert WebP images to JPG format", path: "/webp-to-jpg" },
  { icon: ImageIcon, title: "HEIC to JPG", description: "Convert Apple HEIC photos to JPG", path: "/heic-to-jpg" },
  { icon: Combine, title: "Merge PDF", description: "Combine multiple PDFs into one file", path: "/merge-pdf" },
  { icon: Scissors, title: "Split PDF", description: "Extract pages from your PDF document", path: "/split-pdf" },
  { icon: Minimize, title: "Compress PDF", description: "Reduce PDF file size without losing quality", path: "/compress-pdf" },
];

const Index = () => {
  const navigate = useNavigate();
  
  const handleToolClick = useCallback((path: string, title: string) => {
    if (path !== "#") {
      navigate(path);
    } else {
      console.log(`Coming soon: ${title}`);
    }
  }, [navigate]);

  const toolCards = useMemo(() => (
    tools.map((tool, index) => (
      <ToolCard
        key={index}
        icon={tool.icon}
        title={tool.title}
        description={tool.description}
        onClick={() => handleToolClick(tool.path, tool.title)}
      />
    ))
  ), [handleToolClick]);

  return (
    <Layout 
      title="Convertify - Free Online File Converter & Tools"
      description="Convert PDF to image, compress files, merge PDFs and more with our free online tools. Fast, secure, and no installation required."
      keywords="pdf converter, image converter, compress pdf, merge pdf, pdf to image, image to pdf, file converter"
    >
      <div className="w-full">
        <HeroSection />

        <WhatIsSection />

        <Separator className="my-12" />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {toolCards}
          </div>
        </section>

        <Separator className="my-12" />

        <WhyChooseSection />

        <Separator className="my-12" />

        <HowItWorksSection />

        <Separator className="my-12" />

        <SafetySection />

        <Separator className="my-12" />

        <TrustedSection />

        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
