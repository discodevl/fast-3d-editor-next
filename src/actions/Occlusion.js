"use client";

import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import TextureSelector from "../components/TextureSelector";
import { materialIndexAtom } from "../store/model";

function Occlusion() {
  const modelViewer = document.querySelector("model-viewer");
  const materialIndex = useAtomValue(materialIndexAtom);

  const [initialTexture, setInitialTexture] = useState();
  const [actualTexture, setActualTexture] = useState();

  const material = modelViewer.model.materials[materialIndex];

  async function fileHandler(e) {
    const material = modelViewer.model.materials[materialIndex];

    const newTexture = e.target.files[0];
    const imgTexture = URL.createObjectURL(newTexture);
    setActualTexture(imgTexture);
    const texture = await modelViewer.createTexture(imgTexture);
    material.occlusionTexture.setTexture(texture);
  }

  async function revertTexture() {
    const thumb = await initialTexture?.source?.createThumbnail(48, 48);
    setActualTexture(thumb);
    const material = modelViewer.model.materials[materialIndex];

    material.occlusionTexture.setTexture(initialTexture);
  }

  useEffect(() => {
    async function getThumb() {
      const thumb =
        await material?.occlusionTexture?.texture?.source?.createThumbnail(
          48,
          48,
        );
      setInitialTexture(material.occlusionTexture.texture);
      setActualTexture(thumb);
    }
    getThumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialIndex]);

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span>Occlusion Texture</span>
      </div>

      <TextureSelector
        id="t4"
        title="Occlusion Texture"
        fileHandler={fileHandler}
        revertTexture={revertTexture}
        actualTexture={actualTexture}
      />
    </div>
  );
}

export default Occlusion;
