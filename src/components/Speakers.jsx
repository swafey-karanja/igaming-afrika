import React, { useState } from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Speakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  // Add event categories to each speaker
  const speakers = [
    { 
      name: 'Victor Alade', 
      company: 'Raenest',
      bio: 'Co-founder and CTO of Raenest with 10+ years experience in fintech solutions.',
      role: 'Chief Technology Officer',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#',
        website: '#'
      },
      events: ['Tuesday Start-Up Investor Summit', 'Wednesday Leadership Stage']
    },
    { 
      name: 'Richard Oyome', 
      company: 'Raenest',
      bio: 'Product lead at Raenest specializing in user experience and interface design.',
      role: 'Product Manager',
      image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#'
      },
      events: ['Wednesday HR Connect', 'Thursday Leadership Stage']
    },
    { 
      name: 'Angela Mensah', 
      company: 'Flutterwave',
      bio: 'Lead Software Engineer at Flutterwave focusing on scalable payment infrastructure.',
      role: 'Lead Software Engineer',
      image: 'https://plus.unsplash.com/premium_photo-1690587673708-d6ba8a1579a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTd8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#',
        website: '#'
      },
      events: ['Wednesday Investment Hub', 'Thursday Global Tech Hub']
    },
    { 
      name: 'Samuel Okoro', 
      company: 'Paystack',
      bio: 'Community advocate and developer evangelist at Paystack.',
      role: 'Developer Evangelist',
      image: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#'
      },
      events: ['Wednesday Marketing Hub', 'Thursday Personal Development Hub']
    },
    { 
      name: 'Lilian Mwangi', 
      company: 'Andela',
      bio: 'Engineering Manager at Andela with a passion for mentoring and scalable systems.',
      role: 'Engineering Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#',
        website: '#'
      },
      events: ['Wednesday Gaming Tech Hub', 'Thursday Global Markets Hub']
    },
    { 
      name: 'Ahmed Bello', 
      company: 'Chipper Cash',
      bio: 'Cybersecurity expert and head of fraud detection at Chipper Cash.',
      role: 'Head of Cybersecurity',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#'
      },
      events: ['Wednesday Leadership Stage', 'Thursday Sustainability Hub']
    },
    { 
      name: 'Grace Achieng', 
      company: 'SafeBoda',
      bio: 'UX Researcher at SafeBoda helping shape user-centered design for transportation.',
      role: 'UX Researcher',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#',
        website: '#'
      },
      events: ['Tuesday Start-Up Investor Summit', 'Wednesday HR Connect']
    },
    { 
      name: 'Emeka Obi', 
      company: 'Kuda Bank',
      bio: 'Head of Mobile Engineering at Kuda, leading efforts in app performance and growth.',
      role: 'Head of Mobile Engineering',
      image: '',
      social: {
        twitter: '#',
        linkedin: '#'
      },
      events: ['Wednesday Investment Hub', 'Thursday Leadership Stage']
    },
    { 
      name: 'Fatima Diallo', 
      company: 'MFS Africa',
      bio: 'Financial inclusion advocate and regional partnerships manager at MFS Africa.',
      role: 'Partnerships Manager',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww',
      social: {
        twitter: '#',
        linkedin: '#',
        website: '#'
      },
      events: ['Wednesday Marketing Hub', 'Thursday Global Markets Hub']
    },
    { 
      name: 'John Kariuki', 
      company: 'Twiga Foods',
      bio: 'Tech Lead at Twiga Foods, building supply chain platforms for agriculture.',
      role: 'Technical Lead',
      image: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfHwwfHx8MA%3D%3D',
      social: {
        twitter: '#',
        linkedin: '#'
      },
      events: ['Wednesday Gaming Tech Hub', 'Thursday Personal Development Hub']
    }
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
    'Thursday Leadership Stage',
    'Thursday Global Markets Hub',
    'Thursday Personal Development Hub',
    'Thursday Sustainability Hub',
    'Thursday Global Tech Hub'
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

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with animation */}
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-2xl sm:text-3xl lg:text-4xl text-center uppercase font-bold tracking-tight text-gray-700 mb-6 sm:mb-10"
        >
          Featured speakers
        </motion.h2>

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
              {option.replace('Wednesday ', '').replace('Thursday ', '').replace('Tuesday ', '')}
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
          {filteredSpeakers.map((speaker, index) => (
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
                {speaker.events.map((event, i) => (
                  <span key={i} className="text-xs xs:text-xs px-2 py-0.5 bg-gray-200 rounded-full">
                    {event.split(' ')[0]}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Show More button with responsive sizing */}
        {/* <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-8 sm:mt-12"
        > */}
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row mt-12">
            <button
              className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-800 hover:text-md border-1 border-gray-800 hover:bg-green-600 hover:border-green-600 hover:text-white rounded-lg px-4 py-2"
            >
              Show More
              <IoMdRefresh />
            </button>
          </div>
        {/* </motion.div> */}
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
                    >
                      <FaTwitter />
                    </motion.a>
                  )}
                  
                  {selectedSpeaker?.social.linkedin && (
                    <motion.a
                      href={selectedSpeaker.social.linkedin}
                      className="text-black text-lg sm:text-xl hover:text-blue-600 transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      <FaLinkedin />
                    </motion.a>
                  )}

                  {selectedSpeaker?.social.facebook && (
                    <motion.a
                      href={selectedSpeaker.social.facebook}
                      className="text-black text-lg sm:text-xl hover:text-blue-600 transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      <FaFacebook />
                    </motion.a>
                  )}

                  {selectedSpeaker?.social.instagram && (
                    <motion.a
                      href={selectedSpeaker.social.instagram}
                      className="text-black text-lg sm:text-xl hover:text-red-600 transition-colors"
                      whileHover={{ y: -2 }}
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