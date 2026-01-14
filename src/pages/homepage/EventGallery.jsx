import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X, Calendar, MapPin } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import imagesData from "../../data/imagesData.json";
import Header from "../../components/Header";

const EventGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [loadedImages, setLoadedImages] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [imagesPerView, setImagesPerView] = useState(1);
  const preloadedImagesRef = useRef({});

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

  const images = imagesData;

  // Calculate how many images to show based on screen size
  useEffect(() => {
    const updateImagesPerView = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setImagesPerView(1); // Mobile: 1 image
      } else if (width < 1024) {
        setImagesPerView(2); // Tablet: 2 images
      } else {
        setImagesPerView(2); // Desktop: 3 images
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

  if (!images || images.length === 0) return null;

  return (
    <div className="xl:container xl:mx-auto  py-8 px-2 lg:px-6">
      <Header
        title="Event Gallery"
        subtitle="Explore key moments from previous iGaming Afrika Events."
      />

      {/* Event Info Card */}
      <div className="bg-white rounded-xl shadow-lg border border-green-100 p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Africa Pulse iGaming Summit
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              The premier gathering of African gaming industry leaders,
              featuring insights into market trends, regulatory updates, and
              networking opportunities with key stakeholders.
            </p>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2 text-green-700">
                <Calendar className="w-4 h-4" />
                <span className="font-medium">November 2024</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">
                  Grand Hotel Excelsior, Malta
                </span>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div
              className="text-white px-4 py-2 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#14a45c" }}
            >
              {images.length} Photos
            </div>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div
          className="relative h-80 md:h-96 lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl group bg-gradient-to-br from-green-50 to-white border-4 border-white"
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
              className="absolute inset-0 flex gap-3 md:gap-12 py-15 px-14"
            >
              {currentImages.map(({ image, index }) => (
                <motion.div
                  key={index}
                  className={`cursor-pointer relative group/image ${
                    imagesPerView === 1
                      ? "w-full"
                      : imagesPerView === 2
                      ? "w-1/2"
                      : "w-1/3"
                  }`}
                  onClick={() => openModal(index)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full rounded-xl overflow-hidden shadow-lg border-2 border-green-100">
                    <img
                      src={resizeImage(image)}
                      alt={`Event moment ${index + 1}`}
                      className={`object-cover w-full h-full transition-all duration-500 ${
                        loadedImages[index] ? "opacity-100" : "opacity-0"
                      } group-hover/image:scale-105`}
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover/image:translate-y-0 opacity-0 group-hover/image:opacity-100 transition-all duration-300">
                      <div className="bg-green-600/90 backdrop-blur-sm rounded-lg px-3 py-2">
                        <p className="text-sm font-semibold">
                          Click to view full size
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-green-600/80 backdrop-blur-sm text-white px-1 py-4 rounded-xl shadow-xl border-2 border-green-100 hover:bg-green-600/100 hover:border-green-600 transition-all duration-300 hover:scale-105"
            aria-label="Previous images"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-green-600/80 backdrop-blur-sm text-white px-1 py-4 rounded-xl shadow-xl border-2 border-green-100 hover:bg-green-600/100 hover:border-green-600 transition-all duration-300 hover:scale-105"
            aria-label="Previous images"
          >
            <ChevronRight size={22} />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
            {Math.floor(currentIndex / imagesPerView) + 1} of{" "}
            {Math.ceil(images.length / imagesPerView)}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Image Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 backdrop-blur-md"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            onClick={closeModal}
          >
            <motion.div
              className="relative max-w-6xl w-full max-h-screen"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute -top-14 right-0 bg-white/90 backdrop-blur-sm text-green-700 hover:text-white hover:bg-green-600 p-3 rounded-full shadow-xl border-2 border-green-100 z-10 transition-all duration-300 hover:scale-110"
                aria-label="Close gallery"
              >
                <X size={18} />
              </button>

              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={resizeImage(images[modalImageIndex], 1200, 800)}
                  alt={`Event gallery ${modalImageIndex + 1}`}
                  className="w-full h-full object-contain max-h-[80vh] bg-gradient-to-br from-green-50 to-white"
                />

                {/* Modal Navigation */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalNavigation("prev");
                  }}
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-green-600/80 backdrop-blur-sm text-white px-1 py-4 rounded-xl shadow-xl hover:bg-green-600/100 hover:border-green-600"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleModalNavigation("next");
                  }}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-green-600/80 backdrop-blur-sm text-white px-1 py-4 rounded-xl shadow-xl hover:bg-green-600/100 hover:border-green-600"
                  aria-label="Next image"
                >
                  <ChevronRight size={28} />
                </button>

                {/* Modal Footer */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-600 to-transparent p-6">
                  <div className="text-center">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2 inline-block shadow-lg">
                      <span className="text-green-700 font-bold text-md">
                        {modalImageIndex + 1} of {images.length}
                      </span>
                      <span className="text-gray-600 ml-2">
                        • Africa Pulse Malta
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventGallery;
