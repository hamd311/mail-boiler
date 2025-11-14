"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiFetch } from "@/lib/api";
import { useAuth } from "@/lib/contexts/AuthContext";

export interface VerificationResult {
  status: string;
  email: string;
  message: string;
}

export interface VerifyResponse {
  results: VerificationResult[];
}

export interface SingleMainVerifyResponse {
  result: VerificationResult;
}

export function useEmailVerification() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [singleMailResult, setSingleMailResult] =
    useState<VerificationResult | null>(null);
  const { fetchMe } = useAuth();

  const verifyEmail = async (emails: string[]): Promise<VerifyResponse> => {
    setLoading(true);
    setResult(null);

    try {
      const response = await apiFetch("/verify_emails", {
        method: "POST",
        body: JSON.stringify({ emails }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast({
            title: "Session expired",
            description: "Please log in again.",
            variant: "destructive",
          });
          localStorage.removeItem("mailverify-token");
        }
        throw new Error(`Verification failed (${response.status})`);
      }

      const data: VerifyResponse = await response.json();

      if (data.results?.length > 0) {
        setResult(data.results[0]);
        toast({ title: "Verification complete!" });
      }

      return data;
    } catch (error) {
      toast({
        title: "Failed to verify email",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      return { results: [] };
    } finally {
      setLoading(false);
      await fetchMe();
    }
  };

  const verifySingleEmail = async (
    email: string,
  ): Promise<SingleMainVerifyResponse> => {
    setLoading(true);
    setSingleMailResult(null);

    try {
      const response = await apiFetch("/single_email_verifier", {
        method: "POST",
        body: JSON.stringify({ email }),
        auth: false,
      });

      if (!response.ok) {
        throw new Error(`Verification failed (${response.status})`);
      }

      const data: SingleMainVerifyResponse = await response.json();
      if (data.result) {
        setSingleMailResult(data.result);
        toast({ title: "Verification complete!" });
      }

      return data;
    } catch (error) {
      console.error("Verification error:", error);
      toast({
        title: "Failed to verify email",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
      return {
        result: { status: "error", email, message: "Failed verification" },
      };
    } finally {
      setLoading(false);
    }
  };

  return { verifySingleEmail, verifyEmail, result, singleMailResult, loading };
}
