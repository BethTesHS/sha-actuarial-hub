import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, ShieldCheck, Mail } from "lucide-react";
import { supabase } from "../../supabaseClient";
import { getShaAdminColors } from "../../theme/sha";

async function fetchProfileRole(userId) {
  if (!userId) return null;
  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).maybeSingle();
  if (error) throw error;
  return data?.role || null;
}

function normalizeRedirectPath(value) {
  if (!value || typeof value !== "string") return null;
  if (!value.startsWith("/")) return null;
  if (value.startsWith("//")) return null;
  return value;
}

export default function SupervisorLogin({ theme = "dark" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const colors = useMemo(() => getShaAdminColors(theme), [theme]);

  const from = normalizeRedirectPath(location?.state?.from);
  const targetAfterLogin = from || "/supervisor";

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return;
      const sessionUser = data?.session?.user;
      if (!sessionUser?.id) return;
      const profileRole = await fetchProfileRole(sessionUser.id).catch(() => null);
      if (profileRole === "supervisor") {
        navigate(targetAfterLogin, { replace: true });
      }
    });
    return () => {
      mounted = false;
    };
  }, [navigate, targetAfterLogin]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: (email || "").trim(),
        password,
      });

      if (signInError) throw signInError;

      const signedInUser = data?.user;
      const profileRole = await fetchProfileRole(signedInUser?.id);
      if (profileRole !== "supervisor") {
        await supabase.auth.signOut();
        setError("This account is not authorized for Supervisor access.");
        return;
      }

      navigate(targetAfterLogin, { replace: true });
    } catch (e2) {
      setError(e2?.message || "Failed to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-10 flex items-center justify-center" style={{ background: colors.bg }}>
      <div
        className="w-full max-w-md rounded-3xl border shadow-2xl p-7"
        style={{ background: colors.card, borderColor: `${colors.primary}25` }}
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-2xl" style={{ background: `${colors.primary}18`, color: colors.primary }}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black" style={{ color: colors.text }}>
              Supervisor Sign In
            </h1>
            <p className="text-sm mt-1" style={{ color: colors.muted }}>
              This page is separate from the trainee login.
            </p>
          </div>
        </div>

        {error ? (
          <div
            className="mb-5 rounded-2xl p-3 border text-sm"
            style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)", color: "#EF4444" }}
          >
            {error}
          </div>
        ) : null}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>
              Email
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.muted }} />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full pl-10 pr-4 py-3 rounded-2xl border outline-none"
                style={{ background: "transparent", borderColor: `${colors.primary}25`, color: colors.text }}
                autoComplete="email"
                inputMode="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>
              Password
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.muted }} />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-3 rounded-2xl border outline-none"
                style={{ background: "transparent", borderColor: `${colors.primary}25`, color: colors.text }}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all hover:scale-110"
                style={{ color: colors.muted, background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)" }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-5 py-3 rounded-2xl font-semibold transition-all hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: `${colors.primary}18`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="w-full px-5 py-3 rounded-2xl font-semibold transition-all hover:scale-[1.01]"
            style={{
              background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              color: colors.text,
              border: theme === "dark" ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            Back to main site
          </button>
        </form>
      </div>
    </div>
  );
}

