import React, { useState } from "react";
import BoardList from "./_components/board-list";
import NewBoard from "./_components/editboard-form";
import EditPage from "./edit/page";
import SideBar from "@/components/sidebar";
import RemoveSideBar from "./_components/remove-side-bar";

interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const SessionPage = async ({params}: BoardIdPageProps) => {
    //WIP: For each session you can create multiple edit whiteboards
    // To create and render an edit form look at the components.
    //EditPage should go inside each board list with unique id.
  return (
    <div className="h-full">
      {/* <BoardList /> */}
      <EditPage boardId={params.boardId}/>
    </div>
  );
};

export default SessionPage;
// boardId={''}
