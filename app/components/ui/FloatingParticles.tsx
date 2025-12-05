"use client";

import { motion } from "framer-motion";
import { useWindowSize } from "@/app/utils/hooks";
import { PARTICLE_DATA } from "@/app/constants/particle-data";

// Floating particles component
export const FloatingParticles = () => {
  const windowSize = useWindowSize();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {PARTICLE_DATA.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#4a90d9] rounded-full opacity-40"
          initial={{
            x: particle.initialX * windowSize.width,
            y: particle.initialY * windowSize.height,
          }}
          animate={{
            y: [null, -100, windowSize.height + 100],
            x: [null, particle.animateX],
            opacity: [0.4, 0.8, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};
