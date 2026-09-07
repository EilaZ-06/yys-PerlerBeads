import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SiteNav from "../components/SiteNav";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "阴阳师拼豆图纸生成器",
  description: "上传阴阳师立绘，按 1、4、9 块标准 29×29 底板生成可编辑、可打印的拼豆图纸",
  manifest: `${basePath}/manifest.json`,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "阴阳师拼豆",
  },
  icons: {
    icon: [
      { url: `${basePath}/icon-192x192.png`, sizes: "192x192", type: "image/png" },
      { url: `${basePath}/icon-512x512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: `${basePath}/icon-192x192.png`, sizes: "192x192", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
      >
        <SiteNav />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
