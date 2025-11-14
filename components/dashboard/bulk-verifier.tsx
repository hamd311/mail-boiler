"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import {
  useEmailVerification,
  VerificationResult,
} from "@/hooks/use-email-verification";

interface BulkVerifierProps {
  onResults?: (results: VerificationResult[]) => void;
  credits?: number;
}

export function BulkVerifier({ onResults }: BulkVerifierProps) {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<VerificationResult[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { verifyEmail } = useEmailVerification();

  function extractEmails(rawText: string): string[] {
    if (!rawText) return [];

    const emails = rawText
      .split(/[\s,]+/)
      .filter((email) => email.trim() !== "");
    const validEmails = emails.filter((email) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()),
    );
    return Array.from(new Set(validEmails));
  }

  const handleVerify = async () => {
    const emails = extractEmails(input);
    if (
      emails.length === 0 ||
      (user?.subscription?.remaining_credits || 0) < emails.length
    )
      return;

    try {
      setLoading(true);

      const response = await verifyEmail(emails);

      setResults(response.results);
      onResults?.(response.results);
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const emailCount = extractEmails(input).length;
  const hasInsufficientCredits =
    (user?.subscription.remaining_credits ?? 0) < emailCount && emailCount > 0;
  const isButtonDisabled =
    loading || emailCount === 0 || hasInsufficientCredits;

  const getTooltipMessage = () => {
    if (hasInsufficientCredits) {
      return `Insufficient credits. You need ${emailCount} credits but only have ${user?.subscription.remaining_credits} available.`;
    }
    return "";
  };

  return (
    <Card className="border-border/50 p-6 shadow-lg backdrop-blur-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Paste Email List</h3>
        <p className="text-muted-foreground text-sm">
          Paste emails separated by commas or spaces
        </p>

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
              ? `Detected ${emailCount} valid emails`
              : "Enter emails to start"}
          </span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0}>
                  <Button
                    onClick={handleVerify}
                    disabled={isButtonDisabled}
                    className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
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
                </span>
              </TooltipTrigger>
              {hasInsufficientCredits && (
                <TooltipContent>
                  <p>{getTooltipMessage()}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
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
                  {
                    results.filter(
                      (r) => r.status === "valid" || r.status === "exists",
                    ).length
                  }{" "}
                  valid
                </span>
              </div>

              {results.map((r, i) => (
                <div
                  key={i}
                  className={`rounded-lg border p-4 transition-all space-y-2 ${
                    r.status === "valid" || r.status === "exists"
                      ? "border-green-200 bg-green-50 text-green-900 dark:border-green-800 dark:bg-green-950/30 dark:text-green-100"
                      : "border-red-200 bg-red-50 text-red-900 dark:border-red-800 dark:bg-red-950/30 dark:text-red-100"
                  }`}
                >
                  {/* Email + Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{r.email}</span>

                    {r.status === "valid" || r.status === "exists" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
                    )}
                  </div>

                  {/* Message */}
                  {r.message && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p
                            className="text-xs opacity-80 leading-relaxed truncate max-w-full cursor-pointer"
                            title={r.message} // fallback tooltip for older browsers
                          >
                            {r.message}
                          </p>
                        </TooltipTrigger>
                        s
                        <TooltipContent className="max-w-xs break-words">
                          <p>{r.message}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}
