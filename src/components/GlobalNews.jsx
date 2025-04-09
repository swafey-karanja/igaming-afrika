import React from "react";
import { useTranslation } from "react-i18next";

const GlobalNews = ({ variant = "global-news" }) => {

  const { t } = useTranslation();
  // Global News data
  const globalNewsArticles = [
    {
      id: 1,
      title:
        "SIGMA Central Europe heads to Milan: A new chapter in global Gaming events",
      date: "November 18, 2024",
      excerpt:
        "SIGMA Group, the leading event organiser for the global Gaming industry, has...",
      image:
        "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 2,
      title:
        "WA Technology to become Brazil's most sought-after platform provider",
      date: "August 26, 2024",
      excerpt:
        "Leading supplier ready to deliver newly-regulated operator partners unmatched local expertise 26th of...",
      image:
        "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 3,
      title:
        "Sun International's Peermont Deal Uncertain After CompCom's Recommendation",
      date: "October 28, 2024",
      excerpt:
        "JSE-listed gaming and resorts group Sun International's proposed acquisition of Peermont Holdings...",
      image:
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 4,
      title: "Vixio Announces 2024 Global Regulatory Awards Shortlist",
      date: "August 8, 2024",
      excerpt:
        "VIXIO is a leading provider of regulatory intelligence solutions, has announced the shortlist...",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 5,
      title:
        "Sam Sadi, LiveScore CEO Discusses Overregulation and Growing Demand for Sports Content",
      date: "September 4, 2024",
      excerpt:
        "LiveScore Group CEO Sam Sadi recently shared insights into the evolving landscape...",
      image:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 6,
      title:
        "Stake expands into Italy through strategic acquisition of idealbet from octavian group",
      date: "July 31, 2024",
      excerpt:
        "Stake is set for strategic expansion into the Italian market through its...",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  // International Regulations data
  const internationalRegulationsArticles = [
    {
      id: 7,
      title:
        "SIS expands global reach of Competitive Gaming through Dafabet launch",
      companies: ["SIS", "Dafabet"],
      type: "Press Release",
      date: "March 5, 2025",
      excerpt:
        "We are pleased to have launched our Competitive Gaming product with leading operator, Dafabet in Asia, Europe, Africa and Latin...",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 8,
      title: "SlotMatrix live in New Jersey with betPARX deal",
      companies: ["Every Matrix", "bet-PARX"],
      type: "Press Release",
      date: "February 11, 2025",
      excerpt:
        "SlotMatrix, the industry's largest content platform, is live in New Jersey with its first US games aggregation deal with the betPARX brand...",
      image:
        "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      id: 9,
      title:
        "Buzz Bingo enhances retail experience with Playtech's ECM Tablets",
      companies: ["Buzz Bingo", "Playtech"],
      type: "Press Release",
      date: "February 10, 2025",
      excerpt:
        "Playtech announces an exciting extension to its longstanding partnership with Buzz Bingo by rolling out 10,000 state-of-the-art...",
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const articles =
    variant === "international-regulations"
      ? internationalRegulationsArticles
      : globalNewsArticles;
  const title =
    variant === "international-regulations"
      ? t("news_blogs")
      : "Global News";

  return (
    <div className="py-16 bg-gray-100 sm:py-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-between gap-8 sm:flex-row mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">
            {title}
          </h2>
          <a
            href="#"
            className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-green-600 hover:text-green-800"
          >
            {t('show_more')}
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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="group relative overflow-hidden rounded-lg bg-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                {/* Company tags for International Regulations */}
                {variant === "international-regulations" && (
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {article.companies.map((company, index) => (
                      <span
                        key={index}
                        className="text-xs font-medium bg-gray-100 px-2 py-1 rounded"
                      >
                        {company}
                      </span>
                    ))}
                    <span className="text-xs font-medium text-gray-500">
                      {article.type}
                    </span>
                  </div>
                )}

                <div className="flex items-center mb-3">
                  <span className="text-xs text-gray-500">
                    © {article.date}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-600 group-hover:text-gray-900 transition-colors duration-200 mb-3">
                  <a href="#" className="before:absolute before:inset-0">
                    {article.title}
                  </a>
                </h3>

                <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>

                <a
                  href="#"
                  className="inline-flex items-center text-green-600 hover:text-green-800 font-medium text-sm"
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GlobalNews;
