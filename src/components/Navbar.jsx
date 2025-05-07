import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslation } from "react-i18next";
import { AboutDropdown } from "./AboutDropdown";
import { FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaTelegramPlane, FaSearch, FaFacebook } from "react-icons/fa";

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
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
            const eventDate = new Date('May 7, 2025').getTime();
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

    const toggleMobileAbout = () => {
        setIsMobileAboutOpen(!isMobileAboutOpen);
    };

    return (
        <div className="relative bg-black h-screen">
            <header className={`fixed top-0 left-0 w-full inset-x-0 z-10 py-2 xl:py-6 transition-all duration-700 ease-in-out ${
                isScrolled 
                    ? "bg-gray-100 shadow-md drop-shadow-md text-black"  
                    : "bg-transparent text-white"
            }`}>
                <div className="px-6 mx-auto sm:px-8 lg:px-8 max-w-7xl">
                    <div className="flex items-center justify-between relative">
                        {/* Logo (left) */}
                        <div className="flex flex-shrink-0">
                            <NavLink to="/" title="BakerStreet" className="inline-flex rounded-md">
                                <img className="w-auto h-20" src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png" alt="africa-gaming" />
                            </NavLink>
                        </div>
                        {/* Hamburger Menu */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                type="button"
                                className={`cursor-pointer p-2 -m-2 transition-all duration-200 rounded-full ${
                                    isScrolled ? "text-black" : "text-white"
                                }`}
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Nav */}
                        <div
                            className="absolute left-1/2 transform -translate-x-1/2 hidden md:flex md:items-center md:space-x-7 whitespace-nowrap w-[60%] lg:w-[65%] xl:w-[70%] justify-center"
                        >
                            <AboutDropdown isScrolled={isScrolled} />
                            <a href="#" className={`hover:text-green-600 text-sm ${isScrolled ? "text-black" : "text-white"}`}>{t('News')}</a>
                            <a href="#" className={`hover:text-green-600 text-sm ${isScrolled ? "text-black" : "text-white"}`}>{t('Publications')}</a>
                            <a href="#" className={`hover:text-green-600 text-sm ${isScrolled ? "text-black" : "text-white"}`}>{t('Magazines')}</a>
                            <a href="#" className={`hover:text-green-600 text-sm ${isScrolled ? "text-black" : "text-white"}`}>{t('IGaming Directory')}</a>
                            <a href="#" className={`hover:text-green-600 text-sm ${isScrolled ? "text-black" : "text-white"}`}>{t('Events Calendar')}</a>
                        </div>

                        {/* Right Side Social Links */}
                        <div className="hidden md:flex items-center space-x-3 text-md">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-400`}>
                                <FaTwitter />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-700`}>
                                <FaLinkedin />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-red-600`}>
                                <FaYoutube />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-pink-500`}>
                                <FaInstagram />
                            </a>
                            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-500`}>
                                <FaTelegramPlane />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={`${isScrolled ? "text-black" : "text-white"} hover:text-blue-500`}>
                                <FaFacebook />
                            </a>
                            <button className={`${isScrolled ? "text-black" : "text-white"} space-x-5 text-xl hover:text-gray-500`}>
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-20 bg-black bg-opacity-60 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-30 w-full h-full bg-black transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full p-4 space-y-5 text-white">
                    <button onClick={() => setSidebarOpen(false)} className="cursor-pointer self-end text-2xl">✕</button>
                    
                    {/* About AGS Dropdown */}
                    <div className="flex flex-col">
                        <div 
                            className="flex items-center justify-between text-lg cursor-pointer"
                            onClick={toggleMobileAbout}
                        >
                            <span>{t('about')} AGS</span>
                            <svg 
                                className={`w-5 h-5 transition-transform duration-300 ${isMobileAboutOpen ? 'transform rotate-180' : ''}`} 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        
                        {/* Dropdown Menu */}
                        <div className={`flex flex-col pl-4 mt-2 space-y-3 bg-black rounded-md overflow-hidden transition-all duration-300 ${
                            isMobileAboutOpen ? 'max-h-96 py-2' : 'max-h-0'
                        }`}>
                            <NavLink to="/location" className="text-white hover:text-gray-200">{t('location')}</NavLink>
                            <NavLink to="/news" className="text-white hover:text-gray-200">{t('news_blogs')}</NavLink>
                        </div>
                    </div>
                    
                    <a href="#" className="text-lg">{t('services')}</a>
                    <a href="#" className="text-lg">{t('contacts')}</a>
                    <LanguageSwitcher isScrolled={false} />
                </div>
            </div>

            {/* Hero Section with Event Details */}
            <div className="relative flex items-center justify-center h-full pt-24 pb-12">
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
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                </div>

                <div className="relative z-8 text-center text-white px-4 w-full max-w-4xl mx-auto">
                    <img
                        src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png"
                        alt="iGaming Afrika Logo"
                        className="w-full max-w-md mx-auto mb-6"
                    />
                    <p className="text-md mb-6">NAIROBI • 7-8 MAY, 2026</p>
                    {/* <p className="text-sm mb-4">Brought to you by <span className="font-bold">Pub88</span></p> */}
                    <h1 className="text-xl md:text-2xl lg:text-4xl font-bold mb-2">MAY 7-8, 2025</h1>
                    <p className="text-md md:text-md mb-8">Kenya International Conference Center, Nairobi, Kenya</p>
                    
                    {/* Countdown Timer */}
                    <div className="flex justify-center space-x-2 md:space-x-4 mb-8">
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold">{timeLeft.days}</div>
                            <div className="text-sm uppercase">Days</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold">{timeLeft.hours}</div>
                            <div className="text-sm uppercase">Hours</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold">{timeLeft.minutes}</div>
                            <div className="text-sm uppercase">Minutes</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xl md:text-2xl font-bold">{timeLeft.seconds}</div>
                            <div className="text-sm uppercase">Seconds</div>
                        </div>
                    </div>

                    <div className="bg-transparent bg-opacity-20 backdrop-blur-sm rounded-lg p-3 md:p-4 max-w-2xl mx-auto">
                        
                        <p className="text-sm md:text-md mb-12">
                            With 40% operator attendance, it's the industry's top operator led event. Dive into unmatched networking, 
                            attend a week-long festival of events, and learn from hundreds of leading experts. Engage with 6,000 
                            global delegates and shape the future of iGaming.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 hover:cursor-pointer text-sm text-white font-bold py-3 px-8 border border-green-600 rounded-md">
                                PRE-REGISTER 2026
                            </button>
                            <button className="bg-transparent hover:bg-green-600 hover:bg-opacity-20 text-white text-sm hover:cursor-pointer font-bold py-2 px-6 border border-green-600 rounded-md">
                                LIST OF ATTENDEES 2025
                            </button>
                           
                        </div>
                    </div>
                </div>
            </div>
              {/* Scroll Down Button */}
              <div className="absolute hidden transform -translate-x-1/2 lg:bottom-8 xl:bottom-12 left-1/2 lg:block">
                <a href="#numbers" className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white hover:bg-green-600 bg-black">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Navbar;