"use client";

import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import SvgBack from "../../components/SvgBack";
import Slider from "../../components/Slider";
import { materialIndexAtom } from "../../store/model";

function Metalness() {
  const materialIndex = useAtomValue(materialIndexAtom);
  const modelViewer = document.querySelector("model-viewer");
  const materialSelected = modelViewer.model.materials[materialIndex];

  const [metalValue, setMetalValue] = useState();

  const [defaultValue, setDefaultValue] = useState([]);

  function metalnessHandler(value) {
    materialSelected.pbrMetallicRoughness.setMetallicFactor(value);
    setMetalValue(value);
  }

  function revertValue() {
    document.getElementById("range-metal").value = defaultValue[materialIndex];
    materialSelected.pbrMetallicRoughness.setMetallicFactor(
      defaultValue[materialIndex],
    );
    setMetalValue(defaultValue[materialIndex]);
  }

  useEffect(() => {
    const listDefault = [];
    listDefault[materialIndex] =
      materialSelected.pbrMetallicRoughness.metallicFactor;
    setDefaultValue([...listDefault]);
    setMetalValue(materialSelected.pbrMetallicRoughness.metallicFactor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const listDefault = [...defaultValue];
    document.getElementById("range-metal").value =
      materialSelected.pbrMetallicRoughness.metallicFactor;
    if (!defaultValue[materialIndex]) {
      listDefault[materialIndex] =
        materialSelected.pbrMetallicRoughness.metallicFactor;
      setDefaultValue([...listDefault]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialIndex]);

  return (
    <div className="flex items-center justify-center mt-2.5 gap-4">
      <div className="w-full">
        <Slider
          id="range-metal"
          title="Metalness"
          value={metalValue}
          min={-1.5}
          max={1.5}
          step={0.1}
          onChange={metalnessHandler}
        />
      </div>
      <div className="mx-auto cursor-pointer" onClick={revertValue}>
        <SvgBack />
      </div>
    </div>
  );
}

export default Metalness;
