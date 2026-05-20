import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "../../supabaseClient";

export default function RequireSupervisor({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking"); // checking | ok | nope
  const [reason, setReason] = useState("unknown"); // no-session | not-supervisor | unknown

  const bg = useMemo(() => (document?.documentElement?.classList?.contains("dark") ? "#0A0F1E" : "#F8FAFC"), []);
  const muted = useMemo(() => (document?.documentElement?.classList?.contains("dark") ? "#9CA3AF" : "#64748B"), []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        const u = data?.session?.user;
        if (!u?.id) {
          if (mounted) {
            setReason("no-session");
            setStatus("nope");
          }
          return;
        }

        const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", u.id).maybeSingle();
        if (error) throw error;
        if (!mounted) return;
        if (profile?.role === "supervisor") {
          setStatus("ok");
        } else {
          setReason("not-supervisor");
          setStatus("nope");
        }
      } catch {
        if (!mounted) return;
        setReason("unknown");
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
        Checking access...
      </div>
    );
  }

  if (status === "nope") {
    if (reason === "no-session") return <Navigate to="/supervisor/login" replace state={{ from: location.pathname }} />;
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  return children;
}
