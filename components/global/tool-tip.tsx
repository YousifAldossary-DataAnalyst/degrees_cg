import React from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip";

export interface HintProps {
    label: string;
    className?: string;
    children: React.ReactNode;
    side?: "top" | "bottom" | "left" | "right"
    align?: "start" | "center" | "end"
    sideOffset?: number;
    alignOffset?: number;
}

const Hint = ({label, children, side, align, sideOffset, alignOffset, className}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent 
            className={className}
            side={side}
            align={align}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
        >
          <p className="text-sm semi-bold">
            {label}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default Hint