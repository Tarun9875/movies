// frontend/src/pages/customer/MovieDetails.tsx

import { useParams, useNavigate } from "react-router-dom";
import PageContainer from "../../components/layout/PageContainer";
import { moviesData } from "../../assets/images/movies/moviesData";
import { useAppSelector } from "../../app/hooks";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

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
              className="
                rounded-2xl
                shadow-xl
                w-full
                max-w-md
                hover:scale-105
                transition duration-500
              "
              style={{
                border: "1px solid var(--border-color)",
              }}
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
              className="mb-8 leading-relaxed"
              style={{ color: "var(--muted-text)" }}
            >
              {movie.description}
            </p>

            {/* Info Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              style={{ color: "var(--text-color)" }}
            >
              <p><span className="font-semibold">🎥 Language:</span> {movie.language}</p>
              <p><span className="font-semibold">⏱ Duration:</span> {movie.duration} min</p>
              <p><span className="font-semibold">⭐ Rating:</span> {movie.rating}</p>
              <p><span className="font-semibold">🎭 Genre:</span> {movie.genre || "Action"}</p>
              <p><span className="font-semibold">📅 Release:</span> {movie.releaseDate || "2026"}</p>
              <p><span className="font-semibold">🎬 Director:</span> {movie.director || "Unknown"}</p>
            </div>

            {/* Cast */}
            <div className="mt-6">
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-color)" }}
              >
                👥 Cast
              </h3>
              <p style={{ color: "var(--muted-text)" }}>
                {movie.cast || "Lead Actor 1, Lead Actor 2"}
              </p>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookNow}
              className="
                mt-10 w-full
                py-3 rounded-xl
                font-semibold
                text-white
                bg-red-600
                hover:bg-red-700
                hover:shadow-lg
                hover:shadow-red-500/40
                transition-all duration-300
              "
            >
              🎟 Book Tickets
            </button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
}