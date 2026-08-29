"use client";

import { useEffect, useRef, useState } from "react";
import ColorPicker from "./ColorPicker";
import IcoColor from "./IcoColor";

function ColorPickerCloseable({ title, onSelectColor, revertColor }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  function toggleHandler() {
    setOpen((open) => !open);
  }

  function colorHandler(color) {
    onSelectColor(color);
  }

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative flex flex-col" ref={containerRef}>
      <div className="flex items-center justify-between w-full">
        <div onClick={toggleHandler}>
          <IcoColor />
        </div>
      </div>
      {open && (
        <div>
          <ColorPicker onSelectColor={colorHandler} />
        </div>
      )}
    </div>
  );
}

export default ColorPickerCloseable;
