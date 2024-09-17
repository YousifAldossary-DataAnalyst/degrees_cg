import { 
    ActiveTool, 
    Editor, 
    STROKE_DASH_ARRAY, 
    STROKE_WIDTH
  } from "@/features/editor/types";
  import { ToolSidebarClose } from "@/features/editor/components/tool-sidebar-close";
  import { ToolSidebarHeader } from "@/features/editor/components/tool-sidebar-header";
  
  import { cn } from "@/lib/utils";
  import { Label } from "@/components/ui/label";
  import { Button } from "@/components/ui/button";
  import { Slider } from "@/components/ui/slider";
  import { ScrollArea } from "@/components/ui/scroll-area";
import Hint from "@/components/global/tool-tip";
  
  interface StrokeWidthSidebarProps {
    editor: Editor | undefined;
    activeTool: ActiveTool;
    onChangeActiveTool: (tool: ActiveTool) => void;
  };
  
  export const StrokeWidthSidebar = ({
    editor,
    activeTool,
    onChangeActiveTool,
  }: StrokeWidthSidebarProps) => {
    const widthValue = editor?.getActiveStrokeWidth() || STROKE_WIDTH;
    const typeValue = editor?.getActiveStrokeDashArray() || STROKE_DASH_ARRAY;
  
    const onClose = () => {
      onChangeActiveTool("select");
    };
  
    const onChangeStrokeWidth = (value: number) => {
      editor?.changeStrokeWidth(value);
    };
  
    const onChangeStrokeType = (value: number[]) => {
      editor?.changeStrokeDashArray(value);
    }
  
    return (
      <aside
        className={cn(
          "bg-white relative border-r z-[40] w-[360px] h-full flex flex-col",
          activeTool === "stroke-width" ? "visible" : "hidden",
        )}
      >
        <ToolSidebarHeader
          title="Stroke options"
          description="Modify the stroke of your element"
        />
        <ToolSidebarClose onClick={onClose} />
        <ScrollArea>
          <div className="p-4 space-y-4 border-b">
            <Label className="text-sm text-black">
              Stroke width
            </Label>
            <Slider
              value={[widthValue]}
              onValueChange={(values) => onChangeStrokeWidth(values[0])}
            />
          </div>
          <div className="p-4 space-y-4 border-b">
            <Label className="text-sm text-black">
              Stroke type
            </Label>
            <Hint label="Solid Stroke" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeStrokeType([])}
              variant='ghost'
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left hover:bg-gray-400",
                JSON.stringify(typeValue) === `[]` && "border-2 border-blue-500"
              )}
              style={{
                padding: "8px 16px"
              }}
            >
              <div className="w-full border-black text-black rounded-full border-2" />
            </Button>
            </Hint>
            <Hint label="Dash Stroke" side="bottom" sideOffset={5}>
            <Button
              onClick={() => onChangeStrokeType([5, 5])}
               variant='ghost'
              size="lg"
              className={cn(
                "w-full h-16 justify-start text-left hover:bg-gray-400",
                JSON.stringify(typeValue) === `[5,5]` && "border-2 border-blue-500"
              )}
              style={{
                padding: "8px 16px"
              }}
            >
              <div className="w-full border-black rounded-full border-2 border-dashed" />
            </Button>
            </Hint>
          </div>
        </ScrollArea>
        
      </aside>
    );
  };
  