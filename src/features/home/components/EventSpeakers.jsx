import { useState } from "react";
// import { IoMdRefresh } from "react-icons/io";
import { Users } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import SpeakerModal from "../../speakerApplication/components/SpeakerModal.jsx";
import Header from "../../../components/ui/Header.jsx";
// import useFetch from "../../../hooks/useFetch.ts";
// import { fetchDataFromApi } from "../../../services/api.js";

const EventSpeakers = ({
  speakers = [],
  speakerLoading,
  speakerError,
  refetchSpeakers,
}) => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort speakers to show featured ones first, then display based on visible count
  const visibleSpeakers = speakers
    ? speakers
        .sort((a, b) => {
          // Sort by is_featured: true comes first (b - a for descending)
          if (a.is_featured === b.is_featured) return 0;
          return a.is_featured ? -1 : 1;
        })
        .slice(0)
    : [];

  const openModal = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
  };

  // Animation variants
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
    <section
      className="container mx-auto px-6 lg:px-8 py-8 scroll-mt-60"
      id="speakers"
    >
      <Header
        title="Event Speakers"
        subtitle="Meet the industry leaders and experts speaking at the iGaming Afrika Summit 2026."
      />

      {/* Content Area */}
      {speakerLoading ? (
        <div className="container mx-auto flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : speakerError ? (
        <div className="container mx-auto  flex flex-col items-center justify-center py-20 rounded-lg">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 lg:gap-x-10 gap-y-8">
            {visibleSpeakers.map((speaker, index) => (
              <motion.div
                key={`${speaker.name}-${index}`}
                onClick={() => openModal(speaker)}
                className="group h-auto lg:min-h-[280px] cursor-pointer text-center flex flex-col"
                variants={item}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                layout
              >
                {/* <div className="bg-white rounded-xl sm:rounded-2xl py-6 sm:py-7 md:py-8 px-3 sm:px-4 border-green-300 duration-300 cursor-pointer text-center h-full flex flex-col"> */}
                {/* Speaker Image */}
                <div className="relative w-18 h-18 lg:w-38 lg:h-38 mx-auto mb-3 sm:mb-4">
                  <motion.div
                    className="w-full h-full rounded-full overflow-hidden bg-gray-100 ring-4 ring-green-50 group-hover:ring-green-100 transition-all duration-300"
                    // whileHover={{ scale: 1.1 }}
                  >
                    {speaker.image ? (
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-100">
                        <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-green-600" />
                      </div>
                    )}
                  </motion.div>
                </div>

                {/* Speaker Info */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-md sm:text-xl font-semibold text-gray-900 mb-1">
                    {speaker.name}
                  </h3>
                  <p className="text-xs sm:text-md text-green-600 font-medium mb-1">
                    {speaker.role}
                  </p>
                  <p className="text-xs sm:text-md text-gray-500 mb-3 sm:mb-4 flex-1">
                    {speaker.company}
                  </p>
                </div>
                {/* </div> */}
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          {/* {speakers && (
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
                className="inline-flex items-center gap-2 px-5 py-2 text-white text-xs rounded-full hover:bg-green-700 transition-colors duration-200 font-medium border-2 border-green-600 hover:border-green-700"
              >
                Show More
                <IoMdRefresh />
              </motion.button>
            </motion.div>
          )} */}

          {/* End Message */}
          {/* {speakers && speakers.length > 0 && (
            <div className="text-center mt-12">
              <p className="text-gray-500 text-[13px] font-medium">
                You've seen all {speakers.length} speakers!
              </p>
            </div>
          )} */}
        </>
      )}

      {/* Modal */}
      <SpeakerModal
        isOpen={isModalOpen}
        speaker={selectedSpeaker}
        onClose={closeModal}
      />
    </section>
  );
};

export default EventSpeakers;
