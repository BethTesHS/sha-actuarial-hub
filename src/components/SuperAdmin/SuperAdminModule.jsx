import React, { useEffect, useMemo, useState } from "react";
import { RefreshCcw, Shield, Search, CheckCircle2, XCircle, Eye, Mail, User, AtSign, CalendarClock, X, BookOpen, Trophy, ListChecks, Loader2, Trash2, ChevronDown, Check } from "lucide-react";
import { supabase } from "../../supabaseClient";
import { getShaAdminColors, getShaThemeColors } from "../../theme/sha";
import { TRAINING_MODULES } from "../../constants/moduleCatalog";

function DetailAvatar({ row, colors, theme, getInitials }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = row.avatar_url && !imgFailed;

  return (
    <div
      className="w-28 h-28 rounded-[1.15rem] overflow-hidden flex items-center justify-center text-3xl font-black"
      style={{
        background: theme === "dark" ? "#1A1F2E" : "#fff",
        color: colors.primary,
      }}
    >
      {showImg ? (
        <img
          src={row.avatar_url}
          alt=""
          className="w-full h-full object-cover"
          onError={() => setImgFailed(true)}
        />
      ) : (
        getInitials(row)
      )}
    </div>
  );
}

export default function SuperAdminModule({ theme = "dark" }) {
  const [superAdminEmail, setSuperAdminEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState("all"); // all | pending | approved | denied | supervisors | super-admins
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [confirmBlockRow, setConfirmBlockRow] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [meId, setMeId] = useState(null);
  const [progressByUserId, setProgressByUserId] = useState({});
  const [progressLoadingUserId, setProgressLoadingUserId] = useState(null);
  const [progressError, setProgressError] = useState("");
  const [supervisorAssignments, setSupervisorAssignments] = useState({});
  const [roleBusyId, setRoleBusyId] = useState(null);
  const [assignmentBusyId, setAssignmentBusyId] = useState(null);
  const [roleDraft, setRoleDraft] = useState("trainee");
  const [moduleDraft, setModuleDraft] = useState([]);

  const allModules = TRAINING_MODULES;

  const normalizeModuleIds = (moduleIds = []) =>
    Array.from(new Set(moduleIds.map(String))).sort((a, b) => {
      const numberSort = Number(a) - Number(b);
      return Number.isNaN(numberSort) || numberSort === 0 ? a.localeCompare(b) : numberSort;
    });

  const moduleIdsMatch = (left = [], right = []) => {
    const normalizedLeft = normalizeModuleIds(left);
    const normalizedRight = normalizeModuleIds(right);
    return normalizedLeft.length === normalizedRight.length && normalizedLeft.every((item, index) => item === normalizedRight[index]);
  };

  const colors = useMemo(() => getShaAdminColors(theme), [theme]);
  const brand = useMemo(() => getShaThemeColors(theme), [theme]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const q = supabase
        .from("profiles")
        .select("id,email,full_name,username,avatar_url,verification_status,role,created_at,updated_at")
        .order("created_at", { ascending: false });

      const [{ data, error: e }, { data: assignmentRows, error: assignmentErr }] = await Promise.all([
        q,
        supabase.from("supervisor_module_assignments").select("supervisor_id,module_id"),
      ]);
      if (e) throw e;
      if (assignmentErr) throw assignmentErr;

      const nextRows = data || [];
      const assignmentMap = {};
      (assignmentRows || []).forEach((row) => {
        if (!assignmentMap[row.supervisor_id]) assignmentMap[row.supervisor_id] = [];
        assignmentMap[row.supervisor_id].push(String(row.module_id));
      });

      setRows(nextRows);
      setSupervisorAssignments(assignmentMap);
      setSelected((current) => (current ? nextRows.find((row) => row.id === current.id) || current : current));
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      const u = data?.user;
      setMeId(u?.id || null);
      setSuperAdminEmail(u?.email || "");
    });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (!selected?.id) {
      setRoleDraft("trainee");
      setModuleDraft([]);
      return;
    }

    setRoleDraft(selected.role || "trainee");
    setModuleDraft((supervisorAssignments[selected.id] || []).map(String));
  }, [selected?.id, selected?.role, supervisorAssignments]);

  const fetchUserProgress = async (userId, { force = false } = {}) => {
    if (!userId) return;
    if (!force && progressByUserId[userId]) return;

    setProgressLoadingUserId(userId);
    setProgressError("");

    try {
      const { data: progressRows, error: progressErr } = await supabase
        .from("user_module_progress")
        .select("module_id, progress_percentage, updated_at")
        .eq("user_id", userId);

      if (progressErr) throw progressErr;

      const { data: quizRows, error: quizErr } = await supabase
        .from("quiz_submissions")
        .select("score, total_questions")
        .eq("user_id", userId);

      if (quizErr) throw quizErr;

      const progressMap = {};
      (progressRows || []).forEach((p) => {
        progressMap[p.module_id] = p;
      });

      const modulesWithProgress = allModules.map((m) => {
        const p = progressMap[m.id];
        return {
          ...m,
          progress: p ? p.progress_percentage || 0 : 0,
          updated_at: p ? p.updated_at : null,
        };
      });

      const completedModules = modulesWithProgress.filter((m) => m.progress === 100);
      const completedCount = completedModules.length;
      const totalModules = allModules.length;
      const overallProgressPercentage = Math.round((completedCount / totalModules) * 100) || 0;

      let averageQuizScore = 0;
      if (quizRows && quizRows.length > 0) {
        let totalPercentage = 0;
        let validQuizzes = 0;
        quizRows.forEach((q) => {
          if ((q?.total_questions || 0) > 0) {
            totalPercentage += (q.score / q.total_questions) * 100;
            validQuizzes++;
          }
        });
        averageQuizScore = validQuizzes > 0 ? Math.round(totalPercentage / validQuizzes) : 0;
      }

      setProgressByUserId((prev) => ({
        ...prev,
        [userId]: {
          userId,
          totalModules,
          completedCount,
          overallProgressPercentage,
          averageQuizScore,
          modulesWithProgress,
          completedModules,
        },
      }));
    } catch (e) {
      console.error(e);
      setProgressError(e?.message || "Failed to load user progress.");
    } finally {
      setProgressLoadingUserId(null);
    }
  };

  const setStatus = async (id, status) => {
    setBusyId(id);
    setError("");
    try {
      const { error: e } = await supabase.from("profiles").update({ verification_status: status }).eq("id", id);
      if (e) throw e;
      if (selected?.id === id) setSelected({ ...selected, verification_status: status });
      await load();
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to update verification.");
    } finally {
      setBusyId(null);
    }
  };

  const setRole = async (row, role) => {
    if (!row?.id) return;
    const nextRole = role || "trainee";
    if (nextRole === (row.role || "trainee")) return;
    if (meId && row.id === meId && nextRole !== "admin") {
      setError("You cannot remove your own admin role.");
      return;
    }

    setRoleBusyId(row.id);
    setError("");
    setRows((prev) => prev.map((item) => (item.id === row.id ? { ...item, role: nextRole } : item)));
    setSelected((current) => (current?.id === row.id ? { ...current, role: nextRole } : current));
    if (nextRole !== "supervisor") {
      setSupervisorAssignments((prev) => {
        const next = { ...prev };
        delete next[row.id];
        return next;
      });
    }

    try {
      const { error: roleErr } = await supabase.rpc("admin_set_user_role", {
        target_user_id: row.id,
        new_role: nextRole,
      });
      if (roleErr) throw roleErr;
      await load();
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to update user role.");
      await load();
    } finally {
      setRoleBusyId(null);
    }
  };

  const setSupervisorModules = async (row, moduleIds) => {
    if (!row?.id) return;
    setAssignmentBusyId(row.id);
    setError("");
    const nextModuleIds = moduleIds.map(String);
    setSupervisorAssignments((prev) => ({
      ...prev,
      [row.id]: nextModuleIds,
    }));
    setRows((prev) => prev.map((item) => (item.id === row.id ? { ...item, role: "supervisor" } : item)));
    setSelected((current) => (current?.id === row.id ? { ...current, role: "supervisor" } : current));

    try {
      const { error: assignmentErr } = await supabase.rpc("admin_set_supervisor_modules", {
        target_user_id: row.id,
        module_ids: nextModuleIds,
      });
      if (assignmentErr) throw assignmentErr;
      await load();
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to update supervised modules.");
      await load();
    } finally {
      setAssignmentBusyId(null);
    }
  };

  const toggleSupervisorModule = (moduleId) => {
    const id = String(moduleId);
    setModuleDraft((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const resetRoleAndSupervisionDraft = () => {
    if (!selected?.id) return;
    setRoleDraft(selected.role || "trainee");
    setModuleDraft((supervisorAssignments[selected.id] || []).map(String));
  };

  const saveRoleAndSupervision = async () => {
    if (!selected?.id) return;
    const nextRole = roleDraft || "trainee";
    const nextModuleIds = nextRole === "supervisor" ? normalizeModuleIds(moduleDraft) : [];

    if (nextRole === "supervisor") {
      await setSupervisorModules(selected, nextModuleIds);
      return;
    }

    await setRole(selected, nextRole);
  };

  const requestBlock = (row) => {
    setConfirmBlockRow(row || null);
  };

  const confirmBlock = async () => {
    if (!confirmBlockRow?.id) return;
    const row = confirmBlockRow;
    setConfirmBlockRow(null);
    await setStatus(row.id, "denied");
  };

  const openDeleteUser = (row) => {
    setDeleteTarget(row || null);
    setDeletePassword("");
    setDeleteError("");
    setIsDeleting(false);
  };

  const closeDeleteUser = () => {
    setDeleteTarget(null);
    setDeletePassword("");
    setDeleteError("");
    setIsDeleting(false);
  };

  const confirmDeleteUser = async () => {
    if (!deleteTarget?.id) return;
    if (!deletePassword) {
      setDeleteError("Password is required.");
      return;
    }
    if (!superAdminEmail) {
      setDeleteError("Missing admin email in session. Please refresh and try again.");
      return;
    }
    if (meId && deleteTarget.id === meId) {
      setDeleteError("You can’t delete your own account from here.");
      return;
    }

    setIsDeleting(true);
    setDeleteError("");
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: superAdminEmail,
        password: deletePassword,
      });
      if (authError) throw new Error("Incorrect password. Please try again.");

      // Requires a server-side RPC with admin privileges. See docs file added: docs/supabase-superadmin-delete-user.sql
      const { error: rpcError } = await supabase.rpc("delete_user_by_id", { target_user_id: deleteTarget.id });
      if (rpcError) throw rpcError;

      if (selected?.id === deleteTarget.id) setSelected(null);
      closeDeleteUser();
      await load();
    } catch (e) {
      console.error(e);
      setDeleteError(e?.message || "Failed to delete user.");
      setIsDeleting(false);
    }
  };

  const openDetails = async (row) => {
    setSelected(row);
    await fetchUserProgress(row?.id);
  };

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      const status = r.verification_status || "pending";
      const role = r.role || "trainee";
      if (filter === "supervisors" && role !== "supervisor") return false;
      if (filter === "super-admins" && role !== "admin") return false;
      if (!["all", "supervisors", "super-admins"].includes(filter) && status !== filter) return false;
      if (!q) return true;
      const hay = `${r.email || ""} ${r.full_name || ""} ${r.username || ""} ${r.verification_status || ""}`.toLowerCase();
      const roleHay = `${role}`.toLowerCase();
      if (roleHay.includes(q)) return true;
      return hay.includes(q);
    });
  }, [rows, query, filter]);

  const stats = useMemo(() => {
    const all = rows.length;
    const approved = rows.filter((r) => (r.verification_status || "pending") === "approved").length;
    const denied = rows.filter((r) => (r.verification_status || "pending") === "denied").length;
    const pending = rows.filter((r) => (r.verification_status || "pending") === "pending").length;
    const supervisors = rows.filter((r) => (r.role || "trainee") === "supervisor").length;
    const superAdmins = rows.filter((r) => (r.role || "trainee") === "admin").length;
    return { all, approved, denied, pending, supervisors, superAdmins };
  }, [rows]);

  const savedRole = selected?.role || "trainee";
  const savedModuleIds = selected?.id ? supervisorAssignments[selected.id] || [] : [];
  const roleAndSupervisionBusy = selected ? roleBusyId === selected.id || assignmentBusyId === selected.id : false;
  const roleAndSupervisionChanged = selected ? roleDraft !== savedRole || !moduleIdsMatch(moduleDraft, savedModuleIds) : false;

  const getInitials = (row) => {
    const n = (row?.full_name || row?.email || row?.username || "?").trim();
    const parts = n.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 2);
    return n.slice(0, 2).toUpperCase();
  };

  const formatCreatedAt = (value) => {
    const createdAt = value ? new Date(value) : null;
    if (!createdAt || Number.isNaN(createdAt.getTime())) return null;
    return {
      date: createdAt.toLocaleDateString(),
      time: createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const StatusPill = ({ s }) => {
    const tone =
      s === "approved"
        ? { background: "rgba(139,197,63,0.14)", color: brand.green, border: "1px solid rgba(139,197,63,0.25)" }
        : s === "denied"
        ? { background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }
        : { background: "rgba(245,158,11,0.14)", color: "#F59E0B", border: "1px solid rgba(245,158,11,0.25)" };
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={tone}>
        {s || "pending"}
      </span>
    );
  };

  const RolePill = ({ role }) => {
    const normalized = role || "trainee";
    const tone =
      normalized === "admin"
        ? { background: "rgba(124,77,255,0.15)", color: "#A78BFA", border: "1px solid rgba(167,139,250,0.30)" }
        : normalized === "supervisor"
        ? { background: "rgba(0,229,255,0.12)", color: colors.primary, border: `1px solid ${colors.primary}35` }
        : { background: "rgba(148,163,184,0.12)", color: colors.muted, border: "1px solid rgba(148,163,184,0.22)" };
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize" style={tone}>
        {normalized}
      </span>
    );
  };

  return (
    <div
      className="min-h-screen pt-28 px-4"
      style={{
        background:
          theme === "dark"
            ? `radial-gradient(1200px 600px at 15% -10%, ${colors.primary}10 0%, transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(124,77,255,0.10) 0%, transparent 55%), ${colors.bg}`
            : `radial-gradient(1200px 600px at 15% -10%, ${colors.primary}12 0%, transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(124,77,255,0.08) 0%, transparent 55%), ${colors.bg}`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <h1 className="text-3xl font-black flex items-center gap-3" style={{ color: colors.text }}>
              <span className="p-2 rounded-2xl" style={{ background: `${colors.primary}18`, color: colors.primary }}>
                <Shield className="w-6 h-6" />
              </span>
              Super Admin Module
            </h1>
            {/* <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-sm" style={{ color: colors.muted }}>
                Signed in as
              </span>
              <span
                className="text-sm font-bold px-2.5 py-1 rounded-full border"
                style={{
                  color: colors.text,
                  background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                  borderColor: `${colors.primary}22`,
                }}
              >
                {label}
              </span>
            </div> */}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="px-4 py-2.5 rounded-2xl font-semibold inline-flex items-center gap-2 transition-all hover:scale-[1.01]"
              style={{ background: `${colors.primary}14`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
              aria-label="Refresh"
              title="Refresh"
            >
              <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl p-4 border" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)", color: "#EF4444" }}>
            {error}
          </div>
        ) : null}

        <div className="rounded-3xl border p-4 mb-4" style={{ background: colors.card, borderColor: `${colors.primary}20` }}>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {[
                { key: "all", label: `All Users(${stats.all})` },
                { key: "pending", label: `Unverified (${stats.pending})` },
                { key: "approved", label: `Verified (${stats.approved})` },
                { key: "denied", label: `Denied (${stats.denied})` },
              ].map((t) => {
                const active = filter === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setFilter(t.key)}
                    className="px-4 py-2 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.01]"
                    style={{
                      background: active ? `${colors.primary}18` : theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                      color: active ? colors.primary : colors.muted,
                      border: `1px solid ${active ? `${colors.primary}35` : `${colors.primary}12`}`,
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            <div className="flex-1" />

            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.muted }} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, status…"
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border outline-none transition-all"
                style={{
                  background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                  borderColor: `${colors.primary}25`,
                  color: colors.text,
                }}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 border-t pt-3" style={{ borderColor: `${colors.primary}12` }}>
            {[
              { key: "supervisors", label: `Supervisor (${stats.supervisors})` },
              { key: "super-admins", label: `Super Admin (${stats.superAdmins})` },
            ].map((t) => {
              const active = filter === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setFilter(t.key)}
                  className="px-4 py-2 rounded-2xl font-semibold text-sm transition-all hover:scale-[1.01]"
                  style={{
                    background: active ? `${colors.primary}18` : theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                    color: active ? colors.primary : colors.muted,
                    border: `1px solid ${active ? `${colors.primary}35` : `${colors.primary}12`}`,
                  }}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border overflow-hidden mb-4" style={{ background: colors.card, borderColor: `${colors.primary}20` }}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}>
                <tr>
                  <th className="text-left px-4 py-3" style={{ color: colors.muted }}>User</th>
                  <th className="text-left px-4 py-3" style={{ color: colors.muted }}>Status</th>
                  <th className="text-left px-4 py-3" style={{ color: colors.muted }}>Role</th>
                  <th className="text-left px-4 py-3" style={{ color: colors.muted }}>Created</th>
                  <th className="text-right px-4 py-3" style={{ color: colors.muted }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8" style={{ color: colors.muted }}>
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: colors.primary }} />
                        Loading users…
                      </div>
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8" style={{ color: colors.muted }}>
                      <div className="rounded-2xl border p-4" style={{ borderColor: `${colors.primary}15`, background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                        No users found for the current filters/search.
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredRows.map((r) => {
                    const busy = busyId === r.id;
                    const status = r.verification_status || "pending";
                    const isBlockAction = status === "approved";
                    const createdAt = formatCreatedAt(r.created_at);
                    return (
                      <tr
                        key={r.id}
                        style={{
                          borderTop: `1px solid ${colors.primary}12`,
                          background: theme === "dark" ? "rgba(255,255,255,0.00)" : "rgba(0,0,0,0.00)",
                        }}
                        className="transition-colors hover:bg-white/5"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm border"
                              style={{
                                background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                                borderColor: `${colors.primary}18`,
                                color: colors.primary,
                              }}
                            >
                              {getInitials(r)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold truncate" style={{ color: colors.text }}>
                                {r.full_name || r.email || r.id}
                              </div>
                              <div className="text-xs mt-0.5 truncate" style={{ color: colors.muted }}>
                                {r.email ? r.email : ""} {r.username ? `• @${r.username}` : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill s={r.verification_status} />
                        </td>
                        <td className="px-4 py-3">
                          <RolePill role={r.role} />
                        </td>
                        <td className="px-4 py-3" style={{ color: colors.muted }}>
                          {createdAt ? (
                            <div className="leading-tight">
                              <div className="font-semibold" style={{ color: colors.text }}>
                                {createdAt.date}
                              </div>
                              <div className="mt-1 text-xs">{createdAt.time}</div>
                            </div>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2 flex-wrap">
                            <button
                              onClick={() => openDetails(r)}
                              className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all hover:scale-[1.01]"
                              style={{ background: `${colors.primary}14`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
                            >
                              <Eye className="w-4 h-4" />
                              Details
                            </button>
                            {status !== "approved" ? (
                              <button
                                disabled={busy}
                                onClick={() => setStatus(r.id, "approved")}
                                className="w-28 justify-center px-2.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all disabled:opacity-60 shrink-0"
                                style={{ background: "rgba(16,185,129,0.14)", color: "#10B981", border: "1px solid rgba(16,185,129,0.25)" }}
                              >
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                Approve
                              </button>
                            ) : null}
                            {status !== "denied" ? (
                              <button
                                disabled={busy}
                                onClick={() => (isBlockAction ? requestBlock(r) : setStatus(r.id, "denied"))}
                                className="w-28 justify-center px-2.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all disabled:opacity-60 shrink-0"
                                style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.25)" }}
                              >
                                <XCircle className="w-4 h-4 shrink-0" />
                                {status === "approved" ? "Block User" : "Deny"}
                              </button>
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {selected ? (
          <>
            <div
              className="fixed inset-0 z-[9998] animate-[fadeIn_0.2s_ease-out]"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)" }}
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-8 md:p-10 pointer-events-none">
              <div
                className="w-full max-w-6xl rounded-[1.75rem] overflow-hidden shadow-2xl border pointer-events-auto animate-[scaleIn_0.22s_ease-out] max-h-[calc(100vh-4rem)]"
                style={{
                  background: colors.card,
                  borderColor: `${colors.primary}22`,
                  boxShadow: theme === "dark" ? `0 25px 80px rgba(0,0,0,0.55), 0 0 0 1px ${colors.primary}12` : `0 25px 80px rgba(15,23,42,0.12), 0 0 0 1px rgba(0,0,0,0.06)`,
                }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-labelledby="user-detail-title"
              >
                <div className="relative h-full overflow-auto">
                  <button
                    type="button"
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-xl transition-all hover:scale-105"
                    style={{
                      background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                      color: colors.muted,
                    }}
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* LEFT: existing profile detail */}
                    <div className="border-b lg:border-b-0 lg:border-r" style={{ borderColor: `${colors.primary}12` }}>
                      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
                      {/* Hero */}
                      <div
                        className="relative px-8 pt-10 pb-10 text-center"
                        style={{
                          background:
                            theme === "dark"
                              ? `linear-gradient(145deg, ${colors.primary}22 0%, rgba(26,31,46,0.95) 45%, ${colors.card} 100%)`
                              : `linear-gradient(145deg, ${colors.primary}18 0%, #fff 50%, ${colors.card} 100%)`,
                        }}
                      >
                        <div className="flex justify-center">
                          <div
                            className="relative rounded-[1.35rem] p-1"
                            style={{
                              background: `linear-gradient(135deg, ${colors.primary}, ${colors.gradientEnd})`,
                              boxShadow: `0 12px 40px ${colors.primary}35`,
                            }}
                          >
                            <DetailAvatar key={selected.id} row={selected} colors={colors} theme={theme} getInitials={getInitials} />
                          </div>
                        </div>

                        <h2 id="user-detail-title" className="mt-6 text-xl sm:text-2xl font-black tracking-tight px-2" style={{ color: colors.text }}>
                          {selected.full_name || selected.email || "User"}
                        </h2>
                        <div className="mt-3 flex justify-center">
                          <StatusPill s={selected.verification_status} />
                        </div>
                      </div>

                      {/* Details */}
                      <div className="px-6 pb-6 -mt-6 relative">
                        <div
                          className="rounded-2xl border p-1 space-y-0 overflow-hidden"
                          style={{
                            background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                            borderColor: `${colors.primary}15`,
                          }}
                        >
                          {[
                            {
                              icon: <Mail className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />,
                              label: "Email",
                              value: selected.email || "—",
                            },
                            {
                              icon: <AtSign className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />,
                              label: "Username",
                              value: selected.username ? `@${selected.username}` : "—",
                            },
                            {
                              icon: <Shield className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />,
                              label: "Role",
                              value: selected.role || "trainee",
                            },
                            {
                              icon: <User className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />,
                              label: "User ID",
                              value: selected.id || "—",
                              mono: true,
                            },
                            {
                              icon: <CalendarClock className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />,
                              label: "Joined",
                              value: selected.created_at ? new Date(selected.created_at).toLocaleString() : "—",
                            },
                          ].map((row, i, arr) => (
                            <div
                              key={row.label}
                              className="flex items-start gap-3 px-4 py-3.5"
                              style={{
                                borderBottom: i < arr.length - 1 ? `1px solid ${colors.primary}10` : undefined,
                              }}
                            >
                              <div className="mt-0.5 p-2 rounded-xl shrink-0" style={{ background: `${colors.primary}12` }}>
                                {row.icon}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: colors.muted }}>
                                  {row.label}
                                </div>
                                <div className={`text-sm font-semibold mt-0.5 break-all ${row.mono ? "font-mono text-xs" : ""}`} style={{ color: colors.text }}>
                                  {row.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 rounded-2xl border p-4" style={{ borderColor: `${colors.primary}15`, background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
                          <div className="flex items-center justify-between gap-3 flex-wrap">
                            <div>
                              <div className="text-sm font-black" style={{ color: colors.text }}>
                                Role and supervision
                              </div>
                              <div className="text-xs mt-1" style={{ color: colors.muted }}>
                                Assign supervisor access and the modules this user can review.
                              </div>
                            </div>
                            <div className="relative w-full sm:w-64">
                              <select
                                value={roleDraft}
                                disabled={roleAndSupervisionBusy || (meId && selected.id === meId)}
                                onChange={(e) => setRoleDraft(e.target.value)}
                                className="w-full appearance-none rounded-2xl border px-4 py-3 pr-11 text-sm font-bold outline-none shadow-lg transition-all focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60"
                                style={{
                                  background:
                                    theme === "dark"
                                      ? `linear-gradient(135deg, ${colors.primary}18, rgba(124,77,255,0.13)), #111827`
                                      : `linear-gradient(135deg, ${colors.primary}10, rgba(124,77,255,0.08)), #fff`,
                                  color: colors.text,
                                  borderColor: `${colors.primary}35`,
                                  boxShadow: theme === "dark" ? `0 14px 35px rgba(0,0,0,0.22), 0 0 0 1px ${colors.primary}08` : "0 14px 35px rgba(15,23,42,0.08)",
                                  "--tw-ring-color": `${colors.primary}30`,
                                }}
                                title={meId && selected.id === meId ? "You cannot change your own role here" : "Change user role"}
                              >
                                <option value="trainee" style={{ background: theme === "dark" ? "#111827" : "#fff", color: colors.text }}>Trainee</option>
                                <option value="supervisor" style={{ background: theme === "dark" ? "#111827" : "#fff", color: colors.text }}>Supervisor</option>
                                <option value="admin" style={{ background: theme === "dark" ? "#111827" : "#fff", color: colors.text }}>Super Admin</option>
                              </select>
                              <span
                                className="pointer-events-none absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-xl"
                                style={{ background: `${colors.primary}16`, color: colors.primary }}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </span>
                            </div>
                          </div>

                          {roleDraft === "supervisor" ? (
                            <div className="mt-4">
                              <div className="text-[11px] font-bold uppercase tracking-wider mb-2" style={{ color: colors.muted }}>
                                Supervised modules
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-auto pr-1">
                                {allModules.map((module) => {
                                  const assigned = moduleDraft.includes(String(module.id));
                                  return (
                                    <label
                                      key={module.id}
                                      className={`group flex items-start gap-3 rounded-2xl border px-3.5 py-3 text-xs transition-all focus-within:ring-2 ${
                                        roleAndSupervisionBusy ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:-translate-y-0.5"
                                      }`}
                                      style={{
                                        borderColor: assigned ? (theme === "dark" ? "rgba(52,211,153,0.48)" : "rgba(5,150,105,0.42)") : `${colors.primary}12`,
                                        background: assigned
                                          ? theme === "dark"
                                            ? "linear-gradient(135deg, rgba(16,185,129,0.18), rgba(0,229,255,0.10))"
                                            : "linear-gradient(135deg, rgba(16,185,129,0.13), rgba(0,102,255,0.08))"
                                          : theme === "dark"
                                          ? "rgba(255,255,255,0.02)"
                                          : "rgba(0,0,0,0.02)",
                                        color: colors.text,
                                        boxShadow: assigned ? "0 12px 28px rgba(16,185,129,0.12)" : "none",
                                        "--tw-ring-color": `${colors.primary}25`,
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        className="sr-only"
                                        checked={assigned}
                                        disabled={roleAndSupervisionBusy}
                                        onChange={() => toggleSupervisorModule(module.id)}
                                      />
                                      <span
                                        aria-hidden="true"
                                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-xl border transition-all"
                                        style={{
                                          background: assigned ? `linear-gradient(135deg, ${brand.green}, ${brand.cyan})` : theme === "dark" ? "rgba(0,21,41,0.9)" : "#fff",
                                          borderColor: assigned ? "rgba(16,185,129,0.9)" : `${colors.primary}25`,
                                          color: assigned ? "#061B1F" : "transparent",
                                          boxShadow: assigned ? "0 8px 22px rgba(16,185,129,0.32)" : "inset 0 0 0 1px rgba(255,255,255,0.04)",
                                        }}
                                      >
                                        <Check className="h-[18px] w-[18px] stroke-[3.5]" />
                                      </span>
                                      <span className="leading-5">
                                        Module {module.id}: {module.name}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                              {roleAndSupervisionBusy ? (
                                <div className="mt-2 text-xs inline-flex items-center gap-2" style={{ color: colors.muted }}>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  Saving changes...
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            <div className="mt-4 rounded-xl border px-3 py-2 text-xs" style={{ borderColor: `${colors.primary}12`, color: colors.muted }}>
                              Module assignments are only available when this user is set as a supervisor.
                            </div>
                          )}

                          <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:justify-end">
                            <button
                              type="button"
                              disabled={!roleAndSupervisionChanged || roleAndSupervisionBusy}
                              onClick={resetRoleAndSupervisionDraft}
                              className="px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                              style={{ background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)", color: colors.muted, border: `1px solid ${colors.primary}18` }}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              disabled={!roleAndSupervisionChanged || roleAndSupervisionBusy || (meId && selected.id === meId)}
                              onClick={saveRoleAndSupervision}
                              className="px-4 py-2 rounded-xl text-xs font-bold inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                              style={{ background: `${colors.primary}18`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
                            >
                              {roleAndSupervisionBusy ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                              Save changes
                            </button>
                          </div>
                        </div>

                        <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-stretch pt-2" style={{ borderTop: `1px solid ${colors.primary}12` }}>
                          {selected.verification_status !== "approved" ? (
                            <button
                              disabled={busyId === selected.id}
                              onClick={() => setStatus(selected.id, "approved")}
                              className="order-2 sm:order-1 w-full sm:flex-1 sm:min-w-0 sm:basis-0 px-5 py-3 rounded-2xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-60"
                              style={{
                                background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.08))",
                                color: brand.green,
                                border: "1px solid rgba(16,185,129,0.35)",
                              }}
                            >
                              <CheckCircle2 className="w-4 h-4 shrink-0" />
                              Approve verification
                            </button>
                          ) : null}
                          {selected.verification_status !== "denied" ? (
                            <button
                              disabled={busyId === selected.id}
                              onClick={() => (selected.verification_status === "approved" ? requestBlock(selected) : setStatus(selected.id, "denied"))}
                              className="order-1 sm:order-2 w-full sm:flex-1 sm:min-w-0 sm:basis-0 px-5 py-3 rounded-2xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-60"
                              style={{
                                background: "linear-gradient(135deg, rgba(239,68,68,0.16), rgba(239,68,68,0.06))",
                                color: "#EF4444",
                                border: "1px solid rgba(239,68,68,0.35)",
                              }}
                            >
                              <XCircle className="w-4 h-4 shrink-0" />
                              {selected.verification_status === "approved" ? "Block user" : "Deny verification"}
                            </button>
                          ) : null}
                        </div>

                        <div className="mt-3">
                          <button
                            type="button"
                            disabled={busyId === selected.id || isDeleting || (meId && selected.id === meId)}
                            onClick={() => openDeleteUser(selected)}
                            className="w-full px-5 py-3 rounded-2xl text-sm font-bold inline-flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-60"
                            style={{
                              background: "linear-gradient(135deg, rgba(239,68,68,0.14), rgba(239,68,68,0.06))",
                              color: "#EF4444",
                              border: "1px solid rgba(239,68,68,0.30)",
                            }}
                            aria-label="Delete user"
                            title={meId && selected.id === meId ? "You can’t delete your own account from here" : "Delete user"}
                          >
                            <Trash2 className="w-4 h-4 shrink-0" />
                            Delete user
                          </button>
                        </div>
                      </div>
                      </div>
                    </div>

                    {/* RIGHT: progress detail */}
                    <div className="px-6 pt-8 pb-8">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-black tracking-tight" style={{ color: colors.text }}>
                          Learning progress
                        </h3>
                      </div>

                      {progressError ? (
                        <div
                          className="mt-3 rounded-2xl p-4 border text-sm"
                          style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)", color: "#EF4444" }}
                        >
                          {progressError}
                        </div>
                      ) : null}

                      {selected?.id ? (
                        (() => {
                          const p = progressByUserId[selected.id];
                          const isLoadingP = progressLoadingUserId === selected.id && !p;

                          if (isLoadingP) {
                            return (
                              <div className="mt-4 rounded-2xl border p-4 flex items-center gap-3" style={{ borderColor: `${colors.primary}15`, color: colors.muted }}>
                                <Loader2 className="w-5 h-5 animate-spin" style={{ color: colors.primary }} />
                                Loading progress…
                              </div>
                            );
                          }

                          if (!p) {
                            return (
                              <div className="mt-4 rounded-2xl border p-4 text-sm" style={{ borderColor: `${colors.primary}15`, color: colors.muted }}>
                                No progress data yet.
                              </div>
                            );
                          }

                          return (
                            <div className="mt-4 space-y-4">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                  {
                                    icon: <BookOpen className="w-4 h-4" style={{ color: colors.primary }} />,
                                    label: "Modules completed",
                                    value: `${p.completedCount}/${p.totalModules}`,
                                  },
                                  {
                                    icon: <ListChecks className="w-4 h-4" style={{ color: colors.primary }} />,
                                    label: "Overall progress",
                                    value: `${p.overallProgressPercentage}%`,
                                  },
                                  {
                                    icon: <Trophy className="w-4 h-4" style={{ color: colors.primary }} />,
                                    label: "Avg quiz score",
                                    value: `${p.averageQuizScore}%`,
                                  },
                                ].map((card) => (
                                  <div
                                    key={card.label}
                                    className="rounded-2xl border p-3 flex items-start gap-3"
                                    style={{
                                      background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                                      borderColor: `${colors.primary}15`,
                                    }}
                                  >
                                    <div className="p-2 rounded-xl" style={{ background: `${colors.primary}12` }}>
                                      {card.icon}
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: colors.muted }}>
                                        {card.label}
                                      </div>
                                      <div className="text-sm font-black mt-0.5" style={{ color: colors.text }}>
                                        {card.value}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${colors.primary}15` }}>
                                <div
                                  className="px-4 py-3 text-xs font-bold uppercase tracking-wider"
                                  style={{ color: colors.muted, background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}
                                >
                                  Module completion
                                </div>
                                <div className="max-h-[520px] overflow-auto">
                                  {p.modulesWithProgress.map((m, idx) => {
                                    const done = m.progress === 100;
                                    return (
                                      <div key={m.id} className="px-4 py-3" style={{ borderTop: idx === 0 ? undefined : `1px solid ${colors.primary}10` }}>
                                        <div className="flex items-center justify-between gap-3">
                                          <div className="min-w-0">
                                            <div className="text-sm font-semibold truncate" style={{ color: colors.text }}>
                                              Module {m.id}: {m.name}
                                            </div>
                                            <div className="text-xs mt-0.5" style={{ color: colors.muted }}>
                                              {done ? "Completed" : m.progress > 0 ? "In progress" : "Not started"}
                                              {m.updated_at ? ` • Updated ${new Date(m.updated_at).toLocaleString()}` : ""}
                                            </div>
                                          </div>
                                          <div className="text-xs font-black shrink-0" style={{ color: done ? brand.green : colors.primary }}>
                                            {Math.round(m.progress)}%
                                          </div>
                                        </div>
                                        <div className="mt-2 h-2 rounded-full overflow-hidden" style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                                          <div
                                            className="h-full rounded-full transition-all"
                                            style={{
                                              width: `${Math.round(m.progress)}%`,
                                              background: done ? brand.green : colors.primary,
                                            }}
                                          />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })()
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes scaleIn { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
            `}</style>
          </>
        ) : null}

        {/* Confirm block user */}
        {confirmBlockRow ? (
          <>
            <div
              className="fixed inset-0 z-[10000] animate-[fadeIn_0.2s_ease-out]"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)" }}
              onClick={() => setConfirmBlockRow(null)}
            />
            <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6 pointer-events-none">
              <div
                className="w-full max-w-lg rounded-3xl border shadow-2xl pointer-events-auto animate-[scaleIn_0.22s_ease-out]"
                style={{ background: colors.card, borderColor: `${colors.primary}22` }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <div className="p-6">
                  <div className="text-lg font-black" style={{ color: colors.text }}>
                    Block this user?
                  </div>
                  <div className="mt-2 text-sm" style={{ color: colors.muted }}>
                    This will set verification status to <span style={{ color: "#EF4444", fontWeight: 800 }}>denied</span> for{" "}
                    <span style={{ color: colors.text, fontWeight: 800 }}>{confirmBlockRow.full_name || confirmBlockRow.email || confirmBlockRow.id}</span>.
                  </div>
                  <div className="mt-5 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-2xl font-semibold"
                      style={{
                        background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                        color: colors.text,
                        border: `1px solid ${colors.primary}18`,
                      }}
                      onClick={() => setConfirmBlockRow(null)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-2xl font-semibold inline-flex items-center justify-center gap-2"
                      style={{ background: "rgba(239,68,68,0.12)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.28)" }}
                      onClick={confirmBlock}
                    >
                      <XCircle className="w-4 h-4" />
                      Yes, block user
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        {/* Delete user modal */}
        {deleteTarget ? (
          <>
            <div
              className="fixed inset-0 z-[10010] animate-[fadeIn_0.2s_ease-out]"
              style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)" }}
              onClick={closeDeleteUser}
            />
            <div className="fixed inset-0 z-[10011] flex items-center justify-center p-6 pointer-events-none">
              <div
                className="w-full max-w-lg rounded-3xl border shadow-2xl pointer-events-auto animate-[scaleIn_0.22s_ease-out]"
                style={{ background: colors.card, borderColor: `rgba(239,68,68,0.30)` }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-lg font-black" style={{ color: colors.text }}>
                        Delete user
                      </div>
                      <div className="mt-2 text-sm" style={{ color: colors.muted }}>
                        You’re about to permanently delete{" "}
                        <span style={{ color: colors.text, fontWeight: 800 }}>{deleteTarget.full_name || deleteTarget.email || deleteTarget.id}</span>. This action is irreversible.
                      </div>
                    </div>
                    <button
                      type="button"
                      className="p-2.5 rounded-xl"
                      style={{ background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", color: colors.muted }}
                      onClick={closeDeleteUser}
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-5">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>
                      Confirm with your password
                    </label>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="mt-2 w-full px-4 py-3 rounded-2xl border outline-none"
                      placeholder="Enter your password"
                      style={{
                        background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
                        borderColor: "rgba(239,68,68,0.25)",
                        color: colors.text,
                      }}
                      disabled={isDeleting}
                    />
                    {deleteError ? (
                      <div className="mt-3 rounded-2xl p-3 border text-sm" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)", color: "#EF4444" }}>
                        {deleteError}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-2 sm:justify-end">
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-2xl font-semibold"
                      style={{
                        background: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
                        color: colors.text,
                        border: `1px solid ${colors.primary}18`,
                      }}
                      onClick={closeDeleteUser}
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2.5 rounded-2xl font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ background: "rgba(239,68,68,0.14)", color: "#EF4444", border: "1px solid rgba(239,68,68,0.28)" }}
                      onClick={confirmDeleteUser}
                      disabled={isDeleting}
                    >
                      {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      Delete user
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

