"use client";

export type Message = {
  role: "user" | "assistant";
  content: string;
};