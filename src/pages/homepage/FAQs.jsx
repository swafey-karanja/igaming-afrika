import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { faqs } from "../../data/data";
import Header from "../../components/Header";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const renderTextWithLinks = (text) => {
    const urlPattern = /(https?:\/\/[^\s)]+)/g;
    const parts = text.split(urlPattern);

    return parts.map((part, index) => {
      if (urlPattern.test(part)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            {part}
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <section
      id="faqs"
      className="max-w-[1300px] mx-auto px-6 lg:px-8 py-8 scroll-mt-40"
    >
      <Header
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about the iGaming Afrika Summit 2026."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="mb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left py-4 px-6 focus:outline-none cursor-pointer bg-green-600 rounded-full transition-colors"
            >
              <h2 className="text-md font-semibold text-white">
                {faq.question}
              </h2>
              <svg
                className={`w-5 h-5 text-white transition-transform duration-200 flex-shrink-0 ml-4 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div
              className={`overflow-hidden transition-all duration-500 ${
                activeIndex === index
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-gray-700 mt-4 text-sm px-8">
                {renderTextWithLinks(faq.answer)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
