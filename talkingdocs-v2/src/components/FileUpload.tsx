"use client";

import { useState } from "react";
import { UploadCloud, File, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export function FileUpload() {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus("idle");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setStatus("idle");
    setErrorMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setStatus("success");
      setFile(null); // Reset after successful upload
    } catch (error: any) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-muted/50">
        <p className="text-muted-foreground">Please sign in to upload documents.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl bg-card transition-all hover:bg-accent/10">
      <div className="w-full max-w-md space-y-4">
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32 cursor-pointer rounded-lg border border-border bg-background hover:bg-muted/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
            <p className="mb-2 text-sm text-muted-foreground">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-muted-foreground">PDF (MAX. 10MB)</p>
          </div>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        {file && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-3 truncate">
              <File className="w-5 h-5 text-blue-500 shrink-0" />
              <span className="text-sm font-medium truncate">{file.name}</span>
            </div>
            <Button size="sm" onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Processing..." : "Process Document"}
            </Button>
          </div>
        )}

        {status === "success" && (
          <div className="flex items-center text-sm text-green-500 bg-green-500/10 p-3 rounded-md">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Document processed and added to your workspace!
          </div>
        )}

        {status === "error" && (
          <div className="flex items-center text-sm text-destructive bg-destructive/10 p-3 rounded-md">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
}
