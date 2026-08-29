"use client";
import ActivityChart from "./components/ActivityChart";
import RecentActivity from "./components/RecentActivity";
import StatCard from "./components/StatCards";
import { useHistory } from "@/hooks/useHistory";

export default function HomePage() {
  const { history, stats } = useHistory();

  return (
    <section className="p-2 sm:p-6 sm:space-y-5">
      <StatCard stats={stats} />
      <ActivityChart history={history} />
      <RecentActivity history={history} stats={stats} />
    </section>
  );
}
