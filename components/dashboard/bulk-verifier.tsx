"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEmailVerification } from "@/hooks/use-email-verification";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import type { VerifyResponse } from "@/hooks/use-email-verification";

// A single result with a timestamp
type EmailResult = VerifyResponse["results"][number] & {
  timestamp: string;
};

interface BulkVerifierProps {
  onVerify?: (count: number) => void;
  onResults?: (results: EmailResult[]) => void;
}

export function BulkVerifier({ onVerify, onResults }: BulkVerifierProps) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<EmailResult[]>([]);
  const { verifyEmail, loading } = useEmailVerification();

  function extractEmails(rawText: string): string[] {
    if (!rawText) return [];

    const emails = rawText.split(/[\s,]+/).filter((email) => email.trim() !== "");
    const validEmails = emails.filter((email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()));
    return Array.from(new Set(validEmails)); // Remove duplicates
  }

  const handleVerify = async () => {
    const emails = extractEmails(input);
    if (emails.length === 0) return;

    try {
      const data = await verifyEmail(emails);
      if (data?.results) {
        const withTimestamps: EmailResult[] = data.results.map((r) => ({
          ...r,
          timestamp: new Date().toISOString(),
        }));
        setResults(withTimestamps);
        onResults?.(withTimestamps);
        onVerify?.(emails.length);
      }
    } catch (error) {
      console.error("Verification failed:", error);
    }
  };

  return (
    <Card className="border-border/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Paste Email List</h3>
        <p className="text-muted-foreground text-sm">Paste emails separated by commas or spaces</p>

        <Textarea
          placeholder="Enter emails separated by commas or spaces...
Example: email1@gmail.com, email2@yahoo.com, email3@hotmail.com"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="bg-secondary/50 border-border/50 min-h-[160px] focus:border-[#06b6d4]/50 focus:ring-[#06b6d4]/20"
        />

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">
            {input
              ? `Detected ${extractEmails(input).length} valid emails`
              : "Enter emails to start"}
          </span>

          <Button
            onClick={handleVerify}
            disabled={loading || extractEmails(input).length === 0}
            className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify Emails"
            )}
          </Button>
        </div>

        <AnimatePresence>
          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Verification Results</h4>
                <span className="text-muted-foreground text-sm">
                  {results.filter((r) => r.status === "valid" || r.status === "exists").length}{" "}
                  valid
                </span>
              </div>

              {results.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-4 transition-all ${
                    r.status === "valid" || r.status === "exists"
                      ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-100"
                      : "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{r.email}</span>
                    {r.status === "valid" || r.status === "exists" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
