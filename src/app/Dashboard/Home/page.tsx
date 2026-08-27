import ActivityChart from "./components/ActivityChart";
import RecentActivity from "./components/RecentActivity";
import StatCard from "./components/StatCards";

export default function HomePage() {
  return (
    <section className="p-2 sm:p-6 sm:space-y-5">
      <StatCard />
      <ActivityChart />
      <RecentActivity />
    </section>
  );
}
