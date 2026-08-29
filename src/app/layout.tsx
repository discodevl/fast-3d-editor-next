import type { ReactNode } from "react";
import { IBM_Plex_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "Fast 3D Editor",
  description: "Edit your 3D models ",
  keywords: "3d, editor, simple, fast",
  icons: {
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={ibmPlexMono.variable} suppressHydrationWarning>
      <body className="font-[family-name:var(--font-ibm-plex-mono)] text-white m-0">
        {children}
        <Analytics />
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
