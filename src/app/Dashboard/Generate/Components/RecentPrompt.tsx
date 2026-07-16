import React from "react";
import {
  SquarePen,
  CodeXml,
  GraduationCap,
  LayoutDashboard,
} from "lucide-react";

function RecentPrompt() {
  return (
    <section className="w-full flex items-center justify-center">
      <ul className="w-full flex flex-row items-center justify-center gap-1 sm:gap-8 text-primary p-4 cursor-pointer">
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1  hover:bg-chart-1/30 transition-colors">
          {" "}
          <SquarePen size={18} className="text-muted-foreground" />
          Write
        </li>
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1 hover:bg-chart-1/30 transition-colors">
          <GraduationCap size={18} className="text-muted-foreground" />
          Learn
        </li>
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1 hover:bg-chart-1/30 transition-colors">
          <CodeXml size={18} className="text-muted-foreground" />
          Code
        </li>
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1 hover:bg-chart-1/30 transition-colors">
          <LayoutDashboard size={18} className="text-muted-foreground" />
          Design
        </li>
      </ul>
    </section>
  );
}

export default RecentPrompt;
