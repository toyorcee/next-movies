import Results from "@/components/Results";
const API_KEY = process.env.API_KEY;
export default async function Home({ params }) {
  const { genre } = await params;
  const res = await fetch(
    `https://api.themoviedb.org/3${
      genre === "rated" ? `/movie/top_rated` : `/trending/all/week`
    }?api_key=${API_KEY}&language=en-US&page=1`
  );
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const results = data.results;

  return (
    <div>
      <h3 className="text-center my-2 font-bold">
        {genre === "rated" ? "Top Rated Movies" : "Trending Movies"}
      </h3>
      <Results results={results} />
    </div>
  );
}
