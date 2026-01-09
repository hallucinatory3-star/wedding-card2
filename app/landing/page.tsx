"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MUSIC_URL } from "../constants/wedding-data";
import Image from "next/image";

export default function LandingPage() {
  const router = useRouter();

  const handleExplore = async () => {
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
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-100 bg-[#eed3a4] flex items-center justify-center"
    >
      <div className="text-center px-6">
        {/* Decorative ring */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-8 mx-auto w-32 h-32 rounded-full border-2 border-[#0B3D2E]/50 flex items-center justify-center"
        >
          <div
            className="w-24 h-24 rounded-full border border-dashed border-[#0B3D2E]/30 flex items-center justify-center"
          >
            <Image src="/heart.webp" alt="Heart Icon" width={48} height={48} />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-[#0B3D2E]/70 uppercase tracking-[0.3em] text-sm mb-4 font-inter"
        >
          You&apos;re Invited
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-4xl md:text-6xl font-playfair text-[#0B3D2E] mb-8"
        >
          Wedding Celebration
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={handleExplore}
          className="px-8 py-4 rounded-full bg-[#0B3D2E] text-[#eed3a4] font-semibold text-lg font-inter hover:bg-[#0a3226] transition-colors flex items-center gap-3 mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Open Invitation</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
}
