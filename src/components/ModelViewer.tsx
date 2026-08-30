"use client";

import { useEffect, useRef } from "react";
import type { ChangeEvent, MouseEvent } from "react";
import { useAtom, useSetAtom } from "jotai";
import { Tooltip } from "react-tooltip";
import {
  srcAtom,
  modelLoadedAtom,
  exposureAtom,
  shadowIntensityAtom,
  shadowSoftnessAtom,
} from "../store/model";
import { backgroundColorAtom } from "../store/config";
import type { ModelViewerElement } from "../types/model-viewer";

function ModelViewer() {
  const inputRef = useRef<HTMLInputElement>(null);
  const modelViewerRef = useRef<ModelViewerElement>(null);

  const [exposure] = useAtom(exposureAtom);
  const [shadowIntensity] = useAtom(shadowIntensityAtom);
  const [shadowSoftness] = useAtom(shadowSoftnessAtom);
  const [src, setSrc] = useAtom(srcAtom);
  const setModelLoaded = useSetAtom(modelLoadedAtom);

  const [bgColor] = useAtom(backgroundColorAtom);

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const modelUpload = e.target.files![0];
    const src = URL.createObjectURL(modelUpload);
    setSrc(src);
  }

  useEffect(() => {
    setSrc("/Astronaut.glb");
  }, [setSrc]);

  // The model-viewer element only has usable `.model` data once it fires
  // "load" for the current src, so gate consumers on that instead of
  // assuming it's ready as soon as the element mounts.
  useEffect(() => {
    setModelLoaded(false);
    const el = modelViewerRef.current;
    if (!el) return;
    function handleLoad() {
      setModelLoaded(true);
    }
    el.addEventListener("load", handleLoad);
    return () => el.removeEventListener("load", handleLoad);
  }, [src, setModelLoaded]);

  function handleBtnUpload(e: MouseEvent<HTMLDivElement>) {
    e.preventDefault();
    inputRef.current!.click();
  }

  return (
    <div
      className="relative flex flex-1 min-w-0 justify-center items-center"
      style={{ backgroundColor: bgColor }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".glb"
        onChange={handleFile}
        style={{ display: "none" }}
      />
      <div
        className="absolute z-10 right-2.5 top-2.5 cursor-pointer"
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
      <model-viewer
        ref={modelViewerRef}
        id="mv"
        className="h-full w-full"
        alt="model viewer with fast 3d editor"
        src={src}
        camera-controls
        exposure={exposure}
        shadow-intensity={shadowIntensity}
        shadow-softness={shadowSoftness}
        suppressHydrationWarning
      ></model-viewer>
    </div>
  );
}

export default ModelViewer;
