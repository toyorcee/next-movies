import Results from "@/components/Results";
import axios from "axios";

export default async function page({ params }) {
  const { searchTerm } = await params;

  const res = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`,
    { timeout: 15000 }
  );

  const results = res.data.results;

  return (
    <div>
      {!results ||
        (results.length === 0 && (
          <h1 className="text-center pt-6">No results found</h1>
        ))}
      {results && results.length !== 0 && <Results results={results} />}
    </div>
  );
}
