import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const images = [
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036197/Igaming_Malta_Workshop_22_olucjp.png',
  'https://primefaces.org/cdn/primereact/images/galleria/galleria15.jpg',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036195/Igaming_Malta_Workshop_11_vzcp05.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036192/Igaming_Malta_Workshop_19_jvojsr.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036192/Igaming_Malta_Workshop_6_xqrw4c.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036192/Igaming_Malta_Workshop_17_zzxnaw.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036191/Igaming_Malta_Workshop_16_iogyc9.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036190/Igaming_Malta_Workshop_5_ra7ub0.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036189/Igaming_Malta_Workshop_14_flgbfx.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036188/Igaming_Malta_Workshop_10_ag3gbc.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036188/Igaming_Malta_Workshop_24_bofciq.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036187/Igaming_Malta_Workshop_9_yelhoa.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036185/Igaming_Malta_Workshop_4_kpxn3q.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036185/Igaming_Malta_Workshop_8_btkuwy.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036183/Igaming_Malta_Workshop_13_jeiz6x.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036182/Igaming_Malta_Workshop_18_hnqggl.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036181/Igaming_Malta_Workshop_15_byyzeh.png',
  'https://res.cloudinary.com/dpuolfyum/image/upload/v1747036181/Igaming_Malta_Workshop_7_xoqark.png'
];

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } }
};

const slideVariants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    };
  },
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      x: direction > 0 ? -1000 : 1000,
      opacity: 0
    };
  }
};

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for forward, -1 for backward
  const [visibleThumbnails, setVisibleThumbnails] = useState(7); // Default number of thumbnails visible

  useEffect(() => {
    // Function to update visible thumbnails based on screen width
    const updateVisibleThumbnails = () => {
      if (window.innerWidth < 640) {
        setVisibleThumbnails(3);
      } else if (window.innerWidth < 768) {
        setVisibleThumbnails(5);
      } else if (window.innerWidth < 1024) {
        setVisibleThumbnails(7);
      } else {
        setVisibleThumbnails(9);
      }
    };

    // Initialize on mount
    updateVisibleThumbnails();

    // Add event listener for window resize
    window.addEventListener('resize', updateVisibleThumbnails);

    // Clean up event listener
    return () => {
      window.removeEventListener('resize', updateVisibleThumbnails);
    };
  }, []);

  // Calculate which thumbnails to show (centered around current)
  // eslint-disable-next-line no-unused-vars
  const getVisibleThumbnails = () => {
    const halfVisible = Math.floor(visibleThumbnails / 2);
    let start = current - halfVisible;
    let end = current + halfVisible + (visibleThumbnails % 2 === 0 ? 0 : 1);

    // Handle edge cases
    if (start < 0) {
      end = Math.min(visibleThumbnails, images.length);
      start = 0;
    } else if (end > images.length) {
      start = Math.max(0, images.length - visibleThumbnails);
      end = images.length;
    }

    return images.slice(start, end);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((current - 1 + images.length) % images.length);
  };

  // Handle touch events for swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50; // Minimum swipe distance

    if (isSwipe) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="bg-gray-100 max-h-screen flex items-center justify-center pb-12 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-2xl sm:text-3xl text-center uppercase font-bold tracking-tight text-gray-700 md:text-4xl mb-4 sm:mb-8"
        >
          PAST EVENTS
        </motion.h2>

        {/* Main Image with hover group */}
        <div 
          className="relative aspect-video overflow-hidden rounded-lg shadow-md group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 }
              }}
              className="absolute inset-0"
            >
              <img
                src={images[current]}
                alt={`Slide ${current}`}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons - more visible on mobile, same behavior on desktop */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-20 sm:bg-opacity-10 text-green-700 p-1 sm:p-2 rounded-lg cursor-pointer hover:bg-opacity-75 hover:bg-green-700 hover:text-white opacity-50 sm:opacity-0 group-hover:opacity-75 transition-opacity duration-500"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white bg-opacity-20 sm:bg-opacity-10 text-green-700 cursor-pointer p-1 sm:p-2 rounded-lg hover:bg-opacity-75 hover:bg-green-700 hover:text-white opacity-50 sm:opacity-0 group-hover:opacity-75 transition-opacity duration-500"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Thumbnail Strip - Scrollable container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="relative mt-2 sm:mt-4"
        >
          <div 
            className="flex items-center gap-1 sm:gap-2 md:gap-3 overflow-x-auto py-2 px-1 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, idx) => (
              <motion.button
                key={idx}
                data-index={idx}
                onClick={() => {
                  setDirection(idx > current ? 1 : -1);
                  setCurrent(idx);
                }}
                className={`border-2 ${idx === current ? 'border-white' : 'border-transparent'} rounded-md overflow-hidden h-10 sm:h-12 md:h-14 cursor-pointer flex-shrink-0`}
                style={{ width: `${idx === current ? '5rem' : '4rem'}` }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className="object-cover w-full h-full"
                />
              </motion.button>
            ))}
          </div>
          
          {/* Indicator for more thumbnails */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Current image indicator */}
        <div className="flex justify-center mt-2">
          <span className="text-xs sm:text-sm text-gray-500">
            {current + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;