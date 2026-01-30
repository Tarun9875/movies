//frontend/src/components/layout/Header.tsx
import { Link } from "react-router-dom";
import { useState } from "react";
import ThemeToggle from "../common/ThemeToggle";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-teal-600">
          🎟️ MovieBook
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLinks />

          {user ? (
            <button
              onClick={() => dispatch(logout())}
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Login
            </Link>
          )}

          <ThemeToggle />
        </nav>
      </div>
    </header>

  );
}

/* Reusable Nav Links */
function NavLinks({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <Link
        to="/"
        onClick={onClick}
        className="text-gray-700 dark:text-gray-200 hover:text-red-500"
      >
        Home
      </Link>
      <Link
        to="/movies"
        onClick={onClick}
        className="text-gray-700 dark:text-gray-200 hover:text-red-500"
      >
        Movies
      </Link>
      <Link
        to="/my-bookings"
        onClick={onClick}
        className="text-gray-700 dark:text-gray-200 hover:text-red-500"
      >
        My Bookings
      </Link>
    </>
  );
}
