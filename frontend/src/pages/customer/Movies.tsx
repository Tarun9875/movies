import { useEffect, useState } from "react";
import { fetchMoviesAPI } from "../../features/movie/movieAPI";
import MovieCard from "../../components/movie/MovieCard";

export default function Movies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoviesAPI()
      .then((res) => setMovies(res.data.movies))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading movies...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🎬 Movies</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
