import type React from "react";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MailVerify - Email Verification Platform",
  description: "Fast, accurate, and secure email verification API",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/apple-icon.png",
    apple: "/apple-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/icon0.svg",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/web-app-manifest-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/web-app-manifest-512x512.png",
      },
    ],
  },
  // ------------------------------------
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.className} bg-background text-foreground`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
