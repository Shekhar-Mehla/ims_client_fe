import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PersonalDetailsStep = ({ form, handleInputChange, errors }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <h3 className="text-lg font-semibold text-slate-800">Personal Details</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="firstName">
            First Name<span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="First name"
            value={form?.firstName}
            disabled
            className={`bg-gray-100 cursor-not-allowed ${
              errors?.firstName ? "border-red-500" : ""
            }`}
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
            placeholder="Last name"
            value={form?.lastName}
            disabled
            className="bg-gray-100 cursor-not-allowed"
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
            <option value="+91">IN (+91)</option>
            <option value="+61">AU (+61)</option>
            <option value="+1">US (+1)</option>
            <option value="+1">CA (+1)</option>
            <option value="+44">UK (+44)</option>
            <option value="+64">NZ (+64)</option>
            <option value="+65">SG (+65)</option>
            <option value="+971">UAE (+971)</option>
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
            <p className="text-xs text-red-600">{errors.dateOfBirth}</p>
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
  );
};

export default PersonalDetailsStep;
