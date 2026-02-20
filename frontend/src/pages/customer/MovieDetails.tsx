import { useParams } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { moviesData } from "../../assets/images/movies/moviesData";

export default function MovieDetails() {
  const { id } = useParams();
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
      <section className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">

          {/* Poster */}
          <div className="flex justify-center">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-2xl shadow-2xl w-full max-w-md"
            />
          </div>

          {/* Details */}
          <div className="bg-white dark:bg-gray-900 
                          border border-gray-200 dark:border-gray-700
                          rounded-2xl p-8 shadow-lg transition">

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              {movie.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {movie.description}
            </p>

            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <p><span className="font-semibold">🎥 Language:</span> {movie.language}</p>
              <p><span className="font-semibold">⏱ Duration:</span> {movie.duration} min</p>
              <p><span className="font-semibold">⭐ Rating:</span> {movie.rating}</p>
            </div>

            <button className="mt-8 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-xl shadow-md hover:shadow-lg transition">
              Book Now
            </button>

          </div>
        </div>
      </section>
    </PageContainer>
  );
}
