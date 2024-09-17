import { StickyScrollRevealDemo } from "@/components/global/stick-scroll-reveal";
import SideBar from "@/components/sidebar";
import { GetData } from "@/lib/data";
import React from "react";

type Props = {};

const WhiteBoardPage = async (props: Props) => {
  const data = await GetData();
  return (
    <div className="h-full flex flex-row">
      <SideBar />
      <div className="flex flex-1 flex-col gap-y-4 w-full h-full items-center justify-center">
        <h2 className="text-2xl font-bold">Welcome to whitebaord 👋</h2>
        <p className="text-muted-foreground text-sm mb-2">
          {data.map((board) => board.boardId.length > 0)
            ? "Select one of your session to conitnue!"
            : "Create a new whiteboard session to get started!"}
        </p>
        <StickyScrollRevealDemo />
      </div>
    </div>
  );
};

export default WhiteBoardPage;
