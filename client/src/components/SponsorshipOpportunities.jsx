import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  Users,
  Hammer,
} from "lucide-react";
import sponsorships from "../data/sponsorships.json";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 12;

  // Sample data based on your structure
  const packages = [...sponsorships].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // Pagination logic
  const totalPages = Math.ceil(packages.length / packagesPerPage);
  const startIndex = (currentPage - 1) * packagesPerPage;
  const currentPackages = packages.slice(
    startIndex,
    startIndex + packagesPerPage
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
    if (status === "ON HOLD") {
      return (
        <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md transform rotate-12 z-10">
          ON HOLD
        </div>
      );
    }
    if (status === "SOLD OUT") {
      return (
        <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md transform rotate-12 z-10">
          SOLD OUT
        </div>
      );
    }
    if (status === "AVAILABLE") {
      return (
        <div
          style={!featured ? { backgroundColor: "#14a45c" } : {}}
          className={`absolute -top-2 -right-2 ${
            featured ? "bg-yellow-500" : ""
          } text-white text-xs font-bold px-3 py-2 rounded-full shadow-md transform -rotate-12 z-10`}
        >
          {featured ? "⭐ FEATURED" : "AVAILABLE"}
        </div>
      );
    }
    return null;
  };

  const getIconComponent = (icon, featured = false) => {
    return (
      <div
        className={`w-16 h-16 ${
          featured
            ? "bg-gradient-to-br from-yellow-100 to-green-100"
            : "bg-green-100"
        } rounded-xl flex items-center justify-center text-2xl shadow-sm`}
      >
        {icon}
      </div>
    );
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
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
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="inline-flex items-center gap-3 mb-4">
          <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
            Sponsorship Opportunities
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
          Join iGaming AFRIKA Summit 2026 and showcase your brand to industry
          leaders across the continent.
        </p>
      </motion.div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
        {currentPackages.map((pkg) => (
          <div
            key={pkg.id}
            className={`group relative bg-white rounded-xl p-6 shadow-md transition-all hover:shadow-green-300 border-green-300 duration-300 cursor-pointer hover:-translate-y-1 ${
              pkg.status === "SOLD OUT" ? "opacity-70" : ""
            } ${pkg.featured ? "ring-2 ring-yellow-300 ring-opacity-50" : ""}`}
            onClick={() => openModal(pkg)}
          >
            {getStatusBadge(pkg.status, pkg.featured)}

            <div className="flex flex-col h-full">
              {/* Icon */}
              <div className="flex justify-center mb-4">
                {getIconComponent(pkg.icon, pkg.featured)}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-3 text-center leading-tight">
                {pkg.title}
              </h3>

              {/* Quick Benefits Preview */}
              <div className="flex-grow mb-4">
                <div className="space-y-1">
                  {pkg.benefits.slice(0, 3).map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-xs text-gray-600"
                    >
                      <CheckCircle
                        size={12}
                        className="text-green-600 mt-0.5 flex-shrink-0"
                      />
                      <span className="truncate">{benefit}</span>
                    </div>
                  ))}
                  {pkg.benefits.length > 3 && (
                    <div className="text-xs text-gray-500 font-medium mt-2">
                      +{pkg.benefits.length - 3} more benefits
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="text-center mb-3">
                <span
                  className={`text-xl font-bold ${
                    pkg.featured ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  {pkg.price}
                </span>
              </div>

              {/* View Details Button */}
              <button
                className={`mt-auto w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  pkg.featured
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : "bg-[#14a45c] text-white hover:bg-green-700"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(pkg);
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-600 hover:bg-green-50"
            }`}
          >
            <ChevronLeft size={20} />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-green-600 text-white"
                  : "text-green-600 hover:bg-green-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-colors ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-green-600 hover:bg-green-50"
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedPackage && (
        <div
          className={`fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm transition-all duration-300 flex items-center justify-center px-2 sm:px-4 py-6 ${
            isModalOpen ? "visible" : "invisible"
          }`}
          onClick={closeModal}
        >
          {/* Modal Content */}
          <div
            className={`bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className={`${
                selectedPackage.featured
                  ? "bg-gradient-to-r from-yellow-500 to-green-600"
                  : "bg-gradient-to-r from-green-600 to-green-600"
              } text-white p-4 sm:p-6`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                    {selectedPackage.icon}
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold">
                      {selectedPackage.title}
                    </h2>
                    <p className="text-white text-sm italic text-opacity-90 mt-1">
                      {selectedPackage.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg sm:text-xl font-bold">
                    {selectedPackage.price}
                  </span>
                  <button
                    onClick={closeModal}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto max-h-[calc(100vh-120px)] scroll-smooth">
              <div className="p-4 sm:p-6 space-y-6 mb-6">
                {/* Package Benefits */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="text-green-600" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">
                      Package Benefits
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {selectedPackage.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <CheckCircle
                          size={16}
                          className="text-green-600 mt-0.5 flex-shrink-0"
                        />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gold Benefits */}
                {selectedPackage.goldBenefits?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-yellow-500" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">
                        Gold Sponsorship Status
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.goldBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-700"
                        >
                          <Star
                            size={16}
                            className="text-yellow-500 mt-0.5 flex-shrink-0"
                          />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPackage.platinumBenefits?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-purple-500" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">
                        Platinum Sponsorship Status
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.platinumBenefits.map(
                        (benefit, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 text-sm text-gray-700"
                          >
                            <Star
                              size={16}
                              className="text-purple-500 mt-0.5 flex-shrink-0"
                            />
                            <span>{benefit}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {selectedPackage.silverBenefits?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-gray-400" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">
                        Silver Sponsorship Status
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.silverBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-700"
                        >
                          <Star
                            size={16}
                            className="text-gray-400 mt-0.5 flex-shrink-0"
                          />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPackage.bronzeBenefits?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="text-amber-600" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">
                        Bronze Sponsorship Status
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {selectedPackage.bronzeBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-sm text-gray-700"
                        >
                          <Star
                            size={16}
                            className="text-amber-600 mt-0.5 flex-shrink-0"
                          />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedPackage.notes?.length > 0 && (
                  <Section icon={<Hammer size={18} />} title="Important Notes">
                    {selectedPackage.notes.map((note, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-sm text-black"
                      >
                        <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{note}</span>
                      </div>
                    ))}
                  </Section>
                )}

                {/* Tickets */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="text-blue-500" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">
                      Included Tickets
                    </h3>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {selectedPackage.tickets}
                  </p>
                </div>

                {/* Images */}
                {selectedPackage.images?.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <img
                        src={selectedPackage.images[0]}
                        alt="Preview"
                        className="w-5 h-5 object-cover rounded"
                      />
                      <h3 className="text-lg font-bold text-gray-900">
                        Booth Visuals
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {selectedPackage.images.slice(0, 2).map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt={`Booth ${i + 1}`}
                          // onClick={() => setPreviewImage(src)}
                          className="w-full h-48 object-cover rounded-lg cursor-pointer shadow-sm border"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4 border-t border-gray-200">
                  {selectedPackage.status === "SOLD OUT" ? (
                    <button
                      disabled
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  ) : selectedPackage.status === "ON HOLD" ? (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold"
                    >
                      On Hold
                    </button>
                  ) : (
                    <NavLink to="/register">
                      <button
                        onClick={closeModal}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                      >
                        Contact Us
                      </button>
                    </NavLink>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Section component
const Section = ({ icon, title, children }) => (
  <div>
    <div className="flex items-center gap-2 mb-3">
      <div className="text-slate-600">{icon}</div>
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
    </div>
    <div className="space-y-2">{children}</div>
  </div>
);

export default Packages;
