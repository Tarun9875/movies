// frontend/src/pages/admin/AddMovie.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
    status: "NOW_SHOWING",
  });

  const [poster, setPoster] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ================= HANDLE CHANGE =================
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= POSTER PREVIEW =================
  const handlePosterChange = (file: File | null) => {
    if (!file) return;
    setPoster(file);
    setPreview(URL.createObjectURL(file));
  };

  // ================= VALIDATION =================
  const validateForm = () => {
    if (!form.title || !form.language || !form.duration) {
      toast.error("Please fill all required fields");
      return false;
    }
    if (!poster) {
      toast.error("Please upload a movie poster");
      return false;
    }
    return true;
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (poster) formData.append("poster", poster);

      await api.post("/movies", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Movie added successfully 🎉");
      navigate("/admin/movies");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add movie");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-8 rounded-xl shadow-xl"
      style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--border-color)",
        color: "var(--text-color)",
      }}
    >
      <h1 className="text-3xl font-bold mb-6">
        🎬 Add New Movie
      </h1>

      <div className="grid md:grid-cols-2 gap-5">

        <input
          name="title"
          placeholder="Movie Title *"
          className="p-3 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
          onChange={handleChange}
        />

        <input
          name="language"
          placeholder="Language *"
          className="p-3 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
          onChange={handleChange}
        />

        <input
          name="duration"
          placeholder="Duration (min) *"
          className="p-3 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
          onChange={handleChange}
        />

        <input
          name="rating"
          placeholder="Rating (e.g. 8.5)"
          className="p-3 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
          onChange={handleChange}
        />

        <input
          type="date"
          name="releaseDate"
          className="p-3 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
          onChange={handleChange}
        />

        <select
          name="status"
          className="p-3 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
          onChange={handleChange}
        >
          <option value="NOW_SHOWING">Now Showing</option>
          <option value="UPCOMING">Upcoming</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          className="md:col-span-2 p-3 rounded-lg"
          style={{ backgroundColor: "var(--input-bg)" }}
          onChange={handleChange}
        />

        <div className="md:col-span-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handlePosterChange(e.target.files?.[0] || null)
            }
          />
        </div>

        {preview && (
          <div className="md:col-span-2">
            <img
              src={preview}
              alt="Preview"
              className="h-60 rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>

      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate("/admin/movies")}
          className="flex-1 py-3 rounded-lg"
          style={{
            backgroundColor: "var(--border-color)",
          }}
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 py-3 rounded-lg text-white"
          style={{
            backgroundColor: "#dc2626",
          }}
        >
          {loading ? "Saving..." : "Save Movie"}
        </button>
      </div>
    </div>
  );
}