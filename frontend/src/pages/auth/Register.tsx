//frontend/src/pages/auth/register.tsx
import { useState } from "react";
import { registerAPI } from "../../features/auth/authAPI";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);
      await registerAPI({ name, email, password });
      alert("✅ Registration successful");
      navigate("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#052f35] via-[#0f172a] to-[#312e81] font-[Inter]">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-96 p-10 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-white"
      >
        <h2 className="text-3xl font-extrabold text-center">
          Create Account
        </h2>

        {/* Name */}
        <div className="relative mt-10">
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="peer w-full bg-white/20 mt-1 text-white placeholder-transparent border border-white/30 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            placeholder="Full Name"
          />
          <label className="absolute left-4 top-4 text-gray-300 text-sm transition-all
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-emerald-400
            peer-valid:-top-3 peer-valid:text-xs">
            Full Name
          </label>
        </div>

        {/* Email */}
        <div className="relative mt-6">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full bg-white/20 mt-1  text-white placeholder-transparent border border-white/30 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            placeholder="Email"
          />
          <label className="absolute left-4 top-4 text-gray-300 text-sm transition-all
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-emerald-400
            peer-valid:-top-3 peer-valid:text-xs">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative mt-6">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer w-full mt-1 bg-white/20 text-white placeholder-transparent border border-white/30 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
            placeholder="Password"
          />
          <label className="absolute left-4 top-4 text-gray-300 text-sm transition-all
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-emerald-400
            peer-valid:-top-3 peer-valid:text-xs">
            Password
          </label>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleRegister}
          disabled={loading}
          className="mt-10 w-full bg-linear-to-r from-emerald-400 to-teal-500 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-emerald-500/40 transition-all"
        >
          {loading ? "Creating..." : "Register"}
        </motion.button>

        <p className="mt-6 text-sm text-center text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-emerald-400 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
