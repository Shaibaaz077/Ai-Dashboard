"use client";

import { useState } from "react";
import PromptInput from "./_components/PromptInput";
import GenerateOutput from "./_components/GenerateOutput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasMessages = messages.length > 0;

  if (!hasMessages) {
    return (
      <section className="h-full flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium text-primary mb-6">
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

  return (
    <section className="flex flex-col">
      <GenerateOutput messages={messages} isLoading={isLoading} />

      <div
        className="fixed bottom-0 left-0 right-0 md:left-64 flex flex-col bg-muted items-center justify-center sm:pb-4 mx-4"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
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
