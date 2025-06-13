import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { countries, menuItems, options } from "../data/dropdownData";
import DropdownMenu, { NewsDropdown } from "./utils/DropdownMenus";
import MobileSidebar from "./utils/MobileSidebar";
import SocialIcons from "./utils/SocialIcons";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = new Date("July 28, 2026").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = eventDate - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSidebarOpen]);

  return (
    <div className="relative bg-black">
      {/* Header + Nav */}
      <header
        className={`fixed top-0 w-full z-40 py-2 sm:py-3 md:py-4 xl:py-6 lg:py-5 transition-all duration-700 ${
          isScrolled
            ? "bg-gray-100 shadow-md text-black"
            : "bg-transparent text-white"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl flex items-center justify-between relative">
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setSidebarOpen(true)}
              className="cursor-pointer p-2 text-green-600"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-shrink-0 ml-4">
            <NavLink
              to="/"
              onClick={() =>
                window.location.pathname === "/" && window.location.reload()
              }
            >
              <img
                src="/Summit2_trimmed.png"
                alt="iGaming Afrika"
                className="h-10 sm:h-12 md:h-16 lg:h-20"
              />
            </NavLink>
          </div>

          <nav className="hidden lg:flex space-x-6 max-w-4xl w-full justify-center items-center">
            <NewsDropdown isScrolled={isScrolled} />
            <DropdownMenu
              label="countries"
              isScrolled={isScrolled}
              items={countries}
            />
            <DropdownMenu
              label="Publications"
              isScrolled={isScrolled}
              items={menuItems}
            />
            <DropdownMenu
              label="iGaming Directory"
              isScrolled={isScrolled}
              items={options}
            />
            <NavLink
              to="/register"
              className={`py-2 px-6 text-sm font-bold border border-green-600 rounded-md ${
                isScrolled
                  ? "bg-green-600 text-white"
                  : "text-white hover:bg-green-600 hover:bg-opacity-20"
              }`}
            >
              PRE-REGISTER 2026
            </NavLink>
          </nav>

          <SocialIcons isScrolled={isScrolled} />
        </div>
      </header>

      <MobileSidebar
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isScrolled={isScrolled}
      />

      {/* Hero Section with Event Details */}
      <div className="relative flex items-center justify-center h-full pt-16 sm:pt-20 md:pt-24 pb-8">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            className="absolute min-w-full min-h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://cdn.pixabay.com/video/2021/03/06/67116-521253275_tiny.mp4"
              type="video/mp4"
            />
            your browser does not support the video
          </video>
          {/* Dark overlay for better text visibility */}
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 w-full max-w-xl mx-auto">
          <img
            src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png"
            alt="iGaming Afrika Logo"
            className="w-full max-w-xs mx-auto mb-4 sm:mb-6"
          />
          <p className="text-md sm:text-3xl font-semibold mb-2 sm:mb-3">
            iGaming AFRIKA Summit
          </p>
          <p className="text-md sm:text-ld font-semibold mb-2 sm:mb-3">
            NAIROBI, KENYA • 28-31 JULY, 2026
          </p>
          {/* <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">28-31 JULY, 2026</h1> */}
          <p className="text-sm sm:text-[14px] mb-6 sm:mb-8 font-semibold">
            {" "}
            Sarit Expo Center, Nairobi, Kenya
          </p>

          {/* Countdown Timer */}
          <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 mb-6 sm:mb-2">
            <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {timeLeft.days}
              </div>
              <div className="text-xs sm:text-[13px] uppercase">Days</div>
            </div>
            <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {timeLeft.hours}
              </div>
              <div className="text-xs sm:text-[13px]  uppercase">Hours</div>
            </div>
            <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {timeLeft.minutes}
              </div>
              <div className="text-xs sm:text-[13px]  uppercase">Minutes</div>
            </div>
            <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
              <div className="text-lg sm:text-xl md:text-2xl font-bold">
                {timeLeft.seconds}
              </div>
              <div className="text-xs sm:text-[13px]  uppercase">Seconds</div>
            </div>
          </div>

          <div className=" bg-opacity-40 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm mb-2 sm:mb-4 md:mb-6">
              With expected attendees from over 70 countries, this event is
              unmatched in its international reach. Explore sections dedicated
              to key industry verticals such as regulation, marketing, payments
              etc and participate in targeted sessions to earn industry insights
              and knowledge.
            </p>
          </div>
        </div>

        {/* Scroll Down Button */}
        <div className="absolute hidden lg:block bottom-4 sm:bottom-6 md:bottom-8 xl:bottom-12 left-1/2 transform -translate-x-1/2">
          <a
            href="#numbers"
            className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white bg-black bg-opacity-50 hover:bg-green-600 transition duration-300"
            aria-label="Scroll down"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
