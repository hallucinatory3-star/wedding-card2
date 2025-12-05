"use client";

import { motion } from "framer-motion";
import { useWindowSize } from "@/app/utils/hooks";

// Floating hearts component for romantic atmosphere
export const FloatingHearts = () => {
  const windowSize = useWindowSize();

  const hearts = [
    { delay: 0, duration: 8, x: 10, size: 12, opacity: 0.15 },
    { delay: 2, duration: 10, x: 80, size: 16, opacity: 0.2 },
    { delay: 4, duration: 9, x: 30, size: 10, opacity: 0.12 },
    { delay: 1, duration: 11, x: 60, size: 14, opacity: 0.18 },
    { delay: 3, duration: 7, x: 90, size: 12, opacity: 0.15 },
    { delay: 5, duration: 10, x: 45, size: 15, opacity: 0.2 },
    { delay: 2.5, duration: 9, x: 70, size: 11, opacity: 0.14 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart, i) => (
        <motion.div
          key={i}
          className="absolute text-[#4a90d9]"
          style={{
            fontSize: `${heart.size}px`,
            left: `${heart.x}%`,
            opacity: heart.opacity,
          }}
          initial={{
            y: windowSize.height + 50,
            scale: 0.5,
            rotate: 0,
          }}
          animate={{
            y: -100,
            scale: [0.5, 1, 0.8, 1, 0.5],
            rotate: [0, 10, -10, 5, 0],
            x: [0, 30, -20, 15, 0],
          }}
          transition={{
            duration: heart.duration,
            repeat: Infinity,
            delay: heart.delay,
            ease: "easeInOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
};
