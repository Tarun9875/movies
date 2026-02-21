//frontend/src/pages/customer/MovieDetails.tsx
import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { moviesData } from "../../assets/images/movies/moviesData";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = moviesData.find((m) => m.id === id);

  if (!movie) {
    return (
      <PageContainer>
        <div className="py-40 text-center text-gray-600 dark:text-gray-300">
          Movie Not Found
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <section
        className="
          bg-gray-50 
          dark:bg-gray-950 
          transition-colors duration-300
          py-20
        "
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-start">

          {/* Poster */}
          <div className="flex justify-center">
            <img
              src={movie.poster}
              alt={movie.title}
              className="
                rounded-2xl 
                shadow-2xl 
                w-full 
                max-w-md 
                hover:scale-105 
                transition duration-500
              "
            />
          </div>

          {/* Details Card */}
          <div
            className="
              bg-white 
              dark:bg-gray-900
              border border-gray-200 dark:border-gray-700
              rounded-2xl 
              p-8 
              shadow-lg
              transition-all duration-300
            "
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {movie.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {movie.description}
            </p>

            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p>
                <span className="font-semibold">🎥 Language:</span>{" "}
                {movie.language}
              </p>

              <p>
                <span className="font-semibold">⏱ Duration:</span>{" "}
                {movie.duration} min
              </p>

              <p>
                <span className="font-semibold">⭐ Rating:</span>{" "}
                {movie.rating}
              </p>
            </div>

            {/* Book Now Button */}
            <button
              onClick={() => navigate(`/shows/${movie.id}/seats`)}
              className="
                mt-10 w-full
                bg-red-600 hover:bg-red-700
                text-white
                px-8 py-3
                rounded-xl
                shadow-md hover:shadow-xl
                transition duration-300
              "
            >
              🎟 Book Now
            </button>

          </div>
        </div>
      </section>
    </PageContainer>
  );
}
