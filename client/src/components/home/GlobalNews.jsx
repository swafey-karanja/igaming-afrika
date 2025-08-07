import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../store/newsSlice";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { IoMdRefresh, IoMdTime } from "react-icons/io";

const GlobalNews = () => {
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size and update state
  const checkScreenSize = useCallback(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? 3 : 10));
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Extract excerpt from content
  const getExcerpt = (content) => {
    const text = content.replace(/<[^>]+>/g, "");
    const limit = isMobile ? 80 : 120;
    return text.length > limit ? text.substring(0, limit) + "..." : text;
  };

  // Get featured image URL
  const getFeaturedImage = (post) => {
    if (post.link && post.yoast_head_json?.og_image?.[0]?.url) {
      return post.yoast_head_json.og_image[0].url;
    }
    return "https://via.placeholder.com/400x250/f3f4f6/6b7280?text=News";
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="w-12 h-12 border-4 border-green-100 rounded-full"></div>
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <p className="mt-4 text-gray-500 font-medium">
            Loading latest news...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <motion.div
          className="text-center p-8 max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <IoMdRefresh className="w-8 h-8 text-red-500" />
          </div>
          <p className="text-gray-700 mb-6">Unable to load news</p>
          <motion.button
            onClick={() => dispatch(fetchNews())}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-600 transition-colors duration-200 font-medium"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={headerVariants}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              News & Blogs
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
            Catch up on the latest news and events from the world of gaming.
          </p>
        </motion.div>

        {/* News Grid */}
        <motion.div
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          key={`news-grid-${visibleCount}`} // Add this key
          initial="hidden"
          animate="visible" // Changed from whileInView to animate
          variants={containerVariants}
        >
          {news.slice(0, visibleCount).map((article) => (
            <motion.article
              key={article.id}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group cursor-pointer h-full"
              onClick={() =>
                window.open(article.link, "_blank", "noopener,noreferrer")
              }
            >
              <div className="overflow-hidden rounded-xl bg-white border-2 border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={getFeaturedImage(article)}
                    alt={article.title.rendered}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Date */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <IoMdTime className="w-4 h-4 mr-1" />
                    {formatDate(article.date)}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-tight transition-colors duration-200 flex-1">
                    {article.title.rendered}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {getExcerpt(article.excerpt.rendered)}
                  </p>

                  {/* Read More Link */}
                  <motion.div
                    className="inline-flex items-center text-green-600 hover:text-green-600 font-medium text-sm group/link mt-auto"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    Read article
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4 ml-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < news.length && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.button
              onClick={handleShowMore}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full hover:bg-green-600 transition-all duration-200 font-medium shadow-sm hover:shadow-md"
            >
              Load More Stories
              <IoMdRefresh />
            </motion.button>
          </motion.div>
        )}

        {/* End Message */}
        {visibleCount >= news.length && news.length > 0 && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center text-gray-500">
              <div className="w-8 h-px bg-gray-300 mr-3"></div>
              <span className="text-sm font-medium">You're all caught up</span>
              <div className="w-8 h-px bg-gray-300 ml-3"></div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GlobalNews;
