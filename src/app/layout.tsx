import type { Metadata } from "next";
import { Space_Mono, VT323 } from "next/font/google";
import "./globals.css";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pixel-title",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel-body",
});

export const metadata: Metadata = {
  title: "Marklog - GitHub 博客平台",
  description: "访问 xxx.com/[用户名]/[仓库名] 查看博客",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${spaceMono.variable} ${vt323.variable} font-pixel-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
