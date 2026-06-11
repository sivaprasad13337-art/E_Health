"use client";

import * as React from "react";
// import { es } from "react-day-picker/locale";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";

interface CalendarBookedDatesProps {
  bookedDates: Date[];
  setData: (args: FormData) => void;
}

export function BookingCalendar({
  bookedDates,
  setData,
}: CalendarBookedDatesProps) {
  const [date, setDate] = React.useState<Date | undefined>(
    // new Date(new Date().getFullYear(), 6, 20),
    new Date(),
  );

  React.useEffect(() => {
    setData((prev) => ({ ...prev, date: date }));
  }, [date]);

  return (
    <Card className="mx-auto w-full h-full p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          defaultMonth={date}
          selected={date}
          onSelect={setDate}
          disabled={bookedDates}
          modifiers={{
            booked: bookedDates,
          }}
          modifiersClassNames={{
            booked: "[&>button]:line-through opacity-100",
          }}
          className="w-full h-full"
        />
      </CardContent>
    </Card>
  );
}
