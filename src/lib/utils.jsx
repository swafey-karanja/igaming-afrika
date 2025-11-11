/* eslint-disable no-unused-vars */
import { useInView, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, CalendarPlus } from "lucide-react";
import { useLocation } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
  FaSearch,
} from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Counter component for animated numbers
export const AnimatedCounter = ({ value, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
      const startTime = Date.now() + delay;
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        if (now < startTime) {
          requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * numericValue);

        setCount(currentValue);

        if (now < endTime) {
          requestAnimationFrame(animate);
        } else {
          setCount(numericValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration, delay, hasAnimated]);

  const displayValue = value.includes("+") ? `${count}+` : count.toString();

  return <span ref={ref}>{displayValue}</span>;
};
//
//
//
//
//
// Accordion Item Component
export const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className="border-b border-gray-200 last:border-b-0"
    >
      <motion.button
        onClick={onClick}
        className="w-full py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-semibold text-gray-900 text-sm md:text-[15px]">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 },
        }}
        className="overflow-hidden"
      >
        <div className="px-1 pb-4">
          <div className="text-xs md:text-[13px] font-medium leading-relaxed text-gray-700">
            {content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
//
//
//
//
//
// Sponsor tiew display
export const SponsorTier = ({
  title,
  sponsors,
  logoSizes,
  containerClass,
  titleColor,
  delay = 0,
}) => {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };
  return (
    <section className="text-center space-y-6 md:space-y-8">
      <motion.div
        className="text-center mb-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ delay }}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <h2
            className={`text-md md:text-2xl font-bold bg-gradient-to-r ${titleColor} bg-clip-text text-transparent`}
          >
            {title}
          </h2>
        </div>
        <motion.div
          className={`w-16 h-1 bg-gradient-to-r ${titleColor
            .replace("text-transparent", "")
            .replace("bg-gradient-to-r", "")
            .replace("bg-clip-text", "")} mx-auto rounded-full mb-6`}
          initial={{ width: 0 }}
          whileInView={{ width: 64 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </motion.div>

      <div className={containerClass}>
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={title === "Headline Sponsor" ? scaleIn : fadeUp}
            transition={{
              duration: 0.5,
              delay: delay + (title === "Headline Sponsor" ? 0.5 : index * 0.1),
            }}
            className={`${
              title === "Headline Sponsor"
                ? "transform hover:scale-105"
                : "hover:scale-105"
            } transition-all duration-300 relative`}
          >
            <a
              href={
                sponsor.url === "https://summits.igamingafrika.com/"
                  ? "#"
                  : sponsor.url
              }
              target={
                sponsor.url === "https://summits.igamingafrika.com/"
                  ? "_parent"
                  : "_blank"
              }
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity duration-200 block group relative"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className={`${logoSizes} object-contain mx-auto transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl`}
                loading="lazy"
              />
              {title === "Headline Sponsor" && (
                <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                  ⭐ HEADLINE
                </div>
              )}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

//
//
//
//
//
// Scroll to top

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip scroll to top on the first render (page reload/initial load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Only scroll to top on actual navigation
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

//
//
//
//
//
// Phone Input Wrapper

export const PhoneInputWrapper = ({ value, onChange, error }) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-900 ml-1"
      >
        Phone number
      </label>
      <div className="mt-2">
        <PhoneInput
          international
          defaultCountry="KE"
          id="phone"
          name="phone"
          value={value}
          onChange={(val) =>
            onChange({ target: { name: "phone", value: val } })
          }
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300
            placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm ${
              error ? "border-red-500" : ""
            }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
};

//
//
//
//
//
// Calendar Dropdown Component

export const CalendarDropdown = ({
  showText = false, // whether to show "Add to Calendar" text
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setCloseTimeout(null);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsOpen(false), 300);
    setCloseTimeout(timeout);
  };

  // Event details
  const eventTitle = "iGaming Afrika Summit 2026";
  const eventLocation = "Sarit Expo Centre, Nairobi, Kenya";
  const eventDescription =
    "The Heart of Gaming in Africa - With expected attendees from over 100 countries";
  const startDate = "20260504T090000";
  const endDate = "20260506T180000";

  // Calendar URLs
  const generateGoogleCalendarUrl = () => {
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: eventTitle,
      dates: `${startDate}/${endDate}`,
      details: eventDescription,
      location: eventLocation,
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  };

  const generateICalFile = () => {
    const icsContent = `BEGIN:VCALENDAR
    VERSION:2.0
    PRODID:-//iGaming Afrika//Summit 2026//EN
    BEGIN:VEVENT
    DTSTART:${startDate}
    DTEND:${endDate}
    SUMMARY:${eventTitle}
    DESCRIPTION:${eventDescription}
    LOCATION:${eventLocation}
    STATUS:CONFIRMED
    END:VEVENT
    END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "igaming-afrika-summit-2026.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const generateOutlookWebUrl = () => {
    const params = new URLSearchParams({
      path: "/calendar/action/compose",
      rru: "addevent",
      subject: eventTitle,
      startdt: startDate,
      enddt: endDate,
      body: eventDescription,
      location: eventLocation,
    });
    return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
  };

  const generateYahooCalendarUrl = () => {
    const params = new URLSearchParams({
      v: "60",
      title: eventTitle,
      st: startDate,
      et: endDate,
      desc: eventDescription,
      in_loc: eventLocation,
    });
    return `https://calendar.yahoo.com/?${params.toString()}`;
  };

  const calendarOptions = [
    {
      name: "Google Calendar",
      icon: "/google.png",
      color: "text-red-600",
      action: () => window.open(generateGoogleCalendarUrl(), "_blank"),
    },
    {
      name: "Apple iCal",
      icon: "/apple.png",
      color: "text-gray-700",
      action: generateICalFile,
    },
    {
      name: "Outlook Desktop",
      icon: "/outlook desktop.png",
      color: "text-yellow-500",
      action: generateICalFile,
    },
    {
      name: "Outlook Web",
      icon: "/outlook web.png",
      color: "text-blue-600",
      action: () => window.open(generateOutlookWebUrl(), "_blank"),
    },
    {
      name: "Yahoo Calendar",
      icon: "/yahoo.png",
      color: "text-purple-600",
      action: () => window.open(generateYahooCalendarUrl(), "_blank"),
    },
  ];

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="bg-[#14a45c] text-white md:px-[16px] md:py-[9px] px-2.5 py-[4px] rounded-full shadow-lg flex items-center gap-2"
        aria-label="Add to calendar"
      >
        <span className="scale-90 sm:scale-100 md:scale-110 lg:scale-125 transition-transform">
          <CalendarPlus size={18} />
        </span>
        {showText && (
          <span className="font-semibold text-xs md:text-sm">
            Add to Calendar
          </span>
        )}
      </button>

      {isOpen && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="absolute top-full right-0 mt-2 w-46 md:w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
        >
          {calendarOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3 cursor-pointer"
            >
              <img
                src={option.icon}
                alt={option.name}
                className="h-4 w-4 md:h-6 md:w-6"
              />
              <span
                className={`text-sm md:text-[14px] font-bold ${option.color}`}
              >
                {option.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

//
//
//
//
//
// Dynamic Form fields
export const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  rows,
  error,
  disabled,
  options,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">
      {label} {required && "*"}
    </label>
    {type === "select" ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-1 border rounded-lg transition-colors ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        disabled={disabled}
      >
        <option value="">{placeholder || "Select an option"}</option>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    ) : rows ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-1 rounded-lg text-black placeholder-gray-500 border-2 bg-white/90 focus:outline-none focus:border-transparent resize-none ${
          error ? "border-red-500" : "border-white/20"
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-1 rounded-lg text-black placeholder-gray-500 border-2 bg-white/90 focus:outline-none focus:border-transparent ${
          error ? "border-red-500" : "border-white/20"
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
    )}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
