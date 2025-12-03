// Lazy-loaded PDF utilities to avoid loading heavy libraries at startup

let pdfLibModule: typeof import('pdf-lib') | null = null;
let pdfjsModule: typeof import('pdfjs-dist') | null = null;

export async function getPdfLib() {
  if (!pdfLibModule) {
    pdfLibModule = await import('pdf-lib');
  }
  return pdfLibModule;
}

export async function getPdfjs() {
  if (!pdfjsModule) {
    pdfjsModule = await import('pdfjs-dist');
    // Configure worker
    const pdfjsWorker = await import('pdfjs-dist/legacy/build/pdf.worker.min.js?url');
    pdfjsModule.GlobalWorkerOptions.workerSrc = pdfjsWorker.default;
  }
  return pdfjsModule;
}

// Helper to create a new PDF document
export async function createPdfDocument() {
  const { PDFDocument } = await getPdfLib();
  return PDFDocument.create();
}

// Helper to load a PDF document from bytes
export async function loadPdfDocument(bytes: ArrayBuffer) {
  const { PDFDocument } = await getPdfLib();
  return PDFDocument.load(bytes);
}

// Helper to get PDF document for rendering (using pdfjs)
export async function getPdfDocumentForRendering(data: ArrayBuffer) {
  const pdfjs = await getPdfjs();
  return pdfjs.getDocument({ data }).promise;
}
