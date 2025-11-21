"use client";
import React, { useState } from "react";
import { Shield, LogOut, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/contexts/AuthContext";
import { motion, AnimatePresence } from "motion/react";
import { useRouter, usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, initializing } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = (path: string) => {
    router.push(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="border-border/40 bg-background/60 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2.5"
          >
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#10b981] to-[#3b82f6] opacity-50 blur-md transition-opacity group-hover:opacity-75" />
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#10b981] to-[#3b82f6] shadow-md">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] bg-clip-text text-xl font-bold text-transparent">
              MailVerify
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            <NavLink active={pathname === "/"} onClick={() => navigate("/")}>
              Home
            </NavLink>
            <NavLink
              onClick={() => {
                const el = document.getElementById("pricing");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Pricing
            </NavLink>
            {user && (
              <NavLink
                active={pathname === "/dashboard"}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </NavLink>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {user && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="hidden items-center gap-2 rounded-xl border border-[#10b981]/20 bg-gradient-to-r from-[#10b981]/10 via-[#06b6d4]/10 to-[#3b82f6]/10 px-3.5 py-2 sm:flex"
              >
                <Sparkles className="h-4 w-4 text-[#10b981]" />
                <span className="text-muted-foreground text-sm">Credits:</span>
                <span className="bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-sm font-semibold text-transparent">
                  {user.subscription.remaining_credits} /{" "}
                  {user.subscription.total_credits}
                </span>
              </motion.div>
            )}

            <ThemeToggle />

            {initializing ? null : user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 hidden gap-2 rounded-xl sm:flex"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                {!initializing && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate("/login")}
                      className="rounded-xl"
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => navigate("/signup")}
                      className="rounded-xl bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-[#10b981]/25"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-border/40 overflow-hidden border-t md:hidden"
            >
              <div className="space-y-2 py-4">
                <MobileNavLink
                  active={pathname === "/"}
                  onClick={() => navigate("/")}
                >
                  Home
                </MobileNavLink>
                <MobileNavLink
                  onClick={() => {
                    const el = document.getElementById("pricing");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    setMobileMenuOpen(false);
                  }}
                >
                  Pricing
                </MobileNavLink>
                {user && (
                  <MobileNavLink
                    active={pathname === "/dashboard"}
                    onClick={() => navigate("/dashboard")}
                  >
                    Dashboard
                  </MobileNavLink>
                )}

                <div className="border-border/40 space-y-2 border-t pt-4">
                  {initializing ? null : user ? (
                    <>
                      <div className="flex items-center gap-2 rounded-lg border border-[#10b981]/20 bg-gradient-to-r from-[#10b981]/10 to-[#06b6d4]/10 px-3 py-2">
                        <Sparkles className="h-4 w-4 text-[#10b981]" />
                        <span className="text-muted-foreground text-sm">
                          Credits:
                        </span>
                        <span className="bg-gradient-to-r from-[#10b981] to-[#06b6d4] bg-clip-text text-sm text-transparent">
                          {user.subscription.remaining_credits}/
                          {user.subscription.total_credits}
                        </span>
                      </div>
                      <Button
                        variant="outline"
                        className="w-full gap-2 rounded-xl"
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl"
                        onClick={() => navigate("/login")}
                      >
                        Login
                      </Button>
                      <Button
                        className="w-full rounded-xl bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6] text-white hover:opacity-90"
                        onClick={() => navigate("/signup")}
                      >
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

/* ========== Sub Components ========== */

function NavLink({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-xl px-4 py-2 transition-all ${
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-indicator"
          className="absolute right-2 bottom-0 left-2 h-0.5 rounded-full bg-gradient-to-r from-[#10b981] via-[#06b6d4] to-[#3b82f6]"
        />
      )}
    </button>
  );
}

function MobileNavLink({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-xl px-3 py-2 text-left transition-all ${
        active
          ? "text-foreground border border-[#10b981]/20 bg-gradient-to-r from-[#10b981]/10 to-[#06b6d4]/10"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
      }`}
    >
      {children}
    </button>
  );
}
