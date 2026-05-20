import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RiskLevel } from "@/types/audit";

type RiskScoreCardProps = {
  level: RiskLevel;
  score: number;
};

export function RiskScoreCard({ level, score }: RiskScoreCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Risk score</CardTitle>
        <Badge
          variant={
            level === "high" || level === "critical"
              ? "destructive"
              : "secondary"
          }
        >
          {level}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">{score}/100</p>
      </CardContent>
    </Card>
  );
}
