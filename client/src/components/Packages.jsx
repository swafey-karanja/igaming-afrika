import React, { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Star,
  Users,
} from "lucide-react";
import sponsorships from "../data/sponsorships.json";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 12;

  // Sample data based on your structure
  const packages = sponsorships;

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
    if (status === "SOLD OUT") {
      return (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md transform rotate-12 z-10">
          SOLD OUT
        </div>
      );
    }
    if (status === "AVAILABLE") {
      return (
        <div
          className={`absolute -top-2 -right-2 ${
            featured ? "bg-yellow-500" : "bg-green-500"
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
          className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-500 mx-auto rounded-full mb-6"
          initial={{ width: 0 }}
          whileInView={{ width: 96 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-md">
          Join iGaming AFRIKA 2025 and showcase your brand to industry leaders
          across the continent.
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
                        className="text-green-500 mt-0.5 flex-shrink-0"
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
              <div className="text-center">
                <span
                  className={`text-xl font-bold ${
                    pkg.featured ? "text-yellow-600" : "text-green-600"
                  }`}
                >
                  {pkg.price}
                </span>
              </div>
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
          className={`fixed inset-0 backdrop-blur-sm bg-transparent transition-all duration-300 ease-out flex items-center justify-center p-4 z-50 ${
            isModalOpen ? "bg-opacity-50" : "bg-opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden transform transition-all duration-300 ease-out shadow-2xl ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div
              className={`${
                selectedPackage.featured
                  ? "bg-gradient-to-r from-yellow-500 to-green-500"
                  : "bg-gradient-to-r from-green-500 to-green-600"
              } text-white p-6`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-2xl backdrop-blur-sm">
                    {selectedPackage.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedPackage.title}
                    </h2>
                    <p className="text-white text-opacity-90 text-sm italic">
                      {selectedPackage.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center pb-8">
                  <span className="text-xl font-bold">
                    {selectedPackage.price}
                  </span>
                  <button
                    onClick={closeModal}
                    className="w-10 h-10 cursor-pointer bg-transparent bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-colors backdrop-blur-sm"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
              <div className="p-6 space-y-6">
                {/* Package Benefits */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <CheckCircle className="text-green-500" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">
                      Package Benefits
                    </h3>
                  </div>
                  <div className="grid gap-2">
                    {selectedPackage.benefits.map((benefit, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-1 rounded-lg"
                      >
                        <CheckCircle
                          size={16}
                          className="text-green-500 mt-0.5 flex-shrink-0"
                        />
                        <span className="text-gray-700 text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gold Benefits */}
                {selectedPackage.goldBenefits.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="text-yellow-500" size={20} />
                      <h3 className="text-lg font-bold text-gray-900">
                        Gold Sponsorship Status
                      </h3>
                    </div>
                    <div className="grid gap-2">
                      {selectedPackage.goldBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-1 rounded-lg"
                        >
                          <Star
                            size={16}
                            className="text-yellow-500 mt-0.5 flex-shrink-0"
                          />
                          <span className="text-gray-700 text-sm">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tickets */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Users className="text-blue-500" size={20} />
                    <h3 className="text-lg font-bold text-gray-900">
                      Included Tickets
                    </h3>
                  </div>
                  <div className="p-1 rounded-lg">
                    <p className="text-gray-700">{selectedPackage.tickets}</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4 border-t">
                  {selectedPackage.status === "SOLD OUT" ? (
                    <button
                      disabled
                      type="button"
                      className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl cursor-not-allowed"
                    >
                      Sold Out
                    </button>
                  ) : (
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-8 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                      Contact Us
                    </button>
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

export default Packages;
