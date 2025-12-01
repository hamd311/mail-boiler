"use client";

import { useEffect, useState, useRef } from "react";
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
import { useAuth } from "@/lib/contexts/AuthContext";

export default function PaymentSuccessClient() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const router = useRouter();
  const { toast } = useToast();
  const hasFetched = useRef(false);

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [alreadyProcessed, setAlreadyProcessed] = useState(false);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  const [message, setMessage] = useState<string>("");
  const { fetchMe } = useAuth();

  const onNavigateToDashboard = () => router.replace("/dashboard");

  useEffect(() => {
    if (!sessionId || hasFetched.current) return;
    hasFetched.current = true;

    const verifyPayment = async () => {
      setLoading(true);
      try {
        const response = await apiFetch("/verify-payment", {
          method: "POST",
          body: JSON.stringify({ session_id: sessionId }),
        });

        if (!response.ok) throw new Error("Payment verification failed");

        const data = await response.json();

        setMessage(data.message || "");

        if (data.payment_status === "paid") {
          setSuccess(true);
          setSubscriptionInfo(data.subscription);
          fetchMe();
          toast({ title: "Payment Successful!" });
        } else if (data.payment_status === "already_processed") {
          setSuccess(true);
          setAlreadyProcessed(true);
          setSubscriptionInfo(data.subscription || null); // subscription can be null
          toast({ title: data.message });
        } else {
          setSuccess(false);
          toast({
            title: "Payment verification failed",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error("Verify Payment Error:", err);
        setSuccess(false);
        toast({ title: "Something went wrong", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId, toast]);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-cyan-50/30 to-blue-50 flex items-center justify-center p-4 flex-1">
      <div className="max-w-2xl w-full">
        {/* Loading */}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
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
                <h2 className="text-2xl font-semibold text-gray-900">
                  Verifying Your Payment
                </h2>
                <p className="text-gray-500">
                  Please wait while we confirm your transaction...
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Success (paid or already processed) */}
        {!loading && success && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
          >
            <Card className="border-border/50 overflow-hidden shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <div className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] p-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <div className="h-20 w-20 mx-auto rounded-full bg-white/20 flex items-center justify-center">
                      <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                  </motion.div>

                  <h1 className="text-3xl font-bold text-white mt-4">
                    {alreadyProcessed
                      ? "Payment Already Processed ✓"
                      : "Payment Successful! 🎉"}
                  </h1>

                  <p className="text-white/90 mt-2">{message}</p>
                </div>
              </CardHeader>

              <div className="p-8 space-y-6">
                {/* Package */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-50">
                  <Package className="h-6 w-6 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-500">Package</p>
                    <p className="text-lg font-semibold">
                      {subscriptionInfo?.package_name || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Credits */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-green-50">
                  <Sparkles className="h-6 w-6 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Credits Available</p>
                    <p className="text-lg font-semibold">
                      {subscriptionInfo?.remaining_credits?.toLocaleString() ??
                        "N/A"}{" "}
                      credits
                    </p>
                  </div>
                </div>

                {/* Expiry */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Valid Until</p>
                    <p className="text-lg font-semibold">
                      {subscriptionInfo?.expiry_date
                        ? new Date(
                            subscriptionInfo.expiry_date
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <Button
                  onClick={onNavigateToDashboard}
                  className="w-full h-14 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white"
                >
                  Start Verifying Emails
                  <ArrowRight className="ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Error */}
        {!loading && success === false && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="border-border/50 overflow-hidden shadow-2xl backdrop-blur-sm">
              <div className="bg-gradient-to-r from-red-500 to-rose-500 p-8 text-center">
                <div className="h-20 w-20 rounded-full bg-white/20 mx-auto flex items-center justify-center">
                  <XCircle className="h-12 w-12 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mt-4">
                  Payment Failed ❌
                </h1>
                <p className="text-white/90 mt-2">
                  We couldn't process your payment.
                </p>
              </div>

              <div className="p-8 space-y-4">
                <Button
                  onClick={onNavigateToDashboard}
                  className="w-full bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6]"
                >
                  Return to Dashboard
                </Button>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.reload()}
                >
                  <CreditCard className="mr-2" />
                  Try Again
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
