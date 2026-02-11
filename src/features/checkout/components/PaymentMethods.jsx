import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const PaymentMethods = ({ paymentMethod, setPaymentMethod }) => {
  const paymentMethods = [
    {
      id: "flutterwave",
      name: "Flutterwave",
      logo: "💳",
      description: "Pay with cards, bank transfer, or mobile money",
      supported: ["Visa", "Mastercard", "Mobile Money", "Bank Transfer"],
    },
    // {
    //   id: "stripe",
    //   name: "Stripe",
    //   logo: "🔷",
    //   description: "Secure card payments worldwide",
    //   supported: ["Visa", "Mastercard", "American Express", "Google Pay"],
    // },
    // {
    //   id: "paystack",
    //   name: "Paystack",
    //   logo: "🟢",
    //   description: "Fast and secure African payments",
    //   supported: ["Visa", "Mastercard", "Verve", "Bank Transfer", "USSD"],
    // },
  ];

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-green-600 font-semibold text-sm">2</span>
        </div>
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <div key={method.id}>
            <label className="flex items-start p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={paymentMethod === method.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mt-1 mr-3 text-green-600 focus:ring-green-500"
              />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className="text-2xl mr-2">{method.logo}</span>
                  <span className="font-medium text-gray-900">
                    {method.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {method.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {method.supported.map((type) => (
                    <span
                      key={type}
                      className="px-2 py-1 bg-gray-100 text-xs rounded text-gray-600"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </label>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PaymentMethods;
