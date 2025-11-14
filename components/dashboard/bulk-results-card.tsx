"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Download } from "lucide-react";

interface VerificationResult {
  email: string;
  status: "exists" | "not_found" | "invalid";
}

export function BulkResultsCard() {
  const [results] = useState<VerificationResult[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("bulkResults");
    return stored ? JSON.parse(stored) : [];
  });

  const validCount = results.filter((r) => r.status === "exists").length;
  const invalidCount = results.filter((r) => r.status !== "exists").length;

  const handleDownloadResults = () => {
    const csv = [
      ["Email", "Status"],
      ...results.map((r) => [r.email, r.status]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "verification-results.csv";
    a.click();
  };

  if (results.length === 0) {
    return (
      <Card className="border-surface-light bg-surface p-8">
        <h2 className="mb-6 text-2xl font-bold">Results</h2>
        <p className="text-muted py-8 text-center">
          No results yet. Upload a CSV file to get started.
        </p>
      </Card>
    );
  }

  return (
    <Card className="border-surface-light bg-surface p-8">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Results</h2>
        <Button
          onClick={handleDownloadResults}
          className="bg-primary hover:bg-primary-dark"
        >
          <Download className="mr-2 h-4 w-4" />
          Download CSV
        </Button>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="from-success/20 to-success/10 rounded-lg bg-gradient-to-br p-4">
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle2 className="text-success h-5 w-5" />
            <span className="text-muted text-sm">Valid Emails</span>
          </div>
          <p className="text-3xl font-bold">{validCount}</p>
        </div>
        <div className="from-error/20 to-error/10 rounded-lg bg-gradient-to-br p-4">
          <div className="mb-2 flex items-center gap-2">
            <XCircle className="text-error h-5 w-5" />
            <span className="text-muted text-sm">Invalid Emails</span>
          </div>
          <p className="text-3xl font-bold">{invalidCount}</p>
        </div>
      </div>

      <div className="max-h-96 space-y-2 overflow-y-auto">
        {results.map((result, index) => (
          <div
            key={index}
            className="border-surface-light flex items-center justify-between rounded-lg border p-3"
          >
            <div className="flex items-center gap-3">
              {result.status === "exists" ? (
                <CheckCircle2 className="text-success h-5 w-5" />
              ) : (
                <XCircle className="text-error h-5 w-5" />
              )}
              <span className="text-sm">{result.email}</span>
            </div>
            <span className="text-muted text-xs capitalize">
              {result.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
