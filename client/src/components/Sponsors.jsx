import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SponsorTier from "./utils/SponsorTier";
import sponsorData from "../data/sponsorsData.json";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Sponsors = () => {
  const {
    headlineSponsor,
    platinumSponsors,
    goldSponsors,
    bronzeSponsors,
    mediaPartners,
  } = sponsorData;

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-8">
      <div className="max-w-7xl mx-auto text-center mb-8">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Event Sponsors
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
            Meet our kind and illustrious sponsors for the ground-breaking
            iGaming AFRIKA SUMMIT 2026.
          </p>
        </motion.div>
      </div>

      <div className="max-w-8xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
        <SponsorTier
          title="Headline Sponsor"
          sponsors={[headlineSponsor]}
          logoSizes="h-32 w-auto max-w-[400px] xs:h-36 xs:max-w-[450px] sm:h-40 sm:max-w-[500px] md:h-48 md:max-w-[600px] lg:h-56 lg:max-w-[700px] xl:h-64 xl:max-w-[800px]"
          containerClass="flex justify-center px-2 sm:px-4"
          titleColor="from-yellow-600 via-yellow-500 to-amber-500"
          delay={0}
        />
        <SponsorTier
          title="Platinum Sponsors"
          sponsors={platinumSponsors}
          logoSizes="h-24 w-auto max-w-[320px] xs:h-28 xs:max-w-[360px] sm:h-32 sm:max-w-[400px] md:h-36 md:max-w-[440px] lg:h-40 lg:max-w-[490px] xl:h-44 xl:max-w-[540px]"
          containerClass="flex flex-wrap justify-center gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 px-2"
          titleColor="from-gray-400 via-gray-300 to-slate-400"
          delay={0.2}
        />
        <SponsorTier
          title="Gold Sponsors"
          sponsors={goldSponsors}
          logoSizes="h-16 w-auto max-w-[200px] xs:h-18 xs:max-w-[220px] sm:h-20 sm:max-w-[260px] md:h-24 md:max-w-[300px] lg:h-28 lg:max-w-[340px] xl:h-32 xl:max-w-[380px]"
          containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 xs:gap-8 sm:gap-10 md:gap-12 px-2 items-center justify-items-center"
          titleColor="from-yellow-500 via-yellow-400 to-amber-400"
          delay={0.4}
        />
        <SponsorTier
          title="Bronze Sponsors"
          sponsors={bronzeSponsors}
          logoSizes="h-8 w-auto max-w-[100px] xs:h-10 xs:max-w-[120px] sm:h-12 sm:max-w-[140px] md:h-14 md:max-w-[160px] lg:h-16 lg:max-w-[180px] xl:h-18 xl:max-w-[200px]"
          containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 xs:gap-6 sm:gap-8 md:gap-10 px-2 items-center justify-items-center"
          titleColor="from-amber-600 via-orange-500 to-amber-700"
          delay={0.6}
        />
        <SponsorTier
          title="Media Partners"
          sponsors={mediaPartners}
          logoSizes="h-8 w-auto max-w-[100px] xs:h-10 xs:max-w-[120px] sm:h-12 sm:max-w-[140px] md:h-14 md:max-w-[160px] lg:h-16 lg:max-w-[180px] xl:h-18 xl:max-w-[200px]"
          containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 xs:gap-6 sm:gap-8 md:gap-10 px-2 items-center justify-items-center"
          titleColor="from-blue-600 via-blue-500 to-indigo-600"
          delay={0.8}
        />
        <motion.div
          className="text-center pt-8 border-t border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 1 }}
        >
          <p className="text-md text-gray-600 font-medium">
            Thank you to all our amazing sponsors and partners for making this
            event possible! 🎉
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default React.memo(Sponsors);
