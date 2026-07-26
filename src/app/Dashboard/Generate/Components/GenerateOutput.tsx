"use client";

import React from "react";
import { Message } from "./types";

type Props = { messages: Message[]; isLoading: boolean };

function GenerateOutput({ messages, isLoading }: Props) {
  const hasMessages = messages.length > 0;

  return (
    <section className="w-full flex items-center justify-center p-4">
      <div className="mt-10 w-full max-w-2xl flex flex-col items-center justify-center gap-2">
        {!hasMessages && (
          <h1 className="text-2xl sm:text-2xl md:text-4xl font-medium text-primary">
            Good Morning, Shaibaz
          </h1>
        )}

        <div className="w-full flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] px-4 py-2 rounded-2xl bg-muted text-foreground">
                <p className="animate-pulse">Generating...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default GenerateOutput;
