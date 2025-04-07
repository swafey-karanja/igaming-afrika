import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import LanguageSwitcher from './languageSwitcher';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({
        countries: false,
        publications: false,
        directory: false
    });

    // Create refs for each dropdown
    const countriesRef = useRef(null);
    const publicationsRef = useRef(null);
    const directoryRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const dropdownMenus = {
        countries: [
            { name: 'Nigeria', href: '#nigeria' },
            { name: 'South Africa', href: '#south-africa' },
            { name: 'Kenya', href: '#kenya' },
            { name: 'Tanzania', href: '#tanzania' },
            { name: 'Ghana', href: '#ghana' },
            { name: 'Uganda', href: '#uganda' },
            { name: 'Mozambique', href: '#mozambique' },
            { name: 'Angola', href: '#angola' },
            { name: 'Ethiopia', href: '#ethiopia' },
            { name: 'Zambia', href: '#zambia' },
            { name: 'Malawi', href: '#malawi' },
            { name: 'Rwanda', href: '#rwanda' },
            { name: 'Congo DRC', href: '#congo-drc' },
            { name: 'Cameroon', href: '#cameroon' },
            { name: 'Tunisia', href: '#tunisia' },
            { name: 'Botswana', href: '#botswana' },
            { name: 'Global', href: '#global' }
        ],
        publications: [
            { name: "Editor's Pick", href: '#editors-pick' },
            { name: 'Podcasts', href: '#podcasts' },
            { name: 'Interviews', href: '#interviews' },
            { name: 'Webinars', href: '#webinars' },
            { name: 'Speakers', href: '#speakers' },
            { name: 'Articles', href: '#articles' },
            { name: 'Opinion Pieces', href: '#opinion-pieces' }
        ],
        directory: [
            { name: 'Community Forum', href: '#community-forum' },
            { name: 'Gambling Regulation Boards', href: '#regulation-boards' },
            { name: 'Sports betting sites', href: '#sports-betting' },
            { name: 'Casino sites', href: '#casino-sites' },
            { name: 'Platform Providers', href: '#platform-providers' },
            { name: 'Land based suppliers', href: '#land-based' },
            { name: 'Payment Providers', href: '#payment-providers' },
            { name: 'Game Providers', href: '#game-providers' },
            { name: 'Lottery Providers', href: '#lottery-providers' },
            { name: 'Top Games', href: '#top-games' },
            { name: 'Affiliate Management Platforms', href: '#affiliate-platforms' },
            { name: 'Crash Games', href: '#crash-games' },
            { name: 'Crash Games Providers', href: '#crash-game-providers' },
            { name: 'SMS Service Providers', href: '#sms-providers' },
            { name: 'Mergers and acquisitions', href: '#mergers' },
            { name: 'Licensing Requirements', href: '#licensing' },
            { name: 'Gambling Events', href: '#events' },
            { name: 'Renowned Executive Profiles', href: '#executives' },
            { name: 'CSR Activities', href: '#csr' },
            { name: 'Gambling Guide', href: '#guide' },
            { name: 'Responsible Gambling', href: '#responsible-gambling' },
            { name: 'iGaming Consulting', href: '#consulting' }
        ]
    };

    const toggleMenu = () => {
        if (isMenuOpen) {
            setOpenDropdowns({
                countries: false,
                publications: false,
                directory: false
            });
        }
        setIsMenuOpen(!isMenuOpen);
    };

    // Handle click outside dropdowns
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Close desktop dropdowns if clicked outside
            if (countriesRef.current && !countriesRef.current.contains(event.target)) {
                setOpenDropdowns(prev => ({ ...prev, countries: false }));
            }
            if (publicationsRef.current && !publicationsRef.current.contains(event.target)) {
                setOpenDropdowns(prev => ({ ...prev, publications: false }));
            }
            if (directoryRef.current && !directoryRef.current.contains(event.target)) {
                setOpenDropdowns(prev => ({ ...prev, directory: false }));
            }
            
            // Close mobile menu if clicked outside
            if (isMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
                setOpenDropdowns({
                    countries: false,
                    publications: false,
                    directory: false
                });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    // Modified to handle hover events
    const handleMouseEnter = (dropdown) => {
        setOpenDropdowns(() => {
            // Close all other dropdowns first
            const newState = { 
                countries: false, 
                publications: false, 
                directory: false 
            };
            // Then open the current one
            newState[dropdown] = true;
            return newState;
        });
    };

    // For mobile we'll keep click functionality
    const toggleDropdown = (dropdown) => {
        setOpenDropdowns(prev => {
            // If the clicked dropdown is already open, close it
            if (prev[dropdown]) {
                return { ...prev, [dropdown]: false };
            }
            // Otherwise, close all dropdowns and open the clicked one
            return {
                countries: false,
                publications: false,
                directory: false,
                [dropdown]: true
            };
        });
    };
    

    const DesktopDropdown = ({ name }) => {
        const handleClick = (e) => {
            e.preventDefault();
            setOpenDropdowns(prev => {
                // If the clicked dropdown is already open, close it
                if (prev[name]) {
                    return { ...prev, [name]: false };
                }
                // Otherwise, close all dropdowns and open the clicked one
                return {
                    countries: false,
                    publications: false,
                    directory: false,
                    [name]: true
                };
            });
        };
    
        return (
            <div 
                className="relative group"
                onMouseEnter={() => handleMouseEnter(name)}
                ref={name === 'countries' ? countriesRef : name === 'publications' ? publicationsRef : directoryRef}
            >
                <button
                    onClick={handleClick}
                    className="text-sm font-medium text-black transition-all duration-200 ease-in-out hover:text-green-600 focus:text-green-600 flex items-center"
                >
                    {name.toUpperCase()}
                    <svg className={`w-4 h-4 ml-1 transform transition-transform duration-200 ease-in-out ${openDropdowns[name] ? 'rotate-180' : ''}`} 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div 
                    className={`absolute left-0 mt-2 w-54 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 ease-out origin-top will-change-transform
                        ${openDropdowns[name] ? 'transform opacity-100 scale-100 visible' : 'transform opacity-0 scale-95 invisible'}`}
                    onMouseEnter={() => handleMouseEnter(name)}
                    onMouseLeave={() => setOpenDropdowns({ countries: false, publications: false, directory: false })}
                >
                    {dropdownMenus[name].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:text-green-700 hover:bg-gray-50 transition-all ease-in-out duration-150"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        );
    };

    const MobileDropdown = ({ name }) => (
        <div className="py-2">
            <button
                onClick={() => toggleDropdown(name)}
                className="flex justify-between w-full text-sm font-medium text-black transition-all ease-in-out duration-200 hover:text-green-600 focus:text-green-600 items-center"
            >
                {name.toUpperCase()}
                <svg 
                    className={`w-4 h-4 transform transition-transform duration-200 ease-in-out ${openDropdowns[name] ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div 
                className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden
                    ${openDropdowns[name] ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-80'}
                `}
            >
                <div className="space-y-2 pl-4 pt-2">
                    {dropdownMenus[name].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="block text-sm text-gray-600 hover:text-green-600 transition-all ease-in-out duration-150 py-1.5"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );

    const { t } = useTranslation();

    return (
        <header className="fixed top-0 left-0 w-full pb-6 lg:pb-0 bg-white shadow-md drop-shadow-md z-50 mb-auto">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <a href="#" className="flex">
                            <img className="w-auto h-14 lg:h-20" src="src/assets/africa-gaming.png" alt="Logo" />
                        </a>
                    </div>
        
                    <button 
                        type="button" 
                        className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className={`${isMenuOpen ? 'hidden' : 'block'} w-6 h-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                        </svg>
                        <svg className={`${isMenuOpen ? 'block' : 'hidden'} w-6 h-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
        
                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-8">
                        {/* NEWS link  */}
                        <NavLink to="/" className="text-sm font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600">
                            {t('news')}
                        </NavLink>

                        {/* COUNTRIES and PUBLICATIONS dropdowns */}
                        {['countries', 'publications', 'directory'].map(menu => (
                            <DesktopDropdown key={menu} name={menu} />
                        ))}

                        {/* MAGAZINE link  */}
                        <NavLink to="/magazine" className="text-sm font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600">
                        {t('magazine')}
                        </NavLink>

                        <LanguageSwitcher />
                    </div>
        
                    {/* <a href="#" className="items-center justify-center hidden px-4 py-3 ml-6 text-sm font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md lg:inline-flex hover:bg-green-700 focus:bg-green-700" role="button"> 
                        Pre Register 2026 
                    </a> */}
                </nav>
        
                {/* Mobile menu */}
                <div 
                    ref={mobileMenuRef}
                    className={`
                        transition-all duration-300 ease-in-out transform lg:hidden
                        overflow-hidden 
                        ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                {/* NEWS link  */}
                                <NavLink to="/" className="py-2 text-sm font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600">
                                  {t('news')}
                                </NavLink>

                                {/* COUNTRIES and PUBLICATIONS dropdowns */}
                                {['countries', 'publications', 'directory'].map(menu => (
                                    <MobileDropdown key={menu} name={menu} />
                                ))}

                                {/* MAGAZINE link  */}
                                <NavLink to="/magazine" className="py-2 text-sm font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600">
                                  {t('magazine')}
                                </NavLink>
                            </div>
                        </div>

                        {/* <div className="px-6 mt-4">
                            <a href="#" className="inline-flex justify-center px-4 py-2 text-sm font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md items-center hover:bg-green-700 focus:bg-green-700" role="button"> 
                                Pre Register 2026 
                            </a>
                        </div> */}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;