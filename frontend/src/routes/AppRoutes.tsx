import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/customer/Home";
import Movies from "../pages/customer/Movies";
import SeatSelection from "../pages/customer/SeatSelection";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-10 text-center text-xl text-gray-600 dark:text-white">
      {title} Page (Coming Soon)
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Booking */}
        <Route
          path="/shows/:showId/seats"
          element={<SeatSelection />}
        />

        {/* User */}
        <Route
          path="/my-bookings"
          element={<Placeholder title="My Bookings" />}
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Placeholder title="404 Not Found" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
