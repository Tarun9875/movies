import { Link } from "react-router-dom";

export default function MovieCard({ movie }: any) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <div
        className="
          group
          bg-white 
          dark:bg-gray-800
          border border-gray-200 dark:border-gray-700
          rounded-2xl 
          overflow-hidden 
          shadow-sm 
          hover:shadow-xl 
          hover:-translate-y-1
          transition-all duration-300
        "
      >
        {/* Poster */}
        <div className="relative overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-72 w-full object-cover group-hover:scale-105 transition duration-500"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white group-hover:text-red-600 transition">
            {movie.title}
          </h2>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {movie.language} • {movie.duration} min
          </p>

          <div className="flex justify-between mt-4 items-center">
            {/* Status Badge */}
            <span
              className={`
                px-3 py-1 text-xs rounded-full font-medium
                ${
                  movie.status === "NOW_SHOWING"
                    ? "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300"
                    : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
                }
              `}
            >
              {movie.status === "NOW_SHOWING"
                ? "Now Showing"
                : "Upcoming"}
            </span>

            {/* Rating */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              ⭐ {movie.rating}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
