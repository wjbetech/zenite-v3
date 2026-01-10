import type { Metadata } from "next";
import { Merriweather, Figtree, Noto_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import "./globals.css";

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" });

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"]
});

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Zenite",
  description: "Your digital planner."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className={`${merriweather.variable} ${notoSans.variable} antialiased flex min-h-screen flex-col`}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
