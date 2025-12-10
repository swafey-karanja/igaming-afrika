/* eslint-disable no-unused-vars */
import { useState } from "react";
import { accordionItems, stats } from "../../data/data";
import { AccordionItem, AnimatedCounter } from "../../lib/utils";
import { motion } from "framer-motion";
import Header from "../../components/Header";

const EventDetails = () => {
  const [openItems, setOpenItems] = useState({ 0: true }); // First item open by default

  const toggleItem = (index) => {
    setOpenItems((prev) => {
      // If clicking on already open item, close it
      if (prev[index]) {
        return {};
      }
      // Otherwise, close all and open the clicked one
      return { [index]: true };
    });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const scrollLinks = [
    { name: "About", href: "#eventDetails" },
    { name: "Sponsors", href: "#sponsors" },
    { name: "FloorPlan", href: "#floorPlan" },
    { name: "Schedule", href: "#schedule" },
    { name: "Sponsor", href: "#sponsorshipPackages" },
    { name: "Exhibit", href: "#exhibitionPackages" },
    { name: "Tickets", href: "#eventTickets" },
    { name: "FAQs", href: "#faqs" },
    { name: "Venue-Info", href: "#venueInfo" },
  ];

  return (
    <section
      id="eventDetails"
      className="min-h-screen flex flex-col items-center bg-center bg-fixed relative scroll-mt-40"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1699136897382-ec50fa3a289c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGdhbWJsaW5nfGVufDB8fDB8fHww')",
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[0.5px]" />

      {/* Top Section: What is AGS */}
      <div className="relative w-full flex justify-center bg-gray-100 backdrop-blur-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="w-full lg:max-w-[1600px] text-gray-800 py-8 md:py-12 lg:pt-8 lg:pb-0 px-6 sm:px-8 lg:px-12"
        >
          <div className="w-full pb-2 text-center flex gap-x-6 items-center justify-start xl:justify-center overflow-x-auto hide-scrollbar flex-nowrap">
            {scrollLinks.map((link) => (
              <button
                key={link.href}
                className="py-3 cursor-pointer px-6 bg-gray-100 hover:bg-[#47cf8b] hover:border-[#47cf8b] text-[#14a45c] transition-colors duration-100 ease-in-out hover:text-white rounded-3xl border-2 border-lime-500 font-semibold whitespace-nowrap flex-shrink-0"
                onClick={() => {
                  const section = document.querySelector(link.href);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {link.name}
              </button>
            ))}
          </div>

          <hr className="text-gray-300 my-5 font-bold" />
          {/* Grid Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 h-auto lg:min-h-[600px]">
            {/* Top Left: Image */}
            <motion.div
              variants={fadeIn}
              className="flex flex-col justify-center mb-10 lg:mb-0"
            >
              <div className="relative w-full aspect-video lg:aspect-square max-h-[450px] overflow-hidden">
                <motion.img
                  variants={scaleIn}
                  src="/Nairobi.webp"
                  alt="iGaming AFRIKA Summit Event"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Top Right: First Question and Answer */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.1 }}
              className="flex flex-col mt-0 md:mb-10 lg:mt-5 ml-0 lg:ml-12"
            >
              <motion.h1
                variants={scaleIn}
                className="text-md md:text-lg lg:text-4xl font-bold mb-6 text-green-700 leading-tight"
              >
                What is the iGaming AFRIKA Summit
                <br className="block md:hidden lg:block" /> (iGA Summit)?
              </motion.h1>
              <motion.div
                variants={fadeIn}
                className="text-xs md:text-[13px] font-medium leading-relaxed text-gray-700"
              >
                <strong className="text-[15px]">
                  iGaming AFRIKA Summit is Africa's mega gaming event, designed
                  to unite the entire gaming industry players across the world
                  in one place—the stunning city of Nairobi, Kenya from 4th -
                  6th May 2026.
                </strong>{" "}
                <br />
                <br />
                This being the inaugural edition of the summit, the event is
                expected to be the largest in the industry. The summit is taking
                place in an impressive 3,300m² square meters location at{" "}
                <strong>Sarit Expo Centre</strong>, Nairobi's Largest Expo
                centre giving exhibitors and attendees a massive ground to
                showcase their products, meet and connect with industry players
                as we discuss the future of the gaming industry in Africa.
              </motion.div>
            </motion.div>

            {/* Bottom Left: Accordion */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="flex flex-col mt-10 lg:mr-12 mb-0"
            >
              <motion.h2
                variants={scaleIn}
                className="text-md md:text-lg lg:text-4xl font-bold mb-3 text-green-700 leading-tight"
              >
                What Makes iGaming AFRIKA SUMMIT Special?
              </motion.h2>

              <motion.div variants={fadeIn} className="overflow-hidden">
                {accordionItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openItems[index]}
                    onClick={() => toggleItem(index)}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* Bottom Right: Video */}
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className="flex mt-10 lg:mt-0"
            >
              <div className="relative w-full aspect-video min-h-[300px] lg:min-h-[600px] overflow-hidden">
                <motion.iframe
                  variants={scaleIn}
                  className="w-full h-full lg:h-[80%]"
                  src="https://www.youtube.com/embed/2uGFFuhAVhM"
                  title="Why iGA Summit 2026; Unpacking the iGaming AFRIKA Summit"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section: Stats */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative w-full container mx-auto px-6 sm:px-8 py-8 md:py-12 lg:py-16 flex-1 flex flex-col justify-center"
      >
        <Header title="Numbers Tell our Story" />

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
              },
            },
          }}
          className="grid grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                variants={scaleIn}
                className="text-xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                <img src={stat.icon} alt={stat.label} className="h-25 w-auto" />
              </motion.div>

              <motion.h3
                variants={scaleIn}
                className="font-bold text-2xl md:text-5xl mb-3"
              >
                <span className="text-green-400 bg-gradient-to-r from-green-400 to-green-300 bg-clip-text">
                  <AnimatedCounter
                    value={stat.value}
                    duration={2000}
                    delay={index * 200}
                  />
                </span>
              </motion.h3>

              <motion.p
                variants={fadeIn}
                className="text-lg font-semibold text-white mb-2"
              >
                {stat.label}
              </motion.p>

              <motion.p
                variants={fadeIn}
                className="text-sm text-white/80 max-w-xs"
              >
                {stat.sublabel}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EventDetails;
