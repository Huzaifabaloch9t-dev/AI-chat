"use client";
import { useState } from "react";
import { signup } from "../../services/authService";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await signup(name, email, password);
      window.location.href = "/";
    } catch (err) {
      setError("Signup failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-100 to-emerald-200">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create Account 🚀
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Join us and Start Chatting with AI
        </p>

        {/* Error */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        {/* Name */}
        <div className="mt-6">
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mt-4">
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border px-4 py-2 pr-10 focus:ring-2 focus:ring-green-500 outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/" className="text-green-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
