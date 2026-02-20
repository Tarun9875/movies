// src/routes/AppRoutes.tsx
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
import AdminMovies from "../pages/admin/Movies";
import AddMovie from "../pages/admin/AddMovie";
import EditMovie from "../pages/admin/EditMovie";

import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/errors/Unauthorized";
import NotFound from "../pages/errors/NotFound";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/shows/:showId/seats" element={<SeatSelection />} />

        {/* ================= AUTH ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password/:token" element={<NewPassword />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="ADMIN">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />

          {/* MOVIES MANAGEMENT */}
          <Route path="movies" element={<AdminMovies />} />
          <Route path="movies/add" element={<AddMovie />} />
          <Route path="movies/edit/:id" element={<EditMovie />} />

          {/* FUTURE */}
          <Route path="shows" element={<div className="p-6">Manage Shows</div>} />
          <Route path="users" element={<div className="p-6">Manage Users</div>} />
          <Route path="settings" element={<div className="p-6">Settings</div>} />
        </Route>

        {/* ================= ERRORS ================= */}
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}
