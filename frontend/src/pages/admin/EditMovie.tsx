import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../services/axios";

export default function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    language: "",
    rating: "",
    duration: ""
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await api.get(`/movies/${id}`);
      setForm(res.data.movie);
    };

    if (id) fetchMovie();
  }, [id]);

  const handleUpdate = async () => {
    await api.put(`/movies/${id}`, form);
    navigate("/admin/movies");
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        ✏ Edit Movie
      </h1>

      <input
        className="w-full mb-3 p-2 border rounded"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        className="w-full mb-3 p-2 border rounded"
        value={form.language}
        onChange={(e) =>
          setForm({ ...form, language: e.target.value })
        }
      />

      <input
        className="w-full mb-3 p-2 border rounded"
        value={form.rating}
        onChange={(e) =>
          setForm({ ...form, rating: e.target.value })
        }
      />

      <button
        onClick={handleUpdate}
        className="w-full bg-red-600 text-white py-2 rounded-lg"
      >
        Update Movie
      </button>
    </div>
  );
}
