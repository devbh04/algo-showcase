import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "B&B Finance | Bhangale & Bodke Quantitative Systems",
  description:
    "B&B Finance (Bhangale and Bodke Finance) — Systematic algorithmic trading models, derivative execution engines, and quantitative research for Indian capital markets.",
  keywords: [
    "B&B Finance",
    "Bhangale and Bodke Finance",
    "algorithmic trading",
    "quantitative finance",
    "NSE derivative systems",
    "systematic trading",
  ],
  other: {
    "color-scheme": "light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className="min-h-full flex flex-col bg-white text-[#191c1f] selection:bg-[#494fdf]/15 selection:text-[#191c1f]"
        style={{ backgroundColor: "#ffffff", color: "#191c1f" }}
      >
        <Navbar />
        <main className="flex-1 w-full bg-white">{children}</main>
      </body>
    </html>
  );
}
