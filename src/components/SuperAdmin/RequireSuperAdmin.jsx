import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { isSuperAdminUser } from "../../utils/access";

export default function RequireSuperAdmin({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking"); // checking | ok | nope

  const bg = useMemo(() => (document?.documentElement?.classList?.contains("dark") ? "#0A0F1E" : "#F8FAFC"), []);
  const muted = useMemo(() => (document?.documentElement?.classList?.contains("dark") ? "#9CA3AF" : "#64748B"), []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const u = data?.session?.user;
        if (!mounted) return;
        let profileRole = null;
        if (u?.id) {
          const { data: profile } = await supabase.from("profiles").select("role").eq("id", u.id).maybeSingle();
          profileRole = profile?.role || null;
        }
        if (u && isSuperAdminUser({ ...u, role: profileRole })) {
          setStatus("ok");
        } else {
          setStatus("nope");
        }
      } catch {
        if (!mounted) return;
        setStatus("nope");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: bg, color: muted }}>
        Checking access…
      </div>
    );
  }

  if (status === "nope") return <Navigate to="/superadmin/login" replace state={{ from: location.pathname }} />;

  return children;
}

