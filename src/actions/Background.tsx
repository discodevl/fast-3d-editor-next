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
    <div className="flex flex-col items-center justify-center gap-4">
      <h2 className="font-bold">Change background color</h2>
      <p>The background color is visualization only, it wont affect your model</p>
      <div className="">

      <ColorPicker title="Background Color" onSelectColor={colorHandler} />
      </div>
    </div>
  );
}

export default Background;
