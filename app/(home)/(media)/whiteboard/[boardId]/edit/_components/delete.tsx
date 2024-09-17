"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MoreHorizontal, Trash, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useConfirm } from "@/hooks/use-confirm";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBoard } from "@/lib/data";
import { OpenBoard } from "@/hooks/use-open";
import { toast } from "sonner";
import { CreateBoard } from "@/db/schema";
import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

type Props = {
  boardId: string;
};

const DeleteBoard = ({ boardId }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const { onOpen } = OpenBoard();

  const handleDelete = async () => {
    setLoading(true);
    const deleteMutation = await db
      .delete(CreateBoard)
      .where(eq(CreateBoard?.boardId, boardId));
    const ok = await confirm();
    if (ok) {
      deleteMutation;
    }
    setLoading(false);
    toast.success("Account deleted");
    router.refresh()
  };

  return (
    <div className="absolute top-2 left-2 text-black ">
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem disabled={loading} onClick={() => handleDelete()}>
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DeleteBoard;

// export function DeleteBoardSkeleton() {
//   return (
//     <div className="absolute top-2 right-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[50px]" />
//   );
// }
