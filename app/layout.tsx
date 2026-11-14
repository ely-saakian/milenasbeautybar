import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { getBookingMode } from "@/lib/get-booking-mode";
import { BookingModeProvider } from "./components/booking-mode-provider";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const siteUrl = "https://www.milenasbeautybar.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Milena's Beauty Bar | Lash & Brow Services in Federal Way, WA",
    template: "%s | Milena's Beauty Bar",
  },
  description:
    "Professional lash extensions, lash lifts, brow lamination, brow waxing & tinting in Federal Way, WA. Licensed Master Esthetician since 2018. Book your appointment today!",
  keywords: [
    "lash extensions Federal Way",
    "brow lamination Federal Way WA",
    "lash lift Federal Way",
    "brow waxing near me",
    "lash tint Federal Way",
    "brow tinting",
    "facial waxing Federal Way",
    "esthetician Federal Way WA",
    "beauty bar Federal Way",
    "eyelash extensions",
    "volume lashes",
    "classic lashes",
    "wispy lashes",
  ],
  authors: [{ name: "Milena's Beauty Bar" }],
  creator: "Milena's Beauty Bar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProd = process.env.NODE_ENV === "production";
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const bookingMode = await getBookingMode();

  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} antialiased`}
      >
        <BookingModeProvider mode={bookingMode}>{children}</BookingModeProvider>
      </body>
      {isProd && gaId && <GoogleAnalytics gaId={gaId} />}
    </html>
  );
}
