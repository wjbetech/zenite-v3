"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { NotePencil, CalendarBlank, BookOpen } from "@phosphor-icons/react";

export function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-73px)] w-full items-center justify-center px-6 py-12">
      <div className="mx-auto w-full max-w-4xl">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Your new planner.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl">
            Bringing all the comfort of a traditional paper planner to your digital life.
          </p>
        </div>

        {/* Features Grid
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted/30">
              <NotePencil size={28} weight="regular" className="text-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Every interaction feels deliberate. No clutter, no distractions—just you and your plans.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted/30">
              <CalendarBlank size={28} weight="regular" className="text-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Built to mimic the pages of a high-quality paper planner, with all the benefits of digital.
            </p>
          </div> */}

        {/* <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-border bg-muted/30">
              <BookOpen size={28} weight="regular" className="text-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Nostalgic comfort with modern flexibility. Edit, scale, and adapt without sacrificing the feeling.
            </p>
          </div>
        </div> */}
        {/* CTA Section */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="min-w-40 font-serif text-sm uppercase tracking-[0.2em]">
            <Link href="/planner">Open Planner</Link>
          </Button>
          <Button variant="outline" size="lg" className="min-w-40 font-serif text-sm uppercase tracking-[0.2em]">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
}
