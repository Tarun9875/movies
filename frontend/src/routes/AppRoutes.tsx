import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/customer/Home";
import Movies from "../pages/customer/Movies";
import SeatSelection from "../pages/customer/SeatSelection";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import NewPassword from "../pages/auth/NewPassword";

import AdminLayout from "../pages/admin/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";

import ProtectedRoute from "./ProtectedRoute";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="p-10 text-center text-xl text-gray-600 dark:text-white">
      {title}
    </div>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password/:token" element={<NewPassword />} />

        {/* BOOKING */}
        <Route path="/shows/:showId/seats" element={<SeatSelection />} />

        {/* ADMIN NESTED */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="movies" element={<Placeholder title="Manage Movies" />} />
          <Route path="shows" element={<Placeholder title="Manage Shows" />} />
          <Route path="users" element={<Placeholder title="Manage Users" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<Placeholder title="404 Not Found" />} />

      </Routes>
    </BrowserRouter>
  );
}
