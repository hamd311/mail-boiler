import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Upload, FileText, Loader2, AlertCircle, Sparkles, CheckCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import { useEmailVerification } from "@/hooks/use-email-verification";

interface EmailResult {
  email: string;
  status: string;
  timestamp: string;
}

interface BulkUploadProps {
  onVerify: (emailCount: number) => void;
  onResults: (results: EmailResult[]) => void;
}

export function BulkUpload({ onVerify, onResults }: BulkUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const { verifyEmail, result, loading: apiLoading } = useEmailVerification();

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

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      processFile(droppedFile);
    }
  };

  const processFile = (selectedFile: File) => {
    setFile(selectedFile);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      let parsedEmails: string[] = [];

      // Parse based on file type
      if (selectedFile.name.endsWith(".csv") || selectedFile.name.endsWith(".txt")) {
        // Split by newlines and commas, filter out empty strings
        parsedEmails = text
          .split(/[\n,]/)
          .map((email) => email.trim())
          .filter((email) => email && email.includes("@"));
      }

      setEmails(parsedEmails);
      setLoading(false);
    };

    reader.onerror = () => {
      setLoading(false);
    };

    reader.readAsText(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    processFile(selectedFile);
  };

  const handleVerifyAll = async () => {
    if (emails.length === 0) return;

    try {
      const data = await verifyEmail(emails);

      const response = data || result;

      if (response && response.results) {
        const resultsWithTimestamp = response.results.map((r) => ({
          ...r,
          timestamp: new Date().toISOString(),
        }));

        // update parent
        onResults(resultsWithTimestamp);
        onVerify(emails.length);

        // reset
        setFile(null);
        setEmails([]);
      }
    } catch (error) {
      console.error("Bulk verify failed:", error);
    }
  };

  return (
    <Card className="border-border/50 overflow-hidden shadow-lg backdrop-blur-sm">
      <div className="space-y-6 p-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#06b6d4] to-[#3b82f6] shadow-md">
              <Upload className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl">Bulk Email Verification</h3>
              <p className="text-muted-foreground text-sm">
                Upload a CSV, Excel, or TXT file containing email addresses
              </p>
            </div>
          </div>
        </div>

        {/* File Upload */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragging
              ? "scale-[1.02] border-[#10b981] bg-[#10b981]/5"
              : "border-border/50 hover:bg-secondary/30 hover:border-[#10b981]/50"
          }`}
        >
          <input
            type="file"
            id="file-upload"
            accept=".csv,.txt,.xlsx"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={isDragging ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                className={`flex h-20 w-20 items-center justify-center rounded-2xl ${
                  isDragging
                    ? "bg-gradient-to-br from-[#10b981] to-[#06b6d4]"
                    : "from-secondary to-secondary/50 bg-gradient-to-br"
                }`}
              >
                {loading ? (
                  <Loader2
                    className={`h-10 w-10 animate-spin ${
                      isDragging ? "text-white" : "text-muted-foreground"
                    }`}
                  />
                ) : (
                  <Upload
                    className={`h-10 w-10 ${isDragging ? "text-white" : "text-muted-foreground"}`}
                  />
                )}
              </motion.div>
              <div>
                <p className="mb-2 text-lg">
                  {file ? (
                    <span className="text-[#10b981]">{file.name}</span>
                  ) : isDragging ? (
                    <span className="text-[#10b981]">Drop your file here</span>
                  ) : (
                    "Click to upload or drag and drop"
                  )}
                </p>
                <p className="text-muted-foreground text-sm">
                  CSV, TXT, or Excel files (up to 10MB)
                </p>
              </div>
            </div>
          </label>
        </div>

        {/* Email Preview */}
        <AnimatePresence mode="wait">
          {emails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 p-5 dark:border-blue-800 dark:from-blue-950/30 dark:to-cyan-950/30">
                <div className="mb-3 flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
                    <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="mb-1 text-blue-900 dark:text-blue-100">
                      Loaded <strong>{emails.length}</strong> email
                      {emails.length !== 1 ? "s" : ""} from file
                    </p>
                    <div className="max-h-32 space-y-1.5 overflow-y-auto rounded-lg bg-white/50 p-3 text-sm dark:bg-black/20">
                      {emails.slice(0, 10).map((email, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-blue-800 dark:text-blue-200"
                        >
                          <CheckCircle className="h-3 w-3 text-blue-500" />
                          {email}
                        </div>
                      ))}
                      {emails.length > 10 && (
                        <div className="text-blue-600 italic dark:text-blue-400">
                          ... and {emails.length - 10} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Verify Button */}
        <AnimatePresence mode="wait">
          {emails.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button
                onClick={handleVerifyAll}
                disabled={loading || apiLoading}
                className="h-12 w-full bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25"
              >
                {loading || apiLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying {emails.length} emails...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Verify All ({emails.length} credit
                    {emails.length !== 1 ? "s" : ""})
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-900 dark:from-blue-950/30 dark:to-cyan-950/30">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            Each email verification uses 1 credit.{" "}
            {emails.length > 0 && (
              <>
                This operation will use <strong>{emails.length}</strong> credit
                {emails.length !== 1 ? "s" : ""}.
              </>
            )}
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}
