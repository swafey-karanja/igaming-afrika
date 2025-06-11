import React, { useState } from "react";
import { X } from "lucide-react";
import sponsorships from "../data/sponsorships.json";

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
    // Delay clearing the selectedPackage to allow animation to complete
    setTimeout(() => {
      setSelectedPackage(null);
    }, 300);
  };

  const openModal = (pkg) => {
    setSelectedPackage(pkg);
    // Small delay to ensure the component renders before animation starts
    setTimeout(() => {
      setIsModalOpen(true);
    }, 10);
  };

  const packages = sponsorships;

  const getStatusBadge = (status) => {
    if (status === "SOLD OUT") {
      return (
        <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          SOLD OUT
        </div>
      );
    }
    if (status === "AVAILABLE") {
      return (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
          AVAILABLE
        </div>
      );
    }
    return null;
  };

  const getIconComponent = (icon, title) => {
    if (title.includes("Exhibition") || title.includes("stand")) {
      return (
        <div className="w-15 h-15 bg-green-400 rounded-full flex items-center justify-center">
          <div className="w-8 h-6 bg-red-400 rounded-sm relative">
            <div className="absolute -top-1 left-1 w-2 h-2 bg-blue-400 rounded-full"></div>
            <div className="absolute -top-1 right-1 w-2 h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      );
    }
    if (title.includes("video")) {
      return (
        <div className="w-15 h-15 bg-green-400 rounded-full flex items-center justify-center">
          <div className="w-8 h-6 bg-red-400 rounded-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-b-2 border-t-transparent border-b-transparent ml-1"></div>
          </div>
        </div>
      );
    }
    // Default sponsorship icon
    return (
      <div className="w-15 h-15 bg-green-400 rounded-full flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-1 h-6 bg-gray-600 rounded-full"></div>
          <div className="flex space-x-1 mt-1">
            <div className="w-1 h-1 bg-red-400 rounded-full"></div>
            <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-auto">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center uppercase font-bold tracking-tight text-green-700 mb-2 sm:mb-4 md:mb-6">
        Sponsorship Opportunities
      </h2>
      <div className="w-20 h-1 bg-green-700 mx-auto mb-6"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-md h-60 sm:h-64 md:h-68 w-full max-w-sm mx-auto sm:max-w-none p-4 shadow-sm hover:shadow-md transition-shadow duration-200 relative cursor-pointer flex flex-col"
            onClick={() => openModal(pkg)}
          >
            {getStatusBadge(pkg.status)}

            <div className="flex flex-col items-center text-center flex-grow justify-center">
              <div className="mb-4 p-2">
                {getIconComponent(pkg.icon, pkg.title)}
              </div>

              <h3 className="text-sm sm:text-base font-medium text-black leading-relaxed px-2">
                {pkg.title}
              </h3>
            </div>

            <div className="text-right mt-auto">
              <span className="text-lg sm:text-xl font-semibold text-black">
                {pkg.price}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPackage && (
        <div
          className={`fixed inset-0 backdrop-blur-xs bg-transparent transition-all duration-300 ease-out flex items-center sm:items-center justify-center p-2 sm:p-4 z-50 ${
            isModalOpen ? "bg-opacity-20" : "bg-opacity-0"
          }`}
          onClick={closeModal}
        >
          <div
            className={`bg-gray-200 rounded-lg max-w-sm sm:max-w-4xl w-full max-h-[70vh] sm:max-h-screen overflow-y-auto transform transition-all duration-300 ease-out py-4 sm:mt-0 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3">
                {getIconComponent(selectedPackage.icon, selectedPackage.title)}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-black">
                    {selectedPackage.title}
                  </h2>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-lg sm:text-xl font-bold text-black">
                  {selectedPackage.price}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-green-600 text-white px-3 sm:px-4 py-1 text-xs sm:text-sm rounded font-medium hover:bg-green-700 transition-colors cursor-pointer"
                    onClick={() => {
                      /* Handle contact */
                    }}
                  >
                    CONTACT US
                  </button>
                  <button
                    onClick={closeModal}
                    className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
                  >
                    <X size={20} className="sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <p className="text-sm text-gray-600 italic">
                {selectedPackage.description}
              </p>

              {/* Package Benefits */}
              <div>
                <h3 className="font-semibold text-black mb-3">
                  Package Benefits:
                </h3>
                <ul className="space-y-2">
                  {selectedPackage.benefits.map((b, i) => (
                    <li key={i}>• {b}</li>
                  ))}
                </ul>
              </div>

              {/* Gold Sponsorship Status */}
              <div>
                <h3 className="font-semibold text-black mb-3">
                  GOLD Sponsorship Status
                </h3>
                <ul className="space-y-2">
                  {selectedPackage.goldBenefits.map((g, i) => (
                    <li key={i}>• {g}</li>
                  ))}
                </ul>
              </div>

              {/* Tickets */}
              <div>
                <h3 className="font-semibold text-black mb-3">Tickets</h3>
                <p className="text-sm text-gray-700">
                  {selectedPackage.tickets}
                </p>
              </div>

              {/* Package Images */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">
                  Package Images
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedPackage.images.map((imageUrl, index) => (
                    <div key={index} className="relative">
                      <img
                        src={imageUrl}
                        alt={`${selectedPackage.title} - Image ${index + 1}`}
                        className="w-full h-32 sm:h-48 object-cover rounded-lg border shadow-sm"
                      />
                    </div>
                  ))}
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
