// app/Dashboard/layout.tsx
import DashboardHeader from "../../components/DashboardLayout/DashboardHeader";
import Sidebar from "../../components/DashboardLayout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <DashboardHeader />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
