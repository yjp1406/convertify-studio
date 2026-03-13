import { useState, useRef, useCallback } from "react";
import { Upload, CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  onFileSelect: (file: Blob, fileName: string) => void;
  acceptedTypes?: "images" | "pdf" | "both";
  maxSizeMB?: number;
  className?: string;
  multiple?: boolean;
}

const FileDropZone = ({ 
  onFileSelect, 
  acceptedTypes = "both",
  maxSizeMB = 50,
  className,
  multiple = false
}: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    switch (acceptedTypes) {
      case "images": return "image/jpeg,image/png,image/gif,image/webp";
      case "pdf": return "application/pdf";
      case "both": return "image/jpeg,image/png,image/gif,image/webp,application/pdf";
      default: return "";
    }
  };

  const getAcceptedTypesLabel = () => {
    switch (acceptedTypes) {
      case "images": return "JPG, PNG, GIF, WebP";
      case "pdf": return "PDF";
      case "both": return "Images (JPG, PNG, GIF, WebP) or PDF";
      default: return "";
    }
  };

  const validateFile = (file: File): boolean => {
    setError("");
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }
    const acceptedMimeTypes = getAcceptString().split(",");
    if (!acceptedMimeTypes.includes(file.type)) {
      setError(`Please select a valid file type: ${getAcceptedTypesLabel()}`);
      return false;
    }
    return true;
  };

  const handleFiles = useCallback((files: FileList) => {
    setError("");
    Array.from(files).forEach((file) => {
      if (validateFile(file)) {
        onFileSelect(file, file.name);
      }
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [onFileSelect, maxSizeMB, acceptedTypes]);

  const handleDragEnter = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) handleFiles(files);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) handleFiles(files);
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptString()}
        onChange={handleFileInput}
        className="hidden"
        multiple={multiple}
      />
      <div
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300",
          "flex flex-col items-center justify-center py-14 px-8",
          isDragging
            ? "border-primary bg-primary/5 shadow-[var(--shadow-glow)]"
            : "border-border hover:border-primary/50 hover:bg-muted/30",
          error && "border-destructive"
        )}
      >
        <div className={cn(
          "mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300",
          isDragging ? "bg-primary/15 scale-110" : "bg-muted"
        )}>
          <CloudUpload className={cn(
            "h-8 w-8 transition-colors",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
        </div>
        <h3 className="mb-1.5 text-base font-semibold text-foreground">
          {isDragging
            ? (multiple ? "Drop your files here" : "Drop your file here")
            : (multiple ? "Drop files or click to browse" : "Drop file or click to browse")
          }
        </h3>
        <p className="text-sm text-muted-foreground">
          {getAcceptedTypesLabel()} · Max {maxSizeMB}MB {multiple && "per file"}
        </p>
      </div>

      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default FileDropZone;
