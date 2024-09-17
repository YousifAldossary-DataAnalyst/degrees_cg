"use client";
import React from "react";
import Image from "next/image";
import { StickyScroll } from "../ui/sticky-scroll";

const content = [
  {
    title: "Note Taking",
    description:
      "A note-taking features that optimizes processes, enhances productivity, streamlines operations, boosts efficiency, elevates skillsets, accelerates growth, and refines strategies for improved performance.",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/WhiteBoard-Cards.png"
          width={300}
          height={300}
          className="h-fit w-fit object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Brain Storming",
    description:
      "Elevate your brainstorming sessions with designed features for dynamic idea mapping, streamlined task management, and efficient workflow optimization.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <Image
          src="/images/BrainStorm.png"
          width={300}
          height={300}
          className="h-fit w-fit object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Have Fun!",
    description:
      "Explore the full range of features this app offers, using it in any way that best suits your needs, and enjoy the process while having fun. Whether for work or leisure, this app adapts to your style and enhances your experience.",
    content: (
        <div className="h-full w-full  flex items-center justify-center text-white">
        <Image
          src="/images/drawing.png"
          width={300}
          height={300}
          className="h-fit w-fit object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="p-10 bg-primary rounded-md">
      <StickyScroll content={content} />
    </div>
  );
}
