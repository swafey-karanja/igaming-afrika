import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { X, Users } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const SpeakerModal = ({ isOpen, speaker, onClose }) => {
  if (!isOpen) return null;

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } },
  };

  return (
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
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="relative bg-white rounded-3xl min-w-4xl max-w-6xl mx-auto shadow-2xl max-h-[90vh] overflow-y-auto border-2 border-gray-200"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={scaleUp}
      >
        {/* Close Button */}
        <motion.button
          onClick={onClose}
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
              // whileHover={{ scale: 1.05 }}
            >
              <div className="w-72 h-72 rounded-2xl overflow-hidden bg-gray-100 ring-8 ring-green-50 border-2 border-gray-200">
                {speaker?.image ? (
                  <img
                    src={speaker.image}
                    alt={speaker.name}
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
                {speaker?.name}
              </h2>
              <p className="text-lg text-green-600 font-medium mb-1">
                {speaker?.role}
              </p>
              <p className="text-gray-600 mb-6">{speaker?.company}</p>

              <p className="text-gray-700 leading-relaxed mb-8">
                {speaker?.bio}
              </p>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start space-x-4">
                {speaker?.social.twitter && (
                  <motion.a
                    href={speaker.social.twitter}
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors border border-gray-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter className="w-5 h-5" />
                  </motion.a>
                )}
                {speaker?.social.linkedin && (
                  <motion.a
                    href={speaker.social.linkedin}
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin className="w-5 h-5" />
                  </motion.a>
                )}
                {speaker?.social.facebook && (
                  <motion.a
                    href={speaker.social.facebook}
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-colors border border-gray-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook className="w-5 h-5" />
                  </motion.a>
                )}
                {speaker?.social.instagram && (
                  <motion.a
                    href={speaker.social.instagram}
                    whileHover={{ y: -2 }}
                    className="p-3 rounded-full bg-gray-100 hover:bg-pink-100 hover:text-pink-600 transition-colors border border-gray-200"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram className="w-5 h-5" />
                  </motion.a>
                )}
                {speaker?.social.website && (
                  <motion.a
                    href={speaker.social.website}
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
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SpeakerModal;
