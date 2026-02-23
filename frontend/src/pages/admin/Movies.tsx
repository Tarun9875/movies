// frontend/src/pages/admin/Movies.tsx

import { useEffect, useState } from "react";
import api from "../../services/axios";
import { Link } from "react-router-dom";

export default function AdminMovies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ================= FETCH =================
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await api.get("/movies");
      setMovies(res.data.movies);
      setFilteredMovies(res.data.movies);
      setError("");
    } catch (err) {
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // ================= SEARCH + FILTER =================
  useEffect(() => {
    let updated = movies;

    if (search) {
      updated = updated.filter((movie) =>
        movie.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (statusFilter !== "ALL") {
      updated = updated.filter(
        (movie) => movie.status === statusFilter
      );
    }

    setFilteredMovies(updated);
  }, [search, statusFilter, movies]);

  // ================= DELETE =================
  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this movie?")) return;

    try {
      await api.delete(`/movies/${id}`);
      fetchMovies();
    } catch {
      alert("Delete failed");
    }
  };

  // ================= TOGGLE STATUS =================
  const toggleStatus = async (movie: any) => {
    const newStatus =
      movie.status === "NOW_SHOWING"
        ? "UPCOMING"
        : "NOW_SHOWING";

    try {
      await api.put(`/movies/${movie._id}`, {
        ...movie,
        status: newStatus,
      });
      fetchMovies();
    } catch {
      alert("Status update failed");
    }
  };

  return (
    <div
      className="transition-colors"
      style={{ color: "var(--text-color)" }}
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">
          🎬 Manage Movies
        </h1>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              color: "var(--text-color)",
            }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              color: "var(--text-color)",
            }}
          >
            <option value="ALL">All</option>
            <option value="NOW_SHOWING">Now Showing</option>
            <option value="UPCOMING">Upcoming</option>
          </select>

          <Link
            to="/admin/movies/add"
            className="px-5 py-2 rounded-lg font-medium"
            style={{
              backgroundColor: "#dc2626",
              color: "#fff",
            }}
          >
            + Add Movie
          </Link>
        </div>
      </div>

      {/* ================= STATES ================= */}
      {loading && (
        <p style={{ color: "var(--muted-text)" }}>
          Loading movies...
        </p>
      )}

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      {!loading && filteredMovies.length === 0 && (
        <div
          className="p-8 text-center rounded-xl"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            color: "var(--muted-text)",
          }}
        >
          No movies found.
        </div>
      )}

      {/* ================= MOVIE GRID ================= */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMovies.map((movie) => (
          <div
            key={movie._id}
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
            }}
          >
            <img
              src={`http://localhost:5000${movie.poster}`}
              alt={movie.title}
              className="h-60 w-full object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">
                {movie.title}
              </h2>

              <p
                className="text-sm mb-3"
                style={{ color: "var(--muted-text)" }}
              >
                {movie.language} • {movie.duration} min
              </p>

              <div className="flex justify-between items-center mb-4">
                <span
                  className="px-2 py-1 text-xs rounded"
                  style={{
                    backgroundColor:
                      movie.status === "NOW_SHOWING"
                        ? "#16a34a"
                        : "#f59e0b",
                    color: "#fff",
                  }}
                >
                  {movie.status}
                </span>

                <span>⭐ {movie.rating}</span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">
                <Link
                  to={`/admin/movies/edit/${movie._id}`}
                  className="flex-1 text-center py-2 rounded-lg"
                  style={{
                    backgroundColor: "#2563eb",
                    color: "#fff",
                  }}
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(movie._id)}
                  className="flex-1 py-2 rounded-lg"
                  style={{
                    backgroundColor: "#dc2626",
                    color: "#fff",
                  }}
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => toggleStatus(movie)}
                className="w-full mt-3 py-2 rounded-lg"
                style={{
                  backgroundColor: "var(--border-color)",
                  color: "var(--text-color)",
                }}
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}