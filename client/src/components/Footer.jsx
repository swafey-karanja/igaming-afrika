import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  // Handle scroll event for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Simple animation variant
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="bg-black text-white pb-8 pt-16">
      {/* Newsletter Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        style={{ backgroundColor: "#14a45c" }}
        className="max-w-7xl mx-auto text-white py-12 sm:py-16 md:py-20 rounded-lg px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="relative">
            <motion.div variants={fadeIn} className="text-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold">
                {t("subscribe_newsletter")}
              </h3>
            </motion.div>

            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto"
            >
              <input
                type="text"
                className="w-full sm:flex-1 px-4 py-2 rounded-md text-white placeholder-white border border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3 sm:mb-0"
                placeholder={t("first_name")}
              />
              <input
                type="email"
                className="w-full sm:flex-1 px-4 py-2 rounded-md text-white placeholder-white border border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200 mb-3 sm:mb-0"
                placeholder={t("email_address")}
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-gray-100 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors hover:text-green-600"
              >
                {t("subscribe_now")}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Links Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] gap-8 md:gap-12 lg:gap-16">
          {/* Logo and description */}
          <motion.div variants={fadeIn} className="space-y-4">
            <div className="flex-shrink-0">
              <a href="#" title="iGaming Afrika" className="flex">
                <img
                  className="w-auto h-12 sm:h-14 md:h-16 lg:h-20"
                  src="Summit2_trimmed.png"
                  alt="iGaming Afrika Logo"
                />
              </a>
            </div>
            <p className="text-xs sm:text-sm text-gray-400">
              IGaming AFRIKA Summit is Africa’s mega gaming event, designed to
              unite the entire gaming industry players across the world in one
              place—the stunning city of Nairobi, Kenya. This being the
              inaugural edition of the summit, the event is seen to be the
              largest event in the industry, taking place in Nairobi, in 2026,
              the summit is seen to be the mother of all gaming conferences in
              Africa. The summit is taking place in an impressive 3,300m² square
              meters location at Sarit Expo Center, Nairobi’s Largest Expo
              center giving exhibitors and attendees a massive ground to
              showcase their products, meet and connect with industry players as
              we discuss the future of the gaming industry in Africa.
            </p>
          </motion.div>

          {/* COMPANY Column */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="space-y-4 mt-6 sm:mt-20 sm:ml-0 md:ml-10 lg:ml-20"
          >
            <h3 className="text-sm sm:text-md font-bold text-gray-400">
              {t("company")}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://igamingafrika.com/about-us/"
                  className="hover:text-green-600 transition-colors"
                >
                  {t("about")}
                </a>
              </li>
              <li>
                <a
                  href="https://igamingafrika.com/advertise/"
                  className="hover:text-green-600 transition-colors"
                >
                  Advertise
                </a>
              </li>
              <li>
                <a
                  href="https://igamingafrika.com/disclaimer/"
                  className="hover:text-green-600 transition-colors"
                >
                  Disclaimer
                </a>
              </li>
              <li>
                <a
                  href="https://igamingafrika.com/join-our-team/"
                  className="hover:text-green-600 transition-colors"
                >
                  Join our Team
                </a>
              </li>
            </ul>
          </motion.div>

          {/* HELP Column */}
          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.15 }}
            className="space-y-4 mt-6 sm:mt-20"
          >
            <h3 className="text-sm sm:text-md font-bold text-gray-400">
              {t("help")}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href="https://igamingafrika.com/donate/"
                  className="hover:text-green-600 transition-colors"
                >
                  Donate
                </a>
              </li>
              <li>
                <a
                  href="https://igamingafrika.com/contact-us/"
                  className="hover:text-green-600 transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-600 transition-colors">
                  {t("terms_conditions")}
                </a>
              </li>
              <li>
                <a
                  href="https://igamingafrika.com/privacy-policy/"
                  className="hover:text-green-600 transition-colors"
                >
                  {t("privacy_policy")}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Social Media Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex items-center justify-center space-x-3 sm:space-x-4 pt-2 text-2xl sm:text-3xl">
          <a
            href="#"
            className="text-gray-400 hover:text-blue-400 transition-colors"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-500 transition-colors"
            aria-label="Facebook"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-blue-700 transition-colors"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-black transition-colors"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Copyright Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-4"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-gray-400">
          <p>
            © Copyright 2025 Media-Tech iGaming Technology Limited - All Rights
            Reserved
          </p>
        </div>
      </motion.div>

      {/* Back to top button */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 rounded-full bg-green-600 p-2 sm:p-3 text-xs font-medium uppercase leading-tight cursor-pointer text-white shadow-md hover:bg-green-700 hover:shadow-lg focus:outline-none focus:ring-0 transition-colors"
        aria-label="Back to top"
      >
        <span className="[&>svg]:w-3 sm:[&>svg]:w-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
          </svg>
        </span>
      </motion.button>
    </footer>
  );
};

export default Footer;
