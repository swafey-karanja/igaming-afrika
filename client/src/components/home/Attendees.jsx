import React, { useEffect, useState, useCallback } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import SponsorTier from "../utils/SponsorTier";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Attendees = () => {
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
        attendingCompanies: data.attendingCompanies || [],
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

  const { attendingCompanies } = sponsorData || {};
  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-8">
      <div className="max-w-8xl mx-auto text-center">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              In Attendance
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-xs md:text-md">
            Meet the companies and organisations attending the ground-breaking
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
            Unable to load attendees
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
        <div className="max-w-[1600px] mx-auto">
          {attendingCompanies && attendingCompanies.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {attendingCompanies.map((company, index) => (
                <motion.div
                  key={company.id || index}
                  className="flex items-center justify-center max-h-[40px] sm:max-h-[80px]  hover:scale-110 transition-all duration-300 relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  // transition={{ duration: 0.5, delay: index * 0.1 }}
                  // whileHover={{ scale: 1.05 }}
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
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendees;
