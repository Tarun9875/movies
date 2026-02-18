import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Seat from "../../components/booking/Seat";
import {
  lockSeatsAPI,
  getLockedSeatsAPI
} from "../../features/booking/bookingAPI";

const ALL_SEATS = ["A1", "A2", "A3", "A4", "A5"];

export default function SeatSelection() {
  const { showId } = useParams<{ showId: string }>();
  const [selected, setSelected] = useState<string[]>([]);
  const [locked, setLocked] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!showId) return;

    getLockedSeatsAPI(showId).then((res) =>
      setLocked(res.data.lockedSeats)
    );
  }, [showId]);

  const toggleSeat = async (seat: string) => {
    if (!showId) return;

    const updated = selected.includes(seat)
      ? selected.filter((s) => s !== seat)
      : [...selected, seat];

    setSelected(updated);
    await lockSeatsAPI({ showId, seats: updated });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        🎟 Select Seats (Show {showId})
      </h2>

      <div className="flex gap-3">
        {ALL_SEATS.map((seat) => (
          <Seat
            key={seat}
            seat={seat}
            locked={!!locked[seat]}
            selected={selected.includes(seat)}
            onClick={() => toggleSeat(seat)}
          />
        ))}
      </div>
    </div>
  );
}
