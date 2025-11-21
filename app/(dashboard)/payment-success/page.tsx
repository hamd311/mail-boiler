import React, { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-gradient-to-br from-gray-50 via-cyan-50/30 to-blue-50 flex items-center justify-center p-4 flex-1">
          <div className="max-w-2xl w-full">
            <div className="p-12 text-center">
              <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#10b981] via-[#06b6d4] to-[#3b82f6] animate-pulse mx-auto" />
            </div>
          </div>
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
