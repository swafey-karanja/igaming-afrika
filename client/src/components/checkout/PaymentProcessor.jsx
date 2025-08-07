import React from "react";
import { Check } from "lucide-react";

const PaymentProcessor = ({
  selectedTicket,
  formData,
  isProcessing,
  setIsProcessing,
  validateForm,
}) => {
  const handleFlutterwavePayment = () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    window.FlutterwaveCheckout({
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
        // Close modal is automatic with inline
        try {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tx_ref: response.tx_ref }),
          });

          const result = await res.json();
          window.location.href = `/payment-status?status=${result.status}&tx_ref=${response.tx_ref}`;
        } catch (error) {
          console.error("Verification failed:", error);
          setIsProcessing(false);
        }
      },
      onclose: () => {
        setIsProcessing(false);
      },
    });
  };

  const handleFreeRegistration = () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    // Handle free registration logic here
    setTimeout(() => {
      // Simulate API call for free registration
      window.location.href = `/registration-success?ticket=${selectedTicket?.label}`;
    }, 1000);
  };

  const isFormValid = validateForm();

  return selectedTicket.price === 0 ? (
    <button
      onClick={handleFreeRegistration}
      disabled={!isFormValid || isProcessing}
      className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 ${
        isFormValid && !isProcessing
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
  ) : (
    <button
      onClick={handleFlutterwavePayment}
      disabled={!isFormValid || isProcessing}
      className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 ${
        isFormValid && !isProcessing
          ? "bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
    >
      {isProcessing ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          Processing Payment...
        </>
      ) : (
        <>💳 Pay with Flutterwave</>
      )}
    </button>
  );
};

export default PaymentProcessor;
