import { useState, useCallback, useEffect } from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Speakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(10); // Initial visible count
  const [isMobile, setIsMobile] = useState(false);

  // Add event categories to each speaker
  const speakers = [
    { 
      name: 'Jeremiah Maangi', 
      company: 'iGaming Afrika',
      bio: 'Founder & CEO, iGaming Afrika',
      role: 'Chief Executive Officer',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/Jere.jpg',
      social: {
        twitter: 'https://x.com/jeremiahmaangi',
        linkedin: 'https://www.linkedin.com/in/jeremiah-maangi-2b4a85112/',
        website: 'https://igamingafrika.com/',
      },
      events: ['Wednesday Leadership Stage', 'Wednesday Leadership Stage']
    },
    { 
      name: 'Geoffrey Muindi', 
      company: 'Dive Marketing Ltd',
      bio: 'CEO Dive Marketing ltd.',
      role: 'Chief Executive Officer',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/Geoffrey-1.jpg',
      social: {
        twitter: 'https://twitter.com/Geff_Muindi',
        linkedin: 'https://www.linkedin.com/in/nixonkanali/',
        website: 'https://www.divemarketing.co.ke/'
      },
      events: ['Wednesday Investment Hub', 'Tuesday Leadership Stage', 'Tuesday Global Markets Hub']
    },
    { 
      name: 'David Ukairo', 
      company: 'Mondogaming SRL',
      bio: 'Mondogaming SRL, Business Development Manager (Africa).',
      role: 'Business Development Manager',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/David-Ukairo-1.jpg',
      social: {
        twitter: 'https://twitter.com/DauDbet',
        linkedin: 'https://www.linkedin.com/in/david-ukairo-90637125/',
      },
      events: ['Wednesday Investment Hub', 'Tuesday Global Tech Hub']
    },
    { 
      name: 'Felix Mulandi', 
      company: '',
      bio: 'IGaming Consultant',
      role: 'IGaming Consultant',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/Felix-Mulandi-2.jpg',
      social: {
        twitter: 'https://twitter.com/Fmulandi',
        linkedin: 'https://www.linkedin.com/in/felix-mulandi-09882a111/'
      },
      events: ['Wednesday Marketing Hub', 'Wednesday Investment Hub', 'Tuesday Global Markets Hub']
    },
    { 
      name: 'Oyindamola Michaels', 
      company: '',
      bio: 'iGaming Professional',
      role: 'iGaming Professional',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/Oyindamola-Michaels-1.jpg',
      social: {
        twitter: 'https://twitter.com/oyineski',
        linkedin: 'https://www.linkedin.com/in/oyindamola-michaels-spoc-ispo-9708a09b/',
      },
      events: ['Wednesday Gaming Tech Hub', 'Tuesday Global Markets Hub', 'Wednesday Marketing Hub']
    },
    { 
      name: 'Samuel Ogechi', 
      company: 'Playlogiq',
      bio: 'Sales Manager, Playlogiq',
      role: 'Sales Manager',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/Samuel-Ogechi-Moderator.jpg',
      social: {
        twitter: 'https://twitter.com/sheriffking5',
        linkedin: 'https://www.linkedin.com/in/ogechi-samuel-845378192/'
      },
      events: ['Wednesday Leadership Stage', 'Tuesday Sustainability Hub', 'Tuesday Global Markets Hub']
    },
    { 
      name: 'Ambani Netshishivhe', 
      company: 'Highlight Games',
      bio: 'Director of Africa, Highlight Games',
      role: 'Director of Africa',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/Ambani-Netshishivhe-e1685461724679.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/ambani-netshishivhe-99aa619b/',
        website: 'https://highlight-games.com/'
      },
      events: ['Wednesday Leadership Stage', 'Wednesday Investment Hub']
    },
    { 
      name: 'Edwin Tarus', 
      company: 'Tabro Solutions',
      bio: 'Lead Consultant, Tabro Solutions.',
      role: 'Lead Consultant',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/05/Edwin-Tarus.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/edwin-tarus-pmp-14b37b121/'
      },
      events: ['Wednesday Investment Hub', 'Tuesday Leadership Stage', 'Wednesday Marketing Hub']
    },
    { 
      name: 'Alessandro Pizzolotto', 
      company: 'Stm Gaming',
      bio: 'CEO, Stm Gaming',
      role: 'Chief Executive Officer',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/06/Alessandro-e1687177406376.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/alessandro-pizzolotto-53a2989a/',
        website: 'https://www.stmgaming.com/'
      },
      events: ['Wednesday Marketing Hub', 'Tuesday Global Markets Hub', 'Wednesday Marketing Hub']
    },
    { 
      name: 'Ahmad Nabeel', 
      company: 'Trackier',
      bio: 'Assistant Sales Manager, Trackier',
      role: 'Assistant Sales Manage',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/06/Ahmad-e1687178091918.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/ahmad-nabeel-59769a112/',
        website: 'https://trackier.com/'
      },
      events: ['Wednesday Gaming Tech Hub', 'Wednesday Investment Hub', 'Wednesday Marketing Hub']
    },
    { 
      name: 'Kenneth Mugambi', 
      company: 'Afriad Influencer Marketing',
      bio: 'CEO, Afriad Influencer Marketing',
      role: 'Chief Executive Officer',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/06/Kenneth-e1687190676162.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/kenneth-mugambi-871510210/',
        website: 'https://afriadz.com/'
      },
      events: ['Wednesday Gaming Tech Hub', 'Wednesday HR Connect', 'Tuesday Sustainability Hub']
    },
    { 
      name: 'Joe Andrews', 
      company: 'SIS Ltd',
      bio: 'Head of Sales – Africa, SIS Ltd',
      role: 'Head of Sales – Africa',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/07/Joe-Andrews-2-e1689758373140.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/joe-andrews-4aaa7211/',
        website: 'https://sis.tv/',
        twitter: 'https://twitter.com/TotallyBetting'
      },
      events: ['Wednesday Gaming Tech Hub', 'Wednesday HR Connect', 'Tuesday Global Tech Hub']
    },
    { 
      name: 'Ronny Lusigi', 
      company: 'IndexG Esports',
      bio: 'Founder and CEO, IndexG Esports',
      role: 'Chief Executive Officer',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/07/Ronny-Lusigi-e1689762458504.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/ronny-lusigi-2448b7100/',
        website: 'https://indexgesports.com/',
        twitter: 'href="https://twitter.com/RAyumba"'
      },
      events: ['Wednesday Gaming Tech Hub', 'Wednesday HR Connect', 'Tuesday Leadership Stage']
    },
    { 
      name: 'Max Sevostianov', 
      company: 'BetBazar',
      bio: 'Chief Operating Officer, BetBazar',
      role: 'Chief Operating Officer',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/07/Max-Sevostianov-e1689762813782.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/sevostianov/',
        website: 'https://betbazar.com/'
      },
      events: ['Wednesday Leadership Stage', 'Wednesday HR Connect', 'Tuesday Sustainability Hub']
    },
    { 
      name: 'Maha Otu', 
      company: 'Betwinner Nigeria',
      bio: 'Director, Betwinner Nigeria',
      role: 'Director',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/08/Maha.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/maha-otu/',
        website: 'https://betwinner.ng/en'
      },
      events: ['Wednesday Leadership Stage', 'Wednesday HR Connect', 'Tuesday Leadership Stage']
    },
    { 
      name: 'Rene Maimo', 
      company: 'DME Systems',
      bio: 'Head of Marketing and Business Development, DME Systems',
      role: 'Head of Marketing and Business Development',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/08/Rene.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/renemaimo/',
        website: 'http://dme.systems/'
      },
      events: ['Wednesday Leadership Stage', 'Tuesday Personal Development Hub', 'Tuesday Global Tech Hub']
    },
    { 
      name: 'Artur Harutyunyan', 
      company: 'Betfounders/Slotpes',
      bio: 'Founder and CEO, Betfounders/Slotpesa',
      role: 'Chief Executive Officer',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/08/Artur.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/artoor/',
        website: 'https://betfounders.com/',
        twitter: 'https://twitter.com/artooroff'
      },
      events: ['Tuesday Start-Up Investor Summit', 'Tuesday Personal Development Hub', 'Tuesday Sustainability Hub']
    },
    { 
      name: 'Ayofemi Panshack', 
      company: 'Shacks Evolution Studios',
      bio: 'Founder, Shacks Evolution Studios',
      role: 'Founder',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-15-at-19.12.082.jpeg',
      social: {
        linkedin: 'https://www.linkedin.com/in/ayofemi-panshack-akinlaja-268784122/',
        website: 'https://shacksevo.co/'
      },
      events: ['Tuesday Start-Up Investor Summit', 'Tuesday Personal Development Hub']
    },
    { 
      name: 'Lyubomira Lazarova', 
      company: 'Amploa',
      bio: 'Founder, Amploa',
      role: 'Founder',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/09/Lyubomira.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/lyubomira-lazarova/',
        website: 'http://amploa.com',
        twitter: 'https://twitter.com/lyubapp'
      },
      events: ['Tuesday Start-Up Investor Summit', 'Tuesday Personal Development Hub', 'Tuesday Global Tech Hub']
    },
    { 
      name: 'Uroš Nikolić', 
      company: 'Elbet',
      bio: 'Business Development Manager, Elbet',
      role: 'Business Development Manager',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/09/Uros.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/uroshnikolich/',
        website: 'https://elbet.com'
      },
      events: ['Tuesday Start-Up Investor Summit', 'Tuesday Personal Development Hub']
    },
    { 
      name: 'Danuta Janicka-Mierzwa', 
      company: 'TVBET',
      bio: 'Deputy Head of Sales, TVBET',
      role: 'Deputy Head of Sales',
      image: 'https://igamingafrika.com/wp-content/uploads/2023/10/Danka.jpg',
      social: {
        linkedin: 'https://www.linkedin.com/in/danuta-janicka-mierzwa-160535a7/',
        website: 'http://www.betcore.eu'
      },
      events: ['Tuesday Start-Up Investor Summit', 'Tuesday Personal Development Hub', 'Tuesday Sustainability Hub']
    },
  ];

  // Filter options from the design
  const filterOptions = [
    'All',
    'Tuesday Start-Up Investor Summit',
    'Wednesday Leadership Stage',
    'Wednesday HR Connect',
    'Wednesday Investment Hub',
    'Wednesday Marketing Hub',
    'Wednesday Gaming Tech Hub',
    'Tuesday Leadership Stage',
    'Tuesday Global Markets Hub',
    'Tuesday Personal Development Hub',
    'Tuesday Sustainability Hub',
    'Tuesday Global Tech Hub'
  ];

  // Filter speakers based on active filter
  const filteredSpeakers = speakers.filter(speaker => 
    activeFilter === 'All' || speaker.events.includes(activeFilter)
  );

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } }
  };

  const scaleUp = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 0.3 } }
  };
  
  const openModal = (speaker) => {
    setSelectedSpeaker(speaker);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSpeaker(null);
  };

   // Check screen size and update state
  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    // Set initial screen size
    checkScreenSize();
    
    // Add resize listener
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [checkScreenSize]);

   // Slice the filtered speakers to only show visible count
  const visibleSpeakers = filteredSpeakers.slice(0, visibleCount);

  const handleShowMore = () => {
    // Load fewer items on mobile for better performance
    setVisibleCount(prev => prev + (isMobile ? 6 : 10));
  };

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with animation */}
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-2xl sm:text-3xl lg:text-4xl text-center uppercase font-bold tracking-tight text-green-700 mb-2 sm:mb-6"
        >
          Featured speakers
        </motion.h2>
        <motion.div className="w-20 h-1 bg-green-700 mx-auto mb-6"></motion.div>

        {/* Filter tabs - Improved responsiveness */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 overflow-x-auto py-2 px-1"
        >
          {filterOptions.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(option)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                activeFilter === option
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.replace('Wednesday ', '').replace('Tuesday ', '').replace('Tuesday ', '')}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Speakers Grid with improved responsiveness */}
        <motion.div
          key={`speakers-grid-${activeFilter}`}
          initial="hidden"
          animate="visible"
          variants={container}
          className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {visibleSpeakers.map((speaker, index) => (
            <motion.div 
              key={`${speaker.name}-${index}`}
              variants={item}
              className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center hover:shadow-lg shadow-sm transition-shadow duration-300 cursor-pointer flex flex-col items-center"
              onClick={() => openModal(speaker)}
              layout
            >
              {/* Image container with responsive sizing */}
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-3 sm:mb-4 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center">
                {speaker.image ? (
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="absolute h-full w-full object-cover"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      minWidth: '100%',
                      minHeight: '100%'
                    }}
                  />
                ) : (
                  <svg 
                    className="w-12 h-12 sm:w-16 sm:h-16 text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                )}
              </div>
              
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1">{speaker.name}</h3>
              <p className="text-xs sm:text-sm font-medium text-gray-600">{speaker.company}</p>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {[...new Set(speaker.events.map(event => event.split(' ')[0]))].map((day, i) => (
                  <span key={i} className="text-xs xs:text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                    {day}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More button - only show if there are more speakers to show */}
        {visibleCount < filteredSpeakers.length && (
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row mt-12">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-800 hover:text-md border-1 border-gray-800 hover:bg-green-600 hover:border-green-600 hover:text-white rounded-lg px-4 py-2"
            >
              Show More
              <IoMdRefresh />
            </button>
          </div>
        )}

        {/* No more speakers to show message */}
        {visibleCount >= filteredSpeakers.length && filteredSpeakers.length > 0 && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12 text-sm text-gray-600">
            <p>You've reached the end of the speakers list</p>
          </div>
        )}
      </div>

      {/* Speaker Modal with improved responsiveness */}
      <motion.div 
        className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 ${isModalOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isModalOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background overlay */}
        <motion.div 
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: isModalOpen ? 0.5 : 0 }}
          onClick={closeModal}
        />
        
        {/* Modal content */}
        <motion.div 
          className="relative bg-white rounded-lg w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto shadow-xl max-h-[90vh] overflow-y-auto"
          initial="hidden"
          animate={isModalOpen ? "visible" : "hidden"}
          variants={scaleUp}
        >
          {/* Close button */}
          <motion.button
            onClick={closeModal}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 rounded-full hover:bg-gray-100 hover:cursor-pointer transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </motion.button>

          {/* Modal content with animation */}
          <motion.div 
            className="p-4 sm:p-6 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              {/* Speaker image with responsive sizing */}
              <motion.div
                className="mx-auto sm:mx-0 flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden relative"
                whileHover={{ scale: 1.05 }}
              >
                {selectedSpeaker?.image ? (
                  <img
                    src={selectedSpeaker.image}
                    alt={selectedSpeaker.name}
                    className="absolute h-full w-full object-cover"
                    style={{
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      minWidth: '100%',
                      minHeight: '100%'
                    }}
                  />
                ) : (
                  <svg 
                    className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                )}
              </motion.div>

              {/* Speaker details with responsive text */}
              <motion.div 
                className="text-center sm:text-left"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{selectedSpeaker?.name}</h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium mt-1">
                  {selectedSpeaker?.role} at {selectedSpeaker?.company}
                </p>
                
                <p className="mt-3 sm:mt-4 text-gray-600 text-xs sm:text-sm">
                  {selectedSpeaker?.bio}
                </p>
                
                {/* Social links */}
                <div className="mt-4 sm:mt-6 flex justify-center sm:justify-start space-x-3 sm:space-x-4">
                  {selectedSpeaker?.social.twitter && (
                    <motion.a
                      href={selectedSpeaker.social.twitter}
                      className="text-black text-lg sm:text-xl hover:text-blue-400 transition-colors"
                      whileHover={{ y: -2 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaTwitter />
                    </motion.a>
                  )}
                  
                  {selectedSpeaker?.social.linkedin && (
                    <motion.a
                      href={selectedSpeaker.social.linkedin}
                      className="text-black text-lg sm:text-xl hover:text-blue-600 transition-colors"
                      whileHover={{ y: -2 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaLinkedin />
                    </motion.a>
                  )}

                  {selectedSpeaker?.social.facebook && (
                    <motion.a
                      href={selectedSpeaker.social.facebook}
                      className="text-black text-lg sm:text-xl hover:text-blue-600 transition-colors"
                      whileHover={{ y: -2 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebook />
                    </motion.a>
                  )}

                  {selectedSpeaker?.social.instagram && (
                    <motion.a
                      href={selectedSpeaker.social.instagram}
                      className="text-black text-lg sm:text-xl hover:text-red-600 transition-colors"
                      whileHover={{ y: -2 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaInstagram />
                    </motion.a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Speakers;