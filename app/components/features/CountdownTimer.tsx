"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fireConfetti } from "@/app/utils/confetti";

// Countdown Timer Component
export const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [hasEnded, setHasEnded] = useState(false);
  const confettiFired = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else if (!confettiFired.current) {
        // Countdown reached zero - fire confetti!
        setHasEnded(true);
        confettiFired.current = true;
        fireConfetti();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {timeBlocks.map((block, index) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <motion.div
              className="w-16 h-16 md:w-24 md:h-24 rounded-2xl glass flex items-center justify-center border border-[#4a90d9]/30"
              whileHover={{
                scale: 1.05,
                borderColor: "rgba(74, 144, 217, 0.6)",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={block.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-2xl md:text-4xl font-bold gradient-text font-playfair"
                >
                  {String(block.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </motion.div>
            <span className="mt-2 text-xs md:text-sm text-muted uppercase tracking-widest font-inter">
              {block.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Celebration Message when countdown ends */}
      <AnimatePresence>
        {hasEnded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <motion.p
              className="text-2xl md:text-4xl font-playfair gradient-text"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              The Big Day is Here!
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
