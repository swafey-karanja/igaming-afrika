import { useEffect, useState } from "react";
import { Check, Smartphone } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import PaymentMethods from "./PaymentMethods";
import { fetchExchangeRates } from "../../services/api";

const stripePromise = loadStripe("pk_test_...");

const PaymentProcessor = ({
  selectedTicket,
  isProcessing,
  setIsProcessing,
  validateForm,
  formData,
}) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [mpesaStatus, setMpesaStatus] = useState(null);
  const [checkoutRequestId, setCheckoutRequestId] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [priceInKES, setPriceInKES] = useState(null);

  // Fetch exchange rate on component mount
  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        const data = await fetchExchangeRates();
        if (data.result === "success" && data.conversion_rates.KES) {
          const rate = data.conversion_rates.KES;
          setExchangeRate(rate);

          // Convert price to KES
          const convertedPrice = Math.round(selectedTicket.price * rate);
          setPriceInKES(convertedPrice);
        }
      } catch (err) {
        console.error("Failed to fetch exchange rate:", err);
        // Fallback to a default rate if API fails
        const fallbackRate = 129.2; // Approximate rate
        setExchangeRate(fallbackRate);
        setPriceInKES(Math.round(selectedTicket.price * fallbackRate));
      }
    };

    if (selectedTicket.price > 0) {
      getExchangeRate();
    }
  }, [selectedTicket.price]);

  const handleStripePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4242/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey: crypto.randomUUID(),
          ticketId: selectedTicket.id,
          ticketLabel: selectedTicket.label,
          promoCode: promoCode || null,
          // Send customer form data to backend
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || "",
            jobTitle: formData.jobTitle || "",
            country: formData.country,
            agreeToTerms: formData.agreeToTerms,
          },
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      if (!data.clientSecret) {
        throw new Error("Failed to get client secret");
      }

      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error(err);
      setError(
        err.message || "Payment initialization failed. Please try again."
      );
      setIsProcessing(false);
    }
  };

  /// M-Pesa Payment Handler with KES amount
  const handleMpesaPayment = async () => {
    if (!validateForm()) {
      setError("Please fill in all required fields");
      return;
    }

    if (!formData.phone) {
      setError("Phone number is required for M-Pesa payment");
      return;
    }

    if (!priceInKES) {
      setError("Unable to calculate price in KES. Please try again.");
      return;
    }

    setIsProcessing(true);
    setError("");
    setMpesaStatus("initiating");

    try {
      const res = await fetch("http://localhost:4242/api/mpesa/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phone,
          amount: priceInKES, // Send amount in KES
          amountUSD: selectedTicket.price, // Also send original USD amount
          exchangeRate: exchangeRate,
          ticketId: selectedTicket.id,
          ticketLabel: selectedTicket.label,
          promoCode: promoCode || null,
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || "",
            jobTitle: formData.jobTitle || "",
            country: formData.country,
            agreeToTerms: formData.agreeToTerms,
          },
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to initiate M-Pesa payment");
      }

      setCheckoutRequestId(data.checkoutRequestId);
      setMpesaStatus("pending");

      // Start polling for payment status
      pollPaymentStatus(checkoutRequestId);
    } catch (err) {
      console.error(err);
      setError(err.message || "M-Pesa payment failed. Please try again.");
      setIsProcessing(false);
      setMpesaStatus(null);
    }
  };

  // Poll M-Pesa payment status
  const pollPaymentStatus = (requestId) => {
    let attempts = 0;
    const maxAttempts = 60;

    const interval = setInterval(async () => {
      attempts++;

      try {
        const res = await fetch(
          `http://localhost:4242/api/mpesa/status/${requestId}`
        );
        const data = await res.json();

        if (data.success) {
          if (data.status === "completed") {
            clearInterval(interval);
            setMpesaStatus("completed");

            setTimeout(() => {
              window.location.href = `/return?checkout_request_id=${requestId}&ticket=${selectedTicket?.label}&email=${formData.email}&status=complete&payment_method=mpesa`;
            }, 1500);
          } else if (data.status === "failed") {
            clearInterval(interval);
            setMpesaStatus("failed");
            setError(data.resultDesc || "Payment failed. Please try again.");
            setIsProcessing(false);
          }
        }

        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setError(
            "Payment verification timeout. Please check your M-Pesa messages or contact support."
          );
          setIsProcessing(false);
        }
      } catch (err) {
        console.error("Status check error:", err);
      }
    }, 2000);
  };

  const handleFreeRegistration = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);
    setError("");

    try {
      const res = await fetch("http://localhost:4242/api/free-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idempotencyKey: crypto.randomUUID(),
          ticketId: selectedTicket.id,
          ticketLabel: selectedTicket.label,
          customerInfo: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            company: formData.company || "",
            jobTitle: formData.jobTitle || "",
            country: formData.country,
            agreeToTerms: formData.agreeToTerms,
          },
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Registration failed");
      }

      setTimeout(() => {
        window.location.href = `/return?ticket=${selectedTicket?.label}&email=${formData.email}&status=complete`;
      }, 1000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed. Please try again.");
      setIsProcessing(false);
    }
  };

  const isFormValid = validateForm();

  // If clientSecret exists, show the embedded checkout
  if (clientSecret) {
    return (
      <div className="w-[100%] p-20 bg-white rounded-2xl" id="checkout">
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ fetchClientSecret: () => clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      </div>
    );
  }

  // M-Pesa Status Display
  if (mpesaStatus && paymentMethod === "mpesa") {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        {mpesaStatus === "initiating" && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Initiating M-Pesa Payment...
            </h3>
            <p className="text-gray-600">Please wait...</p>
          </>
        )}

        {mpesaStatus === "pending" && (
          <>
            <Smartphone className="w-16 h-16 text-green-600 mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Check Your Phone
            </h3>
            <p className="text-gray-600 mb-4">
              An M-Pesa prompt has been sent to{" "}
              <strong>{formData.phone}</strong>
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <p className="text-sm text-green-800">
                1. Enter your M-Pesa PIN on your phone
                <br />
                2. Confirm the payment of KES {priceInKES?.toLocaleString()}
                <br />
                3. Wait for confirmation (this may take a few seconds)
              </p>
            </div>
            <div className="flex items-center justify-center text-gray-500 text-sm">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
              Waiting for payment confirmation...
            </div>
          </>
        )}

        {mpesaStatus === "completed" && (
          <>
            <Check className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Successful!
            </h3>
            <p className="text-gray-600">Redirecting to confirmation page...</p>
          </>
        )}

        {mpesaStatus === "failed" && (
          <>
            <div className="text-red-500 text-5xl mb-4">✕</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Payment Failed
            </h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setMpesaStatus(null);
                setIsProcessing(false);
                setError("");
              }}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Payment Method Selection */}
      {selectedTicket.price > 0 && (
        <PaymentMethods
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
        />
      )}

      {/* Show error message if any */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Promo code input (only for paid tickets) */}
      {selectedTicket.price > 0 && (
        <div className="mb-4">
          <label
            htmlFor="promoCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Promo Code (Optional)
          </label>
          <input
            type="text"
            id="promoCode"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
            placeholder="Enter promo code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            disabled={isProcessing}
          />
        </div>
      )}

      {/* Free ticket button */}
      {selectedTicket.price === 0 ? (
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
      ) : paymentMethod === "mpesa" ? (
        <button
          onClick={handleMpesaPayment}
          disabled={!isFormValid || isProcessing || !priceInKES}
          className={`w-full py-3 px-4 rounded-lg font-semibold flex items-center justify-center transition-all duration-200 ${
            isFormValid && !isProcessing && priceInKES
              ? "bg-green-600 hover:bg-green-700 text-white shadow-md hover:shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Processing Payment...
            </>
          ) : priceInKES ? (
            <>
              📱 Pay with M-Pesa KES {priceInKES.toLocaleString()}
              <span className="text-xs ml-2 opacity-75">
                (${selectedTicket.price})
              </span>
            </>
          ) : (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Loading price...
            </>
          )}
        </button>
      ) : (
        /* Paid ticket button */
        <button
          onClick={handleStripePayment}
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
            <>💳 Pay with Stripe ${selectedTicket.price}</>
          )}
        </button>
      )}
    </div>
  );
};

export default PaymentProcessor;
