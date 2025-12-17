import { useState } from "react";
import PhoneInput from "react-phone-number-input";
import { MuiTelInput } from "mui-tel-input";
import "react-phone-number-input/style.css";
import { toast } from "react-hot-toast";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  TextField,
} from "@mui/material";
import FormHelperText from "@mui/material/FormHelperText";
import { fetchCSRFToken } from "../../services/api";
import { IoIosArrowBack } from "react-icons/io";

export default function EventApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    pronouns: "",
    company: "",
    interests: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const interestOptions = [
    { id: "speaking", label: "Interested in Speaking" },
    { id: "sponsoring", label: "Interested in Sponsoring" },
    { id: "exhibiting", label: "Interested in Exhibiting" },
    { id: "attending", label: "Interested in Attending" },
    { id: "media-partner", label: "Interested in Being a Media Partner" },
  ];

  const pronouns = ["he/him", "she/her", "they/them", "prefer-not-to-say"];

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

  const handlePronounChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      pronouns: event.target.value,
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
      setIsSubmitting(true);
      toast.loading("Submitting your application...", { id: "submit-toast" });

      try {
        const { csrf_token } = await fetchCSRFToken();
        console.log({ csrf_token });

        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}register/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-CSRF-Token": csrf_token,
            },
            body: JSON.stringify(formData),
          }
        );

        let data = null;
        const text = await response.text(); // safer first step

        try {
          data = text ? JSON.parse(text) : null;
        } catch (jsonError) {
          console.warn("Failed to parse JSON response:", jsonError);
        }

        if (response.ok) {
          toast.success("Application submitted successfully!", {
            id: "submit-toast",
          });
          setTimeout(() => {
            setFormData({
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              pronouns: "",
              company: "",
              interests: [],
            });
          }, 1500);
        } else {
          toast.error(data?.message || "Submission failed", {
            id: "submit-toast",
          });
        }
      } catch (error) {
        console.error("Submission error:", error);
        toast.error("Submission failed. Try Again", { id: "submit-toast" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className=" bg-gray-100 py-20 px-4 container mx-auto">
      <div className="mb-8">
        <button
          onClick={handleNavigateHome}
          className="flex items-center text-green-600 hover:text-green-700 mb-4 transition-colors font-bold cursor-pointer"
        >
          <span className="mr-2 font-bold">
            <IoIosArrowBack />
          </span>
          Back to home page
        </button>
        <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent py-2">
          Express your Interest
        </h1>
        <p className="text-gray-500 max-w-3xl text-xs md:text-[13px] font-semibold">
          Register your interest for iGaming AFRIKA Summit 2026
        </p>
      </div>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {" "}
        {/* Changed to min-h-[80vh] */}
        {/* Header */}
        {/* <div className="bg-[#14a45c] px-8 py-6 h-[10vh] flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white text-center">
            EXPRESS YOUR INTEREST
          </h1>
        </div> */}
        <div className="p-8 space-y-16">
          {/* Personal Information Section */}
          <h2 className="text-md md:text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
            PERSONAL INFORMATION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="firstName-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <TextField
                id="firstName-input"
                fullWidth
                label={
                  <span>
                    First name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                placeholder="first name"
                disabled={isSubmitting}
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <label
                htmlFor="lastName-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <TextField
                id="lastName-input"
                fullWidth
                label={
                  <span>
                    Last name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                placeholder="last name"
                disabled={isSubmitting}
                variant="outlined"
                size="small"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="pronouns-select"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Pronouns <span className="text-red-500">*</span>
              </label>

              <FormControl fullWidth sx={{ minWidth: 120 }} size="small">
                <InputLabel id="pronouns-select-label">Pronouns</InputLabel>
                <Select
                  labelId="pronouns-select-label"
                  id="pronouns-select"
                  value={formData.pronouns}
                  label="Pronouns"
                  onChange={handlePronounChange}
                  input={<OutlinedInput label="Pronouns" />}
                >
                  <MenuItem value="">
                    <em>Select pronouns</em>
                  </MenuItem>
                  {pronouns.map((pronoun) => (
                    <MenuItem key={pronoun} value={pronoun}>
                      {pronoun === "prefer-not-to-say"
                        ? "Prefer not to say"
                        : pronoun}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div>
              <label
                htmlFor="email-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Work Email <span className="text-red-500">*</span>
              </label>
              <TextField
                fullWidth
                type="email"
                id="email-input"
                label={
                  <span>
                    Work email <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
                placeholder="e.g. john.doe@company.com"
                disabled={isSubmitting}
                variant="outlined"
                size="small"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="company-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Company Name <span className="text-red-500">*</span>
              </label>
              <TextField
                fullWidth
                label={
                  <span>
                    Company name <span style={{ color: "red" }}>*</span>
                  </span>
                }
                name="company"
                id="company-input"
                value={formData.company}
                onChange={handleInputChange}
                error={!!errors.company}
                helperText={errors.company}
                placeholder="company name"
                disabled={isSubmitting}
                variant="outlined"
                size="small"
              />
            </div>
            <div>
              <label
                htmlFor="phone-input"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border rounded-lg transition-colors ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              >
                <MuiTelInput
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phone: value }))
                  }
                  disabled={isSubmitting}
                  international="true"
                  defaultCountry="KE"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="py-6 space-y-16 relative">
            <h2 className="text-md md:text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
              PARTICIPATION INTERESTS
            </h2>

            <label
              htmlFor="interests-select"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Select your interests <span className="text-red-500">*</span>
            </label>
            <FormControl
              fullWidth
              size="small"
              error={!!errors.interests}
              disabled={isSubmitting}
            >
              <InputLabel id="interests-select-label">
                Select your interests <span style={{ color: "red" }}>*</span>
              </InputLabel>

              <Select
                labelId="interests-select-label"
                id="interests-select"
                multiple
                value={formData.interests}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    interests:
                      typeof event.target.value === "string"
                        ? event.target.value.split(",")
                        : event.target.value,
                  }))
                }
                input={<OutlinedInput label="Select your interests" />}
                renderValue={(selected) =>
                  selected.length === 0
                    ? "Select your interests"
                    : selected
                        .map(
                          (id) =>
                            interestOptions.find((opt) => opt.id === id)
                              ?.label || id
                        )
                        .join(", ")
                }
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8,
                      width: 200,
                    },
                  },
                }}
              >
                {interestOptions.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    <Checkbox
                      checked={formData.interests.includes(option.id)}
                    />
                    <ListItemText primary={option.label} />
                  </MenuItem>
                ))}
              </Select>

              {errors.interests && (
                <FormHelperText>{errors.interests}</FormHelperText>
              )}
            </FormControl>

            {/* Submit Button */}
            <div className="flex flex-col items-center justify-center space-y-10 py-6">
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
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`w-full md:w-[20vw] bg-[#14a45c] text-white font-semibold py-4 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 transform hover:scale-105 shadow-lg ${
                  isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? "SUBMITTING..." : "APPLY NOW"}
              </button>
            </div>
          </div>
          {/* Terms */}
        </div>
      </div>
    </div>
  );
}
