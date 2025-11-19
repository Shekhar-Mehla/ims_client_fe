"use client";

import React, { useState } from "react";
import {
  Upload,
  ChevronLeft,
  ChevronRight,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

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

const FileUpload = ({
  label,
  name,
  accept,
  required,
  file,
  setFile,
  error,
}) => {
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert("File size should not exceed 5MB");
        return;
      }
      setFile(selectedFile);
    }
  };

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
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
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
              {file ? file.name : `Click to upload ${label.toLowerCase()}`}
            </span>
            {file && (
              <span className="text-xs text-slate-500">
                {(file.size / 1024).toFixed(2)} KB
              </span>
            )}
          </div>
        </label>
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
};

const ApplicationFormPage = ({
  internshipId = "default-id",
  internshipTitle = "Graphic Designer Internship",
  companyName = "Proviyaa Global",
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    countryCode: "+91",
    mobile: "",
    firstName: "",
    lastName: "",
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
    coverLetter: "",
    whyThisInternship: "",
    resume: null,
    portfolio: null,
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Valid email is required";
      }
      if (!formData.mobile || formData.mobile.length < 10) {
        newErrors.mobile = "Valid mobile number is required";
      }
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.gender) newErrors.gender = "Gender is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.city) newErrors.city = "City is required";
    }

    if (step === 2) {
      if (!formData.educationLevel)
        newErrors.educationLevel = "Education level is required";
      if (!formData.institutionName)
        newErrors.institutionName = "Institution name is required";
      if (!formData.degree) newErrors.degree = "Degree is required";
      if (!formData.fieldOfStudy)
        newErrors.fieldOfStudy = "Field of study is required";
      if (!formData.graduationYear)
        newErrors.graduationYear = "Graduation year is required";
      if (!formData.skills) newErrors.skills = "Skills are required";
    }

    if (step === 3) {
      if (!formData.startDate) newErrors.startDate = "Start date is required";
      if (!formData.duration) newErrors.duration = "Duration is required";
      if (!formData.workMode) newErrors.workMode = "Work mode is required";
      if (
        !formData.whyThisInternship ||
        formData.whyThisInternship.length < 50
      ) {
        newErrors.whyThisInternship = "Please write at least 50 characters";
      }
      if (!formData.resume) newErrors.resume = "Resume is required";
    }

    if (step === 4) {
      if (!formData.agreeTerms)
        newErrors.agreeTerms = "You must agree to terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      alert("Application submitted successfully!");

      setFormData({
        email: "",
        countryCode: "+91",
        mobile: "",
        firstName: "",
        lastName: "",
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
        coverLetter: "",
        whyThisInternship: "",
        resume: null,
        portfolio: null,
        agreeTerms: false,
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Submission error:", error);
      setErrors({ submit: "Failed to submit application. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

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
                {internshipTitle}
              </h1>
              <p className="text-xs md:text-sm text-slate-600 mt-1">
                {companyName}
              </p>
            </div>
          </div>
          <div className="border-b border-slate-200"></div>
          <ProgressBar currentStep={currentStep} totalSteps={4} />
        </CardHeader>

        <CardContent className="space-y-6 pb-6 md:pb-8 px-4 md:px-6">
          {errors.submit && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{errors.submit}</AlertDescription>
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
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Satish"
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-600">{errors.firstName}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Subedi"
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
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="satish236@gmail.com"
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
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
                    value={formData.countryCode}
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
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="9846079038"
                    className={`flex-1 ${
                      errors.mobile ? "border-red-500" : ""
                    }`}
                  />
                </div>
                {errors.mobile && (
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
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors.gender ? "border-red-500" : "border-slate-300"
                    }`}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non-binary">Non-binary</option>
                    <option value="prefer-not">Prefer not to say</option>
                  </select>
                  {errors.gender && (
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
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={errors.dateOfBirth ? "border-red-500" : ""}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-xs text-red-600">{errors.dateOfBirth}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address"
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
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Delhi"
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-xs text-red-600">{errors.city}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="Delhi"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="110001"
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
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.educationLevel
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
                {errors.educationLevel && (
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
                  value={formData.institutionName}
                  onChange={handleInputChange}
                  placeholder="Delhi University"
                  className={errors.institutionName ? "border-red-500" : ""}
                />
                {errors.institutionName && (
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
                    value={formData.degree}
                    onChange={handleInputChange}
                    placeholder="B.Tech, BCA, etc."
                    className={errors.degree ? "border-red-500" : ""}
                  />
                  {errors.degree && (
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
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                    placeholder="Computer Science"
                    className={errors.fieldOfStudy ? "border-red-500" : ""}
                  />
                  {errors.fieldOfStudy && (
                    <p className="text-xs text-red-600">
                      {errors.fieldOfStudy}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="graduationYear">
                    Graduation Year<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="graduationYear"
                    name="graduationYear"
                    type="number"
                    value={formData.graduationYear}
                    onChange={handleInputChange}
                    placeholder="2025"
                    min="2000"
                    max="2030"
                    className={errors.graduationYear ? "border-red-500" : ""}
                  />
                  {errors.graduationYear && (
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
                    value={formData.cgpa}
                    onChange={handleInputChange}
                    placeholder="8.5 or 85%"
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
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="E.g., Photoshop, Illustrator, Figma, UI/UX Design"
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.skills ? "border-red-500" : "border-slate-300"
                  }`}
                />
                {errors.skills && (
                  <p className="text-xs text-red-600">{errors.skills}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  name="linkedinUrl"
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={handleInputChange}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="portfolioUrl">Portfolio URL</Label>
                  <Input
                    id="portfolioUrl"
                    name="portfolioUrl"
                    type="url"
                    value={formData.portfolioUrl}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    type="url"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    placeholder="https://github.com/yourusername"
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
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={errors.startDate ? "border-red-500" : ""}
                  />
                  {errors.startDate && (
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
                    value={formData.duration}
                    onChange={handleInputChange}
                    className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors.duration ? "border-red-500" : "border-slate-300"
                    }`}
                  >
                    <option value="">Select duration</option>
                    <option value="1-month">1 Month</option>
                    <option value="2-months">2 Months</option>
                    <option value="3-months">3 Months</option>
                    <option value="6-months">6 Months</option>
                    <option value="flexible">Flexible</option>
                  </select>
                  {errors.duration && (
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
                    value={formData.expectedStipend}
                    onChange={handleInputChange}
                    placeholder="10000 or Unpaid"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="workMode">
                    Work Mode<span className="text-red-500 ml-1">*</span>
                  </Label>
                  <select
                    id="workMode"
                    name="workMode"
                    value={formData.workMode}
                    onChange={handleInputChange}
                    className={`w-full h-10 px-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white ${
                      errors.workMode ? "border-red-500" : "border-slate-300"
                    }`}
                  >
                    <option value="">Select work mode</option>
                    <option value="remote">Remote</option>
                    <option value="office">Office</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                  {errors.workMode && (
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
                  value={formData.whyThisInternship}
                  onChange={handleInputChange}
                  placeholder="Tell us why you are interested in this internship..."
                  rows={5}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.whyThisInternship
                      ? "border-red-500"
                      : "border-slate-300"
                  }`}
                />
                <p className="text-xs text-slate-500">
                  {formData.whyThisInternship.length} / 50 characters minimum
                </p>
                {errors.whyThisInternship && (
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
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Additional information you would like to share..."
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <FileUpload
                label="Resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                required={true}
                file={formData.resume}
                setFile={(file) =>
                  setFormData((prev) => ({ ...prev, resume: file }))
                }
                error={errors.resume}
              />

              <FileUpload
                label="Portfolio (Optional)"
                name="portfolio"
                accept=".pdf,.zip"
                required={false}
                file={formData.portfolio}
                setFile={(file) =>
                  setFormData((prev) => ({ ...prev, portfolio: file }))
                }
              />
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-slate-800">
                Review Your Application
              </h3>

              <div className="space-y-4 bg-slate-50 p-4 rounded-lg">
                <div className="border-b pb-3">
                  <h4 className="font-semibold text-slate-700 mb-2">
                    Personal Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-slate-600">Name:</span>{" "}
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p>
                      <span className="text-slate-600">Email:</span>{" "}
                      {formData.email}
                    </p>
                    <p>
                      <span className="text-slate-600">Mobile:</span>{" "}
                      {formData.countryCode} {formData.mobile}
                    </p>
                    <p>
                      <span className="text-slate-600">City:</span>{" "}
                      {formData.city}
                    </p>
                  </div>
                </div>

                <div className="border-b pb-3">
                  <h4 className="font-semibold text-slate-700 mb-2">
                    Education
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-slate-600">Institution:</span>{" "}
                      {formData.institutionName}
                    </p>
                    <p>
                      <span className="text-slate-600">Degree:</span>{" "}
                      {formData.degree}
                    </p>
                    <p>
                      <span className="text-slate-600">Field:</span>{" "}
                      {formData.fieldOfStudy}
                    </p>
                    <p>
                      <span className="text-slate-600">Year:</span>{" "}
                      {formData.graduationYear}
                    </p>
                  </div>
                </div>

                <div className="border-b pb-3">
                  <h4 className="font-semibold text-slate-700 mb-2">
                    Internship Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-2 text-sm">
                    <p>
                      <span className="text-slate-600">Start Date:</span>{" "}
                      {formData.startDate}
                    </p>
                    <p>
                      <span className="text-slate-600">Duration:</span>{" "}
                      {formData.duration}
                    </p>
                    <p>
                      <span className="text-slate-600">Work Mode:</span>{" "}
                      {formData.workMode}
                    </p>
                    <p>
                      <span className="text-slate-600">Resume:</span>{" "}
                      {formData.resume ? formData.resume.name : "Not uploaded"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-4 bg-blue-50 rounded-lg">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                  className="mt-1"
                />
                <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                  I agree to the terms and conditions and confirm that all
                  information provided is accurate.
                  <span className="text-red-500 ml-1">*</span>
                </Label>
              </div>
              {errors.agreeTerms && (
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
                onClick={handleNext}
                className="ml-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
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
      </Card>
    </div>
  );
};
export default ApplicationFormPage;
