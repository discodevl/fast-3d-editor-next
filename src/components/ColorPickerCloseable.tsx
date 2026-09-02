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

// Keep in sync with Tailwind's default `md` breakpoint used across the app.
const MOBILE_QUERY = "(max-width: 767px)";

function ColorPickerCloseable({
  title,
  onSelectColor,
  revertColor,
}: ColorPickerCloseableProps) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<{ top: number; left: number }>();
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  function toggleHandler() {
    setOpen((open) => !open);
  }

  function colorHandler(color: string) {
    onSelectColor(color);
  }

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    setIsMobile(mql.matches);
    function handleChange(e: MediaQueryListEvent) {
      setIsMobile(e.matches);
    }
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  // On mobile the picker renders as a centered modal, so it doesn't need to
  // be anchored to the trigger icon's position.
  useEffect(() => {
    if (!open || isMobile || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPosition({ top: rect.bottom + 8, left: rect.right });
  }, [open, isMobile]);

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

  const panel = (
    <div
      ref={popupRef}
      style={
        isMobile
          ? undefined
          : {
              top: position?.top,
              left: position?.left,
              transform: "translateX(-100%)",
            }
      }
      className={
        isMobile
          ? "w-full max-w-sm rounded-lg border border-app-border bg-surface p-4"
          : "fixed z-1000 w-max rounded-lg border border-app-border bg-surface p-3 shadow-xl"
      }
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
    </div>
  );

  return (
    <div className="relative" ref={triggerRef}>
      <div onClick={toggleHandler} className="cursor-pointer">
        <IcoColor />
      </div>
      {open &&
        (isMobile || position) &&
        createPortal(
          isMobile ? (
            <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/60 p-4">
              {panel}
            </div>
          ) : (
            panel
          ),
          document.body,
        )}
    </div>
  );
}

export default ColorPickerCloseable;
