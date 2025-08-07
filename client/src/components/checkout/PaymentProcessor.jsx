import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { CreditCard, Check } from "lucide-react";

const PaymentProcessor = ({
  selectedTicket,
  formData,
  paymentMethod,
  isProcessing,
  setIsProcessing,
  validateForm,
}) => {
  const flutterwaveConfig = {
    public_key: "FLWPUBK_TEST-SANDBOXDEMOKEY-X",
    tx_ref: `igaming-${Date.now()}`,
    amount: selectedTicket?.price || 0,
    currency: "USD",
    payment_options: "card,banktransfer,mpesa,mobilemoney",
    customer: {
      email: formData.email,
      phone_number: formData.phone,
      name: `${formData.firstName} ${formData.lastName}`,
    },
    customizations: {
      title: "iGaming AFRIKA Summit 2026",
      description: `Payment for ${selectedTicket?.label}`,
      logo: "https://your-logo-url.com/logo.png",
    },
    callback: async (response) => {
      closePaymentModal();
      // Send tx_ref to backend for verification
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tx_ref: response.tx_ref }),
      });

      const result = await res.json();
      window.location.href = `/payment-status?status=${result.status}&tx_ref=${response.tx_ref}`;
    },
    onClose: () => setIsProcessing(false),
  };

  return selectedTicket.price === 0 ? (
    <button
      onClick={() => {}}
      disabled={!validateForm() || isProcessing}
      className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center ${
        validateForm() && !isProcessing
          ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing Registration...
        </>
      ) : (
        <>
          <Check className="w-4 h-4 mr-2" />
          Complete Registration
        </>
      )}
    </button>
  ) : paymentMethod === "flutterwave" ? (
    <FlutterWaveButton
      {...flutterwaveConfig}
      text={isProcessing ? "Processing..." : "Pay with Flutterwave"}
      className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center ${
        validateForm() && !isProcessing
          ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={!validateForm() || isProcessing}
      onClick={() => {
        if (validateForm()) setIsProcessing(true);
      }}
    />
  ) : (
    <button
      onClick={() => {}}
      disabled={!validateForm() || isProcessing || !paymentMethod}
      className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center ${
        validateForm() && !isProcessing && paymentMethod
          ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing...
        </>
      ) : (
        <>Pay with Flutterwave</>
      )}
    </button>
  );
};

export default PaymentProcessor;
