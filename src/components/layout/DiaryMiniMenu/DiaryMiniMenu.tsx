"use client";

import React from "react";
import { TextT, TextItalic, TextUnderline, Highlighter, Eraser, List } from "@phosphor-icons/react";

import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator
} from "@/components/ui/menubar";

type Props = {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
};

export default function DiaryMiniMenu({ isCollapsed, setIsCollapsed }: Props) {
  return (
    <div>
      <Menubar>
        {!isCollapsed && (
          <>
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer hover:bg-muted rounded-md px-2 py-1">
                <TextT className="h-4 w-4 mr-2" weight="regular" />
                Text
              </MenubarTrigger>
              <MenubarContent>
                <span>
                  <span className="h-4 w-4 mr-2" />
                  Bold
                </span>
                <MenubarItem>
                  <TextItalic className="h-4 w-4 mr-2" weight="regular" />
                  Italic
                </MenubarItem>
                <MenubarItem>
                  <TextUnderline className="h-4 w-4 mr-2" weight="regular" />
                  Underline
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem>
                  <Highlighter className="h-4 w-4 mr-2" weight="regular" />
                  Highlight
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer hover:bg-muted rounded-md px-2 py-1">
                <Eraser className="h-4 w-4 mr-2" weight="regular" />
                Edit
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>Clear All</MenubarItem>
                <MenubarItem>Clear Formatting</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </>
        )}

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer px-2 py-1.5 rounded-none hover:bg-muted flex items-center justify-center"
          aria-label={isCollapsed ? "Open tools" : "Close tools"}
          title={isCollapsed ? "Open tools" : "Close tools"}>
          <List className="h-4 w-4" weight="regular" />
        </button>
      </Menubar>
    </div>
  );
}
