"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Lightbulb, Layers, Image as ImageIcon, Download, CircleHelp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MainSideBarProps {
  tab: number;
  block?: boolean;
}

const items: { tab: number; icon: LucideIcon }[] = [
  { tab: 1, icon: Lightbulb },
  { tab: 2, icon: Layers },
  { tab: 3, icon: ImageIcon },
  { tab: 4, icon: Download },
];

function MainSideBar({ tab, block }: MainSideBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function toggleSideBar(value: number) {
    if (block) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    if (value === 0) {
      params.delete("tab");
    } else {
      params.set("tab", String(value));
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  return (
    <nav className="flex flex-row md:flex-col items-center shrink-0 w-full md:w-16 h-16 md:h-screen bg-navbar px-2 md:px-0 py-0 md:py-4 order-3 md:order-1">
      <ul className="list-none p-0 m-0 flex flex-row md:flex-col items-center justify-center md:justify-start gap-1 flex-1 md:w-full">
        {items.map(({ tab: itemTab, icon: Icon }) => {
          const active = tab === itemTab;
          return (
            <li key={itemTab} className="relative flex justify-center md:w-full">
              {active && (
                <span className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-1 rounded-b-full md:left-0 md:top-1/2 md:translate-x-0 md:-translate-y-1/2 md:w-1 md:h-6 md:rounded-r-full md:rounded-b-none bg-accent" />
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
      <div className="ml-auto md:ml-0 md:mt-auto">
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
