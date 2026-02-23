// frontend/src/pages/admin/AddShow.tsx

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function AddShow() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<any[]>([]);
  const [form, setForm] = useState({
    movie: "",
    date: "",
    time: "",
    language: "English",
    screen: 1,
    price: 250,
    status: "ACTIVE",
  });

  useEffect(() => {
    api.get("/movies").then((res) => {
      setMovies(res.data.movies);
    });
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await api.post("/shows", form);
      navigate("/admin/shows");
    } catch {
      alert("Failed to create show");
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto p-6 rounded-xl"
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      <h1 className="text-2xl font-bold mb-6">
        ➕ Add New Show
      </h1>

      <form onSubmit={handleSubmit} className="grid gap-4">

        <select
          name="movie"
          onChange={handleChange}
          required
          className="p-3 rounded"
        >
          <option value="">Select Movie</option>
          {movies.map((m) => (
            <option key={m._id} value={m._id}>
              {m.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          onChange={handleChange}
          required
          className="p-3 rounded"
        />

        <input
          type="time"
          name="time"
          onChange={handleChange}
          required
          className="p-3 rounded"
        />

        <input
          type="number"
          name="screen"
          placeholder="Screen Number"
          onChange={handleChange}
          className="p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Ticket Price"
          onChange={handleChange}
          className="p-3 rounded"
        />

        <select
          name="language"
          onChange={handleChange}
          className="p-3 rounded"
        >
          <option>English</option>
          <option>Hindi</option>
          <option>3D</option>
          <option>IMAX</option>
        </select>

        <button
          type="submit"
          className="py-3 rounded-lg"
          style={{
            backgroundColor: "#dc2626",
            color: "#fff",
          }}
        >
          Create Show
        </button>

      </form>
    </div>
  );
}