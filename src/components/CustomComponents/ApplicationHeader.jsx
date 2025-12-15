import React from "react";

const ApplicationHeader = ({ internship }) => {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
        <span className="text-white font-bold text-xl md:text-2xl">P</span>
      </div>
      <div>
        <h1 className="text-lg md:text-2xl font-bold text-slate-800">
          {internship?.title || "Internship Application"}
        </h1>
        <p className="text-xs md:text-sm text-slate-600 mt-1">
          {internship?.company || "Company Name"}
        </p>
      </div>
    </div>
  );
};

export default ApplicationHeader;
