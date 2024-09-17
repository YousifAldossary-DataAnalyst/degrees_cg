import { Button } from "@/components/ui/button";
import { ChevronsLeft } from "lucide-react";

interface ToolSidebarCloseProps {
  onClick: () => void;
}

export const ToolSidebarClose = ({ onClick }: ToolSidebarCloseProps) => {
  return (
    <div className="flex items-right justify-end w-full h-fit">
      <Button
        onClick={onClick}
        className="h-[70px] hover:bg-white bg-white w-fit group rounded-r-xl px-1 pr-2 border-r-0 border-y-0"
      >
        <ChevronsLeft className="size-4 text-black group-hover:opacity-75 transition" />
      </Button>
    </div>
  );
};
