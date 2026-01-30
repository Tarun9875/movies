interface MovieProps {
  movie: any;
}

export default function MovieCard({ movie }: MovieProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow hover:scale-105 transition">
      <div className="h-56 bg-gray-300 rounded-t-lg flex items-center justify-center">
        {movie.poster ? (
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover rounded-t-lg"
          />
        ) : (
          <span className="text-gray-600">No Image</span>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          {movie.title}
        </h3>
        <p className="text-sm text-gray-500">
          ⭐ {movie.rating || "N/A"} | {movie.language}
        </p>
      </div>
    </div>
  );
}
