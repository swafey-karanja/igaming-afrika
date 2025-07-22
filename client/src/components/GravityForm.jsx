import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const GravityForm = () => {
  const [formData, setFormData] = useState({
    input_8: "", // First Name
    input_9: "", // Last Name
    input_3: "", // Company Name
    input_4: "", // Phone Number
    input_5: "", // Work Email
    "input_7[]": [], // Interests
  });

  // eslint-disable-next-line no-unused-vars
  const [status, setStatus] = useState(null);
  const [isInterestsOpen, setIsInterestsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const interestsOptions = [
    "Interested in Speaking",
    "Interested in Sponsoring",
    "Interested in Exhibiting",
    "Interested in Attending",
    "Interested in Being a Media Partner",
  ];

  const handleChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === "select-multiple") {
      const values = Array.from(selectedOptions, (option) => option.value);
      setFormData({ ...formData, [name]: values });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, input_4: value || "" });
  };

  const handleInterestToggle = (interest) => {
    const currentInterests = formData["input_7[]"];
    const updatedInterests = currentInterests.includes(interest)
      ? currentInterests.filter((item) => item !== interest)
      : [...currentInterests, interest];

    setFormData({ ...formData, "input_7[]": updatedInterests });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    setIsSubmitting(true);
    toast.loading("Submitting your application...", { id: "submit-toast" });

    // Validate that at least one field is filled
    const hasData = Object.values(formData).some((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value && value.trim() !== "";
    });

    if (!hasData) {
      setStatus("error");
      toast.error("Please fill at least one field", { id: "submit-toast" });
      setIsSubmitting(false);
      return;
    }

    // Format the payload correctly for Gravity Forms
    const payload = {
      ...formData,
      // Convert the interests array to the format Gravity Forms expects
      input_7: formData["input_7[]"], // Remove the [] from the key
    };

    // Remove the original array key to avoid conflicts
    delete payload["input_7[]"];

    console.log("Submitting form data:", payload);

    try {
      const res = await axios.post(
        "https://igamingafrika.com/wp-json/gf/v2/forms/1/submissions",
        payload, // Send the data directly, not wrapped in input_values
        {
          headers: {
            "Content-Type": "application/json",
          },
          auth: {
            username: `${import.meta.env.VITE_API_USERNAME}`,
            password: `${import.meta.env.VITE_API_PASSWORD}`,
          },
        }
      );

      setStatus("success");
      toast.success("Registration details submitted successfully!", {
        id: "submit-toast",
      });
      console.log("Form submitted successfully:", res.data);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          input_8: "",
          input_9: "",
          input_3: "",
          input_4: "",
          input_5: "",
          "input_7[]": [],
        });
      }, 1500);
    } catch (error) {
      setStatus("error");
      toast.error("Something went wrong. Please try again.", {
        id: "submit-toast",
      });
      if (error.response) {
        console.error("Error Response Data:", error.response.data);
        console.error("Error Status:", error.response.status);
      }
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedInterestsText = () => {
    if (formData["input_7[]"].length === 0) return "Please Select";
    if (formData["input_7[]"].length === 1) {
      return formData["input_7[]"][0];
    }
    return `${formData["input_7[]"].length} options selected`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[90vh]">
          {/* Header */}
          <div className="bg-[#14a45c] px-8 py-6 h-[10vh] flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white text-center">
              EXPRESS YOUR INTEREST
            </h1>
          </div>

          <div className="p-8 space-y-16">
            {/* Personal Information Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
                PERSONAL INFORMATION
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="input_8"
                    value={formData["input_8"]}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-1 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="input_9"
                    value={formData["input_9"]}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-1 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isSubmitting}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="input_3"
                    value={formData["input_3"]}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-1 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <PhoneInput
                    international
                    defaultCountry="KE"
                    value={formData.input_4}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                    className="phone-input-custom"
                    placeholder="Enter phone number"
                  />
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="input_5"
                  value={formData["input_5"]}
                  onChange={handleChange}
                  placeholder="e.g. john.doe@company.com"
                  className="w-full px-4 py-1 border border-gray-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  disabled={isSubmitting}
                  required
                />
              </div>
            </div>

            {/* Participation Interests Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
                PARTICIPATION INTERESTS
              </h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select your interests <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsInterestsOpen(!isInterestsOpen)}
                    disabled={isSubmitting}
                    className={`w-full px-4 py-1 border border-gray-300 rounded-lg text-left transition-colors flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                      isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <span
                      className={
                        formData["input_7[]"].length === 0
                          ? "text-gray-400"
                          : "text-gray-700"
                      }
                    >
                      {getSelectedInterestsText()}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        isInterestsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isInterestsOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {interestsOptions.map((option, index) => (
                        <label
                          key={index}
                          className={`flex items-center px-4 py-1 hover:bg-gray-50 cursor-pointer ${
                            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                                formData["input_7[]"].includes(option)
                                  ? "bg-green-600 border-green-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {formData["input_7[]"].includes(option) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="ml-3 text-sm text-gray-700">
                              {option}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData["input_7[]"].includes(option)}
                            onChange={() => handleInterestToggle(option)}
                            disabled={isSubmitting}
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="text-sm text-gray-600 mb-4">
              iGaming AFRIKA Summit needs the contact information you provide to
              us to contact you about our products and services. You may
              unsubscribe from these communications at any time. For information
              on how to unsubscribe, as well as our privacy practices and
              commitment to protecting your privacy, check out our{" "}
              <a
                href="https://igamingafrika.com/privacy-policy-events/"
                className="text-green-600 hover:text-green-700 underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{" "}
              and{" "}
              <a
                href="https://igamingafrika.com/terms-and-conditions-events/ "
                className="text-green-600 hover:text-green-700 underline cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>
              .
            </div>

            <div className="flex items-start space-x-2 text-sm text-gray-600 mb-4">
              <input
                type="checkbox"
                id="terms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-1"
              />
              <label htmlFor="terms" className="select-none">
                I agree to the{" "}
                <a
                  href="https://igamingafrika.com/terms-and-conditions-events/"
                  className="text-green-600 hover:text-green-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="https://igamingafrika.com/privacy-policy-events/"
                  className="text-green-600 hover:text-green-700 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting || !acceptedTerms}
                className={`w-full md:w-[20vw] bg-[#14a45c] text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  isSubmitting || !acceptedTerms
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting ? "SUBMITTING..." : "APPLY NOW"}
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .phone-input-custom .PhoneInputInput {
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            padding: 0.25rem 1rem;
            width: 100%;
            transition: border-color 0.2s, box-shadow 0.2s;
          }

          .phone-input-custom .PhoneInputInput:focus {
            outline: none;
            border-color: transparent;
            box-shadow: 0 0 0 2px #10b981;
          }

          .phone-input-custom .PhoneInputCountrySelect {
            border: 1px solid #d1d5db;
            border-radius: 0.5rem 0 0 0.5rem;
            border-right: none;
            background-color: #f9fafb;
            padding: 0.25rem 0.5rem;
          }

          .phone-input-custom .PhoneInputCountrySelect:focus {
            outline: none;
            border-color: #10b981;
            box-shadow: 0 0 0 2px #10b981;
          }

          .phone-input-custom .PhoneInputCountrySelectArrow {
            color: #6b7280;
          }
        `}</style>
      </div>
    </div>
  );
};

export default GravityForm;
