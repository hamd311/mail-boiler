"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import { useAuth } from "@/lib/contexts/AuthContext";
import { useForm } from "react-hook-form";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { Alert, AlertDescription } from "../ui/alert";
import {
  useEmailVerification,
  VerificationResult,
} from "@/hooks/use-email-verification";

interface FormValues {
  email: string;
}

export function SingleVerifier() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const { verifyEmail, loading } = useEmailVerification();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await verifyEmail([data.email]);

      if (response?.data?.length > 0) {
        const resultData: VerificationResult = {
          ...response.data[0],
        };
        setResult(resultData);
        reset();
      }
    } catch (error) {
      console.error("Email verification failed:", error);
    }
  };

  const isButtonDisabled =
    loading || user?.subscription.remaining_credits === 0;

  return (
    <Card className="border-border/50 overflow-hidden shadow-lg backdrop-blur-sm">
      <div className="space-y-6 p-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#06b6d4] shadow-md">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                Single Email Verification
              </h3>
              <p className="text-muted-foreground text-sm">
                Verify a single email address instantly
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <div className="group relative flex-1">
            <Mail className="text-muted-foreground absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 transition-colors group-focus-within:text-[#06b6d4] z-10 pointer-events-none" />
            <Input
              type="email"
              placeholder="email@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              className={`bg-secondary/50 border-border/50 h-12 pl-12 transition-all focus:border-[#06b6d4]/50 focus:ring-[#06b6d4]/20 [&:-webkit-autofill]:bg-secondary/50 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_hsl(var(--secondary)/0.5)] ${
                errors.email ? "border-red-500" : ""
              }`}
            />
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span tabIndex={0}>
                  <Button
                    type="submit"
                    disabled={isButtonDisabled}
                    className="h-12 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] px-8 text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-5 w-5" />
                        Verify Email
                      </>
                    )}
                  </Button>
                </span>
              </TooltipTrigger>
              {user?.subscription.remaining_credits === 0 && (
                <TooltipContent>
                  <p>Insufficient credits. Please add credits to continue.</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </form>

        {/* Result */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`rounded-xl border-2 p-5 ${
                  result.status === "exists" || result.status === "valid"
                    ? "border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:border-green-800 dark:from-green-950/30 dark:to-emerald-950/30"
                    : "border-red-200 bg-gradient-to-br from-red-50 to-rose-50 dark:border-red-800 dark:from-red-950/30 dark:to-rose-950/30"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                      result.status === "exists" || result.status === "valid"
                        ? "bg-green-100 dark:bg-green-900/50"
                        : "bg-red-100 dark:bg-red-900/50"
                    }`}
                  >
                    {result.status === "exists" || result.status === "valid" ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <p
                      className={`${
                        result.status === "exists" || result.status === "valid"
                          ? "text-green-900 dark:text-green-100"
                          : "text-red-900 dark:text-red-100"
                      }`}
                    >
                      <strong className="text-lg">{result.email}</strong>
                    </p>
                    <p
                      className={`${
                        result.status === "exists" || result.status === "valid"
                          ? "text-green-700 dark:text-green-200"
                          : "text-red-700 dark:text-red-200"
                      }`}
                    >
                      {result.message ||
                        (result.status === "exists" || result.status === "valid"
                          ? "✅ This email address exists and is valid"
                          : "❌ This email address does not exist or is invalid")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info */}
        <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 dark:border-blue-900 dark:from-blue-950/30 dark:to-cyan-950/30">
          <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            Each verification uses 1 credit. Results are displayed instantly.
          </AlertDescription>
        </Alert>
      </div>
    </Card>
  );
}
