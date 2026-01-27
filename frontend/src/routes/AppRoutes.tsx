import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/customer/Home";

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
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Placeholder title="Movies" />} />
        <Route path="/login" element={<Placeholder title="Login" />} />
        <Route path="/my-bookings" element={<Placeholder title="My Bookings" />} />
      </Routes>
    </BrowserRouter>
  );
}
