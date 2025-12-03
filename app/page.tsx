"use client";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import Image from "next/image";

// Confetti burst function with wedding theme colors
const fireConfetti = () => {
  const duration = 4000;
  const animationEnd = Date.now() + duration;
  const colors = ["#2c5f8d", "#4a90d9", "#7fb3d5", "#c0d6e8", "#ffffff"];

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: colors,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };

  // Initial big burst from center
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { x: 0.5, y: 0.5 },
    colors: colors,
    startVelocity: 45,
    gravity: 0.8,
    scalar: 1.2,
  });

  // Side bursts
  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.6 },
      colors: colors,
    });
  }, 200);

  setTimeout(() => {
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.6 },
      colors: colors,
    });
  }, 400);

  // Continuous rain effect
  frame();

  // Final celebration burst
  setTimeout(() => {
    confetti({
      particleCount: 150,
      spread: 180,
      origin: { x: 0.5, y: 0.4 },
      colors: colors,
      startVelocity: 35,
      gravity: 0.6,
      scalar: 1.5,
      shapes: ["circle", "square"],
    });
  }, 2000);
};

// Pre-computed particle data with deterministic values to avoid hydration mismatches
const PARTICLE_DATA = [
  { initialX: 0.12, initialY: 0.34, animateX: 23, duration: 14, delay: 1.2 },
  { initialX: 0.87, initialY: 0.21, animateX: -31, duration: 18, delay: 0.5 },
  { initialX: 0.45, initialY: 0.78, animateX: 12, duration: 12, delay: 2.8 },
  { initialX: 0.23, initialY: 0.56, animateX: -45, duration: 16, delay: 0.3 },
  { initialX: 0.91, initialY: 0.12, animateX: 8, duration: 11, delay: 3.1 },
  { initialX: 0.34, initialY: 0.89, animateX: -22, duration: 19, delay: 1.7 },
  { initialX: 0.67, initialY: 0.43, animateX: 37, duration: 13, delay: 4.2 },
  { initialX: 0.15, initialY: 0.67, animateX: -15, duration: 17, delay: 0.8 },
  { initialX: 0.78, initialY: 0.31, animateX: 28, duration: 15, delay: 2.1 },
  { initialX: 0.52, initialY: 0.94, animateX: -38, duration: 10, delay: 3.6 },
  { initialX: 0.08, initialY: 0.18, animateX: 19, duration: 14, delay: 1.4 },
  { initialX: 0.95, initialY: 0.72, animateX: -27, duration: 18, delay: 4.8 },
  { initialX: 0.41, initialY: 0.05, animateX: 42, duration: 12, delay: 0.1 },
  { initialX: 0.29, initialY: 0.83, animateX: -9, duration: 16, delay: 2.5 },
  { initialX: 0.63, initialY: 0.39, animateX: 33, duration: 11, delay: 3.9 },
  { initialX: 0.18, initialY: 0.61, animateX: -48, duration: 19, delay: 1.0 },
  { initialX: 0.84, initialY: 0.27, animateX: 14, duration: 13, delay: 4.4 },
  { initialX: 0.56, initialY: 0.95, animateX: -35, duration: 17, delay: 0.6 },
  { initialX: 0.03, initialY: 0.48, animateX: 26, duration: 15, delay: 2.3 },
  { initialX: 0.72, initialY: 0.14, animateX: -41, duration: 10, delay: 3.3 },
];

// Custom hook for window size that satisfies strict lint rules
function useWindowSize() {
  const getSize = () => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1000,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getSize());
    };

    // Dispatch resize to get initial size on mount
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

// Floating particles component
const FloatingParticles = () => {
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

// Countdown Timer Component
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
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

      {/* Demo Button */}
      {/* <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={fireConfetti}
        className="mt-8 px-6 py-3 rounded-full border border-[#4a90d9]/30 hover:border-[#4a90d9] hover:bg-[#4a90d9]/10 transition-all duration-300 flex items-center gap-2 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-2xl group-hover:animate-bounce">🎉</span>
        <span className="font-inter text-sm text-muted group-hover:text-foreground transition-colors">
          Preview Celebration
        </span>
        <span className="text-2xl group-hover:animate-bounce">🎊</span>
      </motion.button> */}
    </div>
  );
};

