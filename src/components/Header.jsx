import { useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./languageSwitcher";
import { useTranslation } from "react-i18next";
import { AboutDropdown } from "./AboutDropdown";

const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="relative bg-gray-100 z-49">
            <header className='fixed top-0 left-0 w-full inset-x-0 z-10 py-2 xl:py-2 transition-all duration-700 ease-in-out text-black bg-gray-100 shadow-md drop-shadow-md'>
                <div className="px-6 mx-auto sm:px-8 lg:px-12 max-w-7xl">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-shrink-0">
                            <NavLink to="/" title="BakerStreet" className="inline-flex rounded-md focus:outline-none focus:ring-2 focus:ring-offset-4 focus:ring-offset-secondary focus:ring-primary">
                                <img className="w-auto h-20" src="src/assets/africa-gaming.png" alt="africa-gaming" />
                            </NavLink>
                        </div>

                        {/* Hamburger Menu */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                type="button"
                                className={`cursor-pointer p-2 -m-2 transition-all duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary focus:ring-offset-secondary`}
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex md:items-center md:space-x-10 lg:ml-28">
                            <AboutDropdown isScrolled={true}/>
                            <a href="#" className={`font-sans text-base font-bold `}>{t('services')}</a>
                            <a href="#" className={`font-sans text-base font-bold `}>{t('contacts')}</a>
                            <LanguageSwitcher isScrolled={true} />
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
        </div>
    );
};

export default Header;