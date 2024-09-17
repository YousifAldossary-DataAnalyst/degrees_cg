import { IoTriangle, IoTriangleOutline, IoTriangleSharp } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";

import { ActiveTool, BuildEditorProps, Editor } from "@/features/editor/types";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShapeTool } from "./shape-tool";
import { ToolSidebarHeader } from "./tool-sidebar-header";
import { ToolSidebarClose } from "./tool-sidebar-close";

interface ShapeSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />
      <ToolSidebarClose onClick={onClose} />
      <ScrollArea className="flex justify-center items-center">
        <div className="grid md:grid-cols-2 gap-4 p-4 items-center justify-center">
          <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />
          <ShapeTool onClick={() => editor?.addSoftRectangle()} icon={FaSquare} />
          <ShapeTool onClick={() => editor?.addRectangle()} icon={FaSquareFull} />
          <ShapeTool onClick={() => editor?.addTriangle()} icon={IoTriangle} />
          {/* <ShapeTool
            onClick={() => editor?.addInverseTriangle()}
            icon={IoTriangle}
            iconClassName="rotate-180"
          /> */}
          <ShapeTool onClick={() => editor?.addDiamond()} icon={FaDiamond} />
        </div>
      </ScrollArea>
    </aside>
  );
};
