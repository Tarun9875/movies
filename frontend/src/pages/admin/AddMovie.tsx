import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function AddMovie() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: "",
    language: "",
    rating: "",
    releaseDate: "",
    status: "NOW_SHOWING"
  });

  const [poster, setPoster] = useState<File | null>(null);

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );

    if (poster) formData.append("poster", poster);

    await api.post("/movies", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    navigate("/admin/movies");
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-900 p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-white mb-6">
        🎬 Add New Movie
      </h1>

      <div className="grid md:grid-cols-2 gap-4">

        <input
          placeholder="Title"
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Language"
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setForm({ ...form, language: e.target.value })}
        />

        <input
          placeholder="Duration (min)"
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
        />

        <input
          placeholder="Rating"
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        />

        <input
          type="date"
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
        />

        <select
          className="p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="NOW_SHOWING">Now Showing</option>
          <option value="UPCOMING">Upcoming</option>
        </select>

        <textarea
          placeholder="Description"
          className="md:col-span-2 p-2 rounded bg-gray-800 text-white"
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="file"
          className="md:col-span-2 text-white"
          onChange={(e) => setPoster(e.target.files?.[0] || null)}
        />

      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
      >
        Save Movie
      </button>
    </div>
  );
}
