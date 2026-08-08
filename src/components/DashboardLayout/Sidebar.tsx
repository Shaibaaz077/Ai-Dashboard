"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Home,
  Sparkles,
  History,
  Bookmark,
  Settings,
  HelpCircle,
  PanelLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuLinks = [
  { href: "/dashboard/home", label: "Home", icon: Home },
  { href: "/dashboard/generate", label: "Generate", icon: Sparkles },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/saved", label: "Saved", icon: Bookmark },
];

const accountLinks = [
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
  { href: "/dashboard/help", label: "Help", icon: HelpCircle },
];

type SidebarProps = {
  onClose: () => void;
};

function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const linkClass = (href: string) =>
    `flex items-center gap-3 p-2 rounded-lg transition-colors ${
      collapsed ? "justify-center" : ""
    } ${
      pathname === href
        ? "bg-gray-200 text-black font-semibold"
        : "hover:bg-gray-100 text-sidebar-primary"
    }`;

  return (
    <section
      className={`${
        collapsed ? "w-16" : "w-64 md:w-72"
      } bg-background border-r border-sidebar-border h-full transition-all duration-300`}
    >
      {/* Header */}
      <div className="p-4 h-20 flex items-center justify-start gap-1 border-b border-sidebar-border cursor-default">
        {!collapsed && (
          <Image
            src="/Logo/siderbarIcon.png"
            alt="Falcon AI"
            width={40}
            height={30}
            priority
          />
        )}

        {!collapsed && (
          <span className="text-xl font-semibold text-sidebar-primary mt-2">
            Falcon AI
          </span>
        )}
        <div
          className={`hidden md:block :flex items-center justify-center p-1 hover:bg-gray-200 rounded-lg cursor-pointer mt-2 ${
            collapsed ? "mx-auto" : "ml-auto"
          }`}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <PanelLeft
            size={18}
            className={`text-sidebar-primary/70 transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="p-2">
        {!collapsed && (
          <p className="text-xs font-medium text-muted-foreground px-2 mt-2">
            MENU
          </p>
        )}
        <ul className="mt-2 space-y-1">
          {menuLinks.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={linkClass(href)} onClick={onClose}>
                <Icon size={20} className="shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {!collapsed && (
          <p className="text-xs font-medium text-muted-foreground mt-4 pt-2 px-2">
            ACCOUNT
          </p>
        )}
        <ul className="mt-2 space-y-1">
          {accountLinks.map(({ href, label, icon: Icon }) => (
            <li key={href}>
              <Link href={href} className={linkClass(href)} onClick={onClose}>
                <Icon size={20} className="shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{label}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default Sidebar;
