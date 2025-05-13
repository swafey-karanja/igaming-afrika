import React, { useEffect, useState } from "react";
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


  useEffect(() => {
    // Dispatch the fetchNews action to load the data (runs only once on mount)
    dispatch(fetchNews());
  }, [dispatch]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6); // Load 4 more each time
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Extract excerpt from content
  const getExcerpt = (content) => {
    // Remove HTML tags
    const text = content.replace(/<[^>]+>/g, '');
    // Return first 150 characters
    return text.length > 150 ? text.substring(0, 150) + '...' : text;
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

  return (
    <div className="py-16 bg-gray-100 sm:py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight uppercase text-center text-gray-700 sm:text-4xl mb-12">
          News & Blogs
        </h2>
        {/* news Grid with simple scroll animation */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.slice(0, visibleCount).map((article, index) => (
            <motion.div
              key={article.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={getFeaturedImage(article)}
                  alt={article.title.rendered}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-500">
                    {formatDate(article.date)}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-600 mb-3">
                  {article.title.rendered}
                </h3>

                <p className="text-gray-600 text-sm mb-4">
                  {getExcerpt(article.excerpt.rendered)}
                </p>

                <a
                  href={article.link}
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('read_more')}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
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
        <div className="flex flex-col items-center justify-center gap-8 sm:flex-row mt-12">
          <button
            onClick={handleShowMore}
            className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-800 hover:text-md border-1 border-gray-800 hover:bg-green-600 hover:border-green-600 hover:text-white rounded-lg px-4 py-2"
          >
            Show More
            <IoMdRefresh />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalNews;