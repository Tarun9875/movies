import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";
import { Menu, Bell, LogOut, Search } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";

export default function AdminHeader() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header
      className="
        sticky top-0 z-50
        backdrop-blur-lg
        bg-gray-50/80 dark:bg-gray-900/80
        border-b border-gray-200 dark:border-gray-700
        transition-colors duration-300
      "
    >
      <div className="flex items-center justify-between px-6 py-3">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 rounded-lg 
                       hover:bg-gray-200 dark:hover:bg-gray-800
                       transition"
          >
            <Menu size={22} className="text-gray-700 dark:text-gray-200" />
          </button>

          <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
            Dashboard
          </h1>
        </div>

        {/* Search */}
        <div className="hidden md:flex items-center w-1/3 relative">
          <Search
            size={18}
            className="absolute left-3 text-gray-400 dark:text-gray-500"
          />
          <input
            type="text"
            placeholder="Search..."
            className="
              w-full pl-10 pr-4 py-2 rounded-xl
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-700 dark:text-gray-200
              focus:outline-none focus:ring-2 focus:ring-red-500
              transition
            "
          />
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 relative">

          {/* Notification */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg 
                       hover:bg-gray-200 dark:hover:bg-gray-800
                       transition"
          >
            <Bell size={20} className="text-gray-700 dark:text-gray-200" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {showNotifications && (
            <div
              className="
                absolute right-20 top-12 w-64
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                shadow-xl rounded-xl p-4
                transition
              "
            >
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">
                Notifications
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <li>🎟 New booking received</li>
                <li>📊 Revenue updated</li>
                <li>⚡ Server running smoothly</li>
              </ul>
            </div>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User */}
          <div className="hidden md:flex items-center gap-2">
            <div
              className="
                w-8 h-8 rounded-full
                bg-gradient-to-r from-red-500 to-red-600
                text-white flex items-center justify-center
                text-sm font-bold
              "
            >
              {user?.name?.charAt(0) || "A"}
            </div>

            <div className="text-sm">
              <p className="font-medium text-gray-800 dark:text-white">
                {user?.name || "Admin User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Administrator
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={() => dispatch(logout())}
            className="
              p-2 rounded-lg
              bg-red-600 hover:bg-red-700
              text-white
              transition
            "
          >
            <LogOut size={18} />
          </button>

        </div>
      </div>
    </header>
  );
}
