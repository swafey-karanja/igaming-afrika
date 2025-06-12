import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import patners from "../data/patners.json";

const powerSponsors = [
  {
    name: "MFC",
    logo: "https://mfc.ke/wp-content/uploads/2020/06/mfc-email-signature-logo-optimized.png",
    url: "#",
  },
  {
    name: "iGaming",
    logo: "https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png",
    url: "#",
  },
];

const Sponsors = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-8">
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
        {/* Powered By Section */}
        <section className="text-center space-y-6 md:space-y-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
                Powered by
              </h2>
            </div>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-500 mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

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
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
                In Collaboration with
              </h2>
            </div>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-500 mx-auto rounded-full mb-6"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </motion.div>

          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
            {patners.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{
                  duration: 0.5,
                  delay: Math.floor(index / 4) * 0.1,
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
