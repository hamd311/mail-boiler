"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { apiFetch } from "@/lib/api";

export interface CheckoutResult {
  url: string;
}

export function usePayments() {
  const { toast } = useToast();
  const { user, fetchMe } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [creatingCheckoutSession, setCreatingCheckoutSession] = useState(false);
  const isLoading = loading;

  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);

  // --------------------------------------------------
  // FETCH PACKAGES DETAILS
  // --------------------------------------------------
  const getPackages = async () => {
    setLoading(true);
    try {
      const response = await apiFetch("/packages_detail", {
        method: "GET",
        headers: { accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Failed to fetch packages (${response.status})`);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Fetch Packages Error:", error);
      toast({
        title: "Failed to fetch packages",
        description: "Please try again later.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // HANDLE STRIPE CHECKOUT (NEW)
  // --------------------------------------------------
  const createCheckoutSession = async (package_id: string,planName:string): Promise<CheckoutResult | null> => {
    if (!user) {
      router.push(`/login?plan=${package_id}`);
      return null;
    }
    if(planName ==='free'){
      toast({
        title: "You are already on the Free plan",
        description: "No need to checkout for the Free plan.",
        variant: "destructive",
      })
      return null;
    }

    setCreatingCheckoutSession(true);
    setCheckoutUrl(null);

    try {
      const response = await apiFetch("/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({ package_id }),
      });

      if (!response.ok) throw new Error(`Checkout failed (${response.status})`);

      const data = await response.json(); 

      if (data.session_url) {
        setCheckoutUrl(data.session_url);
        toast({ title: "Redirecting to payment..." });
        window.location.replace(data.session_url);

      }

      return data;
    } catch (err) {
      console.error("Checkout Error:", err);
      toast({
        title: "Payment failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      return null;
    } finally {
      setCreatingCheckoutSession(false);
    }
  };

  // --------------------------------------------------
  // MANAGE SUBSCRIPTION
  // --------------------------------------------------
  const manageSubscription = async (): Promise<string | null> => {
    if (!user) {
      router.push("/auth/login");
      return null;
    }

    setLoading(true);
    try {
      const response = await apiFetch("/stripe/manage", { method: "POST" });
      if (!response.ok) throw new Error(`Portal error (${response.status})`);

      const data = await response.json();
      return data.url || null;
    } catch (err) {
      console.error("Portal Error:", err);
      toast({
        title: "Failed to open billing portal",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
      await fetchMe();
    }
  };

  return {
    // states
    loading,
    isLoading,
    checkoutUrl,

    // methods
    getPackages,
    createCheckoutSession,
    manageSubscription,
    creatingCheckoutSession
  };
}
