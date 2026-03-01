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
  title: "Marklog - GitHub Platform for Builders",
  description: "Visit marklog.xyz/[username]/[repo] to view your blog",
  icons: {
    icon: "/favicon.png",
  },
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
