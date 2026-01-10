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
  const isInvitationPage = pathname === "/invitation";
  // Show music toggle ONLY on invitation page (last page)
  const shouldShowMusicPlayer = isInvitationPage;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize and manage music
  useEffect(() => {
    // Clean up any orphaned audio elements from landing page
    const orphanedAudios = document.querySelectorAll('audio');
    orphanedAudios.forEach(audio => {
      if (audio !== audioRef.current) {
        (audio as HTMLAudioElement).pause();
        audio.remove();
      }
    });

    // Initialize audio only once
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    // Sync state with audio events
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    const audio = audioRef.current;
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    // Cleanup on unmount
    return () => {
      if (audio) {
        audio.removeEventListener("play", handlePlay);
        audio.removeEventListener("pause", handlePause);
        audio.removeEventListener("ended", handleEnded);
        audio.pause();
      }
    };
  }, []);

  // Auto-start music when navigating to pages where music should play
  useEffect(() => {
    if (!isLandingPage && audioRef.current) {
      // Auto-start music when reaching intro (video) page or invitation page
      audioRef.current.play().catch((error) => {
        console.log("Could not auto-play music:", error);
      });
    } else if (isLandingPage && audioRef.current) {
      // Pause music only on landing page
      audioRef.current.pause();
    }
  }, [pathname, isLandingPage, isIntroPage]);

  return (
    <html lang="en">
      <head>
        <title>Wedding Invitation</title>
        <meta 
          name="description" 
          content="You're cordially invited to a special wedding celebration"
        />
        <meta name="theme-color" content="#eed3a4" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/landing`} />
        <meta property="og:title" content="Wedding Invitation" />
        <meta property="og:description" content="You're cordially invited to a special wedding celebration" />
        <meta property="og:image" content={`${siteUrl}/opengraph-image`} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`${siteUrl}/landing`} />
        <meta property="twitter:title" content="Wedding Invitation" />
        <meta property="twitter:description" content="You're cordially invited to a special wedding celebration" />
        <meta property="twitter:image" content={`${siteUrl}/twitter-image`} />
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
