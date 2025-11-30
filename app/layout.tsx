import type { Metadata } from "next";
import { EB_Garamond, Figtree } from "next/font/google";
import "./globals.css";

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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Milena's Beauty Bar",
    title: "Milena's Beauty Bar | Lash & Brow Services in Federal Way, WA",
    description:
      "Professional lash extensions, lash lifts, brow lamination & waxing in Federal Way, WA. Licensed Master Esthetician since 2018. Book your appointment today!",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Milena's Beauty Bar - Lash & Brow Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milena's Beauty Bar | Lash & Brow Services in Federal Way, WA",
    description:
      "Professional lash extensions, lash lifts, brow lamination & waxing in Federal Way, WA. Book your appointment today!",
    images: ["/og-image.png"],
  },
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
