import React from "react";
import { useState } from "react";

//News dropdown
export function NewsDropdown({ isScrolled, isInSidebar = false }) {
  const [isOpen, setIsOpen] = useState(false); // For desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [openSections, setOpenSections] = useState({
    general: false,
    tech: false,
  });

  const newsCategories = {
    general: [
      { title: "News", url: "https://igamingafrika.com/news/" },
      { title: "Sports Betting", url: "https://igamingafrika.com/sports-betting-africa-news/" },
      { title: "Casino", url: "https://igamingafrika.com/casino-africa-gambling-news/" },
      { title: "Lotteries", url: "https://igamingafrika.com/lotteries-africa-news/" },
      { title: "Sports", url: "https://igamingafrika.com/sports-news/" },
      { title: "Esports", url: "https://igamingafrika.com/esports-news-africa/" },
      { title: "Partnerships", url: "http://igamingafrika.com/partnerships/" },
      { title: "Press Release", url: "https://igamingafrika.com/press-release/" },
      { title: "Business", url: "https://igamingafrika.com/business/" },
      { title: "International", url: "https://igamingafrika.com/international-gambling/" }
    ],
    tech: [
      { title: "Technology", url: "https://igamingafrika.com/technology-news-africa/" },
      { title: "Crypto", url: "https://igamingafrika.com/crypto-news-africa/" },
      { title: "Fintech", url: "https://igamingafrika.com/fintech-africa-news/" }
    ]
  };

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
          className="w-full flex justify-between items-center text-[15px] mb-2 font-bold tracking-wide cursor-pointer"
        >
          News
          <svg
            className={`w-4 h-4 mr-4 transition-transform ${
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
        <hr className="text-green-700 opacity-40 w-[98%]" />
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
      <button className={`px-0 py-2 text-xs uppercase hover:text-red-600 font-[600] transition-colors flex items-center ${isScrolled ? "text-black" : "text-white"}`}>
        News
        <svg
          className="w-3 h-3 ml-1 transition-transform font-semibold"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute left-0 mt-2 w-[40rem] bg-white shadow-lg z-10 transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
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
};

//countries dropdown
export function AboutDropdown({ isInSidebar = false,  isScrolled }) {
  const [isOpen, setIsOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [expandedRegion, setExpandedRegion] = useState(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleRegion = (title) => {
    setExpandedRegion((prev) => (prev === title ? null : title));
  };


  const countries = [
    {
      title: "West Africa",
      url:"https://igamingafrika.com/west-africa-gambling/",
      subItems: [
        {
          title: "Nigeria",
          url: "https://igamingafrika.com/nigeria-gambling-news/"
        },
        {
          title: "Ghana",
          url: "https://igamingafrika.com/ghana-gambling-news/"
        }
      ]
    },

    {
      title: "East Africa",
      url: "https://igamingafrika.com/east-africa-gambling/",
      subItems: [
        {
          title: "Kenya",
          url: "https://igamingafrika.com/kenya-gambling-news/"
        },
        {
          title: "Tanzania",
          url: "https://igamingafrika.com/tanzania-gambling-news/"
        },
        {
          title: "Uganda",
          url: "https://igamingafrika.com/uganda-gambling-news/"
        },
        {
          title: "Ethiopia",
          url: "https://igamingafrika.com/ethiopia-gambling-news/"
        },
        {
          title: "Rwanda",
          url: "https://igamingafrika.com/rwanda-gambling-news/"
        },
      ]
    },
    {
      title: "Central Africa",
      url: "https://igamingafrika.com/central-africa-gambling/",
      subItems: [
        {
          title: "Congo DRC",
          url: "https://igamingafrika.com/congo-drc-gambling-news/"
        },
        {
          title: "Cameroon",
          url: "https://igamingafrika.com/cameroon-gambling-news/"
        },
        {
          title: "Angola",
          url: "https://igamingafrika.com/angola-gambling-news/"
        },
      ]
    },
    {
      title: "Southern Africa",
      url: "https://igamingafrika.com/southern-africa-gambling/",
      subItems: [
        {
          title: "South Africa",
          url: "https://igamingafrika.com/south-africa-gambling-news/"
        },
        {
          title: "Mozambique",
          url: "https://igamingafrika.com/mozambique-gambling-news/"
        },
        {
          title: "Zambia",
          url: "https://igamingafrika.com/zambia-gambling-news/"
        },
        {
          title: "Malawi",
          url: "https://igamingafrika.com/malawi-gambling-news/"
        },
        {
          title: "Botswana",
          url: "https://igamingafrika.com/botswana-gambling-news/"
        },
      ]
    },
    {
      title: "North Africa",
      url: "https://igamingafrika.com/north-africa-gambling/",
      subItems: [
        {
          title: "Tunisia",
          url: "https://igamingafrika.com/tunisia-gambling-news/"
        },
      ]
    },
    {
      title: "Global",
      url: "https://igamingafrika.com/global-gambling-news/"
    }
  ];

  if (isInSidebar) {
    return (
      <div className="text-white text-sm">
        <button
          onClick={toggleDropdown}
          className="w-full flex justify-between items-center text-[15px] mb-3 font-bold tracking-wide cursor-pointer"
        >
          Countries
          <svg
            className={`w-4 h-4 mr-4 font-bold transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div className={`transition-all duration-800 overflow-hidden ${isOpen ? 'max-h-screen mt-2' : 'max-h-0'}`}>
          {countries.map((item, index) => (
            <div key={index} className="mb-3">
              {item.subItems ? (
                <>
                  <button
                    onClick={() => toggleRegion(item.title)}
                    className="flex justify-between w-full text-left px-3.5 py-1.5 text-white cursor-pointer hover:text-green-400 rounded text-[14px]"
                  >
                    {item.title}
                    <svg
                      className={`w-3.5 h-3.5 mr-1 transition-transform ${expandedRegion === item.title ? "rotate-180" : "rotate-0"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div className={`transition-all duration-800 overflow-hidden ${expandedRegion === item.title ? 'max-h-96 mt-2' : 'max-h-0'}`}>
                    <ul className="pl-4 space-y-3">
                      {item.subItems.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <a
                            href={sub.url}
                            className="block px-2 py-1 text-white hover:text-green-400 rounded text-sm"
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
                  className="flex justify-between w-full text-left px-3.5 py-1 text-white cursor-pointer hover:text-green-400 rounded text-[14px] mb-2"
                >
                  {item.title}
                </a>
              )}
            </div>
          ))}
        </div>
        <hr className="text-green-700 opacity-40 w-[98%]" />
      </div>
    );
  }

  // Fallback for desktop 

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

  const handleSubmenuEnter = (item) => {
    if (typeof item === 'object') {
      setActiveSubmenu(item.title);
    }
  };
  
  return (
    <div 
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={`px-0 py-2 text-xs uppercase hover:text-red-600 font-[600] transition-colors  flex items-center ${isScrolled ? "text-black" : "text-white"}`}>
        Countries
        {/* Chevron icon indicating dropdown */}
        <svg 
          className="w-3 h-3 ml-1 transition-transform font-semibold"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`absolute left-0 mt-2 w-54 bg-white shadow-lg z-10 transition-all ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="border-t-4 border-green-600"></div>
        
        <div className="">
          {countries.map((item, index) => (
            <div 
              key={index} 
              className="relative group"
              onMouseEnter={() => handleSubmenuEnter(item)}
            >
              {item.subItems ? (
                <>
                  <a
                    href={item.url}
                    className="flex justify-between items-center w-full px-4 py-2 text-xs text-gray-700 hover:text-green-600"
                  >
                    {item.title}
                    <svg
                      className="w-3 h-3 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  {/* Right-aligned submenu */}
                  <div className={`absolute left-full top-0 ml-0 w-56 bg-white shadow-lg z-20 transition-opacity ${activeSubmenu === item.title ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                    <div className="border-t-4 border-green-600"></div>
                    <div className="py-1">
                      {item.subItems?.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem?.url}
                          className="block px-4 py-2 text-xs text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        >
                          {subItem?.title}
                        </a>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <a
                  href={item.url}
                  className="block px-4 py-2 text-xs text-gray-700 hover:text-green-600 hover:bg-gray-50 cursor-pointer"
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

//publications dropdown
export function PublicationsDropdown({ isScrolled, isInSidebar = false }) {
  const [isOpen, setIsOpen] = useState(false); // Desktop hover
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Desktop submenu
  const [closeTimeout, setCloseTimeout] = useState(null); // Desktop close timeout

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile toggle
  const [openSections, setOpenSections] = useState({}); // Mobile submenu toggle

  const menuItems = [
    {
      title: "Magazine",
      url: "https://igamingafrika.com/magazine/"
    },
    {
      title: "Editor's Pick",
      subItems: [
        {
          title: "Articles",
          url: "https://igamingafrika.com/articles-igaming-africa/"
        },
        {
          title: "Opinion Pieces",
          url: "https://igamingafrika.com/opinion-pieces/"
        }
      ]
    },
    {
      title: "Podcasts",
      url: "https://igamingafrika.com/podcasts/"
    },
    {
      title: "Interviews",
      url: "https://igamingafrika.com/interviews/"
    },
    {
      title: "Webinars",
      url: "https://igamingafrika.com/webinars/"
    },
    {
      title: "Speakers",
      url: "https://igamingafrika.com/speakers/"
    }
  ];

  // ✅ Mobile behavior
  if (isInSidebar) {
    const toggleSection = (title) => {
      setOpenSections((prev) => ({
        ...prev,
        [title]: !prev[title]
      }));
    };

    return (
      <div className="text-white text-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full flex justify-between items-center text-[15px] pb-3 font-bold tracking-wide cursor-pointer"
        >
          Publications
          <svg
            className={`w-4 h-4 mr-4 transition-transform ${isSidebarOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`transition-all duration-800 ease-in-out mb-0.5 overflow-hidden ${
            isSidebarOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-3 space-y-3 pl-4">
            {menuItems.map((item, index) => (
              <div key={index}>
                {item.subItems ? (
                  <>
                    <button
                      onClick={() => toggleSection(item.title)}
                      className="flex justify-between items-center w-full text-white text-[14px] mb-1 ml-1 cursor-pointer"
                    >
                      {item.title}
                      <svg
                        className={`w-3.5 h-3.5 mr-5 transition-transform ${
                          openSections[item.title] ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`transition-all duration-800 ease-in-out overflow-hidden ${
                        openSections[item.title] ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <ul className="space-y-2 pl-2 mt-2">
                        {item.subItems.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            <a
                              href={subItem.url}
                              className="block text-white hover:text-green-400 px-1 py-1.5 rounded text-[13px] cursor-pointer"
                            >
                              {subItem.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <a
                    href={item.url}
                    className="block text-white hover:text-green-400 px-1 py-1.5 rounded text-[14px] cursor-pointer"
                  >
                    {item.title}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        <hr className="text-green-700 opacity-40 w-[98%]" />
      </div>
    );
  }

  // ✅ Desktop behavior
  const handleMouseEnter = () => {
    clearTimeout(closeTimeout);
    setIsOpen(true);
    setCloseTimeout(null);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsOpen(false);
      setActiveSubmenu(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  const handleSubmenuEnter = (item) => {
    if (typeof item === "object") {
      setActiveSubmenu(item.title);
    }
  };

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className={`px-0 py-2 text-xs uppercase hover:text-red-600 font-[600] transition-colors flex items-center ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        Publications
        <svg
          className="w-3 h-3 ml-1 transition-transform font-semibold"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute left-0 mt-2 w-56 bg-white shadow-lg z-10 transition-all ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="border-t-4 border-green-600"></div>

        <div className="py-1">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group" onMouseEnter={() => handleSubmenuEnter(item)}>
              {item.subItems ? (
                <>
                  <div className="flex justify-between items-center w-full px-4 py-2 text-xs text-gray-700 hover:text-green-600">
                    {item.title}
                    <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>

                  <div
                    className={`absolute left-full top-0 ml-0 w-56 bg-white shadow-lg z-20 transition-opacity ${
                      activeSubmenu === item.title ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <div className="border-t-4 border-green-600"></div>
                    <div className="py-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <a
                          key={subIndex}
                          href={subItem.url}
                          className="block px-4 py-2 text-xs text-gray-700 hover:text-green-600 hover:bg-gray-50"
                        >
                          {subItem.title}
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

export function IGamingDirectory({ isScrolled, isInSidebar = false }) {
  const [isOpen, setIsOpen] = useState(false); // Desktop open state
  const [closeTimeout, setCloseTimeout] = useState(null); // Desktop timeout

  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile accordion toggle

  const options = [
    { title: "Events Calendar", url: "https://igamingafrika.com/magazine/" },
    { title: "Community Forum", url: "https://t.me/igaminginafrica" },
    { title: "Gambling Regulation Boards", url: "https://igamingafrika.com/gambling-regulation-boards/" },
    { title: "Sports Betting Sites", url: "https://igamingafrika.com/sports-betting-sites/" },
    { title: "Casino Sites", url: "https://igamingafrika.com/casino-sites/" },
    { title: "Platform Providers", url: "https://igamingafrika.com/platform-providers/" },
    { title: "Land Based Suppliers", url: "https://igamingafrika.com/land-based-suppliers/" },
    { title: "Payment Providers", url: "https://igamingafrika.com/payment-providers/" },
    { title: "Game Providers", url: "https://igamingafrika.com/game-providers/" },
    { title: "Lottery Providers", url: "https://igamingafrika.com/lottery-providers/" },
    { title: "Top Games", url: "https://igamingafrika.com/top-games/" },
    { title: "Affiliate Management Platforms", url: "https://igamingafrika.com/affiliate-management-platforms/" },
    { title: "Crash Games", url: "https://igamingafrika.com/crash-games/" },
    { title: "Crash Games Providers", url: "https://igamingafrika.com/crash-games-providers/" },
    { title: "SMS Service Providers", url: "https://igamingafrika.com/sms-service-providers/" },
    { title: "Licensing Requirements", url: "https://igamingafrika.com/licensing-requirements/" },
    { title: "Renowned Executive Profiles", url: "https://igamingafrika.com/renowned-executive-profiles/" },
    { title: "iGaming Consulting", url: "/igaming-consulting" }
  ];

  // ✅ Mobile sidebar view
  if (isInSidebar) {
    return (
      <div className="text-white text-sm">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="w-full flex justify-between items-center text-[15px] pb-3 font-bold tracking-wide cursor-pointer"
        >
          iGaming Directory
          <svg
            className={`w-4 h-4 mr-4 transition-transform ${isSidebarOpen ? "rotate-180" : "rotate-0"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          className={`transition-all duration-800 mb-0.5 ease-in-out overflow-hidden ${
            isSidebarOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-3 space-y-3 pl-4">
            {options.map((item, index) => (
              <a
                key={index}
                href={item.url}
                className="block text-white hover:text-green-400 px-1 py-1.5 rounded text-[13px] cursor-pointer"
              >
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <hr className="text-green-700 opacity-40 w-[98%]" />
      </div>
    );
  }

  // ✅ Desktop hover dropdown view
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
        className={`px-0 py-2 text-xs font-[600] uppercase hover:text-red-600 transition-colors flex items-center ${
          isScrolled ? "text-black" : "text-white"
        }`}
      >
        iGaming Directory
        <svg
          className="w-3 h-3 ml-1 transition-transform font-semibold"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute left-0 mt-2 w-64 bg-white shadow-lg z-10 transition-all ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="border-t-4 border-green-600"></div>
        <div className="py-2">
          {options.map((option, index) => (
            <a
              key={index}
              href={option.url}
              className="block px-4 py-2 text-xs text-gray-900 hover:text-green-600 hover:bg-gray-50"
            >
              {option.title}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}