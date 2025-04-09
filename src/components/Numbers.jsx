import React from "react";
import { useTranslation } from "react-i18next";

const Numbers = () => {

  const { t } = useTranslation();
  
  return (
    <section
      className="min-h-screen flex flex-col items-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: "url('https://cdn.pixabay.com/photo/2021/09/07/07/11/game-console-6603120_1280.jpg')",
      }}
      id="numbers"
    >
      {/* Top Section: What is AGS - Reduced Height */}
      <div className="w-full bg-gray-100/90 text-black px-4 py-6 md:px-8 md:py-8 lg:px-12 lg:py-16 flex flex-col lg:flex-row gap-4 lg:gap-6">
        <div className="lg:w-3/5">
        <h1 className="text-xl md:text-2xl font-bold mb-3">{t('what_is_ags_title')}</h1>
        <p
          className="text-xs md:text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t('what_is_ags_description') }}
        />
        </div>
        
        <div className="lg:w-2/5 aspect-video">
          <img 
            src="https://img.freepik.com/free-photo/gamer-chair-with-multicolored-neon-lights_52683-99741.jpg" 
            alt="AGS Event" 
            className="w-full h-full rounded-lg shadow-lg object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom Section: Stats - Now more balanced with top */}
      <div className="w-full max-w-6xl mx-auto px-4 py-8 md:py-12 lg:py-16 flex-1 flex flex-col justify-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white text-center">
          {t('numbers_tell_our_story')}
        </h2>
        <p className="mt-2 md:mt-3 text-xs md:text-sm text-white/90 text-center max-w-2xl mx-auto">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6 md:mt-8 lg:mt-10">
          {[
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
          ].map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <h3 className="font-bold text-3xl sm:text-4xl md:text-5xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-blue-600">
                  {stat.value}
                </span>
              </h3>
              <p className="mt-1 text-sm md:text-base font-medium text-white">{stat.label}</p>
              <p className="text-xs text-white/80">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Numbers);