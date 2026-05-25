import React from "react";
import { ArrowUpRight } from "lucide-react";

function HowItWorks() {
  return (
    <>
      <hr className="border-stone-400/60" />
      <section className="h-full bg-stone-100 pb-20">
        <div className="flex items-center justify-center flex-col gap-2 mt-12 sm:mb-10 p-6">
          <h2 className="text-lg sm:text-3xl font-semibold text-primary">
            How It Works
          </h2>
          <p className="text-chart-2 text-center text-xs sm:text-sm">
            Three simple steps to generate amazing content.
          </p>
        </div>
        <div className="text-primary w-fit h-fit grid grid-cols-1 gap-6 mt-6 sm:grid-cols-3 sm:mt-10 px-28 sm:pb-14">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="h-10 w-10 border-stone-400/60 border-2 flex justify-center items-center rounded-full">
              <span className="text-lg text-primary">1</span>
            </div>
            <div className="sm:w-1/2 flex flex-col gap-2 text-center mb-4">
              <h5 className="text-primary text-lg font-medium">
                Type your prompt
              </h5>
              <p className="text-chart-2 text-sm">
                Describe what you want to generate in plain English no technical
                skills needed.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="h-10 w-10 border-stone-400/60 border-2 flex justify-center items-center rounded-full">
              <span className="text-lg text-primary">2</span>
            </div>
            <div className="sm:w-1/2 flex flex-col gap-2 text-center mb-4">
              <h5 className="text-primary text-lg font-medium">Pick a style</h5>
              <p className="text-chart-2 text-sm">
                Choose a tone formal, casual, creative or persuasive to match
                your need.
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="h-10 w-10 border-stone-400/60 border-2 flex justify-center items-center rounded-full">
              <span className="text-lg text-primary">3</span>
            </div>
            <div className="sm:w-1/2 flex flex-col gap-2 text-center mb-4">
              <h5 className="text-primary text-lg font-medium">Copy and use</h5>
              <p className="text-chart-2 text-sm">
                Copy your generated content in one click and use it anywhere you
                want.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr className="border-stone-400/60" />
      <section className="h-full bg-background py-20 flex flex-col items-center justify-center gap-4">
        <h1 className="text-primary text-lg font-semibold sm:text-3xl">
          Ready to generate your first content ?
        </h1>
        <p className="text-chart-2 text-center text-xs sm:text-sm">
          Free forever. No sign up required to try it out.
        </p>
        <button className="bg-background text-primary py-2 px-6 border rounded-md  hover:bg-primary-foreground transition-colors">
          Start generating free <ArrowUpRight className="inline size-4" />
        </button>
      </section>
    </>
  );
}

export default HowItWorks;
