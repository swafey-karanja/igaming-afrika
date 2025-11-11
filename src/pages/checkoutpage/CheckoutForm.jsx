import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { TextField, MenuItem, Checkbox, FormControlLabel } from "@mui/material";

const CheckoutForm = ({ formData, handleInputChange }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-green-600 font-semibold text-sm">1</span>
        </div>
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        {["firstName", "lastName", "email", "company", "jobTitle"].map(
          (field) => (
            <div key={field}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                {["firstName", "lastName", "email"].includes(field) && (
                  <span className="text-red-500">*</span>
                )}
              </label>
              <TextField
                type={field === "email" ? "email" : "text"}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={handleInputChange}
                required={["firstName", "lastName", "email"].includes(field)}
                fullWidth
                variant="outlined"
                size="small"
              />
            </div>
          )
        )}

        {/* Custom PhoneInput field */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone number <span className="text-red-500">*</span>
          </label>
          <div className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent">
            <PhoneInput
              international
              defaultCountry="KE"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(value) =>
                handleInputChange({ target: { name: "phone", value } })
              }
              style={{
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                outline: "none",
                width: "100%",
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Country <span className="text-red-500">*</span>
          </label>
          <TextField
            select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            required
            fullWidth
            variant="outlined"
            size="small"
          >
            <MenuItem value="">Select Country</MenuItem>
            <MenuItem value="Nigeria">Nigeria</MenuItem>
            <MenuItem value="Kenya">Kenya</MenuItem>
            <MenuItem value="South Africa">South Africa</MenuItem>
            <MenuItem value="Ghana">Ghana</MenuItem>
            <MenuItem value="Uganda">Uganda</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </div>
      </div>

      <FormControlLabel
        control={
          <Checkbox
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleInputChange}
            required
            sx={{
              color: "rgb(22, 163, 74)",
              "&.Mui-checked": {
                color: "rgb(22, 163, 74)",
              },
            }}
          />
        }
        label={
          <span className="text-sm text-gray-600">
            I agree to the{" "}
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
          </span>
        }
        className="mt-4"
      />
    </motion.div>
  );
};

export default CheckoutForm;
