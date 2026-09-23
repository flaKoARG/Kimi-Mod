import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kimi Mod — Tienda de Indumentaria",
  description: "Kimi Mod. Moda urbana para mujer y hombre: pantalones, remeras, camperas y polleras. Envíos a todo el país.",
  keywords: ["Kimi Mod", "ropa", "moda", "indumentaria", "remeras", "pantalones", "camperas", "polleras", "hombre", "mujer"],
  authors: [{ name: "Kimi Mod" }],
  icons: {
    icon: "/images/logo/logo.svg",
    shortcut: "/images/logo/logo.svg",
    apple: "/images/logo/logo.svg",
  },
  openGraph: {
    title: "Kimi Mod — Tienda de Indumentaria",
    description: "Moda urbana para mujer y hombre. Pantalones, remeras, camperas y polleras.",
    siteName: "Kimi Mod",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kimi Mod — Tienda de Indumentaria",
    description: "Moda urbana para mujer y hombre.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
