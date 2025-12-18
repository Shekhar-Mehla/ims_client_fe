"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UseForm from "../hooks/UseForm";
import { applyForInternship } from "../features/application/applicationapi";
import { logoutAction, updateProfileAction } from "../features/user/useraction";

// Import refactored components
import ApplicationHeader from "../components/CustomComponents/ApplicationHeader";
import PersonalDetailsStep from "../components/CustomComponents/PersonalDetailsStep";
import EducationSkillsStep from "../components/CustomComponents/EducationSkillsStep";
import AdditionalInfoStep from "../components/CustomComponents/AdditionalInfoStep";
import ReviewStep from "../components/CustomComponents/ReviewStep";
import FormNavigation from "../components/CustomComponents/FormNavigation";
import SuccessModal from "../components/CustomComponents/SuccessModal";
import ErrorModal from "../components/CustomComponents/ErrorModal";
import ProgressBar from "../components/CustomComponents/ProgressBar";
import FileUpload from "../components/CustomComponents/FileUpload";
import { Check } from "lucide-react";

// const initialState = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   countryCode: "+91",
//   mobile: "",
//   gender: "",
//   dateOfBirth: "",
//   address: "",
//   city: "",
//   state: "",
//   pincode: "",
//   educationLevel: "",
//   institutionName: "",
//   degree: "",
//   fieldOfStudy: "",
//   graduationYear: "",
//   cgpa: "",
//   skills: "",
//   linkedinUrl: "",
//   portfolioUrl: "",
//   githubUrl: "",
//   startDate: "",
//   duration: "",
//   expectedStipend: "",
//   workMode: "",
//   whyThisInternship: "",
//   coverLetter: "",
//   agreeTerms: false,
// };

// Function to build initial state from user profile and internship data
const buildInitialState = (user, internship) => {
  // Extract mobile number and country code from user profile
  let mobile = "";
  let countryCode = user?.countryCode || "+91";

  if (user?.mobile) {
    // If mobile includes country code, extract it
    if (typeof user.mobile === "string" && user.mobile.startsWith("+")) {
      // Mobile number already includes country code
      const parts = user.mobile.split(" ");
      if (parts.length > 1) {
        countryCode = parts[0] || "+91";
        mobile = parts.slice(1).join("").trim();
      } else {
        // Try to extract country code from the beginning
        const match = user.mobile.match(/^(\+\d{1,3})(.+)$/);
        if (match) {
          countryCode = match[1];
          mobile = match[2].trim();
        } else {
          mobile = user.mobile;
        }
      }
    } else {
      // Mobile number without country code
      mobile = user.mobile.toString();
    }
  }

  // Extract duration from internship if available
  let duration = "";
  if (internship?.duration) {
    // Map common duration formats
    const durationMap = {
      "3 months": "3-months",
      "6 months": "6-months",
      "1 month": "1-month",
      "2 months": "2-months",
    };
    duration =
      durationMap[internship.duration.toLowerCase()] || internship.duration;
  }

  // Set default start date to 30 days from now
  const defaultStartDate = new Date();
  defaultStartDate.setDate(defaultStartDate.getDate() + 30);
  const formattedStartDate = defaultStartDate.toISOString().split("T")[0];

  // Extract email - check multiple possible locations in user object
  const email = user?.email || user?.userEmail || user?.authId?.email || "";

  return {
    firstName: user?.firstName || user?.fName || "",
    lastName: user?.lastName || user?.lName || "",
    email: email,
    countryCode: user?.countryCode || countryCode,
    mobile: mobile,
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    pincode: user?.pincode || "",
    educationLevel: user?.educationLevel || "",
    institutionName: user?.institutionName || "",
    degree: user?.degree || "",
    fieldOfStudy: user?.fieldOfStudy || "",
    graduationYear: user?.graduationYear || "",
    cgpa: user?.cgpa || "",
    skills: user?.skills || "",
    linkedinUrl: user?.linkedinUrl || "",
    portfolioUrl: user?.portfolioUrl || "",
    githubUrl: user?.githubUrl || "",
    startDate: formattedStartDate,
    duration: duration,
    expectedStipend: internship?.stipend || "",
    workMode: internship?.workMode || "",
    // Let the user write their own motivation; keep empty by default
    whyThisInternship: "",
    coverLetter: "",
    agreeTerms: false,
    // Resume and portfolio are file uploads, cannot be prefilled
    resume: null,
    portfolio: null,
  };
};

// Empty initial state - will be populated from user profile and internship
const emptyInitialState = {
  firstName: "",
  lastName: "",
  email: "",
  countryCode: "+91",
  mobile: "",
  gender: "",
  dateOfBirth: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  educationLevel: "",
  institutionName: "",
  degree: "",
  fieldOfStudy: "",
  graduationYear: "",
  cgpa: "",
  skills: "",
  linkedinUrl: "",
  portfolioUrl: "",
  githubUrl: "",
  startDate: "",
  duration: "",
  expectedStipend: "",
  workMode: "",
  whyThisInternship: "",
  coverLetter: "",
  agreeTerms: false,
  resume: null,
  portfolio: null,
};

