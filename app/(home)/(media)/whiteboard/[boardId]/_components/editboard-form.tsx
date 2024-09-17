"use client";
import { Loader2Icon, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { CreateEditBoard } from "@/lib/board";
import Hint from "@/components/global/tool-tip";
import { useUser } from "@clerk/nextjs";
import { db } from "@/db/db";
import { EditBoards } from "@/db/schema";
import moment from "moment";

type Props = {};

const NewBoard = () => {
  const router = useRouter()
  const [title, setTitle] = useState<any>();
  const { toast } = useToast();
  const [loading, isLoading] = useState(false);
  const user = useUser();

  const Create = async (title: string) => {
    isLoading(true);
    const board = await db.insert(EditBoards).values({
        userId: user.user?.id,
        title: title,
        createdBy: user?.user?.primaryEmailAddress?.emailAddress,
        createAt: moment().format("DD/MM/yyyy"),
      });
      if (board) {
        isLoading(false);
        toast({
          title: "Success",
          description: `A whiteboard has been created! 😊`,
        });
        router.refresh();
      } 
    };

  const HandleInputChange = (event: any) => {
    const value  = event.target;
    setTitle(value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square flex items-center justify-center p-0">
        <Hint label="Create a whiteboard" side="right" align="center" sideOffset={20} alignOffset={12} className="border-primary fixed -top-8 bg-black text-white">
          <Button className="opacity-60 hover:opacity-100 transition w-fit">
            <Plus className="text-white size-4" />
          </Button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader className="pt-2 text-left flex gap-2 pb-4">
          <DialogTitle className="text-2xl font-bold">
            Create A New Whiteboard
          </DialogTitle>
          <DialogDescription>
            Start implementing your thought! 
          </DialogDescription>
          <Input
            placeholder="Ex. Food Delivery"
            name="board"
            onChange={HandleInputChange}
            className="border rounded-md border-primary/80"
          />
          <Button
            className=""
            type="submit"
            disabled={loading}
            onClick={() => Create(title.value)}
          >
            {loading ? <Loader2Icon className="animate-spin" /> : "Create"}
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewBoard;