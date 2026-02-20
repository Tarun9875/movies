import { Home, Film, Calendar, Users, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export default function AdminSidebar({ open }: Props) {
  return (
    <aside
      className={`
        ${open ? "w-64" : "w-20"}
        transition-all duration-300
        bg-white dark:bg-gray-800
        border-r border-gray-200 dark:border-gray-700
        h-full
      `}
    >
      <div className="p-4 font-bold text-red-600 text-xl">
        {open ? "🎬 Admin" : "🎬"}
      </div>

      <nav className="mt-6 space-y-2">

        <SidebarItem icon={<Home size={20} />} label="Dashboard" open={open} to="/admin" />
        <SidebarItem icon={<Film size={20} />} label="Movies" open={open} to="/admin/movies" />
        <SidebarItem icon={<Calendar size={20} />} label="Shows" open={open} to="/admin/shows" />
        <SidebarItem icon={<Users size={20} />} label="Users" open={open} to="/admin/users" />
        <SidebarItem icon={<Settings size={20} />} label="Settings" open={open} to="/admin/settings" />

      </nav>
    </aside>
  );
}

function SidebarItem({ icon, label, open, to }: any) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `
        flex items-center gap-3
        px-4 py-3 rounded-lg mx-2
        transition
        ${
          isActive
            ? "bg-red-600 text-white"
            : "text-gray-700 dark:text-gray-200 hover:bg-red-100 dark:hover:bg-red-600/20"
        }
      `
      }
    >
      {icon}
      {open && <span>{label}</span>}
    </NavLink>
  );
}
