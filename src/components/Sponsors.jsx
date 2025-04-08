import React from "react";
import { useTranslation } from "react-i18next";

const gamingSponsors = [
  {
    name: "EA",
    logo: "https://1000logos.net/wp-content/uploads/2023/05/EA-Sports-Logo-500x281.png", 
    url: "https://ea.com"
  },
  {
    name: "Xbox",
    logo: "https://1000logos.net/wp-content/uploads/2018/10/Xbox-logo-500x281.png",
    url: "https://xbox.com"
  },
  {
    name: "PlayStation",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/PlayStation-logo-500x281.png",
    url: "https://playstation.com"
  },
  {
    name: "Ubisoft",
    logo: "https://1000logos.net/wp-content/uploads/2020/06/Ubisoft-Logo-500x281.png",
    url: "https://ubisoft.com"
  },
  {
    name: "Unity",
    logo: "https://1000logos.net/wp-content/uploads/2021/10/Unity-logo-500x281.png",
    url: "https://unity.com"
  },
  {
    name: "Rockstar Games",
    logo: "https://1000logos.net/wp-content/uploads/2020/09/Rockstar-Games-logo-500x471.png",
    url: "https://rockstargames.com"
  },
  {
    name: "Nintendo",
    logo: "https://1000logos.net/wp-content/uploads/2021/04/Nintendo-logo-500x281.png",
    url: "https://nintendo.com"
  },
  {
    name: "Epic Games",
    logo: "https://1000logos.net/wp-content/uploads/2021/12/Epic-Games-logo-500x281.png",
    url: "https://epicgames.com"
  },
  {
    name: "Activision",
    logo: "https://1000logos.net/wp-content/uploads/2020/09/Activision-logo-tumb.jpg",
    url: "https://activision.com"
  }
];

const powerSponsors = [
  {
    name: "MFC",
    logo: "https://mfc.ke/wp-content/uploads/2020/06/mfc-email-signature-logo-optimized.png",
    url: "#"
  },
  {
    name: "iGaming",
    logo: "https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png",
    url: "#"
  }
];

const Sponsors = () => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Powered By Section */}
        <section className="text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-gray-900 pb-8">
            {t('powered_by')}
          </h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {powerSponsors.map((sponsor, index) => (
              <React.Fragment key={sponsor.name}>
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-20 sm:h-24 w-auto object-contain"
                    loading="lazy"
                  />
                </a>
                {index === 0 && (
                  <span className="hidden sm:inline text-gray-500 font-medium">
                    {t('and')}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </section>

        {/* Kindly Supported By Section */}
        <section className="text-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wide text-gray-900 pb-20">
            {t('kindly_supported_by')}
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {gamingSponsors.map((sponsor) => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity duration-200 flex justify-center"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="h-16 sm:h-20 md:h-24 w-auto max-w-[180px] object-contain"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(Sponsors);