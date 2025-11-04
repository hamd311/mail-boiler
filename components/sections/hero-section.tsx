"use client";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../ImageWithFallback";
import { useEmailVerification } from "@/hooks/use-email-verification";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export function HeroSection() {
  const { verifyEmail, result, loading } = useEmailVerification();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await verifyEmail([values.email]);
  };

  return (
    <section className="bg-background relative overflow-hidden py-20 sm:py-32">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <div className="animated-gradient absolute inset-0" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="border-border mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <span className="text-muted-foreground text-sm">Fast, accurate, and secure</span>
            </div>

            <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl">
              Check if an email exists <span className="gradient-text">instantly.</span>
            </h1>

            <p className="text-muted-foreground mb-8 max-w-xl text-lg">
              Fast, accurate, and secure email verification API. Validate single emails or process
              thousands in bulk. Start with 100 free credits.
            </p>

            {/* Email Verification Input */}

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Enter email to verify..."
                {...register("email")}
                className="bg-background h-12 flex-1 px-4"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-12 bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white hover:opacity-90"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Verify
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>

            {errors.email && (
              <p className="text-destructive my-2 ml-1 text-sm">{errors.email.message}</p>
            )}

            {/* Result Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-border bg-card mt-4 flex items-center gap-3 rounded-lg border p-4"
              >
                {result.status === "exists" || result.status === "valid" ? (
                  <>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                    <div>
                      <p className="text-sm">
                        <strong>{result.email}</strong>
                      </p>
                      <p className="text-sm text-green-600">✅ Email exists</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="h-6 w-6 text-red-500" />
                    <div>
                      <p className="text-sm">
                        <strong>{result.email}</strong>
                      </p>
                      <p className="text-sm text-red-600">❌ Email not found</p>
                    </div>
                  </>
                )}
              </motion.div>
            )}

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={"/signup"}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white hover:opacity-90"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="border-border relative aspect-square overflow-hidden rounded-2xl border bg-gradient-to-br from-[#10b981]/10 to-[#3b82f6]/10 p-8">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759752394755-1241472b589d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwZGFzaGJvYXJkJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2MTgxMTA1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Dashboard Preview"
                className="h-full w-full rounded-xl object-cover"
              />

              {/* Floating stats cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="border-border bg-card absolute top-8 right-8 rounded-lg border p-4 shadow-xl"
              >
                <p className="text-muted-foreground text-xs">Verified Today</p>
                <p className="text-2xl">12,847</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="border-border bg-card absolute bottom-8 left-8 rounded-lg border p-4 shadow-xl"
              >
                <p className="text-muted-foreground text-xs">Accuracy</p>
                <p className="text-2xl">99.2%</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
