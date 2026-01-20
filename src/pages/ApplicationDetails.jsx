"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Timer,
  FileText,
  ExternalLink,
  Globe,
  Mail,
  User,
  BadgeCheck,
  Briefcase
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getApplicationDetails } from "../features/application/applicationapi";
import { toast } from "react-toastify";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await getApplicationDetails(id);
        if (response.status === "success") {
          setAppData(response.payload);
        } else {
          toast.error(response.message || "Failed to fetch application details");
          navigate("/internships");
        }
      } catch (error) {
        toast.error("An error occurred while fetching details");
        navigate("/internships");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDetails();
  }, [id, navigate]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "accepted":
        return { 
          color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200", 
          icon: <CheckCircle2 className="w-5 h-5 mr-2" />,
          label: "Accepted"
        };
      case "rejected":
        return { 
          color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200", 
          icon: <XCircle className="w-5 h-5 mr-2" />,
          label: "Rejected"
        };
      case "pending":
      case "under_review":
        return { 
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200", 
          icon: <Timer className="w-5 h-5 mr-2" />,
          label: status === "under_review" ? "Under Review" : "Pending"
        };
      default:
        return { 
          color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200", 
          icon: <Clock className="w-5 h-5 mr-2" />,
          label: "Unknown"
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!appData) return null;

  const status = getStatusConfig(appData.status);
  const internship = appData.internshipId;
  const profile = appData.profileId;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-900/50 pt-24 pb-12 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header Navigation */}
        <button 
          onClick={() => navigate("/my-applications")}
          className="flex items-center text-gray-500 hover:text-blue-600 mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Applications
        </button>

        {/* Main Header Card */}
        <Card className="mb-8 overflow-hidden border-none shadow-xl shadow-blue-500/5 rounded-3xl bg-white dark:bg-neutral-800">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="flex gap-6 items-start">
                <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center border border-blue-100 dark:border-blue-800/50 flex-shrink-0">
                  <Building2 className="w-10 h-10 text-blue-600" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge className={`${status.color} border px-3 py-1 rounded-full text-xs font-bold flex items-center`}>
                      {status.icon}
                      {status.label}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{internship?.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-500 dark:text-gray-400 font-medium">
                    <span className="flex items-center gap-1.5 hover:text-blue-600 transition-colors cursor-default">
                      <Building2 className="w-4 h-4" />
                      {internship?.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      {internship?.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                 <p className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Application Date</p>
                 <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {new Date(appData.submittedAt).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })}
                 </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="md:col-span-2 space-y-8">
            {/* Internship Overview */}
            <section className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-gray-100 dark:border-neutral-700 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Internship Description
              </h2>
              <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>{internship?.description}</p>
              </div>
            </section>

            {/* Your Submission Details */}
            <section className="bg-white dark:bg-neutral-800 p-8 rounded-3xl border border-gray-100 dark:border-neutral-700 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <BadgeCheck className="w-5 h-5 text-blue-600" />
                Your Preferences
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-1 p-4 bg-gray-50 dark:bg-neutral-900/50 rounded-2xl border border-gray-100 dark:border-neutral-700">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Work Mode</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">{appData.preferences?.workMode}</p>
                </div>
                <div className="space-y-1 p-4 bg-gray-50 dark:bg-neutral-900/50 rounded-2xl border border-gray-100 dark:border-neutral-700">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Expected Stipend</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">{appData.preferences?.expectedStipend || "As per policy"}</p>
                </div>
                <div className="space-y-1 p-4 bg-gray-50 dark:bg-neutral-900/50 rounded-2xl border border-gray-100 dark:border-neutral-700">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Availability</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white capitalize">Available for {appData.preferences?.duration}</p>
                </div>
                <div className="space-y-1 p-4 bg-gray-50 dark:bg-neutral-900/50 rounded-2xl border border-gray-100 dark:border-neutral-700">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Start Date</p>
                  <p className="text-base font-semibold text-gray-900 dark:text-white">
                    {new Date(appData.preferences?.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">Why this internship?</h3>
                  <div className="p-6 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/20 text-gray-600 dark:text-gray-300 italic">
                    "{appData.preferences?.whyThisInternship}"
                  </div>
              </div>
            </section>
          </div>

          {/* Right Column: Files & Contacts */}
          <div className="space-y-8">
            {/* Attached Documents */}
            <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-neutral-800 overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-neutral-900/50 border-b border-gray-100 dark:border-neutral-700 p-6">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        Documents
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    {appData.documents?.resumeUrl && (
                        <a 
                          href={appData.documents.resumeUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl border border-gray-100 dark:border-neutral-700 transition-all group/link"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-xl flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-red-600" />
                                </div>
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Resume</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-blue-600" />
                        </a>
                    )}
                    {appData.documents?.portfolioUrl && (
                        <a 
                          href={appData.documents.portfolioUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl border border-gray-100 dark:border-neutral-700 transition-all group/link"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-emerald-600" />
                                </div>
                                <span className="font-semibold text-gray-700 dark:text-gray-200">Portfolio</span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-gray-400 group-hover/link:text-blue-600" />
                        </a>
                    )}
                    {!appData.documents?.resumeUrl && !appData.documents?.portfolioUrl && (
                        <p className="text-sm text-gray-500 text-center py-4">No documents attached</p>
                    )}
                </CardContent>
            </Card>

            {/* Applicant Profile */}
            <Card className="border-none shadow-sm rounded-3xl bg-white dark:bg-neutral-800 overflow-hidden">
                <CardHeader className="bg-gray-50 dark:bg-neutral-900/50 border-b border-gray-100 dark:border-neutral-700 p-6">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <User className="w-5 h-5 text-blue-600" />
                        Your Profile
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        {profile?.fName?.charAt(0) || "U"}
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 dark:text-white uppercase tracking-tight">{profile?.fName} {profile?.lName}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            {profile?.email}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Help/Support info */}
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-lg shadow-blue-500/20">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                    <Timer className="w-5 h-5" />
                    Next Steps
                </h3>
                <p className="text-sm text-blue-100 leading-relaxed mb-4">
                    The company will review your application. Check your notifications for status updates.
                </p>
                <Link to="/internships">
                    <Button variant="secondary" className="w-full bg-white/20 hover:bg-white/30 border-none text-white font-bold">
                        Browse More
                    </Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
