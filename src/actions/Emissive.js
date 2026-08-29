"use client";

import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import ColorPickerCloseable from "../components/ColorPickerCloseable";
import TextureSelector from "../components/TextureSelector";
import { materialIndexAtom } from "../store/model";

function Emissive() {
  const modelViewer = document.querySelector("model-viewer");
  const materialIndex = useAtomValue(materialIndexAtom);

  const [color, setColor] = useState();
  const [defaultColor, setDefaultColor] = useState();
  const [initialTexture, setInitialTexture] = useState();
  const [actualTexture, setActualTexture] = useState();

  const material = modelViewer.model.materials[materialIndex];

  async function fileHandler(e) {
    const material = modelViewer.model.materials[materialIndex];

    const newTexture = e.target.files[0];
    const imgTexture = URL.createObjectURL(newTexture);
    setActualTexture(imgTexture);
    const texture = await modelViewer.createTexture(imgTexture);
    material.emissiveTexture.setTexture(texture);
  }

  function getColor(color) {
    setColor(color);
    colorHandler(color);
  }

  function colorHandler(color) {
    const material = modelViewer.model.materials[materialIndex];
    setColor(color);

    const rgb = hexToRgb(color);
    const rgbArr = rgb
      .split(",")
      .map((numberString) => parseFloat(numberString));

    const newColor = [rgbArr[0] / 255, rgbArr[1] / 255, rgbArr[2] / 255];
    material.setEmissiveFactor(newColor);
  }

  function restoreColor() {
    const material = modelViewer.model.materials[materialIndex];
    const defaultColorHex = rgbToHex(
      defaultColor[0],
      defaultColor[2],
      defaultColor[1],
    );
    setColor(defaultColorHex);
    material.setEmissiveFactor(defaultColor);
  }

  async function revertTexture() {
    const thumb = await initialTexture?.source?.createThumbnail(48, 48);
    setActualTexture(thumb);
    const material = modelViewer.model.materials[materialIndex];

    material.emissiveTexture.setTexture(initialTexture);
  }

  useEffect(() => {
    const material = modelViewer.model.materials[materialIndex];

    const rgba = material.emissiveFactor;
    const hex = rgbToHex(rgba[0], rgba[1], rgba[2]);
    setColor(hex);
    setDefaultColor(rgba);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function getThumb() {
      const thumb =
        await material?.emissiveTexture?.texture?.source?.createThumbnail(
          48,
          48,
        );
      setInitialTexture(material.emissiveTexture.texture);
      setActualTexture(thumb);
    }
    getThumb();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [materialIndex]);

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  function hexToRgb(hex) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split("");
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = "0x" + c.join("");
      return `${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",")},1`;
    }
  }

  return (
    <div className="flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span>Emissive Texture</span>
        <ColorPickerCloseable
          title="Emissive Texture"
          onSelectColor={getColor}
          revertColor={restoreColor}
        />
      </div>

      <TextureSelector
        id="t3"
        title="Emissive Texture"
        fileHandler={fileHandler}
        revertTexture={revertTexture}
        actualTexture={actualTexture}
      />
    </div>
  );
}

export default Emissive;
