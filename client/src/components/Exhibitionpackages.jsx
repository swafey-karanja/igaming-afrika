import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import exhibitionPackages from "../data/exhibitionPackages.json";
import ExhibitionModal from "./utils/ExhibitionModal";

const ExhibitionPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const exhibitionData = exhibitionPackages;

  const packages = exhibitionData.flatMap((tier, tierIndex) =>
    tier.options.map((option, optionIndex) => ({
      id: `${tierIndex}-${optionIndex}`,
      title: `${tier.tier} - ${option.type}`,
      price: `$${option.price.toLocaleString()}`,
      status: "AVAILABLE",
      icon: option.type === "Shell Scheme" ? "🏗️" : "🏢",
      iconBg: "bg-green-400",
      featured: tier.tier === "Platinum" && option.type === "Shell Scheme",
      description: option.description,
      standSize: option.standSize,
      tier: tier.tier,
      type: option.type,
      benefits: [
        ...(option.standBenefits || []),
        ...(option.exhibitorBenefits || []),
        ...(option.sponsorshipStatus || []),
      ],
      standBenefits: option.standBenefits || [],
      exhibitorBenefits: option.exhibitorBenefits || [],
      sponsorshipStatus: option.sponsorshipStatus || [],
      notes: option.notes || [],
      tickets:
        option.exhibitorBenefits
          ?.find((b) => b.includes("passes"))
          ?.replace(/^\d+\s*/, "") ||
        option.standBenefits
          ?.find((b) => b.includes("passes"))
          ?.replace(/^\d+\s*/, "") ||
        "Contact for details",
    }))
  );

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setTimeout(() => setIsModalOpen(true), 10);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedPackage(null), 300);
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "Diamond":
        return "from-cyan-400 to-blue-600";
      case "Platinum":
        return "from-purple-400 to-purple-600";
      case "Gold":
        return "from-yellow-400 to-yellow-600";
      case "Silver":
        return "from-gray-400 to-slate-600";
      case "Bronze":
        return "from-orange-400 to-amber-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
            Exhibition Opportunities
          </h2>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
            Secure your exhibition space at iGaming AFRIKA Summit 2026. Choose
            from flexible options to showcase your brand.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`group relative bg-white rounded-2xl shadow-md border-green-300 hover:shadow-green-300 transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col ${
              pkg.featured ? "ring-1 ring-slate-300" : ""
            } ${pkg.status === "SOLD OUT" ? "opacity-60" : ""}`}
            onClick={() => pkg.status !== "SOLD OUT" && openModal(pkg)}
          >
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTierColor(
                    pkg.tier
                  )}`}
                >
                  {pkg.tier}
                </span>
                <span className="text-md text-slate-500 font-medium">
                  {pkg.standSize}m
                </span>
              </div>

              <div className="flex justify-center mb-4">
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-md bg-gradient-to-br ${getTierColor(
                    pkg.tier
                  )}`}
                >
                  {pkg.icon}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">
                {pkg.type}
              </h3>
              <div className="text-center mb-6">
                <span className="text-2xl font-bold text-slate-900">
                  {pkg.price}
                </span>
              </div>

              <div className="space-y-2 mb-6">
                {pkg.benefits.slice(0, 2).map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <CheckCircle size={14} className="text-slate-400 mt-0.5" />
                    <span className="line-clamp-2">{b}</span>
                  </div>
                ))}
                {pkg.benefits.length > 2 && (
                  <div className="text-sm text-slate-500 font-medium">
                    +{pkg.benefits.length - 2} more benefits
                  </div>
                )}
              </div>

              <div className="mt-auto pt-4">
                <button
                  className={`w-full py-2.5 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                    pkg.status === "SOLD OUT"
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : `bg-gradient-to-r ${getTierColor(
                          pkg.tier
                        )} text-white hover:shadow-md`
                  }`}
                  disabled={pkg.status === "SOLD OUT"}
                >
                  {pkg.status === "SOLD OUT" ? "Sold Out" : "View Details"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ExhibitionModal
        pkg={selectedPackage}
        isModalOpen={isModalOpen}
        onClose={closeModal}
        getTierColor={getTierColor}
      />
    </div>
  );
};

export default ExhibitionPackages;
