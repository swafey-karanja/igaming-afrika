import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import CheckoutForm from "./CheckoutForm";
import PaymentProcessor from "./PaymentProcessor";
import OrderSummary from "./OrderSummary";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTicket, setSelectedTicket] = useState(null);
  // const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    country: "",
    agreeToTerms: false,
  });

  useEffect(() => {
    if (location.state?.selectedTicket) {
      setSelectedTicket(location.state.selectedTicket);
    } else {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // const validateForm = () => {
  //   const required = ["firstName", "lastName", "email", "phone", "country"];
  //   return required.every((field) => formData[field]) && formData.agreeToTerms;
  // };

  if (!selectedTicket) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-8 md:py-25 px-6 lg:px-8 xl:container xl:mx-auto ">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors font-bold cursor-pointer"
          >
            <span className="mr-2 font-bold">←</span> Back to tickets
          </button>
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent py-2">
            Checkout
          </h1>

          <p className="text-gray-500 max-w-3xl text-xs md:text-[13px] font-semibold">
            Complete your registration for iGaming AFRIKA Summit 2026
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <CheckoutForm
              formData={formData}
              handleInputChange={handleInputChange}
            />
          </div>

          <div className="lg:col-span-1">
            <OrderSummary selectedTicket={selectedTicket} />
            {/* <PaymentProcessor
              selectedTicket={selectedTicket}
              formData={formData}
              isProcessing={isProcessing}
              setIsProcessing={setIsProcessing}
              validateForm={validateForm}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
