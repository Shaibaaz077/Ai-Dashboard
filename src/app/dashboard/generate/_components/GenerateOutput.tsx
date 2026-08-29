"use client";

import React from "react";
import { Message } from "./types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RotateCcw } from "lucide-react";
import { useUser } from "@clerk/nextjs";

type Props = {
  messages: Message[];
  isLoading: boolean;
  onNewChat: () => void;
};

const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    const greetings = [
      "Good morning",
      "Rise and shine",
      "Morning",
      "Good morning, early bird",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (hour >= 12 && hour < 17) {
    const greetings = [
      "Good afternoon",
      "Hope your day is going well",
      "Good day",
      "Afternoon",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  if (hour >= 17 && hour < 21) {
    const greetings = [
      "Good evening",
      "Evening",
      "Hope you had a great day",
      "Welcome back",
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // 21:00 — 04:59
  const greetings = [
    "Burning the midnight oil",
    "Up late tonight",
    "Working late",
    "Night owl mode",
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
};

const getSubMessage = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Ready to create something amazing today?";
  if (hour >= 12 && hour < 17)
    return "What would you like to generate this afternoon?";
  if (hour >= 17 && hour < 21)
    return "Let's wrap up the day with something great!";
  return "Can't sleep? Let's create something!";
};

function GenerateOutput({ messages, isLoading, onNewChat }: Props) {
  const { user } = useUser();
  const hasMessages = messages.length > 0;

  const firstName = user?.firstName || user?.fullName?.split(" ")[0] || "there";

  const greeting = getGreeting();
  const subMessage = getSubMessage();

  return (
    <section
      className="w-full flex items-center justify-center p-1 sm:p-4 relative"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {hasMessages && (
        <button
          onClick={onNewChat}
          className="absolute top-0 right-2 sm:top-0 sm:right-4 flex items-center gap-1.5 text-xs text-muted-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-muted hover:text-primary hover:border-primary transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New chat
        </button>
      )}

      <div className="mt-12 sm:mt-4 md:mt-8 w-full max-w-2xl flex flex-col items-center justify-center gap-2 pb-32 sm:pb-36 pr-2 sm:pr-6">
        {!hasMessages && (
          <div className="text-center px-2 space-y-2">
            <h1 className="text-xl xs:text-2xl md:text-4xl font-medium text-primary">
              {greeting}, {firstName}
            </h1>
            <p className="text-sm text-muted-foreground">{subMessage}</p>
          </div>
        )}

        {/* Messages list */}
        <div className="w-full flex flex-col gap-2 sm:gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[100%] sm:max-w-[80%] px-3 sm:px-4 py-2 rounded-2xl break-words ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {/* User message */}
                {msg.role === "user" ? (
                  <p className="whitespace-pre-wrap text-[14px] sm:text-[16px]">
                    {msg.content}
                  </p>
                ) : (
                  // Assistant message — rendered as markdown
                  <div className="w-full prose prose-sm sm:prose-base dark:prose-invert text-[14px] sm:text-[16px] font-medium text-primary">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading dots */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[100%] sm:max-w-[80%] px-4 py-3 rounded-2xl bg-muted text-foreground">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* End messages list */}
      </div>
    </section>
  );
}

export default GenerateOutput;
