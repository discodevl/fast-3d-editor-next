"use client";

import { useState } from "react";
import { HexColorPicker, HexColorInput } from "react-colorful";

//colors must be hex
const COLORS_PRIMARY = [
  "#ffffff",
  "#FF9999",
  "#99FF99",
  "#99CCFF",
  "#CC99FF",
  "#FFFF99",
  "#FFCC99",
];
const COLORS_SECONDARY = [
  "#b4b4b4",
  "#FF3333",
  "#33FF33",
  "#3399FF",
  "#9933FF",
  "#FFFF33",
  "#FF9933",
];
const COLORS_TERTIARY = [
  "#202020",
  "#CC0000",
  "#00CC00",
  "#0080FF",
  "#6600CC",
  "#CCCC00",
  "#CC6600",
];

interface ColorPickerProps {
  title?: string;
  onSelectColor: (color: string) => void;
}

function ColorPicker({ title, onSelectColor }: ColorPickerProps) {
  const [toggleColorPicker, setToggleColorPicker] = useState(false);
  const [color, setColor] = useState("");

  function toggleHandler() {
    setToggleColorPicker((toggle) => !toggle);
  }

  function selectColor(color: string) {
    onSelectColor(color);
    setColor(color);
  }

  return (
    <div className="flex flex-col items-center">
      <span className="text-center font-bold mb-5">{title}</span>
      <div className="flex">
        {COLORS_PRIMARY.map((color, i) => (
          <div
            key={i}
            className="w-5 h-5 border border-black m-1 cursor-pointer hover:border-white"
            style={{ backgroundColor: color }}
            onClick={() => selectColor(color)}
          ></div>
        ))}
      </div>
      <div className="flex">
        {COLORS_SECONDARY.map((color, i) => (
          <div
            key={i}
            className="w-5 h-5 border border-black m-1 cursor-pointer hover:border-white"
            style={{ backgroundColor: color }}
            onClick={() => selectColor(color)}
          ></div>
        ))}
      </div>
      <div className="flex">
        {COLORS_TERTIARY.map((color, i) => (
          <div
            key={i}
            className="w-5 h-5 border border-black m-1 cursor-pointer hover:border-white"
            style={{ backgroundColor: color }}
            onClick={() => selectColor(color)}
          ></div>
        ))}
      </div>
      <div className="flex flex-col items-center w-full">
        <button
          className="mt-2.5 p-2 rounded-lg text-white w-full bg-surface border border-app-border cursor-pointer hover:opacity-50"
          onClick={toggleHandler}
        >
          Custom color
        </button>
        {toggleColorPicker ? (
          <div className="mt-2">
            <HexColorPicker color={color} onChange={(color) => selectColor(color)} />
            #
            <HexColorInput
              className="border border-[#808080] bg-transparent rounded-[5px]"
              color={color}
              onChange={(color) => selectColor(color)}
            />{" "}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ColorPicker;
