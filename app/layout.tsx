import type { Metadata } from "next";
import { Inter, Hina_Mincho, Dela_Gothic_One } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const hinaMincho = Hina_Mincho({
  subsets: ["latin"], // "latin"のみでOK（日本語対応）
  weight: "400",
  display: "swap",
  variable: "--font-hina",
});

const delaGothicOne = Dela_Gothic_One({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dela",
});

export const metadata: Metadata = {
  title: "記憶によって形成される風景",
  description: "かつてその場に存在した音—人の声、足音、風や波の響き—を、粒子状の光として表現し、空間に残された気配や痕跡を静かに描き出します。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} ${hinaMincho.variable} ${delaGothicOne.variable}`}>
      <body className="bg-white text-gray-800">{children}</body>
    </html>
  );
}
