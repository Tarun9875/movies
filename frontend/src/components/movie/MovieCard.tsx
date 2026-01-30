export default function MovieCard({ movie }: any) {
  return (
    <div
      className="
        bg-[#005B77]
        rounded-xl
        overflow-hidden
        shadow-lg
        hover:scale-105
        transition
      "
    >
      <div className="h-52 bg-[#003B5C] flex items-center justify-center">
        <span className="text-[#00B2B2]">Poster</span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-white">
          {movie.title}
        </h3>

        <p className="text-sm text-[#AEECEC]">
          ⭐ {movie.rating || "N/A"} | {movie.language}
        </p>

        <button
          className="
            mt-3 w-full py-2 rounded
            bg-[#007A8E]
            hover:bg-[#009DA5]
            text-white text-sm
          "
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
