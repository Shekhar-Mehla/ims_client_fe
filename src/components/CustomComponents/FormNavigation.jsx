import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const FormNavigation = ({
  currentStep,
  totalSteps,
  handleBack,
  handleNext,
  isSubmitting
}) => {
  return (
    <div className="flex justify-between pt-6 border-t">
      {currentStep > 1 && (
        <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>
      )}

      {currentStep < totalSteps ? (
        <Button
          type="button"
          onClick={handleNext}
          className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      ) : (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="ml-auto flex items-center gap-2 bg-green-600 hover:bg-green-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </Button>
      )}
    </div>
  );
};

export default FormNavigation;
