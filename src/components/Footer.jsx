import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaPaperPlane,
  FaTelegram,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";
import { toast } from "react-hot-toast";
import { FormField } from "../lib/utils";
import { fetchCSRFToken } from "../services/api";

const NavLink = ({ href, children }) => (
  <li>
    <a
      href={href}
      className="hover:text-green-600 transition-colors flex items-center group"
    >
      <span className="w-1 h-1 bg-green-600 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
      {children}
    </a>
  </li>
);

const ContactSection = ({
  formData,
  onChange,
  onSubmit,
  errors,
  isSubmitting,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    style={{ backgroundColor: "#14a45c" }}
    className="max-w-[90%] xl:max-w-7xl mx-auto text-white py-12 sm:py-16 md:py-20 rounded-lg px-4 sm:px-6 relative overflow-hidden justify-center items-center"
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className=" w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
      <div className=" w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
    </div>

    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-8 sm:mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3">
          Get In Touch With Us
        </h3>
        <p className="text-sm md:text-lg opacity-90 max-w-2xl mx-auto">
          Have questions about the summit? Want to explore partnership
          opportunities? We'd love to hear from you!
        </p>
      </div>

      <form id="contact-form" onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Enter your full name"
            required
            error={errors.name}
            disabled={isSubmitting}
          />
          <FormField
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="your.email@example.com"
            required
            error={errors.email}
            disabled={isSubmitting}
          />
        </div>

        <FormField
          label="Topic of Inquiry"
          name="topic"
          value={formData.topic}
          onChange={onChange}
          placeholder="e.g., Partnership, Sponsorship, Speaking, General Inquiry"
          required
          error={errors.topic}
          disabled={isSubmitting}
        />

        <FormField
          label="Your Message"
          name="message"
          value={formData.message}
          onChange={onChange}
          placeholder="Tell us about your inquiry, questions, or how we can help you..."
          rows="4"
          required
          error={errors.message}
          disabled={isSubmitting}
        />

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`inline-flex items-center gap-2 bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 hover:text-green-700 shadow-lg hover:shadow-xl ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaPaperPlane className="text-sm" />
            {isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </div>
      </form>
    </div>
  </motion.div>
);

const LinksSection = () => {
  const companyLinks = [
    { href: "https://igamingafrika.com/about-us/", text: "About" },
    { href: "https://igamingafrika.com/advertise/", text: "Advertise" },
    { href: "https://igamingafrika.com/join-our-team/", text: "Join our Team" },
  ];

  const helpLinks = [
    { href: "https://igamingafrika.com/donate/", text: "Donate" },
    { href: "https://igamingafrika.com/contact-us/", text: "Contact Us" },
    {
      href: "https://igamingafrika.com/terms-and-conditions-events/ ",
      text: "Terms and Conditions",
    },
    {
      href: "https://igamingafrika.com/privacy-policy-events/",
      text: "Privacy Policy",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      <div className="flex flex-col xl:grid xl:grid-cols-[1.5fr_1fr_1fr] gap-8 md:gap-12 lg:gap-16 relative">
        {/* Logo and Description - Full width on all screens */}
        <div className="space-y-4 xl:col-span-1">
          <a href="#" title="iGaming Afrika" className="flex">
            <img
              className="w-auto h-22 sm:h-24 md:h-26 lg:h-40"
              src="Summit_Logo.png"
              alt="iGaming Afrika Logo"
            />
          </a>
          <p className="text-xs sm:text-[15px] text-white leading-relaxed">
            iGaming AFRIKA Summit is Africa's mega gaming event, designed to
            unite the entire gaming industry players across the world in one
            place—the stunning city of Nairobi, Kenya. This being the inaugural
            edition of the summit, the event is seen to be the largest event in
            the industry. The summit is taking place in an impressive 3,300m²
            square meters location at Sarit Expo Centre, Nairobi's Largest Expo
            center giving exhibitors and attendees a massive ground to showcase
            their products, meet and connect with industry players as we discuss
            the future of the gaming industry in Africa.
          </p>
        </div>

        {/* Menus Container - Side by side on smaller screens, grid on XL */}
        <div className="flex flex-col sm:flex-row justify-between xl:contents gap-8 md:gap-12">
          {/* Company Links */}
          <div className="space-y-4 sm:flex-1 mt-0 xl:mt-45">
            <h3 className="text-sm sm:text-[18px] font-bold text-gray-300 border-b border-gray-900 pb-2">
              COMPANY
            </h3>
            <ul className="space-y-3 text-xs sm:text-[15px]">
              {companyLinks.map((link, index) => (
                <NavLink key={index} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </ul>
          </div>

          {/* Help Links */}
          <div className="space-y-4 sm:flex-1 mt-0 xl:mt-45">
            <h3 className="text-sm sm:text-[18px] font-bold text-gray-300 border-b border-gray-900 pb-2">
              HELP
            </h3>
            <ul className="space-y-3 text-xs sm:text-[15px]">
              {helpLinks.map((link, index) => (
                <NavLink key={index} href={link.href}>
                  {link.text}
                </NavLink>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SocialSection = () => {
  const socialLinks = [
    {
      href: "https://x.com/iGASummit?t=N8kO_9qtwaBu3YeUUaBQNA&s=09",
      Icon: FaTwitter,
      label: "Twitter",
      hoverColor: "hover:text-[#1DA1F2]",
    },
    {
      href: "https://www.facebook.com/share/1Ay79xHcfi/",
      Icon: FaFacebook,
      label: "Facebook",
      hoverColor: "hover:text-[#1877F2]",
    },
    {
      href: "https://www.instagram.com/igasummit?igsh=MXF6YXdpYXRxdzBoaQ==",
      Icon: FaInstagram,
      label: "Instagram",
      hoverColor: "hover:text-[#E4405F]",
    },
    {
      href: "https://www.linkedin.com/company/igasummit/",
      Icon: FaLinkedin,
      label: "LinkedIn",
      hoverColor: "hover:text-[#0077B5]",
    },
    {
      href: "https://www.youtube.com/@iGASummit",
      Icon: FaYoutube,
      label: "YouTube",
      hoverColor: "hover:text-[#FF0033]",
    },
    {
      href: "https://open.spotify.com/show/11m2XkXyP3MmjHRgXEVgwx?si=8cb7aaae5d2a47bc",
      Icon: FaSpotify,
      label: "Spotify",
      hoverColor: "hover:text-[#1DB954]",
    },
    {
      href: "https://t.me/igamingInAfrica",
      Icon: FaTelegram,
      label: "Telegram",
      hoverColor: "hover:text-[#0088CC]",
    },
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 z-10">
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 pt-2">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={`text-gray-300 text-xl md:text-[25px] transition-all duration-300 transform hover:scale-125 ${social.hoverColor}`}
          >
            <social.Icon />
          </a>
        ))}
      </div>
    </div>
  );
};

const BackToTop = ({ isVisible, onClick }) => (
  <motion.button
    type="button"
    onClick={onClick}
    initial={{ opacity: 0 }}
    animate={{ opacity: isVisible ? 1 : 0 }}
    transition={{ duration: 0.3 }}
    className="fixed bottom-3 z-10 sm:bottom-5 left-3 sm:left-5 rounded-full bg-green-600 p-2 sm:p-3 text-xs font-medium uppercase leading-tight cursor-pointer text-white shadow-lg hover:bg-green-700 hover:shadow-xl focus:outline-none focus:ring-0  transform hover:scale-110"
    aria-label="Back to top"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="currentColor"
      className="w-6 sm:w-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
      />
    </svg>
  </motion.button>
);

// Main Footer Component
const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    if (!formData.topic.trim()) {
      newErrors.topic = "Topic of inquiry is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    toast.loading("Sending your inquiry...", { id: "inquiry-toast" });

    try {
      const { csrf_token } = await fetchCSRFToken();
      console.log({ csrf_token });

      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}inquiry/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrf_token,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Inquiry sent successfully!", { id: "inquiry-toast" });
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            topic: "",
            message: "",
          });
        }, 1500);
      } else {
        toast.error("Failed to send inquiry. Please try again.", {
          id: "inquiry-toast",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Try again later.", {
        id: "inquiry-toast",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      id="footer"
      className="relative text-white pb-8 pt-16 min-h-screen container mx-auto px-6 lg:px-8 py-8"
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        {/* Base African pattern image with white overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/africa-pattern.png"
            alt="Footer Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </div>

        {/* Nairobi skyline image - positioned at bottom */}
        <div className="absolute bottom-0 left-0 w-full h-[45vh] md:h-[40vh] lg:h-[45vh] z-0">
          <img
            src="/skyline-for-website.png"
            alt="Nairobi Skyline"
            className="w-full h-full object-cover object-bottom"
          />
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      </div>

      {/* Content - positioned above background with padding bottom to avoid skyline */}
      <div className="relative z-10 pb-[30vh] lg:pb-[40vh]">
        <ContactSection
          formData={formData}
          onChange={handleInputChange}
          onSubmit={handleSubmit}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>
      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-4 absolute bottom-0 justify-center w-full z-10"
      >
        <SocialSection />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs font-semibold sm:text-sm text-gray-200 z-0">
          <p className="pt-2">
            © Copyright 2026 IGA Events Limited - All Rights Reserved
          </p>
        </div>
      </motion.div>

      <BackToTop isVisible={isVisible} onClick={scrollToTop} />
    </footer>
  );
};

export default Footer;
