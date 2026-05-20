// src/components/Auth/AuthModal.jsx
import React, { useState, useEffect } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  X,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { shaColors as colors } from "../../theme/sha";

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'login' }) {
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (isOpen) {
      setIsLogin(initialMode === 'login');
      
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
      setError("");
      setShowPassword(false);
    }
  }, [isOpen, initialMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    if (!isLogin) {
      if (!formData.name) {
        setError("Please enter your name");
        setLoading(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
    }

    setTimeout(() => {
      const userData = {
        id: Date.now(),
        name: formData.name || formData.email.split("@")[0],
        email: formData.email,
        company: "SHA",
        role: "Actuarial Analyst",
        userRole: "user",
        createdAt: new Date().toISOString()
      };

      localStorage.setItem("user", JSON.stringify(userData));
      sessionStorage.setItem("showWelcome", "true");
      sessionStorage.setItem("welcomeName", userData.name);

      setLoading(false);

      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }

      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 transition-all duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
        <div
          className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-fade-in bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-lg transition-all duration-200 hover:bg-gray-100 z-10"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>

          {/* Content */}
          <div className="p-6">
            {/* Logo & Title */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 mb-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
                  style={{
                    background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`
                  }}>
                  SHA
                </div>
                <span className="font-bold text-gray-800">Actuarial Hub</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                {isLogin ? 'Welcome back' : 'Get started'}
              </h2>
              <p className="text-xs text-gray-500">
                {isLogin
                  ? 'Sign in to continue learning'
                  : 'Create your free account'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-2.5 rounded-lg flex items-center gap-2 text-xs bg-red-50 border border-red-200">
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-red-500" />
                <span className="text-red-600">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {!isLogin && (
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-800 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-800 transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={isLogin ? "Password" : "Create password"}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-800 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-gray-800 transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-bold text-white text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-5"
                style={{
                  background: `linear-gradient(135deg, ${colors.darkBlue}, ${colors.blue})`
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>{isLogin ? 'Signing in...' : 'Creating...'}</span>
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Toggle Login/Signup - COMPACT */}
            <div className="text-center mt-6 pt-5 border-t border-gray-200">
              <p className="text-gray-900 text-sm font-medium mb-3">
                {isLogin ? "New to SHA?" : "Already have an account?"}
              </p>
              <button
                type="button"
                onClick={() => { setIsLogin(!isLogin); setError(""); }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 bg-white text-gray-900"
                style={{
                  border: '3px solid transparent',
                  backgroundImage: `linear-gradient(white, white), linear-gradient(135deg, ${colors.darkgreen}, ${colors.blue})`,
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'padding-box, border-box'
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: colors.green }} />
                <span>{isLogin ? 'Create Free Account' : 'Sign In Instead'}</span>
              </button>
            </div>

            {/* Footer Note */}
            <p className="text-center text-gray-400 text-xs mt-5">
              By continuing, you agree to{' '}
              <a href="#" className="underline hover:text-gray-500" style={{ color: colors.blue }}>
                Terms
              </a>
              {' & '}
              <a href="#" className="underline hover:text-gray-500" style={{ color: colors.blue }}>
                Privacy
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}