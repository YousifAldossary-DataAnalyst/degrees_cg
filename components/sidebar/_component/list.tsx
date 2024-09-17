import { db } from "@/db/db";
import { CreateBoard } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import React from "react";
import Items from "./items";

const BoardLists = async () => {
  const user = await currentUser();
  //WIP: You can use Clerk Organization. But right now keep it simple!
  //Using Clerk Organization you can invite people easily to create a team.
  const data = await db
    .select()
    .from(CreateBoard)
    .where(eq(CreateBoard?.createdBy, user?.primaryEmailAddress?.emailAddress!))
    .orderBy(desc(CreateBoard.createAt));
  if (!data) return null;

  return (
    <div>
      <ul className="space-y-4 flex items-center justify-center flex-col pt-2">
        {data.map((board, index) => (
          <Items key={index} id={board.boardId} name={board.title!}/>
        ))}
      </ul>
    </div>
  );
};

export default BoardLists;
