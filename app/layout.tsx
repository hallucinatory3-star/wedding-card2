import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE } from "./constants/wedding-data";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const groomName = GROOM_NAME;
const brideName = BRIDE_NAME;
const weddingDate = WEDDING_DATE.toLocaleDateString("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

// UPDATE THIS to your actual Vercel URL
const siteUrl = "https://wedding-card2-five.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${brideName} & ${groomName} | Wedding Invitation`,
  description: `You're cordially invited to celebrate the wedding of ${brideName} & ${groomName} on ${weddingDate}. Join us for our special day!`,
  keywords: ["wedding", "invitation", "celebration", "love", "marriage", brideName, groomName],
  openGraph: {
    title: `You're Invited to ${brideName} & ${groomName}'s Wedding!`,
    description: `Join us in celebrating the union of ${brideName} & ${groomName} on ${weddingDate}. Tap to open your invitation.`,
    type: "website",
    siteName: "Wedding Invitation",
    locale: "en_US",
    url: siteUrl,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${groomName} & ${brideName}'s Wedding Invitation`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `You're Invited to ${brideName} & ${groomName}'s Wedding!`,
    description: `Join us in celebrating the union of ${brideName} & ${groomName} on ${weddingDate}. Tap to open your invitation.`,
    images: ["/twitter-image"],
  },
  other: {
    "theme-color": "#d4a5a5",
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
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
