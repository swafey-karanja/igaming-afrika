// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { SponsorTier } from "../../../lib/utils.jsx";
import Header from "../../../components/ui/Header.jsx";
import { fetchDataFromApi } from "../../../services/api.js";
import useFetch from "../../../hooks/useFetch.ts";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const EventSponsors = () => {
  const fetchSponsors = async () => {
    const data = await fetchDataFromApi("sponsors");

    return {
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
      attendingCompanies: data.attendingCompanies || [],
    };
  };

  const {
    data: sponsors,
    isLoading: sponsorsLoading,
    error: sponsorsError,
  } = useFetch(fetchSponsors);

  const {
    headlineSponsor,
    diamondSponsors,
    platinumSponsors,
    goldSponsors,
    silverSponsors,
    bronzeSponsors,
    strategicPartners,
    mediaPartners,
    attendingCompanies,
  } = sponsors || {};

  // Standard logo sizes for all tiers except headline sponsor (same as gold tier)
  const standardLogoSizes =
    "h-16 max-w-[120px] sm:h-18 sm:max-w-[160px] md:h-20 md:max-w-[220px] ";

  const getGridClass = (sponsorCount) => {
    if (sponsorCount === 4) {
      return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12 px-2 items-center justify-items-center justify-center";
    } else if (sponsorCount === 3) {
      return "grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 gap-6 md:gap-12 px-2 items-center justify-items-center justify-center";
    } else if (sponsorCount === 2) {
      return "flex flex-wrap justify-center space-x-12 md:space-x-30 px-2 items-center";
    } else if (sponsorCount === 1) {
      return "grid grid-cols-1 gap-6 px-2 items-center justify-items-center justify-center";
    }
    return "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center";
  };

  return (
    <section className="py-8 scroll-mt-60" id="sponsors">
      <Header
        title="Event Sponsors"
        subtitle="Meet our kind and illustrious sponsors for the ground-breaking iGaming
          AFRIKA SUMMIT 2026."
      />
      {sponsorsLoading ? (
        <div className="max-w-7xl mx-auto flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : sponsorsError ? (
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center py-20 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Unable to load sponsors
          </h3>
          <p className="text-gray-600 mb-6 max-w-md text-sm text-center">
            {sponsorsError}
          </p>
          <button
            onClick={fetchSponsors}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="container mx-auto space-y-12 md:space-y-16 lg:space-y-20">
          {headlineSponsor && (
            <SponsorTier
              title="Headline Sponsor"
              sponsors={[headlineSponsor]}
              logoSizes="h-28 max-w-[320px] md:h-44 md:max-w-[540px] lg:h-52 lg:max-w-[640px] "
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
              logoSizes={standardLogoSizes}
              containerClass={getGridClass(diamondSponsors.length)}
              titleColor="from-cyan-400 via-blue-500 to-purple-500"
              delay={0.15}
              bordered={true}
            />
          )}
          {platinumSponsors?.length > 0 && (
            <SponsorTier
              title="Platinum Sponsors"
              sponsors={platinumSponsors}
              logoSizes={standardLogoSizes}
              containerClass={getGridClass(platinumSponsors.length)}
              titleColor="from-gray-400 via-gray-300 to-slate-400"
              delay={0.2}
              bordered={true}
            />
          )}
          {goldSponsors?.length > 0 && (
            <SponsorTier
              title="Gold Sponsors"
              sponsors={goldSponsors}
              logoSizes={standardLogoSizes}
              containerClass={getGridClass(goldSponsors.length)}
              titleColor="from-yellow-500 via-yellow-400 to-amber-400"
              delay={0.4}
              bordered={true}
            />
          )}
          {silverSponsors?.length > 0 && (
            <SponsorTier
              title="Silver Sponsors"
              sponsors={silverSponsors}
              logoSizes={standardLogoSizes}
              containerClass={getGridClass(silverSponsors.length)}
              titleColor="from-gray-400 via-gray-300 to-gray-500"
              delay={0.5}
              bordered={true}
            />
          )}
          {bronzeSponsors?.length > 0 && (
            <SponsorTier
              title="Bronze Sponsors"
              sponsors={bronzeSponsors}
              logoSizes={standardLogoSizes}
              containerClass={getGridClass(bronzeSponsors.length)}
              titleColor="from-amber-600 via-orange-500 to-amber-700"
              delay={0.6}
              bordered={true}
            />
          )}
          {strategicPartners?.length > 0 && (
            <SponsorTier
              title="Strategic Partners"
              sponsors={strategicPartners}
              logoSizes={standardLogoSizes}
              containerClass={getGridClass(strategicPartners.length)}
              titleColor="from-amber-600 via-orange-500 to-amber-700"
              delay={0.6}
              bordered={true}
            />
          )}
          {mediaPartners?.length > 0 && (
            <SponsorTier
              title="Media Partners"
              sponsors={mediaPartners}
              logoSizes={standardLogoSizes}
              containerClass={getGridClass(mediaPartners.length)}
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
            <p className="text-xs md:text-[12px] text-gray-500 font-medium">
              Thank you to all our amazing sponsors and partners for making this
              event possible! 🎉
            </p>
          </motion.div>
        </div>
      )}

      {/* Attendees Section */}
      <div className="pt-8">
        <Header
          title="Attending Companies"
          subtitle="Meet the companies and organisations attending the ground-breaking
            iGaming AFRIKA SUMMIT 2026."
        />

        {!sponsorsLoading && !sponsorsError && (
          <div className="container mx-auto ">
            {attendingCompanies && attendingCompanies.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
                {attendingCompanies.map((company, index) => (
                  <motion.div
                    key={company.id || index}
                    className="flex items-center justify-center h-16 max-w-[120px] md:h-16 md:max-w-[160px] lg:h-18 lg:max-w-[200px] hover:scale-110 transition-all duration-300 relative"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <a
                      href={company.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full h-full"
                    >
                      <img
                        src={company.logo}
                        alt={company.name || "Company logo"}
                        className="max-w-full max-h-full object-contain hover:cursor-pointer"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden items-center justify-center text-center p-2">
                        <span className="text-sm font-medium text-gray-700">
                          {company.name || "Company"}
                        </span>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
        <div className="w-full z-50 bg-gray-100 pt-6 xl:pt-12 px-6 xl:px-0">
          <a
            href="https://www.sagaming.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="/igaadbanner.gif"
              alt="bnetwork accommodation specialist"
              className="w-full h-auto object-contain max-h-[60px] sm:max-h-[80px] md:max-h-[120px]"
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventSponsors;
