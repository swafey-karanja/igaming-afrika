// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Clock, Mail } from "lucide-react";
import { allFeatures, plans as staticPlans } from "../../../data/data";
import Header from "../../../components/ui/Header";
import PaymentModal from "../../../components/ui/PaymentModal";

const supportStaff = [
  {
    name: "Diana Ann Wathanji",
    image: "/support/Diana.jpeg",
    whatsApp: "254782828237",
    email: "diana@igamingafrika.com",
    telegram: "dianahkariuki",
  },
  {
    name: "Betty Gacheri",
    image: "/support/Betty.jpeg",
    whatsApp: "254737448844",
    email: "mediarelations@igamingafrika.com",
    telegram: "Igamingafrika2",
  },
  {
    name: "Mary Wanja",
    image: "/support/Mary.jpg",
    whatsApp: "254756222200",
    email: "mary@igamingafrika.com",
    telegram: "igamingafrika3",
  },
];

// Fixed door prices (never change)
const DOOR_PRICES = {
  premium: 350,
  vvip: 950,
  standard: 0,
};

// Base sale prices for each plan type (starting prices)
const BASE_SALE_PRICES = {
  premium: 230,
  vvip: 670,
  standard: 0,
};

// Price increase amounts per cycle (3 days)
const PRICE_INCREMENT = {
  premium: 30,
  vvip: 70,
};

// Number of days between price increases
const PRICE_INCREASE_INTERVAL_DAYS = 3;

// Start date for price tracking (when initial prices are valid)
// Set this to the date when the event pricing first launched
const START_DATE = new Date("2026-04-20T00:00:00");

// Calculate the current sale price based on cycles passed since START_DATE
const calculateCurrentSalePrice = (planType, basePrice, incrementAmount) => {
  if (planType === "standard") return 0;

  const now = new Date();
  const diffInMs = now - START_DATE;
  const cyclesPassed = Math.floor(
    diffInMs / (PRICE_INCREASE_INTERVAL_DAYS * 24 * 60 * 60 * 1000),
  );

  // Sale price increases by incrementAmount every 3 days
  const currentPrice = Math.max(0, basePrice + cyclesPassed * incrementAmount);
  return currentPrice;
};

// Get the fixed door price (constant, never changes)
const getDoorPrice = (planType) => {
  if (planType === "standard") return 0;
  return DOOR_PRICES[planType];
};

// Calculate savings (doorPrice - currentSalePrice)
const calculateSavings = (doorPrice, currentSalePrice) => {
  return Math.max(0, doorPrice - currentSalePrice);
};

// Get the next price increase date
const getNextIncreaseDate = () => {
  const now = new Date();
  const diffInMs = now - START_DATE;
  const cyclesPassed = Math.floor(
    diffInMs / (PRICE_INCREASE_INTERVAL_DAYS * 24 * 60 * 60 * 1000),
  );
  const nextIncrease = new Date(START_DATE);
  nextIncrease.setDate(
    START_DATE.getDate() + (cyclesPassed + 1) * PRICE_INCREASE_INTERVAL_DAYS,
  );
  return nextIncrease;
};

