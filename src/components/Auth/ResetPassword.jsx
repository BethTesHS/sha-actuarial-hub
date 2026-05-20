// src/components/Auth/ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft, ArrowRight, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";
import { supabase } from "../../supabaseClient";

export default function ResetPassword({ theme = 'dark' }) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingToken, setCheckingToken] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const RECOVERY_FLAG_KEY = 'kb_password_recovery_in_progress';
  const RECOVERY_TS_KEY = 'kb_password_recovery_ts';
  const RECOVERY_TTL_MS = 15 * 60 * 1000;

  const colors = {
    dark: {
      cyan: "#00E5FF",
      blue: "#3B82F6",
      purple: "#7C4DFF",
      gradientStart: "#00E5FF",
      gradientEnd: "#3B82F6",
      card: "#1A1F2E",
      bg: "#0A0F1E",
      text: "#FFFFFF",
      textSecondary: "#9CA3AF",
      inputBg: "rgba(255,255,255,0.05)",
      inputBorder: "rgba(255,255,255,0.1)",
      inputText: "#FFFFFF"
    },
    light: {
      cyan: "#00E5FF",
      blue: "#0066FF",
      purple: "#7C4DFF",
      gradientStart: "#0066FF",
      gradientEnd: "#7C4DFF",
      card: "#FFFFFF",
      bg: "#F8FAFC",
      text: "#0F172A",
      textSecondary: "#64748B",
      inputBg: "#FFFFFF",
      inputBorder: "#E2E8F0",
      inputText: "#0F172A"
    }
  };

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  useEffect(() => {
    const checkToken = async () => {
      try {
        const cleanUrl = () => {
          try {
            const clean = `${window.location.origin}${window.location.pathname}`;
            window.history.replaceState({}, document.title, clean);
          } catch {
            // ignore
          }
        };

        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);

        // Supabase can deliver recovery links in two common formats:
        // 1) PKCE: /reset-password?code=...  (exchangeCodeForSession)
        // 2) Implicit: /reset-password#access_token=...&refresh_token=...&type=recovery (setSession or auto-detected)
        const type = hashParams.get('type') || queryParams.get('type');
        const code = queryParams.get('code');
        // Some templates (and some Supabase flows) send token_hash (or token) in query params.
        const tokenHash =
          queryParams.get('token_hash') ||
          queryParams.get('token') ||
          hashParams.get('token_hash') ||
          hashParams.get('token');
        const access_token = hashParams.get('access_token') || queryParams.get('access_token');
        const refresh_token = hashParams.get('refresh_token') || queryParams.get('refresh_token');

        const hasRecoveryParams =
          !!code ||
          !!tokenHash ||
          !!access_token ||
          type === 'recovery';

        const isRecentRecoveryEvent = (() => {
          try {
            if (localStorage.getItem(RECOVERY_FLAG_KEY) !== '1') return false;
            const ts = Number(localStorage.getItem(RECOVERY_TS_KEY) || '0');
            return ts && Date.now() - ts <= RECOVERY_TTL_MS;
          } catch {
            return false;
          }
        })();

        // token_hash flow (recommended for many email templates / SSR setups)
        if (tokenHash && type) {
          const { error: verifyError } = await supabase.auth.verifyOtp({
            type,
            token_hash: tokenHash,
          });
          if (verifyError) throw verifyError;

          const { data: sessionData } = await supabase.auth.getSession();
          if (!sessionData?.session) {
            setError("Reset link could not be verified. Please request a new password reset.");
            setIsValidToken(false);
            return;
          }

          cleanUrl();
          setIsValidToken(true);
          return;
        }

        // Prefer PKCE flow if a code is present
        if (code) {
          const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError) throw exchangeError;

          // Clean the URL so the code isn't reused on refresh
          cleanUrl();

          const { data: sessionData } = await supabase.auth.getSession();
          if (!sessionData?.session) {
            setError("Reset link could not be verified. Please request a new password reset.");
            setIsValidToken(false);
            return;
          }

          setIsValidToken(true);
          return;
        }

        // If we've been redirected back from Supabase `/auth/v1/verify`, the token may have been
        // consumed on Supabase's domain and not forwarded as URL params. In that case, we only allow
        // access if we have a recent PASSWORD_RECOVERY event marker.
        if (!hasRecoveryParams) {
          const { data: existingSessionData } = await supabase.auth.getSession();
          if (existingSessionData?.session && isRecentRecoveryEvent) {
            cleanUrl();
            setIsValidToken(true);
            return;
          }

          setError("Invalid or expired reset link. Please request a new password reset.");
          setIsValidToken(false);
          return;
        }

        // Implicit/token-in-hash flow
        if (type !== 'recovery' || !access_token) {
          setError("Invalid or expired reset link. Please request a new password reset.");
          setIsValidToken(false);
          return;
        }

        // If refresh_token is provided, explicitly set the session.
        // If it's not provided, Supabase may still auto-detect the session from the URL,
        // so we fall through to getSession().
        if (refresh_token) {
          const { error: setSessionError } = await supabase.auth.setSession({ access_token, refresh_token });
          if (setSessionError) throw setSessionError;
        }

        // Give Supabase a moment to detect the session from the URL hash (when refresh_token is absent).
        let sessionData = (await supabase.auth.getSession()).data;
        if (!sessionData?.session) {
          await new Promise((r) => setTimeout(r, 250));
          sessionData = (await supabase.auth.getSession()).data;
        }
        if (!sessionData?.session) {
          setError("Reset link could not be verified. Please request a new password reset.");
          setIsValidToken(false);
          return;
        }

        cleanUrl();
        setIsValidToken(true);
      } catch (err) {
        console.error("Reset link verification error:", err);
        setError(err.message || "Invalid or expired reset link. Please request a new password reset.");
        setIsValidToken(false);
      } finally {
        setCheckingToken(false);
      }
    };

    checkToken();
  }, [RECOVERY_TTL_MS]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!password) {
      setError("Please enter a new password");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Update the user's password
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      setSuccess(true);
      
      // Sign out the user after successful password reset
      // This prevents them from being auto-logged in
      try {
        localStorage.removeItem('kb_password_recovery_in_progress');
        localStorage.removeItem('kb_password_recovery_ts');
      } catch {
        // ignore
      }
      await supabase.auth.signOut();
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/auth?mode=login');
      }, 2000);
    } catch (err) {
      console.error("Password update error:", err);
      setError(err.message || "Failed to update password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (checkingToken) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ background: currentColors.bg }}
      >
        <div className="text-center">
          <div className="w-12 h-12 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{
              borderColor: theme === 'dark' ? 'rgba(0, 229, 255, 0.3)' : 'rgba(0, 102, 255, 0.3)',
              borderTopColor: theme === 'dark' ? currentColors.cyan : currentColors.blue
            }} 
          />
          <p style={{ color: currentColors.textSecondary }}>Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (!isValidToken && !success) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
        style={{ background: currentColors.bg }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-0 -left-40 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${currentColors.gradientStart}40, transparent)`,
              animation: 'float 20s ease-in-out infinite'
            }}
          />
          <div 
            className="absolute bottom-0 -right-40 w-80 h-80 rounded-full blur-3xl"
            style={{
              background: `radial-gradient(circle, ${currentColors.gradientEnd}40, transparent)`,
              animation: 'float 25s ease-in-out infinite reverse'
            }}
          />
        </div>

        <div className="w-full max-w-lg relative z-10">
          <div
            className="rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm p-10"
            style={{
              background: theme === 'dark' 
                ? 'rgba(26, 31, 46, 0.95)' 
                : 'rgba(255, 255, 255, 0.98)',
              border: theme === 'dark'
                ? `1.5px solid ${currentColors.cyan}30`
                : `1.5px solid ${currentColors.purple}20`,
              boxShadow: theme === 'dark'
                ? `0 8px 32px rgba(0, 221, 255, 0.15), 0 0 0 1px rgba(0, 229, 255, 0.1)`
                : `0 20px 60px rgba(103, 58, 183, 0.15), 0 0 0 1px rgba(103, 58, 183, 0.08)`
            }}
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6"
                style={{
                  background: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                  border: theme === 'dark' ? '2px solid rgba(239, 68, 68, 0.3)' : '2px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <AlertCircle className="w-8 h-8" style={{ color: theme === 'dark' ? '#EF4444' : '#DC2626' }} />
              </div>
              <h2 className="text-3xl font-bold mb-4" style={{ color: currentColors.text }}>
                Invalid Reset Link
              </h2>
              <p className="mb-8 leading-relaxed" style={{ color: currentColors.textSecondary }}>
                This password reset link is invalid or has expired. Please request a new one to continue.
              </p>
              <button
                onClick={() => navigate('/forgot-password')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: theme === 'dark'
                    ? 'linear-gradient(135deg, #00E5FF, #0093dc)'
                    : 'linear-gradient(135deg, #0066ffda, rgb(120, 72, 252))',
                  boxShadow: theme === 'dark'
                    ? '0 5px 20px rgba(0, 229, 255, 0.4)'
                    : '0 5px 20px rgba(103, 58, 183, 0.4)',
                  color: 'white'
                }}
              >
                Request New Reset Link
              </button>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0) rotate(0deg);
            }
            33% {
              transform: translate(30px, -30px) rotate(120deg);
            }
            66% {
              transform: translate(-20px, 20px) rotate(240deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 pt-24 relative overflow-hidden"
      style={{ background: currentColors.bg }}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute top-0 -left-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentColors.gradientStart}40, transparent)`,
            animation: 'float 20s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-0 -right-40 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(circle, ${currentColors.gradientEnd}40, transparent)`,
            animation: 'float 25s ease-in-out infinite reverse'
          }}
        />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Card */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl backdrop-blur-sm"
          style={{
            background: theme === 'dark' 
              ? 'rgba(26, 31, 46, 0.95)' 
              : 'rgba(255, 255, 255, 0.98)',
            border: theme === 'dark'
              ? `1.5px solid ${currentColors.cyan}30`
              : `1.5px solid ${currentColors.purple}20`,
            boxShadow: theme === 'dark'
              ? `0 8px 32px rgba(0, 221, 255, 0.15), 0 0 0 1px rgba(0, 229, 255, 0.1)`
              : `0 20px 60px rgba(103, 58, 183, 0.15), 0 0 0 1px rgba(103, 58, 183, 0.08)`
          }}
        >
          <div className="p-10">
            {/* Back Button - Cleaner design */}
            <button
              onClick={() => navigate('/auth?mode=login')}
              className="mb-8 text-sm font-medium transition-all duration-200 hover:gap-2 flex items-center gap-1.5 group"
              style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to login
            </button>

            {/* Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-3" style={{ color: currentColors.text }}>
                Reset Password
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: currentColors.textSecondary }}>
                Enter your new password below
              </p>
            </div>

            {/* Success Message */}
            {success && (
              <div
                className="mb-6 p-5 rounded-xl flex items-start gap-3 animate-fade-in"
                style={{
                  background: theme === 'dark' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(34, 197, 94, 0.08)',
                  border: theme === 'dark' ? '1.5px solid rgba(34, 197, 94, 0.3)' : '1.5px solid rgba(34, 197, 94, 0.2)'
                }}
              >
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: theme === 'dark' ? '#22C55E' : '#16A34A' }} />
                <div>
                  <p className="font-semibold mb-1 text-base" style={{ color: theme === 'dark' ? '#4ADE80' : '#16A34A' }}>
                    Password Updated Successfully!
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#86EFAC' : '#15803D' }}>
                    Redirecting to login page...
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && !success && (
              <div
                className="mb-6 p-4 rounded-xl flex items-center gap-2 text-sm animate-fade-in"
                style={{
                  background: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.08)',
                  border: theme === 'dark' ? '1.5px solid rgba(239, 68, 68, 0.3)' : '1.5px solid rgba(239, 68, 68, 0.2)'
                }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: theme === 'dark' ? '#EF4444' : '#DC2626' }} />
                <span style={{ color: theme === 'dark' ? '#F87171' : '#DC2626' }}>{error}</span>
              </div>
            )}

            {/* Form */}
            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: currentColors.textSecondary }}>
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: currentColors.textSecondary }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: currentColors.inputBg,
                        border: `2px solid ${currentColors.inputBorder}`,
                        color: currentColors.inputText
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = theme === 'dark' ? currentColors.cyan : currentColors.blue;
                        e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? currentColors.cyan : currentColors.blue}15`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = currentColors.inputBorder;
                        e.target.style.boxShadow = 'none';
                      }}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition hover:scale-110"
                      style={{ color: currentColors.textSecondary }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-2 font-medium" style={{ color: currentColors.textSecondary }}>
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: currentColors.textSecondary }} />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all"
                      style={{
                        background: currentColors.inputBg,
                        border: `2px solid ${currentColors.inputBorder}`,
                        color: currentColors.inputText
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = theme === 'dark' ? currentColors.cyan : currentColors.blue;
                        e.target.style.boxShadow = `0 0 0 3px ${theme === 'dark' ? currentColors.cyan : currentColors.blue}15`;
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = currentColors.inputBorder;
                        e.target.style.boxShadow = 'none';
                      }}
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition hover:scale-110"
                      style={{ color: currentColors.textSecondary }}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mt-6 relative overflow-hidden group"
                  style={{
                    background: theme === 'dark'
                      ? 'linear-gradient(135deg, #00E5FF, #0093dc)'
                      : 'linear-gradient(135deg, #0066ffda, rgb(120, 72, 252))',
                    boxShadow: theme === 'dark'
                      ? '0 5px 20px rgba(0, 229, 255, 0.4)'
                      : '0 5px 20px rgba(103, 58, 183, 0.4)',
                    color: theme === 'dark' ? '#fefefe' : 'white'
                  }}
                >
                  {/* Subtle shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 rounded-full animate-spin"
                        style={{
                          borderColor: 'rgba(255,255,255,0.3)',
                          borderTopColor: 'white'
                        }} />
                      <span>Updating password...</span>
                    </>
                  ) : (
                    <>
                      <span>Update Password</span>
                      <ArrowRight className="w-4 h-4" style={{ color: 'white' }} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <button
                  onClick={() => navigate('/auth?mode=login')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                  style={{
                    background: theme === 'dark' ? 'rgba(255,255,255,0.05)' : `${currentColors.blue}08`,
                    border: `2px solid ${theme === 'dark' ? currentColors.cyan : currentColors.blue}80`,
                    color: theme === 'dark' ? currentColors.cyan : currentColors.blue
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Go to Login</span>
                </button>
              </div>
            )}

            {/* Footer Note */}
            <div className="text-center mt-8 pt-6 border-t" style={{ borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <p className="text-sm" style={{ color: currentColors.textSecondary }}>
                Remember your password?{' '}
                <button
                  onClick={() => navigate('/auth?mode=login')}
                  className="transition hover:opacity-70 font-medium" 
                  style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Additional help text */}
        <p className="text-center text-xs mt-6" style={{ color: currentColors.textSecondary }}>
          Need help? Contact{' '}
          <a 
            href="mailto:support@kenbright.com" 
            className="transition hover:opacity-70 font-medium" 
            style={{ color: theme === 'dark' ? currentColors.cyan : currentColors.blue }}
          >
            support@kenbright.com
          </a>
        </p>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }
      `}</style>
    </div>
  );
}