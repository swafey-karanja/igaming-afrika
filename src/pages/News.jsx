// components/GamingNews.jsx
import { useEffect } from "react";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../store/newsSlice.js";
import Breadcrumb from "../components/BreadCrumb.jsx"

const News = () => {
  const dispatch = useDispatch();
  const { news, loading } = useSelector((state) => state.news);

  // Fetch news data when component mounts
  useEffect(() => {
    if (news.length === 0) {
      dispatch(fetchNews());
    }
  }, [dispatch, news.length]);

  const displayLimit = 12;

  const skeletons = Array(displayLimit)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-2xl shadow-md overflow-hidden flex animate-pulse"
      >
        <div className="w-40 h-full bg-gray-300" />
        <div className="p-6 flex flex-col justify-between w-full">
          <div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-5/6 mb-1" />
            <div className="h-3 bg-gray-200 rounded w-2/3" />
          </div>
          <div className="mt-4 flex gap-2 items-center">
            <div className="h-3 bg-gray-200 rounded w-12" />
            <div className="h-3 bg-gray-200 rounded w-2" />
            <div className="h-3 bg-gray-200 rounded w-20" />
            <div className="ml-auto h-3 bg-gray-200 rounded w-6" />
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-24 px-4 sm:px-6 lg:px-8 h-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gray-100">
          <Breadcrumb />
            <h2 className="text-4xl font-semibold text-gray-800 mb-2">
              Read Latest Articles & News
            </h2>
            <hr />
            <p className="text-gray-600">
              {" "}
              Discover the latest free game giveaways and news from the gaming
              world.
            </p>
          </div>

          <div
            className={`mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Conditional rendering: Show skeletons if loading, else show news */}
            {loading
              ? skeletons
              : news.slice(0, displayLimit).map((article) => (
                  <div
                    key={article.id}
                    className="bg-white rounded-2xl shadow-md overflow-hidden flex"
                  >
                    <img
                      className="w-40 h-full object-cover"
                      src={article.thumbnail}
                      alt={article.title}
                    />
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {article.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                      <div className="mt-4 text-sm text-gray-500 flex items-center gap-2">
                        <span>{article.type}</span>
                        <span>•</span>
                        <span>
                          {new Date(
                            article.published_date
                          ).toLocaleDateString()}
                        </span>
                        <a
                          href={article.open_giveaway_url}
                          className="ml-auto text-blue-500 hover:underline"
                          target="_blank"
                          rel="noreferrer"
                        >
                          ↗
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
