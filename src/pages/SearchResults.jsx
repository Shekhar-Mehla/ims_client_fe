import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { getAllInternships } from "../features/internship/internshipapi";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const q = (searchParams.get("q") || "").toString().trim();

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getAllInternships();
        if (res?.status === "success") {
          const list = res.payload || [];
          if (!q) {
            setResults([]);
          } else {
            const qLower = q.toLowerCase();
            const filtered = list.filter((it) => {
              return (
                (it.title || "").toLowerCase().includes(qLower) ||
                (it.company || "").toLowerCase().includes(qLower) ||
                (it.description || "").toLowerCase().includes(qLower)
              );
            });
            setResults(filtered);
          }
        } else {
          setError("Unable to fetch internships");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching internships");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [q]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-200 px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Search results{" "}
          {q ? <span className="text-amber-600">for "{q}"</span> : null}
        </h1>

        {!q && (
          <div className="p-6 bg-white rounded-lg shadow-sm border border-amber-100">
            <p className="text-gray-700">
              Type a search term in the header and press Enter to find
              internships.
            </p>
            <button
              onClick={() => navigate("/internships")}
              className="mt-3 inline-block bg-amber-500 text-white px-4 py-2 rounded-lg"
            >
              Browse all internships
            </button>
          </div>
        )}

        {q && (
          <div className="mt-3">
            {loading && <div className="text-gray-600">Loading...</div>}
            {error && <div className="text-red-600">{error}</div>}

            {!loading && !error && results.length === 0 && (
              <div className="p-6 bg-white rounded-lg shadow-sm border border-amber-100">
                <p className="text-gray-700">No results found for "{q}".</p>
                <p className="text-sm text-gray-500 mt-2">
                  Try different keywords or check the{" "}
                  <button
                    onClick={() => navigate("/internships")}
                    className="text-amber-600 underline"
                  >
                    internship listings
                  </button>
                  .
                </p>
              </div>
            )}

            {!loading && !error && results.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {results.map((it) => (
                  <div
                    key={it._id}
                    onClick={() => navigate(`/internship/${it.slug}`)}
                    className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-md border border-amber-100"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {it.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {it.company} • {it.location || "Remote"}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(
                          it.createdAt || Date.now()
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {it.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
