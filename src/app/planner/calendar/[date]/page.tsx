"use client";

import { parse, format, isValid } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "@phosphor-icons/react";

export default function CalendarDayPage() {
  const params = useParams();
  const router = useRouter();
  const dateStr = params.date as string;

  // Parse the date from the URL (format: yyyy-MM-dd)
  const date = parse(dateStr, "yyyy-MM-dd", new Date());
  const validDate = isValid(date);

  if (!validDate) {
    return (
      <main className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl font-merriweather mb-4">Invalid Date</h1>
          <p>The date you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </main>
    );
  }

  const formattedDate = format(date, "EEEE, MMMM d, yyyy");
  const dayOfWeek = format(date, "EEEE");

  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Calendar
        </Button>

        <h1 className="text-2xl font-merriweather mb-2">{formattedDate}</h1>
        <p className="text-sm text-muted-foreground mb-6">{dayOfWeek}</p>

        <div className="space-y-6">
          <section className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Events & Activities</h2>
            <p className="text-sm text-muted-foreground">No events scheduled for this day yet.</p>
            {/* TODO: Add event list and create event functionality */}
          </section>

          <section className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Notes</h2>
            <p className="text-sm text-muted-foreground">Add notes for this day...</p>
            {/* TODO: Add notes functionality */}
          </section>
        </div>
      </div>
    </main>
  );
}
