import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EducationSkillsStep = ({ form, handleInputChange, errors }) => {
  return (
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
          <p className="text-xs text-red-600">{errors.educationLevel}</p>
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
          <p className="text-xs text-red-600">{errors.institutionName}</p>
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
            <p className="text-xs text-red-600">{errors.fieldOfStudy}</p>
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
            placeholder="2025"
            min="2000"
            max="2030"
            value={form?.graduationYear}
            onChange={handleInputChange}
            className={errors?.graduationYear ? "border-red-500" : ""}
          />
          {errors?.graduationYear && (
            <p className="text-xs text-red-600">{errors.graduationYear}</p>
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
  );
};

export default EducationSkillsStep;
