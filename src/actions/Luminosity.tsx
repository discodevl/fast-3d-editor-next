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
    <div className="flex flex-col ml-2 mt-2 gap-4">
      <div className="flex justify-center mb-[15px]">
        <span className="font-bold">Lightining</span>
      </div>
      <div className="flex flex-col gap-1">
        <Slider
          title="Exposure"
          min={0}
          max={2}
          step={0.1}
          value={exposure}
          onChange={setExposure}
        />
        <p className="text-[10px]">Controls the exposure of the model</p>
      </div>
      {/* SHADOW */}
      <div>
        <Slider
          title="Shadow Intensity"
          min={0}
          max={1}
          step={0.1}
          value={shadowIntensity}
          onChange={setShadowIntensity}
        />
        <p className="text-[10px]">Controls the opacity of the shadow</p>
      </div>
      <div>
        <Slider
          title="Shadow Softness"
          min={0}
          max={1}
          step={0.1}
          value={shadowSoftness}
          onChange={setShadowSoftness}
        />
        <p className="text-[10px]">Controls the blurriness of the shadow</p>
      </div>
    </div>
  );
}

export default Luminosity;
