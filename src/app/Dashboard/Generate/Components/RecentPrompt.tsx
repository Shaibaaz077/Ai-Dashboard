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
      <ul className="w-full flex flex-row items-center justify-center gap-2 sm:gap-8 text-primary p-4">
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1">
          {" "}
          <SquarePen size={18} className="text-muted-foreground" />
          Write
        </li>
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1">
          <GraduationCap size={18} className="text-muted-foreground" />
          Learn
        </li>
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1">
          <CodeXml size={18} className="text-muted-foreground" />
          Code
        </li>
        <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1">
          <LayoutDashboard size={18} className="text-muted-foreground" />
          Design
        </li>
      </ul>
    </section>
  );
}

export default RecentPrompt;
