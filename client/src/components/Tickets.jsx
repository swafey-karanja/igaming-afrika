import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Tickets = () => {
  const plans = [
    {
      label: "Standard Pass",
      price: 0,
      description: "Perfect for first-time attendees",
      features: [
        "Welcome Reception Access",
        "Basic Expo Access",
        "Networking Opportunities",
        "Event Mobile App",
      ],
    },
    {
      label: "Premium Pass",
      price: 200,
      doorPrice: 350,
      isPopular: true,
      description: "Most comprehensive experience",
      features: [
        "All Standard Pass benefits",
        "Full Conference Access",
        "VIP Networking Events",
        "Awards Dinner Included",
        "$35 Meals Voucher",
        "Safari Tour Access",
      ],
    },
    {
      label: "Platinum Pass",
      price: 600,
      doorPrice: 950,
      description: "Platinum executive experience",
      features: [
        "All Premium Pass benefits",
        "VIP Lounge Access",
        "Private Meeting Rooms",
        "Exclusive VIP Events",
        "Premium Dining",
        "Concierge Services",
      ],
    },
  ];

  return (
    <div className="bg-gray-100 px-4 sm:px-6 lg:px-8 py-12 md:py-12 lg:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px 0px 0px 0px" }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Tickets for Igaming Afrika Summit 2026
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
            Join Africa's premier iGaming conference. Connect with industry
            leaders, discover cutting-edge innovations, and shape the future of
            gaming.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8 h-auto items-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariant}
              style={plan.isPopular ? { backgroundColor: "#14a45c" } : {}}
              className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-center h-[600px] ${
                plan.isPopular
                  ? "text-white ring-4 ring-green-400 ring-opacity-50"
                  : "bg-white border border-gray-200 hover:border-green-300"
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    🏆 Most Popular
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div
                className={`px-6 py-8 text-center ${
                  plan.isPopular ? "" : "border-b border-gray-100"
                }`}
              >
                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.isPopular ? "text-white" : "text-green-700"
                  }`}
                >
                  {plan.label}
                </h3>
                <p
                  className={`text-sm mb-6 ${
                    plan.isPopular ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${
                      plan.isPopular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.price === 0 ? "Free" : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && (
                    <span
                      className={`text-sm ${
                        plan.isPopular ? "text-green-100" : "text-gray-500"
                      }`}
                    >
                      /ticket
                    </span>
                  )}
                </div>

                {plan.doorPrice && (
                  <p
                    className={`text-sm ${
                      plan.isPopular ? "text-green-200" : "text-gray-500"
                    }`}
                  >
                    Door price:{" "}
                    <span className="line-through">${plan.doorPrice}</span>
                  </p>
                )}
              </div>

              {/* Features List */}
              <div className="px-6 py-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          plan.isPopular ? "bg-green-600" : "bg-green-100"
                        }`}
                      >
                        <svg
                          className={`w-3 h-3 ${
                            plan.isPopular ? "text-white" : "text-green-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <span
                        className={`text-sm ${
                          plan.isPopular ? "text-green-50" : "text-gray-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="px-6 pb-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={!plan.isPopular ? { backgroundColor: "#14a45c" } : {}}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.isPopular
                      ? "bg-white text-green-700 hover:bg-gray-50 shadow-lg"
                      : "text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {plan.price === 0 ? "Get Free Pass" : "Purchase Ticket"}
                  <span className="ml-2">→</span>
                </motion.button>
              </div>

              {/* Decorative Elements */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className="absolute inset-0 bg-white rounded-full transform rotate-45 translate-x-6 -translate-y-6"></div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Tickets;
