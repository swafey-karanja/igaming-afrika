import React from "react";

const TopGameReviews = () => {
  const articles = [
    {
      id: 1,
      title: "How to write content about your photographs",
      description:
        "Learn techniques for creating compelling descriptions of your photographic work.",
      category: "Photography",
      date: "April 09, 2022",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title: "About your photographs",
      description:
        "Understanding the story behind your images and how to present them.",
      category: "Composition",
      date: "April 09, 2022",
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title: "How to write content about your photographs",
      description: "Advanced techniques for pairing text with your visual art.",
      category: "Content",
      date: "April 09, 2022",
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
    },
  ];

  return (
    <div className="overflow-x-hidden bg-gray-100 pt-4 pb-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
          <h2 className="text-3xl font-bold tracking-tight text-green-700 sm:text-4xl">
            Top Game Reviews
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-green-600 hover:text-green-800"
          >
            See all articles
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

        {/* Articles Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">
                  <a href="#" className="before:absolute before:inset-0">
                    {article.title}
                  </a>
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-900">
                      {article.category}
                    </span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-sm text-gray-500">
                      {article.date}
                    </span>
                  </div>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopGameReviews;
