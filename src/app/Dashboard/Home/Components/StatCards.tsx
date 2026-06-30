import { FileText, BookMarked, Flame, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    label: "Total generated",
    value: "1,248",
    change: "↑ 18% this week",
    positive: true,
    icon: FileText,
    iconBg: "bg-accent",
    iconColor: "text-primary",
  },
  {
    label: "Words written",
    value: "84.3K",
    change: "↑ 32% this week",
    positive: true,
    icon: TrendingUp,
    iconBg: "bg-accent",
    iconColor: "text-primary",
  },
  {
    label: "Saved outputs",
    value: "36",
    change: "↑ 12% this week",
    positive: true,
    icon: BookMarked,
    iconBg: "bg-accent",
    iconColor: "text-primary",
  },
  {
    label: "Daily streak",
    value: "7 days",
    change: "Keep it up!",
    positive: true,
    icon: Flame,
    iconBg: "bg-accent",
    iconColor: "text-primary",
  },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 cursor-default">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.label}>
            <CardContent className="p-3 md:p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm md:text-md text-chart-3 font-medium">
                  {stat.label}
                </span>
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.iconBg}`}
                >
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="text-3xl font-medium text-foreground mb-2">
                {stat.value}
              </div>
              <div
                className={`text-xs font-medium mt-1 ${stat.positive ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
