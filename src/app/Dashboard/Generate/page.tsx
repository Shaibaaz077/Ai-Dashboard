import React from "react";
import PromptInput from "./Components/PromptInput";
import GenerateOutput from "./Components/GenerateOutput";
import RecentPrompt from "./Components/RecentPrompt";

function Page() {
  return (
    <section>
      <GenerateOutput />
      <PromptInput />
      <RecentPrompt />
    </section>
  );
}

export default Page;
