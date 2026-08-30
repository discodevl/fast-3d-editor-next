"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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
  const [position, setPosition] = useState<{ top: number; left: number }>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function toggleHandler() {
    setOpen((open) => !open);
  }

  function colorHandler(color: string) {
    onSelectColor(color);
  }

  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, left: rect.right });
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
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
    <div className="relative" ref={triggerRef}>
      <div onClick={toggleHandler} className="cursor-pointer">
        <IcoColor />
      </div>
      {open &&
        position &&
        createPortal(
          <div
            ref={popupRef}
            style={{ top: position.top, left: position.left, transform: "translateX(-100%)" }}
            className="fixed z-1000 w-max rounded-lg border border-app-border bg-surface p-3 shadow-xl"
          >
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
          </div>,
          document.body,
        )}
    </div>
  );
}

export default ColorPickerCloseable;
