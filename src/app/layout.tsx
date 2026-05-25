import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Frugal | AI Spending Audit",
    template: "%s | Frugal AI Spending Audit",
  },
  description: "Identify redundant tools, negotiate better enterprise tiers, and instantly calculate your team's total AI savings.",
  openGraph: {
    title: "Frugal | Free AI Spending Audit",
    description: "Instantly calculate your team's wasted AI spend. Find redundancies across ChatGPT, Claude, Cursor, and 50+ other tools.",
    type: "website",
    siteName: "Frugal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Frugal | Free AI Spending Audit",
    description: "Instantly calculate your team's wasted AI spend and optimize your SaaS stack.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
