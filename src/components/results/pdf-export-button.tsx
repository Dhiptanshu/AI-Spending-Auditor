"use client";

import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AuditEngineResult } from "@/types/engine";
import { PrintableAuditReport } from "./printable-audit-report";

export function PdfExportButton({ report }: { report: AuditEngineResult }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: () => componentRef.current,
    documentTitle: "AI-Spend-Audit-Report",
    onBeforeGetContent: async () => {
      setIsGenerating(true);
      await new Promise((resolve) => setTimeout(resolve, 300));
    },
    onAfterPrint: () => {
      setIsGenerating(false);
    },
    onPrintError: () => {
      setIsGenerating(false);
    },
  });

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => handlePrint()} 
        disabled={isGenerating}
      >
        {isGenerating ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Download className="mr-2 size-4" />
        )}
        {isGenerating ? "Exporting..." : "Export PDF"}
      </Button>

      {/* Hidden container exclusively used for generating the PDF canvas */}
      <div className="hidden">
        <div ref={componentRef} className="print:block p-8">
          <PrintableAuditReport report={report} />
        </div>
      </div>
    </>
  );
}
