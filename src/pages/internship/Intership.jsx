import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, MessageCircle } from "lucide-react";
import { fetchInternshipActions } from "../../features/internship/internshipaction.js";

const Intership = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInternshipActions());
  }, [dispatch]);
  return (
    <div className="bg-gradient-to-br from-amber-100 to-yellow-200 min-h-screen w-full p-6 flex gap-6">
      {/* RIGHT SIDE */}
      <div className="w-2/3 flex flex-col gap-6">
        <div className="bg-white rounded-2xl shadow-xl p-6 flex gap-6">
          <div className="w-40 h-40 bg-amber-300 rounded-2xl shadow-inner"></div>

          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-bold text-gray-800">
              Frontend Developer Internship at TechNova Pvt. Ltd.
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <MapPin size={18} /> Bengaluru, India
            </p>
          </div>
        </div>

        {/* NAV BUTTONS */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-lg">
          <a href="#details">
            <Button className="bg-amber-100 text-black rounded-xl border border-amber-500 px-4 py-2">
              Internship Details
            </Button>
          </a>
          <Button className="bg-amber-100 text-black rounded-xl border border-amber-500 px-4 py-2">
            Dates & Duration
          </Button>
          <Button className="bg-amber-100 text-black rounded-xl border border-amber-500 px-4 py-2">
            Reviews
          </Button>
          <Button className="bg-amber-100 text-black rounded-xl border border-amber-500 px-4 py-2">
            FAQ
          </Button>
        </div>

        {/* DETAILS SECTION */}
        <div className="bg-white p-6 rounded-2xl shadow-xl" id="details">
          <h1 className="text-xl font-semibold mb-3">Details</h1>
          <p className="text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit
            earum, accusantium illo et aut sed odit placeat. Aliquid quia
            nesciunt sit delectus doloribus similique, vitae nihil sequi totam
            maiores perspiciatis? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Magnam dolorem totam dignissimos, nostrum impedit
            necessitatibus!
          </p>
        </div>
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
              <Calendar size={18} /> Duration: 3 Months
            </p>
            <p className="text-gray-600 flex gap-2 items-center">
              <Star size={18} /> Rating: 4.7/5
            </p>
            <p className="text-gray-600 flex gap-2 items-center">
              <MessageCircle size={18} /> 120+ Reviews
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-blue-600 text-white py-3 rounded-xl shadow-md">
              Apply Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Intership;
