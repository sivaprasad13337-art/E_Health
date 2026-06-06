import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type React from "react";

interface CustomTooltipProps {
  trigger: React.ReactNode;
  tip: string;
}

const CustomTooltip = ({ trigger, tip }: CustomTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>{trigger}</TooltipTrigger>
      <TooltipContent>
        <p>{tip}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
