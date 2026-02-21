// frontend/src/pages/customer/SeatSelection.tsx

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { moviesData } from "../../assets/images/movies/moviesData";

export default function SeatSelection() {
  const { showId } = useParams();
  const movie = moviesData.find((m) => m.id === showId);

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 min

  // ⏳ Countdown
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const toggleSeat = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const renderSection = (
    title: string,
    price: number,
    rows: string[],
    seatCount: number
  ) => (
    <div className="mb-12">
      <h2 className="text-center font-semibold mb-6 opacity-70">
        ₹{price} {title}
      </h2>

      {rows.map((row) => (
        <div key={row} className="flex justify-center gap-3 mb-3">
          {Array.from({ length: seatCount }).map((_, index) => {
            const seatId = `${row}${index + 1}`;
            const isSelected = selectedSeats.includes(seatId);

            return (
              <button
                key={seatId}
                onClick={() => toggleSeat(seatId)}
                className={`
                  w-8 h-8 text-xs rounded
                  border
                  transition
                  ${
                    isSelected
                      ? "bg-green-600 text-white"
                      : "border-green-500 text-green-600 hover:bg-green-100"
                  }
                `}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );

  if (!movie) return null;

  return (
    <PageContainer>
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-xl font-semibold">
              {movie.title}
            </h1>
            <p className="text-sm opacity-70">
              Cinepolis | 07:35 PM
            </p>
          </div>

          <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            ⏳ {formatTime(timeLeft)}
          </div>
        </div>

        {/* VIP */}
        {renderSection("VIP", 500, ["L"], 14)}

        {/* Premium */}
        {renderSection("PREMIUM", 250, ["K", "J", "I", "H", "G", "F", "E"], 20)}

        {/* Executive */}
        {renderSection("EXECUTIVE", 230, ["D", "C", "B"], 17)}

        {/* Normal */}
        {renderSection("NORMAL", 210, ["A"], 15)}

        {/* Screen */}
        <div className="mt-16 flex justify-center">
          <div className="
            w-2/3 h-16
            bg-gradient-to-b from-blue-300 to-blue-100
            rounded-t-full
            shadow-inner
            border-t-4 border-blue-400
          " />
        </div>

        <p className="text-center mt-3 text-sm opacity-60">
          All eyes this way please 👀
        </p>

        {/* Footer Legend */}
        <div className="flex justify-center gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-green-500 rounded" />
            Available
          </div>

          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded" />
            Selected
          </div>
        </div>

        {/* Summary */}
        <div className="mt-10 text-center font-semibold">
          Selected Seats: {selectedSeats.join(", ") || "None"}
        </div>

      </div>
    </PageContainer>
  );
}
