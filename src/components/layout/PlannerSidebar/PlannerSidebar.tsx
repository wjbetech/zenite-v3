"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CaretLeft, CaretRight, Calendar, Confetti, Book, SquaresFour } from "@phosphor-icons/react";

export default function PlannerSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  const navItems = [
    {
      href: "/planner",
      icon: SquaresFour,
      label: "Dashboard"
    },
    {
      href: "/planner/diary",
      icon: Book,
      label: "Diary"
    },
    {
      href: "/planner/calendar",
      icon: Calendar,
      label: "Calendar"
    },
    {
      href: "/planner/holidays",
      icon: Confetti,
      label: "Holidays"
    }
  ];

  return (
    <aside
      className={`relative border-r bg-background transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-48"
      }`}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={`flex h-12 items-center ${isCollapsed ? "justify-center" : "justify-between"} px-3 border-b`}>
          {!isCollapsed && <h2 className="text-lg font-serif">Menu</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="cursor-pointer hover:bg-muted rounded-md p-1"
            aria-label={isCollapsed ? "Open sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Open sidebar" : "Collapse sidebar"}>
            {isCollapsed ? <CaretRight className="h-4 w-4" /> : <CaretLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/planner" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${isCollapsed ? "px-2" : "px-4"} cursor-pointer ${
                    isActive ? "bg-accent text-accent-foreground" : ""
                  }`}>
                  <Icon className="h-5 w-5 shrink-0" />
                  {!isCollapsed && <span className="ml-3">{item.label}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
