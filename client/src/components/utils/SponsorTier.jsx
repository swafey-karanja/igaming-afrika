import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const SponsorTier = ({
  title,
  sponsors,
  logoSizes,
  containerClass,
  titleColor,
  delay = 0,
}) => (
  <section className="text-center space-y-6 md:space-y-8">
    <motion.div
      className="text-center mb-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
      transition={{ delay }}
    >
      <div className="inline-flex items-center gap-3 mb-4">
        <h2
          className={`text-lg md:text-2xl font-bold bg-gradient-to-r ${titleColor} bg-clip-text text-transparent mb-2`}
        >
          {title}
        </h2>
      </div>
      <motion.div
        className={`w-16 h-1 bg-gradient-to-r ${titleColor
          .replace("text-transparent", "")
          .replace("bg-gradient-to-r", "")
          .replace("bg-clip-text", "")} mx-auto rounded-full mb-6`}
        initial={{ width: 0 }}
        whileInView={{ width: 64 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />
    </motion.div>

    <div className={containerClass}>
      {sponsors.map((sponsor, index) => (
        <motion.div
          key={sponsor.name}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={title === "Headline Sponsor" ? scaleIn : fadeUp}
          transition={{
            duration: 0.5,
            delay: delay + (title === "Headline Sponsor" ? 0.5 : index * 0.1),
          }}
          className={`${
            title === "Headline Sponsor"
              ? "transform hover:scale-105"
              : "hover:scale-105"
          } transition-all duration-300 relative`}
        >
          <a
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-90 transition-opacity duration-200 block group relative"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className={`${logoSizes} object-contain mx-auto filter group-hover:brightness-110 transition-all duration-300 drop-shadow-lg hover:drop-shadow-xl`}
              loading="lazy"
            />
            {title === "Headline Sponsor" && (
              <div className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg z-10">
                ⭐ HEADLINE
              </div>
            )}
          </a>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SponsorTier;
