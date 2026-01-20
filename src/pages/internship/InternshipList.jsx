import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  ChevronsDown, 
  Heart, 
  Search, 
  Filter, 
  MapPin, 
  Briefcase, 
  Calendar,
  Building2 
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchInternshipActions } from "../../features/internship/internshipaction.js";

const InternshipList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { internships, loading, error } = useSelector(
    (state) => state.internshipInfo
  );

  // Filter states
  const [appliedFilters, setAppliedFilters] = useState({
    status: "all",
    sortBy: "newest",
    searchTerm: "",
  });

  const [pendingFilters, setPendingFilters] = useState({
    status: "all",
    sortBy: "newest",
    searchTerm: "",
  });

  const [liked, setLiked] = useState({});

  useEffect(() => {
    !internships.length > 0 && dispatch(fetchInternshipActions());
  }, [dispatch, internships.length]);

  const handleCardClick = (slug) => {
    navigate(`/internship/${slug}`);
  };

  const handleFilterChange = (filterType, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters(pendingFilters);
  };

  const handleUndoChanges = () => {
    setPendingFilters(appliedFilters);
  };

  const handleClearAllFilters = () => {
    const defaults = {
      status: "all",
      sortBy: "newest",
      searchTerm: "",
    };
    setPendingFilters(defaults);
    setAppliedFilters(defaults);
  };

  // Filter and sort logic
  const filteredInternships = internships
    ?.filter((internship) => {
      // Status filter
      if (
        appliedFilters.status !== "all" &&
        internship.status !== appliedFilters.status.toLowerCase()
      ) {
        return false;
      }

      // Search term
      if (appliedFilters.searchTerm) {
        const searchLower = appliedFilters.searchTerm.toLowerCase();
        return (
          internship.title.toLowerCase().includes(searchLower) ||
          internship.company.toLowerCase().includes(searchLower) ||
          internship.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    })
    ?.sort((a, b) => {
      switch (appliedFilters.sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "deadline-soon":
          return (
            new Date(a.applicationDeadline || "9999-12-31") -
            new Date(b.applicationDeadline || "9999-12-31")
          );
        // ... sort cases
        case "deadline-far":
            return (
              new Date(b.applicationDeadline || "9999-12-31") -
              new Date(a.applicationDeadline || "9999-12-31")
            );
          case "applications-high":
            return b.applicationCount - a.applicationCount;
          case "applications-low":
            return a.applicationCount - b.applicationCount;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-neutral-900 pt-24 pb-12 px-4 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10 space-y-3">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Find Your Dream Internship
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Discover opportunities that match your skills and kickstart your career journey today.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Filters */}
          <aside className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-700 p-5 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Filter className="w-5 h-5 text-blue-600" />
                  Filters
                </h2>
                <span className="text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-1 rounded-full">
                  {filteredInternships?.length || 0} results
                </span>
              </div>

              <Collapsible defaultOpen className="space-y-6">
                {/* Mobile Toggle (only visible on small screens usually, but here keeping consistent) */}
                 {/* For this sidebar design, we keep it always open on desktop, collapsible logic can be adjusted for mobile responsiveness if needed, but keeping structure simple for now */}
                
                <div className="space-y-5">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Job title, company..."
                        value={pendingFilters.searchTerm}
                        onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                        className="pl-9 bg-gray-50 dark:bg-neutral-900 border-gray-200 dark:border-neutral-700 focus-visible:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Sort By */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort By</label>
                    <div className="relative">
                       <select
                          value={pendingFilters.sortBy}
                          onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                          className="w-full p-2.5 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                        >
                          <option value="newest">Newest First</option>
                          <option value="oldest">Oldest First</option>
                          <option value="deadline-soon">Ending Soon</option>
                          <option value="deadline-far">Ending Later</option>
                          <option value="applications-high">Most Popular</option>
                          <option value="applications-low">Less Competition</option>
                        </select>
                        <ChevronsDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                   {/* Status */}
                   <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                    <div className="relative">
                       <select
                          value={pendingFilters.status}
                          onChange={(e) => handleFilterChange("status", e.target.value)}
                          className="w-full p-2.5 bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-md text-sm text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                        >
                          <option value="all">Any Status</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="expired">Expired</option>
                        </select>
                        <ChevronsDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-neutral-700 flex flex-col gap-2">
                   <Button onClick={handleApplyFilters} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Apply Filters
                   </Button>
                   <div className="flex gap-2">
                      <Button variant="outline" onClick={handleUndoChanges} className="flex-1 text-xs">
                        Undo
                      </Button>
                      <Button variant="outline" onClick={handleClearAllFilters} className="flex-1 text-xs hover:text-red-600 hover:border-red-200 hover:bg-red-50">
                        Clear
                      </Button>
                   </div>
                </div>
              </Collapsible>
            </div>
          </aside>

          {/* Right Side - List */}
          <main className="flex-1">
             {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-500">Finding opportunities...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800/30 rounded-xl p-6 text-center">
                 <p className="text-red-600 dark:text-red-400 font-medium">Something went wrong</p>
                 <p className="text-sm text-red-500/80 mt-1">{error}</p>
                 <Button variant="outline" onClick={() => dispatch(fetchInternshipActions())} className="mt-4 border-red-200 text-red-600 hover:bg-red-50">
                    Try Again
                 </Button>
              </div>
            )}

            {!loading && !error && filteredInternships?.length === 0 && (
               <div className="bg-white dark:bg-neutral-800 rounded-xl border border-dashed border-gray-300 dark:border-neutral-700 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 dark:bg-neutral-900 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">No internships found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                  <Button variant="link" onClick={handleClearAllFilters} className="mt-2 text-blue-600">
                    Clear all filters
                  </Button>
               </div>
            )}
            
            <div className="grid gap-4">
              {!loading && !error && filteredInternships?.map((internship) => (
                <div 
                  key={internship._id}
                  onClick={() => handleCardClick(internship.slug)}
                  className="group bg-white dark:bg-neutral-800 rounded-xl p-5 border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex flex-col md:flex-row gap-5">
                     {/* Company Logo / Placeholder */}
                     <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gray-100 dark:bg-neutral-700 flex items-center justify-center flex-shrink-0 border border-gray-100 dark:border-neutral-600">
                        {/* Replace with actual image if available */}
                        <Building2 className="w-8 h-8 md:w-10 md:h-10 text-gray-400" />
                     </div>
                     
                     <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                           <div>
                              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-1">
                                {internship.title}
                              </h3>
                              <p className="text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1.5 mt-1">
                                 {internship.company}
                                 {/* <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600" />
                                 <span className="text-sm font-normal text-gray-500">2 days ago</span> */}
                              </p>
                           </div>
                           
                           <div className="flex items-center gap-2">
                              {/* Save Button (Mock functionality) */}
                              <button 
                                onClick={(e) => {
                                   e.stopPropagation();
                                   setLiked(prev => ({...prev, [internship._id]: !prev[internship._id]}));
                                }}
                                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors ${liked[internship._id] ? 'text-red-500' : 'text-gray-400'}`}
                              >
                                 <Heart className={`w-5 h-5 ${liked[internship._id] ? 'fill-current' : ''}`} />
                              </button>
                           </div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-3 mt-4 text-sm text-gray-500 dark:text-gray-400">
                           <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-gray-100 dark:border-neutral-700">
                              <MapPin className="w-3.5 h-3.5" />
                              {internship.location}
                           </div>
                           <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-gray-100 dark:border-neutral-700">
                              <Briefcase className="w-3.5 h-3.5" />
                              {internship.type || "Full-time"}
                           </div>
                           <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-neutral-900 px-2.5 py-1 rounded-md border border-gray-100 dark:border-neutral-700">
                              <Calendar className="w-3.5 h-3.5" />
                              {internship.duration || "3 Months"}
                           </div>
                        </div>

                         <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-700 flex items-center justify-between">
                            <div className="flex gap-2 overflow-hidden mask-fade-right">
                               {internship.roles?.slice(0, 3).map((role, i) => (
                                  <Badge key={i} variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 border-0 font-normal">
                                     {role}
                                  </Badge>
                               ))}
                               {internship.technologies?.slice(0, 2).map((tech, i) => (
                                  <Badge key={i} variant="secondary" className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-300 border-0 font-normal">
                                     {tech}
                                  </Badge>
                               ))}
                            </div>
                            
                            <span className="text-xs font-medium text-gray-400 flex-shrink-0">
                               {internship.applicationCount} Applicants
                            </span>
                         </div>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default InternshipList;
