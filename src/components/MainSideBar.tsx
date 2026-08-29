"use client";

import { Lightbulb, Layers, Image as ImageIcon, Download, CircleHelp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MainSideBarProps {
  onChangeTab: (tab: number) => void;
  tab: number;
  block?: boolean;
}

const items: { tab: number; icon: LucideIcon }[] = [
  { tab: 1, icon: Lightbulb },
  { tab: 2, icon: Layers },
  { tab: 3, icon: ImageIcon },
  { tab: 4, icon: Download },
];

function MainSideBar({ onChangeTab, tab, block }: MainSideBarProps) {
  function toggleSideBar(value: number) {
    if (block) {
      return;
    }
    onChangeTab(value);
  }

  return (
    <nav className="flex flex-col items-center w-16 h-screen bg-navbar py-4">
      <ul className="list-none p-0 m-0 flex flex-col items-center gap-1 w-full">
        {items.map(({ tab: itemTab, icon: Icon }) => {
          const active = tab === itemTab;
          return (
            <li key={itemTab} className="relative w-full flex justify-center">
              {active && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-accent" />
              )}
              <button
                type="button"
                onClick={() => toggleSideBar(itemTab)}
                style={block ? { cursor: "not-allowed" } : undefined}
                className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200 cursor-pointer ${
                  active
                    ? "bg-surface text-accent"
                    : "text-muted hover:bg-nav-hover hover:text-white"
                }`}
              >
                <Icon size={20} strokeWidth={1.75} />
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto">
        <button
          type="button"
          onClick={() => toggleSideBar(0)}
          className={`flex items-center justify-center w-11 h-11 rounded-xl transition-colors duration-200 cursor-pointer ${
            tab === 0
              ? "bg-surface text-accent"
              : "text-muted hover:bg-nav-hover hover:text-white"
          }`}
        >
          <CircleHelp size={20} strokeWidth={1.75} />
        </button>
      </div>
    </nav>
  );
}

export default MainSideBar;
