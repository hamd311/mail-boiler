import React from "react";
import { motion } from "motion/react";
import { Coins, TrendingUp, Zap } from "lucide-react";
import { Card } from "../ui/card";

interface CreditBarProps {
  used: number;
  total: number;
}

export function CreditBar({ used, total }: CreditBarProps) {
  const remaining = total - used;
  const percentage = (remaining / total) * 100;

  // Determine color based on percentage
  const getColorClass = () => {
    if (percentage > 50) return "from-[#10b981] to-[#06b6d4]";
    if (percentage > 20) return "from-[#f59e0b] to-[#f97316]";
    return "from-[#ef4444] to-[#dc2626]";
  };

  return (
    <Card className="border-border/50 relative overflow-hidden shadow-lg backdrop-blur-sm">
      {/* Decorative gradient background */}
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-gradient-to-bl from-[#10b981]/10 via-[#06b6d4]/5 to-transparent blur-2xl" />

      <div className="relative z-10 p-6">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${getColorClass()} shadow-lg`}
            >
              <Coins className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-lg">Credits Balance</h3>
                {percentage > 50 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    <TrendingUp className="h-3 w-3" />
                    Healthy
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-sm">
                {remaining.toLocaleString()} of {total.toLocaleString()} remaining
              </p>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`bg-gradient-to-r text-3xl ${getColorClass()} bg-clip-text text-transparent`}
            >
              {remaining.toLocaleString()}
            </div>
            <p className="text-muted-foreground mt-1 text-xs">available</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-3">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bg-secondary h-3 overflow-hidden rounded-full">
              <motion.div
                className={`h-full bg-gradient-to-r ${getColorClass()} relative overflow-hidden rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{
                  duration: 1,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Animated shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#10b981] to-[#06b6d4]" />
                <span className="text-muted-foreground">{percentage.toFixed(1)}% remaining</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="bg-muted h-2 w-2 rounded-full" />
                <span className="text-muted-foreground">{used.toLocaleString()} used</span>
              </div>
            </div>

            {percentage <= 20 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs text-red-700 dark:bg-red-900/30 dark:text-red-300"
              >
                <Zap className="h-3 w-3" />
                Low credits
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
