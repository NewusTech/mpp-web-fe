"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export default function InputDate({
  date,
  setDate,
}: {
  date: Date | null;
  setDate: (date: Date | null) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full hover:bg-neutral-50 bg-neutral-50 border border-neutral-700 text-primary-700 justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}>
          {date ? format(date, "PP") : <span>Pilih Tanggal</span>}
          <CalendarIcon className="ml-2 h-4 w-4 text-primary-700" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-neutral-50">
        <Calendar
          mode="single"
          selected={date as Date}
          onSelect={(day) => setDate(day ?? null)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
