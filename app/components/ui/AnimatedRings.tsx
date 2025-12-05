"use client";

import { motion } from "framer-motion";

// Animated concentric rings representing unity and eternal love
export const AnimatedRings = () => {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Left Ring */}
      <motion.div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-16 h-16"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#d4a5a5"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.circle
            cx="50"
            cy="15"
            r="4"
            fill="#d4a5a5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        </motion.svg>
      </motion.div>

      {/* Right Ring */}
      <motion.div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-16 h-16"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e6c5c5"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.circle
            cx="50"
            cy="15"
            r="4"
            fill="#e6c5c5"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <animate
              attributeName="opacity"
              values="1;0.5;1"
              dur="2s"
              repeatCount="indefinite"
            />
          </motion.circle>
        </motion.svg>
      </motion.div>

      {/* Connecting sparkle */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, rotate: 0 }}
        whileInView={{ scale: 1, rotate: 180 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24">
          <motion.path
            d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z"
            fill="#d4a5a5"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
};