const ApplicationFormPage = () => {
  const { slug } = useParams();
  const location = useLocation();
  const internshipId = location.state?.internshipId;
  const navigate = useNavigate();

  // Validate that we have the required internshipId
  useEffect(() => {
    if (!internshipId) {
      console.error("No internshipId found in navigation state");
      // Redirect back to internship page if no internshipId
      navigate(`/internship/${slug}`, { replace: true });
    }
  }, [internshipId, navigate, slug]);

  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const {
    form,
    setForm,
    handleInputChange,
    handleFileChange,
    errors,
    setErrors,
  } = UseForm(emptyInitialState);
  const internship = location.state?.internship;

  // Get user profile from Redux
  const user = useSelector((state) => state.userInfo?.users);
  const profileId = useSelector((state) => state.userInfo?.users?._id);
  const authId = useSelector((state) => state.userInfo?.users?.authId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({ title: "", message: "" });
  const hasPrefilledRef = useRef(false);

  const validateStep = (step) => {
    const stepErrors = {};

    if (step === 1) {
      if (!form.firstName) stepErrors.firstName = "First name is required";
      if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) {
        stepErrors.email = "Valid email is required";
      }
      if (!form.mobile || form.mobile.length < 10) {
        stepErrors.mobile = "Valid mobile number is required";
      }
      if (!form.gender) stepErrors.gender = "Gender is required";
      if (!form.dateOfBirth)
        stepErrors.dateOfBirth = "Date of birth is required";
      if (!form?.city?.trim()) stepErrors.city = "City is required";
    }

    if (step === 2) {
      if (!form?.educationLevel?.trim())
        stepErrors.educationLevel = "Education level is required";
      if (!form?.institutionName?.trim())
        stepErrors.institutionName = "Institution name is required";
      if (!form?.degree?.trim()) stepErrors.degree = "Degree is required";
      if (!form?.fieldOfStudy?.trim())
        stepErrors.fieldOfStudy = "Field of study is required";
      if (!form?.graduationYear?.trim())
        stepErrors.graduationYear = "Graduation year is required";
      if (!form?.skills?.trim()) stepErrors.skills = "Skills are required";
    }

    if (step === 3) {
      if (!form.startDate) stepErrors.startDate = "Start date is required";
      if (!form.duration) stepErrors.duration = "Duration is required";
      if (!form.workMode) stepErrors.workMode = "Work mode is required";
      if (!form.whyThisInternship || form.whyThisInternship.length < 50) {
        stepErrors.whyThisInternship = "Please write at least 50 characters";
      }
      if (!form?.resume) {
        stepErrors.resume = "Please upload your resume";
      }
    }

    return stepErrors;
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all steps
    const allErrors = {};
    Object.assign(allErrors, validateStep(1));
    Object.assign(allErrors, validateStep(2));
    Object.assign(allErrors, validateStep(3));

    // Check terms agreement
    if (!form.agreeTerms) {
      allErrors.agreeTerms = "You must agree to terms and conditions";
    }

    // Check files
    if (!form.resume || !(form.resume instanceof File)) {
      allErrors.resume = "Resume is required";
    } else if (form.resume.size > 5 * 1024 * 1024) {
      allErrors.resume = "Resume size should not exceed 5MB";
    }

    if (
      form.portfolio &&
      form.portfolio instanceof File &&
      form.portfolio.size > 5 * 1024 * 1024
    ) {
      allErrors.portfolio = "Portfolio size should not exceed 5MB";
    }

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        if (key === "resume" || key === "portfolio") {
          return;
        }
        formData.append(key, form[key]);
      });
      if (form.resume && form.resume instanceof File) {
        formData.append("resume", form.resume);
      }
      if (form.portfolio && form.portfolio instanceof File) {
        formData.append("portfolio", form.portfolio);
      }
      formData.append("profileId", profileId);
      formData.append("internshipId", internshipId);

      // Here you would make actual API call
      const response = await applyForInternship(formData);

      // Check if API returned an error
      if (response.status === "error") {
        // Handle different types of API errors
        if (response.message === "jwt expired" || response.statusCode === 401) {
          // JWT expired - redirect to login
          setErrorDetails({
            title: "Session Expired",
            message:
              "Your session has expired. Please log in again to continue.",
          });
          setShowErrorModal(true);
          // Optionally redirect to login after showing modal
          setTimeout(() => {
            dispatch(logoutAction());
            navigate("/login");
          }, 3000);
        } else if (response.statusCode === 400) {
          // Validation error
          setErrors({
            submit:
              response.message || "Please check your form data and try again.",
          });
        } else if (response.statusCode === 409) {
          // Already applied
          setErrorDetails({
            title: "Already Applied",
            message: "You have already applied for this internship.",
          });
          setShowErrorModal(true);
        } else if (response.statusCode === 500) {
          // Server error
          setErrorDetails({
            title: "Server Error",
            message:
              "We're experiencing technical difficulties. Please try again later.",
          });
          setShowErrorModal(true);
        } else {
          // Generic API error
          setErrors({
            submit:
              response.message ||
              "Failed to submit application. Please try again.",
          });
        }
        return;
      }

      // Success case
      // After successful application, update user profile with any new details
      try {
        const profileUpdatePayload = {
          fName: form.firstName,
          lName: form.lastName,
          countryCode: form.countryCode,
          mobile: form.mobile,
          gender: form.gender,
          dateOfBirth: form.dateOfBirth,
          address: form.address,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          educationLevel: form.educationLevel,
          institutionName: form.institutionName,
          degree: form.degree,
          fieldOfStudy: form.fieldOfStudy,
          graduationYear: form.graduationYear,
          cgpa: form.cgpa,
          skills: form.skills,
          linkedinUrl: form.linkedinUrl,
          portfolioUrl: form.portfolioUrl,
          githubUrl: form.githubUrl,
        };

        await dispatch(updateProfileAction(profileUpdatePayload));
      } catch (profileUpdateError) {
        console.error(
          "Failed to update profile after application:",
          profileUpdateError
        );
      }

      // if (response.status === "error" && response.message === "jwt expired") {
      //   localStorage.setItem("applyFormBackup", JSON.stringify(form));
      // }
      // localStorage.removeItem("applyFormBackup");

      setSubmitSuccess(true);
      setSubmitMessage("Application submitted successfully!");
      setShowThankYouModal(true);
    } catch (error) {
      // Network or other unexpected errors
      setErrorDetails({
        title: "Connection Error",
        message:
          "Unable to connect to the server. Please check your internet connection and try again.",
      });
      setShowErrorModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prefill form with user profile and internship data
  useEffect(() => {
    // Skip if we've already prefilled
    if (hasPrefilledRef.current) {
      return;
    }

    // First, check if there's a saved backup in localStorage
    const saved = localStorage.getItem("applyFormBackup");
    if (saved) {
      try {
        const savedData = JSON.parse(saved);
        setForm(savedData);
        hasPrefilledRef.current = true;
        return; // Don't overwrite saved data
      } catch (error) {
        console.error("Error parsing saved form data:", error);
        // Continue to prefill from user/internship if parsing fails
      }
    }

    // Check if form is still empty (not yet filled)
    const isFormEmpty = !form.firstName && !form.email && !form.mobile;

    // Only prefill when we have a valid user object (not initial [])
    const hasValidUser =
      user && !Array.isArray(user) && Object.keys(user).length > 0;

    // Debug: Log user object to see what data is available
    if (user) {
      console.log("ApplicationFormPage - User object:", user);
      console.log("ApplicationFormPage - User email:", user.email);
    }

    // If form is empty and we have valid user/internship data, prefill it
    if (isFormEmpty && (hasValidUser || internship)) {
      if (hasValidUser && internship) {
        const prefilledState = buildInitialState(user, internship);
        console.log("ApplicationFormPage - Prefilled state:", prefilledState);
        setForm(prefilledState);
        hasPrefilledRef.current = true;
        console.log("Form prefilled with user profile and internship data");
      } else if (hasValidUser) {
        // If only user data is available, prefill what we can
        const prefilledState = buildInitialState(user, internship || {});
        console.log("ApplicationFormPage - Prefilled state:", prefilledState);
        setForm(prefilledState);
        hasPrefilledRef.current = true;
        console.log("Form prefilled with user profile data");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, internship]);

  const handleNext = () => {
    console.log(currentStep);
    const stepErrors = validateStep(currentStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show loading while checking authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 md:py-12 px-4">
      <Card className="max-w-4xl mx-auto shadow-xl">
        <CardHeader className="space-y-4 md:space-y-6 pb-6 md:pb-8 px-4 md:px-6">
          <ApplicationHeader internship={internship} />
          <div className="border-b border-slate-200"></div>
          <ProgressBar currentStep={currentStep} totalSteps={4} />
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6 pb-6 md:pb-8 px-4 md:px-6">
            {errors?.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}
            {submitSuccess && (
              <Alert className="border-green-200 bg-green-50">
                <Check className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  {submitMessage || "Application submitted successfully!"}
                </AlertDescription>
              </Alert>
            )}

            {currentStep === 1 && (
              <PersonalDetailsStep
                form={form}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <EducationSkillsStep
                form={form}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            )}

            {currentStep === 3 && (
              <AdditionalInfoStep
                form={form}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                errors={errors}
              />
            )}

            {currentStep === 4 && (
              <ReviewStep
                form={form}
                handleInputChange={handleInputChange}
                errors={errors}
              />
            )}

            <FormNavigation
              currentStep={currentStep}
              totalSteps={4}
              handleBack={handleBack}
              handleNext={handleNext}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </form>
      </Card>

      <SuccessModal
        showModal={showThankYouModal}
        onClose={() => setShowThankYouModal(false)}
        navigate={navigate}
      />

      <ErrorModal
        showModal={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errorDetails={errorDetails}
        navigate={navigate}
      />
    </div>
  );
};

export default ApplicationFormPage;
