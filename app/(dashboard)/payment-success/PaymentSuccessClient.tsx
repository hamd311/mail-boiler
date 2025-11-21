"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { motion } from "motion/react";
import { Card, CardHeader } from "@/components/ui/card";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  CreditCard,
  Loader2,
  Package,
  Sparkles,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  const { toast } = useToast();

  const onNavigateToDashboard = () => {
    router.replace("/dashboard");
  };

  useEffect(() => {
    if (!sessionId) return;

    const verifyPayment = async () => {
      setLoading(true);

      try {
        const response = await apiFetch("/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ session_id: sessionId }),
        });

        if (!response.ok) throw new Error("Payment verification failed");

        const data = await response.json();

        if (data.status === "paid") {
          setSuccess(true);
          setSubscriptionInfo(data.result);
          toast({ title: "Payment Successful!" });
        } else {
          setSuccess(false);
          toast({
            title: "Payment verification failed",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Verify Payment Error:", err);
        toast({ title: "Something went wrong", variant: "destructive" });
        setSuccess(false);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, toast]);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-cyan-50/30 to-blue-50 flex items-center justify-center p-4 flex-1">
      <div className="max-w-2xl w-full">
        {loading ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-border/50 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="p-12 text-center space-y-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#10b981] via-[#06b6d4] to-[#3b82f6] animate-pulse"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="h-10 w-10 text-white animate-spin" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Verifying Your Payment
                  </h2>
                  <p className="text-gray-500">
                    Please wait while we confirm your transaction...
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : success && subscriptionInfo ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Card className="border-border/50 overflow-hidden shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="flex justify-center mb-4"
                  >
                    <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-white mb-2"
                  >
                    Payment Successful! 🎉
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-white/90"
                  >
                    {subscriptionInfo.message}
                  </motion.p>
                </div>
              </CardHeader>
              {/* Success Header */}

              {/* Details */}
              <div className="p-8 space-y-6">
                <div className="grid gap-4">
                  {/* Package Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/50">
                      <Package className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Package
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {subscriptionInfo.package_name}
                      </p>
                    </div>
                  </motion.div>

                  {/* Credits Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
                      <Sparkles className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Credits Available
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {subscriptionInfo.remaining_credits.toLocaleString()}{" "}
                        credits
                      </p>
                    </div>
                  </motion.div>

                  {/* Expiry Info */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200 dark:border-blue-800"
                  >
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
                      <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Valid Until
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        {new Date(
                          subscriptionInfo.expiry_date
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Action Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                  <Button
                    onClick={onNavigateToDashboard}
                    className="w-full h-14 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25"
                  >
                    <span>Start Verifying Emails</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Card className="border-border/50 overflow-hidden shadow-2xl backdrop-blur-sm">
              {/* Error Header */}
              <div className="bg-gradient-to-r from-red-500 to-rose-500 p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="flex justify-center mb-4"
                >
                  <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <XCircle className="h-12 w-12 text-white" />
                  </div>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-white mb-2"
                >
                  Payment Failed ❌
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-white/90"
                >
                  We couldn't process your payment
                </motion.p>
              </div>

              {/* Details */}
              <div className="p-8 space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-gray-600 dark:text-gray-400">
                    Your payment could not be completed. This may be due to
                    insufficient funds, incorrect card details, or a temporary
                    issue with your payment provider.
                  </p>
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      If you continue to experience issues, please contact our
                      support team for assistance.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={onNavigateToDashboard}
                    className="w-full h-14 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25"
                  >
                    <span>Return to Dashboard</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-12"
                    onClick={() => window.location.reload()}
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    <span>Try Again</span>
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
