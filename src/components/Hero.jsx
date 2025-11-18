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
      className={`relative flex pt-15 xl:pt-25 2xl:pt-25 3xl:pt-25 pb-0 ${
        isHomePage ? "min-h-screen" : "min-h-[62vh] xl:min-h-[70vh]"
      }`}
    >
      {/* Hero Section with Overlapping Images */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Base African pattern image with white overlay */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="/africa-pattern.png"
            alt="African Pattern Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Nairobi skyline image - positioned at bottom */}
        {isHomePage ? (
          <div className="absolute bottom-0 left-0 w-full h-[35vh] md:h-[35vh] lg:h-[45vh] xl:h-[50vh] 2xl:h-[40vh] 3xl:h-[35vh]">
            <img
              src="/skyline-for-website.png"
              alt="Nairobi Skyline"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        ) : (
          <div className="absolute bottom-0 left-0 w-full h-[25vh] md:h-[25vh] lg:h-[30vh] xl:h-[32vh] 2xl:h-[30vh] 3xl:h-[25vh]">
            <img
              src="/skyline-for-website-other-pages.png"
              alt="Nairobi Skyline"
              className="w-full h-full object-cover object-bottom"
            />
          </div>
        )}

        {/* Tagline positioned above skyline */}
        <div
          className={`absolute ${
            isHomePage
              ? "bottom-[4%] md:bottom-[5%] lg:bottom-[7%] xl:bottom-[8%] 2xl:bottom-[4.5%] 3xl:bottom-[4%]"
              : "bottom-[4%] md:bottom-[5%] lg:bottom-[5%] xl:bottom-[5%] 2xl:bottom-[4.5%] 3xl:bottom-[4%]"
          } flex items-center justify-center px-4 left-0 right-0`}
        >
          <p
            className={`${
              isHomePage
                ? "text-[16px] sm:text-[20px] md:text-2xl lg:text-4xl xl:text-[35px] 2xl:text-[33px] 3xl:text-[30px]"
                : "text-[16px] sm:text-[20px] md:text-2xl lg:text-4xl xl:text-[30px] 2xl:text-[28px] 3xl:text-[25px]"
            } font-medium text-[#e1f30c] drop-shadow-lg text-center uppercase`}
          >
            The Heart of Gaming in Africa
          </p>
        </div>
      </div>

      <div
        className={`relative z-10 flex flex-col items-center justify-center text-center text-black px-4 max-w-6xl mx-auto ${
          isHomePage
            ? "h-[68vh] md:h-[65vh] lg:h-[55vh] xl:h-[50vh] 2xl:h-[50vh] 3xl:h-[40vh] sm:mt-10 lg:mt-25 xl:mt-5 2xl:mt-2 3xl:mt-1 gap-y-2"
            : "h-[30vh] sm:h-[35vh] md:h-[33vh] lg:h-[30vh] xl:h-[25vh] 2xl:h-[28vh] 3xl:h-[32vh] gap-y-1 md:gap-y-2 xl:gap-y-0 2xl:gap-y-1"
        }`}
      >
        {/* Logo */}
        <div className="text-center">
          <img
            src="/IGA-LIONBETS-Logo.png"
            className={`${
              isHomePage
                ? "h-30 sm:h-35 md:h-55 xl:h-65 2xl:h-50 3xl:h-35"
                : "h-22 sm:h-35 md:h-35 lg:h-45 xl:h-40 2xl:h-38 3xl:h-35"
            } w-full`}
          />
        </div>

        {/* Event Date */}
        <div className="flex flex-row gap-2 items-center justify-center md:mb-1">
          <p
            className={`${
              isHomePage
                ? "text-sm sm:text-xl md:text-2xl xl:text-3xl 2xl:text-2xl 3xl:text-xl"
                : "text-sm sm:text-lg md:text-xl xl:text-xl 2xl:text-xl 3xl:text-lg"
            } font-bold text-[#14a45c]`}
          >
            4 - 6 &nbsp; MAY, 2026
          </p>
          <div>
            <CalendarDropdown showText={false} />
          </div>
        </div>

        <p
          className={`${
            isHomePage
              ? "text-xs sm:text-lg md:text-xl xl:text-2xl 2xl:text-xl 3xl:text-lg mb-2"
              : "text-xs sm:text-lg md:text-xl xl:text-xl 2xl:text-lg 3xl:text-md mb-1"
          } font-bold text-[#14a45c]`}
        >
          Sarit Expo Centre, Nairobi, Kenya
        </p>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-2xl mx-auto">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className={`${
                isHomePage
                  ? "text-center px-1 sm:px-4 xl:px-4 py-2 sm:py-4 xl:py-4 bg-transparent border-3 border-[#14a45c] rounded-lg min-w-[70px] sm:min-w-[90px] xl:min-w-[100px] 3xl:min-w-[70px]"
                  : "text-center px-1 sm:px-2 xl:px-1 py-2 sm:py-4 xl:py-1 bg-transparent border-3 border-[#14a45c] rounded-lg min-w-[70px] sm:min-w-[100px] xl:min-w-[90px] 2xl:min-w-[80px] 3xl:min-w-[70px]"
              }`}
            >
              <div
                className={`${
                  isHomePage
                    ? "text-md sm:text-2xl xl:text-3xl 2xl:text-3xl 3xl:text-xl"
                    : "text-sm sm:text-2xl xl:text-xl 2xl:text-2xl 3xl:text-4xl"
                } font-bold text-[#14a45c]`}
              >
                {timeLeft[unit]}
              </div>
              <div
                className={`${
                  isHomePage
                    ? "text-xs sm:text-sm 2xl:text-md 3xl:text-sm"
                    : "text-xs sm:text-sm xl:text-xs"
                } text-[#14a45c] font-semibold uppercase mt-1`}
              >
                {unit}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        {isHomePage && (
          <div className="rounded-lg p-4 sm:p-4 mt-2 xl:mt-6 2xl:mt-2 max-w-4xl mx-auto gap-y-2 sm:gap-y-4 flex flex-col">
            <div className="flex justify-center">
              <NavLink
                to="/register"
                className="bg-transparent hover:bg-[#47cf8b] hover:bg-opacity-20 hover:text-white transition-colors duration-300 text-sm lg:text-lg xl:text-lg 2xl:text-md text-[#14a45c] font-bold w-full sm:max-w-sm py-2 px-2 sm:px-4 border-3 border-lime-500 rounded-4xl text-center"
              >
                Register interest
              </NavLink>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-2 sm:gap-4">
              <button
                className="bg-transparent cursor-pointer hover:bg-[#47cf8b] hover:bg-opacity-20 hover:text-white transition-colors duration-300 text-[11px] lg:text-lg xl:text-lg 2xl:text-md 3xl:text-2xl text-[#14a45c] font-bold w-full py-2 px-4 sm:px-6 border-3 border-lime-500 rounded-4xl whitespace-normal sm:whitespace-nowrap text-center"
                onClick={() => {
                  navigate("/checkout", {
                    state: { selectedTicket: operatorPassData },
                  });
                }}
              >
                Operators - Apply for the Free Operator's Pass
              </button>
              <button
                className="bg-transparent cursor-pointer hover:bg-[#47cf8b] hover:bg-opacity-20 hover:text-white  transition-colors duration-300 text-[11px] lg:text-lg xl:text-lg 2xl:text-md 3xl:text-2xl text-[#14a45c] font-bold w-full py-2 px-4 sm:px-6 border-3 border-lime-500 rounded-4xl whitespace-normal sm:whitespace-nowrap text-center"
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
