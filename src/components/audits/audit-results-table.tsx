import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AuditFinding } from "@/types/audit";

type AuditResultsTableProps = {
  findings: AuditFinding[];
};

export function AuditResultsTable({ findings }: AuditResultsTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Finding</TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Risk</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {findings.map((finding) => (
            <TableRow key={finding.id}>
              <TableCell>{finding.title}</TableCell>
              <TableCell>{finding.vendorName}</TableCell>
              <TableCell>{finding.riskLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
