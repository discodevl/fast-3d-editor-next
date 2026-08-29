import { Provider } from "jotai";
import MainSideBar from "./MainSideBar";
import ModelViewer from "./ModelViewer";
import SideBar from "./SideBar";

interface AppShellProps {
  tab: number;
}

export default function AppShell({ tab }: AppShellProps) {
  return (
    <Provider>
      <div className="flex w-screen h-screen">
        <MainSideBar tab={tab} />
        <SideBar tab={tab} />
        <ModelViewer />
      </div>
    </Provider>
  );
}
