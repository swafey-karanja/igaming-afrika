export default function TextInput({
  id,
  name,
  label,
  value,
  onChange,
  error,
  autoComplete,
}) {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-900 ml-1"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          name={name}
          type="text"
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 
              placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm ${
                error ? "border-red-500" : ""
              }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    </div>
  );
}
