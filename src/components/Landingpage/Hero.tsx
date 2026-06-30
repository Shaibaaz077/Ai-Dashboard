"use client";

import React, { useCallback } from "react";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();

  const handleStart = useCallback(() => {
    router.push("/sign-in");
  }, [router]);

  const handleworks = () => {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[420px] bg-background flex items-center justify-center flex-col gap-5 py-20 px-6 sm:px-12 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* Badge */}
      <div className="relative text-[11px] font-medium uppercase tracking-widest px-4 py-1.5 rounded-full border text-muted-foreground backdrop:blur-sm bg-background">
        ✦ Falcon AI — Content Generator
      </div>

      <h1 className="relative text-3xl sm:text-5xl font-bold text-foreground text-center leading-tight tracking-tight">
        Generate any content with AI
        <br /> <span className="text-chart-3">in seconds</span>
      </h1>

      <p className="relative text-center max-w-md text-sm sm:text-base leading-relaxed text-muted-foreground">
        Type your prompt, pick your style, and let FalconAI write blog posts,
        emails, captions, and more for you instantly.
      </p>

      <div className="relative flex gap-3 mt-2 flex-wrap justify-center">
        <button
          onClick={handleStart}
          className="text-sm font-medium px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Start generating free <ArrowUpRight className="inline size-4" />
        </button>
        <button
          onClick={handleworks}
          className="text-sm font-medium px-5 py-2.5 rounded-lg border text-muted-foreground hover:text-foreground hover:border-border transition-colors backdrop:blur-sm bg-background"
        >
          See how it works
        </button>
      </div>
    </section>
  );
}

export default Hero;
