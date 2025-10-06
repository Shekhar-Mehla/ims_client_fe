import React from "react";
import { useState } from "react";

const handleOnChange = (e, setForm, form) => {
  const { name, value } = e.target;
  console.log(name, value);
  return setForm({ ...form, [name]: value });
};

const UseForm = () => {
  const initialState = {};
  const [form, setForm] = useState(initialState);
  console.log(form);

  return {
    handleOnChange: (e) => handleOnChange(e, setForm, form),
    form,
    setForm,
  };
};

export default UseForm;
