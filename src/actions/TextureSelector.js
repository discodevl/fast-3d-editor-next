"use client";

import { useSetAtom } from "jotai";
import { materialIndexAtom } from "../store/model";
import BaseColor from "./BaseColor";
import Emissive from "./Emissive";
import MetallicRoughness from "./MetallicRoughness";
import Normal from "./Normal";
import Occlusion from "./Occlusion";

function TextureSelector() {
  const setMaterialIndex = useSetAtom(materialIndexAtom);

  const modelViewer = document.querySelector("model-viewer");

  const { materials } = modelViewer.model;

  function materialHandler(e) {
    setMaterialIndex(e.target.value);
  }

  return (
    <div className="flex flex-col ml-2 mt-[15px]">
      <div className="flex justify-center mb-[15px]">
        <span className="font-bold mb-[15px]">Textures</span>
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
