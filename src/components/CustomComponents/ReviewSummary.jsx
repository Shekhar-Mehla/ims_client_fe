const ReviewSummary = ({ form }) => {
  const display = (label, value) =>
    value ? (
      <div className="flex gap-3 py-1">
        <span className="w-40 font-semibold text-gray-700">{label}:</span>
        <span className="text-gray-900">{value}</span>
      </div>
    ) : null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Application Review Summary
      </h2>

      {/* PERSONAL DETAILS */}
      <section className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Personal Details
        </h3>
        {display(
          "Name",
          `${form.firstName || ""} ${form.lastName || ""}`.trim()
        )}
        {display("Email", form.email)}
        {display(
          "Mobile",
          `${form.countryCode || ""} ${form.mobile || ""}`
        )}
        {display("Gender", form.gender)}
        {display("Date of Birth", form.dateOfBirth)}
      </section>

      {/* ADDRESS */}
      <section className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Address</h3>
        {display("Address", form.address)}
        {display("City", form.city)}
        {display("State", form.state)}
        {display("Pincode", form.pincode)}
      </section>

      {/* EDUCATION */}
      <section className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Education Details
        </h3>
        {display("Education Level", form.educationLevel)}
        {display("Degree", form.degree)}
        {display("Field of Study", form.fieldOfStudy)}
        {display("Institution Name", form.institutionName)}
        {display("Graduation Year", form.graduationYear)}
        {display("CGPA", form.cgpa)}
      </section>

      {/* INTERNSHIP DETAILS */}
      <section className="mb-6 p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Internship Details
        </h3>
        {display("Duration", form.duration)}
        {display("Start Date", form.startDate)}
        {display("Expected Stipend", form.expectedStipend)}
        {display("Work Mode", form.workMode)}
        {display("Skills", form.skills)}
        {display("Why This Internship", form.whyThisInternship)}
      </section>

      {/* ADDITIONAL INFORMATION */}
      <section className="p-4 border border-gray-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Additional Information
        </h3>
        {display("Cover Letter", form.coverLetter)}
        {display("Portfolio URL", form.portfolioUrl)}
        {display("LinkedIn URL", form.linkedinUrl)}
        {display("GitHub URL", form.githubUrl)}
        {display("Resume", form.resume?.name)}
        {form.agreeTerms ? display("Agreed to Terms", "Yes") : null}
      </section>
    </div>
  );
};

export default ReviewSummary;
