import { Merriweather, Figtree, Noto_Sans, Inconsolata } from "next/font/google";

export const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-merriweather",
  display: "swap"
});

export const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const jetbrainsMono = Inconsolata({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});
