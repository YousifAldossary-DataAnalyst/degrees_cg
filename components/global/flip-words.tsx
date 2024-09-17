import React from "react";
import { FlipWords } from "../ui/flip-words";

export function FlipWordsDemo() {
  const words = ["Instagram", "Youtube", "Articles", "Podcast", "Canvas"];

  return (
    <div className="flex justify-center items-center p-6">
      <div className="text-4xl mx-auto font-normal ">
        An AI powered
        <FlipWords words={words} className=""/>
        creator
      </div>
    </div>
  );
}
