import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Use Vite's built-in esbuild minifier (FAST & no extra dependency)
    minify: "esbuild",

    // Equivalent console removal using esbuild
    esbuild: {
      drop: mode === "production" ? ["console", "debugger"] : [],
    },

    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-ui": [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-tabs",
          ],

          // PDF libraries
          "pdf-libs": ["pdf-lib"],
          "pdfjs": ["pdfjs-dist"],

          // Image processing
          "image-libs": ["heic2any", "browser-image-compression"],
        },
      },
    },

    chunkSizeWarningLimit: 500,
    sourcemap: mode === "development",
  },

  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: ["pdf-lib", "pdfjs-dist", "heic2any"],
  },
}));
