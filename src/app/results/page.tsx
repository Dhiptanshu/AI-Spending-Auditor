import { ResultsDashboard } from "@/components/results/results-dashboard";

export const metadata = {
  title: "Audit Results | AI Spend Auditor",
  description: "Review your optimized AI spend and savings recommendations.",
};

export default function ResultsPage() {
  return (
    <div className="container py-10 md:py-12">
      <ResultsDashboard />
    </div>
  );
}
