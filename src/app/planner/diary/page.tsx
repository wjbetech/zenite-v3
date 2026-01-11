"use client";

import { format } from "date-fns";
import { useState, useEffect } from "react";
import { saveDiaryEntry, loadDiaryEntry } from "@/lib/storage";

export default function PlannerDiaryPage() {
  const [currentDate] = useState(new Date());
  const [diaryText, setDiaryText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load diary entry on mount
  useEffect(() => {
    const savedContent = loadDiaryEntry(currentDate);
    setDiaryText(savedContent);
    setIsLoaded(true);
  }, [currentDate]);

  // Auto-save with debounce
  useEffect(() => {
    if (!isLoaded) return; // Don't save on initial load

    const timeoutId = setTimeout(() => {
      saveDiaryEntry(currentDate, diaryText);
    }, 1000); // Save 1 second after user stops typing

    return () => clearTimeout(timeoutId);
  }, [diaryText, currentDate, isLoaded]);

  const dayNumber = format(currentDate, "d");
  const dayName = format(currentDate, "EEEE");
  const monthYear = format(currentDate, "MMMM yyyy");

  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        {/* Stacked paper effect with shadows */}
        <div className="absolute inset-0 bg-background border-y border-border shadow-[0_-2px_8px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.1)]">
          {/* Lined paper background - full width */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "linear-gradient(transparent 31px, #d4d4d4 1px)",
              backgroundSize: "100% 32px"
            }}
          />

          {/* Left margin line */}
          <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-accent/20" />

          {/* Date header overlay - positioned to the right of margin line */}
          <div className="absolute left-28 z-10 pointer-events-none">
            <div className="text-7xl font-serif font-bold text-foreground/90 leading-none">{dayNumber}</div>
            <div className="text-2xl font-serif text-muted-foreground">{dayName}</div>
            <div className="text-sm font-serif text-muted-foreground/80 mb-2">{monthYear}</div>
            <div className="text-xs uppercase tracking-widest font-serif text-muted-foreground/60">
              {/* NO HOLIDAY */}
            </div>
          </div>

          {/* Writing area */}
          <div className="absolute inset-0 pl-28 pr-12 overflow-y-auto">
            <textarea
              value={diaryText}
              onChange={(e) => setDiaryText(e.target.value)}
              placeholder="Write your diary entry for today..."
              className="w-full min-h-full resize-none bg-transparent border-none outline-none placeholder:text-muted-foreground/40 focus:outline-none"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "15px",
                lineHeight: "32px",
                paddingTop: "198px" // Adjusted for Inconsolata font alignment
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
