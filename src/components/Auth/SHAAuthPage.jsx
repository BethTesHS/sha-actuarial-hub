// src/components/Auth/SHAAuthPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { shaColors as colors } from "../../theme/sha";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  CheckCircle,
  AlertCircle,
  Building2,
  GraduationCap
} from "lucide-react";

export default function SHAAuthPage({ onAuthSuccess }) {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("mode") !== "signup");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Clear any existing session when auth page loads
  useEffect(() => {
    // Optional: Clear session storage but keep localStorage for other purposes
    sessionStorage.removeItem('showWelcome');
    sessionStorage.removeItem('welcomeName');
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Email validation
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

    try {
      let data, error;

      if (isLogin) {
        ({ data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        }));
      } else {
        ({ data, error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              name: formData.name,
              username: formData.name?.toLowerCase().replace(/\s+/g, "_"),
              company: formData.company,
            },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        }));
      }

      if (error) throw error;

      if (!isLogin && data.user?.identities?.length === 0) {
        setError("User already exists. Please sign in instead.");
        return;
      }

      if (!isLogin) {
        setError("");
        alert("Registration successful! Please check your email to confirm your account.");
        setIsLogin(true);
        return;
      }

      sessionStorage.setItem("showWelcome", "true");
      sessionStorage.setItem("welcomeName", formData.name || formData.email.split("@")[0]);

      if (onAuthSuccess && data.user) {
        onAuthSuccess(data.user);
      }
      navigate("/SHADashboard");
    } catch (err) {
      console.error("Auth error:", err);
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <GraduationCap className="w-5 h-5" />, text: "Access 18 actuarial training modules" },
    { icon: <Shield className="w-5 h-5" />, text: "IFRS 17 compliance training" },
    { icon: <Building2 className="w-5 h-5" />, text: "Industry-recognized certification" },
    { icon: <CheckCircle className="w-5 h-5" />, text: "Track your learning progress" }
  ];

  return (
    <div className="min-h-screen flex" style={{
      background: `linear-gradient(135deg, ${colors.darkBlue} 0%, #001529 50%, #000a15 100%)`
    }}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-30"
            style={{ background: colors.blue }} />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
            style={{ background: colors.green }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-15"
            style={{ background: colors.cyan }} />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
          {/* Logo */}
          <div className="mb-12">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-2 rounded-2xl blur-lg opacity-60"
                  style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }} />
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center font-black text-white text-3xl shadow-2xl"
                  style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }}>
                  SHA
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Actuarial Hub</h2>
                <p className="text-gray-400 text-lg">Professional Training Platform</p>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-12">
            <h1 className="text-4xl xl:text-5xl font-black text-white mb-6 leading-tight">
              Transform Your
              <span className="block mt-2" style={{
                background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Actuarial Career
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
              Join hundreds of actuarial professionals mastering IFRS 17 and advancing their expertise with our comprehensive training platform.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-5">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${colors.green}25`, color: colors.green }}>
                  {feature.icon}
                </div>
                <span className="text-gray-300 text-lg">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-16 flex gap-12">
            <div className="text-center">
              <div className="text-4xl font-black" style={{ color: colors.green }}>500+</div>
              <div className="text-gray-400 mt-1">Active Learners</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black" style={{ color: colors.cyan }}>17+</div>
              <div className="text-gray-400 mt-1">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black" style={{ color: colors.blue }}>98%</div>
              <div className="text-gray-400 mt-1">Success Rate</div>
            </div>
          </div>

          {/* Powered By */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-gray-500 text-sm">Powered by</p>
            <p className="text-white font-bold text-xl mt-1">KENBRIGHT</p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-xl"
                style={{ background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})` }}>
                SHA
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-lg">Actuarial Hub</div>
                <div className="text-sm text-gray-400">Professional Training</div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="rounded-3xl p-8 backdrop-blur-xl border-2"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              boxShadow: `0 0 80px ${colors.blue}15`
            }}>

            {/* Toggle Buttons */}
            <div className="flex rounded-2xl p-1.5 mb-8" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <button
                type="button"
                onClick={() => { setIsLogin(true); setError(""); }}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 ${isLogin ? 'text-white shadow-xl' : 'text-gray-400 hover:text-white'
                  }`}
                style={isLogin ? {
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                  boxShadow: `0 8px 30px ${colors.blue}50`
                } : {}}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setIsLogin(false); setError(""); }}
                className={`flex-1 py-3.5 rounded-xl font-semibold text-lg transition-all duration-300 ${!isLogin ? 'text-white shadow-xl' : 'text-gray-400 hover:text-white'
                  }`}
                style={!isLogin ? {
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                  boxShadow: `0 8px 30px ${colors.blue}50`
                } : {}}
              >
                Sign Up
              </button>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
                style={{ background: `${colors.green}15`, border: `1px solid ${colors.green}30` }}>
                <Sparkles className="w-4 h-4" style={{ color: colors.green }} />
                <span className="text-sm font-semibold" style={{ color: colors.green }}>
                  {isLogin ? 'Welcome Back!' : 'Get Started Free'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </h2>
              <p className="text-gray-400">
                {isLogin
                  ? 'Continue your actuarial learning journey'
                  : 'Start your actuarial training today'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 rounded-xl flex items-center gap-3"
                style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-red-400 text-sm">{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field (Sign Up only) */}
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Full Name *</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300 focus:ring-2"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)',
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email Address *</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)'
                    }}
                  />
                </div>
              </div>

              {/* Company Field (Sign Up only) */}
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Company / Organization</label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Enter your company name"
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Password *</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={isLogin ? "Enter your password" : "Create a password (min 6 chars)"}
                    className="w-full pl-12 pr-12 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.12)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Sign Up only) */}
              {!isLogin && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Confirm Password *</label>
                  <div className="relative group">
                    <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-white transition-colors" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-4 py-4 rounded-xl text-white placeholder-gray-500 outline-none transition-all duration-300"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        border: '1px solid rgba(255,255,255,0.12)'
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Forgot Password (Login only) */}
              {isLogin && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-green-500" />
                    <span className="text-gray-400 text-sm">Remember me</span>
                  </label>
                  <button type="button" className="text-sm font-medium transition hover:opacity-80"
                    style={{ color: colors.green }}>
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl font-bold text-white text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8"
                style={{
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                  boxShadow: `0 10px 40px ${colors.blue}40`
                }}
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"
                      style={{ borderWidth: '3px' }} />
                    <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-white/10"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="flex-1 h-px bg-white/10"></div>
            </div>

            {/* Footer */}
            <div className="text-center">
              <p className="text-gray-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => { setIsLogin(!isLogin); setError(""); }}
                  className="ml-2 font-semibold transition hover:opacity-80"
                  style={{ color: colors.green }}
                >
                  {isLogin ? 'Sign up free' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>

          {/* Bottom Text */}
          <p className="mt-8 text-center text-gray-500 text-sm">
            By continuing, you agree to SHA's{' '}
            <a href="#" className="underline hover:text-gray-400">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="underline hover:text-gray-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}