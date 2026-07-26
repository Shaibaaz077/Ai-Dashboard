"use client";

import { useState } from "react";
import PromptInput from "./Components/PromptInput";
import GenerateOutput from "./Components/GenerateOutput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasMessages = messages.length > 0;

  if (!hasMessages) {
    // Centered state — matches "Let's noodle" reference
    return (
      <section className="h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl md:text-4xl font-medium text-primary mb-6">
          Good Morning, Shaibaz
        </h1>
        <PromptInput
          setMessages={setMessages}
          setIsLoading={setIsLoading}
          hasMessages={hasMessages}
        />
      </section>
    );
  }

  // Chat state — output flows in page, input sticks to bottom
  return (
    <section className="flex flex-col">
      <GenerateOutput messages={messages} isLoading={isLoading} />

      <div className="fixed bottom-0 left-0 right-0 md:left-64 flex flex-col items-center justify-center pt-2 pb-4 shadow-xl">
        <PromptInput
          setMessages={setMessages}
          setIsLoading={setIsLoading}
          hasMessages={hasMessages}
        />
      </div>
    </section>
  );
}

export default Page;
