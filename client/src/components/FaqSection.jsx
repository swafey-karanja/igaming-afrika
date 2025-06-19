import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is iGaming AFRIKA Summit?",
      answer:
        "The inaugural iGaming AFRIKA Summit is set to take place in Nairobi, Kenya, in 2026, marking a significant milestone for the continent's gaming and betting industry. This premier event aims to unite a diverse array of stakeholders, including betting and gaming companies, technology providers, regulators, and investors, offering them a unique platform to network, explore investment opportunities, and forge strategic partnerships. Attendees can anticipate engaging in insightful discussions on emerging trends, regulatory frameworks, and technological advancements shaping the future of IGaming in Africa. With a focus on collaboration and innovation, the summit is poised to catalyze growth and drive the evolution of the gaming landscape across the continent.",
    },
    {
      question: "How do I get access to iGaming AFRIKA Summit?",
      answer:
        "Access details will be available on our website once registration opens. You can sign up for our newsletter to receive updates about ticket availability and early bird specials.",
    },
    {
      question: "How can I exhibit and sponsor?",
      answer:
        "We offer various exhibition and sponsorship packages. Please contact our partnerships team at events@igamingafrika.com for more information about available opportunities.",
    },
    {
      question: "How can I find Exhibitor details?",
      answer:
        "Exhibitor details will be published on our website closer to the event date. You can browse participating companies and their offerings in our digital exhibitor directory.",
    },
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className=" bg-gray-100 min-h-auto py-8 md:py-8 lg:py-8 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Frequently Asked Questions
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-3">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full text-left py-3 focus:outline-none cursor-pointer"
              >
                <h2 className="text-md font-medium text-black">
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
                <p className="text-black mt-2 text-sm pr-8">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
