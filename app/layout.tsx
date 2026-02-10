import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // <--- WAJIB ADA INI

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SANN404 Image Compressor",
  description: "Aplikasi kompres foto online gratis, aman, dan tanpa watermark.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
