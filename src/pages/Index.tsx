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
  CheckCircle,
  ArrowRight
} from "lucide-react";

const tools = [
  { icon: FileImage, title: "Image to PDF", description: "Combine multiple images into a single PDF", path: "/image-to-pdf" },
  { icon: FileImage, title: "JPG to PNG", description: "Convert JPG images to PNG format", path: "/jpg-to-png" },
  { icon: FileImage, title: "PNG to JPG", description: "Convert PNG images to JPG format", path: "/png-to-jpg" },
  { icon: ImageIcon, title: "Convert to WebP", description: "Convert JPG & PNG to WebP for smaller files", path: "/convert-to-webp" },
  { icon: ImageIcon, title: "WebP to JPG", description: "Convert WebP images to JPG format", path: "/webp-to-jpg" },
  { icon: ImageIcon, title: "HEIC to JPG", description: "Convert Apple HEIC photos to JPG", path: "/heic-to-jpg" },
  { icon: Combine, title: "Merge PDF", description: "Combine multiple PDFs into one file", path: "/merge-pdf" },
  { icon: Scissors, title: "Split PDF", description: "Extract pages from your PDF document", path: "/split-pdf" },
  { icon: Minimize, title: "Compress PDF", description: "Reduce PDF file size without losing quality", path: "/compress-pdf" },
];

const whyChooseItems = [
  { icon: Shield, title: "100% Private", desc: "Files processed locally in your browser. Nothing uploaded — your data stays private." },
  { icon: Zap, title: "Lightning Fast", desc: "No server uploads. Conversions happen instantly on your device." },
  { icon: Globe, title: "Works Everywhere", desc: "Any device, any browser — Windows, Mac, Linux, iOS, or Android." },
  { icon: Lock, title: "No Account Needed", desc: "Start immediately. No sign-up, no barriers." },
  { icon: CheckCircle, title: "Pro Quality", desc: "Professional-grade output with optimal compression and formatting." },
  { icon: FileText, title: "Completely Free", desc: "Every tool is free. No tiers, no watermarks, no hidden costs." },
];

const Index = () => {
  const navigate = useNavigate();
  
  const handleToolClick = useCallback((path: string) => {
    navigate(path);
  }, [navigate]);

  const toolCards = useMemo(() => (
    tools.map((tool, index) => (
      <ToolCard
        key={index}
        icon={tool.icon}
        title={tool.title}
        description={tool.description}
        onClick={() => handleToolClick(tool.path)}
      />
    ))
  ), [handleToolClick]);

  return (
    <Layout 
      title="Convertify - Free Online File Converter & Tools"
      description="Convert PDF to image, compress files, merge PDFs and more with our free online tools. Fast, secure, and no installation required."
      keywords="pdf converter, image converter, compress pdf, merge pdf, pdf to image, image to pdf, file converter"
    >
      <div className="w-full space-y-20">
        {/* Hero */}
        <section className="text-center pt-8 pb-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <Zap className="h-3.5 w-3.5" />
            Free & Browser-Based
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-5 leading-[1.1]">
            Convert files with
            <br />
            <span className="gradient-text">zero compromise</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Fast, private, and free. Convert images and PDFs directly in your browser — 
            nothing ever leaves your device.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#tools"
              className="inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-sm"
            >
              Explore Tools
              <ArrowRight className="h-4 w-4" />
            </a>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Learn More
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
          {[
            { value: "100%", label: "Browser-Based" },
            { value: "9+", label: "Free Tools" },
            { value: "0", label: "Files Uploaded" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold gradient-text">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Tools Grid */}
        <section id="tools">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">All Tools</h2>
            <p className="text-muted-foreground">Choose a tool and start converting instantly</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolCards}
          </div>
        </section>

        {/* Why Choose */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">Why Convertify?</h2>
            <p className="text-muted-foreground">Built different from every other converter</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {whyChooseItems.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/20">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-1.5">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section>
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground">Three steps. That's it.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { num: "01", title: "Select Your File", desc: "Choose the tool you need and upload your file by clicking or dragging." },
              { num: "02", title: "Instant Processing", desc: "Your file is processed directly in your browser. No server uploads." },
              { num: "03", title: "Download Result", desc: "Click download to save. Ready to use, share, or upload anywhere." },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-sm">
                  <span className="text-lg font-bold text-primary-foreground">{step.num}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Safety */}
        <section className="rounded-2xl border border-border bg-card p-8 md:p-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Is It Safe?</h2>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground">Absolutely.</strong> Convertify uses client-side technology — 
                your files never leave your device. Our JavaScript code processes everything directly in your browser 
                using your computer's or phone's own processing power.
              </p>
              <p>
                There is no data to breach because no data is transmitted. You get the convenience of 
                online tools with the security of desktop software.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center rounded-2xl gradient-subtle p-10 border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-3">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Choose a tool above and start converting. No sign-up required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 rounded-xl gradient-bg px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Learn More About Us
            </Link>
            <Link 
              to="/blog/file-formats-guide" 
              className="inline-flex items-center rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-muted transition-colors"
            >
              Read Our Format Guide
            </Link>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
