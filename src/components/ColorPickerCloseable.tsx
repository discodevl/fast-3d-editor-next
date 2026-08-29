"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ColorPicker from "./ColorPicker";
import IcoColor from "./IcoColor";

interface ColorPickerCloseableProps {
  title: string;
  onSelectColor: (color: string) => void;
  revertColor: () => void;
}

function ColorPickerCloseable({
  title,
  onSelectColor,
  revertColor,
}: ColorPickerCloseableProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function toggleHandler() {
    setOpen((open) => !open);
  }

  function colorHandler(color: string) {
    onSelectColor(color);
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <div onClick={toggleHandler} className="cursor-pointer">
        <IcoColor />
      </div>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 rounded-lg border border-app-border bg-surface p-3 shadow-xl">
          <div className="mb-3 flex items-center justify-between gap-4">
            <span className="text-sm font-bold">{title}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="cursor-pointer text-muted hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          <ColorPicker onSelectColor={colorHandler} />
        </div>
      )}
    </div>
  );
}

export default ColorPickerCloseable;
