"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { CalendarDays } from "lucide-react";
import { formatDateForDjango } from "@/lib/utils";

export function DateFilter({ onClick }: { onClick: (arg: Date) => void }) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  React.useEffect(() => {
    const selectedDate = formatDateForDjango(date);
    onClick(selectedDate);
  }, [date]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="text-gray-500">
          <CalendarDays /> Date
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[20rem]" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Card className="mx-auto w-full h-full p-0">
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  modifiersClassNames={{
                    booked: "[&>button]:line-through opacity-100",
                  }}
                  className="w-full h-full"
                />
              </CardContent>
            </Card>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
