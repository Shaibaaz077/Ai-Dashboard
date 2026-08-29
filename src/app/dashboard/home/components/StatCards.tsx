import { FileText, BookMarked, Flame, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { GeneratedItem } from "@/lib/types";

// --- Types ---

type Stats = {
  totalGenerated: number;
  wordsWritten: number;
  savedOutputs: number;
  savedItems: GeneratedItem[];
};

type Props = {
  stats: Stats;
};

// --- Main ---

export default function StatCards({ stats }: Props) {
  // ✅ Only ONE cards array — uses real stats data
  const cards = [
    {
      label: "Total generated",
      value: stats.totalGenerated.toLocaleString(),
      change: "All time",
      positive: true,
      icon: FileText,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      label: "Words written",
      value:
        stats.wordsWritten > 1000
          ? `${(stats.wordsWritten / 1000).toFixed(1)}K`
          : stats.wordsWritten.toString(),
      change: "All time",
      positive: true,
      icon: TrendingUp,
      iconBg: "bg-green-50",
      iconColor: "text-green-500",
    },
    {
      label: "Saved outputs",
      value: stats.savedOutputs.toString(),
      change: "Bookmarked",
      positive: true,
      icon: BookMarked,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      label: "Daily streak",
      value: "7 days",
      change: "Keep it up!",
      positive: true,
      icon: Flame,
      iconBg: "bg-red-50",
      iconColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-default">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.label}>
            <CardContent className="p-3 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground font-medium">
                  {card.label}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg}`}
                >
                  <Icon className={`w-4 h-4 ${card.iconColor}`} />
                </div>
              </div>
              <div className="text-3xl font-medium text-foreground mb-2">
                {card.value}
              </div>
              <div
                className={`text-xs font-medium mt-1 ${
                  card.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.change}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
