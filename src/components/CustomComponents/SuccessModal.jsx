import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

const SuccessModal = ({ showModal, onClose, navigate }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Application Submitted!
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center py-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Your application has been submitted successfully. We'll review your
              application and get back to you soon.
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  onClose();
                  navigate("/");
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Go to Homepage
              </Button>
              <Button onClick={onClose} variant="outline" className="w-full">
                Stay Here
              </Button>
            </div>

            <p className="text-sm text-slate-500 mt-4">
              You can also check your application status from your profile page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
