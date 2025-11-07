"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useState } from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "@/hooks/use-toast"; // ✅ correct toast import

interface User {
  email: string;
  credits: number;
  maxCredits: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (params: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  updateCredits: (amount: number) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ---- Login ----
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const res = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        toast({
          title: "Login failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
        throw new Error("Invalid credentials");
      }

      const data = await res.json();

      setUser(data.user);
      localStorage.setItem("mailverify-token", data.token);
      localStorage.setItem("mailverify-user", JSON.stringify(data.user));

      toast({
        title: "Welcome back!",
        description: "Login successful.",
      });
      router.push("/dashboard");
    } catch (e) {
      console.error("Login error:", e);
      toast({
        title: "Something went wrong",
        description: "Unable to log in. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---- Signup ----
  const signup = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    setLoading(true);
    try {
      const res = await apiFetch("/signup", {
        method: "POST",
        body: JSON.stringify({ email, password, username }),
      });

      if (!res.ok) {
        toast({
          title: "Signup failed",
          description: "Could not create your account. Please try again.",
          variant: "destructive",
        });
        throw new Error("Signup failed");
      }

      const data = await res.json();
      setUser(data.user);
      localStorage.setItem("mailverify-token", data.token);
      localStorage.setItem("mailverify-user", JSON.stringify(data.user));

      toast({
        title: "Account created",
        description: "Your account was successfully created!",
      });
      router.push("/dashboard");
    } catch (e) {
      console.error("Signup error:", e);
      toast({
        title: "Something went wrong",
        description: "Unable to sign up. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---- Logout ----
  const logout = async () => {
    try {
      await apiFetch("/auth/logout", { method: "POST" });
    } catch {
      // ignore backend errors
    } finally {
      setUser(null);
      localStorage.removeItem("mailverify-token");
      localStorage.removeItem("mailverify-user");
      toast({
        title: "Logged out",
        description: "You have been logged out successfully.",
      });
      router.push("/login");
    }
  };

  // ---- Update credits locally ----
  const updateCredits = (amount: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, credits: Math.max(0, prev.credits + amount) };
      localStorage.setItem("mailverify-user", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateCredits, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ---- Hook ----
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
