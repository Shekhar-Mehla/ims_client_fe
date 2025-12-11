import React, { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsDown, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInternshipActions } from "../../features/internship/internshipaction.js";

const InternshipList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { internships, loading, error } = useSelector(
    (state) => state.internshipInfo
  );

  // Filter states
  const [filters, setFilters] = useState({
    status: "all",
    sortBy: "newest",
    searchTerm: "",
  });

  const [liked, setLiked] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchInternshipActions());
  }, [dispatch]);

  const handleCardClick = (internship) => {
    console.log("Card clicked for:", internship.title);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleApplyFilters = () => {
    setShowFilters(true);
  };

  // Filter and sort internships
  const filteredInternships = internships
    ?.filter((internship) => {
      // Status filter
      if (
        filters.status !== "all" &&
        internship.status !== filters.status.toLowerCase()
      ) {
        return false;
      }

      // Search term filter (searches in title, company, description)
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matchesTitle = internship.title
          .toLowerCase()
          .includes(searchLower);
        const matchesCompany = internship.company
          .toLowerCase()
          .includes(searchLower);
        const matchesDescription = internship.description
          .toLowerCase()
          .includes(searchLower);

        if (!matchesTitle && !matchesCompany && !matchesDescription) {
          return false;
        }
      }

      return true;
    })
    ?.sort((a, b) => {
      // Sort logic
      switch (filters.sortBy) {
        case "newest":
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        case "oldest":
          return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
        case "applications-high":
          return b.applicationCount - a.applicationCount;
        case "applications-low":
          return a.applicationCount - b.applicationCount;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-200 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Find Your Perfect Internship
        </h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side - Filters */}
          <div className="w-full lg:w-1/3">
            <Card className="p-6 shadow-lg rounded-xl border border-amber-200 bg-white/90 backdrop-blur-sm sticky top-4">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-amber-700 flex items-center gap-2">
                  🎯 Filters
                  <span className="text-sm bg-amber-100 text-amber-800 px-2 py-1 rounded-full">
                    {filteredInternships?.length || 0} results
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent>
                <Collapsible>
                  <CollapsibleTrigger className="w-full">
                    <div className="flex justify-between items-center border border-amber-300 rounded-lg p-3 hover:bg-amber-100 transition-all cursor-pointer">
                      <span className="font-medium text-gray-800">
                        Show Filters
                      </span>
                      <ChevronsDown className="w-5 h-5 text-amber-600 transition-transform duration-300 data-[state=open]:rotate-180" />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-4 flex flex-col gap-4">
                    {/* Search */}
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-gray-700 text-sm">
                        Search
                      </label>
                      <input
                        type="text"
                        placeholder="Search internships..."
                        value={filters.searchTerm}
                        onChange={(e) =>
                          handleFilterChange("searchTerm", e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all"
                      />
                    </div>

                    {/* Sort By */}
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-gray-700 text-sm">
                        Sort By
                      </label>
                      <select
                        value={filters.sortBy}
                        onChange={(e) =>
                          handleFilterChange("sortBy", e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all bg-white"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="applications-high">
                          Most Applications
                        </option>
                        <option value="applications-low">
                          Least Applications
                        </option>
                      </select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col gap-2">
                      <label className="font-medium text-gray-700 text-sm">
                        Status
                      </label>
                      <select
                        value={filters.status}
                        onChange={(e) =>
                          handleFilterChange("status", e.target.value)
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all bg-white"
                      >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="expired">Expired</option>
                      </select>
                    </div>

                    {/* Clear Filters */}
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() =>
                          setFilters({
                            status: "all",
                            sortBy: "newest",
                            searchTerm: "",
                          })
                        }
                        className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm"
                      >
                        Clear Filters
                      </button>
                      <button
                        onClick={handleApplyFilters}
                        className="flex-1 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition-colors text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Internship Cards */}
          <div className="w-full lg:w-2/3">
            {loading && (
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
                  <p className="text-gray-600 text-lg">
                    Loading internships...
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <div className="text-red-500 mb-6">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <p className="text-red-600 font-medium text-xl mb-2">
                  Error loading internships
                </p>
                <p className="text-gray-500 text-lg">{error}</p>
              </div>
            )}

            {!loading &&
              !error &&
              filteredInternships &&
              filteredInternships.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-6">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium text-xl mb-2">
                    No internships found
                  </p>
                  <p className="text-gray-500 text-lg">
                    Try adjusting your filters or check back later for new
                    opportunities
                  </p>
                </div>
              )}

            {!loading &&
              !error &&
              filteredInternships &&
              filteredInternships.length > 0 && (
                <div>
                  {/* Results header */}
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-gray-600">
                      Showing{" "}
                      <span className="font-semibold text-gray-800">
                        {filteredInternships.length}
                      </span>{" "}
                      internship{filteredInternships.length !== 1 ? "s" : ""}
                      {filters.status !== "all" && (
                        <span>
                          {" "}
                          with status{" "}
                          <span className="font-semibold text-amber-600 capitalize">
                            {filters.status}
                          </span>
                        </span>
                      )}
                      {filters.searchTerm && (
                        <span>
                          {" "}
                          matching "
                          <span className="font-semibold text-amber-600">
                            {filters.searchTerm}
                          </span>
                          "
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
                    {filteredInternships.map((internship) => (
                      <Card
                        key={internship._id}
                        className="border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
                        onClick={() => handleCardClick(internship)}
                      >
                        {/* Card Header */}
                        <CardHeader className="p-4">
                          <div className="flex items-start gap-4">
                            {/* Internship Image */}
                            <div className="w-24 h-24 flex-shrink-0">
                              <img
                                src="/internship.jpg"
                                alt={internship.title}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            </div>

                            {/* Internship Details */}
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-lg font-semibold">
                                  {internship.title}
                                </CardTitle>
                                {/* Wishlist Heart Icon */}
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLiked((prev) => ({
                                      ...prev,
                                      [internship._id]: !prev[internship._id],
                                    }));
                                  }}
                                  className={`transition-colors duration-200 ${
                                    liked[internship._id]
                                      ? "text-red-600"
                                      : "text-gray-400 hover:text-red-500"
                                  }`}
                                >
                                  <Heart className="h-5 w-5" />
                                </button>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">
                                Location: {internship.location}
                              </p>
                              <p className="text-sm text-gray-600">
                                Company: {internship.company}
                              </p>
                              <p className="text-sm text-gray-500">
                                Applications: {internship.applicationCount}
                              </p>
                              <p className="text-sm text-gray-500">
                                Posted by: {internship.postedByName}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        {/* Card Content */}
                        <CardContent className="p-4 border-t">
                          <div className="mb-3">
                            <p className="text-sm text-gray-700 line-clamp-3">
                              {internship.description}
                            </p>
                          </div>

                          {/* Technologies */}
                          {internship.technologies &&
                            internship.technologies.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs font-medium text-gray-600 mb-1">
                                  Technologies:
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {internship.technologies
                                    .slice(0, 4)
                                    .map((tech, index) => (
                                      <span
                                        key={index}
                                        className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-full"
                                      >
                                        {tech}
                                      </span>
                                    ))}
                                  {internship.technologies.length > 4 && (
                                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                      +{internship.technologies.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                          {/* Roles */}
                          {internship.roles && internship.roles.length > 0 && (
                            <div className="mb-3">
                              <p className="text-xs font-medium text-gray-600 mb-1">
                                Roles:
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {internship.roles
                                  .slice(0, 2)
                                  .map((role, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                    >
                                      {role}
                                    </span>
                                  ))}
                                {internship.roles.length > 2 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                    +{internship.roles.length - 2} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </CardContent>

                        {/* Card Footer */}
                        <CardFooter className="p-4 border-t bg-gray-50">
                          <Button
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/internship/${internship._id}`, {
                                state: { internship },
                              });
                            }}
                          >
                            Apply Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipList;
