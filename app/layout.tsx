"use client";

import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { BRIDE_NAME, GROOM_NAME, WEDDING_DATE, MUSIC_URL } from "./constants/wedding-data";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MusicPlayer } from "./components/layout";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/landing" || pathname === "/";
  const isIntroPage = pathname === "/intro";
  const shouldShowMusicPlayer = !isLandingPage && !isIntroPage;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and manage music
  useEffect(() => {
    // Initialize audio only once
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;

      // Sync state with audio events
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      const handleEnded = () => setIsPlaying(false);

      audioRef.current.addEventListener("play", handlePlay);
      audioRef.current.addEventListener("pause", handlePause);
      audioRef.current.addEventListener("ended", handleEnded);

      // Cleanup on unmount
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener("play", handlePlay);
          audioRef.current.removeEventListener("pause", handlePause);
          audioRef.current.removeEventListener("ended", handleEnded);
          audioRef.current.pause();
        }
      };
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>{brideName} & {groomName} | Wedding Invitation</title>
        <meta 
          name="description" 
          content={`You're cordially invited to ${brideName} & ${groomName}'s wedding on ${weddingDate}`}
        />
        <meta name="theme-color" content="#eed3a4" />
      </head>
      <body
        className={`${playfair.variable} ${cormorant.variable} ${inter.variable} antialiased`}
      >
        {children}
        {/* Global Music Player - Hidden on Landing Page and Intro Page */}
        {shouldShowMusicPlayer && (
          <MusicPlayer
            audioRef={audioRef}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        )}
      </body>
    </html>
  );
}
