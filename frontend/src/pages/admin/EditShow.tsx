// frontend/src/pages/admin/EditShow.tsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/axios";

interface ShowData {
  movie: string;
  date: string;
  time: string;
  language: string;
  screen: string;
  price: number;
  status: string;
}

export default function EditShow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [showData, setShowData] = useState<ShowData>({
    movie: "",
    date: "",
    time: "",
    language: "",
    screen: "",
    price: 0,
    status: "ACTIVE",
  });

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH SHOW =================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const showRes = await api.get(`/shows/${id}`);
        setShowData(showRes.data.show);

        const movieRes = await api.get("/movies");
        setMovies(movieRes.data.movies);

      } catch (err) {
        alert("Failed to load show data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (field: keyof ShowData, value: any) => {
    setShowData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/shows/${id}`, showData);
      alert("Show updated successfully!");
      navigate("/admin/shows");
    } catch {
      alert("Update failed");
    }
  };

  if (loading) {
    return <p style={{ color: "var(--muted-text)" }}>Loading...</p>;
  }

  return (
    <div style={{ color: "var(--text-color)" }}>
      <h1 className="text-3xl font-bold mb-8">
        ✏ Edit Show
      </h1>

      <div className="admin-form-card">

        {/* Movie */}
        <div className="form-group">
          <label>Movie</label>
          <select
            value={showData.movie}
            onChange={(e) =>
              handleChange("movie", e.target.value)
            }
            className="admin-input"
          >
            {movies.map((m) => (
              <option key={m._id} value={m._id}>
                {m.title}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={showData.date}
            onChange={(e) =>
              handleChange("date", e.target.value)
            }
            className="admin-input"
          />
        </div>

        {/* Time */}
        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={showData.time}
            onChange={(e) =>
              handleChange("time", e.target.value)
            }
            className="admin-input"
          />
        </div>

        {/* Language */}
        <div className="form-group">
          <label>Language</label>
          <input
            type="text"
            value={showData.language}
            onChange={(e) =>
              handleChange("language", e.target.value)
            }
            className="admin-input"
          />
        </div>

        {/* Screen */}
        <div className="form-group">
          <label>Screen</label>
          <input
            type="text"
            value={showData.screen}
            onChange={(e) =>
              handleChange("screen", e.target.value)
            }
            className="admin-input"
          />
        </div>

        {/* Price */}
        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            value={showData.price}
            onChange={(e) =>
              handleChange("price", Number(e.target.value))
            }
            className="admin-input"
          />
        </div>

        {/* Status */}
        <div className="form-group">
          <label>Status</label>
          <select
            value={showData.status}
            onChange={(e) =>
              handleChange("status", e.target.value)
            }
            className="admin-input"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={handleUpdate}
            className="admin-btn-primary"
          >
            Update Show
          </button>

          <button
            onClick={() => navigate("/admin/shows")}
            className="admin-btn-secondary"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}