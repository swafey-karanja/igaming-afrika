import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Counter component for animated numbers
const AnimatedCounter = ({ value, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
      const startTime = Date.now() + delay;
      const endTime = startTime + duration;

      const animate = () => {
        const now = Date.now();
        if (now < startTime) {
          requestAnimationFrame(animate);
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * numericValue);

        setCount(currentValue);

        if (now < endTime) {
          requestAnimationFrame(animate);
        } else {
          setCount(numericValue);
        }
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, duration, delay, hasAnimated]);

  const displayValue = value.includes("+") ? `${count}+` : count.toString();

  return <span ref={ref}>{displayValue}</span>;
};

// Accordion Item Component
const AccordionItem = ({ title, content, isOpen, onClick }) => {
  return (
    <motion.div
      initial={false}
      className="border-b border-gray-200 last:border-b-0"
    >
      <motion.button
        onClick={onClick}
        className="w-full py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
        whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
        whileTap={{ scale: 0.99 }}
      >
        <span className="font-semibold text-gray-900 text-sm md:text-[15px]">
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </motion.div>
      </motion.button>

      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{
          height: { duration: 0.3, ease: "easeOut" },
          opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 },
        }}
        className="overflow-hidden"
      >
        <div className="px-1 pb-4">
          <div className="text-xs md:text-[13px] font-medium leading-relaxed text-gray-700">
            {content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Numbers = () => {
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

  // Accordion data
  const accordionItems = [
    {
      title: "Free Entry Pass",
      content:
        "This is the first-ever event of its scale within the iGaming industry to offer a free entry pass on the continent. The free tickets provide access to the exhibition centre, offering a unique opportunity to explore the extensive product offerings from various exhibitors. Additionally, ticket holders will have access to select panel discussions, providing a valuable chance to learn from our knowledgeable panel of speakers and gain insights into the latest trends and developments in the gaming industry.",
    },
    {
      title: "Global Gathering",
      content:
        "With expected attendees from over 100 countries, this event is unmatched in its international reach. It offers a unique platform for networking with industry leaders from around the world.",
    },
    {
      title: "Safari Tour",
      content:
        "The event will kick off with a memorable Safari Tour allowing attendees to experience Kenya's wildlife including Lions, Antelopes, and Elephants. It provides a once-in-a-lifetime opportunity to connect with nature before the main event.",
    },
    {
      title: "World-Class Content",
      content:
        "Explore sections dedicated to key industry verticals such as regulation, affiliate marketing, AI, Esports, Crypto, payments etc with targeted sessions for industry insights. Attendees will gain practical knowledge from expert speakers and industry pioneers.",
    },
    {
      title: "Memorable Entertainment",
      content:
        "The event culminates with an iconic closing celebration featuring renowned artists. It promises an unforgettable experience blending entertainment with networking opportunities.",
    },
  ];

  const stats = [
    {
      value: "3500+",
      label: "Delegates",
      icon: "/Iconography/Delegates.png",
    },
    {
      value: "100+",
      label: "Speakers",
      icon: "/Iconography/Speakers.png",
    },
    {
      value: "350+",
      label: "Affiliates",
      icon: "/Iconography/Affiliates.png",
    },
    {
      value: "500+",
      label: "Operators",
      icon: "/Iconography/Operators.png",
    },
    {
      value: "100+",
      label: "Exhibitors & Sponsors",
      icon: "/Iconography/Exhibitors.png",
    },
  ];

  return (
    <section
      className="min-h-screen flex flex-col items-center bg-center bg-fixed relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1699136897382-ec50fa3a289c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGdhbWJsaW5nfGVufDB8fDB8fHww')",
      }}
      id="numbers"
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
          className="w-full max-w-[1600px] text-gray-800 py-8 md:py-12 lg:pt-16 lg:pb-0 px-6 sm:px-8 lg:px-12"
        >
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
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
        className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 py-8 md:py-12 lg:py-16 flex-1 flex flex-col justify-center"
      >
        <motion.div variants={fadeIn} className="text-center mb-8 md:mb-12">
          <motion.h2
            variants={scaleIn}
            className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2"
          >
            Numbers tell our story
          </motion.h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full my-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

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

export default React.memo(Numbers);
