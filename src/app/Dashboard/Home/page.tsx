import ActivityChart from "./Components/ActivityChart";
import StatCard from "./Components/StatCards";

export default function HomePage() {
  return (
    <section className="p-2 sm:p-6 sm:space-y-5">
      <StatCard />
      <ActivityChart />
    </section>
  );
}
