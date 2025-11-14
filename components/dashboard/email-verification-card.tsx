"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface VerificationResult {
  email: string;
  status: "exists" | "not_found" | "invalid";
  timestamp: string;
}

export function EmailVerificationCard() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<VerificationResult[]>([]);

  const handleVerify = async () => {
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8002"}/verify_emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer demo-token",
          },
          body: JSON.stringify({ emails: [email] }),
        },
      );

      const data = await response.json();
      if (data.results && data.results[0]) {
        const verificationResult: VerificationResult = {
          email: data.results[0].email,
          status: data.results[0].status,
          timestamp: new Date().toLocaleString(),
        };
        setResult(verificationResult);
        setHistory([verificationResult, ...history.slice(0, 4)]);
        setEmail("");
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "exists":
        return <CheckCircle2 className="text-success h-5 w-5" />;
      case "not_found":
        return <XCircle className="text-error h-5 w-5" />;
      default:
        return <XCircle className="text-warning h-5 w-5" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "exists":
        return "Email exists";
      case "not_found":
        return "Email not found";
      default:
        return "Invalid email";
    }
  };

  return (
    <Card className="border-surface-light bg-surface p-8">
      <h2 className="mb-6 text-2xl font-bold">Verify Email Address</h2>

      <div className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-2">
          <Input
            type="email"
            placeholder="Enter email address..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleVerify()}
            className="bg-surface-light text-foreground placeholder:text-muted flex-1"
          />
          <Button
            onClick={handleVerify}
            disabled={loading || !email}
            className="bg-primary hover:bg-primary-dark"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              "Verify"
            )}
          </Button>
        </div>

        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 border-surface-light bg-surface-light rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(result.status)}
                <div>
                  <p className="font-medium">{result.email}</p>
                  <p className="text-muted text-sm">
                    {getStatusText(result.status)}
                  </p>
                </div>
              </div>
              <p className="text-muted text-xs">{result.timestamp}</p>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8">
            <h3 className="mb-4 font-semibold">Recent Verifications</h3>
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="border-surface-light flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="text-sm font-medium">{item.email}</p>
                      <p className="text-muted text-xs">
                        {getStatusText(item.status)}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted text-xs">{item.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
