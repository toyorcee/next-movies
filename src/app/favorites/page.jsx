"use client";

import axios from "axios";
import Results from "@/components/Results";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function Favorites() {
  const [results, setResults] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.put("/api/user/getFav", null, {
        headers: { "Content-Type": "application/json" },
        timeout: 15000, 
      });
      setResults(res.data.favs);
    };

    if (isLoaded && isSignedIn && user) {
      fetchData();
    }
  }, [isLoaded, isSignedIn, user]);

  if (!isSignedIn) {
    return (
      <div className="text-center mt-10">
        <h1 className="text-xl my-5">Please sign in to view your favorites</h1>
      </div>
    );
  }

  return (
    <div>
      {!results ||
        (results.length === 0 && (
          <h1 className="text-center pt-6">No results found</h1>
        ))}
      {results && results.length !== 0 && (
        <Results
          results={results.map((result) => ({
            ...result,
            id: result.movieId,
            title: result.title,
            backdrop_path: result.image,
            overview: result.description,
            first_air_date: result.dateReleased.substring(0, 10),
            vote_count: result.rating,
          }))}
        />
      )}
    </div>
  );
}
