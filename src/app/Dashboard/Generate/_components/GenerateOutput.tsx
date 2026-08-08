// GenerateOutput.tsx
"use client";

import React from "react";
import { Message } from "./types";

type Props = { messages: Message[]; isLoading: boolean };

function GenerateOutput({ messages, isLoading }: Props) {
  const hasMessages = messages.length > 0;

  return (
    <section className="w-full flex items-center justify-center p-2 sm:p-4">
      <div className="mt-6 sm:mt-8 md:mt-10 w-full max-w-2xl flex flex-col items-center justify-center gap-2 pb-32 sm:pb-36 pr-6">
        {!hasMessages && (
          <h1 className="text-xl xs:text-2xl md:text-4xl font-medium text-primary text-center px-2">
            Good Morning, Shaibaz
          </h1>
        )}

        <div className="w-full flex flex-col gap-2 sm:gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 rounded-2xl break-words ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap text-[14px] sm:text-[15px]">
                  {msg.content}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2 rounded-2xl bg-muted text-foreground">
                <p className="animate-pulse text-[14px] sm:text-[15px]">
                  Generating...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GenerateOutput;
