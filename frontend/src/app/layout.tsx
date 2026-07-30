import type { Metadata } from "next";
import { Inter, Sora, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "TradeFXBook — Trading Dashboard & Journal",
  description: "TradeFXBook turns your trading history into your edge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
 }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-[#0a0d14] text-[#eef1f8] font-sans">
        {children}
      </body>
    </html>
  );
}
