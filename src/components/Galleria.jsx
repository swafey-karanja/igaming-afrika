import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const images = [
  'https://primefaces.org/cdn/primereact/images/galleria/galleria14.jpg',
  'https://primefaces.org/cdn/primereact/images/galleria/galleria15.jpg',
  'https://primefaces.org/cdn/primereact/images/galleria/galleria12.jpg',
  'https://primefaces.org/cdn/primereact/images/galleria/galleria11.jpg',
  'https://primefaces.org/cdn/primereact/images/galleria/galleria10.jpg'
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

  const nextSlide = () => {
    setDirection(1);
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((current - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-5xl">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-3xl text-center uppercase font-bold tracking-tight text-gray-700 sm:text-4xl mb-12"
        >
          PAST EVENTS
        </motion.h2>

        {/* Main Image with hover group */}
        <div className="relative aspect-video overflow-hidden rounded-lg shadow-md group">
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

          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-10 text-green-700 p-2 rounded-lg cursor-pointer hover:bg-opacity-75 hover:bg-green-700 hover:text-white opacity-0 group-hover:opacity-75 transition-opacity duration-500"
          >
            <ChevronLeft size={30} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-10 text-green-700 cursor-pointer p-2 rounded-lg hover:bg-opacity-75 hover:bg-green-700 hover:text-white opacity-0 group-hover:opacity-75 transition-opacity duration-500"
          >
            <ChevronRight size={30} />
          </button>
        </div>

        {/* Thumbnail Strip */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="flex items-center justify-center gap-3 mt-4 overflow-x-auto px-2"
        >
          {images.map((img, idx) => (
            <motion.button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1);
                setCurrent(idx);
              }}
              className={`border-2 ${idx === current ? 'border-white' : 'border-transparent'} rounded-md overflow-hidden w-20 h-14 cursor-pointer flex-shrink-0`}
            >
              <img
                src={img}
                alt={`Thumbnail ${idx}`}
                className="object-cover w-full h-full"
              />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ImageCarousel;