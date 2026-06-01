import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SILUET BASIC — Handmade for you!",
  description: "SILUET BASIC — Toshkent bo'ylab keng tarmoqli filiallarimizda sizni eng baxtli lahzalaringiz uchun hamroh bo'ladigan liboslar kutmoqda.",
  keywords: ["SILUET BASIC", "fashion", "Uzbekistan", "traditional clothing", "modern style"],
  icons: {
    icon: "/images/siluette_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
