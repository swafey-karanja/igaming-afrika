import { useState } from "react";
import Header from "../components/Header";
import Breadcrumb from "../components/utils/Breadcrumb";
import { useTranslation } from "react-i18next";
import TextInput from "../components/utils/TextInput";
import PhoneInputWrapper from "../components/utils/PhoneInputWrapper";
import Checkbox from "../components/utils/Checkbox";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

export default function Registration() {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    privacyPolicy: false,
    confirmAccuracy: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.privacyPolicy)
      newErrors.privacyPolicy = "You must accept the privacy policy";
    if (!formData.confirmAccuracy)
      newErrors.confirmAccuracy =
        "You must confirm the information is accurate";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await fetch("http://localhost:4001/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Optional: Show success message here

      // Delay reset
      setTimeout(() => {
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          phone: "",
          privacyPolicy: false,
          confirmAccuracy: false,
        });
        setIsSubmitting(false);
      }, 1500); // 1.5 second delay
      toast.success("Registration successful!");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false); // Fail fast
      toast.error("Something went wrong");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="w-full bg-gray-100">
      <Header />
      <div className="py-6 w-full bg-gray-100 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <h2 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-green-700 to-green-600 bg-clip-text text-transparent mb-2">
              REGISTER FOR THE EVENT
            </h2>
          </div>
          <motion.div
            className="w-20 h-1 bg-gradient-to-r from-green-600 to-green-600 mx-auto rounded-full mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>
        <Breadcrumb />
        <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold text-gray-900">
                {t("personal_information")}
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                {t("permanent_address_note")}
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <TextInput
                  id="first-name"
                  name="firstName"
                  label={t("first_name")}
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={errors.firstName}
                />

                <TextInput
                  id="last-name"
                  name="lastName"
                  label={t("last_name")}
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={errors.lastName}
                />

                <TextInput
                  id="email"
                  name="email"
                  label={t("email_address")}
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                />

                <TextInput
                  id="company"
                  name="company"
                  label="Company name"
                  autoComplete="company"
                  value={formData.company}
                  onChange={handleChange}
                  error={errors.company}
                />

                <PhoneInputWrapper
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />

                <div className="sm:col-span-6 space-y-4">
                  <Checkbox
                    id="privacyPolicy"
                    name="privacyPolicy"
                    label="I accept the privacy policy"
                    checked={formData.privacyPolicy}
                    onChange={handleChange}
                  />
                  {errors.privacyPolicy && (
                    <p className="text-sm text-red-600">
                      {errors.privacyPolicy}
                    </p>
                  )}

                  <Checkbox
                    id="confirmAccuracy"
                    name="confirmAccuracy"
                    label="I confirm the information provided is accurate"
                    checked={formData.confirmAccuracy}
                    onChange={handleChange}
                  />
                  {errors.confirmAccuracy && (
                    <p className="text-sm text-red-600">
                      {errors.confirmAccuracy}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold text-gray-900 cursor-pointer"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? t("submitting") : t("save")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
