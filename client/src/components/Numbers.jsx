import React from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Numbers = () => {
  const { t } = useTranslation();
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const stats = [
    {
      value: "6+",
      label: t("years_in_business"),
      sublabel: t("creating_success")
    },
    {
      value: "4821",
      label: t("projects_delivered"),
      sublabel: t("last_six_years")
    },
    {
      value: "37+",
      label: t("team_members"),
      sublabel: t("working_for_success")
    }
  ];

  return (
    <section
      className="min-h-screen flex flex-col items-center bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1699136897382-ec50fa3a289c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzF8fGdhbWJsaW5nfGVufDB8fDB8fHww')",
      }}
      id="numbers"
    >
      {/* Top Section: What is AGS */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.1 }}
        className="w-full bg-gray-100/90 text-black px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-16 flex flex-col lg:flex-row gap-4 lg:gap-6"
      >
        <motion.div 
          variants={fadeIn}
          className="lg:w-3/5"
        >
          <h1 className="text-xl md:text-2xl font-bold mb-3 text-green-700">{t('what_is_ags_title')}</h1>
          <p
            className="text-xs md:text-sm leading-relaxed mb-6"
            dangerouslySetInnerHTML={{ __html: t('what_is_ags_description') }}
          />

          <h1 className="text-xl md:text-2xl font-bold mb-3 text-green-700">What Makes IGAMING AFRIKA SUMMIT Special? </h1>
          <p
            className="text-xs md:text-sm leading-relaxed"
          >
            <strong>Global Gathering:</strong> With expected attendees from over 70 countries, this event is unmatched in its international reach. <br /> <br />
            <strong>Safari Tour:</strong> The event will kick off with a memorable Safari Tour of the iconic Masai Mara, a session that will allow the attendees to have an experience with Kenya’s wildlife such as Lions, Antelopes, Elephants among others. <br /> <br />
            <strong>World-Class Content & Diverse Opportunities:</strong> Explore sections dedicated to key industry verticals such as regulation, marketing, payments etc and participate in targeted sessions to earn industry insights and knowledge. <br /> <br />
            <strong>Memorable Entertainment:</strong> The event culminates with an iconic closing celebration at the Kenyatta International Convention Center (KICC) with a lineup of renowned artists.
          </p>
        </motion.div>
        
        <motion.div 
          variants={fadeIn}
          transition={{ delay: 0.1 }}
          className="lg:w-2/5 aspect-video"
        >
          <img 
            src="https://img.freepik.com/free-photo/handsome-young-black-man-playing-poker-holding-smartphone-dollars-skeptic-nervous-frowning-upset-because-problem-negative-person_839833-20417.jpg?uid=R149908537&ga=GA1.1.2111726361.1747214498&semt=ais_hybrid&w=740" 
            alt="AGS Event" 
            className="w-full h-full rounded-lg shadow-lg object-cover"
            loading="lazy"
          />
        </motion.div>
      </motion.div>

      {/* Bottom Section: Stats */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16 flex-1 flex flex-col justify-center"
      >
        <motion.h2 
          variants={fadeIn}
          className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center"
        >
          {t('numbers_tell_our_story')}
        </motion.h2>
        
        <motion.p 
          variants={fadeIn}
          transition={{ delay: 0.1 }}
          className="mt-2 md:mt-3 text-xs md:text-sm text-white/90 text-center max-w-2xl mx-auto"
        >
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.
        </motion.p>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 lg:mt-10"
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              variants={fadeIn}
              className="flex flex-col items-center"
            >
              <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                <span className="text-green-600 bg-clip-text bg-gradient-to-r ">
                  {stat.value}
                </span>
              </h3>
              <p className="mt-1 text-sm md:text-base font-medium text-white">{stat.label}</p>
              <p className="text-xs text-white/80">{stat.sublabel}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default React.memo(Numbers);