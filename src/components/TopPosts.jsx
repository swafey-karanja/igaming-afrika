// TopPosts.jsx (updated component)
import React from "react";

const TopPosts = ({ variant = "default" }) => {
  // Original data
  const originalArticles = [
    {
      id: 1,
      title: "How to write content about your photographs",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Sit quis auctor odio arcu et dolor.",
      category: "Growth",
      date: "April 09, 2022",
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-1.png",
    },
    {
      id: 2,
      title: "How to write content about your photographs",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Sit quis auctor odio arcu et dolor.",
      category: "Growth",
      date: "April 09, 2022",
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-2.png",
    },
    {
      id: 3,
      title: "How to write content about your photographs",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Sit quis auctor odio arcu et dolor.",
      category: "Growth",
      date: "April 09, 2022",
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-3.png",
    },
    {
      id: 4,
      title: "How to write content about your photographs",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Sit quis auctor odio arcu et dolor.",
      category: "Growth",
      date: "April 09, 2022",
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-1.png",
    },
    {
      id: 5,
      title: "How to write content about your photographs",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Sit quis auctor odio arcu et dolor.",
      category: "Growth",
      date: "April 09, 2022",
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-2.png",
    },
    {
      id: 6,
      title: "How to write content about your photographs",
      description:
        "Lorem ipsum dolor sit amet, consec tetur adipi scing elit. Sit quis auctor odio arcu et dolor.",
      category: "Growth",
      date: "April 09, 2022",
      image:
        "https://landingfoliocom.imgix.net/store/collection/clarity-blog/images/hero/6/thumbnail-3.png",
    },
  ];

  // Editor's Choice data
  const editorsChoiceArticles = [
    {
      id: 7,
      title:
        "Guardian Angels of the Game – Empowering Responsible Gaming in Africa",
      author: "Tinya Ok",
      role: "CEO, GAMBLE ALERT",
      category: "Responsible Gambling",
      date: "October 1, 2024",
      excerpt:
        "Join us on a journey into the world of responsible gambling advocacy as we sit down with Fisayo Oke, Member...",
      image:
        "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 8,
      title:
        "The Rise of Esports and iGaming in Africa: Insights from SBEA• 2024",
      location: "Kampala, Uganda",
      category: "Gambling Events",
      date: "August 20, 2024",
      excerpt:
        "The Sports Betting East Africa+ (SBEA+) 2024 conference emerged as a critical touchpoint for industry.",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 9,
      title:
        "The Rise of Esports and iGaming in Africa: Insights from SBEA• 2024",
      location: "Kampala, Uganda",
      category: "Gambling Events",
      date: "August 20, 2024",
      excerpt:
        "The Sports Betting East Africa+ (SBEA+) 2024 conference emerged as a critical touchpoint for industry.",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 10,
      title:
        "The Rise of Esports and iGaming in Africa: Insights from SBEA• 2024",
      location: "Kampala, Uganda",
      category: "Gambling Events",
      date: "August 20, 2024",
      excerpt:
        "The Sports Betting East Africa+ (SBEA+) 2024 conference emerged as a critical touchpoint for industry.",
      image:
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const articles =
    variant === "editors-choice" ? editorsChoiceArticles : originalArticles;

  return (
    <div
      className={`py-16 bg-white sm:py-24 ${
        variant === "editors-choice" ? "bg-gray-50" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
            {variant === "editors-choice" ? "Editor's Choice" : "Top Posts"}
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-green-600 hover:text-green-800"
          >
            View all
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex overflow-hidden bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-1/3">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-2/3 p-6">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-green-600">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500">{article.date}</span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h3>

                {article.location && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{article.location}</span>
                  </p>
                )}

                {article.author && (
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">{article.author}</span>
                    {article.role && <>, {article.role}</>}
                  </p>
                )}

                <p className="text-gray-600 mb-4 text-sm">
                  {article.description || article.excerpt}
                </p>

                <a
                  href="#"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Read More
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPosts;
