import Link from "next/link";
import { ArrowRight, FileSearch, ShieldCheck, WalletCards } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeading } from "@/components/shared/page-heading";

const foundations = [
  {
    title: "Spend visibility",
    description: "Track AI vendors, contracts, seats, and usage in one place.",
    icon: WalletCards,
  },
  {
    title: "Audit workflow",
    description: "Upload spend data, review findings, and prioritize actions.",
    icon: FileSearch,
  },
  {
    title: "Risk signals",
    description: "Flag unmanaged tools, duplicate vendors, and policy gaps.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-card flex flex-col gap-5 rounded-lg border p-6 shadow-sm sm:p-8">
          <PageHeading
            eyebrow="Production MVP foundation"
            title="AI Spend Audit"
            description="A clean Next.js 15 starting point for auditing AI vendors, spend, usage, and risk without dragging in product complexity too early."
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/dashboard" className={buttonVariants()}>
              Open dashboard
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/audits"
              className={buttonVariants({ variant: "outline" })}
            >
              View audits
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {foundations.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <item.icon className="text-muted-foreground size-5" />
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
