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
      className={`relative flex pt-15 xl:pt-25 2xl:pt-25 pb-0 ${
        isHomePage ? "min-h-screen" : "min-h-[60vh]"
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
        <div className="absolute bottom-0 left-0 w-full h-[35vh] md:h-[35vh] lg:h-[45vh]">
          <img
            src="/skyline-for-website.png"
            alt="Nairobi Skyline"
            className="w-full h-full object-cover object-bottom"
          />
        </div>

        {/* Tagline positioned above skyline - MOVED OUTSIDE */}
        <div className="absolute bottom-[4%] md:bottom-[5%] lg:bottom-[7%] left-0 right-0 flex items-center justify-center px-4">
          <p className="text-[16px] sm:text-[20px] md:text-2xl lg:text-4xl xl:text-[35px] font-medium text-[#e1f30c] drop-shadow-lg text-center uppercase">
            The Heart of Gaming in Africa
          </p>
        </div>
        {/* Dark overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-black opacity-20"></div> */}
      </div>

      <div className="relative z-10 flex flex-col gap-y-4 items-center justify-center text-center text-black px-4 max-w-6xl mx-auto h-[75vh] sm:h[70vh] md:h-[65vh] lg:h-[55vh] sm:mt-10 lg:mt-25 xl:mt-5">
        {/* Replacing the image with styled text */}
        <div className="text-center">
          <img
            src="/IGA-LIONBETS-Logo.png"
            className="h-30 sm:h-35 md:h-55 w-full"
          />
        </div>

        <div className="flex flex-col items-center justify-center md:mb-5">
          <p className="text-sm sm:text-xl md:text-2xl xl:text-3xl font-bold text-[#14a45c] ">
            4 - 6 &nbsp; MAY, 2026
          </p>
          {/* <div>
            <CalendarDropdown iconSize="md" showText={false} />
          </div> */}
          <p className="text-sm sm:text-xl md:text-2xl xl:text-3xl font-bold text-[#14a45c]">
            Sarit Expo Centre, Nairobi, Kenya
          </p>
        </div>

        {/* Countdown Timer */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-2xl mx-auto">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div
              key={unit}
              className="text-center px-1 sm:px-4 py-2 sm:py-4 bg-transparent border-3 border-[#14a45c] rounded-lg min-w-[70px] sm:min-w-[90px]"
            >
              <div className="text-md sm:text-2xl xl:text-3xl font-bold text-[#14a45c]">
                {timeLeft[unit]}
              </div>
              <div className="text-xs sm:text-sm text-[#14a45c] font-semibold uppercase mt-1">
                {unit}
              </div>
            </div>
          ))}
        </div>

        {isHomePage && (
          <div className="rounded-lg p-4 sm:p-6 md:p-8 max-w-4xl mx-auto gap-y-2 sm:gap-y-4 flex flex-col">
            <div className="flex justify-center">
              <NavLink
                to="/register"
                className="bg-transparent hover:bg-[#47cf8b] hover:bg-opacity-20 hover:text-white transition-colors duration-300 text-sm lg:text-lg text-[#14a45c] font-bold w-full sm:max-w-sm py-2 px-2 border-3 border-lime-500 rounded-4xl text-center"
              >
                Register interest
              </NavLink>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-2 sm:gap-4">
              <button
                className="bg-transparent cursor-pointer hover:bg-[#47cf8b] hover:bg-opacity-20 hover:text-white transition-colors duration-300 text-[11px] lg:text-lg text-[#14a45c] font-bold w-full py-2 px-4 border-3 border-lime-500 rounded-4xl whitespace-normal sm:whitespace-nowrap text-center"
                onClick={() => {
                  navigate("/checkout", {
                    state: { selectedTicket: operatorPassData },
                  });
                }}
              >
                Operators - Apply for the Free Operator's Pass
              </button>
              <button
                className="bg-transparent cursor-pointer hover:bg-[#47cf8b] hover:bg-opacity-20 hover:text-white  transition-colors duration-300 text-[11px] lg:text-lg text-[#14a45c] font-bold w-full py-2 px-4 border-3 border-lime-500 rounded-4xl whitespace-normal sm:whitespace-nowrap text-center"
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
