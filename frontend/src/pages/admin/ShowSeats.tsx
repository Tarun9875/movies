// frontend/src/pages/admin/ShowSeats.tsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/axios";

interface SeatState {
  booked: string[];
  blocked: string[];
}

export default function ShowSeats() {
  const { showId } = useParams();

  const [seatState, setSeatState] = useState<SeatState>({
    booked: [],
    blocked: [],
  });

  const [loading, setLoading] = useState(true);

  // ================= FETCH SEATS =================
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await api.get(`/shows/${showId}/seats`);
        setSeatState(res.data);
      } catch {
        console.log("Using default empty seat layout");
      } finally {
        setLoading(false);
      }
    };

    fetchSeats();
  }, [showId]);

  // ================= TOGGLE BLOCK =================
  const toggleBlock = (seat: string) => {
    if (seatState.booked.includes(seat)) return;

    setSeatState((prev) => ({
      ...prev,
      blocked: prev.blocked.includes(seat)
        ? prev.blocked.filter((s) => s !== seat)
        : [...prev.blocked, seat],
    }));
  };

  // ================= SAVE CHANGES =================
  const saveChanges = async () => {
    try {
      await api.put(`/shows/${showId}/seats`, {
        blocked: seatState.blocked,
      });

      alert("Seat layout updated");
    } catch {
      alert("Failed to update seats");
    }
  };

  // ================= RESET BLOCKED =================
  const resetBlocked = () => {
    setSeatState((prev) => ({
      ...prev,
      blocked: [],
    }));
  };

  // ================= RENDER ROW =================
  const renderRow = (row: string) => (
    <div key={row} className="flex justify-center gap-2 mb-3">
      {Array.from({ length: 12 }).map((_, index) => {
        const seatId = `${row}${index + 1}`;

        const isBooked = seatState.booked.includes(seatId);
        const isBlocked = seatState.blocked.includes(seatId);

        return (
          <button
            key={seatId}
            onClick={() => toggleBlock(seatId)}
            className="w-8 h-8 text-xs rounded transition"
            style={{
              backgroundColor: isBooked
                ? "#dc2626"
                : isBlocked
                ? "#f59e0b"
                : "var(--card-bg)",
              color:
                isBooked || isBlocked
                  ? "#fff"
                  : "var(--text-color)",
              border: "1px solid var(--border-color)",
              cursor: isBooked ? "not-allowed" : "pointer",
            }}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );

  if (loading) {
    return <p style={{ color: "var(--text-color)" }}>Loading seats...</p>;
  }

  return (
    <div
      className="max-w-6xl mx-auto p-6"
      style={{ color: "var(--text-color)" }}
    >
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold">
          🎟 Manage Seats (Show ID: {showId})
        </h1>

        <div className="flex gap-3">
          <button
            onClick={resetBlocked}
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "#6b7280",
              color: "#fff",
            }}
          >
            Reset Blocked
          </button>

          <button
            onClick={saveChanges}
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: "#16a34a",
              color: "#fff",
            }}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* ================= LEGEND ================= */}
      <div className="flex flex-wrap gap-6 mb-8 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded" />
          Booked
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded" />
          Blocked
        </div>

        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded"
            style={{ border: "1px solid var(--border-color)" }}
          />
          Available
        </div>
      </div>

      {/* ================= SEAT LAYOUT ================= */}
      <div
        className="p-6 rounded-xl"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
        }}
      >
        {["A", "B", "C", "D", "E", "F"].map(renderRow)}

        {/* SCREEN */}
        <div className="mt-10 flex justify-center">
          <div
            className="w-2/3 h-3 rounded-full"
            style={{ backgroundColor: "var(--border-color)" }}
          />
        </div>
        <p className="text-center mt-2 text-sm">SCREEN</p>
      </div>
    </div>
  );
}