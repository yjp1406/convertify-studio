# Convertify Studio

🚀 **Convertify Studio** is a fast, privacy-focused, browser-based file conversion web application.  
It allows users to convert images and manage PDF files entirely on the client side — no file uploads, no servers, and no data storage.

🌐 **Live Demo:** https://convertify-studio.netlify.app/

---

## ✨ Features

### 🖼️ Image Conversion
- JPG → PNG  
- PNG → JPG  
- WebP → JPG  
- HEIC → JPG  

### 📄 PDF Tools
- Image → PDF
- Merge multiple PDFs
- Split PDF pages
- Compress PDF size

### 🔐 Privacy First
- All file processing happens **locally in the browser**
- No files are uploaded or stored on any server

### ⚡ Performance Optimized
- Lazy loading of heavy libraries
- Code splitting with Vite
- Optimized for Core Web Vitals
- Mobile and desktop performance tuned

### 📱 Responsive & Accessible
- Fully responsive UI
- Clean, modern design
- Optimized for desktop and mobile users

---

## 🛠️ Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **shadcn/ui**
- **Radix UI**

### Libraries & Tools
- **pdf-lib** – PDF creation and manipulation
- **pdfjs-dist** – PDF rendering
- **heic2any** – HEIC image conversion
- **browser-image-compression** – Image optimization
- **Lucide Icons**

### Performance & SEO
- Code splitting & dynamic imports
- Lazy loading
- Lighthouse optimization
- SEO meta tags
- Sitemap.xml & robots.txt
- Structured data (Schema.org)

### Deployment
- **Netlify**
- GitHub CI/CD via Netlify builds

---

## 🧠 Architecture Overview

- Built as a **Single Page Application (SPA)**
- Heavy libraries (PDF & image processing) are **dynamically imported**
- No backend required — all operations run client-side
- SPA routing handled via Netlify redirects
- Static assets optimized and cached efficiently

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/convertify-studio.git
cd convertify-studio
npm install
npm run dev
