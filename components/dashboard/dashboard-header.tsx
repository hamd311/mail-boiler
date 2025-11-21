"use client";

import { motion } from "motion/react";
import { Wallet, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";

interface DashboardHeaderProps {
  userName: string;
  totalCredits: number;
  usedCredits: number;
}

export function DashboardHeader({
  userName,
  totalCredits,
  usedCredits,
}: DashboardHeaderProps) {
  const remainingCredits = totalCredits - usedCredits;
  const percentage =
    totalCredits > 0 ? (remainingCredits / totalCredits) * 100 : 0;

  // Determine color based on percentage
  const getColorScheme = () => {
    if (percentage > 50)
      return {
        gradient: "from-emerald-500 to-teal-500",
        bg: "bg-emerald-500/10",
        text: "text-emerald-600 dark:text-emerald-400",
        border: "border-emerald-200/50 dark:border-emerald-800/50",
        progressBar: "bg-emerald-500",
      };
    if (percentage > 20)
      return {
        gradient: "from-amber-500 to-orange-500",
        bg: "bg-amber-500/10",
        text: "text-amber-600 dark:text-amber-400",
        border: "border-amber-200/50 dark:border-amber-800/50",
        progressBar: "bg-amber-500",
      };
    return {
      gradient: "from-red-500 to-rose-500",
      bg: "bg-red-500/10",
      text: "text-red-600 dark:text-red-400",
      border: "border-red-200/50 dark:border-red-800/50",
      progressBar: "bg-red-500",
    };
  };

  const colorScheme = getColorScheme();

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_auto]"
      >
        {/* Welcome Section - Left */}
        <Card className="border-border/40 shadow-sm">
          <div className="p-5">
            <h1 className="text-2xl md:text-3xl">
              Hello,{" "}
              <span className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-transparent">
                {userName}
              </span>
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Start verifying email addresses to ensure deliverability and
              maintain a clean contact list.
            </p>
          </div>
        </Card>

        {/* Credits Section - Right */}
        <Card
          className={`${colorScheme.border} border shadow-sm lg:min-w-[320px]`}
        >
          <div className="p-5">
            <div className="space-y-3">
              {/* Header with badge */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className={`${colorScheme.bg} flex h-8 w-8 items-center justify-center rounded-lg`}
                  >
                    <Wallet className={`h-4 w-4 ${colorScheme.text}`} />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide">
                      Credit Balance
                    </p>
                    <p className="text-2xl font-semibold leading-none">
                      {remainingCredits.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div
                  className={`flex items-center gap-1 rounded-md ${colorScheme.bg} px-2 py-1`}
                >
                  <TrendingUp className={`h-3 w-3 ${colorScheme.text}`} />
                  <span className={`text-xs font-medium ${colorScheme.text}`}>
                    {percentage.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {usedCredits.toLocaleString()} used
                  </span>
                  <span className="text-muted-foreground">
                    {totalCredits.toLocaleString()} total
                  </span>
                </div>

                <div className="bg-secondary relative h-1.5 overflow-hidden rounded-full">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${colorScheme.progressBar}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{
                      duration: 1,
                      delay: 0.2,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Low Credit Warning */}
      {remainingCredits < 10 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:border-amber-900 dark:from-amber-950/30 dark:to-orange-950/30">
            <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
            <AlertDescription className="text-sm text-amber-900 dark:text-amber-200">
              You&apos;re running low on credits ({remainingCredits} remaining).
              Consider purchasing more credits to continue verifying emails.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </div>
  );
}
