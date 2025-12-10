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
    <section id="faqs" className="max-w-[1300px] mx-auto px-6 lg:px-8 py-8 scroll-mt-40">
      <Header
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about the iGaming Afrika Summit 2026."
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-3">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full text-left py-3 focus:outline-none cursor-pointer"
            >
              <h2 className="text-lg font-semibold text-black">
                {faq.question}
              </h2>
              <svg
                className={`w-4 h-4 text-black transition-transform duration-200 ${
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
              <p className="text-black mt-2 text-sm pr-8">
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
