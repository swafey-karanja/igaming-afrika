import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { CheckCircle, AlertCircle } from "lucide-react";
import ExhibitionModal from "./ExhibitionModal.jsx";
import Header from "../../components/ui/Header.jsx";
import useFetch from "../../hooks/useFetch.ts";
import { fetchDataFromApi } from "../../services/api.js";

const ExhibitionPackages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tierOrder = ["Diamond", "Platinum", "Gold", "Silver", "Bronze"];

  const {
    data: exhibitionData,
    isLoading: exhibitionLoading,
    error: exhibitionError,
    refetch: refetchExhibitions,
  } = useFetch(() => fetchDataFromApi("exhibition"));

  const packages = Array.isArray(exhibitionData)
    ? exhibitionData
        .flatMap((tier, tierIndex) =>
          (tier.options ?? []).map((option, optionIndex) => ({
            id: `${tierIndex}-${optionIndex}`,
            title: `${tier.tier} - ${option.type}`,
            price: `$${Number(option.price).toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}`,
            status: "AVAILABLE",
            icon: option.type === "Shell Scheme" ? "🏗️" : "🏢",
            iconBg: "bg-green-400",
            featured:
              tier.tier === "Platinum" && option.type === "Shell Scheme",
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
            images: option.images || [],
            tickets:
              option.exhibitorBenefits
                ?.filter(
                  (b) => /closing night passes/i.test(b) || /passes/i.test(b),
                )
                ?.join(", ") || "Contact for details",
          })),
        )
        .sort((a, b) => tierOrder.indexOf(a.tier) - tierOrder.indexOf(b.tier))
    : [];

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

  return (
    <section
      id="exhibitionPackages"
      className="container scroll-mt-60 mx-auto py-8 px-2 lg:px-6"
    >
      <Header
        title="Exhibition Stand Packages"
        subtitle="Showcase your brand at iGaming AFRIKA Summit 2026 with our tailored exhibition packages."
      />

      {exhibitionLoading ? (
        <div className="container mx-auto  flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
        </div>
      ) : exhibitionError ? (
        <div className="container mx-auto  flex flex-col items-center justify-center py-20 rounded-lg">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-md font-medium text-gray-900 mb-2">
            Unable to load sponsors
          </h3>
          <p className="text-gray-600 mb-6 max-w-md text-sm text-center">
            {exhibitionError}
          </p>
          <button
            onClick={refetchExhibitions}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5 gap-10">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`group relative bg-white rounded-2xl shadow-md border-green-300 hover:shadow-green-300 transition-all duration-300 cursor-pointer hover:-translate-y-1 flex flex-col ${
                pkg.featured ? "ring-1 ring-slate-300" : ""
              } ${pkg.status === "SOLD OUT" ? "opacity-60" : ""}`}
              onClick={() => pkg.status !== "SOLD OUT" && openModal(pkg)}
            >
              <div className="p-6 min-h-[420px] flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTierColor(
                      pkg.tier,
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
                      pkg.tier,
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
                      <CheckCircle
                        size={14}
                        className="text-slate-400 mt-0.5"
                      />
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
                            pkg.tier,
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
      )}

      <ExhibitionModal
        pkg={selectedPackage}
        isModalOpen={isModalOpen}
        onClose={closeModal}
        getTierColor={getTierColor}
      />
    </section>
  );
};

export default ExhibitionPackages;
