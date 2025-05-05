import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

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
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer className="bg-gray-100 text-gray-700 py-4">
      {/* Newsletter Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto bg-green-600 text-white py-20 rounded-lg px-6"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <motion.div 
              variants={fadeIn}
              className="text-center mb-8"
            >
              <h3 className="text-2xl font-semibold">
                {t('subscribe_newsletter')}
              </h3>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto"
            >
              <input
                type="text"
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white placeholder-white border border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder={t("first_name")}
              />
              <input
                type="email"
                className="w-full sm:w-auto px-4 py-2 rounded-md text-white placeholder-white border border-white bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-200"
                placeholder={t('email_address')}
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-gray-100 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors hover:text-green-600"
              >
                {t('subscribe_now')}
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
        className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <motion.div 
            variants={fadeIn}
            className="space-y-4"
          >
            <div className="flex-shrink-0">
              <a href="#" title="" className="flex">
                <img
                  className="w-auto h-16 lg:h-20"
                  src="https://igamingafrika.com/wp-content/uploads/2023/04/iGaming-Logo-2b.png"
                  alt=""
                />
              </a>
            </div>
            <p className="text-sm text-gray-600">
              Clarity gives you the blocks and components you need to create a
              truly professional website.
            </p>
          </motion.div>

          {/* COMPANY Column */}
          <motion.div 
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-md font-bold text-gray-600">{t("company")}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900">{t("about")}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('features')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t("works")}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('careers')}</a></li>
            </ul>
          </motion.div>

          {/* HELP Column */}
          <motion.div 
            variants={fadeIn}
            transition={{ delay: 0.15 }}
            className="space-y-4"
          >
            <h3 className="text-md font-bold text-gray-600">{t('help')}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900">{t('customer_support')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('delivery_details')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('terms_conditions')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t("privacy_policy")}</a></li>
            </ul>
          </motion.div>

          {/* RESOURCES Column */}
          <motion.div 
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-md font-bold text-gray-600">{t("resources")}</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-900">{t('free_ebooks')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t('development_tutorial')}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t("how_to_blog")}</a></li>
              <li><a href="#" className="hover:text-gray-900">{t("youtube_playlist")}</a></li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Social Media Section */}
      <div className="max-w-6xl mx-auto px-6 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-center space-x-4 pt-2 text-3xl">
          <a href="#" className="text-gray-600 hover:text-blue-400">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-500">
            <FaFacebook />
          </a>
          <a href="#" className="text-gray-600 hover:text-red-500">
           <FaInstagram />
          </a>
          <a href="#" className="text-gray-600 hover:text-blue-700">
           <FaLinkedin />
          </a>
          <a href="#" className="text-gray-600 hover:text-black">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p>{t('copyright_notice')}</p>
        </div>
      </motion.div>

      {/* Back to top button */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-5 end-5 rounded-full bg-gray-600 p-3 text-xs font-medium uppercase leading-tight cursor-pointer text-white shadow-md hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-0"
      >
        <span className="[&>svg]:w-4">
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