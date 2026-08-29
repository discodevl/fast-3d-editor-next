import Luminosity from "../actions/Luminosity";
import Background from "../actions/Background";
import TextureSelector from "../actions/TextureSelector";
import Export from "../actions/Export";
import Doc from "../actions/Doc";

function SideBar({ tab }) {
  return (
    <div className="flex flex-col w-[21%] h-full bg-sidebar overflow-y-auto">
      <div className="m-2">
        {tab === 0 && <Doc />}
        {tab === 1 && <Luminosity />}
        {tab === 2 && <TextureSelector />}
        {tab === 3 && <Background />}
        {tab === 4 && <Export />}
      </div>
    </div>
  );
}

export default SideBar;
