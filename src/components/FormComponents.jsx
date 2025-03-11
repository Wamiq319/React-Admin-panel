import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const InputField = ({
  label,
  type = "text", // Default to "text" type
  placeholder,
  name,
  value,
  onChange,
  onBlur,
  error,
  touched,
  rows,
  cols,
  options = [], // Accept options as a prop
  className = "",
}) => {
  const renderInput = () => {
    switch (type) {
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            rows={rows}
            cols={cols}
            className="w-full p-2 border-2 border-orange-200 focus:outline-orange-500 rounded-md text-sm sm:text-base"
          />
        );

      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full cursor-pointer p-2 border-2 border-orange-200 bg-white text-slate-900 focus:outline-orange-500 focus:text-orange-500 rounded-md text-sm sm:text-base"
          >
            <option value="">{placeholder}</option>
            {options.map((option, index) => (
              <option
                key={index}
                value={option.value}
                className="bg-white hover:bg-orange-200"
              >
                {option.label}
              </option>
            ))}
          </select>
        );

      case "richtext": // Add case for React Quill
        return (
          <ReactQuill
            theme="snow"
            value={value}
            onChange={onChange}
            modules={{
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ align: [] }],
                ["link", "blockquote", "image"],
                ["clean"],
                ["hr"],
              ],
              clipboard: {
                matchVisual: false,
              },
            }}
            className="text-sm sm:text-base"
          />
        );

      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className="w-full p-2 border-2 border-orange-200 focus:outline-orange-500 rounded-md text-sm sm:text-base"
          />
        );
    }
  };

  return (
    <div className={`input-field mx-1 w-full ${className}`}>
      <label
        className="block font-bold text-orange-500 mb-2 text-sm sm:text-base"
        htmlFor={name}
      >
        {label}
      </label>
      {renderInput()}
      {touched && error && (
        <div className="error text-red-500 text-sm sm:text-base">{error}</div>
      )}
    </div>
  );
};
export const Button = ({
  text,
  onClick,
  type = "button", // Default type is "button"
  icon = null, // Optional icon prop
  className = "", // Allows additional classes for customization
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center font-bold text-xl sm:text-2xl text-slate-100 p-1 rounded-lg shadow-lg ${className}`}
    >
      {icon && <span className="mx-1">{icon}</span>}
      {text}
    </button>
  );
};
