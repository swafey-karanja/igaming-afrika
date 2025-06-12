import React, { useState } from "react";
import {
  X,
  Star,
  Users,
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Building2,
  Hammer,
} from "lucide-react";
import exhibitionPackages from "../data/exhibitionPackages.json";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ExhibitionPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform the JSON data structure to match component needs
  const exhibitionData = exhibitionPackages;

  // Transform data for component consumption
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
      tickets: option.exhibitorBenefits
        ? option.exhibitorBenefits
            .find((b) => b.includes("passes"))
            ?.replace(/^\d+\s*/, "") || "Contact for details"
        : option.standBenefits
            .find((b) => b.includes("passes"))
            ?.replace(/^\d+\s*/, "") || "Contact for details",
    }))
  );

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedPackage(null);
    }, 300);
  };

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  const getStatusBadge = (status, featured = false) => {
    if (status === "SOLD OUT") {
      return (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm z-10">
          SOLD OUT
        </div>
      );
    }
    if (status === "AVAILABLE") {
      return (
        <div
          className={`absolute -top-2 -right-2 ${
            featured ? "bg-slate-800" : "bg-green-500"
          } text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm z-10`}
        >
          {featured ? "★" : "✓"}
        </div>
      );
    }
    return null;
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

  const getIconComponent = (icon, tier = false) => {
    const colorClass = getTierColor(tier);
    const baseClasses = `w-16 h-16 rounded-xl flex items-center justify-center text-2xl shadow-md transform transition-all duration-300 group-hover:scale-105 bg-gradient-to-br ${colorClass}`;

    return (
      <div className={baseClasses}>
        <span className="filter drop-shadow-sm">{icon}</span>
      </div>
    );
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 md:py-8 lg:py-8 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto text-center mb-12">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              Exhibition Opportunities
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-500 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <p className="text-gray-600 max-w-2xl mx-auto">
            Secure your exhibition space at iGaming AFRIKA 2025. Choose from
            flexible options to showcase your brand.
          </p>
        </motion.div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group relative bg-white rounded-2xl shadow-md transition-all hover:shadow-green-300 border-green-300 duration-300 cursor-pointer hover:-translate-y-1 flex flex-col ${
                pkg.featured ? "ring-1 ring-slate-300" : ""
              } ${pkg.status === "SOLD OUT" ? "opacity-60" : ""}`}
              onClick={() => pkg.status !== "SOLD OUT" && openModal(pkg)}
            >
              {getStatusBadge(pkg.status, pkg.featured)}

              {pkg.featured && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-slate-800 text-white px-3 py-1 rounded-full text-xs font-medium">
                    POPULAR
                  </div>
                </div>
              )}

              <div className="p-6 flex flex-col flex-grow">
                {/* Tier Badge */}
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

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  {getIconComponent(pkg.icon, pkg.tier, pkg.featured)}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-slate-800 mb-2 text-center">
                  {pkg.type}
                </h3>

                {/* Price */}
                <div className="text-center mb-6">
                  <span className="text-2xl font-bold text-slate-900">
                    {pkg.price}
                  </span>
                </div>

                {/* Quick Benefits Preview */}
                <div className="space-y-2 mb-6">
                  {pkg.benefits.slice(0, 2).map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-sm text-slate-600"
                    >
                      <CheckCircle
                        size={14}
                        className="text-slate-400 mt-0.5 flex-shrink-0"
                      />
                      <span className="line-clamp-2">{benefit}</span>
                    </div>
                  ))}
                  {pkg.benefits.length > 2 && (
                    <div className="text-sm text-slate-500 font-medium">
                      +{pkg.benefits.length - 2} more benefits
                    </div>
                  )}
                </div>

                {/* CTA Button - This will be pushed to the bottom */}
                <div className="mt-auto pt-4">
                  <button
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-200 text-sm cursor-pointer ${
                      pkg.status === "SOLD OUT"
                        ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                        : `bg-gradient-to-r ${getTierColor(
                            pkg.tier
                          )} hover:shadow-md text-white`
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
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div
          className={`fixed inset-0 bg-transparent transition-all duration-300 ease-out flex items-center justify-center p-4 z-50 ${
            isModalOpen ? "bg-opacity-50 backdrop-blur-sm" : "bg-opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out shadow-2xl ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`bg-gradient-to-r ${getTierColor(
                selectedPackage.tier
              )} text-white p-6`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center text-xl backdrop-blur-sm">
                    {selectedPackage.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">
                      {selectedPackage.tier} - {selectedPackage.type}
                    </h2>
                    <p className="text-white text-opacity-90 text-sm mt-1">
                      Stand Size: {selectedPackage.standSize}m
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">
                    {selectedPackage.price}
                  </span>
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-opacity-30 transition-colors backdrop-blur-sm cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-6 space-y-6">
                {/* Description */}
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p className="text-slate-700 text-sm">
                    {selectedPackage.description}
                  </p>
                </div>

                {/* Stand Benefits */}
                {selectedPackage.standBenefits.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="text-slate-600" size={18} />
                      <h3 className="text-lg font-semibold text-slate-800">
                        Stand Features
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.standBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <CheckCircle
                            size={16}
                            className="text-slate-400 mt-0.5 flex-shrink-0"
                          />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Exhibitor Benefits */}
                {selectedPackage.exhibitorBenefits.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-slate-600" size={18} />
                      <h3 className="text-lg font-semibold text-slate-800">
                        Exhibitor Benefits
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.exhibitorBenefits.map(
                        (benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <Star
                              size={16}
                              className="text-slate-400 mt-0.5 flex-shrink-0"
                            />
                            <span>{benefit}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Tier sponsorship status */}
                {selectedPackage.sponsorshipStatus.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-slate-600" size={18} />
                      <h3 className="text-lg font-semibold text-slate-800">
                        {selectedPackage.tier} Sponsorship Status
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.sponsorshipStatus.map(
                        (benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 text-sm text-slate-700"
                          >
                            <Star
                              size={16}
                              className="text-slate-400 mt-0.5 flex-shrink-0"
                            />
                            <span>{benefit}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Tickets */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="text-slate-600" size={18} />
                    <h3 className="text-lg font-semibold text-slate-800">
                      Included Passes
                    </h3>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-slate-700 text-sm">
                      {selectedPackage.tickets}
                    </p>
                  </div>
                </div>

                {/* Notes */}
                {selectedPackage.notes.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Hammer className="text-slate-600" size={18} />
                      <h3 className="text-lg font-semibold text-slate-800">
                        Important Notes
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.notes.map((note, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-2 text-sm text-slate-700"
                        >
                          <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex gap-3 pt-4 border-t border-slate-200">
                  <button
                    className={`flex-1 bg-gradient-to-r ${getTierColor(
                      selectedPackage.tier
                    )} text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 hover:shadow-md`}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExhibitionPackages;
