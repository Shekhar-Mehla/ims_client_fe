import React from "react";
import { Label } from "@/components/ui/label";
import ReviewSummary from "./ReviewSummary";

const ReviewStep = ({ form, handleInputChange, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">
        Review Your Application
      </h3>

      <div className="bg-blue-50 p-6 rounded-lg text-center">
        <h4 className="font-semibold text-blue-900 mb-2">
          Please Review Your Information
        </h4>
        <p className="text-blue-800 text-sm leading-relaxed">
          Please review all the information you entered in the previous steps.
          Make sure all details are accurate before submitting your application.
        </p>
      </div>

      <div className="bg-amber-50 p-4 rounded-lg">
        <h4 className="font-semibold text-amber-900 mb-2">Important Notes:</h4>
        <ul className="text-amber-800 text-sm space-y-1">
          <li>
            • Ensure your resume is up-to-date and relevant to this internship
          </li>
          <li>• Double-check your contact information</li>
          <li>• Verify your availability dates</li>
          <li>
            • Make sure your motivation statement is specific to this role
          </li>
        </ul>
      </div>

      <ReviewSummary form={form} />

      <div className="flex items-start gap-2 p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
        <input
          type="checkbox"
          id="agreeTerms"
          name="agreeTerms"
          checked={form?.agreeTerms || false}
          onChange={handleInputChange}
          required
          className="mt-1"
        />
        <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
          I agree to the terms and conditions and confirm that all information
          provided is accurate and truthful.
          <span className="text-red-500 ml-1">*</span>
        </Label>
      </div>
      {errors?.agreeTerms && (
        <p className="text-xs text-red-600">{errors.agreeTerms}</p>
      )}
    </div>
  );
};

export default ReviewStep;
