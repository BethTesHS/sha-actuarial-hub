import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Ban, LogOut } from "lucide-react";
import { supabase } from "../supabaseClient";
import { getShaAdminColors } from "../theme/sha";

export default function AccessDenied({ theme = "dark" }) {
  const navigate = useNavigate();

  const colors = useMemo(() => getShaAdminColors(theme), [theme]);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      localStorage.removeItem("user");
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex items-start justify-center" style={{ background: colors.bg }}>
      <div className="w-full max-w-2xl rounded-3xl p-8 border shadow-2xl" style={{ background: colors.card, borderColor: `${colors.danger}35` }}>
        {/* <div className="flex justify-end mb-4">
          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl font-semibold transition-all hover:scale-[1.01] flex items-center gap-2"
            style={{ background: `${colors.danger}18`, color: colors.danger, border: `1px solid ${colors.danger}35` }}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div> */}

        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl" style={{ background: `${colors.danger}18`, color: colors.danger }}>
            <Ban className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-black mb-2" style={{ color: colors.text }}>
              Access denied
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: colors.muted }}>
              Your account was reviewed and was not approved. If you believe this is a mistake, please contact support.
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={logout}
            className="flex-1 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
            style={{ background: `${colors.danger}18`, color: colors.danger, border: `1px solid ${colors.danger}35` }}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

