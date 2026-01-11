import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { merriweather, figtree, notoSans, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";

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
      <body
        className={`${merriweather.variable} ${notoSans.variable} ${jetbrainsMono.variable} antialiased flex min-h-screen flex-col bg-orange-50/50`}>
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
