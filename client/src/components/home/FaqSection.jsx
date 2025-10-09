import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const FAQSection = () => {
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

  const faqs = [
    {
      question: "What is iGaming AFRIKA Summit?",
      answer:
        "iGaming AFRIKA Summit is Africa's mega gaming event, designed to unite the entire gaming industry players across the world in one place—the stunning city of Nairobi, Kenya taking place in Nairobi, in May 2026. This being the inaugural edition of the summit, the event is seen to be the largest event in the gaming industry in Africa.",
    },
    {
      question: "What are the scheduled days for the event?",
      answer:
        "The iGaming AFRIKA Summit will be held from May 4th to 6th, 2026.",
    },
    {
      question: "Where will the iGaming Africa Summit 2026 be held?",
      answer:
        "The summit is taking place in an impressive 3,300m² square meters location at Sarit Expo Centre, Nairobi's Largest Expo centre giving exhibitors and attendees a massive ground to showcase their products, meet and connect with industry players as we discuss the future of the gaming industry in Africa.",
    },
    {
      question: "How do I get access to the iGaming AFRIKA Summit?",
      answer:
        "Access details will be available on our event website https://summits.igamingafrika.com/ once registration opens. You can sign up for our newsletter to receive updates about ticket availability and early bird specials.",
    },
    {
      question: "What is the ticket policy if the event can’t go ahead?",
      answer:
        "If the physical event cannot proceed for any reason, all ticket holders will have the option to transfer their ticket to a future event or receive a full refund in accordance with our ticketing terms and conditions.",
    },
    {
      question: "Can i transfer my ticket if i can no longer attend?",
      answer:
        "Yes, if you are unable to attend, you may transfer your ticket to a substitute delegate at no additional cost. All substitution requests must be submitted via email through events@igamingafrika.com at least 48 hours before the event, including the names, job titles, and contact emails for both the registered and replacement delegates.",
    },
    {
      question: "Will i have access to online delegates?",
      answer: "No. We will not have online delegates.",
    },
    {
      question: "What are the accommodation options?",
      answer:
        "For accommodation options, please visit our event page, which features partnerships with local hotels to provide special rates for attendees.",
    },
    {
      question: "What are the costs to attend iGaming AFRIKA Summit?",
      answer:
        "It is absolutely free to attend the iGaming AFRIKA Summit. However, delegates interested in purchasing paid tickets for enhanced access to the summit may do so at their convenience.\n\nDetailed ticket pricing and options are available on our website. Please visit our ticket options page for more information.",
    },
    {
      question: "Are there any covid-19 measures in place?",
      answer:
        "Currently, there are no specific COVID-19 restrictions in place. However, we encourage attendees to follow any personal safety measures they prefer, such as wearing masks.",
    },
    {
      question: "What does the expo-only pass include?",
      answer:
        "The Free Standard Pass provides access to the welcome reception access, pre-registration networking event, tournament access, and the Closing Party. It does not include access to Hall 2 conference sessions, food and beverage services, or evening networking events.",
    },
    {
      question: "Is there a lost and found?",
      answer:
        "Yes. Any lost items can be reported to the Help Desk during the event. After the Summit concludes, unclaimed items will be handed over to local authorities.",
    },
    {
      question: "What are our terms and conditions for event attendance?",
      answer:
        "You can review the terms and conditions by clicking the following link: https://igamingafrika.com/terms-and-conditions-events/ for event attendance on our website.",
    },
    {
      question: "Are there any restrictions in attendance?",
      answer:
        "Due to the nature of the event, some activities may not be suitable for individuals under 18 years old.",
    },
    {
      question: "Where can i find the code of conduct?",
      answer:
        "Our Code of Conduct is available on our event website for your review.",
    },
    {
      question: "Where can i find the privacy policy?",
      answer:
        "You can find the privacy policy by clicking the following link: https://igamingafrika.com/privacy-policy-events/.",
    },
    {
      question: "How can i contact the iGaming AFRIKA summit team?",
      answer:
        "For any inquiries, feedback, or questions, please contact us at events@igamingafrika.com",
    },
    {
      question: "Is smoking allowed at the venue?",
      answer:
        "Smoking is not permitted inside the Sarit Centre. Designated outdoor smoking areas will be provided, and we kindly ask all attendees to use these areas.",
    },
    {
      question: "Will there be networking events?",
      answer:
        "Yes, networking events will be held throughout the Summit, providing attendees with opportunities to connect and collaborate with industry professionals. More details will be shared closer to the event date.",
    },
    {
      question: "Are there opportunities for Media Partnerships?",
      answer:
        "The iGA Summit collaborates with various media partners worldwide to enhance the event's visibility and provide valuable exposure opportunities within the iGaming AFRIKA Community. If you're interested in becoming an official Media Partner, please reach out to our Media Relations team at 'mediarelations@igamingafrika.com'.",
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
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent">
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
      </div>
    </div>
  );
};

export default FAQSection;
