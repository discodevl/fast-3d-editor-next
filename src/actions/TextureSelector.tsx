"use client";

import type { ChangeEvent } from "react";
import { useSetAtom } from "jotai";
import { materialIndexAtom } from "../store/model";
import type { ModelViewerElement } from "../types/model-viewer";
import BaseColor from "./BaseColor";
import Emissive from "./Emissive";
import MetallicRoughness from "./MetallicRoughness";
import Normal from "./Normal";
import Occlusion from "./Occlusion";

function TextureSelector() {
  const setMaterialIndex = useSetAtom(materialIndexAtom);

  const modelViewer = document.querySelector<ModelViewerElement>("model-viewer")!;

  const { materials } = modelViewer.model;

  function materialHandler(e: ChangeEvent<HTMLSelectElement>) {
    setMaterialIndex(Number(e.target.value));
  }

  return (
    <div className="flex flex-col md:mt-4 mt-2">
      <div className="flex justify-center md:mb-4 mb-2">
        <span className="font-bold md:mb-4 mb-2">Textures</span>
      </div>
      <span className="text-center mb-2">Select material</span>
      <select
        className="text-center rounded-lg bg-surface p-2 text-white border border-app-border"
        onChange={materialHandler}
      >
        {materials.map((mat, i) => {
          if (materials[i - 1]?.name === mat.name) return <></>;
          return (
            <option key={i} value={i}>
              {mat.name}
            </option>
          );
        })}
      </select>
      <div className="flex flex-col gap-2">
        <MetallicRoughness />
        <BaseColor />
        <Emissive />
        <Occlusion />
        <Normal />
      </div>
    </div>
  );
}

export default TextureSelector;
