// components/MobileSidebar.jsx
import React from "react";
import {
  FaSearch,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DropdownMenu, { NewsDropdown } from "./DropdownMenus";
import { countries, menuItems, options } from "../../data/dropdownData";

const MobileSidebar = ({ isSidebarOpen, setSidebarOpen, isScrolled }) => (
  <>
    {/* Overlay */}
    <div
      className={`fixed inset-0 z-20 bg-opacity-60 lg:hidden transition-opacity duration-300 ${
        isSidebarOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setSidebarOpen(false)}
      aria-hidden="true"
    />

    {/* Sidebar */}
    <div
      className={`fixed top-0 left-0 z-30 w-full h-screen transform transition-transform duration-300 ease-in-out lg:hidden bg-green-600 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Mobile navigation"
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b border-white/10">
          <button
            onClick={() => setSidebarOpen(false)}
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Search */}
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

            {/* Navigation */}
            <nav className="space-y-2">
              <NewsDropdown isScrolled={isScrolled} isInSidebar />
              <DropdownMenu
                label="Countries"
                isScrolled={isScrolled}
                isInSidebar
                items={countries}
              />
              <DropdownMenu
                label="Publications"
                isScrolled={isScrolled}
                isInSidebar
                items={menuItems}
              />
              <DropdownMenu
                label="iGaming Directory"
                isScrolled={isScrolled}
                isInSidebar
                items={options}
              />
            </nav>

            {/* CTA */}
            <div className="pt-4">
              <button className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-200 backdrop-blur-sm">
                <NavLink to="/register" className="block">
                  PRE-REGISTER 2026
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
            {[
              {
                href: "https://x.com/igamingafrika/",
                icon: <FaTwitter />,
                color: "hover:text-blue-400",
              },
              {
                href: "https://www.linkedin.com/company/igamingafrika/",
                icon: <FaLinkedin />,
                color: "hover:text-blue-700",
              },
              {
                href: "https://www.youtube.com/@igamingafrika?themeRefresh=1",
                icon: <FaYoutube />,
                color: "hover:text-red-600",
              },
              {
                href: "https://www.instagram.com/igamingafrika/",
                icon: <FaInstagram />,
                color: "hover:text-pink-500",
              },
              {
                href: "https://t.me/igamingafrika",
                icon: <FaTelegramPlane />,
                color: "hover:text-blue-500",
              },
              {
                href: "https://www.facebook.com/IgamingAfrika/",
                icon: <FaFacebook />,
                color: "hover:text-blue-500",
              },
            ].map(({ href, icon, color }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-full bg-white/10 hover:bg-white/20 text-white ${color} transition-all duration-200`}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);

export default MobileSidebar;
