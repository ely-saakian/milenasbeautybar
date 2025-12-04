import type { Metadata } from "next";
import { EB_Garamond, Figtree } from "next/font/google";
import "./globals.css";
import ogImage from "./opengraph-image.png";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const siteUrl = "https://milenasbeautybar.com";

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
  openGraph: {
    type: "website",
    siteName: "Milena's Beauty Bar",
    title: "Milena's Beauty Bar | Lash & Brow Services in Federal Way, WA",
    description:
      "Professional lash extensions, lash lifts, brow lamination, brow waxing & tinting in Federal Way, WA. Licensed Master Esthetician since 2018. Book your appointment today!",
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}${ogImage.src}`,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milena's Beauty Bar | Lash & Brow Services in Federal Way, WA",
    description:
      "Professional lash extensions, lash lifts, brow lamination, brow waxing & tinting in Federal Way, WA. Licensed Master Esthetician since 2018. Book your appointment today!",
    images: [
      {
        url: `${siteUrl}${ogImage.src}`,
        width: ogImage.width,
        height: ogImage.height,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ebGaramond.variable} ${figtree.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
