import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaSearch,
  FaFacebook,
  FaSpotify,
} from "react-icons/fa";
import { countries, menuItems, options } from "../../data/dropdownData";
import DropdownMenu, { NewsDropdown } from "../utils/DropdownMenus";
import { CalendarDropdown } from "../utils/CalendarDropdown";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const navigate = useNavigate();

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
    <div className="relative min-h-screen">
      <header
        className={`fixed top-0 left-0 w-full inset-x-0 z-40 py-2 sm:py-3 md:py-4 transition-all duration-700 ease-in-out ${
          isScrolled
            ? "bg-[#ffffff] shadow-md drop-shadow-md text-black"
            : "bg-transparent text-white"
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1600px]">
          <div className="flex items-center xl:justify-between xl:items-stretch xl:flex-row relative">
            {/* Hamburger Menu - Only visible on small screens */}
            <div
              className={`xl:hidden flex items-center ${
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
              className={`flex flex-shrink-0 lg:mx-0 lg:flex-grow-0 ${
                isSidebarOpen ? "hidden" : ""
              }`}
            >
              <a
                href="https://igamingafrika.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="iGaming Afrika"
                className="inline-flex rounded-md"
              >
                <img
                  className="w-auto h-10 sm:h-12 md:h-16 lg:h-18"
                  src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png"
                  alt="iGaming Afrika"
                />
              </a>
            </div>
            {/* Desktop Nav */}
            <nav className="hidden xl:flex lg:items-center lg:justify-center xl:space-x-7 lg:space-x-6 whitespace-nowrap w-full max-w-3xl lg:max-w-4xl">
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
              <NavLink to="/register">
                <button
                  style={isScrolled ? { backgroundColor: "#14a45c" } : {}}
                  className={`hover:bg-green-600 hover:bg-opacity-20 hover:cursor-pointer text-xs text-white font-bold py-1.5 px-4 lg:py-2 lg:px-6 lg:text-sm border border-green-600 rounded-md ${
                    isScrolled ? "text-white" : "text-white"
                  }`}
                >
                  EXHIBIT/SPONSOR
                </button>
              </NavLink>

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
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-20 bg-opacity-60 xl:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 z-30 w-full h-screen transform transition-transform duration-300 ease-in-out xl:hidden bg-green-600 ${
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
                className="md:w-8 md:h-8 w-5 h-5"
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
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-3 xl:px-6 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm">
                  <NavLink
                    to="/register"
                    className="block text-[10px] md:text-[14px]"
                  >
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
                href="https://x.com/iGASummit?t=N8kO_9qtwaBu3YeUUaBQNA&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-400 transition-all duration-200"
                aria-label="Twitter"
              >
                <FaTwitter className="text-sm" />
              </a>
              <a
                href="https://www.linkedin.com/company/igasummit/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-blue-700 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="https://www.youtube.com/@iGASummit"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-red-600 transition-all duration-200"
                aria-label="YouTube"
              >
                <FaYoutube className="text-sm" />
              </a>
              <a
                href="https://www.instagram.com/igasummit?igsh=MXF6YXdpYXRxdzBoaQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-pink-500 transition-all duration-200"
                aria-label="Instagram"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="https://open.spotify.com/show/11m2XkXyP3MmjHRgXEVgwx?si=8cb7aaae5d2a47bc"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-green-600 transition-all duration-200"
                aria-label="Spotify"
              >
                <FaSpotify className="text-sm" />
              </a>
              <a
                href="https://www.facebook.com/share/1Ay79xHcfi/"
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
      <div className="relative flex items-center justify-center min-h-screen pt-15 xl:pt-25 2xl:pt-25 pb-0">
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

        <div className="relative z-10 text-center text-white px-4 w-full max-w-6xl mx-auto">
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

          <div className="backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <p className="text-xs sm:text-sm md:text-md mb-6 sm:mb-12 leading-relaxed">
              With expected attendees from over 100 countries, this event is
              unmatched in its international reach. Explore sections dedicated
              to key industry verticals such as regulation, affiliate marketing,
              AI, Esports, Crypto, payments etc and participate in targeted
              sessions to earn industry insights and knowledge.
            </p>

            <div className="flex justify-center mb-4">
              <button className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 transition-colors duration-300 text-sm lg:text-base text-white font-bold w-full max-w-xs sm:max-w-sm py-3 px-4 border-2 border-green-600 rounded-md">
                <NavLink to="/register">Register interest</NavLink>
              </button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 transition-colors duration-300 text-xs sm:text-sm lg:text-base text-white font-bold w-full py-3 px-4 border-2 border-green-600 rounded-md whitespace-normal sm:whitespace-nowrap text-center"
                onClick={() => {
                  navigate("/checkout", {
                    state: { selectedTicket: operatorPassData },
                  });
                }}
              >
                Operators - Apply for the Free Operator's Pass
              </button>
              <button
                className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 transition-colors duration-300 text-xs sm:text-sm lg:text-base text-white font-bold w-full py-3 px-4 border-2 border-green-600 rounded-md whitespace-normal sm:whitespace-nowrap text-center"
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
