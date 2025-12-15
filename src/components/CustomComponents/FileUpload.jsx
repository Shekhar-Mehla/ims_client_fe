import React, { useState } from "react";

const FileUpload = ({
  label = "Upload",
  name,
  accept = "",
  required = false,
  error,
  onChange,
}) => {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const f = e.target.files && e.target.files[0];
    setFileName(f ? f.name : "");
    if (onChange) onChange(e);
  };

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        type="file"
        name={name}
        accept={accept}
        onChange={handleChange}
        className="block"
      />

      {fileName && <p className="text-xs text-slate-500">{fileName}</p>}

      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default FileUpload;
