"use client";

import dynamic from "next/dynamic";

const AppShell = dynamic(() => import("./AppShell"), { ssr: false });

interface AppShellLoaderProps {
  tab: number;
}

export default function AppShellLoader({ tab }: AppShellLoaderProps) {
  return <AppShell tab={tab} />;
}
