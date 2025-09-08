import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaSearch,
  FaFacebook,
} from "react-icons/fa";
import { countries, menuItems, options } from "../data/dropdownData";
import DropdownMenu, { NewsDropdown } from "./utils/DropdownMenus";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

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

  // Add scroll event listener to detect when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close sidebar when clicking outside on smaller screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isSidebarOpen) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isSidebarOpen]);

  return (
    <div className="relative bg-black">
      <header
        className={`fixed top-0 left-0 w-full inset-x-0 z-40 py-2 transition-all duration-700 ease-in-out ${
          isScrolled
            ? "bg-gray-100 shadow-md drop-shadow-md text-black"
            : "bg-transparent text-white"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px]">
          <div className="flex items-center lg:justify-between  lg:flex-row relative">
            {/* Hamburger Menu - Only visible on small screens */}
            <div
              className={`lg:hidden flex items-center ${
                isSidebarOpen ? "hidden" : ""
              }`}
            >
              <button
                onClick={() => setSidebarOpen(!isSidebarOpen)}
                type="button"
                className={`cursor-pointer p-2 transition-all duration-200 rounded-full text-green-600`}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
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

            {/* Logo */}
            <div
              className={`flex flex-shrink-0 lg:mx-0 lg:flex-grow-0 ml-4 ${
                isSidebarOpen ? "hidden" : ""
              }`}
            >
              <NavLink
                to="/"
                title="iGaming Afrika"
                className="inline-flex rounded-md"
                onClick={() => {
                  // If we're already on the home page, force a reload
                  if (window.location.pathname === "/") {
                    window.location.reload();
                  }
                }}
              >
                <img
                  className="w-auto h-18 sm:h-20 md:h-24 lg:h-30"
                  src="/Summit_Logo.png"
                  alt="iGaming Afrika"
                />
              </NavLink>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden lg:flex lg:items-center lg:justify-center xl:space-x-7 lg:space-x-6 whitespace-nowrap w-full max-w-2xl">
              <NewsDropdown isScrolled={isScrolled} isInSidebar={false} />
              <DropdownMenu
                label="countries"
                isScrolled={isScrolled}
                isInSidebar={false}
                items={countries}
              />
              <DropdownMenu
                label="Publications"
                isScrolled={isScrolled}
                isInSidebar={false}
                items={menuItems}
              />
              <DropdownMenu
                label="iGaming Directory"
                isScrolled={isScrolled}
                isInSidebar={false}
                items={options}
              />

              <button
                onClick={() => {
                  const form = document.getElementById("contact-form");
                  form?.scrollIntoView({ behavior: "smooth" });
                }}
                style={isScrolled ? { backgroundColor: "#14a45c" } : {}}
                className={`hover:bg-green-600 hover:bg-opacity-20 hover:cursor-pointer text-xs text-white font-bold py-1.5 px-4 lg:py-2 lg:px-6 lg:text-sm border border-green-600 rounded-md ${
                  isScrolled ? "text-white bg-green-600" : "text-white"
                }`}
              >
                CONTACT US
              </button>
            </nav>

            {/* Right Side Social Links */}
            {/* <div className="hidden lg:flex lg:items-center xl:space-x-3 lg:space-x-3 sm:text-lg lg:text-lg">
              <button
                className={`${
                  isScrolled ? "text-black" : "text-white"
                } ml-5 lg:ml-6 hover:text-gray-500`}
                aria-label="Search"
              >
                <FaSearch />
              </button>
            </div> */}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-opacity-60 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 w-full h-screen transform transition-transform duration-300 ease-in-out lg:hidden bg-green-600 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="flex justify-between items-center p-3 border-b border-white/10">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200 text-white"
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full py-3 pl-4 pr-12 rounded-xl text-white text-sm placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <FaSearch className="text-white/70 text-sm" />
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                <NewsDropdown isScrolled={isScrolled} isInSidebar={true} />
                <DropdownMenu
                  label="Countries"
                  isScrolled={isScrolled}
                  isInSidebar={true}
                  items={countries}
                />
                <DropdownMenu
                  label="Publications"
                  isScrolled={isScrolled}
                  isInSidebar={true}
                  items={menuItems}
                />
                <DropdownMenu
                  label="iGaming Directory"
                  isScrolled={isScrolled}
                  isInSidebar={true}
                  items={options}
                />
              </nav>

              {/* CTA Button */}
              <div className="pt-4">
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm">
                  <NavLink to="/register" className="block">
                    REGISTER INTEREST
                  </NavLink>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Social Icons */}
          <div className="border-t border-white/10 p-6">
            <div className="text-white/70 text-xs font-medium mb-4 text-center">
              Follow Us
            </div>
            <div className="flex items-center justify-center gap-4">
              <a
                href="https://x.com/igamingafrika/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-400 transition-all duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="https://www.linkedin.com/company/igamingafrika/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-700 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="https://www.youtube.com/@igamingafrika?themeRefresh=1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-red-600 transition-all duration-200"
                aria-label="YouTube"
              >
                <FaYoutube className="text-sm" />
              </a>
              <a
                href="https://www.instagram.com/igamingafrika/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-pink-500 transition-all duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="https://t.me/igamingafrika"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-500 transition-all duration-200"
                aria-label="Telegram"
              >
                <FaTelegramPlane className="text-sm" />
              </a>
              <a
                href="https://www.facebook.com/IgamingAfrika/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-500 transition-all duration-200"
                aria-label="Facebook"
              >
                <FaFacebook className="text-sm" />
              </a>
            </div>
          </div>
        </div>
      </div>

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
            src="/Summit_Logo.png"
            alt="iGaming Afrika Logo"
            className="w-full max-w-xs mx-auto"
          />
          <p className="text-md sm:text-xl lg:text-xl font-semibold mb-2 sm:mb-3 lg:mb-4">
            4 - 6 MAY, 2026
          </p>
          {/* <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">28-31 JULY, 2026</h1> */}
          <p className="text-sm sm:text-[14px] mb-6 sm:mb-8 font-semibold">
            {" "}
            Sarit Expo Centre, Nairobi, Kenya
          </p>
          <p className="text-md sm:text-3xl lg:text-3xl font-semibold mb-2 sm:mb-3 lg:mb-4 text-[#14a45c]">
            The Heart of Gaming in Africa
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
        </div>
      </div>
    </div>
  );
};

export default Header;
