import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Link } from "react-router-dom";

export default function AdminMovies() {
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    api.get("/movies").then((res) => {
      setMovies(res.data.movies);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">
          🎬 Manage Movies
        </h1>

        <Link
          to="/admin/movies/add"
          className="bg-red-600 px-5 py-2 rounded-lg text-white hover:bg-red-700"
        >
          Add Movie
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-900 rounded-xl overflow-hidden shadow-lg"
          >
            <img
              src={`http://localhost:5000${movie.poster}`}
              alt={movie.title}
              className="h-60 w-full object-cover"
            />

            <div className="p-4 text-white">
              <h2 className="font-semibold text-lg">
                {movie.title}
              </h2>

              <p className="text-sm text-gray-400">
                {movie.language} • {movie.duration} min
              </p>

              <div className="flex justify-between mt-3 items-center">
                <span className="bg-green-600 px-2 py-1 text-xs rounded">
                  {movie.status}
                </span>

                <span>⭐ {movie.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
