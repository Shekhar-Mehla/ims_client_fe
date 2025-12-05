import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyEmail } from "../../features/user/userapi";
import { toast } from "react-toastify";

const VarifyUser = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const token = searchParams.get("token");



  useEffect(() => {
    const verifyUserEmail = async () => {
      console.log("Starting email verification process...");

      if (!token) {
        console.log("No token found, showing error");
        setVerificationStatus("error");
        setIsLoading(false);
        toast.error("Verification token is missing");
        return;
      }

      try {
        console.log("Making API call to verify email...");
        setIsLoading(true);

        console.log(token);
        // Add minimum loading time for better UX (1 second minimum)
        const startTime = Date.now();
        const response = await verifyEmail(token);
        const elapsedTime = Date.now() - startTime;
        const minimumLoadingTime = 1000; // 1 second

        console.log(
          "API response received:",
          response,
          "Elapsed time:",
          elapsedTime + "ms"
        );

        if (elapsedTime < minimumLoadingTime) {
          console.log("Waiting for minimum loading time...");
          await new Promise((resolve) =>
            setTimeout(resolve, minimumLoadingTime - elapsedTime)
          );
        }

        if (response?.status === "success") {
          console.log("Verification successful");
          setVerificationStatus("success");
          toast.success("Email verified successfully!");
        } else {
          console.log("Verification failed:", response?.message);
          setVerificationStatus("error");
          toast.error(response?.message || "Email verification failed");
        }
      } catch (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        toast.error("An error occurred during verification");
      } finally {
        console.log("Setting loading to false");
        setIsLoading(false);
      }
    };

    verifyUserEmail();
  }, [token]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="relative">
              <Loader2 className="h-20 w-20 text-blue-500 animate-spin" />
              <div className="absolute inset-0 rounded-full border-4 border-blue-100 animate-pulse"></div>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Verifying Your Email...
            </h2>
            <p className="text-gray-600 text-lg">
              Please wait while we verify your email address.
            </p>
            <div className="flex justify-center mt-4">
              <div className="animate-bounce">
                <div className="w-2 h-2 bg-blue-500 rounded-full mx-1 inline-block"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full mx-1 inline-block animation-delay-200"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full mx-1 inline-block animation-delay-400"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    switch (verificationStatus) {
      case "success":
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Email Verified Successfully!
              </h2>
              <p className="text-gray-600 mb-4">
                Your email has been verified. You can now access all features of
                your account.
              </p>
            </div>
            <div className="space-y-2">
              <Link to="/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Go to Login
                </Button>
              </Link>
              <p className="text-sm text-gray-500">
                You can now log in with your credentials.
              </p>
            </div>
          </div>
        );

      case "error":
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                Verification Failed
              </h2>
              <p className="text-gray-600 mb-4">
                We couldn't verify your email. The link may be expired or
                invalid.
              </p>
            </div>
            <div className="space-y-2">
              <Link to="/register">
                <Button variant="outline" className="w-full mr-2">
                  Register Again
                </Button>
              </Link>
              <Link to="/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Go to Login
                </Button>
              </Link>
              <p className="text-sm text-gray-500 mt-2">
                If you continue having issues, please contact support.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-700 mb-2">
                Invalid Request
              </h2>
              <p className="text-gray-600 mb-4">
                No verification token found. Please check your email for the
                verification link.
              </p>
            </div>
            <div className="space-y-2">
              <Link to="/register">
                <Button variant="outline" className="w-full mr-2">
                  Register Again
                </Button>
              </Link>
              <Link to="/login">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Go to Login
                </Button>
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-gray-800">
            Email Verification
          </CardTitle>
          <CardDescription>Confirming your email address</CardDescription>
        </CardHeader>
        <CardContent className="p-6">{renderContent()}</CardContent>
      </Card>
    </div>
  );
};

export default VarifyUser;
