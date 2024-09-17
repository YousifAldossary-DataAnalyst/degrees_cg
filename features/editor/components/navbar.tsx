"use client";
import Hint from "@/components/global/tool-tip";
import { Button } from "@/components/ui/button";
import React from "react";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CiFileOn } from "react-icons/ci";
import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { useMutationState } from "@tanstack/react-query";
import {
  ChevronDown,
  Download,
  Loader,
  MousePointerClick,
  Redo2,
  Redo2Icon,
  Undo2,
  Undo2Icon,
} from "lucide-react";
import { BackButton } from "./back-button";
import { cn } from "@/lib/utils";
import { ActiveTool, Editor } from "../types";
import { useFilePicker } from "use-file-picker";

interface NavbarProps {
  id: string;
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

const NavBarCanvas = ({
  id,
  editor,
  activeTool,
  onChangeActiveTool,
}: NavbarProps) => {
  const data = useMutationState({
    filters: {
      mutationKey: ["project", { id }],
      exact: true,
    },
    select: (mutation) => mutation.state.status,
  });

  const currentStatus = data[data.length - 1];

  const isError = currentStatus === "error";
  const isPending = currentStatus === "pending";

  const { openFilePicker } = useFilePicker({
    accept: ".json",
    onFilesSuccessfullySelected: ({ plainFiles }: any) => {
      if (plainFiles && plainFiles.length > 0) {
        const file = plainFiles[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = () => {
          editor?.loadJson(reader.result as string);
        };
      }
    },
  });

  return (
    <nav className="w-full z-[1] bg-white flex items-center p-4 h-[68px] gap-x-8 border-b lg:pl-[34px]">
      <BackButton />
      <div className="w-full flex items-center gap-x-1 h-full">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="default" className="mr-2">
              File
              <ChevronDown className="size-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="min-w-60 dark:text-white "
          >
            <DropdownMenuItem
              onClick={() => openFilePicker()} //WIPL add files
              className="flex items-center gap-x-2"
            >
              <CiFileOn className="size-8" />
              <div>
                <p>Open</p>
                <p className="text-xs text-muted-foreground">
                  Open a JSON file
                </p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="mx-2" />
        <div className="flex items-center gap-4 mr-2 ml-2 ">
          <Hint label="Select" side="bottom" sideOffset={10}>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => onChangeActiveTool("select")}
              className={cn(
                "text-black dark:text-white",
                activeTool === "select" &&
                  "bg-primary text-white hover:text-primary dark:hover:text-white"
              )} //WIP: create dynamic class
            >
              <MousePointerClick className="size-4" />
            </Button>
          </Hint>
          <Hint label="Undo" side="bottom" sideOffset={10}>
            <Button
              variant="secondary"
              disabled={!editor?.canUndo()}
              size="icon"
              onClick={() => editor?.onUndo()}
            >
              <Undo2Icon className="size-4" />
            </Button>
          </Hint>
          <Hint label="Redo" side="bottom" sideOffset={10}>
            <Button
              variant="secondary"
              disabled={!editor?.canRedo()}
              size="icon"
              onClick={() => editor?.onRedo()}
            >
              <Redo2Icon className="size-4" />
            </Button>
          </Hint>
        </div>
        <Separator orientation="vertical" className="mx-2" />
        {isPending && ( 
          <div className="flex items-center gap-x-2">
            <Loader className="size-4 animate-spin text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              Saving...
            </div>
          </div>
        )}
        {!isPending && isError && ( 
          <div className="flex items-center gap-x-2">
            <BsCloudSlash className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              Failed to save
            </div>
          </div>
        )}
        {!isPending && !isError && ( 
          <div className="flex items-center gap-x-2">
            <BsCloudCheck className="size-[20px] text-muted-foreground" />
            <div className="text-xs text-muted-foreground">
              Saved
            </div>
          </div>
        )}
        <div className="ml-auto flex items-center gap-x-4 dark:text-black">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                Export
                <Download className="size-4 ml-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-60">
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJson()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JSON</p>
                  <p className="text-xs text-muted-foreground">
                    Save for later editing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.savePng()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>PNG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for sharing on the web
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveJpg()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>JPG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for printing
                  </p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center gap-x-2"
                onClick={() => editor?.saveSvg()}
              >
                <CiFileOn className="size-8" />
                <div>
                  <p>SVG</p>
                  <p className="text-xs text-muted-foreground">
                    Best for editing in vector software
                  </p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default NavBarCanvas;
