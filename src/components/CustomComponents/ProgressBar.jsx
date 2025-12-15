import React from "react";
import { Check } from "lucide-react";

const ProgressBar = ({ currentStep = 1, totalSteps = 4 }) => {
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <nav aria-label="Application progress" className="w-full">
      <ol className="flex items-center">
        {steps.map((step, idx) => {
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isLast = idx === steps.length - 1;

          return (
            <li key={step} className="flex items-center w-full">
              <div className="flex items-center">
                <button
                  type="button"
                  aria-current={isCurrent ? "step" : undefined}
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full text-sm font-semibold focus:outline-none ${
                    isCompleted
                      ? "bg-green-600 text-white"
                      : isCurrent
                      ? "bg-blue-600 text-white ring-4 ring-blue-200/40 animate-pulse"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" aria-hidden />
                  ) : (
                    <span className="select-none">{step}</span>
                  )}
                </button>
              </div>

              {!isLast && (
                <div
                  className={`flex-1 h-1 mx-3 rounded ${
                    step < currentStep ? "bg-green-600" : "bg-slate-200"
                  }`}
                  aria-hidden
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default ProgressBar;
