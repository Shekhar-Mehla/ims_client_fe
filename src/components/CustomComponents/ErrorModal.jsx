import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, X } from "lucide-react";

const ErrorModal = ({ showModal, onClose, errorDetails, navigate }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              {errorDetails.title}
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center py-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Oops!</h3>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {errorDetails.message}
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => {
                  onClose();
                  if (errorDetails.title === "Session Expired") {
                    navigate("/login");
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {errorDetails.title === "Session Expired" ? "Go to Login" : "Try Again"}
              </Button>
              <Button onClick={onClose} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
