import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AboutDropdown, PublicationsDropdown, IGamingDirectory, NewsDropdown } from "./DropdownMenus";
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaTelegramPlane, FaSearch, FaFacebook } from "react-icons/fa";

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const { t } = useTranslation();

    // Calculate time left until the event (May 7, 2025)
    useEffect(() => {
        const calculateTimeLeft = () => {
            const eventDate = new Date('July 28, 2026').getTime();
            const now = new Date().getTime();
            const difference = eventDate - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
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

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Close sidebar when clicking outside on smaller screens
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024 && isSidebarOpen) {
                setSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [isSidebarOpen]);

    return (
        <div className="relative bg-black h-screen">
            <header className={`fixed top-0 left-0 w-full inset-x-0 z-30 py-2 sm:py-3 md:py-4 xl:py-6 transition-all duration-700 ease-in-out ${
                isScrolled 
                    ? "bg-gray-100 shadow-md drop-shadow-md text-black"  
                    : "bg-transparent text-white"
            }`}>
                <div className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl">
                    <div className="flex items-center lg:justify-between relative">
                        {/* Hamburger Menu - Only visible on small screens */}
                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                type="button"
                                className={`cursor-pointer p-2 transition-all duration-200 rounded-full text-green-600`}
                                aria-label="Toggle menu"
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Logo */}
                        <div className="flex flex-shrink-0 lg:mx-0 ml-4">
                            <NavLink to="/" title="iGaming Afrika" className="inline-flex rounded-md">
                                <img className="w-auto h-10 sm:h-12 md:h-16 lg:h-20" src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png" alt="iGaming Afrika" />
                            </NavLink>
                        </div>

                        {/* Desktop Nav */}
                        <nav
                            className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-4 xl:space-x-7 whitespace-nowrap w-full max-w-3xl"
                        >
                            <NewsDropdown isScrolled={isScrolled} isInSidebar={false} />
                            <AboutDropdown isScrolled={isScrolled} />
                            <PublicationsDropdown isScrolled={isScrolled} />
                            <IGamingDirectory isScrolled={isScrolled} />
                            <button className={`hover:bg-green-600 hover:bg-opacity-20 hover:cursor-pointer text-xs text-white font-bold py-1.5 px-4 border border-green-600 rounded-md ${isScrolled ? "text-white bg-green-600" : "text-white"}`}>
                               <NavLink to="/register" className="" >
                                 PRE-REGISTER 2026
                               </NavLink>
                            </button>
                        </nav>

                        {/* Right Side Social Links */}
                        <div className="hidden lg:flex items-center space-x-2 xl:space-x-3 sm:text-lg">
                            <a href="https://x.com/igamingafrika/" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-400`} aria-label="Twitter">
                                <FaTwitter />
                            </a>
                            <a href="https://www.linkedin.com/company/igamingafrika/" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-700`} aria-label="LinkedIn">
                                <FaLinkedin />
                            </a>
                            <a href="https://www.youtube.com/@igamingafrika?themeRefresh=1" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-red-600`} aria-label="YouTube">
                                <FaYoutube />
                            </a>
                            <a href="https://www.instagram.com/igamingafrika/" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-pink-500`} aria-label="Instagram">
                                <FaInstagram />
                            </a>
                            <a href="https://t.me/igamingafrika" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-500`} aria-label="Telegram">
                                <FaTelegramPlane />
                            </a>
                            <a href="https://www.facebook.com/IgamingAfrika/" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-500`} aria-label="Facebook">
                                <FaFacebook />
                            </a>
                            <button className={`${isScrolled ? "text-black" : "text-white"} ml-5 hover:text-gray-500`} aria-label="Search">
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar Overlay */}
            <div
                className={`fixed inset-0 z-20  bg-opacity-60 lg:hidden transition-opacity duration-300 ${
                    isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            />

            {/* Mobile Sidebar */}
            <div
                style={{ backgroundColor: 'rgb(20, 164, 92)' }}
                className={`fixed top-0 left-0 z-30 w-full h-screen transform transition-transform duration-300 lg:hidden ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                aria-label="Mobile navigation"
            >
                <div className="flex flex-col h-full overflow-y-auto py-4 px-4 sm:px-8 space-y-5">
                    <div className="flex justify-center items-center">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="cursor-pointer self-center text-xl text-white hover:text-gray-200"
                            aria-label="Close menu"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mt-2">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full py-2 pl-5 pr-10 rounded-3xl text-white text-sm focus:outline-none"
                            style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                        />
                        <FaSearch className="absolute right-4 top-2.5 text-white text-md font-semibold" />
                    </div>

                    {/* Mobile Menu Items */}
                    <div className="flex flex-col space-y-4">
                        <NewsDropdown isScrolled={false} isInSidebar={true} />
                        <AboutDropdown isScrolled={false} isInSidebar={true} />
                        <PublicationsDropdown isScrolled={false} isInSidebar={true} />
                        <IGamingDirectory isScrolled={false} isInSidebar={true} />
                        <button className={`hover:bg-green-600 hover:bg-opacity-20 self-center hover:cursor-pointer w-1/4 text-xs text-white font-bold py-1.5 px-4 border border-white rounded-md`}>
                            <NavLink to="/register" className="" >
                                PRE-REGISTER 2026
                            </NavLink>
                        </button>
                    </div>
                    
                    {/* Mobile Social Icons */}
                    <div className="flex items-center justify-center space-x-4 text-xl mt-2 py-4">
                        <a href="https://x.com/igamingafrika/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400" aria-label="Twitter">
                            <FaTwitter />
                        </a>
                        <a href="https://www.linkedin.com/company/igamingafrika/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-700" aria-label="LinkedIn">
                            <FaLinkedin />
                        </a>
                        <a href="https://www.youtube.com/@igamingafrika?themeRefresh=1" target="_blank" rel="noopener noreferrer" className="text-white hover:text-red-600" aria-label="YouTube">
                            <FaYoutube />
                        </a>
                        <a href="https://www.instagram.com/igamingafrika/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500" aria-label="Instagram">
                            <FaInstagram />
                        </a>
                        <a href="https://t.me/igamingafrika" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500" aria-label="Telegram">
                            <FaTelegramPlane />
                        </a>
                        <a href="https://www.facebook.com/IgamingAfrika/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-500" aria-label="Facebook">
                            <FaFacebook />
                        </a>
                    </div>
                </div>
            </div>

            {/* Hero Section with Event Details */}
            <div className="relative flex items-center justify-center h-full pt-16 sm:pt-20 md:pt-24 pb-12">
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
                        {t('your_browser_does_not_support_the_video_tag')}
                    </video>
                    {/* Dark overlay for better text visibility */}
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                </div>

                <div className="relative z-10 text-center text-white px-4 w-full max-w-4xl mx-auto">
                    <img
                        src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png"
                        alt="iGaming Afrika Logo"
                        className="w-full max-w-xs md:max-w-sm mx-auto mb-4 sm:mb-6"
                    />
                    <p className="text-md sm:text-5xl font-semibold mb-2 sm:mb-3">iGaming AFRIKA Summit</p>
                    <p className="text-md sm:text-xl font-semibold mb-2 sm:mb-3">NAIROBI, KENYA • 28-31 JULY, 2026</p>
                    {/* <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2">28-31 JULY, 2026</h1> */}
                    <p className="text-sm sm:text-[16px] mb-6 sm:mb-8"> Sarit Expo Center, Nairobi, Kenya</p>
                    
                    {/* Countdown Timer */}
                    <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4 mb-6 sm:mb-8">
                        <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.days}</div>
                            <div className="text-xs sm:text-sm uppercase">Days</div>
                        </div>
                        <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.hours}</div>
                            <div className="text-xs sm:text-sm uppercase">Hours</div>
                        </div>
                        <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.minutes}</div>
                            <div className="text-xs sm:text-sm uppercase">Minutes</div>
                        </div>
                        <div className="text-center px-2 sm:px-3 py-1 sm:py-2  bg-opacity-30 rounded">
                            <div className="text-lg sm:text-xl md:text-2xl font-bold">{timeLeft.seconds}</div>
                            <div className="text-xs sm:text-sm uppercase">Seconds</div>
                        </div>
                    </div>

                    <div className=" bg-opacity-40 backdrop-blur-sm rounded-lg p-3 sm:p-4 md:p-6 max-w-lg sm:max-w-xl md:max-w-2xl mx-auto">
                        <p className="text-xs sm:text-sm md:text-md mb-6 sm:mb-8 md:mb-10">
                            With expected attendees from over 70 countries, this event is unmatched in its international reach. 
                            Explore sections dedicated to key industry verticals such as regulation, marketing, payments etc and 
                            participate in targeted sessions to earn industry insights and knowledge. 
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 hover:cursor-pointer text-sm text-white font-bold self-center w-3/4 md:w-1/2 py-2 px-4 md:py-3 md:px-8 border border-green-600 rounded-md">
                               <NavLink to="/register" >
                                 PRE-REGISTER 2026
                               </NavLink>
                            </button>
                            {/* <button className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 text-white text-sm hover:cursor-pointer font-bold py-2 px-6 border border-green-600 rounded-md">
                                LIST OF ATTENDEES 2025
                            </button> */}
                           
                        </div>
                    </div>
                </div>
                
                {/* Scroll Down Button */}
                <div className="absolute hidden lg:block bottom-4 sm:bottom-6 md:bottom-8 xl:bottom-12 left-1/2 transform -translate-x-1/2">
                    <a 
                        href="#numbers" 
                        className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-white bg-black bg-opacity-50 hover:bg-green-600 transition duration-300"
                        aria-label="Scroll down"
                    >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;