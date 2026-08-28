"use client";

import { useState } from "react";
import DashboardHeader from "../../components/DashboardLayout/DashboardHeader";
import Sidebar from "../../components/DashboardLayout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-primary-foreground z-60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div
        className={`fixed top-0 left-0 z-70 h-full transition-transform duration-300 md:static md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto">
        <DashboardHeader
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 p-2 sm:p-6 bg-muted">{children}</main>
      </div>
    </div>
  );
}
