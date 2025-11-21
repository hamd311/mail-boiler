"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Zap, Upload, FileText } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleVerifier } from "@/components/dashboard/single-verifier";
import { BulkUpload } from "@/components/dashboard/bulk-upload";
import { useRouter } from "next/navigation";
import { BulkVerifier } from "@/components/dashboard/bulk-verifier";
import { VerificationResult } from "@/hooks/use-email-verification";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";

export default function DashboardPage() {
  const { user } = useAuth();
  const { initializing } = useAuth();
  const [results, setResults] = useState<VerificationResult[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!initializing && !user) {
      router.replace("/");
    }
  }, [user, router]);

  const handleBulkResults = (newResults: VerificationResult[]) => {
    setResults([...newResults, ...results]);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex-1 from-secondary/20 via-background to-secondary/30 relative overflow-hidden bg-gradient-to-br min-h-0">
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

          <DashboardHeader
            userName={user.email.split("@")[0]}
            totalCredits={user.subscription.total_credits}
            usedCredits={
              user.subscription.total_credits -
              user.subscription.remaining_credits
            }
          />

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
                <SingleVerifier />
              </TabsContent>

              <TabsContent value="bulk" className="space-y-6">
                <BulkUpload onResults={handleBulkResults} />
              </TabsContent>

              <TabsContent value="text" className="space-y-6">
                <BulkVerifier onResults={handleBulkResults} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
