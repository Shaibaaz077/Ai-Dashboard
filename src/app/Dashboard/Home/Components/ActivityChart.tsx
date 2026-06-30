"use client";

import { useState } from "react";
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

// --- Data ---

const weeklyData = [
  { day: "Mon", count: 4 },
  { day: "Tue", count: 9 },
  { day: "Wed", count: 6 },
  { day: "Thu", count: 12 },
  { day: "Fri", count: 8 },
  { day: "Sat", count: 14 },
  { day: "Sun", count: 16 },
];

const monthlyData = [
  { day: "Week 1", count: 28 },
  { day: "Week 2", count: 43 },
  { day: "Week 3", count: 35 },
  { day: "Week 4", count: 52 },
];

const contentTypes = [
  { name: "Blog posts", value: 38, color: "#378ADD" },
  { name: "Emails", value: 28, color: "#1D9E75" },
  { name: "Captions", value: 20, color: "#EF9F27" },
  { name: "Other", value: 14, color: "#7F77DD" },
];

// --- Custom Bar Tooltip ---

const CustomBarTooltip = ({ active, payload, label }: any) => {
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

// --- Custom Pie Tooltip ---

const CustomPieTooltip = ({ active, payload }: any) => {
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

// --- Custom legend for donut chart ---

const CustomLegend = () => (
  <div className="flex flex-col gap-2 my-4">
    {contentTypes.map((item) => (
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

export default function ActivityChart() {
  const [range, setRange] = useState<"7d" | "30d">("7d");

  const chartData = range === "7d" ? weeklyData : monthlyData;

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

            {/* Toggle */}
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
          <CustomLegend />
        </CardContent>
      </Card>
    </div>
  );
}
