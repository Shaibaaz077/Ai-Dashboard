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
      className="w-full flex items-end justify-center p-1 sm:p-4 md:p-6 my-2 sm:my-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div ref={ref} className="relative w-full max-w-xl">
        {/* Dropdown menu */}
        {open && (
          <div className="absolute bottom-full left-0 mb-2 w-[calc(100vw-1.5rem)] xs:w-72 sm:w-72 max-w-72 bg-white border border-[#EAE7E0] rounded-2xl shadow-[0_8px_24px_rgba(20,20,20,0.08)] py-2 overflow-hidden max-h-[60vh] overflow-y-auto">
            {menuItems.map((item, i) =>
              item.divider ? (
                <div key={i} className="h-px bg-[#F1EFEA] my-1.5 mx-2" />
              ) : (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 text-[13px] sm:text-[14px] text-[#2A2D34] hover:bg-[#F7F6F3] active:bg-[#F1EFEA] transition-colors"
                >
                  <item.icon
                    size={16}
                    strokeWidth={1.8}
                    className="text-[#6B6F76] shrink-0"
                  />
                  <span className="flex-1 text-left truncate">
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <span
                      className="hidden sm:inline text-[12px] text-[#B8B6B0] shrink-0"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {item.shortcut}
                    </span>
                  )}
                  {item.chevron && (
                    <ChevronRight
                      size={14}
                      className="text-[#B8B6B0] shrink-0"
                    />
                  )}
                  {item.checked && (
                    <Check
                      size={15}
                      className="text-[#5B4EFF] shrink-0"
                      strokeWidth={2.5}
                    />
                  )}
                </button>
              ),
            )}
          </div>
        )}

        {/* Input bar */}
        <div className="flex items-center gap-2 sm:gap-3 bg-white border border-border/50 rounded-2xl p-2.5 sm:p-3 shadow-[0_1px_2px_rgba(20,20,20,0.04)]">
          <button
            onClick={() => setOpen((v) => !v)}
            suppressHydrationWarning
            className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors bg-accent text-primary hover:bg-chart-1/70"
          >
            <Plus size={17} strokeWidth={2.2} className="sm:hidden" />
            <Plus size={18} strokeWidth={2.2} className="hidden sm:block" />
          </button>

          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            suppressHydrationWarning
            placeholder="Ask Anything..."
            className="flex-1 min-w-0 bg-transparent outline-none text-[15px] sm:text-[16px] placeholder:text-chart-2/80"
          />

          <button
            disabled={!prompt.trim()}
            className={`w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
              prompt.trim()
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-accent text-primary hover:bg-chart-1/70"
            }`}
          >
            <ArrowUp size={16} strokeWidth={2.4} className="sm:hidden" />
            <ArrowUp size={17} strokeWidth={2.4} className="hidden sm:block" />
          </button>
        </div>
      </div>
    </div>
  );
}
