import { useState } from "react";
import { ChevronRight, ChevronLeft, Check } from "lucide-react";
import { MuiTelInput } from "mui-tel-input";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  TextField,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  FormHelperText,
  TextareaAutosize,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
} from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import { companyTypes } from "../data/data";
import { fetchCSRFToken } from "../services/api";
import { toast } from "react-hot-toast";

const participationTypes = [
  { id: "conference-speaker", label: "Conference Speaker" },
  { id: "podcast-participation", label: "Podcast Participation" },
];

// Reusable Components
const FormField = ({ label, required, htmlFor, children }) => (
  <div>
    <label
      htmlFor={htmlFor}
      className="block text-sm font-semibold text-gray-700 mb-2"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const TextInput = ({
  name,
  label,
  value,
  onChange,
  error,
  helperText,
  placeholder,
  disabled,
  type = "text",
  required = false,
  autoComplete,
}) => {
  const fieldId = `${name}-input`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <TextField
        fullWidth
        id={fieldId}
        type={type}
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={!!error}
        helperText={helperText}
        placeholder={placeholder}
        disabled={disabled}
        variant="outlined"
        size="small"
        required={required}
        autoComplete={autoComplete}
        inputProps={{
          id: fieldId,
          name: name,
          autoComplete: autoComplete,
        }}
      />
    </FormField>
  );
};

const PhoneInput = ({
  label,
  value,
  onChange,
  disabled,
  required = false,
  defaultCountry = "KE",
  name = "phone",
}) => {
  const fieldId = `${name}-input`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <MuiTelInput
        id={fieldId}
        value={value}
        onChange={onChange}
        disabled={disabled}
        defaultCountry={defaultCountry}
        name={name}
        inputProps={{
          id: fieldId,
          name: name,
          autoComplete: "tel",
        }}
        sx={{
          minWidth: "100%",
          "& .MuiOutlinedInput-input": {
            padding: "8.5px 14px",
          },
        }}
      />
    </FormField>
  );
};

const RadioGroupField = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  const fieldId = `${name}-group`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <FormControl component="fieldset">
        <RadioGroup
          id={fieldId}
          aria-labelledby={`${name}-label`}
          name={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio id={`${name}-${option.value}`} name={name} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </FormField>
  );
};

const MultiSelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled,
  required = false,
}) => {
  const fieldId = `${name}-select`;
  const labelId = `${name}-label`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <FormControl fullWidth size="small" error={!!error} disabled={disabled}>
        <InputLabel id={labelId} htmlFor={fieldId}>
          {label}
        </InputLabel>
        <Select
          labelId={labelId}
          id={fieldId}
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label={label} id={fieldId} name={name} />}
          name={name}
          renderValue={(selected) =>
            selected.length === 0
              ? "Select a format"
              : selected
                  .map(
                    (id) => options.find((opt) => opt.id === id)?.label || id
                  )
                  .join(", ")
          }
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 48 * 4.5 + 8,
                width: 250,
              },
            },
          }}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              <Checkbox
                checked={value.includes(option.id)}
                id={`${name}-${option.id}-checkbox`}
                name={`${name}-${option.id}`}
              />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    </FormField>
  );
};

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  required = false,
  minRows = 5,
}) => {
  const fieldId = `${name}-textarea`;

  return (
    <FormField label={label} required={required} htmlFor={fieldId}>
      <TextareaAutosize
        id={fieldId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={label}
        minRows={minRows}
        style={{ width: "100%" }}
        className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:outline-none focus:ring-blue-500"
      />
    </FormField>
  );
};

const FileUploadField = ({
  label,
  onChange,
  multiple = false,
  name = "file-upload",
}) => {
  const fieldId = `${name}-input`;

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <FormField label={label} htmlFor={fieldId}>
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        htmlFor={fieldId}
      >
        Upload files
        <VisuallyHiddenInput
          id={fieldId}
          type="file"
          onChange={onChange}
          multiple={multiple}
          name={name}
        />
      </Button>
    </FormField>
  );
};

const PageHeader = ({ title, description }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
    <p className="text-md font-medium text-gray-600">{description}</p>
  </div>
);

const NavigationButtons = ({
  currentPage,
  onPrev,
  onNext,
  onSubmit,
  canProceed,
  isSubmitting,
  totalPages = 3,
}) => (
  <div className="flex justify-between mt-8 pt-6 border-t">
    <button
      type="button"
      onClick={onPrev}
      disabled={currentPage === 1}
      className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
        currentPage === 1
          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
          : "bg-green-500 text-white hover:bg-green-600"
      }`}
    >
      <ChevronLeft size={20} className="mr-2" />
      Back
    </button>

    {currentPage < totalPages ? (
      <button
        type="button"
        onClick={onNext}
        disabled={!canProceed}
        className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
          canProceed
            ? "bg-green-500 text-white hover:bg-green-600"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        Next
        <ChevronRight size={20} className="ml-2" />
      </button>
    ) : (
      <button
        type="submit"
        onClick={onSubmit}
        disabled={!canProceed || isSubmitting}
        className={`flex items-center px-6 py-2 rounded-lg font-medium transition-colors ${
          canProceed && !isSubmitting
            ? "bg-[#14a45c] text-white hover:bg-green-700"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        <Check size={20} className="mr-1" />
        Submit
      </button>
    )}
  </div>
);

