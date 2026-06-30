import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Mail, Image } from "lucide-react";

// --- Data ---

const recentActivity = [
  {
    icon: FileText,
    iconBg: "bg-green-50",
    iconColor: "text-green-500",
    label: "Blog post",
    desc: "generated about morning routines",
    time: "5 min ago",
  },
  {
    icon: Mail,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    label: "Email",
    desc: "written for client outreach",
    time: "1 hr ago",
  },
  {
    icon: Image,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    label: "Caption",
    desc: "created for Instagram post",
    time: "3 hrs ago",
  },
];

const usageData = [
  {
    label: "Generations",
    used: 48,
    max: 100,
    displayUsed: "48",
    displayMax: "100",
    color: "bg-blue-500",
  },
  {
    label: "Words",
    used: 84000,
    max: 200000,
    displayUsed: "84K",
    displayMax: "200K",
    color: "bg-green-500",
  },
  {
    label: "Saved items",
    used: 36,
    max: 50,
    displayUsed: "36",
    displayMax: "50",
    color: "bg-orange-400",
  },
];

// --- Main component ---

export default function RecentActivity() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-4 cursor-default">
      {/* Recent activity */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium pt-4 pl-2">
            Recent activity
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 pb-2">
          {recentActivity.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-start gap-3 px-5 py-4 ${
                  index !== recentActivity.length - 1
                    ? "border-b border-border"
                    : ""
                }`}
              >
                {/* Icon circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${item.iconBg}`}
                >
                  <Icon className={`w-4 h-4 ${item.iconColor}`} />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <p className="text-sm text-foreground leading-snug">
                    <span className="font-medium">{item.label}</span>{" "}
                    {item.desc}
                  </p>
                  <span className="text-xs text-muted-foreground mt-1">
                    {item.time}
                  </span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Free plan usage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium pt-4 pl-2">
            Free plan usage
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5 mx-2">
          {usageData.map((item) => {
            const percentage = Math.round((item.used / item.max) * 100);
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
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
