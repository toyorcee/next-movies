import axios from "axios";
import Results from "@/components/Results";

const API_KEY = process.env.API_KEY;

export default async function Home() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US&page=1`,
      {
        timeout: 15000, 
      }
    );

    if (res.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const results = res.data.results;

    return (
      <div>
        <h3 className="text-center my-2 font-bold">All Movies</h3>
        <Results results={results} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="text-center mt-5 text-red-500">
        <h2>Failed to load movies. Please try again later.</h2>
      </div>
    );
  }
}
