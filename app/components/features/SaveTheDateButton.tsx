"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Save the Date Button Component (for Events section)
export const SaveTheDateButton = ({
  eventTitle,
  eventDate,
}: {
  eventTitle: string;
  eventDate: Date;
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    checkMobile();
  }, []);

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

  // Google Calendar URL - mobile-friendly version
  const googleCalendarUrl = isMobile
    ? `https://calendar.google.com/calendar/u/0/r/eventedit?text=${encodeURIComponent(
        eventTitle
      )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
        eventDescription
      )}&location=${encodeURIComponent(eventLocation)}`
    : `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventTitle
      )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
        eventDescription
      )}&location=${encodeURIComponent(eventLocation)}`;

  // Generate ICS file
  const generateICS = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Wedding Invitation//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:${eventTitle}
DESCRIPTION:${eventDescription}
LOCATION:${eventLocation}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "wedding-save-the-date.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Handle button click - show options on both mobile and desktop
  const handleMainButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowOptions(!showOptions);
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
          onClick={handleMainButtonClick}
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
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors w-full text-left border-b border-[#4a90d9]/10"
                onClick={() => setShowOptions(false)}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#4a90d9">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                <span className="text-sm font-inter">Google Calendar</span>
              </a>
              <button
                onClick={() => {
                  generateICS();
                  setShowOptions(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors w-full text-left border-b border-[#4a90d9]/10"
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
                <span className="text-sm font-inter">Apple Calendar / iCal</span>
              </button>
              <button
                onClick={() => {
                  generateICS();
                  setShowOptions(false);
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-[#4a90d9]/20 transition-colors w-full text-left"
              >
                <svg
                  className="w-5 h-5 text-[#4a90d9]"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 5H3a2 2 0 00-2 2v10a2 2 0 002 2h18a2 2 0 002-2V7a2 2 0 00-2-2zm-9 10a4 4 0 110-8 4 4 0 010 8z" />
                </svg>
                <span className="text-sm font-inter">Outlook / Other</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
