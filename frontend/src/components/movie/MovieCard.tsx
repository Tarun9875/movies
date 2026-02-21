// frontend/src/components/movie/MovieCard.tsx

import { Link } from "react-router-dom";

export default function MovieCard({ movie }: any) {
  if (!movie) return null;

  return (
    <div
      className="
        group
        flex flex-col
        rounded-2xl
        overflow-hidden
        shadow-md
        hover:shadow-2xl
        transition-all duration-300
        hover:-translate-y-2
      "
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--border-color)",
      }}
    >
      {/* Clickable Content */}
      <Link to={`/movies/${movie.id}`} className="block">
        {/* Poster */}
        <div className="relative overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="
              h-72 w-full object-cover
              group-hover:scale-110
              transition duration-500
            "
          />

          {/* Hover overlay */}
          <div className="
            absolute inset-0
            bg-gradient-to-t from-black/50 via-transparent to-transparent
            opacity-0 group-hover:opacity-100
            transition duration-300
          " />
        </div>

        {/* Content */}
        <div className="p-5">
          <h2
            className="
              text-lg font-semibold
              transition
              group-hover:text-red-500
            "
            style={{ color: "var(--text-color)" }}
          >
            {movie.title}
          </h2>

          <p
            className="text-sm mt-1"
            style={{ color: "var(--muted-text)" }}
          >
            {movie.language} • {movie.duration} min
          </p>
        </div>
      </Link>

      {/* Bottom Section */}
      <div className="px-5 pb-5 mt-auto">

        {/* Status + Rating */}
        <div className="flex justify-between items-center mb-4">

          {/* Status Badge */}
          <span
            className="
              px-3 py-1 text-xs rounded-full font-medium
            "
            style={{
              backgroundColor:
                movie.status === "NOW_SHOWING"
                  ? "#16a34a20"
                  : "#ca8a0420",
              color:
                movie.status === "NOW_SHOWING"
                  ? "#16a34a"
                  : "#ca8a04",
            }}
          >
            {movie.status === "NOW_SHOWING"
              ? "Now Showing"
              : "Upcoming"}
          </span>

          {/* ⭐ Animated Rating Badge */}
          <span
            className="
              px-3 py-1 text-xs rounded-full font-semibold
              bg-yellow-400 text-black
              shadow-md
              animate-pulse
            "
          >
            ⭐ {movie.rating}
          </span>
        </div>

        {/* 🎬 Sticky Bottom Netflix Button */}
        <button
          className="
            w-full
            py-2
            rounded-lg
            font-semibold
            text-white
            transition-all duration-300
            bg-red-600
            hover:bg-red-700
            hover:shadow-lg
            hover:shadow-red-500/40
          "
          onClick={() => window.location.href = `/booking/${movie.id}`}
        >
          Book Now
        </button>

      </div>
    </div>
  );
}
