import { useState } from "react";
import { CalendarPlus } from "lucide-react";

export const CalendarDropdown = ({
  iconSize = "md", // "sm" | "md" | "lg"
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

  // Icon size classes
  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`bg-[#14a45c] text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2`}
        aria-label="Add to calendar"
      >
        <CalendarPlus size={iconSizes[iconSize]} />
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
