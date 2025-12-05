"use client";

import { motion } from "framer-motion";

// Welcome Overlay Component
export const WelcomeOverlay = ({ onEnter }: { onEnter: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-100 bg-background flex items-center justify-center"
    >
      <div className="text-center px-6">
        {/* Decorative ring */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-8 mx-auto w-32 h-32 rounded-full border-2 border-[#4a90d9]/50 flex items-center justify-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border border-dashed border-[#4a90d9]/30 flex items-center justify-center"
          >
            <span className="text-5xl">💍</span>
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-muted uppercase tracking-[0.3em] text-sm mb-4 font-inter"
        >
          You&apos;re Invited
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-4xl md:text-6xl font-playfair gradient-text mb-8"
        >
          Wedding Celebration
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={onEnter}
          className="px-8 py-4 rounded-full bg-[#4a90d9] text-white font-semibold text-lg font--inter hover:bg-[#2c5f8d] transition-colors flex items-center gap-3 mx-auto"
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
};
