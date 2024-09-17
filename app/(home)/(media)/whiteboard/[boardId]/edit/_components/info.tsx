"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const Info = () => {
  return (
    <Link className=" absolute top-2 right-4 h-12 md:flex items-center" href="/whiteboard">
      <Button className=" bg-white text-black rounded-md shadow-md dark:hover:text-white hover:text-white">
        <ArrowLeft />
        Back
      </Button>
    </Link>
  );
};

export default Info;

export function InfoSkeleton() {
  return (
    <div className="absolute top-2 right-4 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[50px]" />
  );
}
