import React from "react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronsDown } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const InternshipList = () => {
  const [liked, setLiked] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const handleCardClick = () => {
    alert("Card clicked! Navigate or show details here.");
    // You can navigate to internship details page or open modal
  };
  const handleApplyFilters = () => {
    setShowCards(true);
  };

  return (
    <div className="bg-gradient-to-b from-amber-50 to-amber-200">
      <h1 className="text-2xl font-bold text-center mb-3">List Internship</h1>
      {/* left side */}
      <div className="flex gap-2 ">
        <div className="w-full md:w-1/3 flex flex-col p-4 md:h-screen md:overflow-y-auto bg-gradient-to-b from-amber-50 to-amber-200">
          <Card className="p-4 shadow-md rounded-xl border border-amber-200 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-semibold text-amber-700">
                🎯 Filters
              </CardTitle>
            </CardHeader>

            <CardContent>
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  <div className="flex justify-between items-center border border-amber-300 rounded-md p-3 hover:bg-amber-100 transition-all cursor-pointer">
                    <span className="font-medium text-gray-800">
                      Show Filters
                    </span>
                    <ChevronsDown className="w-5 h-5 text-amber-600 transition-transform duration-300 data-[state=open]:rotate-180" />
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent className="mt-2 flex flex-col gap-3 p-2">
                  {/* Sort By */}
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-700">Sort By</span>
                    <select className="border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-amber-400 focus:outline-none">
                      <option>Stipend — High to Low</option>
                      <option>Stipend — Low to High</option>
                      <option>Newest First</option>
                    </select>
                  </div>

                  {/* Status */}
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-gray-700">Status</span>
                    <select className="border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-amber-400 focus:outline-none">
                      <option>Active</option>
                      <option>Closed</option>
                      <option>Upcoming</option>
                    </select>
                  </div>

                  {/* Optional: Apply Button */}
                  <button
                    className="mt-3 w-full bg-amber-500 text-white p-2 rounded-md hover:bg-amber-600 transition-colors "
                    onClick={handleApplyFilters}
                  >
                    Apply Filters
                  </button>
                </CollapsibleContent>
              </Collapsible>
            </CardContent>
          </Card>
        </div>
        {/* Right side */}
        <div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
            <Card
              className={
                "border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              }
              onClick={handleCardClick}
            >
              {/* Card Header */}
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  {/* Internship Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="/internship.jpg"
                      alt="Internship"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Internship Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        UI/UX Designer Internship
                      </CardTitle>
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`transition-colors duration-200 ${
                          liked
                            ? "text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: Remote
                    </p>
                    <p className="text-sm text-gray-500">Posted: 3 days ago</p>
                  </div>
                </div>
              </CardHeader>

              {/* Optional Card Footer */}
              <CardContent className="p-4 border-t">
                <p className="text-sm text-gray-700">
                  Apply now to join an exciting UI/UX team and work on real
                  projects!
                </p>
              </CardContent>
            </Card>
            <Card
              className={
                "border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              }
              onClick={handleCardClick}
            >
              {/* Card Header */}
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  {/* Internship Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="/internship.jpg"
                      alt="Internship"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Internship Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        UI/UX Designer Internship
                      </CardTitle>
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`transition-colors duration-200 ${
                          liked
                            ? "text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: Remote
                    </p>
                    <p className="text-sm text-gray-500">Posted: 3 days ago</p>
                  </div>
                </div>
              </CardHeader>

              {/* Optional Card Footer */}
              <CardContent className="p-4 border-t">
                <p className="text-sm text-gray-700">
                  Apply now to join an exciting UI/UX team and work on real
                  projects!
                </p>
              </CardContent>
            </Card>
            <Card
              className={
                "border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              }
              onClick={handleCardClick}
            >
              {/* Card Header */}
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  {/* Internship Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="/internship.jpg"
                      alt="Internship"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Internship Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        UI/UX Designer Internship
                      </CardTitle>
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`transition-colors duration-200 ${
                          liked
                            ? "text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: Remote
                    </p>
                    <p className="text-sm text-gray-500">Posted: 3 days ago</p>
                  </div>
                </div>
              </CardHeader>

              {/* Optional Card Footer */}
              <CardContent className="p-4 border-t">
                <p className="text-sm text-gray-700">
                  Apply now to join an exciting UI/UX team and work on real
                  projects!
                </p>
              </CardContent>
            </Card>
            <Card
              className={
                "border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              }
              onClick={handleCardClick}
            >
              {/* Card Header */}
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  {/* Internship Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="/internship.jpg"
                      alt="Internship"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Internship Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        UI/UX Designer Internship
                      </CardTitle>
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`transition-colors duration-200 ${
                          liked
                            ? "text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: Remote
                    </p>
                    <p className="text-sm text-gray-500">Posted: 3 days ago</p>
                  </div>
                </div>
              </CardHeader>

              {/* Optional Card Footer */}
              <CardContent className="p-4 border-t">
                <p className="text-sm text-gray-700">
                  Apply now to join an exciting UI/UX team and work on real
                  projects!
                </p>
              </CardContent>
            </Card>
            <Card
              className={
                "border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              }
              onClick={handleCardClick}
            >
              {/* Card Header */}
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  {/* Internship Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="/internship.jpg"
                      alt="Internship"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Internship Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        UI/UX Designer Internship
                      </CardTitle>
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`transition-colors duration-200 ${
                          liked
                            ? "text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: Remote
                    </p>
                    <p className="text-sm text-gray-500">Posted: 3 days ago</p>
                  </div>
                </div>
              </CardHeader>

              {/* Optional Card Footer */}
              <CardContent className="p-4 border-t">
                <p className="text-sm text-gray-700">
                  Apply now to join an exciting UI/UX team and work on real
                  projects!
                </p>
              </CardContent>
            </Card>
            <Card
              className={
                "border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              }
              onClick={handleCardClick}
            >
              {/* Card Header */}
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  {/* Internship Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="/internship.jpg"
                      alt="Internship"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Internship Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        UI/UX Designer Internship
                      </CardTitle>
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`transition-colors duration-200 ${
                          liked
                            ? "text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: Remote
                    </p>
                    <p className="text-sm text-gray-500">Posted: 3 days ago</p>
                  </div>
                </div>
              </CardHeader>

              {/* Optional Card Footer */}
              <CardContent className="p-4 border-t">
                <p className="text-sm text-gray-700">
                  Apply now to join an exciting UI/UX team and work on real
                  projects!
                </p>
              </CardContent>
            </Card>
            <Card
              className={
                "border rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
              }
              onClick={handleCardClick}
            >
              {/* Card Header */}
              <CardHeader className="p-4">
                <div className="flex items-start gap-4">
                  {/* Internship Image */}
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src="/internship.jpg"
                      alt="Internship"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  {/* Internship Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-semibold">
                        UI/UX Designer Internship
                      </CardTitle>
                      {/* Wishlist Heart Icon */}
                      <button
                        onClick={() => setLiked(!liked)}
                        className={`transition-colors duration-200 ${
                          liked
                            ? "text-red-600"
                            : "text-gray-400 hover:text-red-500"
                        }`}
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      Location: Remote
                    </p>
                    <p className="text-sm text-gray-500">Posted: 3 days ago</p>
                  </div>
                </div>
              </CardHeader>

              {/* Optional Card Footer */}
              <CardContent className="p-4 border-t">
                <p className="text-sm text-gray-700">
                  Apply now to join an exciting UI/UX team and work on real
                  projects!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternshipList;
