"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import SvgBack from "../../components/SvgBack";
import Slider from "../../components/Slider";
import { materialIndexAtom } from "../../store/model";
import type { ModelViewerElement } from "../../types/model-viewer";

function Roughness() {
  const materialIndex = useAtomValue(materialIndexAtom);
  const modelViewer = document.querySelector<ModelViewerElement>("model-viewer")!;
  const materialSelected = modelViewer.model.materials[materialIndex];

  const [roughnessValue, setRoughnessValue] = useState<number>(0);

  const [defaultValue, setDefaultValue] = useState<number[]>([]);

  function roughnessHandler(value: number) {
    materialSelected.pbrMetallicRoughness.setRoughnessFactor(value);
    setRoughnessValue(value);
  }

  function revertValue() {
    (document.getElementById("range-roughness") as HTMLInputElement).value =
      String(defaultValue[materialIndex]);
    materialSelected.pbrMetallicRoughness.setRoughnessFactor(
      defaultValue[materialIndex],
    );
    setRoughnessValue(defaultValue[materialIndex]);
  }

  useEffect(() => {
    const listDefault: number[] = [];
    listDefault[materialIndex] =
      materialSelected.pbrMetallicRoughness.roughnessFactor;
    setDefaultValue([...listDefault]);
    setRoughnessValue(materialSelected.pbrMetallicRoughness.roughnessFactor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listDefault = [...defaultValue];
    (document.getElementById("range-roughness") as HTMLInputElement).value =
      String(materialSelected.pbrMetallicRoughness.roughnessFactor);
    if (!defaultValue[materialIndex]) {
      listDefault[materialIndex] =
        materialSelected.pbrMetallicRoughness.roughnessFactor;
      setDefaultValue([...listDefault]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialIndex]);

  return (
    <div className="flex items-center justify-center mt-2.5 gap-4">
      <div className="w-full">
        <Slider
          id="range-roughness"
          title="Roughness"
          min={-1.5}
          max={1.5}
          step={0.1}
          value={roughnessValue}
          onChange={roughnessHandler}
        />
      </div>
      <div className="mx-auto cursor-pointer" onClick={revertValue}>
        <SvgBack />
      </div>
    </div>
  );
}

export default Roughness;
