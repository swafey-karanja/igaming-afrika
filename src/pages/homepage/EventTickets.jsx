// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { allFeatures, plans } from "../../data/data";
import Header from "../../components/Header";

const EventTickets = () => {
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

  // Function to check if a feature is included in a specific plan
  const isFeatureIncluded = (planIndex, feature) => {
    const plan = plans[planIndex];
    return plan.features.includes(feature);
  };

  return (
    <section
      className="container mx-auto px-6 lg:px-8 py-8 scroll-mt-40"
      id="eventTickets"
    >
      <Header
        title="Event Tickets"
        subtitle="Secure your spot at the iGaming Afrika Summit 2026 by choosing the ticket that best suits your needs."
      />

      {/* Pricing Cards */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 h-auto items-center"
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
            className={`relative rounded-2xl overflow-hidden shadow-xl py-3 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-center h-[900px] ${
              plan.isPopular
                ? "text-white ring-4 ring-green-400 ring-opacity-50"
                : "bg-white border border-gray-200 hover:border-green-300"
            }`}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-green-900 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  🏆 Most Popular
                </div>
              </div>
            )}

            {/* Card Header */}
            <div
              className={`px-6 py-12 text-center ${
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

              <p
                className={`text-md mb-6 text-red-600 ${
                  plan.isPopular ? "text-green-100" : "text-gray-500"
                }`}
              >
                {plan.requirement}
              </p>

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
            <div className="px-6 py-6 flex-1 overflow-y-auto">
              <ul className="space-y-3">
                {allFeatures.map((feature, idx) => {
                  const isIncluded = isFeatureIncluded(index, feature);
                  return (
                    <li key={idx} className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          isIncluded
                            ? plan.isPopular
                              ? "bg-green-600"
                              : "bg-green-100"
                            : "bg-red-400/70"
                        }`}
                      >
                        {isIncluded ? (
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
                        ) : (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-sm ${
                          isIncluded
                            ? plan.isPopular
                              ? "text-green-50"
                              : "text-gray-600"
                            : plan.isPopular
                            ? "text-green-100 opacity-60"
                            : "text-gray-400"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="px-6 pb-8">
              <NavLink to="/checkout" state={{ selectedTicket: plan }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={!plan.isPopular ? { backgroundColor: "#14a45c" } : {}}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all cursor-pointer duration-200 ${
                    plan.isPopular
                      ? "bg-white text-green-700 hover:bg-gray-50 shadow-lg"
                      : "text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {plan.price === 0 ? "Get Free Pass" : "Purchase Ticket"}
                  <span className="ml-2">→</span>
                </motion.button>
              </NavLink>
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
    </section>
  );
};

export default EventTickets;
