//frontend/src/pages/auth/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginThunk } from "../../features/auth/authSlice";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    await dispatch(loginThunk({ email, password })).unwrap();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#052f35] via-[#0f172a] to-[#312e81] font-[Inter]">

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{ scale: 1.01 }}
        className="w-96 p-10 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl text-white transition-all duration-500"
      >
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-center tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 mt-1 text-md">
          Login to continue
        </p>

        {/* Email */}
        <div className="relative mt-10">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer w-full bg-white/20 text-white mt-1  placeholder-transparent border border-white/30 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300"
            placeholder="Email"
          />
          <label className="absolute left-4 top-4 text-gray-300 text-sm transition-all 
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-teal-400 
            peer-valid:-top-3 peer-valid:text-xs bg-transparent px-1  ">
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
            className="peer w-full bg-white/20 text-white mt-1 placeholder-transparent border border-white/30 rounded-lg px-4 py-4 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all duration-300"
            placeholder="Password"
          />
          <label className="absolute left-4 top-4 text-gray-300 text-sm transition-all 
            peer-focus:-top-3 peer-focus:text-xs peer-focus:text-teal-400 
            peer-valid:-top-3 peer-valid:text-xs bg-transparent px-1">
            Password
          </label>
        </div>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleLogin}
          disabled={loading}
          className="mt-10 w-full bg-linear-to-r from-emerald-400 to-teal-500 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-emerald-500/40 transition-all duration-300"
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-white/30" />
          <span className="px-4 text-sm text-gray-300">OR</span>
          <div className="flex-1 h-px bg-white/30" />
        </div>

        {/* Google */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={(res) => console.log(res)}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        {/* Footer Links */}
        <div className="flex justify-between mt-8 text-sm text-gray-300">
          <Link
            to="/register"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Create account
          </Link>
          <Link
            to="/reset-password"
            className="hover:text-emerald-400 transition-colors duration-300"
          >
            Forgot?
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
