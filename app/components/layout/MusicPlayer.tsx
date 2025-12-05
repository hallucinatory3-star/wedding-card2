"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MUSIC_URL } from "@/app/constants/wedding-data";

// Music Player Component
export const MusicPlayer = ({
  audioRef,
  isPlaying,
  setIsPlaying,
}: {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}) => {
  const toggleMusic = async () => {
    // Create audio on first click (required for mobile browsers)
    if (!audioRef.current) {
      audioRef.current = new Audio(MUSIC_URL);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log("Playback error:", error);
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      onClick={toggleMusic}
      className="fixed bottom-20 right-6 sm:bottom-6 sm:right-20 w-12 h-12 rounded-full glass border border-[#4a90d9]/30 flex items-center justify-center z-50 hover:border-[#4a90d9]/60 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isPlaying ? (
          <motion.div
            key="playing"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex items-center gap-0.5"
          >
            {/* Animated sound bars */}
            {[1, 2, 3].map((bar) => (
              <motion.div
                key={bar}
                className="w-1 bg-[#4a90d9] rounded-full"
                animate={{
                  height: ["8px", "16px", "8px"],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: bar * 0.1,
                }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.svg
            key="paused"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-5 h-5 text-[#4a90d9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};
