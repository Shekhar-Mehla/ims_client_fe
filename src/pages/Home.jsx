import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Briefcase,
  CheckCircle,
  Shield,
  TrendingUp,
  ArrowRight,
  Search,
  FileText,
  BarChart3,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchInternshipActions } from "../features/internship/internshipaction.js";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Get internships from Redux state
  const { internships } = useSelector((state) => state.internshipInfo);
  const isAuthenticated = useSelector((state) => state.userInfo?.users?._id);
  const user = useSelector((state) => state.userInfo?.users);

  // Fetch internships once on mount
  useEffect(() => {
    if (!internships || internships.length === 0) {
      setLoading(true);
      dispatch(fetchInternshipActions())
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
    // We intentionally exclude `internships` from deps to avoid
    // an infinite loop when the slice clears & refetches data.
  }, [dispatch]);

  // Filter and limit featured internships (active status, max 6)
  const featuredInternships =
    internships
      ?.filter((internship) => internship.status === "active")
      .slice(0, 6) || [];

  const handleInternshipClick = (slug) => {
    navigate(`/internship/${slug}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-amber-50">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 px-4 md:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-indigo-500/5 to-amber-500/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Find Your Perfect{" "}
              <span className="text-blue-600 dark:text-blue-400">
                IT Internship
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Connect with top companies, build your skills, and launch your
              career. Manage your internship journey with ease - apply, track,
              and get updates on opportunities that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/internships">
                  Browse Internships
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              {isAuthenticated ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
                >
                  <Link to="/profile">
                    View Profile
                    <Users className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg"
                >
                  <Link to="/register">
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              )}
            </div>
            {isAuthenticated && user?.firstName && (
              <p className="mt-6 text-gray-600 dark:text-gray-400">
                Welcome back,{" "}
                <span className="font-semibold">{user.firstName}</span>!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to find and secure your dream internship
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="border border-gray-200 dark:border-neutral-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="text-xl">
                  Easy Application Process
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Streamlined application workflow that saves you time. Apply to
                  multiple internships with just a few clicks.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border border-gray-200 dark:border-neutral-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                </div>
                <CardTitle className="text-xl">
                  Track Your Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Monitor your application status in real-time. Stay updated on
                  every opportunity you've applied to.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border border-gray-200 dark:border-neutral-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-xl">
                  Verified Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Quality internships from trusted companies. We verify every
                  opportunity to ensure authenticity.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border border-gray-200 dark:border-neutral-800 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="text-xl">Career Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Build essential skills, expand your network, and accelerate
                  your career with real-world experience.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Internships Preview */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-b from-amber-50 to-amber-100 dark:from-neutral-900 dark:to-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Internships
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Explore exciting opportunities waiting for you
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-amber-500 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Loading internships...
                </p>
              </div>
            </div>
          ) : featuredInternships.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                No internships available at the moment
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                Check back later for new opportunities
              </p>
            </div>
          ) : (
            <>
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
                {featuredInternships.map((internship) => (
                  <Card
                    key={internship._id}
                    className="border border-amber-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer hover:shadow-xl transition-all hover:-translate-y-1"
                    onClick={() => handleInternshipClick(internship.slug)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                            {internship.title}
                          </CardTitle>
                          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4" />
                              <span>{internship.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{internship.location}</span>
                            </div>
                            {internship.applicationCount !== undefined && (
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                <span>
                                  {internship.applicationCount} applications
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                        {internship.description}
                      </p>
                      {internship.technologies &&
                        internship.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {internship.technologies
                              .slice(0, 3)
                              .map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            {internship.technologies.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                                +{internship.technologies.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleInternshipClick(internship.slug);
                        }}
                      >
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Mobile Horizontal Scroll */}
              <div className="md:hidden overflow-x-auto pb-4 mb-8 -mx-4 px-4">
                <div className="flex gap-4" style={{ width: "max-content" }}>
                  {featuredInternships.map((internship) => (
                    <Card
                      key={internship._id}
                      className="w-80 flex-shrink-0 border border-amber-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 cursor-pointer hover:shadow-xl transition-all"
                      onClick={() => handleInternshipClick(internship.slug)}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                          {internship.title}
                        </CardTitle>
                        <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4" />
                            <span>{internship.company}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{internship.location}</span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3 mb-4">
                          {internship.description}
                        </p>
                        {internship.technologies &&
                          internship.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {internship.technologies
                                .slice(0, 2)
                                .map((tech, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-xs rounded-full"
                                  >
                                    {tech}
                                  </span>
                                ))}
                            </div>
                          )}
                      </CardContent>
                      <CardFooter>
                        <Button
                          className="w-full bg-amber-500 hover:bg-amber-600 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleInternshipClick(internship.slug);
                          }}
                        >
                          View Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-6 text-lg"
                >
                  <Link to="/internships">
                    View All Internships
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    1
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Create Account
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up and build your profile. Tell us about your skills,
                interests, and career goals.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-amber-500 dark:bg-amber-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    2
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Browse & Apply
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore opportunities that match your profile. Apply to
                internships with a single click.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    3
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Track & Succeed
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor your application status, receive updates, and get hired
                by top companies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isAuthenticated
              ? "Ready to Find Your Next Opportunity?"
              : "Ready to Start Your Internship Journey?"}
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {isAuthenticated
              ? "Browse our latest internships and take the next step in your career."
              : "Join thousands of students who have found their dream internships through our platform."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* Primary action: high-contrast, accessible */}
            <Button
              asChild
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-4 text-lg shadow-lg hover:shadow-xl transition-all rounded-md flex items-center gap-2"
              aria-label="Browse Internships"
            >
              <Link to="/internships" className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Browse Internships</span>
              </Link>
            </Button>

            {/* Secondary action (sign up): visible on dark background and flips on hover for readability */}
            {!isAuthenticated && (
              <Button
                asChild
                size="lg"
                className="bg-white/10 border border-white text-white hover:bg-white hover:text-blue-700 px-6 py-4 text-lg rounded-md transition-colors flex items-center gap-2"
                aria-label="Sign up for an account"
              >
                <Link to="/register" className="flex items-center gap-2">
                  <span className="font-semibold">Sign Up Now</span>
                  <ArrowRight className="ml-1 w-5 h-5 text-current" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
