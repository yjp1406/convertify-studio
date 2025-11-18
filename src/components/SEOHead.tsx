import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

const SEOHead = ({ 
  title = "Convertify - Free Online File Converter",
  description = "Convert, compress, and edit your files with our free online tools. PDF to image, image compression, and more. Fast, secure, and easy to use.",
  keywords = "pdf converter, image converter, file compression, pdf to image, image to pdf, free online tools",
  ogImage = "https://lovable.dev/opengraph-image-p98pqg.png"
}: SEOHeadProps) => {
  useEffect(() => {
    // Update title
    document.title = title;
    
    // Update meta tags
    const metaTags = [
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:image", content: ogImage },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
    ];

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let meta = document.querySelector(selector);
      
      if (!meta) {
        meta = document.createElement("meta");
        if (name) meta.setAttribute("name", name);
        if (property) meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute("content", content);
    });
  }, [title, description, keywords, ogImage]);

  return null;
};

export default SEOHead;
