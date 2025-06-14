import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchImages } from "../store/imageSlice";

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -1000 : 1000,
    opacity: 0,
  }),
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const resizeImage = (url, width = 500, height = 400) => {
  return url.replace("/upload/", `/upload/w_${width},h_${height},c_fill/`);
};

const ImageCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(1);
  const preloadedImagesRef = useRef({});

  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.images);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  // Calculate how many images to show based on screen size
  useEffect(() => {
    const updateImagesPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setImagesPerView(1); // Mobile: 1 image
      } else if (width < 1024) {
        setImagesPerView(2); // Tablet: 2 images
      } else {
        setImagesPerView(3); // Desktop: 3 images
      }
    };

    updateImagesPerView();
    window.addEventListener("resize", updateImagesPerView);

    return () => window.removeEventListener("resize", updateImagesPerView);
  }, []);

  // Preload current set of visible images and adjacent images
  useEffect(() => {
    if (!images || images.length === 0) return;

    // Function to preload an image
    const preloadImage = (index) => {
      if (
        index < 0 ||
        index >= images.length ||
        preloadedImagesRef.current[index]
      )
        return;

      const img = new Image();
      img.src = resizeImage(images[index]);
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
        preloadedImagesRef.current[index] = true;
      };
    };

    // Preload current and next set of images
    for (let i = 0; i < imagesPerView * 2; i++) {
      const indexToLoad = (currentIndex + i) % images.length;
      preloadImage(indexToLoad);
    }
  }, [currentIndex, images, imagesPerView]);

  // Initial preload of first few images
  useEffect(() => {
    if (!images || images.length === 0) return;

    // Preload first set of images
    const imagesToPreload = Math.min(imagesPerView * 2, images.length);
    for (let i = 0; i < imagesToPreload; i++) {
      const img = new Image();
      img.src = resizeImage(images[i]);
      img.onload = () => {
        setLoadedImages((prev) => ({ ...prev, [i]: true }));
        preloadedImagesRef.current[i] = true;
      };
    }
  }, [images, imagesPerView]);

  const nextSlide = useCallback(() => {
    if (!images || images.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + imagesPerView) % images.length);
  }, [images, imagesPerView]);

  const prevSlide = useCallback(() => {
    if (!images || images.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => {
      const newIndex = prev - imagesPerView;
      return newIndex < 0
        ? Math.max(0, images.length - (Math.abs(newIndex) % images.length))
        : newIndex;
    });
  }, [images, imagesPerView]);

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  const handleModalNavigation = (direction) => {
    if (direction === "next") {
      setModalImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  // Get the current set of images to display
  const currentImages = useMemo(() => {
    if (!images || images.length === 0) return [];

    const result = [];
    for (let i = 0; i < imagesPerView; i++) {
      const index = (currentIndex + i) % images.length;
      result.push({ image: images[index], index });
    }
    return result;
  }, [currentIndex, images, imagesPerView]);

  const handleTouchStart = useCallback(
    (e) => setTouchStart(e.targetTouches[0].clientX),
    []
  );
  const handleTouchMove = useCallback(
    (e) => setTouchEnd(e.targetTouches[0].clientX),
    []
  );
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
    <div className="bg-gray-100 max-h-screen flex items-center justify-center py-8 md:py-8 lg:py-8 px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Past Events
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
            Explore Images from past iGaming events
          </p>
        </motion.div>

        <p className="mt-2 mb-2 text-xl text-gray-900 font-semibold">
          Africa Pulse workshop - Malta
        </p>
        <p className="mb-6 text-sm tracking-tight text-gray-900">
          The Africa Pulse is a regional economic update published by the World
          Bank. It provides insights into economic trends, growth projections,
          and challenges in Sub-Saharan Africa. The last event took place in
          November, 2024 at Grand Hotel Excelsior, Castille room (level 7) in
          Malta.
        </p>

        <div
          className="relative h-64 md:h-100 overflow-hidden rounded-lg shadow-md group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={`${currentIndex}-${imagesPerView}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.5 },
              }}
              className="absolute inset-0 flex gap-2 md:gap-4"
            >
              {currentImages.map(({ image, index }) => (
                <div
                  key={index}
                  className={`cursor-pointer ${
                    imagesPerView === 1
                      ? "w-full"
                      : imagesPerView === 2
                      ? "w-1/2"
                      : "w-1/3"
                  }`}
                  onClick={() => openModal(index)}
                >
                  <img
                    src={resizeImage(image)}
                    alt={`Image ${index + 1}`}
                    className={`object-cover w-full h-full rounded-md transition-opacity duration-500 ${
                      loadedImages[index] ? "opacity-100" : "opacity-0"
                    }`}
                    loading="eager"
                  />
                </div>
              ))}
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
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xs bg-transparent transition-all bg-opacity-30"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-5xl w-full max-h-screen"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute -top-10 right-0 text-gray-500 hover:text-gray-800 z-10 cursor-pointer bg-green-300"
                aria-label="Close modal"
              >
                <X size={28} />
              </button>

              <div className="relative h-full">
                <img
                  src={resizeImage(images[modalImageIndex], 1200, 800)}
                  alt={`Modal view ${modalImageIndex + 1}`}
                  className="w-full h-full object-contain max-h-[80vh]"
                />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalNavigation("prev");
                  }}
                  className="cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={25} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalNavigation("next");
                  }}
                  className="cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 bg-green-500 hover:bg-green-700 bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                  aria-label="Next image"
                >
                  <ChevronRight size={25} />
                </button>
              </div>

              <div className="text-center mt-4 text-green-500">
                Image {modalImageIndex + 1} of {images.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageCarousel;
