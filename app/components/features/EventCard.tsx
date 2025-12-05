"use client";

import { motion } from "framer-motion";

// Event Card Component
export const EventCard = ({
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
  venue?: string;
  address?: string;
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
      className="glass rounded-3xl p-6 md:p-8 border border-[#d4a5a5]/20 hover:border-[#d4a5a5]/40 transition-all duration-500"
    >
      <motion.h3
        className="text-2xl md:text-3xl font-playfair gradient-text mb-6 text-center"
        whileHover={{ scale: 1.02 }}
      >
        {title}
      </motion.h3>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#d4a5a5]/10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-[#d4a5a5]"
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
            <div className="w-10 h-10 rounded-full bg-[#d4a5a5]/10 flex items-center justify-center">
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
                  stroke="#d4a5a5"
                  strokeWidth="4"
                  strokeLinejoin="round"
                />

                <path
                  d="M18 12 C26 14 34 14 42 12"
                  fill="none"
                  stroke="#e6c5c5"
                  strokeOpacity="0.5"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                <line
                  x1="32"
                  y1="50"
                  x2="32"
                  y2="74"
                  stroke="#d4a5a5"
                  strokeWidth="4"
                  strokeLinecap="round"
                />

                <ellipse
                  cx="32"
                  cy="86"
                  rx="18"
                  ry="4"
                  fill="none"
                  stroke="#d4a5a5"
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
            <div className="w-10 h-10 rounded-full bg-[#d4a5a5]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#d4a5a5]"
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

        {venue && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4a5a5]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#d4a5a5]"
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
              {address && <p className="text-sm text-muted">{address}</p>}
            </div>
          </div>
        )}

        {dressCode && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d4a5a5]/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-[#d4a5a5]"
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