// Custom hook for countdown to next price increase
const usePriceIncreaseCountdown = () => {
  const getTimeLeft = () => {
    const nextDate = getNextIncreaseDate();
    const diff = nextDate - new Date();
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

// Countdown banner component
const CountdownBanner = ({ isPopular, planType }) => {
  const timeLeft = usePriceIncreaseCountdown();
  if (!timeLeft) return null;
  const pad = (n) => String(n).padStart(2, "0");
  const labelColor = isPopular ? "text-green-100" : "text-gray-500";
  const unitBg = isPopular ? "bg-white/10" : "bg-gray-100";
  const valueColor = isPopular ? "text-white" : "text-gray-800";
  const separatorColor = isPopular ? "text-green-100" : "text-gray-400";

  const incrementAmount = planType === "premium" ? "$30" : "$70";

  return (
    <div className="px-4 py-3 flex flex-col items-center gap-1.5">
      <div
        className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest ${labelColor}`}
      >
        <Clock className="w-3 h-3" />
        Sale price increases by {incrementAmount} in
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

const TelegramIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.88 13.674l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.832.885z" />
  </svg>
);

const WhatsAppIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const SupportTeam = () => {
  const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: i * 0.15 },
    }),
  };

  return (
    <div className="mt-16 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-2">
        Need help choosing?
      </p>
      <h3 className="text-2xl font-bold text-gray-800 mb-10">
        Talk to our team
      </h3>
      <div className="flex flex-wrap justify-center gap-25">
        {supportStaff.map((person, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-3"
          >
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 ring-4 ring-green-100 shadow-md flex-shrink-0">
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.classList.add(
                      "flex",
                      "items-center",
                      "justify-center",
                    );
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-green-100 text-green-700 text-2xl font-bold">
                  {person.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Name */}
            <span className="text-xl font-semibold text-gray-700">
              {person.name}
            </span>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {/* Email */}
              <a
                href={`mailto:${person.email}`}
                title={`Email ${person.name}`}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 text-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
              >
                <Mail className="w-7 h-7" />
              </a>

              {/* Telegram */}
              <a
                href={`https://t.me/${person.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`Telegram: @${person.telegram}`}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-sky-100 text-sky-500 hover:bg-sky-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
              >
                <TelegramIcon className="w-7 h-7" />
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${person.whatsApp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                title={`WhatsApp: ${person.whatsApp}`}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-green-100 text-green-500 hover:bg-green-500 hover:text-white transition-all duration-200 shadow-sm hover:shadow-md hover:scale-110"
              >
                <WhatsAppIcon className="w-7 h-7" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const EventTickets = () => {
  const [plans, setPlans] = useState([]);
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedPlan, setSelectedPlan] = useState(null);

  // const handleBuyClick = (plan) => {
  //   setSelectedPlan(plan);
  //   setModalOpen(true);
  // };

  useEffect(() => {
    // Calculate dynamic sale prices for each plan
    const updatedPlans = staticPlans.map((plan) => {
      const planType = plan.label.toLowerCase();

      if (planType === "standard") {
        return { ...plan, price: 0, doorPrice: 0, currentSavings: 0 };
      }

      let currentSalePrice, doorPrice, incrementAmount;

      if (planType === "premium") {
        incrementAmount = PRICE_INCREMENT.premium;
        currentSalePrice = calculateCurrentSalePrice(
          "premium",
          BASE_SALE_PRICES.premium,
          incrementAmount,
        );
        doorPrice = getDoorPrice("premium");
      } else if (planType === "vvip") {
        incrementAmount = PRICE_INCREMENT.vvip;
        currentSalePrice = calculateCurrentSalePrice(
          "vvip",
          BASE_SALE_PRICES.vvip,
          incrementAmount,
        );
        doorPrice = getDoorPrice("vvip");
      } else {
        return plan;
      }

      const savings = calculateSavings(doorPrice, currentSalePrice);

      return {
        ...plan,
        price: currentSalePrice,
        doorPrice: doorPrice,
        currentSavings: savings,
      };
    });

    setPlans(updatedPlans);
  }, []);

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

    return plan?.features?.includes(feature) || false;
  };

  // Get plan type for countdown banner
  const getPlanType = (planLabel) => {
    return planLabel.toLowerCase();
  };

  if (plans.length === 0) {
    return (
      <section
        className="max-w-[1380px] mx-auto px-6 lg:px-12 py-8 scroll-mt-60"
        id="eventTickets"
      >
        <Header
          title="Event Tickets"
          subtitle="Secure your spot at the iGaming Afrika Summit 2026 by choosing the ticket that best suits your needs."
        />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </section>
    );
  }

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
        {plans.map((plan, index) => {
          const planType = getPlanType(plan.label);
          const isFree = plan.price === 0;

          return (
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
                    {plan.label} Pass
                  </h3>
                  <p
                    className={`text-sm mb-4 font-semibold ${
                      plan.isPopular ? "text-green-100" : "text-gray-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                {/* Price Display — split layout with diagonal divider */}
                {isFree ? (
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
                            plan.isPopular ? "text-green-300" : "text-gray-600"
                          }`}
                        >
                          ${plan.doorPrice}
                        </span>
                      </div>
                    </div>

                    {/* Save banner */}
                    {plan.currentSavings > 0 && (
                      <div
                        className={`py-2.5 text-center font-bold text-lg tracking-wide ${
                          plan.isPopular ? "text-white" : "text-green-700"
                        }`}
                      >
                        Save ${plan.currentSavings}
                      </div>
                    )}

                    {/* Countdown */}
                    <CountdownBanner
                      isPopular={plan.isPopular}
                      planType={planType}
                    />
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
                {isFree ? (
                  <a
                    href="https://events.igasummit.com/en/registration-form"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ backgroundColor: "#14a45c" }}
                      className="w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                    >
                      Register Now
                      <ArrowRight className="ml-2 w-4 h-4 font-bold" />
                    </motion.button>
                  </a>
                ) : (
                  <motion.a
                    // onClick={() => handleBuyClick(plan)}
                    href="https://events.igasummit.com/en/registration-form"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={
                      !plan.isPopular ? { backgroundColor: "#14a45c" } : {}
                    }
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-200 cursor-pointer flex items-center justify-center ${
                      plan.isPopular
                        ? "bg-white text-green-700 hover:bg-gray-50 shadow-lg"
                        : "text-white hover:bg-green-700 shadow-md hover:shadow-lg"
                    }`}
                  >
                    Buy Now
                    <ArrowRight className="ml-2 w-4 h-4 font-bold" />
                  </motion.a>
                )}
              </div>

              {/* Decorative Elements */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                  <div className="absolute inset-0 bg-white rounded-full transform rotate-45 translate-x-6 -translate-y-6"></div>
                </div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Support Staff */}
      <SupportTeam />

      {/* Payment Gateway Modal */}
      {/* <PaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={selectedPlan}
      /> */}
    </section>
  );
};

export default EventTickets;
