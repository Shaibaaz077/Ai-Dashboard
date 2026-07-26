"use client";

import { Message } from "./types";
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
  ChevronDown,
  ArrowUp,
  Mic,
  AudioWaveform,
  LucideIcon,
  SquarePen,
  CodeXml,
  GraduationCap,
  LayoutDashboard,
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

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setIsLoading: (val: boolean) => void;
  hasMessages: boolean;
};

export default function PromptInput({
  setMessages,
  setIsLoading,
  hasMessages,
}: Props) {
  const [prompt, setPrompt] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: prompt }]);
    setPrompt("");
    setIsLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.result },
    ]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center gap-3 sm:gap-4 p-1 sm:p-4 md:p-6 my-2 sm:my-0"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div ref={ref} className="relative w-full max-w-2xl">
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

        {/* Input card — two rows */}
        <div className="flex flex-col gap-1 bg-white border border-border/50 rounded-2xl p-3 sm:p-4 shadow-[0_1px_2px_rgba(20,20,20,0.04)]">
          {/* Row 1: textarea */}
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            suppressHydrationWarning
            rows={1}
            placeholder={
              hasMessages ? "Write a message..." : "How can I help you today?"
            }
            className="w-full resize-none bg-transparent outline-none text-[15px] sm:text-[16px] placeholder:text-chart-2/80 max-h-40"
          />

          {/* Row 2: controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setOpen((v) => !v)}
              suppressHydrationWarning
              className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors bg-accent text-primary hover:bg-chart-1/70"
            >
              <Plus size={18} strokeWidth={2.2} />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              <button className="flex items-center gap-1 text-sm text-foreground hover:bg-accent rounded-lg px-2 py-1.5 transition-colors">
                Sonnet 5<span className="text-muted-foreground">Medium</span>
                <ChevronDown size={14} className="text-muted-foreground" />
              </button>

              <button className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors text-muted-foreground hover:bg-accent">
                <Mic size={18} strokeWidth={2} />
              </button>

              {prompt.trim() ? (
                <button
                  onClick={handleGenerate}
                  className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors bg-primary text-white hover:bg-primary/80"
                >
                  <ArrowUp size={17} strokeWidth={2.4} />
                </button>
              ) : (
                <button className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors text-muted-foreground hover:bg-accent">
                  <AudioWaveform size={18} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Suggestion cards — hidden once conversation starts */}
      {!hasMessages && (
        <ul className="w-full max-w-2xl flex flex-row items-center justify-center gap-1 sm:gap-3 text-primary cursor-pointer flex-wrap">
          <li className="text-sm flex items-center justify-center border border-border rounded-lg px-3 py-2 gap-1 hover:bg-chart-1/30 transition-colors">
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
      )}
    </div>
  );
}
