import { useState, useCallback, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import { Users } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import SpeakerModal from "../../components/SpeakerModal";
import Header from "../../components/Header";
import useFetch from "../../services/useFetch.ts";
import { fetchDataFromApi } from "../../services/api.js";
import { NavLink } from "react-router-dom";

const EventSpeakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);
  const [isMobile, setIsMobile] = useState(false);

  const {
    data: speakers,
    error: speakerError,
    isLoading: speakerLoading,
    refetch: refetchSpeakers,
  } = useFetch(() => fetchDataFromApi("speakers"));

  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  // Display all speakers without filtering
  const visibleSpeakers = speakers ? speakers.slice(0, visibleCount) : [];

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

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      <Header
        title="Event Speakers"
        subtitle="Meet the industry leaders and experts speaking at the iGaming Afrika Summit 2026."
      />

      {/* Content Area */}
      {speakerLoading ? (
        <div className="container mx-auto flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : speakerError ? (
        <div className="container mx-auto flex flex-col items-center justify-center py-20 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Unable to load sponsors
          </h3>
          <p className="text-gray-600 mb-6 max-w-md text-sm text-center">
            {speakerError}
          </p>
          <button
            onClick={refetchSpeakers}
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
          {speakers && visibleCount < speakers.length && (
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
          {speakers &&
            visibleCount >= speakers.length &&
            speakers.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-500 text-[13px] font-medium">
                  You've seen all {speakers.length} speakers!
                </p>
              </div>
            )}

          <NavLink
            to="/speaker-registration"
            className="flex items-center justify-center mt-6"
          >
            <button
              className={`text-white bg-[#14a45c] hover:cursor-pointer text-xs font-bold py-2 px-4 lg:py-3 lg:px-6 lg:text-sm rounded-3xl `}
            >
              Become a Speaker
            </button>
          </NavLink>
        </>
      )}

      {/* Modal */}
      <SpeakerModal
        isOpen={isModalOpen}
        speaker={selectedSpeaker}
        onClose={closeModal}
      />
    </div>
  );
};

export default EventSpeakers;
