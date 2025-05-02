"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker({setFieldValue, placeholderText, values, name, maxDate, maxMonth, maxYear, minDate, minMonth, minYear}) {

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full">
        <Button
          variant={"outline"}
          className={cn(
            "justify-start text-left font-normal",
            !values && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {values ? format(values, "PPP") : <span>{placeholderText || "Pick a date"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={values}
          onSelect={(value)=>setFieldValue(name, value)}
          initialFocus
          toDate={maxDate}
          toMonth={maxMonth}
          toYear={maxYear}
          fromDate={minDate}
          fromMonth={minMonth}
          fromYear={minYear}
        />
      </PopoverContent>
    </Popover>
  )
}
