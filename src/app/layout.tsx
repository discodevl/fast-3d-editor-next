import type { Metadata, Viewport } from "next";
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
const title = "Glb Editor — Edit Models in the Browser";
const description =
  "Free browser-based editor for .glb 3D models. Adjust lighting and shadows, edit PBR materials (base color, metallic, roughness, emissive, normal, occlusion), change the scene background, and export your model — no install required.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | Fast 3D Editor",
  },
  description,
  keywords: [
    "3D editor",
    "GLB editor",
    "3D model viewer",
    "online 3D editor",
    "PBR texture editor",
    "model-viewer",
    "browser 3D tool",
    "free 3D editor"
  ],
  applicationName: "Fast 3D Editor",
  authors: [{ name: "Fast 3D Editor" }],
  category: "technology",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Fast 3D Editor",
    title,
    description,
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "Fast 3D Editor",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/logo512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
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