// Decorative Divider
const Divider = () => (
  <div className="flex items-center justify-center gap-4 my-12">
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      transition={{ duration: 0.8 }}
      className="h-px bg-linear-to-r from-transparent to-[#4a90d9]"
    />
    <motion.div
      initial={{ scale: 0, rotate: 0 }}
      whileInView={{ scale: 1, rotate: 45 }}
      transition={{ duration: 0.5 }}
      className="w-3 h-3 border-2 border-[#4a90d9]"
    />
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: 80 }}
      transition={{ duration: 0.8 }}
      className="h-px bg-linear-to-l from-transparent to-[#4a90d9]"
    />
  </div>
);

// Event Card Component
const EventCard = ({
  title,
  date,
  time,
  venue,
  address,
  dressCode,
  delay = 0,
  subEvent,
}: {
  title: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  dressCode?: string;
  delay?: number;
  subEvent?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 80 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
      className="glass rounded-3xl p-6 md:p-8 border border-[#4a90d9]/20 hover:border-[#4a90d9]/40 transition-all duration-500"
    >
      <motion.h3
        className="text-2xl md:text-3xl font-playfair gradient-text mb-6 text-center"
        whileHover={{ scale: 1.02 }}
      >
        {title}
      </motion.h3>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4a90d9]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#4a90d9]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted">Date</p>
            <p className="font-cormorant text-lg">{date}</p>
          </div>
        </div>

        {subEvent && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4a90d9]/10 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 64 96"
                role="img"
                aria-label="Wine glass"
              >
                <path
                  d="M18 22 C24 36 40 36 46 22 C42 30 36 34 32 36 C28 34 22 30 18 22 Z"
                  fill="red"
                  opacity="0.4"
                  strokeWidth="2"
                />

                <path
                  d="M12 8 C12 8 52 8 52 8 C48 30 42 42 32 50 C22 42 16 30 12 8 Z"
                  fill="none"
                  stroke="#4a90d9"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                <path
                  d="M18 12 C26 14 34 14 42 12"
                  fill="none"
                  stroke="#7fb3d5"
                  strokeOpacity="0.5"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <line
                  x1="32"
                  y1="50"
                  x2="32"
                  y2="74"
                  stroke="#4a90d9"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <ellipse
                  cx="32"
                  cy="86"
                  rx="18"
                  ry="4"
                  fill="none"
                  stroke="#4a90d9"
                  strokeWidth="4"
                />
              </svg>
            </div>
            <div>
              <p className="font-cormorant text-lg">{subEvent}</p>
            </div>
          </div>
        )}

        {time && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4a90d9]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#4a90d9]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Time</p>
              <p className="font-cormorant text-lg">{time}</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#4a90d9]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#4a90d9]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-muted">Venue</p>
            <p className="font-cormorant text-lg">{venue}</p>
            <p className="text-sm text-muted">{address}</p>
          </div>
        </div>

        {dressCode && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#4a90d9]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#4a90d9]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Dress Code</p>
              <p className="font-cormorant text-lg">{dressCode}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Save the Date Button Component (for Events section)
const SaveTheDateButton = ({
  eventTitle,
  eventDate,
}: {
  eventTitle: string;
  eventDate: Date;
}) => {
  const [showOptions, setShowOptions] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowOptions(false);
    };

    if (showOptions) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showOptions]);

  // Format date for calendar
  const formatDateForCalendar = (date: Date) => {
    return date
      .toISOString()
      .replace(/-|:|\.\d\d\d/g, "")
      .slice(0, -1);
  };

  const startDate = formatDateForCalendar(eventDate);
  const endDate = formatDateForCalendar(
    new Date(eventDate.getTime() + 4 * 60 * 60 * 1000)
  );
  const eventDescription = `You're invited to celebrate with us!`;
  const eventLocation = "Zone by the Park";

  // Google Calendar URL
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    eventTitle
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    eventDescription
  )}&location=${encodeURIComponent(eventLocation)}`;

  // Generate ICS file
  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "save-the-date.ics";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-12 flex justify-center"
    >
      <div className="relative">
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setShowOptions(!showOptions);
          }}
          className="px-8 py-4 rounded-full bg-[#4a90d9]/10 border border-[#4a90d9]/40 hover:bg-[#4a90d9]/20 hover:border-[#4a90d9] transition-all duration-300 flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg
            className="w-5 h-5 text-[#4a90d9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-playfair text-lg gradient-text">
            Save the Date
          </span>
          <svg
            className={`w-4 h-4 text-[#4a90d9] transition-transform ${
              showOptions ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.button>

        {/* Calendar Options Dropdown */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-xl border border-[#4a90d9]/30 overflow-hidden z-100 bg-background shadow-xl shadow-black/20"
            >
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors"
                onClick={() => setShowOptions(false)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#4a90d9">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span className="text-sm">Google Calendar</span>
              </a>
              <button
                onClick={() => {
                  generateICS();
                  setShowOptions(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors w-full"
              >
                <svg
                  className="w-5 h-5 text-[#4a90d9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-sm">Apple Calendar</span>
              </button>
              <button
                onClick={() => {
                  generateICS();
                  setShowOptions(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors w-full"
              >
                <svg
                  className="w-5 h-5 text-[#4a90d9]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 5H3a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zm-9 10a4 4 0 110-8 4 4 0 010 8z" />
                </svg>
                <span className="text-sm">Outlook</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Share Button Component (for footer)
const ShareButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setShowOptions(false);
    if (showOptions) {
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showOptions]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const shareWhatsApp = () => {
    const message = `${shareUrl}`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
        whileHover={{ scale: 1.1, color: "#4a90d9" }}
        className="text-muted transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-44 rounded-xl border border-[#4a90d9]/30 overflow-hidden z-100 bg-background shadow-xl shadow-black/20"
          >
            <button
              onClick={() => {
                shareWhatsApp();
                setShowOptions(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors w-full"
            >
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span className="text-sm">WhatsApp</span>
            </button>
            <button
              onClick={() => {
                copyLink();
                setShowOptions(false);
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors w-full"
            >
              <svg
                className="w-5 h-5 text-[#4a90d9]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm">
                {copied ? "Copied!" : "Copy Link"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Welcome Overlay Component
const WelcomeOverlay = ({ onEnter }: { onEnter: () => void }) => {
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

// Main Page Component
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [showWelcome, setShowWelcome] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Lock body scroll when welcome overlay is shown
  useEffect(() => {
    if (showWelcome) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showWelcome]);

  const handleEnter = async () => {
    setShowWelcome(false);

    // Start music on enter - Royalty-free romantic song with vocals
    if (!audioRef.current) {
      audioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3"
      );
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      console.log("Autoplay failed, user can use music button");
    }
  };
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  // Wedding details - UPDATE THESE
  const weddingDate = new Date("2026-02-04T19:00:00");
  const groomName = "Vikram";
  const brideName = "Shagun";

  return (
    <div ref={containerRef} className="min-h-screen bg-background relative">
      {/* Welcome Overlay */}
      <AnimatePresence>
        {showWelcome && <WelcomeOverlay onEnter={handleEnter} />}
      </AnimatePresence>

      <FloatingParticles />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Animated Background */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4a90d9] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#4a90d9] rounded-full blur-[150px]" />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          {/* Wedding Invitation Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted uppercase tracking-[0.3em] text-sm md:text-base mb-8 font-inter"
          >
            We&apos;re Getting Married
          </motion.p>
          <div className="ganesha-bg w-fit mx-auto">
            <Image
              src="/lord-ganesha-2.png"
              width={200}
              height={200}
              alt="lord-ganesha"
              className="w-40 h-40 mx-auto mb-4"
            />
          </div>

          {/* Ganesha Mantra - Compact */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <p className="text-xs md:text-sm font-playfair text-[#4a90d9] opacity-80">
                ॐ श्री गणेशाय नमः
              </p>
            </div>
            <p className="text-[10px] md:text-xs font-cormorant text-muted leading-tight max-w-md mx-auto">
              वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
              निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
            </p>
          </motion.div>

          {/* Names */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex items-center justify-center flex-wrap xs:flex-nowrap gap-4 mb-8"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair gradient-text leading-tight">
              {brideName}
            </h1>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="my-4 md:my-6"
            >
              <span className="text-4xl md:text-6xl text-[#4a90d9] font-cormorant">
                &amp;
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair gradient-text leading-tight">
              {groomName}
            </h1>
          </motion.div>

          <Divider />

          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl md:text-3xl font-cormorant)] text-foreground">
              Wednesday, February 4th, 2026
            </p>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 rounded-full border-2 border-[#4a90d9]/50 flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="w-1.5 h-1.5 bg-[#4a90d9] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Countdown Section */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-playfair gradient-text mb-4"
          >
            Counting Down To Forever
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-muted mb-12 font-cormorant text-xl"
          >
            The beginning of our beautiful journey together
          </motion.p>
          <CountdownTimer targetDate={weddingDate} />
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Family Section */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-playfair gradient-text mb-4">
              Our Families
            </h2>
            <p className="text-muted font-cormorant text-xl">
              A celebration of love and family
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Bride's Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 80 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0 }}
              className="glass rounded-3xl p-8 md:p-12 border border-[#4a90d9]/20"
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-playfair gradient-text mb-2 border-b border-[#4a90d9]/20 pb-2">
                  Bride&apos;s Side
                </h3>
                <h4 className="text-2xl md:text-2xl font-playfair gradient-text">
                  Shagun Dubey
                </h4>
                <p className="text-lg md:text-xl font-cormorant text-foreground leading-relaxed">
                  Beloved daughter of
                </p>
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-cormorant text-foreground">
                    Smt. Madhu Bala Dubey
                  </p>
                  <p className="text-muted font-cormorant text-lg">&</p>
                  <p className="text-xl md:text-2xl font-cormorant text-foreground">
                    Sh. Desh Rattan Dubey
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Groom's Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 80 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
              className="glass rounded-3xl p-8 md:p-12 border border-[#4a90d9]/20"
            >
              <div className="text-center space-y-4">
                <h3 className="text-2xl md:text-3xl font-playfair gradient-text mb-2 border-b border-[#4a90d9]/20 pb-2">
                  Groom&apos;s Side
                </h3>
                <h4 className="text-2xl md:text-2xl font-playfair gradient-text">
                  Vikram Singh
                </h4>
                <p className="text-lg md:text-xl font-cormorant text-foreground leading-relaxed">
                  Cherished son of
                </p>
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-cormorant text-foreground">
                    Smt. Koshaliya Devi
                  </p>
                  <p className="text-muted font-cormorant text-lg">&</p>
                  <p className="text-xl md:text-2xl font-cormorant text-foreground">
                    Sh. Chamail Singh
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Blessing Message Section */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="glass rounded-3xl p-8 md:p-12 border border-[#4a90d9]/20"
          >
            <p className="text-center text-lg md:text-xl font-cormorant leading-relaxed text-foreground">
              By the grace of the Almighty and with the blessings of our elders,
              we joyfully invite you to join us as we embark on our journey of
              love and togetherness. Your presence will make our celebration
              complete.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Love Story Section */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-playfair gradient-text mb-4">
              Our Love Story
            </h2>
            <p className="text-muted font-cormorant text-xl">
              A journey written in the stars
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="glass rounded-3xl p-8 md:p-12 border border-[#4a90d9]/20"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                className="text-6xl"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                💕
              </motion.div>
            </div>
            <p className="text-center text-lg md:text-xl font-cormorant leading-relaxed text-foreground italic">
              &ldquo;Destiny brought us together, friendship made it stronger,
              and love made it eternal. We&apos;re excited to write the next
              chapter of our lives—together.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Events Section */}
      <section className="py-20 md:py-32 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-playfair gradient-text mb-4">
              Wedding Events
            </h2>
            <p className="text-muted font-cormorant text-xl">
              Join us for these special celebrations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EventCard
              title="Mehandi Night"
              date="Tuesday, February 3rd, 2026"
              time=""
              subEvent="Cocktail & Dinner"
              venue="Zone by the Park"
              address="Zone by the Park, Trikuta Nagar, Jammu"
              dressCode="Saree / Western"
              delay={0}
            />
            <EventCard
              title="Saant / Haldi Ceremony"
              date="Wednesday, February 4th, 2026"
              time="10:00 AM"
              venue="Zone by the Park"
              address="Zone by the Park, Trikuta Nagar, Jammu"
              dressCode="Yellow Theme"
              delay={0.15}
            />
            <EventCard
              title="Baraat & Grand Dinner"
              date="Wednesday, February 4th, 2026"
              time="7:00 PM - 8:00 PM"
              venue="Zone by the Park"
              address="Zone by the Park, Trikuta Nagar, Jammu"
              delay={0.3}
            />
          </div>

          {/* Venue Map Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 80 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="mt-12 glass rounded-3xl pt-4 md:p-8 border border-[#4a90d9]/20"
          >
            <h3 className="text-2xl md:text-3xl font-playfair gradient-text mb-6 text-center">
              Venue Location
            </h3>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#4a90d9]/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[#4a90d9]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <p className="font-cormorant text-xl md:text-2xl">
                  Zone by the Park
                </p>
                <p className="text-sm text-muted">Trikuta Nagar, Jammu</p>
              </div>
            </div>

            {/* Map */}
            <div className="map-container relative h-64 md:h-96 rounded-none sm:rounded-2xl overflow-hidden mb-6">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3363.5!2d74.8723!3d32.7266!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDQzJzM1LjgiTiA3NMKwNTInMjAuMyJF!5e0!3m2!1sen!2sin!4v1645564756836!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=Zone+by+the+Park+Trikuta+Nagar+Jammu"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-[#4a90d9]/30 hover:bg-[#4a90d9]/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                className="w-5 h-5 text-[#4a90d9]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              <span className="font-inter text-sm">Get Directions</span>
            </motion.a>
          </motion.div>

          {/* Save the Date Button */}
          <SaveTheDateButton
            eventDate={weddingDate}
            eventTitle={`${brideName} & ${groomName}'s Wedding`}
          />
        </div>
      </section>

      <div className="section-divider max-w-2xl mx-auto" />

      {/* Footer */}
      <footer className="py-16 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-6xl font-playfair gradient-text mb-6">
            {brideName} & {groomName}
          </h2>
          <p className="text-muted font-cormorant text-xl mb-4">
            {weddingDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex flex-col gap-2 text-muted text-xs font-inter">
            <p>For queries reach out to Dubey Family:</p>
            <div>
              <a
                href="tel:+919419200672"
                className="hover:text-[#4a90d9] transition-colors"
              >
                9419200672
              </a>{" "}
              •{" "}
              <a
                href="tel:+919419135747"
                className="hover:text-[#4a90d9] transition-colors"
              >
                9419135747
              </a>{" "}
              •{" "}
              <a
                href="tel:+918007459659"
                className="hover:text-[#4a90d9] transition-colors"
              >
                8007459659
              </a>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-6 items-center">
            {/* Share Button */}
            <ShareButton />
          </div>
        </motion.div>
      </footer>

      {/* Theme Toggle */}
      <ThemeToggle />

      {/* Music Player */}
      <MusicPlayer
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
    </div>
  );
}

// Theme Toggle Component
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      onClick={() => setIsDark(!isDark)}
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full glass border border-[#4a90d9]/30 flex items-center justify-center z-50 hover:border-[#4a90d9]/60 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.svg
            key="sun"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            className="w-5 h-5 text-[#4a90d9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            className="w-5 h-5 text-[#4a90d9]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

// Music Player Component
const MusicPlayer = ({
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
      // Royalty-free romantic song with vocals
      audioRef.current = new Audio(
        "https://cdn.pixabay.com/audio/2022/08/02/audio_884fe92c21.mp3"
      );
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.2 }}
      onClick={toggleMusic}
      className="fixed bottom-6 right-20 w-12 h-12 rounded-full glass border border-[#4a90d9]/30 flex items-center justify-center z-50 hover:border-[#4a90d9]/60 transition-colors"
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
