"use client";
import { useState } from "react";

export default function HomePage() {
  const [origin, setOrigin] = useState("");
  const [cities, setCities] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [interests, setInterests] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const url = process.env.NEXT_PUBLIC_BASE_URL;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`${url}/api/trip-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ origin, cities, dateRange, interests }),
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data.result);
      } else {
        setResult(data.error || "An error occurred");
      }
    } catch (error: any) {
      setResult("An error occurred while fetching the trip plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-[80%] bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Trip Planner Crew
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Origin"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Cities (comma-separated)"
            value={cities}
            onChange={(e) => setCities(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Date Range"
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            placeholder="Interests and Hobbies"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Planning your trip..." : "Get Trip Plan"}
          </button>
        </form>

        {result && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Your Trip Plan
            </h2>
            <pre className="text-sm text-gray-600 whitespace-pre-wrap">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
