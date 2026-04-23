import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "cyrillic"], display: "swap" });

export const metadata: Metadata = {
  title: "Kaeru | Знайди свою подію",
  description: "Зручна платформа для пошуку, бронювання квитків та створення івентів.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${inter.className} min-h-screen flex flex-col bg-background text-foreground antialiased`}>
        {/* Скрипт тепер лежить тут, одразу всередині body! */}
        <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
        
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}