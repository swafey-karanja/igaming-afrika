import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

export default function PhoneInputWrapper({ value, onChange, error }) {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="phone"
        className="block text-sm font-medium text-gray-900 ml-1"
      >
        Phone number
      </label>
      <div className="mt-2">
        <PhoneInput
          international
          defaultCountry="KE"
          id="phone"
          name="phone"
          value={value}
          onChange={(val) =>
            onChange({ target: { name: "phone", value: val } })
          }
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300
            placeholder:text-gray-400 focus:outline-none focus:ring-0 sm:text-sm ${
              error ? "border-red-500" : ""
            }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
