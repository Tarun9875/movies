import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      
      <div className="
        max-w-7xl mx-auto px-6 py-12 
        grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
        gap-10
      ">

        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold text-red-600 mb-3">
            🎟️ MovieBook
          </h2>
          <p className="text-sm leading-relaxed max-w-sm mx-auto md:mx-0">
            Book movie tickets online for the latest movies, theaters, and shows.
            Fast, secure, and easy booking experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-500">Home</Link></li>
            <li><Link to="/movies" className="hover:text-red-500">Movies</Link></li>
            <li><Link to="/my-bookings" className="hover:text-red-500">My Bookings</Link></li>
            <li><Link to="/login" className="hover:text-red-500">Login / Register</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/help" className="hover:text-red-500">Help Center</Link></li>
            <li><Link to="/faq" className="hover:text-red-500">FAQs</Link></li>
            <li><Link to="/terms" className="hover:text-red-500">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-red-500">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 India</li>
            <li>📧 support@moviebook.com</li>
            <li>📞 +91 98765 43210</li>
          </ul>

          {/* Social Icons */}
          <div className="flex justify-center md:justify-start gap-4 mt-4 text-lg">
            <a href="#" className="hover:text-red-500">🌐</a>
            <a href="#" className="hover:text-red-500">📘</a>
            <a href="#" className="hover:text-red-500">📸</a>
            <a href="#" className="hover:text-red-500">🐦</a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 dark:border-gray-700 text-center py-4 text-sm px-4">
        © {new Date().getFullYear()} MovieBook. All rights reserved.
      </div>
    </footer>
  );
}
