"use client";

import Calendar from "@/components/planner/Calendar/Calendar";

export default function PlannerCalendarPage() {
  return (
    <main className="flex-1 overflow-hidden flex flex-col px-6 py-4">
      <h1 className="text-3xl font-serif mb-4">Calendar</h1>
      <div className="flex-1 overflow-hidden">
        <Calendar />
      </div>
    </main>
  );
}
