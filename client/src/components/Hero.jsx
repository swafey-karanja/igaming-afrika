import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { CalendarDropdown } from "../lib/utils";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Operator's pass data
  const operatorPassData = {
    id: "operator",
    label: "Operator's Pass",
    price: 0,
    description: "VIP experience for operators",
    requirement: "Business Email registration required",
    features: [
      "Welcome Reception",
      "Pre-registration & Networking Event",
      "Soccer tournament ticket",
      "Conference Hall 1 Access",
      "Conference Hall 2 Access",
      "Full Expo Access",
      "iGaming AFRIKA Closing Party",
      "iGaming AFRIKA Awards Dinner",
      "iGaming AFRIKA Konnect Space",
      "VIP Lounge Access",
      "VIP Networking Event",
      "Private Meeting Rooms Reservations",
    ],
  };

  // Calculate time left until the event (May 7, 2026)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDate = new Date("May 4, 2026").getTime();
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`relative flex items-center justify-center pt-15 xl:pt-25 2xl:pt-25 pb-0 ${
        isHomePage ? "min-h-screen" : "min-h-[60vh]"
      }`}
    >
      {/* Hero Section with Event Details */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          className="absolute top-0 left-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://cdn.pixabay.com/video/2021/03/06/67116-521253275_tiny.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for better text visibility */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 w-full max-w-6xl mx-auto">
        {/* Replacing the image with styled text */}
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[80px] tracking-tight">
            <span className="text-[#14a45c]">iGA</span>
            <span className="text-[#14a45c]"> SUMMIT</span>
          </h1>
          <h2 className="text-[#c8ff00e1] text-lg sm:text-xl md:text-3xl lg:text-[35px] tracking-[0.32em] md:tracking-[0.37em] lg:tracking-[0.50em] font-bold mt-1">
            NAIROBI 2026
          </h2>
        </div>

        <div className="flex gap-6 items-center justify-center mb-2 sm:mb-3 lg:mb-4">
          <p className="text-sm sm:text-lg lg:text-xl font-semibold">
            4 - 6 &nbsp; MAY, 2026
          </p>
          <div>
            <CalendarDropdown iconSize="md" showText={false} />
          </div>
        </div>

        <p className="text-xs sm:text-sm lg:text-base mb-4 sm:mb-6 lg:mb-6">
          Sarit Expo Centre, Nairobi, Kenya
        </p>

        <p className="text-xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-3 sm:mb-4 lg:mb-4 text-[#14a45c] px-2">
          The Heart of Gaming in Africa
        </p>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8 max-w-2xl mx-auto">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="text-center px-3 sm:px-4 py-2 sm:py-3 bg-opacity-10 rounded-lg min-w-[60px] sm:min-w-[70px] lg:min-w-[80px]"
            >
              <div className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold">
                {timeLeft[unit]}
              </div>
              <div className="text-xs sm:text-sm lg:text-base uppercase tracking-wide">
                {unit}
              </div>
            </div>
          ))}
        </div>

        {isHomePage && (
          <div className="backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm md:text-md mb-6 sm:mb-12 leading-relaxed">
              With expected attendees from over 100 countries, this event is
              unmatched in its international reach. Explore sections dedicated
              to key industry verticals such as regulation, affiliate marketing,
              AI, Esports, Crypto, payments etc and participate in targeted
              sessions to earn industry insights and knowledge.
            </p>

            <div className="flex justify-center mb-4">
              <NavLink
                to="/register"
                className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 transition-colors duration-300 text-sm lg:text-base text-white font-bold w-full max-w-xs sm:max-w-sm py-3 px-4 border-2 border-green-600 rounded-md text-center"
              >
                Register interest
              </NavLink>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                className="bg-transparent cursor-pointer hover:bg-green-600 hover:bg-opacity-20 transition-colors duration-300 text-xs sm:text-sm lg:text-base text-white font-bold w-full py-3 px-4 border-2 border-green-600 rounded-md whitespace-normal sm:whitespace-nowrap text-center"
                onClick={() => {
                  navigate("/checkout", {
                    state: { selectedTicket: operatorPassData },
                  });
                }}
              >
                Operators - Apply for the Free Operator's Pass
              </button>
              <button
                className="bg-transparent cursor-pointer hover:bg-green-600 hover:bg-opacity-20 transition-colors duration-300 text-xs sm:text-sm lg:text-base text-white font-bold w-full py-3 px-4 border-2 border-green-600 rounded-md whitespace-normal sm:whitespace-nowrap text-center"
                onClick={() => {
                  document.getElementById("tickets")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Affiliates - Apply for the Free Standard Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
