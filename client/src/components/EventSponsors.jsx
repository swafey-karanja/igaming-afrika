import React, { useEffect, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import SponsorTier from "./utils/SponsorTier";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Sponsors = () => {
  const [sponsorData, setSponsorData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSponsors = useCallback(async () => {
    try {
      const token = import.meta.env.VITE_PUBLIC_API_TOKEN;
      setIsLoading(true);
      setError(null);
      setSponsorData(null);

      const response = await fetch(
        "https://events.igamingafrika.com/api/sponsors/",
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const fixedData = {
        headlineSponsor: Array.isArray(data.headlineSponsor)
          ? data.headlineSponsor[0]
          : data.headlineSponsor,
        diamondSponsors: data.diamondSponsors || [],
        platinumSponsors: data.platinumSponsors || [],
        goldSponsors: data.goldSponsors || [],
        silverSponsors: data.silverSponsors || [],
        bronzeSponsors: data.bronzeSponsors || [],
        strategicPartners: data.strategicPartners || [],
        mediaPartners: data.mediaPartners || [],
      };

      setSponsorData(fixedData);
    } catch (error) {
      console.error("Failed to fetch sponsors:", error);
      setError("Failed to load sponsors. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  const {
    headlineSponsor,
    diamondSponsors,
    platinumSponsors,
    goldSponsors,
    silverSponsors,
    bronzeSponsors,
    strategicPartners,
    mediaPartners,
  } = sponsorData || {};

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-8">
      <div className="max-w-8xl mx-auto text-center mb-8">
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

      {isLoading ? (
        <div className="max-w-7xl mx-auto flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : error ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Unable to load sponsors
          </h3>
          <p className="text-gray-600 mb-6 max-w-md text-sm text-center">
            {error}
          </p>
          <button
            onClick={fetchSponsors}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-16 lg:space-y-20">
          {headlineSponsor && (
            <SponsorTier
              title="Headline Sponsor"
              sponsors={[headlineSponsor]}
              logoSizes="h-32 w-auto max-w-[360px] xs:h-36 xs:max-w-[420px] sm:h-40 sm:max-w-[480px] md:h-44 md:max-w-[540px] lg:h-52 lg:max-w-[640px] xl:h-60 xl:max-w-[720px]"
              containerClass="flex justify-center px-2 sm:px-4"
              titleColor="from-yellow-600 via-yellow-500 to-amber-500"
              delay={0}
              bordered={true}
            />
          )}
          {diamondSponsors?.length > 0 && (
            <SponsorTier
              title="Diamond Sponsors"
              sponsors={diamondSponsors}
              logoSizes="h-28 w-auto max-w-[320px] xs:h-32 xs:max-w-[380px] sm:h-36 sm:max-w-[440px] md:h-40 md:max-w-[500px] lg:h-44 lg:max-w-[560px] xl:h-48 xl:max-w-[600px]"
              containerClass="flex flex-wrap justify-center gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-14 px-2 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3"
              titleColor="from-cyan-400 via-blue-500 to-purple-500"
              delay={0.15}
              bordered={true}
            />
          )}
          {platinumSponsors?.length > 0 && (
            <SponsorTier
              title="Platinum Sponsors"
              sponsors={platinumSponsors}
              logoSizes="h-24 w-auto max-w-[300px] xs:h-28 xs:max-w-[360px] sm:h-32 sm:max-w-[420px] md:h-36 md:max-w-[480px] lg:h-40 lg:max-w-[540px] xl:h-44 xl:max-w-[580px]"
              containerClass="flex flex-wrap justify-center gap-6 xs:gap-8 sm:gap-10 md:gap-12 lg:gap-16 px-2 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3"
              titleColor="from-gray-400 via-gray-300 to-slate-400"
              delay={0.2}
              bordered={true}
            />
          )}
          {goldSponsors?.length > 0 && (
            <SponsorTier
              title="Gold Sponsors"
              sponsors={goldSponsors}
              logoSizes="h-18 w-auto max-w-[200px] xs:h-20 xs:max-w-[240px] sm:h-22 sm:max-w-[280px] md:h-24 md:max-w-[320px] lg:h-28 lg:max-w-[360px] xl:h-32 xl:max-w-[400px]"
              containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-6 xs:gap-8 sm:gap-10 md:gap-12 px-2 items-center justify-items-center"
              titleColor="from-yellow-500 via-yellow-400 to-amber-400"
              delay={0.4}
              bordered={true}
            />
          )}
          {silverSponsors?.length > 0 && (
            <SponsorTier
              title="Silver Sponsors"
              sponsors={silverSponsors}
              logoSizes="h-14 w-auto max-w-[140px] xs:h-16 xs:max-w-[160px] sm:h-18 sm:max-w-[180px] md:h-20 md:max-w-[200px] lg:h-22 lg:max-w-[240px] xl:h-24 xl:max-w-[280px]"
              containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5 xs:gap-7 sm:gap-9 md:gap-11 px-2 items-center justify-items-center"
              titleColor="from-gray-400 via-gray-300 to-gray-500"
              delay={0.5}
              bordered={true}
            />
          )}
          {bronzeSponsors?.length > 0 && (
            <SponsorTier
              title="Bronze Sponsors"
              sponsors={bronzeSponsors}
              logoSizes="h-10 w-auto max-w-[100px] xs:h-12 xs:max-w-[120px] sm:h-14 sm:max-w-[140px] md:h-16 md:max-w-[160px] lg:h-18 lg:max-w-[180px] xl:h-20 xl:max-w-[200px]"
              containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-4 xs:gap-6 sm:gap-8 md:gap-10 px-2 items-center justify-items-center"
              titleColor="from-amber-600 via-orange-500 to-amber-700"
              delay={0.6}
              bordered={true}
            />
          )}
          {strategicPartners?.length > 0 && (
            <SponsorTier
              title="Strategic Partners"
              sponsors={strategicPartners}
              logoSizes="h-10 w-auto max-w-[100px] xs:h-12 xs:max-w-[120px] sm:h-14 sm:max-w-[140px] md:h-16 md:max-w-[160px] lg:h-18 lg:max-w-[180px] xl:h-20 xl:max-w-[200px]"
              containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 md:gap-10 px-2 items-center justify-items-center"
              titleColor="from-amber-600 via-orange-500 to-amber-700"
              delay={0.6}
              bordered={true}
            />
          )}
          {mediaPartners?.length > 0 && (
            <SponsorTier
              title="Media Partners"
              sponsors={mediaPartners}
              logoSizes="h-10 w-auto max-w-[100px] xs:h-12 xs:max-w-[120px] sm:h-14 sm:max-w-[140px] md:h-16 md:max-w-[160px] lg:h-18 lg:max-w-[180px] xl:h-20 xl:max-w-[200px]"
              containerClass="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xs:gap-6 sm:gap-8 md:gap-10 px-2 items-center justify-items-center"
              titleColor="from-blue-600 via-blue-500 to-indigo-600"
              delay={0.8}
              bordered={true}
            />
          )}
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
      )}
    </div>
  );
};

export default React.memo(Sponsors);
