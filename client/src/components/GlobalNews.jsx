import React, { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/newsSlice";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { IoMdRefresh } from "react-icons/io";

const GlobalNews = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { news, loading, error } = useSelector((state) => state.news);
  const [visibleCount, setVisibleCount] = useState(6);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    // Dispatch the fetchNews action to load the data (runs only once on mount)
    dispatch(fetchNews());
  }, [dispatch]);

  const handleShowMore = () => {
    // Load fewer items on mobile for better performance
    setVisibleCount((prev) => prev + (isMobile ? 3 : 6));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract excerpt from content with flexible length based on screen size
  const getExcerpt = (content) => {
    // Remove HTML tags
    const text = content.replace(/<[^>]+>/g, '');
    // Return first 100 characters on mobile, 150 on larger screens
    const limit = isMobile ? 100 : 150;
    return text.length > limit ? text.substring(0, limit) + '...' : text;
  };

 // Get featured image URL
  const getFeaturedImage = (post) => {
    // console.log(post, "post")
    if (post.link) {
      // console.log(post.yoast_head_json.og_image[0].url, "image")
      return post.yoast_head_json.og_image[0].url;
    }
    return 'https://via.placeholder.com/400x300'; // Fallback image
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 border-4 border-t-green-600 border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center p-6 rounded-lg bg-red-50 max-w-md">
          <p className="text-red-600 font-medium">Error: {error}</p>
          <button 
            onClick={() => dispatch(fetchNews())}
            className="mt-4 inline-flex items-center gap-x-1 text-sm font-semibold text-gray-800 hover:text-white bg-white hover:bg-green-600 rounded-lg px-4 py-2 shadow-sm"
          >
            <IoMdRefresh className="h-5 w-5" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 bg-gray-100 sm:py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl text-center uppercase font-bold tracking-tight text-green-700 lg:text-4xl mb-4 sm:mb-6 md:mb-8">
          News & Blogs
        </h2>
        
        {/* news Grid with responsive column counts */}
        <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, visibleCount).map((article, index) => (
            <motion.div
              key={article.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={getFeaturedImage(article)}
                  alt={article.title.rendered}
                  className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  loading="lazy" // Add lazy loading for better performance
                />
              </div>
              <div className="p-3 sm:p-4 md:p-6">
                <div className="flex items-center mb-2 sm:mb-3">
                  <span className="text-xs text-gray-500">
                    {formatDate(article.date)}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-gray-600 mb-2 sm:mb-3 line-clamp-2">
                  {article.title.rendered}
                </h3>

                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                  {getExcerpt(article.excerpt.rendered)}
                </p>

                <a
                  href={article.link}
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-xs sm:text-sm"
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read more about ${article.title.rendered}`}
                >
                  {t('read_more')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 sm:h-4 sm:w-4 ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Improved "Show More" button */}
        {visibleCount < news.length && (
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
        
        {/* No more news to show message */}
        {visibleCount >= news.length && news.length > 0 && (
          <div className="text-center mt-8 sm:mt-10 md:mt-12 text-sm text-gray-600">
            <p>You've reached the end of the news feed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GlobalNews;

/* Add this CSS to your stylesheets for line clamping */
const style = document.createElement('style');
style.textContent = `
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
document.head.appendChild(style);