"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  add,
  sub,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay
} from "date-fns";

import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function Calendar() {
  const [mode, setMode] = useState<"month" | "week">("month");
  const [current, setCurrent] = useState(new Date());

  const startDate = useMemo(() => {
    if (mode === "month") return startOfWeek(startOfMonth(current), { weekStartsOn: 1 });
    return startOfWeek(current, { weekStartsOn: 1 });
  }, [mode, current]);

  const endDate = useMemo(() => {
    if (mode === "month") return endOfWeek(endOfMonth(current), { weekStartsOn: 1 });
    return endOfWeek(current, { weekStartsOn: 1 });
  }, [mode, current]);

  const days = useMemo(() => {
    return eachDayOfInterval({ start: startDate, end: endDate });
  }, [startDate, endDate]);

  function prev() {
    setCurrent((d) => (mode === "month" ? sub(d, { months: 1 }) : sub(d, { weeks: 1 })));
  }
  function next() {
    setCurrent((d) => (mode === "month" ? add(d, { months: 1 }) : add(d, { weeks: 1 })));
  }

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="h-full flex flex-col bg-surface">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={prev}>
            ‹
          </Button>
          <div className="text-base font-medium px-3">
            {format(current, mode === "month" ? "MMMM yyyy" : "MMM dd, yyyy")}
          </div>
          <Button variant="ghost" size="sm" onClick={next}>
            ›
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Select value={mode} onValueChange={(v) => setMode(v as "month" | "week")}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-px bg-border mb-px">
        {weekDays.map((wd) => (
          <div key={wd} className="bg-muted/30 text-center text-md font-medium h-6 font-serif">
            {wd}
          </div>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 gap-px bg-border rounded-sm overflow-hidden auto-rows-fr">
        {days.map((day) => {
          const inMonth = isSameMonth(day, current);
          const todayFlag = isSameDay(day, new Date());
          const dateStr = format(day, "yyyy-MM-dd");
          return (
            <div
              key={day.toISOString()}
              className={`bg-background p-2 text-sm leading-tight flex flex-col justify-start ${
                inMonth ? "text-foreground" : "text-muted-foreground"
              } ${todayFlag ? "ring-1 ring-accent/30" : ""}`}>
              <div className="flex items-start justify-between">
                <Link
                  href={`/planner/calendar/${dateStr}`}
                  className="text-sm font-medium hover:text-accent transition-colors">
                  {format(day, "d")}
                </Link>
              </div>
              <div className="mt-2 text-xs text-muted-foreground"> </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
