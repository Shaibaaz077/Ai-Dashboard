"use client";

import { useState } from "react";
import { GeneratedItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { PieChart, Pie, Cell, Tooltip as PieTooltip } from "recharts";

type Props = {
  history: GeneratedItem[];
};

const getLast7Days = (history: GeneratedItem[]) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const result = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: days[date.getDay()],
      date: date.toDateString(),
      count: 0,
    };
  });
  history.forEach((item) => {
    const itemDate = new Date(item.createdAt).toDateString();
    const found = result.find((r) => r.date === itemDate);
    if (found) found.count++;
  });
  return result;
};

const getLast4Weeks = (history: GeneratedItem[]) => {
  const result = [
    { day: "Week 1", count: 0 },
    { day: "Week 2", count: 0 },
    { day: "Week 3", count: 0 },
    { day: "Week 4", count: 0 },
  ];
  history.forEach((item) => {
    const daysAgo = Math.floor(
      (Date.now() - new Date(item.createdAt).getTime()) / (1000 * 60 * 60 * 24),
    );
    if (daysAgo < 7) result[3].count++;
    else if (daysAgo < 14) result[2].count++;
    else if (daysAgo < 21) result[1].count++;
    else if (daysAgo < 28) result[0].count++;
  });
  return result;
};

const getContentTypes = (history: GeneratedItem[]) => {
  const colors: Record<string, string> = {
    blog_post: "#378ADD",
    email: "#1D9E75",
    social_caption: "#EF9F27",
    code_snippet: "#7F77DD",
    bio: "#E24B4A",
    product_description: "#888780",
  };
  const labels: Record<string, string> = {
    blog_post: "Blog posts",
    email: "Emails",
    social_caption: "Captions",
    code_snippet: "Code",
    bio: "Bio",
    product_description: "Product",
  };

  const counts: Record<string, number> = {};
  history.forEach((item) => {
    counts[item.contentType] = (counts[item.contentType] || 0) + 1;
  });

  const total = history.length || 1;

  return Object.entries(counts).map(([key, count]) => ({
    name: labels[key] || key,
    value: Math.round((count / total) * 100),
    color: colors[key] || "#888780",
  }));
};

// --- Custom Bar Tooltip ---

type TooltipProps = {
  active?: boolean;
  payload?: { value: number; name: string }[];
  label?: string;
};

const CustomBarTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: "600",
          color: "#0f172a",
          padding: "6px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ marginBottom: "2px", color: "#64748b" }}>{label}</p>
        <p>{payload[0].value} Generations</p>
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          fontSize: "12px",
          fontWeight: "600",
          color: "#0f172a",
          padding: "6px 12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ color: "#64748b", marginBottom: "2px" }}>
          {payload[0].name}
        </p>
        <p>{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};
// --- Custom Legend ---

const CustomLegend = ({
  data,
}: {
  data: { name: string; value: number; color: string }[];
}) => (
  <div className="flex flex-col gap-2 my-4">
    {data.map((item) => (
      <div
        key={item.name}
        className="flex items-center justify-between text-xs"
      >
        <div className="flex items-center gap-2">
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ background: item.color }}
          />
          <span className="text-muted-foreground">{item.name}</span>
        </div>
        <span className="font-medium text-foreground">{item.value}%</span>
      </div>
    ))}
  </div>
);

// --- Main component ---

export default function ActivityChart({ history }: Props) {
  const [range, setRange] = useState<"7d" | "30d">("7d");

  const chartData =
    range === "7d" ? getLast7Days(history) : getLast4Weeks(history);
  const contentTypes = getContentTypes(history);

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6 cursor-default">
      {/* Bar chart */}
      <Card className="lg:col-span-2">
        <CardHeader className="py-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-medium">
                Activity this week
              </CardTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Generations per day
              </p>
            </div>
            <div className="flex items-center gap-1 border rounded-lg p-1">
              <button
                onClick={() => setRange("7d")}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${
                  range === "7d"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                7d
              </button>
              <button
                onClick={() => setRange("30d")}
                className={`text-xs px-3 py-1 rounded-md transition-colors ${
                  range === "30d"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                30d
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* ✅ Empty state when no history */}
          {history.length === 0 ? (
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No data yet. Generate something first!
              </p>
            </div>
          ) : (
            <ResponsiveContainer
              width="100%"
              height={200}
              style={{ marginTop: "1rem" }}
            >
              <BarChart
                data={chartData}
                barSize={range === "7d" ? 32 : 48}
                margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={false}
                  content={<CustomBarTooltip />}
                  wrapperStyle={{ zIndex: 50 }}
                />
                <Bar
                  dataKey="count"
                  fill="hsl(var(--primary))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      {/* Donut chart */}
      <Card>
        <CardHeader className="py-4">
          <CardTitle className="text-sm font-medium">
            Content types used
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-0.5">This month</p>
        </CardHeader>

        <CardContent>
          {/* ✅ Empty state when no history */}
          {contentTypes.length === 0 ? (
            <div className="h-[140px] flex items-center justify-center">
              <p className="text-sm text-muted-foreground text-center">
                No data yet!
              </p>
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={contentTypes}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={62}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {contentTypes.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <PieTooltip
                    content={<CustomPieTooltip />}
                    wrapperStyle={{ zIndex: 50 }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <CustomLegend data={contentTypes} />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
