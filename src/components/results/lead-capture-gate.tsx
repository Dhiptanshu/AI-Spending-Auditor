"use client";

import { useState } from "react";
import { Mail, Lock, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

type LeadCaptureGateProps = {
  shareId: string | null;
  children: React.ReactNode;
};

export function LeadCaptureGate({ shareId, children }: LeadCaptureGateProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState(""); // Honeypot field
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !shareId) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/lead/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, shareId, website }),
      });

      if (!res.ok) {
        throw new Error("Failed to capture lead");
      }

      setIsUnlocked(true);
      toast.success("Report unlocked!", {
        description: "We've also emailed you a permanent link to this report.",
      });
    } catch {
      toast.error("Something went wrong.", {
        description: "Please try again in a moment.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative">
      {/* 
        If unlocked, show children normally. 
        If locked, blur and disable pointer events.
      */}
      <div
        className={
          isUnlocked
            ? "transition-all duration-700 ease-in-out"
            : "pointer-events-none select-none blur-sm opacity-40 transition-all duration-700 ease-in-out"
        }
      >
        {children}
      </div>

      {!isUnlocked && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-12 sm:pt-24">
          <div className="bg-background/95 w-full max-w-md rounded-xl border p-6 shadow-xl backdrop-blur-sm sm:p-8">
            <div className="mb-6 flex flex-col items-center text-center">
              <div className="bg-primary/10 text-primary mb-4 rounded-full p-3">
                <Lock className="size-6" />
              </div>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Unlock your full report
              </h2>
              <p className="text-muted-foreground mt-2 text-sm">
                Enter your work email to view your itemized recommendations and get a shareable link for your team.
              </p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-3">
              <div className="hidden" aria-hidden="true">
                <Input
                  type="text"
                  name="company_website"
                  tabIndex={-1}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <Input
                type="email"
                required
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting || !shareId}
                className="h-11"
              />
              <Button type="submit" disabled={isSubmitting || !shareId} className="h-11 w-full">
                {isSubmitting ? (
                  <Loader2 className="mr-2 size-4 animate-spin" />
                ) : (
                  <Mail className="mr-2 size-4" />
                )}
                {shareId ? "Unlock My Savings" : "Saving audit..."}
              </Button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="size-3 text-green-500" />
              <span>No spam, ever. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
