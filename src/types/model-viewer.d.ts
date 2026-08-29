import type { DetailedHTMLProps, HTMLAttributes } from "react";

export interface ModelViewerTexture {
  source: {
    createThumbnail(width: number, height: number): Promise<string>;
  };
}

export interface ModelViewerTextureInfo {
  texture: ModelViewerTexture | null;
  setTexture(texture: ModelViewerTexture | null): void;
}

export interface ModelViewerPBRMetallicRoughness {
  baseColorFactor: number[];
  baseColorTexture: ModelViewerTextureInfo;
  metallicRoughnessTexture: ModelViewerTextureInfo;
  metallicFactor: number;
  roughnessFactor: number;
  setBaseColorFactor(rgba: number[]): void;
  setMetallicFactor(value: number): void;
  setRoughnessFactor(value: number): void;
}

export interface ModelViewerMaterial {
  name: string;
  pbrMetallicRoughness: ModelViewerPBRMetallicRoughness;
  emissiveFactor: number[];
  emissiveTexture: ModelViewerTextureInfo;
  normalTexture: ModelViewerTextureInfo;
  occlusionTexture: ModelViewerTextureInfo;
  setEmissiveFactor(rgb: number[]): void;
}

export interface ModelViewerElement extends HTMLElement {
  src: string;
  model: {
    materials: ModelViewerMaterial[];
  };
  createTexture(uri: string): Promise<ModelViewerTexture>;
  exportScene(options?: Record<string, unknown>): Promise<Blob>;
}

type ModelViewerAttributes = DetailedHTMLProps<
  HTMLAttributes<ModelViewerElement>,
  ModelViewerElement
> & {
  alt?: string;
  src?: string;
  "camera-controls"?: boolean;
  exposure?: number;
  "shadow-intensity"?: number;
  "shadow-softness"?: number;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerAttributes;
    }
  }
}
