//frontend/src/pages/auth/ResetPassword.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/axios";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-white">
          Reset Password
        </h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleReset}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="mt-4 text-sm text-center">
          Back to{" "}
          <Link to="/login" className="text-red-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