// Main Form Component
export default function SpeakerForm() {
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    linkedin: "",
    companyName: "",
    role: "",
    websiteUrl: "",
    companyType: "",
    participationType: [],
    topicDescription: "",
    talkTitle: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (newValue) => {
    setFormData((prev) => ({
      ...prev,
      phone: newValue,
    }));
  };

  const handleMultiSelectChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]:
        typeof event.target.value === "string"
          ? event.target.value.split(",")
          : event.target.value,
    }));
  };

  const validatePage = (page) => {
    switch (page) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.email &&
          formData.phone
        );
      case 2:
        return formData.companyName && formData.role && formData.companyType;
      case 3:
        return (
          formData.participationType.length > 0 && formData.topicDescription
        );
      default:
        return false;
    }
  };

  const nextPage = () => {
    if (validatePage(currentPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.role.trim()) newErrors.role = "Your role is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.companyName.trim())
      newErrors.companyName = "Company name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const linkedInRegex =
      /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/;
    if (formData.linkedin && !linkedInRegex.test(formData.linkedin)) {
      newErrors.linkedin = "Please enter a valid LinkedIn profile URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    if (!validatePage(3)) return;

    try {
      const { csrf_token } = await fetchCSRFToken();
      console.log({ csrf_token });

      const response = await fetch(
        `${import.meta.env.VITE_PUBLIC_API_URL}speakers/become-a-speaker/`,
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
            linkedin: "",
            companyName: "",
            role: "",
            websiteUrl: "",
            companyType: "",
            participationType: [],
            topicDescription: "",
            talkTitle: "",
          });

          // Reset to first page
          setCurrentPage(1);
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
  };

  const handleNavigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="py-8 md:py-15 px-4 xl:container xl:mx-auto ">
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
          Speaker Registration
        </h1>
        <p className="text-gray-500 max-w-3xl text-xs md:text-[13px] font-semibold">
          Complete your registration as a speaker for iGaming AFRIKA Summit 2026
        </p>
      </div>

      <div className="lg:min-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            {/* Page 1: Personal Information */}
            {currentPage === 1 && (
              <div className="space-y-6">
                <PageHeader
                  title="Personal Information"
                  description="We'll use this information to reach out to you before the event. Your details will not be shared externally."
                />

                <div className="grid lg:grid-cols-2 gap-4">
                  <TextInput
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    helperText={errors.firstName}
                    disabled={isSubmitting}
                    autoComplete="given-name"
                    required
                  />

                  <TextInput
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    helperText={errors.lastName}
                    disabled={isSubmitting}
                    autoComplete="family-name"
                    required
                  />

                  <TextInput
                    name="email"
                    label="Work Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    helperText={errors.email}
                    placeholder="e.g. john.doe@company.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                    required
                  />

                  <PhoneInput
                    name="phone"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    disabled={isSubmitting}
                    required
                  />
                </div>

                <TextInput
                  name="linkedin"
                  label="LinkedIn Profile"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  error={errors.linkedin}
                  helperText={errors.linkedin}
                  placeholder="e.g. https://www.linkedin.com/in/yourprofile"
                  disabled={isSubmitting}
                  autoComplete="url"
                />
              </div>
            )}

            {/* Page 2: Organization Details */}
            {currentPage === 2 && (
              <div className="space-y-6">
                <PageHeader
                  title="Company Details"
                  description="This helps us understand your professional context. We often match speakers with themes or partners from similar sectors."
                />

                <TextInput
                  name="companyName"
                  label="Company Name"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  error={errors.companyName}
                  helperText={errors.companyName}
                  disabled={isSubmitting}
                  autoComplete="organization"
                  required
                />

                <TextInput
                  name="role"
                  label="Your Role/Title"
                  value={formData.role}
                  onChange={handleInputChange}
                  error={errors.role}
                  helperText={errors.role}
                  disabled={isSubmitting}
                  autoComplete="organization-title"
                  required
                />

                <TextInput
                  name="websiteUrl"
                  label="Website URL"
                  value={formData.websiteUrl}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  autoComplete="url"
                />

                <RadioGroupField
                  label="Company Type"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleInputChange}
                  options={companyTypes}
                  required
                />
              </div>
            )}

            {/* Page 3: Speaking Topic */}
            {currentPage === 3 && (
              <div className="space-y-6">
                <PageHeader
                  title="What would you like to speak about?"
                  description="We're looking for original, insightful, and valuable topics that resonate with our audience."
                />

                <MultiSelectField
                  label="Type of Participation"
                  name="participationType"
                  value={formData.participationType}
                  onChange={handleMultiSelectChange("participationType")}
                  options={participationTypes}
                  error={errors.participationType}
                  disabled={isSubmitting}
                  required
                />

                <TextInput
                  name="talkTitle"
                  label="Talk Title"
                  value={formData.talkTitle}
                  onChange={handleInputChange}
                  error={errors.talkTitle}
                  helperText={errors.talkTitle}
                  placeholder="e.g Reimagining gaming in Africa: Trends and Opportunities"
                  disabled={isSubmitting}
                  autoComplete="off"
                />

                <TextAreaField
                  label="Topic Description"
                  name="topicDescription"
                  value={formData.topicDescription}
                  onChange={handleInputChange}
                  placeholder="e.g An in-depth look at emerging trends in the African iGaming market, exploring new technologies, player behaviors, and regulatory changes shaping the industry's future."
                  disabled={isSubmitting}
                  required
                />

                <FileUploadField
                  label="Upload Supporting Files"
                  name="supportingFiles"
                  onChange={(event) => console.log(event.target.files)}
                  multiple
                />
              </div>
            )}

            <NavigationButtons
              currentPage={currentPage}
              onPrev={prevPage}
              onNext={nextPage}
              onSubmit={handleSubmit}
              canProceed={validatePage(currentPage)}
              isSubmitting={isSubmitting}
              totalPages={3}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
