"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MUSIC_URL } from "../constants/wedding-data";

export default function LandingPage() {
  const router = useRouter();

  const handleExplore = async () => {
    // Start music when user clicks "Click to Open"
    try {
      let audio = document.querySelector('audio');
      if (!audio) {
        audio = new Audio(MUSIC_URL);
        audio.loop = true;
        audio.volume = 0.4;
        document.body.appendChild(audio);
      }
      await audio.play();
    } catch (error) {
      console.log("Could not play music:", error);
    }
    
    router.push("/intro");
  };

  return (
    <div className="min-h-screen w-full bg-[#eed3a4] flex flex-col items-center justify-center px-4 py-8 md:py-16 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-[#0B3D2E]/5 to-transparent" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl text-center"
      >
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-sm md:text-base tracking-[0.2em] uppercase text-[#0B3D2E]/70 font-inter mb-6"
        >
          A Celebration of Love
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl flex flex-col gap-2 sm:text-5xl md:text-7xl lg:text-8xl font-playfair text-[#0B3D2E] mb-6 leading-tight"
        >
          <span>Dr. Shagun</span>
          <span>&</span>
          <span>Dr. Vikram</span>
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="h-px w-20 bg-gradient-to-r from-transparent via-[#0B3D2E] to-transparent mx-auto mb-8"
        />

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl md:text-2xl font-cormorant text-[#0B3D2E] mb-4"
        >
          4th February 2026
        </motion.p>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-base md:text-lg font-cormorant text-[#0B3D2E]/80 mb-12"
        >
          Zone by the Park, Jammu
        </motion.p>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="max-w-lg mx-auto mb-12"
        >
          <p className="text-[#0B3D2E] text-base md:text-lg font-cormorant leading-relaxed italic">
            He carried a quiet certainty in his heart for years, and when her smile finally met that faith - their forever began. To him, she was the moment that turned time into destiny.
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          onClick={handleExplore}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-3 rounded-full bg-[#0B3D2E] hover:bg-[#0a3226] text-[#eed3a4] font-playfair text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Click to Open
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-[#0B3D2E]/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-1.5 bg-[#0B3D2E] rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}
