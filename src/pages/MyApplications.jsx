import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getApplicationsByUser } from "../features/application/applicationapi";
import { Card } from "@/components/ui/card";

const MyApplications = () => {
  const authId = useSelector((state) => state.userInfo?.users?.authId);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApplications = async () => {
    if (!authId) return;
    setLoading(true);
    try {
      const res = await getApplicationsByUser(authId);
      if (res?.status === "success") setApplications(res.payload || []);
      else setApplications([]);
    } catch (err) {
      console.error("fetch applications", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [authId]);

  return (
    <div className="min-h-screen pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
        {loading && <div className="text-gray-500">Loading…</div>}

        {!loading && applications.length === 0 && (
          <div className="text-gray-500">
            You have not applied to any internships yet.
          </div>
        )}

        <div className="space-y-3 mt-4">
          {applications.map((app) => (
            <Card key={app._id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">
                    {app.internshipId?.title || "Untitled"}
                  </div>
                  <div className="text-sm text-gray-500">
                    Applied on: {new Date(app.submittedAt).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-sm px-3 py-1 rounded-md bg-gray-100 capitalize">
                  {app.status}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyApplications;
