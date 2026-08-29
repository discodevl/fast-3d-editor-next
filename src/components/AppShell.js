"use client";

import { useState } from "react";
import { Provider } from "jotai";
import MainSideBar from "./MainSideBar";
import ModelViewer from "./ModelViewer";
import SideBar from "./SideBar";

function App() {
  const [tab, setTab] = useState(0);

  function tabHandler(tab) {
    setTab(tab);
  }

  return (
    <div className="flex w-screen h-screen">
      <MainSideBar onChangeTab={tabHandler} />
      <SideBar tab={tab} />
      <ModelViewer />
    </div>
  );
}

export default function AppShell() {
  return (
    <Provider>
      <App />
    </Provider>
  );
}
