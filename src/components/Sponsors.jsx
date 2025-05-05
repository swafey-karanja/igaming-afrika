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
  
  // Simple animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Powered By Section */}
        <section className="text-center space-y-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight uppercase text-gray-700 sm:text-4xl pb-8"
          >
            {t('powered_by')}
          </motion.h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            {powerSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
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
                {/* {index === 0 && (
                  <span className="hidden sm:inline text-gray-500 font-medium">
                    {t('and')}
                  </span>
                )} */}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Kindly Supported By Section */}
        <section className="text-center space-y-8">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight uppercase text-gray-700 sm:text-3xl pb-20"
          >
            in collaboration with
          </motion.h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
            {gamingSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: Math.floor(index / 3) * 0.1 }}
                className="flex justify-center"
              >
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity duration-200"
                >
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className="h-16 sm:h-20 md:h-24 w-auto max-w-[180px] object-contain"
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