// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { allFeatures, plans } from "../../../data/data";
import Header from "../../../components/ui/Header";

const DEADLINE = new Date("2026-04-20T23:59:59");

const useCountdown = () => {
  const getTimeLeft = () => {
    const diff = DEADLINE - new Date();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
};

const CountdownBanner = ({ isPopular }) => {
  const timeLeft = useCountdown();
  if (!timeLeft) return null;
  const pad = (n) => String(n).padStart(2, "0");
  const labelColor = isPopular ? "text-green-100" : "text-gray-500";
  const unitBg = isPopular ? "bg-white/10" : "bg-gray-100";
  const valueColor = isPopular ? "text-white" : "text-gray-800";
  const separatorColor = isPopular ? "text-green-100" : "text-gray-400";
  return (
    <div className="px-4 py-3 flex flex-col items-center gap-1.5">
      <div
        className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest ${labelColor}`}
      >
        <Clock className="w-3 h-3" />
        Sale price valid until April 20th
      </div>
      <div className="flex items-center gap-1.5 pt-1.5">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hrs" },
          { value: timeLeft.minutes, label: "Min" },
          { value: timeLeft.seconds, label: "Sec" },
        ].map(({ value, label }, i) => (
          <div key={label} className="flex items-center gap-1.5">
            <div
              className={`flex flex-col items-center rounded-md px-2 py-1 min-w-[36px] ${unitBg}`}
            >
              <span
                className={`text-lg font-extrabold tabular-nums leading-none ${valueColor}`}
              >
                {pad(value)}
              </span>
              <span
                className={`text-[9px] font-bold uppercase mt-0.5 ${labelColor}`}
              >
                {label}
              </span>
            </div>
            {i < 3 && (
              <span className={`text-sm font-bold -mt-2 ${separatorColor}`}>
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

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

    if (feature === "Meals Voucher") {
      return plan.mealsVoucher !== null;
    }

    return plan.features.includes(feature);
  };

  return (
    <section
      className="max-w-[1380px] mx-auto px-6 lg:px-12 py-8 scroll-mt-60"
      id="eventTickets"
    >
      <Header
        title="Event Tickets"
        subtitle="Secure your spot at the iGaming Afrika Summit 2026 by choosing the ticket that best suits your needs."
      />

      {/* Pricing Cards */}
      <motion.div
        className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 h-auto items-center"
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
            className={`relative rounded-2xl overflow-hidden shadow-sm py-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-center h-[930px] ${
              plan.isPopular
                ? "text-white ring-4 ring-green-400 ring-opacity-50"
                : "bg-white border border-gray-200 hover:border-green-300"
            }`}
          >
            {/* Popular Badge */}
            {plan.isPopular && (
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  🏆 Most Popular
                </div>
              </div>
            )}

            {/* Card Header */}
            <div
              className={`text-center ${
                plan.isPopular ? "" : "border-b border-gray-100"
              }`}
            >
              <div className="px-6 pt-10 pb-4 text-center">
                <h3
                  className={`text-xl font-bold mb-2 ${
                    plan.isPopular ? "text-white" : "text-green-700"
                  }`}
                >
                  {plan.label}
                </h3>
                <p
                  className={`text-sm mb-4 ${
                    plan.isPopular ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {plan.description}
                </p>

                {plan.requirement && (
                  <p
                    className={`text-sm mb-3 font-medium ${
                      plan.isPopular ? "text-green-100" : "text-red-600"
                    }`}
                  >
                    {plan.requirement}
                  </p>
                )}

                {plan.note && (
                  <p
                    className={`text-[11px] font-semibold mb-4 ${
                      plan.isPopular ? "text-green-100" : "text-green-600"
                    }`}
                  >
                    {plan.note}
                  </p>
                )}
              </div>

              {/* Price Display — split layout with diagonal divider */}
              {plan.price === 0 ? (
                <div className="px-6 pb-4">
                  <span
                    className={`text-4xl font-bold ${
                      plan.isPopular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Free
                  </span>
                </div>
              ) : (
                <>
                  {/* Sale vs Door Price row */}
                  <div
                    className={`relative flex items-stretch overflow-hidden ${
                      plan.isPopular ? "bg-green-700/40" : "bg-gray-50"
                    }`}
                  >
                    {/* SALE side */}
                    <div className="flex-1 flex flex-col items-center justify-center py-4 px-4">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${
                          plan.isPopular ? "text-green-200" : "text-gray-500"
                        }`}
                      >
                        Sale
                      </span>
                      <span
                        className={`text-3xl font-extrabold ${
                          plan.isPopular ? "text-white" : "text-gray-900"
                        }`}
                      >
                        ${plan.price}
                      </span>
                    </div>

                    {/* Diagonal SVG divider */}
                    <div className="relative w-10 flex-shrink-0">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 40 80"
                        preserveAspectRatio="none"
                      >
                        <line
                          x1="30"
                          y1="0"
                          x2="10"
                          y2="80"
                          stroke={
                            plan.isPopular
                              ? "rgba(255,255,255,0.25)"
                              : "#d1d5db"
                          }
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    {/* DOOR PRICE side */}
                    <div className="flex-1 flex flex-col items-center justify-center py-4 px-4">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-widest mb-1 ${
                          plan.isPopular ? "text-green-200" : "text-gray-500"
                        }`}
                      >
                        Door Price
                      </span>
                      <span
                        className={`text-3xl font-extrabold line-through ${
                          plan.isPopular ? "text-green-300" : "text-gray-400"
                        }`}
                      >
                        ${plan.doorPrice}
                      </span>
                    </div>
                  </div>

                  {/* Save banner */}
                  <div
                    className={`py-2.5 text-center font-bold text-lg tracking-wide ${
                      plan.isPopular ? "text-white" : "text-green-700"
                    }`}
                  >
                    Save ${plan.doorPrice - plan.price}
                  </div>

                  {/* Countdown */}
                  <CountdownBanner isPopular={plan.isPopular} />
                </>
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
                        {feature === "Meals Voucher" && plan.mealsVoucher
                          ? `$${plan.mealsVoucher} Meals Voucher`
                          : feature}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="px-6 pb-4">
              <a
                target="_blank"
                href="https://events.igasummit.com/en/registration-form"
                rel="noopener noreferrer"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={!plan.isPopular ? { backgroundColor: "#14a45c" } : {}}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center ${
                    plan.isPopular
                      ? "bg-white text-green-700 hover:bg-gray-50 shadow-lg"
                      : "text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                  }`}
                >
                  {plan.price === 0 ? "Register Now" : "Buy Now"}
                  <ArrowRight className="ml-2 w-4 h-4 font-bold" />
                </motion.button>
              </a>
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
