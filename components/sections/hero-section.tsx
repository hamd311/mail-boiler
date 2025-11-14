"use client";
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  Check,
  X,
} from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function HeroSection() {
  const [loading, setLoading] = useState(false);
  const [singleMailResult, setSingleMailResult] = useState<{
    email: string;
    status: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock result - you can replace with actual API call
    setSingleMailResult({
      email: values.email,
      status: values.email.includes("test") ? "invalid" : "valid",
    });
    setLoading(false);
  };

  return (
    <section className="relative overflow-hidden bg-background pt-15">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-100/20 via-background to-background dark:from-cyan-950/20" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 backdrop-blur-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
              <span className="text-sm text-muted-foreground">
                Fast, accurate, and secure
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              Check if an email exists{" "}
              <span className="text-cyan-600 dark:text-cyan-400">
                instantly.
              </span>
            </h1>

            {/* Description */}
            <p className="mb-8 max-w-xl text-lg text-muted-foreground">
              Fast, accurate, and secure email verification API. Validate single
              emails or process thousands in bulk. Start with 100 free credits.
            </p>

            {/* Email Verification Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mb-4 flex flex-col gap-3 sm:flex-row"
            >
              <div className="flex-1">
                <Input
                  type="email"
                  placeholder="user@mail.com"
                  {...register("email")}
                  className={`h-12 border-2 bg-background transition-all ${
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500/20"
                      : "border-border focus-visible:border-cyan-500 focus-visible:ring-cyan-500/20"
                  }`}
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="h-12 bg-cyan-500 px-8 text-white hover:bg-cyan-600"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Verify
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Error Message */}
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 text-sm text-red-500"
              >
                {errors.email.message}
              </motion.p>
            )}

            {/* Result Display */}
            {singleMailResult && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-8 rounded-xl border p-5 shadow-sm ${
                  singleMailResult.status === "exists" ||
                  singleMailResult.status === "valid"
                    ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-950/20"
                    : "border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  {singleMailResult.status === "exists" ||
                  singleMailResult.status === "valid" ? (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                  ) : (
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                      <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="mb-1 truncate text-foreground">
                      {singleMailResult.email}
                    </p>
                    {singleMailResult.status === "exists" ||
                    singleMailResult.status === "valid" ? (
                      <div className="flex items-center gap-1.5">
                        <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-sm text-emerald-700 dark:text-emerald-300">
                          Email exists
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                        <span className="text-sm text-red-700 dark:text-red-300">
                          Email not found
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Button */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-cyan-500 text-white hover:bg-cyan-600"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1593642532400-2682810df593?w=1200&auto=format&fit=crop&q=80"
                alt="Email verification dashboard preview"
                className="h-full w-full object-cover"
                fill
              />

              {/* Floating stats cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-6 right-6 rounded-xl border border-border bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:bg-gray-900/95"
              >
                <p className="text-xs text-muted-foreground">Verified Today</p>
                <p className="text-2xl">12,847</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                className="absolute bottom-6 left-6 rounded-xl border border-border bg-white/95 p-4 shadow-lg backdrop-blur-sm dark:bg-gray-900/95"
              >
                <p className="text-xs text-muted-foreground">Accuracy</p>
                <p className="text-2xl">99.2%</p>
              </motion.div>
            </div>

            {/* Decorative gradient blur */}
            <div className="absolute -bottom-20 -right-20 -z-10 h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl" />
            <div className="absolute -top-20 -left-20 -z-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
