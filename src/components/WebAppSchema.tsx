import { useEffect } from "react";

interface WebAppSchemaProps {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
}

const WebAppSchema = ({ 
  name, 
  description, 
  url,
  applicationCategory = "UtilityApplication" 
}: WebAppSchemaProps) => {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": name,
      "description": description,
      "url": url,
      "applicationCategory": applicationCategory,
      "operatingSystem": "Any",
      "browserRequirements": "Requires JavaScript. Requires HTML5.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "featureList": [
        "No upload required",
        "Browser-based conversion",
        "Free to use",
        "No registration needed",
        "Privacy focused"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [name, description, url, applicationCategory]);

  return null;
};

export default WebAppSchema;
