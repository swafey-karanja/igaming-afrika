import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaFacebook,
  FaSpotify,
} from "react-icons/fa";
import { countries, menuItems, options } from "../data/data";
import DropdownMenu, { NewsDropdown } from "./DropdownMenus";

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

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
    <header
      className={`fixed top-[40px] md:top-[85px] xl:top-[95px] inset-x-0 z-40 pt-6 pb-4 md:pt-8 transition-all duration-700 ease-in-out ${
        isScrolled
          ? "bg-gray-100 shadow-md drop-shadow-md text-black"
          : "bg-transparent text-black"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-[1450px]">
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
            className={`flex flex-shrink-0 lg:mx-0 lg:flex-grow-0 justify-start ${
              isSidebarOpen ? "hidden" : ""
            }`}
          >
            {isHomePage ? (
              // ✅ Home page version – original logo, external link
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
            ) : (
              // ✅ Other pages – Summit logo, internal NavLink
              <NavLink
                to="/"
                title="iGaming Afrika"
                className="inline-flex rounded-md"
                onClick={() => {
                  if (window.location.pathname === "/") {
                    window.location.reload();
                  }
                }}
              >
                <img
                  className="w-auto h-10 sm:h-12 md:h-16 lg:h-18"
                  src="/Summit_Logo.png"
                  alt="iGaming Afrika"
                />
              </NavLink>
            )}
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
                className={`hover:bg-green-600 hover:text-white transition-colors duration-300 hover:bg-opacity-20 hover:cursor-pointer text-xs font-bold py-1.5 px-4 lg:py-2 lg:px-6 lg:text-sm border-3 border-lime-500 rounded-md ${
                  isScrolled ? "text-white bg-green-600" : "text-[#14a45c]"
                }`}
              >
                EXHIBIT/SPONSOR
              </button>
            </NavLink>
            <NavLink to="/speaker-registration">
              <button
                style={isScrolled ? { backgroundColor: "#14a45c" } : {}}
                className={`hover:bg-green-600 hover:text-white transition-colors duration-300 hover:bg-opacity-20 hover:cursor-pointer text-xs font-bold py-1.5 px-4 lg:py-2 lg:px-6 lg:text-sm border-3 border-lime-500 rounded-md ${
                  isScrolled ? "text-white bg-green-600" : "text-[#14a45c]"
                }`}
              >
                BECOME A SPEAKER
              </button>
            </NavLink>
          </nav>
        </div>
      </div>

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
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-3 xl:px-6 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm"
                >
                  <NavLink
                    to="/register"
                    className="block text-[10px] md:text-[14px]"
                  >
                    REGISTER INTEREST
                  </NavLink>
                </button>
              </div>
              <div className="">
                <button
                  onClick={() => setSidebarOpen(!isSidebarOpen)}
                  className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold px-3 py-3 xl:px-6 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm"
                >
                  <NavLink
                    to="/speaker-registration"
                    className="block text-[10px] md:text-[14px]"
                  >
                    BECOME A SPEAKER
                  </NavLink>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Social Icons */}
          <div className="border-t border-white/10 p-6 pb-10">
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
    </header>
  );
};

export default Navbar;
