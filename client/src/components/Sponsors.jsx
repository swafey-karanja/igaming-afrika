import React from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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
  },
  {
    name: "Betika",
    logo: "https://cdn.brandfetch.io/idhxmz_22M/w/1024/h/1024/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.betika.com/en-ke/"
  },
  {
    name: "Bet365",
    logo: "https://cdn.brandfetch.io/idvBgRUDV0/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.bet365.com/#/HO/"
  },
  {
    name: "SportPesa",
    logo: "https://cdn.brandfetch.io/idYRS_wmkY/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.ke.sportpesa.com/en/sports-betting/football-1/"
  },
  {
    name: "Betway",
    logo: "https://cdn.brandfetch.io/idylV0Xaxe/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.betway.co.za/sport/soccer"
  },
  {
    name: "Bangbet",
    logo: "https://cdn.brandfetch.io/idu_Lkrhft/w/288/h/66/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.bangbet.com/"
  },
  {
    name: "Skybet",
    logo: "https://cdn.brandfetch.io/idwO8GVDyj/w/1120/h/223/theme/light/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://m.skybet.com/"
  },
  {
    name: "Sportybet",
    logo: "https://cdn.brandfetch.io/idFOnSHs5C/w/400/h/400/theme/dark/icon.png?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.sportybet.com/"
  },
  {
    name: "Stake",
    logo: "https://cdn.brandfetch.io/idAcYcWCjc/w/333/h/180/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://stake.com/"
  },
  {
    name: "1xbet",
    logo: "https://cdn.brandfetch.io/ide7C8QgUz/w/400/h/400/theme/dark/icon.jpeg?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://1xbet.com/en"
  },
  {
    name: "Unibet",
    logo: "https://cdn.brandfetch.io/idcRslJghA/theme/light/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.unibet.com/"
  },
  {
    name: "Dafabet",
    logo: "https://cdn.brandfetch.io/idApKtmgm5/w/596/h/167/theme/dark/logo.png?c=1dxbfHSJFAPEGdCLU4o5B",
    url: "https://www.dafabet.com/en"
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
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
        {/* Powered By Section */}
        <section className="text-center space-y-6 md:space-y-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-center uppercase font-bold tracking-tight text-green-700 mb-2 sm:mb-4 md:mb-6"
          >
            {t('powered_by')}
          </motion.h2>
          <motion.div className="w-20 h-1 bg-green-700 mx-auto mb-6"></motion.div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            {powerSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-2 sm:px-4"
              >
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200 block"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
                    loading="lazy"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Kindly Supported By Section */}
        <section className="text-center space-y-6 md:space-y-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl lg:text-4xl text-center uppercase font-bold tracking-tight text-green-700 mb-2 sm:mb-4 md:mb-6"
          >
            in collaboration with
          </motion.h2>
          <motion.div className="w-20 h-1 bg-green-700 mx-auto mb-6"></motion.div>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {gamingSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ 
                  duration: 0.5, 
                  delay: Math.floor(index / 4) * 0.1 
                }}
                className="flex justify-center px-2 py-2 sm:px-4 sm:py-4"
              >
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200 block"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-12 sm:h-16 md:h-20 w-auto max-w-[120px] sm:max-w-[140px] md:max-w-[160px] lg:max-w-[180px] object-contain"
                    loading="lazy"
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default React.memo(Sponsors);