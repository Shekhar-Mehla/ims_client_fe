import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Star,
  Calendar,
  MessageCircle,
  ClockFading,
  FileText,
  CalendarDays,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import { fetchInternshipActions } from "../../features/internship/internshipaction.js";
import { useLocation, useNavigate } from "react-router";

const Intership = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("details");
  const navigate = useNavigate();

  const locationHook = useLocation();
  const intership = locationHook?.state?.internship;
  console.log(intership);
  const {
    title,
    description,
    company,
    location,
    stipend,
    duration,
    rating,
    reviewCount,
    applicationDeadline,
  } = intership;
  const defaultFaqs = [
    {
      question: "How do I apply for an internship?",
      answer:
        "Click the 'Apply Now' button on any internship listing, fill out the application form, and upload your resume.",
      category: "application",
    },
    {
      question: "Do I need prior work experience?",
      answer:
        "Most internships are entry-level and don't require prior professional experience. Focus on your education, projects, and skills.",
      category: "application",
    },
    {
      question: "What's the typical internship duration?",
      answer:
        "Internships usually last 2-6 months, depending on the company and role. Check individual postings for specific durations.",
      category: "general",
    },
    {
      question: "Are internships paid?",
      answer:
        "Many internships offer stipends or hourly pay. Compensation details are listed in each internship posting.",
      category: "benefits",
    },
    {
      question: "Can I work remotely?",
      answer:
        "Work arrangements vary by company and role. Check the 'Work Mode' in each internship posting for remote, on-site, or hybrid options.",
      category: "general",
    },
  ];
  const handleOnApplyNow = () => {
    navigate(`/apply/${intership?._id}`);
  };

  // useEffect(() => {
  //   dispatch(fetchInternshipActions());
  // }, [dispatch]);
  return (
    <div className="bg-gradient-to-br from-amber-100 to-yellow-200 min-h-screen w-full p-6 flex gap-6">
      {/* RIGHT SIDE */}
      <div className="w-2/3 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex gap-6">
          <div className="w-40 h-40 bg-amber-300 rounded-2xl shadow-inner"></div>

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-gray-800">
              {title} at {company}
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin size={18} /> {location}
            </p>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg">
          <Button
            onClick={() => setActiveTab("details")}
            className={`${
              activeTab === "details"
                ? "bg-amber-500 text-white"
                : "bg-amber-100 text-black"
            } rounded-xl border border-amber-500 px-4 py-2 hover:bg-amber-500 hover:text-white transition-colors`}
          >
            <FileText size={16} className="mr-2" />
            Internship Details
          </Button>
          <Button
            onClick={() => setActiveTab("dates")}
            className={`${
              activeTab === "dates"
                ? "bg-amber-500 text-white"
                : "bg-amber-100 text-black"
            } rounded-xl border border-amber-500 px-4 py-2 hover:bg-amber-500 hover:text-white transition-colors`}
          >
            <CalendarDays size={16} className="mr-2" />
            Dates & Duration
          </Button>
          <Button
            onClick={() => setActiveTab("reviews")}
            className={`${
              activeTab === "reviews"
                ? "bg-amber-500 text-white"
                : "bg-amber-100 text-black"
            } rounded-xl border border-amber-500 px-4 py-2 hover:bg-amber-500 hover:text-white transition-colors`}
          >
            <MessageSquare size={16} className="mr-2" />
            Reviews
          </Button>
          <Button
            onClick={() => setActiveTab("faq")}
            className={`${
              activeTab === "faq"
                ? "bg-amber-500 text-white"
                : "bg-amber-100 text-black"
            } rounded-xl border border-amber-500 px-4 py-2 hover:bg-amber-500 hover:text-white transition-colors`}
          >
            <HelpCircle size={16} className="mr-2" />
            FAQ
          </Button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "details" && (
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h1 className="text-xl font-semibold mb-3">Internship Details</h1>
            <p className="text-gray-700 leading-relaxed mb-4">{description}</p>

            {/* Technologies Section */}
            {intership.technologies && intership.technologies.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <ClockFading size={18} />
                  Required Technologies & Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {intership.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Details */}
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Compensation</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Stipend:</span>
                    <span className="font-medium">
                      {stipend || "Not specified"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">
                      {duration || "Not specified"}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Timeline</h3>
                <div className="space-y-2">
                  <p className="flex justify-between">
                    <span className="text-gray-600">Application Deadline:</span>
                    <span className="font-medium">
                      {applicationDeadline
                        ? new Date(applicationDeadline).toLocaleDateString()
                        : "Open until filled"}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">
                      {intership.createdAt
                        ? new Date(intership.createdAt).toLocaleDateString()
                        : "Recently"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dates" && (
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h1 className="text-xl font-semibold mb-4">
              Important Dates & Duration
            </h1>

            <div className="space-y-6">
              <div className="bg-amber-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                  <Calendar size={20} />
                  Application Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Application Deadline:</span>
                    <span className="font-medium text-red-600">
                      {applicationDeadline
                        ? new Date(applicationDeadline).toLocaleDateString()
                        : "Open until filled"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Internship Duration:</span>
                    <span className="font-medium">
                      {duration || "3-6 months"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Posted Date:</span>
                    <span className="font-medium">
                      {intership.createdAt
                        ? new Date(intership.createdAt).toLocaleDateString()
                        : "Recently posted"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Duration Details</h3>
                <p className="text-gray-700 leading-relaxed">
                  This internship typically lasts for {duration || "3-6 months"}{" "}
                  and offers a comprehensive learning experience. You'll have
                  the opportunity to work on real projects, collaborate with
                  experienced professionals, and gain valuable skills in your
                  field.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h1 className="text-xl font-semibold mb-4">Reviews & Ratings</h1>

            <div className="space-y-6">
              {/* Overall Rating */}
              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-lg text-center">
                <div className="text-4xl font-bold text-amber-600 mb-2">
                  {rating || 4.7}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(rating || 4.7)
                          ? "text-amber-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">
                  Based on {reviewCount || 128} reviews
                </p>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Recent Reviews</h3>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        A
                      </div>
                      <span className="font-medium">Alex Chen</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-400 fill-current" />
                      <span className="text-sm">5.0</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Amazing learning experience! The team was very supportive
                    and I learned so much about modern web development. Highly
                    recommend this internship!
                  </p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    2 weeks ago
                  </span>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        M
                      </div>
                      <span className="font-medium">Maria Rodriguez</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-amber-400 fill-current" />
                      <span className="text-sm">4.0</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Great opportunity to work on real projects. The stipend is
                    competitive and the work environment is excellent. Learned a
                    lot about the industry.
                  </p>
                  <span className="text-xs text-gray-500 mt-2 block">
                    1 month ago
                  </span>
                </div>

                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">
                    Showing 2 of {reviewCount || 128} reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "faq" && (
          <div className="bg-white p-6 rounded-2xl shadow-xl">
            <h1 className="text-xl font-semibold mb-4">
              Frequently Asked Questions
            </h1>
            <div className="space-y-4">
              {defaultFaqs.map((faq, index) => (
                <details
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                >
                  <summary className="font-medium cursor-pointer text-gray-800 hover:text-amber-600">
                    {faq.question}
                  </summary>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Dates and duration section */}
      {/* <div>
        <h1>Important Dates and Deadlines</h1>
      </div> */}

      {/* LEFT SIDE */}
      <div className="w-1/3">
        <Card className="rounded-2xl shadow-xl p-6 flex flex-col gap-4 sticky top-6">
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Apply for this Internship
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 flex gap-2 items-center">
              <Calendar size={18} /> Duration: {duration || "3 Months"}
            </p>
            <p className="text-gray-600 flex gap-2 items-center">
              <ClockFading size={18} /> Stipend: {stipend || "₹15,000-30,000"}
            </p>
            <p className="text-gray-600 flex gap-2 items-center">
              <Star size={18} /> Rating: {rating || 4.7}/5
            </p>
            <p className="text-gray-600 flex gap-2 items-center">
              <MessageCircle size={18} /> {reviewCount || 120}+ Reviews
            </p>
            {applicationDeadline && (
              <p className="text-red-600 flex gap-2 items-center text-sm mt-2">
                <Calendar size={16} /> Deadline:{" "}
                {new Date(applicationDeadline).toLocaleDateString()}
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => handleOnApplyNow()}
              className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md"
            >
              Apply Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Intership;
