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
} from "react-icons/fa";
import { toast } from "react-hot-toast";

// Reusable Components
const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  rows,
  error,
  disabled,
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium">
      {label} {required && "*"}
    </label>
    {rows ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className={`w-full px-4 py-1 rounded-lg text-black placeholder-gray-500 border-2 bg-white/90 focus:outline-none focus:border-transparent resize-none ${
          error ? "border-red-500" : "border-white/20"
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-1 rounded-lg text-black placeholder-gray-500 border-2 bg-white/90 focus:outline-none focus:border-transparent ${
          error ? "border-red-500" : "border-white/20"
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
    )}
    {error && <p className="text-red-200 text-sm">{error}</p>}
  </div>
);

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

// eslint-disable-next-line no-unused-vars
const SocialLink = ({ href, Icon, label, hoverColor }) => (
  <a
    href={href}
    className={`text-gray-400 ${hoverColor}  transform hover:scale-110 text-2xl sm:text-3xl`}
    aria-label={label}
  >
    <Icon />
  </a>
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
    className="max-w-7xl mx-auto text-white py-12 sm:py-16 md:py-20 rounded-lg px-4 sm:px-6 relative overflow-hidden"
  >
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-30 translate-y-30"></div>
    </div>

    <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center mb-8 sm:mb-10">
        <h3 className="text-2xl sm:text-3xl font-bold mb-3">
          Get In Touch With Us
        </h3>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
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
    { href: "https://igamingafrika.com/disclaimer/", text: "Disclaimer" },
    { href: "https://igamingafrika.com/join-our-team/", text: "Join our Team" },
  ];

  const helpLinks = [
    { href: "https://igamingafrika.com/donate/", text: "Donate" },
    { href: "https://igamingafrika.com/contact-us/", text: "Contact Us" },
    { href: "#", text: "Terms and Conditions" },
    {
      href: "https://igamingafrika.com/privacy-policy/",
      text: "Privacy Policy",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr] gap-8 md:gap-12 lg:gap-16">
        {/* Logo and Description */}
        <div className="space-y-4">
          <a href="#" title="iGaming Afrika" className="flex">
            <img
              className="w-auto h-12 sm:h-14 md:h-16 lg:h-20"
              src="Summit2_trimmed.png"
              alt="iGaming Afrika Logo"
            />
          </a>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            iGaming AFRIKA Summit is Africa's mega gaming event, designed to
            unite the entire gaming industry players across the world in one
            place—the stunning city of Nairobi, Kenya. This being the inaugural
            edition of the summit, the event is seen to be the largest event in
            the industry, taking place in Nairobi, in 2026, the summit is seen
            to be the mother of all gaming conferences in Africa. The summit is
            taking place in an impressive 3,300m² square meters location at
            Sarit Expo Center, Nairobi's Largest Expo center giving exhibitors
            and attendees a massive ground to showcase their products, meet and
            connect with industry players as we discuss the future of the gaming
            industry in Africa.
          </p>
        </div>

        {/* Company Links */}
        <div className="space-y-4 mt-6 sm:mt-20 sm:ml-0 md:ml-10 lg:ml-20">
          <h3 className="text-sm sm:text-md font-bold text-gray-400 border-b border-gray-700 pb-2">
            COMPANY
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm">
            {companyLinks.map((link, index) => (
              <NavLink key={index} href={link.href}>
                {link.text}
              </NavLink>
            ))}
          </ul>
        </div>

        {/* Help Links */}
        <div className="space-y-4 mt-6 sm:mt-20">
          <h3 className="text-sm sm:text-md font-bold text-gray-400 border-b border-gray-700 pb-2">
            HELP
          </h3>
          <ul className="space-y-3 text-xs sm:text-sm">
            {helpLinks.map((link, index) => (
              <NavLink key={index} href={link.href}>
                {link.text}
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const SocialSection = () => {
  const socialLinks = [
    {
      href: "https://twitter.com/igamingafrika/",
      Icon: FaTwitter,
      label: "Twitter",
      hoverColor: "hover:text-blue-400",
    },
    {
      href: "https://www.facebook.com/IgamingAfrika/",
      Icon: FaFacebook,
      label: "Facebook",
      hoverColor: "hover:text-blue-500",
    },
    {
      href: "https://www.instagram.com/igamingafrikasummit?igsh=bHl5MWlkNWdiYzll",
      Icon: FaInstagram,
      label: "Instagram",
      hoverColor: "hover:text-red-500",
    },
    {
      href: "https://www.linkedin.com/company/igamingafrika/",
      Icon: FaLinkedin,
      label: "LinkedIn",
      hoverColor: "hover:text-blue-700",
    },
    {
      href: "https://www.youtube.com/@igamingafrika",
      Icon: FaYoutube,
      label: "YouTube",
      hoverColor: "hover:text-red-700",
    },
    {
      href: "https://t.me/igamingafrika",
      Icon: FaTelegram,
      label: "Telegram",
      hoverColor: "hover:text-blue-700",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      <div className="flex items-center justify-center space-x-4 sm:space-x-6 pt-2">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className={`text-gray-500 text-2xl transition-colors duration-300 ${social.hoverColor}`}
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
    className="fixed bottom-3 sm:bottom-5 left-3 sm:left-5 rounded-full bg-green-600 p-2 sm:p-3 text-xs font-medium uppercase leading-tight cursor-pointer text-white shadow-lg hover:bg-green-700 hover:shadow-xl focus:outline-none focus:ring-0  transform hover:scale-110"
    aria-label="Back to top"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="currentColor"
      className="w-3 sm:w-4"
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

    // Clear error when user starts typing
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/inquiry/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${import.meta.env.VITE_API_TOKEN}`,
        },
        body: JSON.stringify(formData),
      });

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
    <footer id="footer" className="bg-black text-white pb-8 pt-16">
      <ContactSection
        formData={formData}
        onChange={handleInputChange}
        onSubmit={handleSubmit}
        errors={errors}
        isSubmitting={isSubmitting}
      />

      <LinksSection />

      <SocialSection />

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="py-4 border-t border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs sm:text-sm text-gray-400">
          <p>
            © Copyright 2026 Media-Tech iGaming Technology Limited - All Rights
            Reserved
          </p>
        </div>
      </motion.div>

      <BackToTop isVisible={isVisible} onClick={scrollToTop} />
    </footer>
  );
};

export default Footer;
