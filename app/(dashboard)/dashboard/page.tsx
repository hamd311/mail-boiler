"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { AlertCircle, Zap, Upload, FileText } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { CreditBar } from "@/components/dashboard/credit-bar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleVerifier } from "@/components/dashboard/single-verifier";
import { BulkUpload } from "@/components/dashboard/bulk-upload";
import { ResultsTable } from "@/components/dashboard/tesults-table";
import { BulkVerifier } from "@/components/dashboard/bulk-verifier";

interface EmailResult {
  email: string;
  status: string;
  timestamp: string;
}

export default function DashboardPage() {
  const { user, updateCredits } = useAuth();
  const [results, setResults] = useState<EmailResult[]>([]);

  const handleVerify = (emailCount: number) => {
    if (!user) return;

    if (user.credits < emailCount) {
      // toast.error("Insufficient credits. Please upgrade your plan.");
      return;
    }

    updateCredits(-emailCount);
  };

  const handleBulkResults = (newResults: EmailResult[]) => {
    setResults([...newResults, ...results]);
  };

  if (!user) {
    return null;
  }

  const usedCredits = user.maxCredits - user.credits;

  return (
    <div className="from-secondary/20 via-background to-secondary/30 relative min-h-screen overflow-hidden bg-gradient-to-br">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-gradient-to-bl from-[#10b981]/10 via-[#06b6d4]/5 to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-[#3b82f6]/10 via-[#06b6d4]/5 to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          {/* Header */}
          <div className="space-y-2">
            <motion.h1
              className="text-4xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Welcome back,{" "}
              <span className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                {user.email.split("@")[0]}
              </span>
            </motion.h1>
            <motion.p
              className="text-muted-foreground text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Verify emails and manage your account
            </motion.p>
          </div>

          {/* Credit Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <CreditBar used={usedCredits} total={user.maxCredits} />
          </motion.div>

          {/* Low Credit Warning */}
          {user.credits < 10 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:border-amber-900 dark:from-amber-950 dark:to-orange-950">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-900 dark:text-amber-200">
                  <p>
                    You&apos;re running low on credits ({user.credits} remaining). Consider
                    upgrading your plan to continue verifying emails.
                  </p>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}

          {/* Main Content Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Tabs defaultValue="single" className="space-y-6">
              {/* --- Tabs Header --- */}
              <TabsList className="bg-secondary/50 border-border/50 grid h-12 w-full max-w-4xl grid-cols-3 rounded-xl border p-1 shadow-sm backdrop-blur-sm sm:gap-1">
                {/* Single Tab */}
                <TabsTrigger
                  value="single"
                  className="gap-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981] data-[state=active]:via-[#06b6d4] data-[state=active]:to-[#3b82f6] data-[state=active]:text-white sm:text-base"
                >
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Single Check</span>
                  <span className="sm:hidden">Single</span>
                </TabsTrigger>

                {/* Bulk Upload Tab */}
                <TabsTrigger
                  value="bulk"
                  className="gap-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981] data-[state=active]:via-[#06b6d4] data-[state=active]:to-[#3b82f6] data-[state=active]:text-white sm:text-base"
                >
                  <Upload className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Bulk Upload</span>
                  <span className="sm:hidden">Upload</span>
                </TabsTrigger>

                {/* Text Area Tab */}
                <TabsTrigger
                  value="text"
                  className="gap-2 text-sm font-medium transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#10b981] data-[state=active]:via-[#06b6d4] data-[state=active]:to-[#3b82f6] data-[state=active]:text-white sm:text-base"
                >
                  <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">Paste Emails</span>
                  <span className="sm:hidden">Text</span>
                </TabsTrigger>
              </TabsList>

              {/* --- Tab Contents --- */}
              <TabsContent value="single" className="space-y-6">
                <SingleVerifier onVerify={handleVerify} />
              </TabsContent>

              <TabsContent value="bulk" className="space-y-6">
                <BulkUpload onVerify={handleVerify} onResults={handleBulkResults} />
              </TabsContent>

              <TabsContent value="text" className="space-y-6">
                <BulkVerifier onVerify={handleVerify} onResults={handleBulkResults} />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Results Table */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <ResultsTable results={results} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
