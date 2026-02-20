import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Seat from "../../components/booking/Seat";
import {
  lockSeatsAPI,
  unlockSeatsAPI,
  getLockedSeatsAPI
} from "../../features/booking/bookingAPI";
import { socket } from "../../services/socket";

const ALL_SEATS = [
  "A1","A2","A3","A4","A5",
  "B1","B2","B3","B4","B5",
  "C1","C2","C3","C4","C5"
];

export default function SeatSelection() {
  const { showId } = useParams<{ showId: string }>();
  const [selected, setSelected] = useState<string[]>([]);
  const [locked, setLocked] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Fetch locked seats initially
  useEffect(() => {
    if (!showId) return;

    getLockedSeatsAPI(showId).then((res) => {
      setLocked(res.data.lockedSeats || {});
    });
  }, [showId]);

  // Join socket room
  useEffect(() => {
    if (!showId) return;

    socket.emit("join-show", showId);

    socket.on("seat-locked", ({ seats }) => {
      setLocked((prev) => {
        const updated = { ...prev };
        seats.forEach((seat: string) => {
          updated[seat] = "LOCKED";
        });
        return updated;
      });
    });

    socket.on("seat-unlocked", ({ seats }) => {
      setLocked((prev) => {
        const updated = { ...prev };
        seats.forEach((seat: string) => {
          delete updated[seat];
        });
        return updated;
      });
    });

    return () => {
      socket.off("seat-locked");
      socket.off("seat-unlocked");
    };
  }, [showId]);

  // Toggle seat
  const toggleSeat = async (seat: string) => {
    if (!showId) return;

    try {
      setLoading(true);

      if (selected.includes(seat)) {
        // Unlock
        await unlockSeatsAPI({ showId, seats: [seat] });
        setSelected((prev) => prev.filter((s) => s !== seat));
      } else {
        // Lock
        await lockSeatsAPI({ showId, seats: [seat] });
        setSelected((prev) => [...prev, seat]);
      }
    } catch (err) {
      alert("Seat already locked by another user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
        🎟 Select Seats (Show {showId})
      </h2>

      {/* Screen */}
      <div className="mb-10 text-center">
        <div className="w-1/2 mx-auto h-3 bg-gray-400 rounded-full"></div>
        <p className="text-sm text-gray-500 mt-2">SCREEN</p>
      </div>

      {/* Seat Grid */}
      <div className="grid grid-cols-5 gap-4 justify-center max-w-md mx-auto">
        {ALL_SEATS.map((seat) => (
          <Seat
            key={seat}
            seat={seat}
            locked={!!locked[seat] && !selected.includes(seat)}
            selected={selected.includes(seat)}
            onClick={() => toggleSeat(seat)}
          />
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 text-center">
        <p className="text-gray-700 dark:text-gray-300">
          Selected Seats:{" "}
          <span className="font-semibold">
            {selected.length ? selected.join(", ") : "None"}
          </span>
        </p>

        <button
          disabled={!selected.length || loading}
          className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}
