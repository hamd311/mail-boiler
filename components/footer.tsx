"use client";
import { Shield, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  const date = new Date();
  return (
    <footer className="border-border bg-background border-t">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col space-y-4">
            <Link href={"/"}>
              <button className="group flex items-center gap-2.5">
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
            </Link>
            <p className="text-muted-foreground max-w-xs text-sm">
              Fast, accurate, and secure email verification API. Validate emails with confidence.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("pricing");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Pricing
                </button>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  API Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Changelog
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-border mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-muted-foreground text-sm">
            © {date.getFullYear()} MailVerify. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
