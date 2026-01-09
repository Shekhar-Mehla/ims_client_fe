import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Star,
  Calendar,
  MessageCircle,
  Clock,
  Briefcase,
  Building2,
  ChevronLeft,
  Share2
} from "lucide-react";
import { fetchInternshipBySlugActions } from "../../features/internship/internshipaction.js";

const Intership = () => {
  const { slug } = useParams();

  const navigate = useNavigate();
  const { internship, loading, error } = useSelector(
    (state) => state.internshipInfo
  );
  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInternshipBySlugActions(slug));
  }, [dispatch, slug]);

  const handleOnApplyNow = () => {
    navigate(`/internship/${slug}/apply`, {
      state: { internshipId: internship._id, internship },
    });
  };

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );
  }

  if (!internship) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900 py-12 pt-24 transition-colors font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
            onClick={() => navigate(-1)}
            className="group flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
        >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to internships
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT CONTENT (Details) - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Card */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                     {/* Optional Cover Image could go here */}
                </div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                         <div className="w-24 h-24 bg-white dark:bg-neutral-800 rounded-2xl p-2 shadow-lg border border-gray-100 dark:border-neutral-700">
                            <div className="w-full h-full bg-gray-100 dark:bg-neutral-700 rounded-xl flex items-center justify-center">
                                <Building2 className="w-10 h-10 text-gray-400" />
                            </div>
                         </div>
                         <div className="flex gap-3">
                             <Button variant="outline" size="icon" className="rounded-full">
                                 <Share2 className="w-4 h-4" />
                             </Button>
                         </div>
                    </div>
                    
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{internship.title}</h1>
                        <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400">
                            <span className="font-medium flex items-center gap-1.5">
                                <Briefcase className="w-4 h-4" />
                                {internship.company || "Company Name"}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4" /> {internship.location}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-xs font-medium border border-blue-100 dark:border-blue-900/30">
                                {internship.type || "Internship"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs (Pseudo) */}
            <div className="flex gap-2 border-b border-gray-200 dark:border-neutral-700 overflow-x-auto pb-1 scrollbar-hide">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">
                    Overview
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">
                    Company
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 border-b-2 border-transparent hover:border-gray-300 whitespace-nowrap">
                    Reviews
                </button>
            </div>

            {/* Content Sections */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-700 p-8 space-y-8">
                <section>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">About the role</h2>
                    <div className="prose prose-blue dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                        <p>{internship.description}</p>
                    </div>
                </section>

                {internship.technologies?.length > 0 && (
                    <section>
                         <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">Technologies</h2>
                         <div className="flex flex-wrap gap-2">
                            {internship.technologies.map((tech, i) => (
                                <Badge key={i} variant="secondary" className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200">
                                    {tech}
                                </Badge>
                            ))}
                         </div>
                    </section>
                )}
            </div>
          </div>

          {/* RIGHT CONTENT (Sidebar) - Takes up 1 column */}
          <div className="space-y-6">
             {/* Action Card */}
             <Card className="rounded-2xl shadow-lg border-blue-100 dark:border-blue-900/30 sticky top-24 overflow-hidden">
                <CardHeader className="bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/20 pb-4">
                   <CardTitle className="text-lg font-bold text-gray-900 dark:text-gray-100">Job Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 pt-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-blue-50 dark:bg-neutral-800 rounded-lg text-blue-600 dark:text-blue-400">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Duration</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{internship.duration || "Flexible"}</p>
                        </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-green-50 dark:bg-neutral-800 rounded-lg text-green-600 dark:text-green-400">
                             <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Stipend</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{internship.stipend || "Unpaid"}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-amber-50 dark:bg-neutral-800 rounded-lg text-amber-600 dark:text-amber-400">
                             <Star className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Rating</p>
                             <div className="flex items-center gap-1">
                                <span className="font-semibold text-gray-900 dark:text-gray-100">{internship.rating || "4.8"}</span>
                                <div className="flex text-amber-500">
                                   <Star className="w-3 h-3 fill-current" />
                                   <Star className="w-3 h-3 fill-current" />
                                   <Star className="w-3 h-3 fill-current" />
                                   <Star className="w-3 h-3 fill-current" />
                                   <Star className="w-3 h-3 fill-current" />
                                </div>
                             </div>
                        </div>
                    </div>
                
                    {internship.applicationDeadline && (
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-red-50 dark:bg-neutral-800 rounded-lg text-red-600 dark:text-red-400">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Deadline</p>
                                <p className="font-semibold text-gray-900 dark:text-gray-100">
                                    {new Date(internship.applicationDeadline).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="pt-2 pb-6">
                    <Button 
                        onClick={handleOnApplyNow}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 py-6 text-lg font-semibold rounded-xl"
                        disabled={loading}
                    >
                        Apply Now
                    </Button>
                </CardFooter>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intership;
