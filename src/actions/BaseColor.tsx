"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useAtomValue } from "jotai";
import TextureSelector from "../components/TextureSelector";
import ColorPickerCloseable from "../components/ColorPickerCloseable";
import { materialIndexAtom } from "../store/model";
import type { ModelViewerElement, ModelViewerTexture } from "../types/model-viewer";



function BaseColor() {
  const modelViewer = document.querySelector<ModelViewerElement>("model-viewer")!;

  const materialIndex = useAtomValue(materialIndexAtom);
  const [color, setColor] = useState<string>();
  const [defaultColor, setDefaultColor] = useState<number[]>();
  const [initialTexture, setInitialTexture] = useState<ModelViewerTexture | null>(null);
  const [actualTexture, setActualTexture] = useState<string>();

  const material = modelViewer.model.materials[materialIndex];

  async function fileHandler(e: ChangeEvent<HTMLInputElement>) {
    const material = modelViewer.model.materials[materialIndex];

    const newTexture = e.target.files![0];
    const imgTexture = URL.createObjectURL(newTexture);
    setActualTexture(imgTexture);
    const texture = await modelViewer.createTexture(imgTexture);
    material.pbrMetallicRoughness.baseColorTexture.setTexture(texture);
  }

  function getColor(color: string) {
    setColor(color);
    colorHandler(color);
  }

   function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function hexToRgb(hex: string) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      let split = hex.substring(1).split("");
      if (split.length === 3) {
        split = [split[0], split[0], split[1], split[1], split[2], split[2]];
      }
      c = Number("0x" + split.join(""));
      return `${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},1`;
    }
  }

  function colorHandler(color: string) {
    const material = modelViewer.model.materials[materialIndex];
    setColor(color);

    const rgb = hexToRgb(color) as string;
    const rgbArr = rgb
      .split(",")
      .map((numberString) => parseFloat(numberString));

    const newColor = [rgbArr[0] / 255, rgbArr[1] / 255, rgbArr[2] / 255];
    material.pbrMetallicRoughness.setBaseColorFactor(newColor);
  }

  function restoreColor() {
    const material = modelViewer.model.materials[materialIndex];
    material.pbrMetallicRoughness.setBaseColorFactor(defaultColor!);
    const defaultColorHex = rgbToHex(
      defaultColor![0],
      defaultColor![2],
      defaultColor![1],
    );
    setColor(defaultColorHex);
  }

  async function revertTexture() {
    const thumb = await initialTexture?.source?.createThumbnail(48, 48);
    setActualTexture(thumb);
    const material = modelViewer.model.materials[materialIndex];

    material.pbrMetallicRoughness.baseColorTexture.setTexture(initialTexture);
  }

  useEffect(() => {
    const material = modelViewer.model.materials[materialIndex];

    async function getThumb() {
      const thumb =
        await material?.pbrMetallicRoughness?.baseColorTexture?.texture?.source?.createThumbnail(
          48,
          48,
        );
      setInitialTexture(material.pbrMetallicRoughness.baseColorTexture.texture);
      setActualTexture(thumb);
    }

    const rgba = material.pbrMetallicRoughness.baseColorFactor;
    const hex = rgbToHex(rgba[0], rgba[1], rgba[2]);
    setColor(hex);
    setDefaultColor(rgba);
    getThumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getThumb() {
      const thumb =
        await material?.pbrMetallicRoughness?.baseColorTexture?.texture?.source?.createThumbnail(
          48,
          48,
        );
      setInitialTexture(material.pbrMetallicRoughness.baseColorTexture.texture);
      setActualTexture(thumb);
    }
    getThumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialIndex]);

 

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center gap-4">
        <span>Base Color Texture</span>
        <ColorPickerCloseable
          title="Base Color Factor"
          onSelectColor={getColor}
          revertColor={restoreColor}
        />
      </div>

      <TextureSelector
        id="t2"
        title="Base Color Texture"
        fileHandler={fileHandler}
        revertTexture={revertTexture}
        actualTexture={actualTexture}
      />
    </div>
  );
}

export default BaseColor;
