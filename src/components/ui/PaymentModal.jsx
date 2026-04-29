import BaseModal from "./PopUpModal";
import { ArrowRight, Globe, MapPin } from "lucide-react";

/**
 * Fires a tracking event before redirecting the user.
 * Swap the console.log for your analytics call (e.g. gtag, Mixpanel, etc.)
 */
const trackAndRedirect = (gateway, plan) => {
  const eventPayload = {
    gateway, // "pesapal" | "event_portal"
    plan_label: plan.label, // "Standard" | "Premium" | "VVIP"
    plan_price: plan.price, // numeric price in USD
    timestamp: new Date().toISOString(),
  };

  // ── Replace this with your analytics provider ──────────────────────────────
  console.log("[Gateway Selected]", eventPayload);
  // Example GA4:
  // window.gtag?.("event", "gateway_selected", eventPayload);
  // ───────────────────────────────────────────────────────────────────────────

  window.open(
    gateway === "pesapal"
      ? "https://www.ticketsasa.com/events/igaming-afrika-summit-2026"
      : "https://events.igasummit.com/en/registration-form",
    "_blank",
    "noopener,noreferrer",
  );
};

// ─── Individual gateway option card ────────────────────────────────────────

const GatewayCard = ({ gateway, plan, onClose }) => {
  const isPesapal = gateway === "pesapal";

  const config = {
    pesapal: {
      name: "Pesapal",
      tagline: "Pay with M-Pesa, Airtel Money, or card",
      description:
        "Recommended for customers based in Kenya and East Africa. Supports mobile money (M-Pesa, Airtel Money) as well as local debit and credit cards.",
      badge: "🇰🇪 Recommended for local attendees",
      badgeClass: "bg-green-50 text-green-700 border border-green-200",
      buttonLabel: "Continue with Pesapal",
      icon: <MapPin className="w-5 h-5" />,
      iconBg: "bg-green-100 text-green-600",
      borderHover: "hover:border-green-400",
      buttonStyle: { backgroundColor: "#14a45c" },
      buttonClass: "text-white hover:opacity-90",
    },
    event_portal: {
      name: "Event Portal",
      tagline: "Register via the official iGaming Afrika portal",
      description:
        "Recommended for international attendees. Pay securely using Visa, Mastercard, or other globally accepted payment methods through our event registration platform.",
      badge: "🌍 Recommended for international attendees",
      badgeClass: "bg-blue-50 text-blue-700 border border-blue-200",
      buttonLabel: "Continue to Event Portal",
      icon: <Globe className="w-5 h-5" />,
      iconBg: "bg-blue-100 text-blue-600",
      borderHover: "hover:border-blue-400",
      buttonStyle: {},
      buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
    },
  };

  const c = isPesapal ? config.pesapal : config.event_portal;

  return (
    <div
      className={`flex flex-col justify-between rounded-xl border-2 border-gray-200 ${c.borderHover} p-6 transition-all duration-200 hover:shadow-md bg-white`}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className={`p-2.5 rounded-lg ${c.iconBg} flex-shrink-0`}>
          {c.icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{c.name}</h3>
          <p className="text-sm text-gray-500 font-medium mt-0.5">
            {c.tagline}
          </p>
        </div>
      </div>

      {/* Recommended badge */}
      <span
        className={`self-start text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${c.badgeClass}`}
      >
        {c.badge}
      </span>

      {/* Description */}
      <p className="text-[13px] text-gray-700 leading-relaxed mb-6 font-medium">
        {c.description}
      </p>

      {/* CTA */}
      <button
        onClick={() => {
          onClose();
          trackAndRedirect(gateway, plan);
        }}
        style={c.buttonStyle}
        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${c.buttonClass}`}
      >
        {c.buttonLabel}
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

// ─── Main modal ─────────────────────────────────────────────────────────────

/**
 * PaymentModal
 *
 * Props:
 *  - open     {boolean}   Controls visibility.
 *  - onClose  {function}  Called to dismiss the modal.
 *  - plan     {object}    The ticket plan the user wants to purchase.
 *                         Expected shape: { label, price, doorPrice }
 */
const PaymentModal = ({ open, onClose, plan }) => {
  if (!plan) return null;

  const isFree = plan.price === 0;

  return (
    <BaseModal open={open} onClose={onClose} maxWidth="760px">
      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-bold uppercase tracking-widest text-green-600 mb-1">
          {plan.label} Pass · ${isFree ? "Free" : plan.price}
        </p>
        <h2 className="text-2xl font-bold text-gray-900">
          Choose your payment method
        </h2>
        <p className="text-[13px] text-red-600 mt-1.5 font-semibold">
          Select the option that works best for your location.
        </p>
        <p className="text-[12px] text-slate-600 mt-1.5 font-medium">
          Both options are limited to one pass per order to facilitate badge
          printing
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-6" />

      {/* Gateway options */}
      <div className="grid sm:grid-cols-2 gap-4">
        <GatewayCard gateway="pesapal" plan={plan} onClose={onClose} />
        <GatewayCard gateway="event_portal" plan={plan} onClose={onClose} />
      </div>

      {/* Footer note */}
      <p className="text-xs text-gray-400 text-center mt-6">
        Both options are secure. You will be redirected to complete your
        purchase.
      </p>
    </BaseModal>
  );
};

export default PaymentModal;
