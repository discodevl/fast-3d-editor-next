"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useAtomValue } from "jotai";
import Metalness from "./MetallicRoughness/Metalness";
import Roughness from "./MetallicRoughness/Roughness";
import TextureSelector from "../components/TextureSelector";
import { materialIndexAtom } from "../store/model";
import type { ModelViewerElement, ModelViewerTexture } from "../types/model-viewer";

function MetallicRoughness() {
  const [initialTexture, setInitialTexture] = useState<ModelViewerTexture | null>(null);
  const [actualTexture, setActualTexture] = useState<string>();

  const modelViewer = document.querySelector<ModelViewerElement>("model-viewer")!;
  const materialIndex = useAtomValue(materialIndexAtom);

  const material = modelViewer.model.materials[materialIndex];

  async function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    const newTexture = e.target.files![0];
    const imgTexture = URL.createObjectURL(newTexture);
    setActualTexture(imgTexture);
    const texture = await modelViewer.createTexture(imgTexture);
    material.pbrMetallicRoughness.metallicRoughnessTexture.setTexture(texture);
  }

  async function revertTexture() {
    const thumb = await initialTexture?.source?.createThumbnail(48, 48);
    setActualTexture(thumb);

    material.pbrMetallicRoughness.metallicRoughnessTexture.setTexture(
      initialTexture,
    );
  }

  useEffect(() => {
    async function getThumb() {
      const thumb =
        await material?.pbrMetallicRoughness?.metallicRoughnessTexture?.texture?.source?.createThumbnail(
          48,
          48,
        );
      setInitialTexture(
        material.pbrMetallicRoughness.metallicRoughnessTexture.texture,
      );
      setActualTexture(thumb);
    }
    getThumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialIndex]);

  return (
    <div className="flex flex-col p-[5px] rounded-lg">
      <span>Metallic Texture</span>
      <TextureSelector
        id="t1"
        title="Metallic Roughness Texture"
        fileHandler={fileHandler}
        revertTexture={revertTexture}
        actualTexture={actualTexture}
      />
      <Metalness />
      <Roughness />
    </div>
  );
}

export default MetallicRoughness;
