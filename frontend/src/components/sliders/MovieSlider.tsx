// frontend/src/components/sliders/MovieSlider.tsx

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
          className="rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)"
          }}
        >
          {/* Poster */}
          <div
            className="h-56 group-hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: "var(--border-color)" }}
          />

          {/* Content */}
          <div className="p-4">
            <h3
              className="font-semibold truncate"
              style={{ color: "var(--text-color)" }}
            >
              {movie.title}
            </h3>

            <p
              className="text-sm mt-1"
              style={{ color: "var(--muted-text)" }}
            >
              ⭐ {movie.rating} / 10
            </p>

            <button className="mt-4 w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold transition-colors duration-300">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
