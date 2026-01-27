const movies = [
  { id: 1, title: "Avengers: Endgame", rating: "8.5" },
  { id: 2, title: "Jawan", rating: "8.1" },
  { id: 3, title: "KGF Chapter 2", rating: "8.3" },
  { id: 4, title: "Inception", rating: "8.8" }
];

export default function MovieSlider() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden group"
        >
          {/* Poster */}
          <div className="h-56 bg-gray-300 group-hover:scale-105 transition-transform" />

          {/* Content */}
          <div className="p-4">
            <h3 className="font-semibold text-lg truncate">
              {movie.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              ⭐ {movie.rating} / 10
            </p>

            <button className="mt-3 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
