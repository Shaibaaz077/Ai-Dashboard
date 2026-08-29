"use client";

import React, { useState } from "react";
import { useHistory } from "@/hooks/useHistory";
import ReactMarkdown from "react-markdown";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Mail,
  Image,
  Code,
  User,
  Tag,
  Bookmark,
  BookmarkCheck,
  Trash2,
  ChevronDown,
  ChevronUp,
  Clock,
} from "lucide-react";

// --- Config ---

const contentConfig: Record<
  string,
  {
    label: string;
    icon: React.ElementType;
    bg: string;
    color: string;
    badgeBg: string;
    badgeText: string;
  }
> = {
  blog_post: {
    label: "Blog post",
    icon: FileText,
    bg: "bg-blue-50",
    color: "text-blue-500",
    badgeBg: "bg-blue-50",
    badgeText: "text-blue-600",
  },
  email: {
    label: "Email",
    icon: Mail,
    bg: "bg-green-50",
    color: "text-green-500",
    badgeBg: "bg-green-50",
    badgeText: "text-green-600",
  },
  social_caption: {
    label: "Caption",
    icon: Image,
    bg: "bg-orange-50",
    color: "text-orange-500",
    badgeBg: "bg-orange-50",
    badgeText: "text-orange-600",
  },
  code_snippet: {
    label: "Code",
    icon: Code,
    bg: "bg-purple-50",
    color: "text-purple-500",
    badgeBg: "bg-purple-50",
    badgeText: "text-purple-600",
  },
  bio: {
    label: "Bio",
    icon: User,
    bg: "bg-pink-50",
    color: "text-pink-500",
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-600",
  },
  product_description: {
    label: "Product",
    icon: Tag,
    bg: "bg-red-50",
    color: "text-red-500",
    badgeBg: "bg-red-50",
    badgeText: "text-red-600",
  },
};

// --- Helpers ---

const formatTime = (dateStr: string) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins} min ago`;
  if (hours < 24) return `${hours} hr ago`;
  return `${days} days ago`;
};

const getTitleFromPrompt = (prompt: string) => {
  // Capitalize and truncate prompt as title
  const cleaned = prompt.trim();
  return cleaned.length > 60 ? cleaned.slice(0, 60) + "..." : cleaned;
};

// --- Main ---

export default function HistoryPage() {
  const { history, toggleSave, deleteItem } = useHistory();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          {history.length > 0
            ? `${history.length} generation${history.length > 1 ? "s" : ""} found`
            : "Your past generations will appear here"}
        </p>
      </div>
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 gap-3">
          <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center">
            <Clock className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No history yet</p>
          <p className="text-xs text-muted-foreground">
            Go to the Generate tab to create your first content!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {history.map((item) => {
            const config =
              contentConfig[item.contentType] || contentConfig["blog_post"];
            const Icon = config.icon;
            const isExpanded = expandedId === item.id;

            return (
              <Card
                key={item.id}
                className="flex flex-col border border-border hover:border-border/80 transition-colors"
              >
                <CardHeader className="pb-2 pt-4 px-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg}`}
                      >
                        <Icon className={`w-4 h-4 ${config.color}`} />
                      </div>
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.badgeBg} ${config.badgeText}`}
                      >
                        {config.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleSave(item.id)}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-muted transition-colors"
                        title={item.saved ? "Unsave" : "Save"}
                      >
                        {item.saved ? (
                          <BookmarkCheck className="w-4 h-4 text-primary" />
                        ) : (
                          <Bookmark className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="w-7 h-7 rounded-md flex items-center justify-center hover:bg-red-50 transition-colors group"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-sm font-medium text-foreground mt-3 leading-snug">
                    {getTitleFromPrompt(item.prompt)}
                  </h3>

                  {/* Timestamp */}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(item.createdAt)}
                  </p>
                </CardHeader>

                <CardContent className="px-4 pb-4 flex flex-col gap-3 flex-1">
                  <div
                    className={`text-sm text-muted-foreground leading-relaxed overflow-hidden transition-all ${
                      isExpanded ? "" : "line-clamp-3"
                    }`}
                  >
                    <ReactMarkdown>{item.output}</ReactMarkdown>
                  </div>

                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-600 transition-colors self-start"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3.5 h-3.5" />
                        View less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3.5 h-3.5" />
                        View more
                      </>
                    )}
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
