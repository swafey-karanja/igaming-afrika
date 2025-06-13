// components/SocialIcons.jsx
import React from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaTelegramPlane,
  FaFacebook,
  FaSearch,
} from "react-icons/fa";

const SocialIcons = ({ isScrolled }) => {
  const base = isScrolled ? "text-black" : "text-white";
  return (
    <div className="hidden lg:flex lg:items-center xl:space-x-3 lg:space-x-3 sm:text-lg lg:text-lg">
      {[
        {
          href: "https://x.com/igamingafrika/",
          icon: <FaTwitter />,
          hover: "hover:text-blue-400",
        },
        {
          href: "https://www.linkedin.com/company/igamingafrika/",
          icon: <FaLinkedin />,
          hover: "hover:text-blue-700",
        },
        {
          href: "https://www.youtube.com/@igamingafrika?themeRefresh=1",
          icon: <FaYoutube />,
          hover: "hover:text-red-600",
        },
        {
          href: "https://www.instagram.com/igamingafrika/",
          icon: <FaInstagram />,
          hover: "hover:text-pink-500",
        },
        {
          href: "https://t.me/igamingafrika",
          icon: <FaTelegramPlane />,
          hover: "hover:text-blue-500",
        },
        {
          href: "https://www.facebook.com/IgamingAfrika/",
          icon: <FaFacebook />,
          hover: "hover:text-blue-500",
        },
      ].map(({ href, icon, hover }, i) => (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${hover}`}
          aria-label="Social Icon"
        >
          {icon}
        </a>
      ))}
      <button
        className={`${base} ml-5 lg:ml-6 hover:text-gray-500`}
        aria-label="Search"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SocialIcons;
