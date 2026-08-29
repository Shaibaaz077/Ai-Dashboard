"use client";

import { useState, useEffect, useRef } from "react";
import { useHistory } from "@/hooks/useHistory";
import PromptInput from "./_components/PromptInput";
import GenerateOutput from "./_components/GenerateOutput";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { saveGeneration } = useHistory();
  const hasMessages = messages.length > 0;
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    setMessages([]);
    setIsLoading(false);
  };

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
          saveGeneration={saveGeneration}
        />
      </section>
    );
  }

  return (
    <section className="flex flex-col">
      <GenerateOutput
        messages={messages}
        isLoading={isLoading}
        onNewChat={handleNewChat}
      />

      <div
        className="fixed bottom-0 left-0 right-0 md:left-64 flex flex-col bg-muted items-center justify-center sm:pb-4 mx-2"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <PromptInput
          setMessages={setMessages}
          setIsLoading={setIsLoading}
          hasMessages={hasMessages}
          saveGeneration={saveGeneration}
        />
      </div>
    </section>
  );
}

export default Page;
