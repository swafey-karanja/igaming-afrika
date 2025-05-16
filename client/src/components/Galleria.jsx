import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux';
import { fetchImages } from '../store/imageSlice';

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0
  })
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } }
};

const resizeImage = (url, width = 1280, height = 720) => {
  return url.replace('/upload/', `/upload/w_${width},h_${height},c_fill/`);
};

const ImageCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState(7);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const preloadedImagesRef = useRef({});

  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  useEffect(() => {
    const updateVisibleThumbnails = () => {
      const width = window.innerWidth;
      setVisibleThumbnails(width < 640 ? 3 : width < 768 ? 5 : width < 1024 ? 7 : 9);
    };
    updateVisibleThumbnails();
    window.addEventListener('resize', updateVisibleThumbnails);
    return () => window.removeEventListener('resize', updateVisibleThumbnails);
  }, []);

  // Preload current image and adjacent images
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    // Function to preload an image
    const preloadImage = (index) => {
      if (index < 0 || index >= images.length || preloadedImagesRef.current[index]) return;
      
      const img = new Image();
      img.src = resizeImage(images[index]);
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [index]: true }));
        preloadedImagesRef.current[index] = true;
      };
    };

    // Preload current and adjacent images
    preloadImage(current);
    preloadImage((current + 1) % images.length);
    preloadImage((current - 1 + images.length) % images.length);
  }, [current, images]);

  // Initial preload of first few images
  useEffect(() => {
    if (!images || images.length === 0) return;
    
    // Preload first 3 images or all if less than 3
    const imagesToPreload = Math.min(3, images.length);
    for (let i = 0; i < imagesToPreload; i++) {
      const img = new Image();
      img.src = resizeImage(images[i]);
      img.onload = () => {
        setLoadedImages(prev => ({ ...prev, [i]: true }));
        preloadedImagesRef.current[i] = true;
      };
    }
  }, [images]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent(prev => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent(prev => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const visibleThumbnailRange = useMemo(() => {
    const halfVisible = Math.floor(visibleThumbnails / 2);
    let start = current - halfVisible;
    let end = current + halfVisible + (visibleThumbnails % 2 === 0 ? 0 : 1);
    if (start < 0) {
      end = Math.min(visibleThumbnails, images.length);
      start = 0;
    } else if (end > images.length) {
      start = Math.max(0, images.length - visibleThumbnails);
      end = images.length;
    }
    return { start, end };
  }, [current, visibleThumbnails, images.length]);

  const handleTouchStart = useCallback((e) => setTouchStart(e.targetTouches[0].clientX), []);
  const handleTouchMove = useCallback((e) => setTouchEnd(e.targetTouches[0].clientX), []);
  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > 50;
    if (isSwipe) distance > 0 ? nextSlide() : prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, nextSlide, prevSlide]);

  if (loading) return <p>Loading images...</p>;
  if (error) return <p>Error loading images: {error}</p>;
  if (!images || images.length === 0) return null;

  return (
    <div className="bg-gray-100 max-h-screen flex items-center justify-center pb-12 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-5xl">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
          className="text-2xl sm:text-3xl text-center uppercase font-bold tracking-tight text-green-700 md:text-4xl mb-4 sm:mb-8"
        >
          PAST EVENTS
        </motion.h2>

        <p className="mt-2 mb-2 text-xl text-gray-900 font-semibold">Africa Pulse workshop - Malta</p>
        <p className="mb-4 text-sm tracking-tight text-gray-900">
          The Africa Pulse is a regional economic update published by the World Bank.
          It provides insights into economic trends, growth projections, and challenges
          in Sub-Saharan Africa. The last event took place in November, 2024 at Grand
          Hotel Excelsior, Castille room (level 7) in Malta.
        </p>

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
                src={resizeImage(images[current])}
                width="1280"
                height="720"
                alt={`Slide ${current}`}
                className={`object-cover w-full h-full transition-opacity duration-500 ${loadedImages[current] ? 'opacity-100' : 'opacity-0'}`}
                loading="eager"
              />
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-20 sm:bg-opacity-10 text-green-700 p-1 sm:p-2 rounded-lg cursor-pointer hover:bg-opacity-75 hover:bg-green-700 hover:text-white opacity-50 sm:opacity-0 group-hover:opacity-75 transition-opacity duration-500"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-white bg-opacity-20 sm:bg-opacity-10 text-green-700 p-1 sm:p-2 rounded-lg cursor-pointer hover:bg-opacity-75 hover:bg-green-700 hover:text-white opacity-50 sm:opacity-0 group-hover:opacity-75 transition-opacity duration-500"
            aria-label="Next image"
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
          </button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeIn}
          className="relative mt-2 sm:mt-4"
        >
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 overflow-x-auto py-2 px-1 scrollbar-hide">
            {images.slice(visibleThumbnailRange.start, visibleThumbnailRange.end).map((img, idx) => {
              const absoluteIdx = visibleThumbnailRange.start + idx;
              return (
                <button
                  key={absoluteIdx}
                  onClick={() => {
                    setDirection(absoluteIdx > current ? 1 : -1);
                    setCurrent(absoluteIdx);
                  }}
                  className={`border-2 ${absoluteIdx === current ? 'border-white' : 'border-transparent'} rounded-md overflow-hidden h-10 sm:h-12 md:h-14 cursor-pointer flex-shrink-0`}
                  style={{ width: `${absoluteIdx === current ? '5rem' : '4rem'}` }}
                >
                  <img
                    src={resizeImage(img, 200, 120)}
                    alt={`Thumbnail ${absoluteIdx}`}
                    className="object-cover w-full h-full"
                    width="200"
                    height="120"
                    loading="lazy"
                  />
                </button>
              );
            })}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-gray-100 to-transparent pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-gray-100 to-transparent pointer-events-none" />
        </motion.div>

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