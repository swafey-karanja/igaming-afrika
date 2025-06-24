import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "react-hot-toast";

export default function EventApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    interests: [],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const interestOptions = [
    { id: "speaking", label: "Interested in Speaking" },
    { id: "sponsoring", label: "Interested in Sponsoring" },
    { id: "exhibiting", label: "Interested in Exhibiting" },
    { id: "attending", label: "Interested in Attending" },
    { id: "media-partner", label: "Interested in Being a Media Partner" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleInterestToggle = (interestId) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (formData.interests.length === 0)
      newErrors.interests = "Please select at least one interest";

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setTimeout(() => {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              company: "",
              interests: [],
            });
          }, 1500);
          toast.success("Application submitted successfully!");
        } else {
          toast.error(data.message || "Submission failed");
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Submission failed");
      }
    }
  };

  const getSelectedInterestsText = () => {
    if (formData.interests.length === 0) return "Please Select";
    if (formData.interests.length === 1) {
      return interestOptions.find((opt) => opt.id === formData.interests[0])
        ?.label;
    }
    return `${formData.interests.length} options selected`;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden min-h-[90vh]">
          {" "}
          {/* Changed to min-h-[80vh] */}
          {/* Header */}
          <div className="bg-[#14a45c] px-8 py-6 h-[10vh] flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white text-center">
              REGISTER FOR THE EVENT
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-1 border rounded-lg  transition-colors ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your first name"
                    disabled
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-1 border rounded-lg  transition-colors ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your last name"
                    disabled
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-1 border rounded-lg  transition-colors ${
                      errors.company ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter your company name"
                    disabled
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex items-center border rounded-lg transition-colors ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <PhoneInput
                      defaultCountry="KE"
                      placeholder="+254 700 000 000"
                      value={formData.phone}
                      onChange={(value) =>
                        setFormData((prev) => ({ ...prev, phone: value }))
                      }
                      className="flex-1 px-4 py-1 bg-white rounded-lg border-none focus:outline-none"
                      style={{
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        border: "none",
                        width: "100%",
                      }}
                      disabled
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Work email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-1 border rounded-lg  transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g. john.doe@company.com"
                  disabled
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>
            {/* Interests Section */}
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
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-4 py-1 border rounded-lg text-left  transition-colors flex items-center justify-between ${
                      errors.interests ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <span
                      className={
                        formData.interests.length === 0
                          ? "text-gray-400"
                          : "text-gray-700"
                      }
                    >
                      {getSelectedInterestsText()}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                      {interestOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center px-4 py-1 hover:bg-gray-50 cursor-pointer"
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                                formData.interests.includes(option.id)
                                  ? "bg-green-600 border-green-600"
                                  : "border-gray-300"
                              }`}
                            >
                              {formData.interests.includes(option.id) && (
                                <Check className="h-3 w-3 text-white" />
                              )}
                            </div>
                            <span className="ml-3 text-sm text-gray-700">
                              {option.label}
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            className="hidden"
                            checked={formData.interests.includes(option.id)}
                            onChange={() => handleInterestToggle(option.id)}
                            disabled
                          />
                        </label>
                      ))}
                    </div>
                  )}
                </div>
                {errors.interests && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.interests}
                  </p>
                )}
              </div>
            </div>
            {/* Terms */}
            <div className="text-sm text-gray-600">
              By continuing, you agree to our{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 underline"
              >
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-green-600 hover:text-green-700 underline"
              >
                Privacy Policy
              </a>
              .
            </div>
            {/* Submit Button */}
            <div className="flex items-center justify-center">
              <button
                onClick={handleSubmit}
                disabled
                className="w-full md:w-[20vw] bg-[#14a45c] text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                APPLY NOW
              </button>
            </div>
            <p className="font-bold text-red-600 text-xl md:text-2xl flex text-center justify-center">
              Registrations will be opened soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
