import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslation } from "react-i18next";
import { AboutDropdown } from "./AboutDropdown";

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { t } = useTranslation();

    // Add scroll event listener to detect when user scrolls
    useEffect(() => {
        const handleScroll = () => {
            // Change state when scroll position is greater than 50px
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        // Add event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative pt-24 pb-12 bg-black xl:pt-24 sm:pb-16 lg:pb-32 xl:pb-48 2xl:pb-56 h-screen">
            <header className={`fixed top-0 left-0 w-full inset-x-0 z-10 py-2 xl:py-2 transition-all duration-700 ease-in-out ${
                isScrolled 
                    ? "bg-gray-100 shadow-md drop-shadow-md text-black"  
                    : "bg-transparent text-white"
            }`}>
                <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-shrink-0">
                            <NavLink to="/" title="BakerStreet" className="inline-flex rounded-md ">
                                <img className="w-auto h-20" src="src/assets/africa-gaming.png" alt="africa-gaming" />
                            </NavLink>
                        </div>

                        {/* Hamburger Menu */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                type="button"
                                className={`cursor-pointer p-2 -m-2 transition-all duration-200 rounded-full  ${
                                    isScrolled ? "text-black" : "text-white"
                                }`}
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex md:items-center md:space-x-10 lg:ml-28">
                            <AboutDropdown isScrolled={isScrolled} />
                            <a href="#" className={`font-sans text-base font-bold ${isScrolled ? "text-black" : "text-white"}`}>{t('services')}</a>
                            <a href="#" className={`font-sans text-base font-bold ${isScrolled ? "text-black" : "text-white"}`}>{t('contacts')}</a>
                            <LanguageSwitcher isScrolled={isScrolled} />
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-20 bg-black bg-opacity-60 md:hidden transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebarOpen(false)} />

            {/* Sidebar */}
            <div className={`fixed top-0 left-0 z-30 w-full h-full bg-black transform transition-transform duration-300 md:hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex flex-col h-full p-6 space-y-6 text-white">
                    <button onClick={() => setSidebarOpen(false)} className="cursor-pointer self-end text-2xl">✕</button>
                    <a href="#" className="text-lg">{t('about')} AGS</a>
                    <a href="#" className="text-lg">{t('services')}</a>
                    <a href="#" className="text-lg">{t('contacts')}</a>
                    <LanguageSwitcher isScrolled={false} />
                </div>
            </div>

            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <video
                className="absolute min-w-full min-h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                >
                <source 
                    src="https://videos.pexels.com/video-files/4523108/4523108-sd_640_360_25fps.mp4" 
                    type="video/mp4" 
                />
                {t('your_browser_does_not_support_the_video_tag')}
                </video>
                {/* Dark overlay for better text visibility */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>


            <div className="relative">
                <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                    <div className="max-w-xl mx-auto text-center">
                        <img
                            src="src/assets/africa-gaming.png"
                            alt="iGaming Afrika Logo"
                            className="w-full max-w-xl mx-auto"
                        />

                        <div className="flex justify-center mt-12">
                            <NavLink
                                to="/registration"
                                title="Read Exclusive Blog"
                                className="inline-flex relative items-center justify-center px-6 py-2 text-base font-semibold text-black transition-all duration-200 bg-green-600 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                                role="button"
                            >
                                {t('pre_register_2026')} 
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Down Button */}
            <div className="absolute hidden transform -translate-x-1/2 lg:bottom-8 xl:bottom-12 left-1/2 lg:block">
                <a href="#numbers" className="inline-flex items-center justify-center w-12 h-12 rounded-full text-white bg-black">
                    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default Navbar;