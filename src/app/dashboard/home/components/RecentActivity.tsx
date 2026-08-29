import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Mail, Image, Code, User, Tag } from "lucide-react";
import { GeneratedItem } from "@/lib/types";

// --- Types ---

type Stats = {
  totalGenerated: number;
  wordsWritten: number;
  savedOutputs: number;
  savedItems: GeneratedItem[];
};

type Props = {
  history: GeneratedItem[];
  stats: Stats;
};

// --- Config ---

const iconMap: Record<
  string,
  {
    icon: React.ElementType;
    bg: string;
    color: string;
  }
> = {
  blog_post: {
    icon: FileText,
    bg: "bg-blue-50",
    color: "text-blue-500",
  },
  email: {
    icon: Mail,
    bg: "bg-green-50",
    color: "text-green-500",
  },
  social_caption: {
    icon: Image,
    bg: "bg-orange-50",
    color: "text-orange-500",
  },
  code_snippet: {
    icon: Code,
    bg: "bg-purple-50",
    color: "text-purple-500",
  },
  bio: {
    icon: User,
    bg: "bg-pink-50",
    color: "text-pink-500",
  },
  product_description: {
    icon: Tag,
    bg: "bg-red-50",
    color: "text-red-500",
  },
};

// --- Helpers ---

const formatTime = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  return `${days} days ago`;
};

const formatLabel = (contentType: string) => {
  return contentType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
};

// --- Usage data builder ---

const getUsageData = (stats: Stats) => [
  {
    label: "Generations",
    used: stats.totalGenerated,
    max: 100,
    displayMax: "100",
    displayUsed: stats.totalGenerated.toString(),
    color: "bg-blue-500",
  },
  {
    label: "Words",
    used: stats.wordsWritten,
    max: 200000,
    displayMax: "200K",
    displayUsed:
      stats.wordsWritten > 1000
        ? `${(stats.wordsWritten / 1000).toFixed(1)}K`
        : stats.wordsWritten.toString(),
    color: "bg-green-500",
  },
  {
    label: "Saved items",
    used: stats.savedOutputs,
    max: 50,
    displayMax: "50",
    displayUsed: stats.savedOutputs.toString(),
    color: "bg-orange-400",
  },
];

// --- Main ---

export default function RecentActivity({ history, stats }: Props) {
  const recentItems = history.slice(0, 3);
  const usageData = getUsageData(stats);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Recent activity */}
      <Card>
        <CardHeader className="pb-2 pt-4 cursor-default">
          <CardTitle className="text-sm font-medium">Recent activity</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          {recentItems.length === 0 ? (
            // Empty state
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-muted-foreground">
                No activity yet. Start generating!
              </p>
            </div>
          ) : (
            recentItems.map((item, index) => {
              const config = iconMap[item.contentType] || iconMap["blog_post"];
              const Icon = config.icon;

              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-3 px-5 py-4 ${
                    index !== recentItems.length - 1
                      ? "border-b border-border"
                      : ""
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${config.bg}`}
                  >
                    <Icon className={`w-4 h-4 ${config.color}`} />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col min-w-0">
                    <p className="text-sm text-foreground leading-snug">
                      <span className="font-medium">
                        {formatLabel(item.contentType)}
                      </span>{" "}
                      <span className="text-muted-foreground line-clamp-1">
                        — {item.prompt}
                      </span>
                    </p>
                    <span className="text-xs text-muted-foreground mt-1">
                      {formatTime(item.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* Free plan usage */}
      <Card>
        <CardHeader className="pb-2 pt-4 cursor-default">
          <CardTitle className="text-sm font-medium">Free plan usage</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          {usageData.map((item) => {
            const percentage = Math.min(
              Math.round((item.used / item.max) * 100),
              100,
            );

            return (
              <div key={item.label} className="flex flex-col gap-1.5">
                {/* Label + values */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground">{item.label}</span>
                  <span className="text-sm text-muted-foreground">
                    {item.displayUsed} / {item.displayMax}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${item.color} ${
                      percentage >= 80 ? "bg-red-500" : item.color
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Warning when near limit */}
                {percentage >= 80 && (
                  <p className="text-xs text-red-500">⚠️ Almost at limit!</p>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
