"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "resume",
    },
    {
      text: "with",
    },
    {
      text: "Degrees.",
      className: "text-purple-500 dark:text-purple-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[12rem] md:h-[20rem] text-center">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Create a standout resume that highlights your skills and attracts potential employers.
      </p>
      <TypewriterEffectSmooth words={words} />

    </div>
  );
}
