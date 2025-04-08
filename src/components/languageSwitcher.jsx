import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ isScrolled }) => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const currentLanguage = i18n.language;

  const languageNames = {
    en: 'English',
    fr: 'Français',
    es: 'Español',
    sw: 'Kiswahili'
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className={`flex items-center justify-between font-bold bg-none border border-none rounded-md px-4 py-2 focus:outline-none md:min-w-[80px] min-w-[40px] cursor-pointer ${isScrolled ? "text-black" : "text-white"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{languageNames[currentLanguage] || 'Select Language'}</span>
        <svg
          className={`w-4 h-4 ml-2 transform transition-transform duration-200 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-100 ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {Object.entries(languageNames).map(([code, name]) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  currentLanguage === code
                    ? 'bg-gray-100 text-green-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;