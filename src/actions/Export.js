"use client";

import { useSetAtom } from "jotai";
import { srcAtom } from "../store/model";

function Export() {
  const setSrc = useSetAtom(srcAtom);
  let modelViewer = document.querySelector("model-viewer");

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
    const mv = document.querySelector("model-viewer");
    mv.src = "";
    setSrc("");
  }

  return (
    <div className="flex flex-col items-center mt-[25px]">
      {/* <button className="mb-5 p-2 rounded-lg text-white w-full bg-surface border border-app-border cursor-pointer hover:opacity-50" onClick={discardHandler}>Discard Model</button> */}

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
