import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";

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

const Numbers = () => {
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
  const stats = [
    {
      value: "3500+",
      label: "Delegates",
      icon: "🧑‍💼",
    },
    {
      value: "100+",
      label: "Speakers",
      icon: "🎤",
    },
    {
      value: "350+",
      label: "Affiliates",
      icon: "🔗",
    },
    {
      value: "500+",
      label: "Operators",
      icon: "🎮",
    },
    {
      value: "100+",
      label: "Exhibitors & Sponsors",
      icon: "🏢",
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
      <div className="relative w-full flex justify-center bg-white/95 backdrop-blur-sm">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
          className="w-full max-w-[1400px] text-gray-800 py-8 md:py-12 lg:py-16 flex flex-col lg:flex-row gap-8 lg:gap-12"
        >
          <motion.div
            variants={fadeIn}
            className="lg:w-1/2 px-6 sm:px-8 lg:px-12"
          >
            <motion.h1
              variants={scaleIn}
              className="text-xl lg:text-2xl font-bold mb-6 text-green-700 leading-tight"
            >
              What is the iGaming AFRIKA Summit?
            </motion.h1>
            <motion.div
              variants={fadeIn}
              className="text-sm leading-relaxed mb-8 text-gray-700"
            >
              <strong>iGaming AFRIKA Summit</strong> is Africa’s mega gaming
              event, designed to unite the entire gaming industry players across
              the world in one place—the stunning city of{" "}
              <strong>Nairobi, Kenya.</strong> This being the inaugural edition
              of the summit, the event is expected to be the largest in the
              industry. Taking place in Nairobi in 2026, it is considered the
              mother of all gaming conferences in Africa. The summit is taking
              place in an impressive 3,300m² square meters location at{" "}
              <strong>Sarit Expo Centre</strong>, Nairobi’s Largest Expo centre
              giving exhibitors and attendees a massive ground to showcase their
              products, meet and connect with industry players as we discuss the
              future of the gaming industry in Africa.
            </motion.div>

            <motion.h2
              variants={scaleIn}
              className="text-xl lg:text-2xl font-bold mb-6 text-green-700 leading-tight"
            >
              What Makes iGaming AFRIKA SUMMIT Special?
            </motion.h2>

            <motion.div
              variants={fadeIn}
              className="space-y-6 text-sm leading-relaxed text-gray-700"
            >
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">Free:</span>{" "}
                  This is the first-ever free-entry gaming summit in Africa. The
                  free tickets provide access to the exhibition centre, offering
                  a unique opportunity to explore the extensive product
                  offerings from various exhibitors. Additionally, ticket
                  holders will have access to select panel discussions,
                  providing a valuable chance to learn from our knowledgeable
                  panel of speakers and gain insights into the latest trends and
                  developments in the gaming industry
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Global Gathering:
                  </span>{" "}
                  With expected attendees from over 100 countries, this event is
                  unmatched in its international reach. It offers a unique
                  platform for networking with industry leaders from around the
                  world.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Safari Tour:
                  </span>{" "}
                  The event will kick off with a memorable Safari Tour of the
                  iconic Masai Mara and Nairobi National Parks allowing
                  attendees to experience Kenya's wildlife including Lions,
                  Antelopes, and Elephants. It provides a once-in-a-lifetime
                  opportunity to connect with nature before the main event.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">
                    World-Class Content:
                  </span>{" "}
                  Explore sections dedicated to key industry verticals such as
                  regulation, affiliate marketing, AI, Esports, Crypto, payments
                  etc with targeted sessions for industry insights. Attendees
                  will gain practical knowledge from expert speakers and
                  industry pioneers.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <span className="font-semibold text-gray-900">
                    Memorable Entertainment:
                  </span>{" "}
                  The event culminates with an iconic closing celebration
                  featuring renowned artists. It promises an unforgettable
                  experience blending entertainment with networking
                  opportunities. Venue(TBC)
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="lg:w-1/2 px-6 sm:px-8 lg:px-12 flex items-center"
          >
            <div className="relative w-full">
              <motion.img
                variants={scaleIn}
                src="/Summit2.png"
                alt="AGS Event"
                className="w-full h-80 md:h-96 lg:h-full max-h-[500px] rounded-2xl object-cover"
                loading="lazy"
              />
              {/* <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div> */}
            </div>
          </motion.div>
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
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight"
          >
            Numbers tell our story
          </motion.h2>
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
          className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                variants={scaleIn}
                className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300"
              >
                {stat.icon}
              </motion.div>

              <motion.h3
                variants={scaleIn}
                className="font-bold text-3xl sm:text-4xl md:text-5xl mb-3"
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
