"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle } from "lucide-react";

interface HistoryItem {
  id: string;
  type: "single" | "bulk";
  count: number;
  valid: number;
  invalid: number;
  date: string;
}

export function VerificationHistory() {
  const history: HistoryItem[] = [
    {
      id: "1",
      type: "single",
      count: 1,
      valid: 1,
      invalid: 0,
      date: "Today",
    },
  ];

  return (
    <Card className="border-surface-light bg-surface p-8">
      <h2 className="mb-6 text-2xl font-bold">Verification History</h2>

      <div className="space-y-4">
        {history.length > 0 ? (
          history.map((item) => (
            <div
              key={item.id}
              className="border-surface-light flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <p className="font-medium capitalize">
                  {item.type} Verification
                </p>
                <p className="text-muted text-sm">
                  {item.count} email(s) verified
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="text-success h-4 w-4" />
                    <span className="text-sm font-medium">{item.valid}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <XCircle className="text-error h-4 w-4" />
                    <span className="text-sm font-medium">{item.invalid}</span>
                  </div>
                </div>
                <p className="text-muted text-sm">{item.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted py-8 text-center">
            No verification history yet
          </p>
        )}
      </div>
    </Card>
  );
}
