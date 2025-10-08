import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Check,
  Shield,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const OrderSummary = ({ selectedTicket }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const visibleFeatures = showAllFeatures
    ? selectedTicket.features
    : selectedTicket.features.slice(0, 4);

  const remainingFeaturesCount = selectedTicket.features.length - 4;

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 relative top-0 mb-5">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">
          iGaming AFRIKA Summit 2026
        </h3>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" /> May 4-6, 2026
          </div>
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2" /> Nairobi, Kenya
          </div>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-medium text-gray-900">
              {selectedTicket.label}
            </h3>
            <p className="text-sm text-gray-600">
              {selectedTicket.description}
            </p>
          </div>
          {selectedTicket.isPopular && (
            <span className="bg-yellow-400 text-green-900 px-2 py-1 rounded text-xs font-bold">
              Popular
            </span>
          )}
        </div>
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Includes:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {visibleFeatures.map((feature, idx) => (
              <li key={idx} className="flex items-center">
                <Check className="w-3 h-3 text-green-600 mr-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
            {remainingFeaturesCount > 0 && (
              <li>
                <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="text-green-600 text-xs hover:text-green-700 hover:underline focus:outline-none focus:text-green-700 cursor-pointer flex items-center transition-colors duration-200"
                >
                  {showAllFeatures ? (
                    <>
                      <ChevronUp className="w-3 h-3 mr-1" />
                      Show less features
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3 h-3 mr-1" />+
                      {remainingFeaturesCount} more features
                    </>
                  )}
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Ticket Price</span>
          <span className="font-medium">
            {selectedTicket.price === 0 ? "Free" : `$${selectedTicket.price}`}
          </span>
        </div>
        {selectedTicket.doorPrice && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">You save</span>
            <span className="text-sm text-green-600 font-medium">
              ${selectedTicket.doorPrice - selectedTicket.price}
            </span>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
          <span>Total</span>
          <span className="text-green-600">
            {selectedTicket.price === 0 ? "Free" : `$${selectedTicket.price}`}
          </span>
        </div>
      </div>
      <div className="mb-6 p-3 bg-blue-50 rounded-lg">
        <div className="flex items-center text-sm text-blue-800">
          <Shield className="w-4 h-4 mr-2" />
          Secure checkout with 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
