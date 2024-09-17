"use client";

import Image from "next/image";
import React from "react";

import Link from "next/link";
import { CardBody, CardContainer, CardItem } from "./3d-card";

export function ThreeDCardDemo() {
  return (
    <CardContainer className="inter-var w-full h-full">
      <CardBody className="bg-transparent relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl p-2">
        <CardItem translateZ="100" className="w-full">
        <Image
            src="/images/Sample.png"
            height="500"
            width="500"
            alt="Logo"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          />
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
