import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: "jpg-to-png-without-losing-quality",
    title: "How to Convert JPG to PNG Without Losing Quality",
    description: "Learn the complete process of converting JPG images to PNG format while maintaining image quality. Understand the technical differences and when to use each format.",
    date: "2024-10-15",
    readTime: "8 min read"
  },
  {
    slug: "heic-to-jpg-conversion-guide",
    title: "Why iPhones Use HEIC and How to Convert HEIC to JPG",
    description: "Discover why Apple uses HEIC format for photos and learn multiple methods to convert HEIC files to widely compatible JPG format.",
    date: "2024-10-12",
    readTime: "7 min read"
  },
  {
    slug: "pdf-compression-explained",
    title: "What Makes PDF Files Large and How Compression Works",
    description: "Understanding PDF file size factors and exploring effective compression techniques without sacrificing document quality.",
    date: "2024-10-08",
    readTime: "10 min read"
  },
  {
    slug: "best-image-conversion-tools-2025",
    title: "Best Free Online Tools to Convert Images in 2025",
    description: "A comprehensive review of the top free online image conversion tools, comparing features, security, and ease of use.",
    date: "2024-09-28",
    readTime: "9 min read"
  },
  {
    slug: "reduce-pdf-size-for-email",
    title: "How to Reduce PDF Size for Email Submissions",
    description: "Practical methods to compress PDF documents for email attachments, including step-by-step instructions and best practices.",
    date: "2024-09-22",
    readTime: "6 min read"
  },
  {
    slug: "online-file-converter-security",
    title: "How Secure Are Online File Converters? A Full Guide",
    description: "An in-depth look at online file converter security, privacy concerns, and how to choose safe conversion tools.",
    date: "2024-09-15",
    readTime: "11 min read"
  },
  {
    slug: "webp-format-guide",
    title: "What is WebP and Why Websites Use It",
    description: "Exploring the WebP image format, its advantages over traditional formats, and why it's becoming the web standard.",
    date: "2024-09-10",
    readTime: "7 min read"
  },
  {
    slug: "merge-pdfs-step-by-step",
    title: "How to Merge PDFs on Any Device (Step-by-Step)",
    description: "Complete guide to combining multiple PDF files into one document across different devices and platforms.",
    date: "2024-09-05",
    readTime: "8 min read"
  },
  {
    slug: "image-formats-explained",
    title: "Image Formats Explained: PNG, JPG, HEIC, WebP",
    description: "A comprehensive breakdown of modern image formats, their use cases, and which format to choose for different situations.",
    date: "2024-08-28",
    readTime: "12 min read"
  },
  {
    slug: "fix-pdf-too-large-error",
    title: "How to Fix 'PDF Too Large to Upload' Errors",
    description: "Troubleshooting guide for PDF file size issues with practical solutions and compression techniques.",
    date: "2024-08-20",
    readTime: "6 min read"
  }
];

export default function BlogIndex() {
  return (
    <Layout
      title="Convertify Blog - File Conversion Tips & Guides"
      description="Expert guides on image and PDF conversion, compression tips, format comparisons, and best practices for file management."
      keywords="image conversion, PDF tips, file compression, HEIC, WebP, format guide"
    >
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Convertify Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Expert guides, tips, and tutorials on file conversion, image optimization, 
            and document management. Learn how to work smarter with your files.
          </p>
        </header>

        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Link key={post.slug} to={`/blog/${post.slug}`}>
              <Card className="transition-all hover:shadow-lg hover:scale-[1.01] cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-primary font-medium">
                    Read article <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
