import { useState } from "react";
import PhoneInput from "react-phone-number-input";
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

export default function EventApplicationForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
        const response = await fetch(
          `https://events.igamingafrika.com/api/register/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${import.meta.env.VITE_PUBLIC_API_TOKEN}`,
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
        toast.error("Submission failed", { id: "submit-toast" });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className=" bg-gray-100 py-20 px-4 container mx-auto">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {" "}
        {/* Changed to min-h-[80vh] */}
        {/* Header */}
        <div className="bg-[#14a45c] px-8 py-6 h-[10vh] flex items-center justify-center">
          <h1 className="text-3xl font-bold text-white text-center">
            EXPRESS YOUR INTEREST
          </h1>
        </div>
        <div className="p-8 space-y-16">
          {/* Personal Information Section */}
          <h2 className="text-md md:text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
            PERSONAL INFORMATION
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <TextField
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <TextField
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Pronouns <span className="text-red-500">*</span>
              </label>
              <TextField
                fullWidth
                select
                label="Pronouns"
                name="gender"
                value={formData.gender || ""}
                onChange={handleInputChange}
                error={!!errors.gender}
                helperText={errors.gender}
                disabled={isSubmitting}
                variant="outlined"
                size="small"
              >
                <MenuItem value="">pronouns</MenuItem>
                <MenuItem value="he/him">he/him</MenuItem>
                <MenuItem value="she/her">she/her</MenuItem>
                <MenuItem value="they/them">they/them</MenuItem>
                <MenuItem value="prefer-not-to-say">Prefer Not to Say</MenuItem>
              </TextField>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Work Email <span className="text-red-500">*</span>
              </label>
              <TextField
                fullWidth
                type="email"
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex items-center border rounded-lg transition-colors ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
              >
                <PhoneInput
                  international
                  defaultCountry="KE"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(value) =>
                    setFormData((prev) => ({ ...prev, phone: value }))
                  }
                  className="flex-1 px-4 py-2 bg-white rounded-lg border-none focus:outline-none"
                  style={{
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                    border: "none",
                    width: "100%",
                  }}
                  disabled={isSubmitting}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Interests Section */}
          <div className="py-6 space-y-16 relative">
            <h2 className="text-md md:text-xl font-semibold text-gray-800 mb-4 pb-2 border-b-2 border-green-600">
              PARTICIPATION INTERESTS
            </h2>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select your interests <span className="text-red-500">*</span>
            </label>
            <FormControl
              fullWidth
              size="small"
              error={!!errors.interests}
              disabled={isSubmitting}
            >
              <InputLabel id="interests-label">
                Select your interests <span style={{ color: "red" }}>*</span>
              </InputLabel>

              <Select
                labelId="interests-label"
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
