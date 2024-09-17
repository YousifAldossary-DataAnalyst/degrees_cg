"use client";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";

import React from "react";
import Hint from "../../global/tool-tip";

interface ItemProps {
  id: string;
  name: string;
}

const Items = ({ id, name }: ItemProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push(`/whiteboard/${id}`);
  };
  return (
    <Hint label={name} side="right" align="center" sideOffset={20} alignOffset={12} className="border-primary fixed -top-8">
      <Button
        onClick={onClick}
        className="rounded-md curser-pointer opacity-75 hover:opacity-100 transition overflow-x-hidden text-white"
      >
        {name[0] + name[1]}
      </Button>
    </Hint>
  );
};

export default Items;
