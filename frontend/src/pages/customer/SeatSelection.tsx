// frontend/src/pages/customer/SeatSelection.tsx

import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { moviesData } from "../../assets/images/movies/moviesData";

export default function SeatSelection() {
  const { showId } = useParams();
  const location = useLocation();
  const movie = moviesData.find((m) => m.id === showId);

  const { date, time } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [expired, setExpired] = useState(false);

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true);
      return;
    }

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
    if (expired) return;

    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  const totalPrice = selectedSeats.length * 250;

  const renderSection = (
    title: string,
    price: number,
    rows: string[],
    seatCount: number,
    color: string
  ) => (
    <div className="mb-10">
      <h2 className="text-center font-semibold mb-4 text-sm sm:text-base">
        ₹{price} {title}
      </h2>

      <div className="overflow-x-auto">
        {rows.map((row) => (
          <div
            key={row}
            className="flex justify-center gap-2 sm:gap-3 mb-3 min-w-max"
          >
            {Array.from({ length: seatCount }).map((_, index) => {
              const seatId = `${row}${index + 1}`;
              const isSelected = selectedSeats.includes(seatId);

              return (
                <button
                  key={seatId}
                  disabled={expired}
                  onClick={() => toggleSeat(seatId)}
                  className={`
                    w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9
                    text-[10px] sm:text-xs
                    rounded
                    transition
                    ${
                      isSelected
                        ? "bg-green-600 text-white"
                        : `${color} hover:opacity-80`
                    }
                    ${expired ? "opacity-40 cursor-not-allowed" : ""}
                  `}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );

  if (!movie) return null;

  return (
    <PageContainer>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-10 py-10">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold">
              {movie.title}
            </h1>
            <p className="text-xs sm:text-sm opacity-70">
              Ruchu Cinemas | {date || "Today"} | {time || "Time"}
            </p>
          </div>

          <div
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold ${
              expired
                ? "bg-gray-400 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            ⏳ {expired ? "Expired" : formatTime(timeLeft)}
          </div>
        </div>

        {/* Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Seats Section */}
          <div className="lg:col-span-2">

            {renderSection(
              "VIP",
              500,
              ["L"],
              14,
              "bg-purple-100 border border-purple-400"
            )}

            {renderSection(
              "PREMIUM",
              250,
              ["K", "J", "I", "H", "G", "F", "E"],
              20,
              "bg-blue-100 border border-blue-400"
            )}

            {renderSection(
              "EXECUTIVE",
              230,
              ["D", "C", "B"],
              17,
              "bg-orange-100 border border-orange-400"
            )}

            {renderSection(
              "NORMAL",
              210,
              ["A"],
              15,
              "bg-green-100 border border-green-400"
            )}

            {/* Screen */}
            <div className="mt-12 flex justify-center">
              <div className="w-3/4 h-3 bg-gray-400 rounded-full"></div>
            </div>

            <p className="text-center mt-2 text-xs opacity-60">
              SCREEN
            </p>
          </div>

          {/* Summary Section */}
          <div className="bg-white shadow-md rounded-xl p-6 h-fit lg:sticky lg:top-10">

            <h2 className="text-base sm:text-lg font-semibold mb-4">
              Booking Summary
            </h2>

            <p className="text-sm mb-1">
              <strong>Seats:</strong>{" "}
              {selectedSeats.join(", ") || "None"}
            </p>

            <p className="text-lg font-bold mt-4">
              Total: ₹{totalPrice}
            </p>

            <button
              disabled={selectedSeats.length === 0 || expired}
              className="mt-6 w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:bg-gray-400"
            >
              Proceed to Pay
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Bar */}
      {selectedSeats.length > 0 && !expired && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-xl p-4 flex justify-between items-center">
          <span className="text-sm">
            {selectedSeats.length} Seats | ₹{totalPrice}
          </span>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm">
            Continue
          </button>
        </div>
      )}
    </PageContainer>
  );
}