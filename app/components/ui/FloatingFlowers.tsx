"use client";

import { motion } from "framer-motion";

// Floating decorative flowers/petals for ambiance
export const FloatingFlowers = () => {
  const flowers = [
    { delay: 0, duration: 12, startX: 5, endX: 15, rotate: 360 },
    { delay: 3, duration: 15, startX: 85, endX: 75, rotate: -360 },
    { delay: 6, duration: 13, startX: 25, endX: 35, rotate: 180 },
    { delay: 9, duration: 14, startX: 65, endX: 55, rotate: -180 },
    { delay: 1.5, duration: 16, startX: 45, endX: 55, rotate: 360 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {flowers.map((flower, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: `${flower.startX}%` }}
          initial={{ y: -100, x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: "100vh",
            x: [(flower.endX - flower.startX) + "%"],
            rotate: flower.rotate,
            opacity: [0, 0.15, 0.15, 0],
          }}
          transition={{
            duration: flower.duration,
            repeat: Infinity,
            delay: flower.delay,
            ease: "linear",
            opacity: {
              times: [0, 0.1, 0.9, 1],
            },
          }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-[#4a90d9]"
          >
            {/* Flower petals */}
            <motion.circle
              cx="12"
              cy="8"
              r="3"
              fill="currentColor"
              opacity="0.2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.circle
              cx="16"
              cy="12"
              r="3"
              fill="currentColor"
              opacity="0.2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.circle
              cx="12"
              cy="16"
              r="3"
              fill="currentColor"
              opacity="0.2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
            <motion.circle
              cx="8"
              cy="12"
              r="3"
              fill="currentColor"
              opacity="0.2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6,
              }}
            />
            {/* Center */}
            <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.3" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
