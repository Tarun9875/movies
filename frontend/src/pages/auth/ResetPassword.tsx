//frontend/src/pages/auth/ResetPassword.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/axios";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);
      await api.post("/auth/reset-password", { email });
      alert("📩 Reset link sent to email");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#052f35] via-[#0f172a] to-[#312e81] font-[Inter]">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-[400px] p-10 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-white"
      >
        <h2 className="text-3xl font-extrabold text-center">
          Reset Password
        </h2>

        <div className="relative mt-10">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full bg-white/20 text-white placeholder-transparent border border-white/30 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            placeholder="Email"
          />
          <label className="absolute left-4 top-4 text-gray-300 text-sm transition-all
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-emerald-400
            peer-valid:-top-3 peer-valid:text-xs">
            Enter your email
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          disabled={loading}
          className="mt-10 w-full bg-gradient-to-r from-blue-400 to-indigo-500 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-blue-500/40 transition-all"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </motion.button>

        <p className="mt-6 text-sm text-center text-gray-300">
          Back to{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
