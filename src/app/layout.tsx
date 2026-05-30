import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Syne } from "next/font/google";
import {
  CATCHPHRASE_PRIMARY,
  CATCHPHRASE_SECONDARY,
} from "@/lib/brand";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "937 The Underground | Where Dayton Goes Off-Script",
  description: `${CATCHPHRASE_PRIMARY} ${CATCHPHRASE_SECONDARY} Raw, unsigned Rock, Country, and Hip-Hop streamed from Dayton's independent radio station.`,
  openGraph: {
    title: "937 The Underground",
    description: `${CATCHPHRASE_PRIMARY} ${CATCHPHRASE_SECONDARY}`,
    url: "https://937theunderground.com",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${plusJakarta.variable}`}>
      <body className="font-[family-name:var(--font-body)] antialiased safe-x">{children}</body>
    </html>
  );
}
