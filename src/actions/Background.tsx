"use client";

import { useSetAtom } from "jotai";
import ColorPicker from "../components/ColorPicker";
import { backgroundColorAtom } from "../store/config";

function Background() {
  const setBackgroundColor = useSetAtom(backgroundColorAtom);

  function colorHandler(color: string) {
    setBackgroundColor(color);
  }

  return (
    <div className="flex flex-col items-center ml-[5px]">
      <ColorPicker title="Background Color" onSelectColor={colorHandler} />
    </div>
  );
}

export default Background;
