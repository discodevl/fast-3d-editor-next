"use client";

import { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { Tooltip } from "react-tooltip";
import {
  srcAtom,
  exposureAtom,
  shadowIntensityAtom,
  shadowSoftnessAtom,
} from "../store/model";
import { backgroundColorAtom } from "../store/config";

function ModelViewer() {
  const inputRef = useRef();

  const [exposure] = useAtom(exposureAtom);
  const [shadowIntensity] = useAtom(shadowIntensityAtom);
  const [shadowSoftness] = useAtom(shadowSoftnessAtom);
  const [src, setSrc] = useAtom(srcAtom);

  const [bgColor] = useAtom(backgroundColorAtom);

  function handleFile(e) {
    const modelUpload = e.target.files[0];
    const src = URL.createObjectURL(modelUpload);
    setSrc(src);
  }

  useEffect(() => {
    setSrc("/Astronaut.glb");
  }, [setSrc]);

  function handleBtnUpload(e) {
    e.preventDefault();
    inputRef.current.click();
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".glb"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      <div
        className="fixed z-10 right-2.5 top-2.5 cursor-pointer"
        data-tooltip-id="glb_tooltip"
        data-tooltip-content="Upload you own .glb file"
        onClick={handleBtnUpload}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
        </svg>
      </div>
      <Tooltip id="glb_tooltip" />
      <div
        className="flex justify-center items-center w-[75%]"
        style={{ backgroundColor: bgColor }}
      >
        <model-viewer
          id="mv"
          className="h-full w-full"
          alt="model viewer with fast 3d editor"
          src={src}
          camera-controls
          exposure={exposure}
          shadow-intensity={shadowIntensity}
          shadow-softness={shadowSoftness}
        ></model-viewer>
      </div>
    </>
  );
}

export default ModelViewer;
