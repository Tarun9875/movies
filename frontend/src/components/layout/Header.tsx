import { Link } from "react-router-dom";
import ThemeToggle from "../common/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-red-600"
        >
          🎟️ MovieBook
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-red-500"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="text-gray-700 dark:text-gray-200 hover:text-red-500"
          >
            Movies
          </Link>
          <Link
            to="/my-bookings"
            className="text-gray-700 dark:text-gray-200 hover:text-red-500"
          >
            My Bookings
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Login
          </Link>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
