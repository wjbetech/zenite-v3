"use client";

import { format, addDays, subDays, differenceInDays } from "date-fns";
import { useState, useEffect } from "react";
import { saveDiaryEntry, loadDiaryEntry } from "@/lib/storage";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import DiaryMiniMenu from "@/components/layout/DiaryMiniMenu/DiaryMiniMenu";

export default function PlannerDiaryPage() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [diaryText, setDiaryText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);

  // Load diary entry when date changes
  useEffect(() => {
    const savedContent = loadDiaryEntry(currentDate);
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  // Calculate if we can navigate forward/backward
  const daysFromToday = differenceInDays(currentDate, today);
  const canGoBack = daysFromToday > -7;
  const canGoForward = daysFromToday < 7;

  const goToPreviousDay = () => {
    if (canGoBack) {
      setCurrentDate((prev) => subDays(prev, 1));
      setIsLoaded(false);
    }
  };

  const goToNextDay = () => {
    if (canGoForward) {
      setCurrentDate((prev) => addDays(prev, 1));
      setIsLoaded(false);
    }
  };

  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-hidden relative">
        {/* Stacked paper effect with shadows */}
        <div className="absolute inset-0 bg-white/98 dark:bg-background/20 border-y border-border shadow-[0_-2px_8px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.1)] backdrop-blur-sm">
          {/* Lined paper background - separate overlays for light and dark so lines remain visible */}
          <div
            className="absolute inset-0 block dark:hidden"
            style={{
              backgroundImage: "linear-gradient(transparent 31px, rgba(0,0,0,0.08) 1px)",
              backgroundSize: "100% 32px"
            }}
          />
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              backgroundImage: "linear-gradient(transparent 31px, rgba(255,255,255,0.12) 1px)",
              backgroundSize: "100% 32px"
            }}
          />

          {/* Left margin line */}
          <div className="absolute left-20 top-0 bottom-0 w-0.5 bg-accent/20" />

          {/* Date header overlay - positioned to the right of margin line */}
          <div className="absolute left-28 top-2 z-10 text-center">
            <div className="flex items-end align-middle gap-0 mb-1">
              <button
                onClick={goToPreviousDay}
                disabled={!canGoBack}
                className="p-0 bg-transparent border-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed pointer-events-auto hover:opacity-70 transition-opacity flex items-center">
                <CaretLeft className="h-16 w-6" weight="thin" />
              </button>
              <div className="text-7xl font-serif font-bold text-foreground/90 leading-none pointer-events-none">
                {dayNumber}
              </div>
              <button
                onClick={goToNextDay}
                disabled={!canGoForward}
                className="p-0 bg-transparent border-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed pointer-events-auto hover:opacity-70 transition-opacity flex items-center">
                <CaretRight className="h-16 w-6" weight="thin" />
              </button>
            </div>
            <div className="text-2xl font-serif text-muted-foreground pointer-events-none pt-4">{dayName}</div>
            <div className="text-sm font-serif text-muted-foreground/80 pt-2 pointer-events-none">{monthYear}</div>
            <div className="text-xs uppercase tracking-widest font-serif text-muted-foreground/60 pointer-events-none">
              {/* NO HOLIDAY */}
            </div>
          </div>

          {/* Interactive tools menubar - positioned at top right, aligned with day number */}
          <div className="absolute right-12 top-6 z-10 pointer-events-auto">
            {/* DiaryMiniMenu component */}
            <DiaryMiniMenu isCollapsed={isMenuCollapsed} setIsCollapsed={setIsMenuCollapsed} />
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
                fontSize: "16px",
                lineHeight: "32px",
                paddingTop: "204px" // Adjusted for Inconsolata font alignment
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
