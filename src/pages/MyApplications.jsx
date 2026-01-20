import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Search,
  CheckCircle2,
  XCircle,
  Timer
} from "lucide-react";
import { getApplicationsByUserAction } from "../features/application/applicationaction";

const MyApplications = () => {
  const user = useSelector((state) => state.userInfo?.user);
  const userId = user?._id || user?.authId;
  const { application, loading } = useSelector((state) => state?.applicationInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId && application === null) {
       dispatch(getApplicationsByUserAction(userId));
    }
  }, [userId, application, dispatch]);

  const getStatusConfig = (status) => {
    switch (status) {
      case "accepted":
        return { 
          color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200", 
          icon: <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> 
        };
      case "rejected":
        return { 
          color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200", 
          icon: <XCircle className="w-3.5 h-3.5 mr-1.5" /> 
        };
      case "pending":
      case "under_review":
        return { 
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200", 
          icon: <Timer className="w-3.5 h-3.5 mr-1.5" /> 
        };
      default:
        return { 
          color: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200", 
          icon: <Clock className="w-3.5 h-3.5 mr-1.5" /> 
        };
    }
  };

  if (loading && (!application || application.length === 0)) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-900/50 pt-24 pb-12 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Applications</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Track and manage your internship applications</p>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-neutral-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Total:</span>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-bold">
                    {application?.length || 0}
                </Badge>
            </div>
        </div>

        {(!application || application.length === 0) ? (
          <div className="bg-white dark:bg-neutral-800 rounded-2xl p-12 text-center border border-dashed border-gray-200 dark:border-neutral-700 shadow-sm transition-all">
            <div className="w-20 h-20 bg-gray-50 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">You have not applied for any internships yet</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
              Explore thousands of opportunities and kickstart your career today.
            </p>
            <Link to="/internships">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/20">
                    Browse Internships
                </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {application.map((app) => {
              const internship = app.internshipId;
              const status = getStatusConfig(app.status);
              
              const internshipTitle = internship?.title || "Unknown Internship";
              const companyName = internship?.company || "Unknown Company";
              const location = internship?.location || "Not specified";
              const stipend = internship?.stipend || "Not specified";

              return (
                <Card key={app._id} className="group overflow-hidden border-gray-100 dark:border-neutral-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 rounded-2xl bg-white dark:bg-neutral-800">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row md:items-center">
                        {/* Company Logo Placeholder */}
                        <div className="p-6 md:p-8 flex items-center gap-6 flex-1">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-neutral-900 rounded-2xl flex items-center justify-center border border-gray-100 dark:border-neutral-700 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                <Building2 className="w-8 h-8 text-gray-400" />
                            </div>
                            
                            <div className="space-y-1">
                                <div className="flex flex-wrap items-center gap-2 mb-1">
                                    <Badge className={`${status.color} border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md flex items-center`}>
                                        {status.icon}
                                        {app.status.replace('_', ' ')}
                                    </Badge>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover:text-blue-600 transition-colors">
                                    {internshipTitle}
                                </h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span className="flex items-center gap-1.5">
                                        <Building2 className="w-3.5 h-3.5" />
                                        {companyName}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <MapPin className="w-3.5 h-3.5" />
                                        {location}
                                    </span>
                                    <span className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-0.5 rounded-md">
                                        {stipend}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Application Meta */}
                        <div className="px-6 pb-6 md:p-8 flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-l border-gray-100 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-900/30 md:w-56">
                            <div className="space-y-1 md:text-right">
                                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Applied</p>
                                <p className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 md:justify-end">
                                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                                    {new Date(app.submittedAt).toLocaleDateString(undefined, {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                            
                            <Link to={`/application/${app._id}`} className="mt-0 md:mt-4">
                                <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-bold group/btn">
                                    View Details
                                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyApplications;
