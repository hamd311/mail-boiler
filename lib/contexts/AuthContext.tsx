"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  email: string;
  credits: number;
  maxCredits: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  signup: (email: string) => void;
  logout: () => void;
  updateCredits: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mailverify-user");
      if (saved) setUser(JSON.parse(saved));
    } catch (e) {
      // ignore
    }
  }, []);

  const login = (email: string) => {
    const userData: User = { email, credits: 100, maxCredits: 100 };
    setUser(userData);
    localStorage.setItem("mailverify-user", JSON.stringify(userData));
    router.push("/dashboard");
  };

  const signup = (email: string) => {
    // For demo purposes signup behaves like login
    login(email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mailverify-user");
  };

  const updateCredits = (amount: number) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, credits: Math.max(0, prev.credits + amount) };
      try {
        localStorage.setItem("mailverify-user", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
