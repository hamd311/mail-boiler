"use client";
import { motion } from "motion/react";
import { Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginPage() {
  const loginSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuth();

  const onSubmit = (data: LoginFormData) => {
    login(data.email);
  };

  return (
    <div className="from-secondary/30 via-background to-secondary/20 relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-gradient-to-br px-4 py-12 sm:px-6 lg:px-8">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-gradient-to-br from-[#10b981]/20 to-transparent blur-3xl" />
      <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-gradient-to-tl from-[#3b82f6]/20 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
                Welcome back
              </motion.h1>
              <motion.p
                className="text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Log in to continue verifying emails
              </motion.p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-8">
              {/* Email */}
              <div className="space-y-1">
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
                    className={`bg-secondary/50 h-12 border pl-11 ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-border/50 focus:border-[#06b6d4]/50"
                    } transition-all focus:ring-0`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-muted-foreground text-sm transition-colors hover:text-[#10b981]"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="group relative">
                  <Lock className="text-muted-foreground absolute top-1/2 left-3.5 h-5 w-5 -translate-y-1/2 transition-colors group-focus-within:text-[#3b82f6]" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password")}
                    className={`bg-secondary/50 h-12 border pl-11 ${
                      errors.password
                        ? "border-red-500 focus:border-red-500"
                        : "border-border/50 focus:border-[#3b82f6]/50"
                    } transition-all focus:ring-0`}
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group h-12 w-full bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all duration-300 hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25"
                >
                  {isSubmitting ? "Logging in..." : "Log In"}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>

              <div className="space-y-4 pt-2">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="border-border/50 w-full border-t"></div>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card text-muted-foreground px-4">or</span>
                  </div>
                </div>

                <p className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href={"/signup"}>
                    <button
                      type="button"
                      className="text-[#10b981] transition-colors hover:text-[#06b6d4]"
                    >
                      Sign up
                    </button>
                  </Link>
                </p>
              </div>
            </form>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
