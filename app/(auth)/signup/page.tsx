"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, User, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";

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
    <div className="from-secondary/30 via-background to-secondary/20 relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-gradient-to-br px-4 py-12 sm:px-6 lg:px-8">
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
          <div className="text-center">
            <motion.div
              className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#10b981] via-[#06b6d4] to-[#3b82f6] shadow-lg shadow-[#10b981]/20"
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Shield className="h-10 w-10 text-white" />
            </motion.div>
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-8">
            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm">
                User name
              </label>
              <div className="group relative">
                <User className="text-muted-foreground absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 transition-colors group-focus-within:text-[#10b981]" />
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("username")}
                  className={`bg-secondary/50 border-border/50 h-12 pl-11 transition-all focus:border-[#10b981]/50 focus:ring-[#10b981]/20 ${
                    errors.username ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <div className="group relative">
                <Mail className="text-muted-foreground absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 transition-colors group-focus-within:text-[#06b6d4]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                  className={`bg-secondary/50 border-border/50 h-12 pl-11 transition-all focus:border-[#06b6d4]/50 focus:ring-[#06b6d4]/20 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
              <div className="group relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 transition-colors group-focus-within:text-[#3b82f6]" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`bg-secondary/50 border-border/50 h-12 pl-11 transition-all focus:border-[#3b82f6]/50 focus:ring-[#3b82f6]/20 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm">
                Confirm Password
              </label>
              <div className="group relative">
                <Lock className="text-muted-foreground absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 transition-colors group-focus-within:text-[#3b82f6]" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className={`bg-secondary/50 border-border/50 h-12 pl-11 transition-all focus:border-[#3b82f6]/50 focus:ring-[#3b82f6]/20 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* ✅ Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className="group h-12 w-full bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25"
              >
                {isSubmitting || loading
                  ? "Creating Account..."
                  : "Create Account"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}
