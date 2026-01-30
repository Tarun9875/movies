import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 mt-16">

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-extrabold text-teal-600 mb-3">
            🎟️ MovieBook
          </h2>
          <p className="text-sm">
            Book movie tickets online with a fast, secure and premium experience.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-teal-500" to="/">Home</Link></li>
            <li><Link className="hover:text-teal-500" to="/movies">Movies</Link></li>
            <li><Link className="hover:text-teal-500" to="/my-bookings">My Bookings</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-teal-500" to="/help">Help Center</Link></li>
            <li><Link className="hover:text-teal-500" to="/faq">FAQs</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">Contact</h3>
          <p>📍 India</p>
          <p>📧 support@moviebook.com</p>
          <p>📞 +91 98765 43210</p>
        </div>

      </div>

      <div className="border-t border-gray-300 dark:border-slate-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} MovieBook. All rights reserved.
      </div>
    </footer>

  );
}
