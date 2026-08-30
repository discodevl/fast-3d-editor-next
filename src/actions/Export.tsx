"use client";

import { useSetAtom } from "jotai";
import { srcAtom } from "../store/model";
import type { ModelViewerElement } from "../types/model-viewer";

function Export() {
  const setSrc = useSetAtom(srcAtom);
  let modelViewer = document.querySelector<ModelViewerElement>("model-viewer")!;

  async function saveHandler() {
    const glTF = await modelViewer.exportScene();
    let file = new File([glTF], "your-3dmodel.glb");

    var link = document.createElement("a");
    link.download = file.name;
    link.href = URL.createObjectURL(file);
    link.click();
  }

  function discardHandler() {
    //to fix
    const mv = document.querySelector<ModelViewerElement>("model-viewer")!;
    mv.src = "";
    setSrc("");
  }

  return (
    <div className="flex flex-col items-center gap-4 mt-6.25">
      {/* <button className="mb-5 p-2 rounded-lg text-white w-full bg-surface border border-app-border cursor-pointer hover:opacity-50" onClick={discardHandler}>Discard Model</button> */}
      <h2 className="font-bold">Export your glb model</h2>
      <p>Download you modified model, leaving the page without exporting your model will result the loss of your modifications</p>
      <button
        className="mb-5 p-2 rounded-lg text-white w-full bg-surface border border-app-border cursor-pointer hover:opacity-50"
        onClick={saveHandler}
      >
        Export
      </button>
    </div>
  );
}

export default Export;
