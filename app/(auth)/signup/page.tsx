"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader } from "@/components/ui/card";
import { Mail, Lock, User, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Logo } from "@/components/ui/logo";

// ✅ Zod validation schema
const signupSchema = z
  .object({
    username: z.string().min(2, "Username is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const { signup, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    await signup({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <div
      className="from-secondary/30 via-background to-secondary/20 relative flex 
     min-h-[100vh]
    items-center justify-center overflow-hidden bg-gradient-to-br px-4 py-12 sm:px-6 lg:px-8"
    >
      {/* Background gradients */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#10b981]/20 to-transparent blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-[#3b82f6]/20 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="border-border/50 shadow-xl backdrop-blur-sm sm:min-w-lg">
          <div className="flex justify-center">
            <Logo size="md" />
          </div>

          <div className="text-center">
            <motion.h1
              className="mb-3 text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create your account
            </motion.h1>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Start verifying emails in seconds
            </motion.p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
            {/* Username */}
            <div className="space-y-1.5">
              <label htmlFor="username" className="text-sm">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="John Doe"
                {...register("username")}
                startIcon={
                  <User className="h-5 w-5 transition-colors group-focus-within:text-[#10b981]" />
                }
                className={`h-12 border bg-secondary/50 transition-all focus:ring-0 ${
                  errors.username
                    ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                    : "border-border/50 focus-visible:border-[#10b981]/50 focus-visible:ring-[#10b981]/20"
                }`}
              />
              {errors.username && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.username.message}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                startIcon={
                  <Mail className="h-5 w-5 transition-colors group-focus-within:text-[#06b6d4]" />
                }
                className={`h-12 border bg-secondary/50 transition-all focus:ring-0 ${
                  errors.email
                    ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                    : "border-border/50 focus-visible:border-[#06b6d4]/50 focus-visible:ring-[#06b6d4]/20"
                }`}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="password"
                {...register("password")}
                startIcon={
                  <Lock className="h-5 w-5 transition-colors group-focus-within:text-[#3b82f6]" />
                }
                className={`h-12 border bg-secondary/50 transition-all focus:ring-0 ${
                  errors.password
                    ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                    : "border-border/50 focus-visible:border-[#3b82f6]/50 focus-visible:ring-[#3b82f6]/20"
                }`}
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                {...register("confirmPassword")}
                startIcon={
                  <Lock className="h-5 w-5 transition-colors group-focus-within:text-[#3b82f6]" />
                }
                className={`h-12 border bg-secondary/50 transition-all focus:ring-0 ${
                  errors.confirmPassword
                    ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                    : "border-border/50 focus-visible:border-[#3b82f6]/50 focus-visible:ring-[#3b82f6]/20"
                }`}
              />
              {errors.confirmPassword && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="group h-12 w-full bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25 disabled:opacity-50"
              >
                {isSubmitting || loading
                  ? "Creating Account..."
                  : "Create Account"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="space-y-4 pt-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-card px-4 text-muted-foreground">or</span>
                </div>
              </div>

              <p className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#10b981] transition-colors hover:text-[#06b6d4]"
                >
                  Log in
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
