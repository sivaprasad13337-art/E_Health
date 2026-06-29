import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type React from "react";

interface FilterProps {
  values: string[];
  handler: (arg: string) => void;
  icon: React.ElementType;
  text: string;
}

export function Filter({ values, handler, icon, text }: FilterProps) {
  const Icon = icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-gray-500">
          <Icon /> {text}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          {values.map((item) => (
            <DropdownMenuItem onClick={() => handler(item)}>
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
