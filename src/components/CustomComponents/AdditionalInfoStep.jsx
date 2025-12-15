import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FileUpload from "./FileUpload";

const AdditionalInfoStep = ({
  form,
  handleInputChange,
  handleFileChange,
  errors
}) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">
        Additional Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="startDate">
            Available Start Date<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="startDate"
            name="startDate"
            type="date"
            value={form?.startDate}
            onChange={handleInputChange}
            className={errors?.startDate ? "border-red-500" : ""}
          />
          {errors?.startDate && (
            <p className="text-xs text-red-600">{errors.startDate}</p>
          )}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="duration">
            Preferred Duration<span className="text-red-500 ml-1">*</span>
          </Label>
          <select
            id="duration"
            name="duration"
            value={form?.duration}
            onChange={handleInputChange}
            className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              errors?.duration ? "border-red-500" : "border-slate-300"
            }`}
          >
            <option value="">Select duration</option>
            <option value="1-month">1 Month</option>
            <option value="2-months">2 Months</option>
            <option value="3-months">3 Months</option>
            <option value="6-months">6 Months</option>
            <option value="flexible">Flexible</option>
          </select>
          {errors?.duration && (
            <p className="text-xs text-red-600">{errors.duration}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="expectedStipend">Expected Stipend (Monthly)</Label>
          <Input
            id="expectedStipend"
            name="expectedStipend"
            placeholder="10000 or Unpaid"
            value={form?.expectedStipend}
            onChange={handleInputChange}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="workMode">
            Work Mode<span className="text-red-500 ml-1">*</span>
          </Label>
          <select
            id="workMode"
            name="workMode"
            value={form?.workMode}
            onChange={handleInputChange}
            className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
              errors?.workMode ? "border-red-500" : "border-slate-300"
            }`}
          >
            <option value="">Select work mode</option>
            <option value="remote">Remote</option>
            <option value="office">Office</option>
            <option value="hybrid">Hybrid</option>
          </select>
          {errors?.workMode && (
            <p className="text-xs text-red-600">{errors.workMode}</p>
          )}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="whyThisInternship">
          Why do you want this internship?<span className="text-red-500 ml-1">*</span>
        </Label>
        <textarea
          id="whyThisInternship"
          name="whyThisInternship"
          placeholder="Tell us why you are interested in this internship..."
          rows={5}
          value={form?.whyThisInternship}
          onChange={handleInputChange}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors?.whyThisInternship
              ? "border-red-500"
              : "border-slate-300"
          }`}
        />
        <p className="text-xs text-slate-500">Minimum 50 characters required</p>
        {errors?.whyThisInternship && (
          <p className="text-xs text-red-600">{errors.whyThisInternship}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
        <textarea
          id="coverLetter"
          name="coverLetter"
          placeholder="Additional information you would like to share..."
          rows={4}
          value={form?.coverLetter || ""}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <FileUpload
        label="Resume"
        name="resume"
        accept=".pdf,.doc,.docx"
        required={true}
        error={errors?.resume}
        onChange={handleFileChange}
      />

      <FileUpload
        label="Portfolio (Optional)"
        name="portfolio"
        accept=".pdf,.zip"
        required={false}
        error={errors?.portfolio}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AdditionalInfoStep;
