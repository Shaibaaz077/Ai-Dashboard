"use client";

import { useState, useRef, useEffect } from "react";
import {
  Plus,
  Paperclip,
  Camera,
  FolderPlus,
  LayoutGrid,
  Plug,
  Puzzle,
  Globe,
  Check,
  ChevronRight,
  ArrowUp,
  LucideIcon,
} from "lucide-react";

type MenuItem =
  | { divider: true }
  | {
      divider?: false;
      icon: LucideIcon;
      label: string;
      shortcut?: string;
      chevron?: boolean;
      checked?: boolean;
    };

const menuItems: MenuItem[] = [
  { icon: Paperclip, label: "Add files or photos", shortcut: "Ctrl+U" },
  { icon: Camera, label: "Take a screenshot" },
  { icon: FolderPlus, label: "Add to project", chevron: true },
  { divider: true },
  { icon: LayoutGrid, label: "Skills", chevron: true },
  { icon: Puzzle, label: "Add connector", chevron: true },
  { icon: Plug, label: "Add plugins..." },
  { divider: true },
  { icon: Globe, label: "Web search", checked: true },
];

export default function PromptInput() {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      className="w-full flex items-end justify-center p-4 sm:p-10"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div ref={ref} className="relative w-full max-w-xl">
        {/* Dropdown menu */}
        {open && (
          <div className="absolute bottom-full left-0 mb-2 w-72 bg-white border border-[#EAE7E0] rounded-2xl shadow-[0_8px_24px_rgba(20,20,20,0.08)] py-2 overflow-hidden">
            {menuItems.map((item, i) =>
              item.divider ? (
                <div key={i} className="h-px bg-[#F1EFEA] my-1.5 mx-2" />
              ) : (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[14px] text-[#2A2D34] hover:bg-[#F7F6F3] transition-colors"
                >
                  <item.icon
                    size={16}
                    strokeWidth={1.8}
                    className="text-[#6B6F76]"
                  />
                  <span className="flex-1 text-left">{item.label}</span>
                  {item.shortcut && (
                    <span
                      className="text-[12px] text-[#B8B6B0]"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.shortcut}
                    </span>
                  )}
                  {item.chevron && (
                    <ChevronRight size={14} className="text-[#B8B6B0]" />
                  )}
                  {item.checked && (
                    <Check
                      size={15}
                      className="text-[#5B4EFF]"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              ),
            )}
          </div>
        )}

        {/* Input bar */}
        <div className="flex items-center gap-3 bg-white border border-border/50 rounded-2xl p-3 pl-3 shadow-[0_1px_2px_rgba(20,20,20,0.04)]">
          <button
            onClick={() => setOpen((v) => !v)}
            suppressHydrationWarning
            className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors bg-accent text-primary hover:bg-chart-1/70"
          >
            <Plus size={18} strokeWidth={2.2} />
          </button>

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            suppressHydrationWarning
            placeholder="Ask Anything..."
            className="flex-1 bg-transparent outline-none text-[16px] placeholder:text-chart-2/80"
          />

          <button
            disabled={!prompt.trim()}
            className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
              prompt.trim()
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-accent text-primary hover:bg-chart-1/70"
            }`}
          >
            <ArrowUp size={17} strokeWidth={2.4} />
          </button>
        </div>
      </div>
    </div>
  );
}
