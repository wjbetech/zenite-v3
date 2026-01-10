"use client";

import * as React from "react";
import { List, Moon, Sun } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import { NavItem } from "./NavItem";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/link-2", label: "My Planner" }
  // { href: "/link-3", label: "" }
];

export function Navbar() {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem("zenite-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const nextTheme = stored ? (stored === "dark" ? "dark" : "light") : prefersDark ? "dark" : "light";

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    setTheme(nextTheme);
    setIsReady(true);
  }, []);

  const toggleTheme = () => {
    setTheme((current) => {
      const next = current === "dark" ? "light" : "dark";
      if (typeof window !== "undefined") {
        window.localStorage.setItem("zenite-theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
      }
      return next;
    });
  };

  const resolvedTheme = isReady ? theme : "light";
  const isDark = resolvedTheme === "dark";
  const themeLabel = isDark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <header className="w-full border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-5 py-4">
        <div>
          <span className="text-3xl font-serif tracking-tight text-foreground">Zenite</span>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground/70">Planner</p>
        </div>

        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 text-xs md:flex">
            {navLinks.map((item) => (
              <NavItem key={item.label} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open navigation menu">
                    <List size={20} weight="bold" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-44 rounded-none border border-border bg-card/90 p-2 backdrop-blur-md">
                  {navLinks.map((item) => (
                    <DropdownMenuItem key={item.label} asChild>
                      <NavItem
                        href={item.href}
                        label={item.label}
                        className="block w-full px-0 py-1 text-left tracking-[0.3em] uppercase text-foreground/80"
                      />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={themeLabel} disabled={!isReady}>
              {isDark ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
