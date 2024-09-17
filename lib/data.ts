import { db } from "@/db/db";
import { CreateBoard, EditBoards } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import moment from "moment";

//Board
export const GetData = async () => {
  const user = await currentUser();
  const data = await db
    .select()
    .from(CreateBoard)
    .where(eq(CreateBoard.createdBy, user?.primaryEmailAddress?.emailAddress!))
    .orderBy(desc(CreateBoard.createAt));

  return data;
};

export const GetBoard = async () => {
  const user = await currentUser();
  const data = await db
    .select({ id: CreateBoard.boardId })
    .from(CreateBoard)
    .where(
      and(eq(CreateBoard.createdBy, user?.primaryEmailAddress?.emailAddress!))
    );
  return data;
};

export const GetEditBoardData = async (boardId: any) => {
  const user = await currentUser();
  const data = await db
    .select()
    .from(EditBoards)
    .where(
      and(
        eq(EditBoards.createdBy, user?.primaryEmailAddress?.emailAddress!)
        // eq(EditBoards?.boardId, boardId)
      )
    )
    .orderBy(desc(EditBoards.createAt));
  return data;
};

export const useDeleteBoard = async (boardId: any) => {
  const data = await db;
  db.delete(EditBoards).where(eq(CreateBoard?.boardId, boardId));
  return data;
};

//Podcast
// export const getPodcastInfo = async (podcastId: any) => {
//   const user = await currentUser();
//   const data = await db
//     .select()
//     .from(Podcast)
//     .where(
//       and(
//         eq(Podcast.createdBy, user?.primaryEmailAddress?.emailAddress),
//         eq(Podcast?.podcastId, podcastId)
//       )
//     )
//     .orderBy(desc(EditBoards.createAt));
//   return data;
// };

// export const CreatePodcast = async (
//   title: string,
//   description: string,
//   imgUrl: string,
//   audioUrl: string,
//   voicePrompt: string,
//   imagePrompt: string,
//   voiceType: string,
//   audioDuration: number,
// ) => {
//   const user = await currentUser();
//   const podcasts = await db.insert(Podcast).values({
//     userId: user?.id,
//     title: title,
//     description: description,
//     imageUrl: imgUrl,
//     audioUrl: audioUrl,
//     voicePrompt: voicePrompt,
//     imagePrompt: imagePrompt,
//     voiceType: voiceType,
//     audioDuration: audioDuration,
//     createdBy: user?.primaryEmailAddress?.emailAddress,
//     createAt: moment().format("DD/MM/yyyy"),
//   });
//   return podcasts;
// };
