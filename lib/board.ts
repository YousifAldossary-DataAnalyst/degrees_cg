import { z } from "zod";
import { db } from "../db/drizzle";
import { EditBoards } from "../db/schema";
import { currentUser } from "@clerk/nextjs/server";
import moment from "moment";
import { and, eq } from "drizzle-orm";

interface EditBoardPorps {
  title: string;
  editId?: string;
}

const images = [
  "/placeholder/1.svg",
  "/placeholder/2.svg",
  "/placeholder/3.svg",
  "/placeholder/4.svg",
  "/placeholder/5.svg",
  "/placeholder/6.svg",
  "/placeholder/7.svg",
  "/placeholder/8.svg",
  "/placeholder/9.svg",
  "/placeholder/10.svg",
];

const randomImage = images[Math.floor(Math.random() * images.length)];

export const CreateEditBoard = async ({ title }: EditBoardPorps) => {
  const user = await currentUser();
  const editBoard = await db.insert(EditBoards).values({
    userId: user?.id,
    title: title,
    imageUrl: randomImage,
    createdBy: user?.primaryEmailAddress?.emailAddress,
    createAt: moment().format("DD/MM/yyyy"),
  });
  return editBoard;
};

export const UpdateEditBoard = async ({ title, editId }: EditBoardPorps) => {
  const user = await currentUser();
  const editBoard = await db
    .update(EditBoards)
    .set({
      title: title,
    })
    .where(
      and(
        eq(EditBoards.editId, editId!),
        eq(EditBoards.createdBy, user?.primaryEmailAddress?.emailAddress!)
      )
    );
  return editBoard;
};

export const DeleteEditBoard = async ({ editId }: EditBoardPorps) => {
  const editBoard = await db
    .delete(EditBoards)
    .where(eq(EditBoards.editId, editId!));
  return editBoard;
};
