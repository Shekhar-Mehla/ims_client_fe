import React from "react";
import { useFormStatus } from "react-dom";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/Button";

const Submit = ({ title, children, loadingText }) => {
  const { pending } = useFormStatus();
  const displayTitle = title || children || "Submit";
  const displayLoadingText = loadingText || `${displayTitle}...`;

  return (
    <Button
      type="submit"
      className={pending ? "bg-gray-700" : "bg-black"}
      disable={pending}
    >
      {pending ? (
        <div className="flex justify-center items-center gap-3">
          <Spinner className="h-6 w-6 text-blue-600"></Spinner>
          <span>{displayLoadingText}</span>
        </div>
      ) : (
        displayTitle
      )}
    </Button>
  );
};

export default Submit;
