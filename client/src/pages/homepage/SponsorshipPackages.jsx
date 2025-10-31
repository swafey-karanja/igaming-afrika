import { useEffect, useState, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SponsorshipModal from "../../components/SponsorshipModal";
import Header from "../../components/Header";

const SponsorshipPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 12;
  const [sponsorships, setSponsorships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSponsorshipData = useCallback(async () => {
    try {
      const token = import.meta.env.VITE_PUBLIC_API_TOKEN;
      setIsLoading(true);
      setError(null);
      setSponsorships([]);

      const response = await fetch(
        "https://events.igamingafrika.com/api/sponsorships/",
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSponsorships(data);
    } catch (error) {
      console.error("Failed to fetch sponsorships data", error);
      setError("Failed to load sponsorship opportunities. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSponsorshipData();
  }, [fetchSponsorshipData]);

  const packages = isLoading
    ? []
    : [...sponsorships].sort((a, b) => a.title.localeCompare(b.title));

  // Pagination logic
  const totalPages = Math.ceil(packages.length / packagesPerPage);
  const startIndex = (currentPage - 1) * packagesPerPage;
  const currentPackages = packages.slice(
    startIndex,
    startIndex + packagesPerPage
  );

  const getStatusBadge = (status, featured = false) => {
    if (status === "ON HOLD") {
      return (
        <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs font-bold px-3 py-2 rounded-full shadow-md transform z-10">
          ON HOLD
        </div>
      );
    }
    if (status === "SOLD") {
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

  return (
    <div className="container mx-auto px-6 lg:px-8 py-8">
      {/* Header */}
      <Header
        title="Sponsorship Packages"
        subtitle="Join iGaming AFRIKA Summit 2026 and showcase your brand to industry
          leaders across the continent."
      />

      {/* Content Area */}
      {isLoading ? (
        <div className="container mx-auto flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : error ? (
        <div className="container mx-auto flex flex-col items-center justify-center py-20 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Unable to load sponsors
          </h3>
          <p className="text-gray-600 mb-6 max-w-md text-sm text-center">
            {error}
          </p>
          <button
            onClick={fetchSponsorshipData}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {/* Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 container mx-auto mb-8">
            {currentPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`group relative bg-white rounded-xl p-6 shadow-md transition-all hover:shadow-green-300 border-green-300 duration-300 cursor-pointer hover:-translate-y-1 ${
                  pkg.status === "SOLD OUT" ? "opacity-70" : ""
                } ${
                  pkg.featured ? "ring-2 ring-yellow-300 ring-opacity-50" : ""
                }`}
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
                      {pkg.benefits && pkg.benefits.length > 0 ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          {(() => {
                            const allStatusBenefits = [
                              ...(pkg.goldBenefits || []).map((benefit) => ({
                                benefit,
                                category: "Gold",
                                color: "text-yellow-600",
                              })),
                              ...(pkg.platinumBenefits || []).map(
                                (benefit) => ({
                                  benefit,
                                  category: "Platinum",
                                  color: "text-gray-600",
                                })
                              ),
                              ...(pkg.diamondBenefits || []).map((benefit) => ({
                                benefit,
                                category: "Diamond",
                                color: "text-blue-600",
                              })),
                              ...(pkg.bronzeBenefits || []).map((benefit) => ({
                                benefit,
                                category: "Bronze",
                                color: "text-amber-700",
                              })),
                              ...(pkg.silverBenefits || []).map((benefit) => ({
                                benefit,
                                category: "Silver",
                                color: "text-gray-500",
                              })),
                            ];

                            return allStatusBenefits
                              .slice(0, 3)
                              .map((item, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-2 text-xs text-gray-600"
                                >
                                  <CheckCircle
                                    size={12}
                                    className={`${item.color} mt-0.5 flex-shrink-0`}
                                  />
                                  <span className="truncate">
                                    <span
                                      className={`font-medium ${item.color}`}
                                    >
                                      {item.category}:
                                    </span>{" "}
                                    {item.benefit}
                                  </span>
                                </div>
                              ));
                          })()}

                          {(() => {
                            const totalStatusBenefits =
                              (pkg.goldBenefits?.length || 0) +
                              (pkg.platinumBenefits?.length || 0) +
                              (pkg.diamondBenefits?.length || 0) +
                              (pkg.bronzeBenefits?.length || 0) +
                              (pkg.silverBenefits?.length || 0);

                            return (
                              totalStatusBenefits > 3 && (
                                <div className="text-xs text-gray-500 font-medium mt-2">
                                  +{totalStatusBenefits - 3} more status
                                  benefits
                                </div>
                              )
                            );
                          })()}
                        </>
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
                      ${pkg.price}
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

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
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
                )
              )}

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
        </>
      )}

      {/* Modal */}
      <SponsorshipModal
        selectedPackage={selectedPackage}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </div>
  );
};

export default SponsorshipPackages;
