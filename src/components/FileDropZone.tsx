import { useState, useRef, useCallback } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileDropZoneProps {
  onFileSelect: (file: Blob, fileName: string) => void;
  acceptedTypes?: "images" | "pdf" | "both";
  maxSizeMB?: number;
  className?: string;
}

const FileDropZone = ({ 
  onFileSelect, 
  acceptedTypes = "both",
  maxSizeMB = 20,
  className 
}: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getAcceptString = () => {
    switch (acceptedTypes) {
      case "images":
        return "image/jpeg,image/png,image/gif,image/webp";
      case "pdf":
        return "application/pdf";
      case "both":
        return "image/jpeg,image/png,image/gif,image/webp,application/pdf";
      default:
        return "";
    }
  };

  const getAcceptedTypesLabel = () => {
    switch (acceptedTypes) {
      case "images":
        return "JPG, PNG, GIF, WebP";
      case "pdf":
        return "PDF";
      case "both":
        return "Images (JPG, PNG, GIF, WebP) or PDF";
      default:
        return "";
    }
  };

  const validateFile = (file: File): boolean => {
    setError("");

    // Check file size
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > maxSizeMB) {
      setError(`File size must be less than ${maxSizeMB}MB`);
      return false;
    }

    // Check file type
    const acceptedMimeTypes = getAcceptString().split(",");
    if (!acceptedMimeTypes.includes(file.type)) {
      setError(`Please select a valid file type: ${getAcceptedTypesLabel()}`);
      return false;
    }

    return true;
  };

  const handleFile = useCallback((file: File) => {
    if (validateFile(file)) {
      setSelectedFile(file);
      onFileSelect(file, file.name);
    }
  }, [onFileSelect, maxSizeMB, acceptedTypes]);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptString()}
        onChange={handleFileInput}
        className="hidden"
      />

      {!selectedFile ? (
        <div
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative cursor-pointer rounded-lg border-2 border-dashed transition-all",
            "flex flex-col items-center justify-center p-12",
            "hover:border-primary hover:bg-primary/5",
            isDragging
              ? "border-primary bg-primary/10"
              : "border-border bg-card",
            error && "border-destructive"
          )}
        >
          <Upload
            className={cn(
              "mb-4 h-12 w-12 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )}
          />
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            {isDragging ? "Drop your file here" : "Drop your file or click to browse"}
          </h3>
          <p className="text-sm text-muted-foreground">
            Accepts: {getAcceptedTypesLabel()}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Maximum file size: {maxSizeMB}MB
          </p>
        </div>
      ) : (
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4 flex-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <File className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">
                  {selectedFile.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(selectedFile.size)}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedFile.type}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRemoveFile}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileDropZone;
