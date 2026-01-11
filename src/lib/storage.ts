import { format, parseISO, differenceInDays, differenceInMonths } from "date-fns";

// Types
export interface DiaryEntry {
  date: string; // yyyy-MM-dd format
  content: string;
  updatedAt: string; // ISO timestamp
}

export interface CalendarEvent {
  id: string;
  date: string; // yyyy-MM-dd format
  title: string;
  description?: string;
  createdAt: string; // ISO timestamp
}

interface DiaryStorage {
  entries: Record<string, DiaryEntry>;
}

interface CalendarStorage {
  events: Record<string, CalendarEvent[]>;
}

// Storage keys
const DIARY_STORAGE_KEY = "zenite-diary-entries";
const CALENDAR_STORAGE_KEY = "zenite-calendar-events";

// Retention periods (in days)
const DIARY_RETENTION_DAYS = 7;
const CALENDAR_RETENTION_MONTHS = 3;

// === Diary Storage ===

export function saveDiaryEntry(date: Date, content: string): void {
  if (typeof window === "undefined") return;

  const dateKey = format(date, "yyyy-MM-dd");
  const storage = getDiaryStorage();

  storage.entries[dateKey] = {
    date: dateKey,
    content,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(storage));
  cleanupDiaryEntries();
}

export function loadDiaryEntry(date: Date): string {
  if (typeof window === "undefined") return "";

  const dateKey = format(date, "yyyy-MM-dd");
  const storage = getDiaryStorage();

  return storage.entries[dateKey]?.content || "";
}

function getDiaryStorage(): DiaryStorage {
  if (typeof window === "undefined") return { entries: {} };

  const stored = localStorage.getItem(DIARY_STORAGE_KEY);
  if (!stored) return { entries: {} };

  try {
    return JSON.parse(stored) as DiaryStorage;
  } catch {
    return { entries: {} };
  }
}

function cleanupDiaryEntries(): void {
  if (typeof window === "undefined") return;

  const storage = getDiaryStorage();
  const today = new Date();
  const cleaned: Record<string, DiaryEntry> = {};

  Object.entries(storage.entries).forEach(([dateKey, entry]) => {
    try {
      const entryDate = parseISO(dateKey);
      const daysDiff = differenceInDays(today, entryDate);

      if (daysDiff <= DIARY_RETENTION_DAYS) {
        cleaned[dateKey] = entry;
      }
    } catch {
      // Skip invalid entries
    }
  });

  storage.entries = cleaned;
  localStorage.setItem(DIARY_STORAGE_KEY, JSON.stringify(storage));
}

// === Calendar Storage ===

export function saveCalendarEvent(event: Omit<CalendarEvent, "id" | "createdAt">): CalendarEvent {
  if (typeof window === "undefined") {
    return { ...event, id: "", createdAt: "" };
  }

  const storage = getCalendarStorage();
  const newEvent: CalendarEvent = {
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString()
  };

  if (!storage.events[event.date]) {
    storage.events[event.date] = [];
  }

  storage.events[event.date].push(newEvent);
  localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(storage));
  cleanupCalendarEvents();

  return newEvent;
}

export function loadCalendarEvents(date: Date): CalendarEvent[] {
  if (typeof window === "undefined") return [];

  const dateKey = format(date, "yyyy-MM-dd");
  const storage = getCalendarStorage();

  return storage.events[dateKey] || [];
}

export function deleteCalendarEvent(eventId: string): void {
  if (typeof window === "undefined") return;

  const storage = getCalendarStorage();

  Object.keys(storage.events).forEach((dateKey) => {
    storage.events[dateKey] = storage.events[dateKey].filter((e) => e.id !== eventId);
    if (storage.events[dateKey].length === 0) {
      delete storage.events[dateKey];
    }
  });

  localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(storage));
}

function getCalendarStorage(): CalendarStorage {
  if (typeof window === "undefined") return { events: {} };

  const stored = localStorage.getItem(CALENDAR_STORAGE_KEY);
  if (!stored) return { events: {} };

  try {
    return JSON.parse(stored) as CalendarStorage;
  } catch {
    return { events: {} };
  }
}

function cleanupCalendarEvents(): void {
  if (typeof window === "undefined") return;

  const storage = getCalendarStorage();
  const today = new Date();
  const cleaned: Record<string, CalendarEvent[]> = {};

  Object.entries(storage.events).forEach(([dateKey, events]) => {
    try {
      const eventDate = parseISO(dateKey);
      const monthsDiff = differenceInMonths(today, eventDate);

      if (Math.abs(monthsDiff) <= CALENDAR_RETENTION_MONTHS) {
        cleaned[dateKey] = events;
      }
    } catch {
      // Skip invalid entries
    }
  });

  storage.events = cleaned;
  localStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(storage));
}

// === Utility: Get all events for a month ===
export function loadCalendarEventsForMonth(date: Date): Record<string, CalendarEvent[]> {
  if (typeof window === "undefined") return {};

  const storage = getCalendarStorage();
  const monthKey = format(date, "yyyy-MM");
  const filtered: Record<string, CalendarEvent[]> = {};

  Object.entries(storage.events).forEach(([dateKey, events]) => {
    if (dateKey.startsWith(monthKey)) {
      filtered[dateKey] = events;
    }
  });

  return filtered;
}
