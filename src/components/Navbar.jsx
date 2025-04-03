import React, { useState } from 'react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdowns, setOpenDropdowns] = useState({
        features: false,
        solutions: false,
        resources: false,
        pricing: false
    });

    const dropdownMenus = {
        features: [
            { name: 'Core Features', href: '#core-features' },
            { name: 'Advanced Analytics', href: '#advanced-analytics' },
            { name: 'Integrations', href: '#integrations' },
            { name: 'Mobile App', href: '#mobile-app' }
        ],
        solutions: [
            { name: 'For Enterprise', href: '#enterprise' },
            { name: 'For Startups', href: '#startups' },
            { name: 'For Small Business', href: '#small-business' },
            { name: 'Industry Solutions', href: '#industry-solutions' }
        ],
        resources: [
            { name: 'Documentation', href: '#documentation' },
            { name: 'Blog', href: '#blog' },
            { name: 'Case Studies', href: '#case-studies' },
            { name: 'Webinars', href: '#webinars' }
        ],
        pricing: [
            { name: 'Standard Plan', href: '#standard-plan' },
            { name: 'Professional Plan', href: '#professional-plan' },
            { name: 'Enterprise Plan', href: '#enterprise-plan' },
            { name: 'Compare Plans', href: '#compare-plans' }
        ]
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const toggleDropdown = (dropdown) => {
        setOpenDropdowns(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    // Reusable Dropdown Component for Desktop
    const DesktopDropdown = ({ name }) => (
        <div className="relative">
            <button
                onClick={() => toggleDropdown(name)}
                className="text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600 flex items-center"
            >
                {name.charAt(0).toUpperCase() + name.slice(1)}
                <svg className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${openDropdowns[name] ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div 
                className={`absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 transition-all duration-300 ease-in-out origin-top-left 
                    ${openDropdowns[name] ? 'transform opacity-100 scale-100' : 'transform opacity-0 scale-95 pointer-events-none'}`}
            >
                {dropdownMenus[name].map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all duration-200"
                    >
                        {item.name}
                    </a>
                ))}
            </div>
        </div>
    );

    // Reusable Dropdown Component for Mobile
    const MobileDropdown = ({ name }) => (
        <div className="py-2">
            <button
                onClick={() => toggleDropdown(name)}
                className="flex justify-between w-full text-base font-medium text-black transition-all duration-200 hover:text-green-600 focus:text-green-600"
            >
                {name.charAt(0).toUpperCase() + name.slice(1)}
                <svg 
                    className={`w-4 h-4 transform transition-transform duration-300 ${openDropdowns[name] ? 'rotate-180' : ''}`} 
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out
                    ${openDropdowns[name] ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}
                `}
            >
                <div className="space-y-2 pl-4">
                    {dropdownMenus[name].map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="block text-sm text-gray-600 hover:text-green-600 transition-all duration-200"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <header className="fixed top-0 left-0 w-full pb-6 lg:pb-0 bg-white shadow-md drop-shadow-md z-50 mb-auto">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between h-16 lg:h-20">
                    <div className="flex-shrink-0">
                        <a href="#" className="flex">
                            <img className="w-auto h-8 lg:h-10" src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png" alt="Logo" />
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
        
                    <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
                        {Object.keys(dropdownMenus).map(menu => (
                            <DesktopDropdown key={menu} name={menu} />
                        ))}
                    </div>
        
                    <a href="#" className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md lg:inline-flex hover:bg-green-700 focus:bg-green-700" role="button"> 
                        Pre Register 2026 
                    </a>
                </nav>
        
                {/* Mobile menu */}
                <div 
                    className={`
                        transition-all duration-300 ease-in-out transform lg:hidden
                        overflow-hidden 
                        ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
                    `}
                >
                    <nav className="pt-4 pb-6 bg-white border border-gray-200 rounded-md shadow-md">
                        <div className="flow-root">
                            <div className="flex flex-col px-6 -my-2 space-y-1">
                                {Object.keys(dropdownMenus).map(menu => (
                                    <MobileDropdown key={menu} name={menu} />
                                ))}
                            </div>
                        </div>

                        <div className="px-6 mt-6">
                            <a href="#" className="inline-flex justify-center px-4 py-3 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md items-center hover:bg-green-700 focus:bg-green-700" role="button"> 
                                Pre Register 2026 
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;