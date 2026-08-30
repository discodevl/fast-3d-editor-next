"use client";

import { useAtomValue } from "jotai";
import Luminosity from "../actions/Luminosity";
import Background from "../actions/Background";
import TextureSelector from "../actions/TextureSelector";
import Export from "../actions/Export";
import Doc from "../actions/Doc";
import { modelLoadedAtom } from "../store/model";

interface SideBarProps {
  tab: number;
}

function SideBar({ tab }: SideBarProps) {
  const modelLoaded = useAtomValue(modelLoadedAtom);

  return (
    <div className="flex flex-col w-[21%] h-full bg-sidebar overflow-y-auto">
      <div className="m-2 h-full">
        {tab === 0 && <Doc />}
        {tab === 1 && <Luminosity />}
        {tab === 2 && (modelLoaded ? <TextureSelector /> : <p>Loading model…</p>)}
        {tab === 3 && <Background />}
        {tab === 4 && <Export />}
      </div>
    </div>
  );
}

export default SideBar;
