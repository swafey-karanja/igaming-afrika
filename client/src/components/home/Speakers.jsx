import { useState, useCallback, useEffect } from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { X, Users } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const Speakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  const [speakers, setSpeakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSpeakers = useCallback(async () => {
    try {
      const token = import.meta.env.VITE_PUBLIC_API_TOKEN;
      setIsLoading(true);
      setError(null);
      setSpeakers([]);

      const response = await fetch(
        "https://events.igamingafrika.com/api/speakers/",
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
      setSpeakers(data);
    } catch (error) {
      console.error("Failed to fetch speakers:", error);
      setError("Failed to load speakers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpeakers();
  }, [fetchSpeakers]);

  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  // Display all speakers without filtering
  const visibleSpeakers = speakers.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? 6 : 12));
  };

  const openModal = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-8 lg:py-8">
        {/* Header - Always visible */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Featured Speakers
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
            Meet the industry leaders and visionaries who will share their
            insights at our event
          </p>
        </motion.div>

        {/* Content Area */}
        {isLoading ? (
          <div className="container mx-auto flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : error ? (
          <div className="container mx-auto flex flex-col items-center justify-center py-20 rounded-lg">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <h3 className="text-md font-medium text-gray-900 mb-2">
              Unable to load sponsors
            </h3>
            <p className="text-gray-600 mb-6 max-w-md text-sm text-center">
              {error}
            </p>
            <button
              onClick={fetchSpeakers}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Speakers Grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
              initial="hidden"
              animate="visible"
              variants={container}
            >
              {visibleSpeakers.map((speaker, index) => (
                <motion.div
                  key={`${speaker.name}-${index}`}
                  onClick={() => openModal(speaker)}
                  className="group cursor-pointer h-[250px]"
                  variants={item}
                  layout
                >
                  <motion.div
                    className="bg-white rounded-2xl p-6 shadow-md transition-all hover:shadow-green-300 border-green-300 duration-300 cursor-pointer hover:-translate-y-1 text-center h-full flex flex-col"
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Speaker Image */}
                    <div className="relative w-24 h-24 mx-auto mb-4">
                      <motion.div
                        className="w-full h-full rounded-full overflow-hidden bg-gray-100 ring-4 ring-green-50 group-hover:ring-green-100 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        {speaker.image ? (
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-green-100">
                            <Users className="w-8 h-8 text-green-600" />
                          </div>
                        )}
                      </motion.div>
                    </div>

                    {/* Speaker Info */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {speaker.name}
                      </h3>
                      <p className="text-sm text-green-600 font-medium mb-1">
                        {speaker.role}
                      </p>
                      <p className="text-sm text-gray-500 mb-4 flex-1">
                        {speaker.company}
                      </p>

                      {/* Event Tags */}
                      <div className="flex flex-wrap justify-center gap-1 mt-auto">
                        {speaker.events.slice(0, 2).map((event, i) => {
                          const day = event.split(" ")[0];
                          return (
                            <span
                              key={i}
                              className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200"
                            >
                              {day}
                            </span>
                          );
                        })}
                        {speaker.events.length > 2 && (
                          <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full border border-gray-300">
                            +{speaker.events.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>

            {/* Load More */}
            {visibleCount < speakers.length && (
              <motion.div
                className="text-center mt-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <motion.button
                  onClick={handleShowMore}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ backgroundColor: "#14a45c" }}
                  className="inline-flex items-center gap-2 px-8 py-3 text-white rounded-full hover:bg-green-700 transition-colors duration-200 font-medium border-2 border-green-600 hover:border-green-700"
                >
                  Show More
                  <IoMdRefresh />
                </motion.button>
              </motion.div>
            )}

            {/* End Message */}
            {visibleCount >= speakers.length && speakers.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-500">
                  You've seen all {speakers.length} speakers
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-3xl w-full max-w-2xl mx-auto shadow-2xl max-h-[90vh] overflow-y-auto border-2 border-gray-200"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={scaleUp}
          >
            {/* Close Button */}
            <motion.button
              onClick={closeModal}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10 border border-gray-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>

            <motion.div
              className="p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex flex-col md:flex-row gap-8">
                {/* Speaker Image */}
                <motion.div
                  className="flex-shrink-0 mx-auto md:mx-0"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 ring-8 ring-green-50 border-2 border-gray-200">
                    {selectedSpeaker?.image ? (
                      <img
                        src={selectedSpeaker.image}
                        alt={selectedSpeaker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-100">
                        <Users className="w-12 h-12 text-green-600" />
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* Speaker Details */}
                <motion.div
                  className="text-center md:text-left flex-grow"
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
                    {selectedSpeaker?.name}
                  </h2>
                  <p className="text-lg text-green-600 font-medium mb-1">
                    {selectedSpeaker?.role}
                  </p>
                  <p className="text-gray-600 mb-6">
                    {selectedSpeaker?.company}
                  </p>

                  <p className="text-gray-700 leading-relaxed mb-8">
                    {selectedSpeaker?.bio}
                  </p>

                  {/* Social Links */}
                  <div className="flex justify-center md:justify-start space-x-4">
                    {selectedSpeaker?.social.twitter && (
                      <motion.a
                        href={selectedSpeaker.social.twitter}
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors border border-gray-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaTwitter className="w-5 h-5" />
                      </motion.a>
                    )}
                    {selectedSpeaker?.social.linkedin && (
                      <motion.a
                        href={selectedSpeaker.social.linkedin}
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaLinkedin className="w-5 h-5" />
                      </motion.a>
                    )}
                    {selectedSpeaker?.social.facebook && (
                      <motion.a
                        href={selectedSpeaker.social.facebook}
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors border border-gray-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaFacebook className="w-5 h-5" />
                      </motion.a>
                    )}
                    {selectedSpeaker?.social.instagram && (
                      <motion.a
                        href={selectedSpeaker.social.instagram}
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-full bg-gray-100 hover:bg-pink-100 hover:text-pink-600 transition-colors border border-gray-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaInstagram className="w-5 h-5" />
                      </motion.a>
                    )}
                    {selectedSpeaker?.social.website && (
                      <motion.a
                        href={selectedSpeaker.social.website}
                        whileHover={{ y: -2 }}
                        className="p-3 rounded-full bg-gray-100 hover:bg-green-100 hover:text-green-600 transition-colors border border-gray-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGlobe className="w-5 h-5" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Event Tags */}
              <motion.div
                className="mt-8 pt-6 border-t border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-sm font-medium text-gray-900 mb-3">
                  Speaking at:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedSpeaker?.events.map((event, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm border border-green-200"
                    >
                      {event}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Speakers;
