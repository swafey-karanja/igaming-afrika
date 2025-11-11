import { X, CheckCircle, Star, Users, Hammer } from "lucide-react";
import { NavLink } from "react-router-dom";

const SponsorshipModal = ({ selectedPackage, isModalOpen, closeModal }) => {
  if (!selectedPackage) return null;

  return (
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
                ${selectedPackage.price}
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

            {/* Diamond Benefits */}
            {selectedPackage.diamondBenefits?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="text-purple-500" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">
                    Diamond Sponsorship Status
                  </h3>
                </div>
                <div className="space-y-2">
                  {selectedPackage.diamondBenefits.map((benefit, index) => (
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
                  ))}
                </div>
              </div>
            )}

            {/* Platinum Benefits */}
            {selectedPackage.platinumBenefits?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Star className="text-purple-500" size={20} />
                  <h3 className="text-lg font-bold text-gray-900">
                    Platinum Sponsorship Status
                  </h3>
                </div>
                <div className="space-y-2">
                  {selectedPackage.platinumBenefits.map((benefit, index) => (
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
                  ))}
                </div>
              </div>
            )}

            {/* Silver Benefits */}
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

            {/* Bronze Benefits */}
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

            {/* Important Notes */}
            {selectedPackage.notes?.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="text-slate-600">
                    <Hammer size={18} />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Important Notes
                  </h3>
                </div>
                <div className="space-y-2">
                  {selectedPackage.notes.map((note, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-black"
                    >
                      <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tickets */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="text-blue-500" size={20} />
                <h3 className="text-lg font-bold text-gray-900">
                  Included Tickets
                </h3>
              </div>
              <p className="text-gray-700 text-sm">{selectedPackage.tickets}</p>
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
                      className="w-full h-48 object-cover rounded-lg cursor-pointer shadow-sm border"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="pt-4 border-t border-gray-200">
              {selectedPackage.status === "SOLD" ? (
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
  );
};

export default SponsorshipModal;
