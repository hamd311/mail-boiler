"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { apiFetch } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import { jwtDecode } from "jwt-decode";

// ----------------------
// TYPES
// ----------------------

interface User {
  email: string;
  subscription: Subscription;
}

interface Subscription {
  is_active: boolean;
  package_name: string | null;
  total_credits: number;
  remaining_credits: number;
  activation_date: string | null;
  expiry_date: string | null;
}

interface MeResponse {
  user_id: string;
  username: string;
  email: string;
  subscription: Subscription;
}

interface DecodedToken {
  email?: string;
  exp?: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (params: {
    email: string;
    password: string;
    username: string;
  }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  initializing: boolean;
  fetchMe: () => Promise<void>;
}

// ----------------------
// CONTEXT
// ----------------------

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ----------------------
// PROVIDER
// ----------------------

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();

  // ----------------------
  // Fetch /me profile
  // ----------------------

  const fetchMe = async () => {
    try {
      const res = await apiFetch("/me", {
        method: "GET",
        auth: true,
      });

      if (!res.ok) throw new Error("Unauthorized");

      const data: MeResponse = await res.json();

      setUser({ ...data });
    } catch (err) {
      logout();
      toast({
        title: "Session expired",
        description: "Please log in again.",
        variant: "destructive",
      });
    }
  };

  // ----------------------
  // Restore session on reload
  // ----------------------

  useEffect(() => {
    const token = localStorage.getItem("mailverify-token");

    if (!token) {
      setInitializing(false);
      return;
    }

    // Check if token expired BEFORE hitting API
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem("mailverify-token");
        setInitializing(false);
        return;
      }
    } catch {}

    // Fetch user profile
    // Fetch user profile
    fetchMe().finally(() => setInitializing(false));
  }, []);

  // ----------------------
  // Protect dashboard routes
  // ----------------------

  useEffect(() => {
    if (
      !initializing &&
      !user &&
      window.location.pathname.startsWith("/dashboard")
    ) {
      router.replace("/login");
    }
  }, [initializing, user]);

  // ----------------------
  // LOGIN
  // ----------------------

  const login = async (email: string, password: string) => {
    setLoading(true);

    try {
      const res = await apiFetch("/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        auth: false,
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        toast({
          title: "Login failed",
          description: errorData?.detail || "Invalid credentials.",
          variant: "destructive",
        });
        return;
      }

      const data = await res.json();

      if (!data.access_token) {
        toast({
          title: "Login failed",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
        return;
      }

      const token = data.access_token;
      localStorage.setItem("mailverify-token", token);

      // Fetch profile
      await fetchMe();

      toast({
        title: "Welcome back!",
        description: "You have logged in successfully.",
      });

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast({
        title: "Network error",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // SIGNUP
  // ----------------------

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
        auth: false,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        toast({
          title: "Signup failed",
          description: data?.detail || "Unable to create account.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Account created",
        description: "Please log in to continue.",
      });

      router.push("/login");
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ----------------------
  // LOGOUT
  // ----------------------

  const logout = () => {
    localStorage.removeItem("mailverify-token");
    setUser(null);
    router.push("/login");
  };

  // ----------------------
  // PROVIDER RETURN
  // ----------------------

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
        initializing,
        fetchMe: () => fetchMe(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ----------------------
// HOOK
// ----------------------

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
