"use client";

import { useAtom } from "jotai";
import Slider from "../components/Slider";
import {
  exposureAtom,
  shadowIntensityAtom,
  shadowSoftnessAtom,
} from "../store/model";

function Luminosity() {
  const [exposure, setExposure] = useAtom(exposureAtom);
  const [shadowIntensity, setShadowIntensity] = useAtom(shadowIntensityAtom);
  const [shadowSoftness, setShadowSoftness] = useAtom(shadowSoftnessAtom);

  return (
    <div className="flex flex-col ml-2 mt-2">
      <div className="flex justify-center mb-[15px]">
        <span className="font-bold">Lightining</span>
      </div>
      <Slider title="Exposure" min={0} max={2} step={0.1} value={exposure} onChange={setExposure} />
      {/* SHADOW */}
      <Slider title="Shadow Intensity" min={0} max={1} step={0.1} value={shadowIntensity} onChange={setShadowIntensity} />
      <Slider title="Shadow Softness" min={0} max={1} step={0.1} value={shadowSoftness} onChange={setShadowSoftness} />
    </div>
  );
}

export default Luminosity;
