import React from "react";
import { useState } from "react";

const handleInputChange = ({ e, form, setForm, errors, setErrors }) => {
  const { name, value, type, checked } = e.target;

  setForm({
    ...form,
    [name]: type === "checkbox" ? checked : value,
  });

  // Clear error for this field when user starts typing
  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};

// Handle file input changes
const handleFileChange = ({ e, form, setForm, errors, setErrors }) => {
  const { name, files } = e.target;

  setForm({
    ...form,
    [name]: files[0] || null,
  });
  // Clear error for this field
  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};
const UseForm = (initialState) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  return {
    handleInputChange: (e) =>
      handleInputChange({
        e,
        form,
        setForm,
        errors,
        setErrors,
      }),
    form,
    setForm,
    handleFileChange: (e) =>
      handleFileChange({
        e,
        form,
        setForm,
        errors,
        setErrors,
      }),
    errors,
    setErrors,
  };
};

export default UseForm;
