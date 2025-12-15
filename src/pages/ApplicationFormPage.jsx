"use client";

import React, { useState, useEffect } from "react";
import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Upload,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import UseForm from "../hooks/UseForm";
import ReviewSummary from "../components/CustomComponents/ReviewSummary";
import { applyForInternship } from "../features/application/applicationapi";
import { logoutAction } from "../features/user/useraction";

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

const initialState = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  countryCode: "+91",
  mobile: "9876543210",
  address: "221B Baker Street",
  agreeTerms: true,
  cgpa: "8.2",
  city: "Mumbai",
  dateOfBirth: "1998-05-21",
  degree: "Bachelor of Technology",
  duration: "6-months",
  educationLevel: "graduate",
  expectedStipend: "15000",
  fieldOfStudy: "Computer Science",
  gender: "male",
  githubUrl: "https://github.com/johndoe",
  graduationYear: "2024",
  institutionName: "VJTI Mumbai",
  linkedinUrl: "https://linkedin.com/in/johndoe",
  pincode: "400001",
  portfolioUrl: "https://johndoe.dev",
  skills: "React, Node.js, MongoDB, TailwindCSS",
  startDate: "2025-12-10",
  state: "Maharashtra",
  workMode: "hybrid",
  whyThisInternship:
    "I want to grow my development skills by working on real-world projects with experienced engineers.",
  // Mock File (works for JS testing)
};

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                i + 1 < currentStep
                  ? "bg-green-500 text-white"
                  : i + 1 === currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {i + 1 < currentStep ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <span className="text-xs mt-1 text-center hidden sm:block">
              {i === 0
                ? "Personal"
                : i === 1
                ? "Education"
                : i === 2
                ? "Additional"
                : "Review"}
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const FileUpload = ({ label, name, accept, required, error, onChange }) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      <p className="text-xs text-slate-500">Max file size: 5MB</p>
      <div className="relative">
        <input
          type="file"
          id={name}
          name={name}
          accept={accept}
          onChange={onChange}
        />
        <label
          htmlFor={name}
          className={`flex items-center justify-center gap-2 md:gap-3 w-full px-4 md:px-6 py-4 md:py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
            error
              ? "border-red-300 bg-red-50"
              : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50"
          }`}
        >
          <Upload className="w-5 h-5 md:w-6 md:h-6 text-slate-400 flex-shrink-0" />
          <div className="flex flex-col items-start">
            <span className="text-xs md:text-sm text-slate-600 font-medium truncate">
              Click to upload {label.toLowerCase()}
            </span>
          </div>
        </label>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
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
  } = UseForm(initialState);
  const internship = location.state?.internship;

  // Check if user is logged in
  const profileId = useSelector((state) => state.userInfo?.users?._id);
  const authId = useSelector((state) => state.userInfo?.users?.authId);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [showThankYouModal, setShowThankYouModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorDetails, setErrorDetails] = useState({ title: "", message: "" });

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

  useEffect(() => {
    const saved = localStorage.getItem("applyFormBackup");
    if (saved) {
      setForm(JSON.parse(saved));
    }
  }, []);

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
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl md:text-2xl">
                P
              </span>
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
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">
                  Personal Details
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">
                      First Name<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Satish"
                      value={form?.firstName}
                      onChange={handleInputChange}
                      className={errors?.firstName ? "border-red-500" : ""}
                    />
                    {errors?.firstName && (
                      <p className="text-xs text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Subedi"
                      value={form?.lastName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Email<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="satish236@gmail.com"
                    value={form?.email}
                    onChange={handleInputChange}
                    className={errors?.email ? "border-red-500" : ""}
                  />
                  {errors?.email && (
                    <p className="text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="mobile">
                    Mobile<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={form?.countryCode}
                      onChange={handleInputChange}
                      className="w-24 h-10 px-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="+91">+91</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="9846079038"
                      value={form?.mobile}
                      onChange={handleInputChange}
                      className={`flex-1 ${
                        errors?.mobile ? "border-red-500" : ""
                      }`}
                    />
                  </div>
                  {errors?.mobile && (
                    <p className="text-xs text-red-600">{errors.mobile}</p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="gender">
                      Gender<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <select
                      id="gender"
                      name="gender"
                      value={form?.gender}
                      onChange={handleInputChange}
                      className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                        errors?.gender ? "border-red-500" : "border-slate-300"
                      }`}
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="non-binary">Non-binary</option>
                      <option value="prefer-not">Prefer not to say</option>
                    </select>
                    {errors?.gender && (
                      <p className="text-xs text-red-600">{errors.gender}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="dateOfBirth">
                      Date of Birth<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      value={form?.dateOfBirth}
                      onChange={handleInputChange}
                      className={errors?.dateOfBirth ? "border-red-500" : ""}
                    />
                    {errors?.dateOfBirth && (
                      <p className="text-xs text-red-600">
                        {errors.dateOfBirth}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Street address"
                    value={form?.address}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="city">
                      City<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Delhi"
                      value={form?.city}
                      onChange={handleInputChange}
                      className={errors?.city ? "border-red-500" : ""}
                    />
                    {errors?.city && (
                      <p className="text-xs text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      name="state"
                      placeholder="Delhi"
                      value={form?.state}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      placeholder="110001"
                      value={form?.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">
                  Education & Skills
                </h3>

                <div className="grid gap-2">
                  <Label htmlFor="educationLevel">
                    Education Level<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    value={form?.educationLevel}
                    onChange={handleInputChange}
                    className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors?.educationLevel
                        ? "border-red-500"
                        : "border-slate-300"
                    }`}
                  >
                    <option value="">Select education level</option>
                    <option value="high-school">High School</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelors">Bachelor Degree</option>
                    <option value="masters">Master Degree</option>
                    <option value="phd">PhD</option>
                  </select>
                  {errors?.educationLevel && (
                    <p className="text-xs text-red-600">
                      {errors.educationLevel}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="institutionName">
                    Institution Name<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="institutionName"
                    name="institutionName"
                    placeholder="Delhi University"
                    value={form?.institutionName}
                    onChange={handleInputChange}
                    className={errors?.institutionName ? "border-red-500" : ""}
                  />
                  {errors?.institutionName && (
                    <p className="text-xs text-red-600">
                      {errors.institutionName}
                    </p>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="degree">
                      Degree<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="degree"
                      name="degree"
                      placeholder="B.Tech, BCA, etc."
                      value={form?.degree}
                      onChange={handleInputChange}
                      className={errors?.degree ? "border-red-500" : ""}
                    />
                    {errors?.degree && (
                      <p className="text-xs text-red-600">{errors.degree}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="fieldOfStudy">
                      Field of Study<span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="fieldOfStudy"
                      name="fieldOfStudy"
                      placeholder="Computer Science"
                      value={form?.fieldOfStudy}
                      onChange={handleInputChange}
                      className={errors?.fieldOfStudy ? "border-red-500" : ""}
                    />
                    {errors?.fieldOfStudy && (
                      <p className="text-xs text-red-600">
                        {errors.fieldOfStudy}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="graduationYear">
                      Graduation Year
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Input
                      id="graduationYear"
                      name="graduationYear"
                      type="number"
                      placeholder="2025"
                      min="2000"
                      max="2030"
                      value={form?.graduationYear}
                      onChange={handleInputChange}
                      className={errors?.graduationYear ? "border-red-500" : ""}
                    />
                    {errors?.graduationYear && (
                      <p className="text-xs text-red-600">
                        {errors.graduationYear}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="cgpa">CGPA / Percentage</Label>
                    <Input
                      id="cgpa"
                      name="cgpa"
                      placeholder="8.5 or 85%"
                      value={form?.cgpa}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="skills">
                    Skills<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <textarea
                    id="skills"
                    name="skills"
                    placeholder="E.g., Photoshop, Illustrator, Figma, UI/UX Design"
                    rows={3}
                    value={form?.skills}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors?.skills ? "border-red-500" : "border-slate-300"
                    }`}
                  />
                  {errors?.skills && (
                    <p className="text-xs text-red-600">{errors.skills}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                  <Input
                    id="linkedinUrl"
                    name="linkedinUrl"
                    type="url"
                    placeholder="https://linkedin.com/in/yourprofile"
                    value={form?.linkedinUrl}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                    <Input
                      id="portfolioUrl"
                      name="portfolioUrl"
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={form?.portfolioUrl}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      name="githubUrl"
                      type="url"
                      placeholder="https://github.com/yourusername"
                      value={form?.githubUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">
                  Additional Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">
                      Available Start Date
                      <span className="text-red-500 ml-1">*</span>
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
                      Preferred Duration
                      <span className="text-red-500 ml-1">*</span>
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
                    <Label htmlFor="expectedStipend">
                      Expected Stipend (Monthly)
                    </Label>
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
                    Why do you want this internship?
                    <span className="text-red-500 ml-1">*</span>
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
                  <p className="text-xs text-slate-500">
                    Minimum 50 characters required
                  </p>
                  {errors?.whyThisInternship && (
                    <p className="text-xs text-red-600">
                      {errors.whyThisInternship}
                    </p>
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
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-800">
                  Review Your Application
                </h3>

                <div className="bg-blue-50 p-6 rounded-lg text-center">
                  <h4 className="font-semibold text-blue-900 mb-2">
                    Please Review Your Information
                  </h4>
                  <p className="text-blue-800 text-sm leading-relaxed">
                    Please review all the information you entered in the
                    previous steps. Make sure all details are accurate before
                    submitting your application.
                  </p>
                </div>

                <div className="bg-amber-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 mb-2">
                    Important Notes:
                  </h4>
                  <ul className="text-amber-800 text-sm space-y-1">
                    <li>
                      • Ensure your resume is up-to-date and relevant to this
                      internship
                    </li>
                    <li>• Double-check your contact information</li>
                    <li>• Verify your availability dates</li>
                    <li>
                      • Make sure your motivation statement is specific to this
                      role
                    </li>
                  </ul>
                </div>
                <ReviewSummary form={form}></ReviewSummary>

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
                  <Label
                    htmlFor="agreeTerms"
                    className="text-sm cursor-pointer"
                  >
                    I agree to the terms and conditions and confirm that all
                    information provided is accurate and truthful.
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                </div>
                {errors?.agreeTerms && (
                  <p className="text-xs text-red-600">{errors.agreeTerms}</p>
                )}
              </div>
            )}

            <div className="flex justify-between pt-6 border-t">
              {currentStep > 1 && (
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </Button>
              )}

              {currentStep < 4 ? (
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
          </CardContent>
        </form>
      </Card>

      {/* Thank You Modal */}
      {showThankYouModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  Application Submitted!
                </h2>
                <button
                  onClick={() => setShowThankYouModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Thank You!
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  Your application has been submitted successfully. We'll review
                  your application and get back to you soon.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setShowThankYouModal(false);
                      navigate("/");
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Go to Homepage
                  </Button>
                  <Button
                    onClick={() => setShowThankYouModal(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Stay Here
                  </Button>
                </div>

                <p className="text-sm text-slate-500 mt-4">
                  You can also check your application status from your profile
                  page.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  {errorDetails.title}
                </h2>
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center py-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Oops!
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {errorDetails.message}
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      setShowErrorModal(false);
                      if (errorDetails.title === "Session Expired") {
                        navigate("/login");
                      }
                    }}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    {errorDetails.title === "Session Expired"
                      ? "Go to Login"
                      : "Try Again"}
                  </Button>
                  <Button
                    onClick={() => setShowErrorModal(false)}
                    variant="outline"
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationFormPage;
