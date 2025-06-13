import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { newsCategories } from "../../data/dropdownData";

export default function DropdownMenu({
  label,
  items = [],
  isInSidebar = false,
  isScrolled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedRegion, setExpandedRegion] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const toggleRegion = (title) =>
    setExpandedRegion((prev) => (prev === title ? null : title));

  const handleMouseEnter = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setCloseTimeout(null);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => setIsOpen(false), 300);
    setCloseTimeout(timeout);
  };

  const labelColor = isScrolled ? "text-black" : "text-white";

  if (isInSidebar) {
    return (
      <div className="text-white">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center text-[14px] font-semibold uppercase transition-all duration-200 text-white hover:text-gray-200 hover:pl-2 focus:outline-none focus:text-gray-200 focus:pl-2 py-1 cursor-pointer"
        >
          {label}
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pl-4 space-y-2 py-2">
            {items.map((item, index) => (
              <div key={index}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleRegion(item.title)}
                      className="flex justify-between w-full text-left text-white hover:text-gray-200 hover:pl-2 transition-all duration-200 focus:outline-none focus:text-gray-200 focus:pl-2 py-2 text-sm font-medium"
                    >
                      {item.title}
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          expandedRegion === item.title ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`pl-4 transition-all duration-300 ease-in-out overflow-hidden ${
                        expandedRegion === item.title
                          ? "max-h-96 opacity-100"
                          : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-2 py-1">
                        {item.subItems.map((sub, idx) => (
                          <li key={idx}>
                            <a
                              href={sub.url}
                              className="block text-white hover:text-gray-200 hover:pl-2 transition-all duration-200 focus:outline-none focus:text-gray-200 focus:pl-2 py-1 text-sm"
                            >
                              {sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="block text-white hover:text-gray-200 hover:pl-2 transition-all duration-200 focus:outline-none focus:text-gray-200 focus:pl-2 py-2 text-sm font-medium"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center gap-1 text-xs font-semibold uppercase transition-colors ${labelColor} cursor-pointer hover:underline`}
      >
        {label}
        <ChevronDown
          className={`w-3 h-3 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`absolute left-0 mt-2 w-72 bg-white shadow-lg z-20 transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="border-t-4 border-green-600" />
        <div className="py-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveSubmenu(item.title)}
            >
              {item.subItems ? (
                <>
                  <a
                    href={item.url || "#"}
                    className="flex justify-between items-center w-full px-4 py-2 text-xs text-gray-700 hover:text-green-600"
                  >
                    {item.title}
                    <ChevronRight className="w-3 h-3 ml-2" />
                  </a>
                  <div
                    className={`absolute left-full top-0 w-72 bg-white shadow-lg z-30 transition-opacity ${
                      activeSubmenu === item.title
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                  >
                    <div className="border-t-4 border-green-600" />
                    <div className="py-1">
                      {item.subItems.map((sub, idx) => (
                        <a
                          key={idx}
                          href={sub.url}
                          className="block px-4 py-2 text-xs text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        >
                          {sub.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.url}
                  className="block px-4 py-2 text-xs text-gray-700 hover:text-green-600 hover:bg-gray-50"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NewsDropdown({ isScrolled, isInSidebar = false }) {
  const [isOpen, setIsOpen] = useState(false); // For desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [openSections, setOpenSections] = useState({
    general: false,
    tech: false,
  });

  if (isInSidebar) {
    const toggleSection = (section) => {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    return (
      <div className="text-white text-sm">
        {/* News Toggle (main) with smooth collapse/expand */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full flex justify-between items-center text-[14px] uppercase font-bold tracking-wide cursor-pointer"
        >
          News
          <svg
            className={`w-4 h-4 transition-transform ${
              isSidebarOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown container for News */}
        <div
          className={`transition-all duration-800 ease-in-out mb-3 overflow-hidden ${
            isSidebarOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-3 space-y-4.5 pl-4">
            {/* General Section */}
            <div>
              <button
                onClick={() => toggleSection("general")}
                className="flex justify-between items-center w-full text-white text-[14px] cursor-pointer"
              >
                General
                <svg
                  className={`w-3.5 h-3.5 mr-4 transition-transform ${
                    openSections.general ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`transition-all duration-800 ease-in-out overflow-hidden ${
                  openSections.general
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 pl-2 mt-2">
                  {newsCategories.general.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        className="block text-white hover:text-green-400 px-1 py-1.5 rounded text-[13px] cursor-pointer"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tech Section */}
            <div>
              <button
                onClick={() => toggleSection("tech")}
                className="flex justify-between items-center w-full text-white text-[14px] cursor-pointer"
              >
                Tech
                <svg
                  className={`w-3.5 h-3.5 mr-4 transition-transform ${
                    openSections.tech ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`transition-all duration-800 ease-in-out overflow-hidden ${
                  openSections.tech
                    ? "max-h-[1000px] opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="space-y-2 pl-2 mt-2">
                  {newsCategories.tech.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        className="block text-white hover:text-green-400 px-1 py-1.5 rounded text-[13px] cursor-pointer"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop behavior

  const handleMouseEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 300);
    setCloseTimeout(timeout);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`px-0 py-2 text-xs uppercase hover:text-red-600 font-[600] transition-colors flex items-center ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        News
        <svg
          className="w-3 h-3 ml-1 transition-transform font-semibold"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`absolute left-0 mt-2 w-[40rem] bg-white shadow-lg z-10 transition-all ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="border-t-4 border-green-600"></div>

        <div className="grid grid-cols-2 p-6 gap-8">
          {/* General Column */}
          <div className="pr-4">
            <div className="border-b-2 border-green-600 pb-2 mb-3">
              <h3 className="text-sm font-bold text-gray-900">General</h3>
            </div>
            <ul className="space-y-2">
              {newsCategories.general.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="block text-xs text-gray-700 hover:text-green-600 hover:bg-gray-50 py-1 px-1 rounded"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Column */}
          <div className="pl-4">
            <div className="border-b-2 border-green-600 pb-2 mb-3">
              <h3 className="text-sm font-bold text-gray-900">Tech</h3>
            </div>
            <ul className="space-y-2">
              {newsCategories.tech.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.url}
                    className="block text-xs text-gray-700 hover:text-green-600 hover:bg-gray-50 py-1 px-1 rounded"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
