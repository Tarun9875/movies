// frontend/src/pages/customer/MovieDetails.tsx

import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { moviesData } from "../../assets/images/movies/moviesData";
import { useAppSelector } from "../../app/hooks";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [showTrailer, setShowTrailer] = useState(false);

  const movie = moviesData.find((m) => m.id === id);

  if (!movie) {
    return (
      <PageContainer>
        <div
          className="py-40 text-center text-xl"
          style={{ color: "var(--text-color)" }}
        >
          🎬 Movie Not Found
        </div>
      </PageContainer>
    );
  }

  const handleBookNow = () => {
    if (!user) {
      navigate("/login", {
        state: { redirectTo: `/shows/${movie.id}/seats` },
      });
    } else {
      navigate(`/shows/${movie.id}/seats`);
    }
  };

  return (
    <PageContainer>
      <section className="min-h-screen py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14">

          {/* Poster */}
          <div className="flex justify-center">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-2xl shadow-xl w-full max-w-md hover:scale-105 transition duration-500"
              style={{ border: "1px solid var(--border-color)" }}
            />
          </div>

          {/* Details Card */}
          <div
            className="rounded-2xl p-10 shadow-lg transition-all duration-300"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
          >
            {/* Title */}
            <h1
              className="text-4xl font-bold mb-6"
              style={{ color: "var(--text-color)" }}
            >
              {movie.title}
            </h1>

            {/* Description */}
            <p
              className="mb-6 leading-relaxed"
              style={{ color: "var(--muted-text)" }}
            >
              {movie.description}
            </p>

            {/* Trailer Button */}
            {movie.trailer && (
              <button
                onClick={() => setShowTrailer(true)}
                className="mb-8 px-6 py-2 rounded-lg font-medium text-white bg-black hover:opacity-80 transition"
              >
                ▶ Watch Trailer
              </button>
            )}

            {/* Movie Info */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
              style={{ color: "var(--text-color)" }}
            >
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
              <p>
                <span className="font-semibold">🎭 Genre:</span>{" "}
                {movie.genre}
              </p>
              <p>
                <span className="font-semibold">📅 Release:</span>{" "}
                {movie.releaseDate}
              </p>
              <p>
                <span className="font-semibold">🎬 Director:</span>{" "}
                {movie.director}
              </p>
            </div>

            {/* Cast Section */}
            {movie.cast && movie.cast.length > 0 && (
              <div className="mt-10">
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "var(--text-color)" }}
                >
                  👥 Cast
                </h3>

                <div className="flex gap-6 overflow-x-auto pb-2">
                  {movie.cast.map((actor: any, index: number) => (
                    <div
                      key={index}
                      className="flex flex-col items-center min-w-[120px] hover:scale-105 transition duration-300"
                    >
                      <img
                        src={actor.image}
                        alt={actor.name}
                        className="w-24 h-24 rounded-full object-cover shadow-md"
                        style={{
                          border: "2px solid var(--border-color)",
                        }}
                      />
                      <p
                        className="mt-2 text-sm font-semibold text-center"
                        style={{ color: "var(--text-color)" }}
                      >
                        {actor.name}
                      </p>
                      <p
                        className="text-xs text-center"
                        style={{ color: "var(--muted-text)" }}
                      >
                        {actor.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              className="mt-10 w-full py-3 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 hover:shadow-lg hover:shadow-red-500/40 transition-all duration-300"
            >
              🎟 Book Tickets
            </button>
          </div>
        </div>

        {/* Trailer Modal */}
        {showTrailer && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative w-[90%] md:w-[750px] aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
              <button
                onClick={() => setShowTrailer(false)}
                className="absolute top-3 right-3 bg-white px-3 py-1 rounded-md shadow"
              >
                ✕
              </button>

              <iframe
                src={movie.trailer?.replace("watch?v=", "embed/")}
                title="Trailer"
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </section>
    </PageContainer>
  );
}