import React, { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  Brain,
  CalendarClock,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileText,
  Loader2,
  Mail,
  RefreshCcw,
  Save,
  Search,
  ShieldCheck,
  Trophy,
  User,
  X,
} from "lucide-react";
import { supabase } from "../../supabaseClient";
import { getShaAdminColors } from "../../theme/sha";
import { MODULE_DATA_BY_ID, TRAINING_MODULES } from "../../constants/moduleCatalog";

const BUCKET_NAME = "submissions";

function isAssignmentPendingGrading(assignment) {
  if (!assignment) return false;
  if (assignment.status === "graded" || assignment.grade) return false;
  return assignment.status === "submitted";
}

function buildPendingGradingMap(submissions) {
  const map = {};
  (submissions || []).forEach((row) => {
    if (!isAssignmentPendingGrading(row)) return;
    const userId = row.user_id;
    if (!map[userId]) map[userId] = { count: 0, moduleIds: [] };
    map[userId].count += 1;
    map[userId].moduleIds.push(String(row.module_id));
  });
  return map;
}

function PendingGradingBadge({ compact = false }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wide shrink-0 ${
        compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]"
      }`}
      style={{
        background: "rgba(245, 158, 11, 0.14)",
        color: "#F59E0B",
        border: "1px solid rgba(245, 158, 11, 0.35)",
      }}
    >
      <Clock className={compact ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {compact ? "Grade" : "Needs grading"}
    </span>
  );
}

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
      {showImg ? <img src={row.avatar_url} alt="" className="w-full h-full object-cover" onError={() => setImgFailed(true)} /> : getInitials(row)}
    </div>
  );
}

function InfoRow({ icon, label, value, colors, mono = false }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3.5 border-b last:border-b-0" style={{ borderColor: `${colors.primary}10` }}>
      <div className="mt-0.5 p-2 rounded-xl shrink-0" style={{ background: `${colors.primary}12` }}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-bold uppercase tracking-wider" style={{ color: colors.muted }}>
          {label}
        </div>
        <div className={`text-sm font-semibold mt-0.5 break-all ${mono ? "font-mono text-xs" : ""}`} style={{ color: colors.text }}>
          {value || "-"}
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, icon, children, colors, theme, expanded, onToggle, badge = null }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: `${colors.primary}15` }}>
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-4 py-3 flex items-center justify-between gap-3 text-left text-sm font-black"
        style={{ color: colors.text, background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)" }}
        aria-expanded={expanded}
      >
        <span className="inline-flex items-center gap-2 min-w-0 flex-wrap">
          {icon}
          {title}
          {badge}
        </span>
        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`} style={{ color: colors.muted }} />
      </button>
      {expanded ? <div className="p-4">{children}</div> : null}
    </div>
  );
}

export default function SupervisorModule({ theme = "dark" }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [rows, setRows] = useState([]);
  const [assignedModules, setAssignedModules] = useState([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState("");
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [detailData, setDetailData] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [notesInput, setNotesInput] = useState("");
  const [gradeSaving, setGradeSaving] = useState(false);
  const [expandedResultCards, setExpandedResultCards] = useState({
    quiz: false,
    ai: false,
    assignment: false,
  });
  const [pendingGradingMap, setPendingGradingMap] = useState({});

  const colors = useMemo(() => getShaAdminColors(theme), [theme]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const {
        data: { user },
        error: userErr,
      } = await supabase.auth.getUser();
      if (userErr) throw userErr;
      if (!user?.id) throw new Error("Missing supervisor session.");

      const [profileRes, assignmentRes] = await Promise.all([
        supabase
          .from("profiles")
          .select("id,email,full_name,username,avatar_url,verification_status,role,created_at,updated_at")
          .order("created_at", { ascending: false }),
        supabase.from("supervisor_module_assignments").select("module_id").eq("supervisor_id", user.id),
      ]);

      if (profileRes.error) throw profileRes.error;
      if (assignmentRes.error) throw assignmentRes.error;

      const modules = (assignmentRes.data || [])
        .map((row) => TRAINING_MODULES.find((module) => String(module.id) === String(row.module_id)))
        .filter(Boolean);

      const moduleIds = modules.map((module) => String(module.moduleId));
      let pendingMap = {};
      if (moduleIds.length > 0) {
        const { data: submissionRows, error: submissionsErr } = await supabase
          .from("assignment_submissions")
          .select("user_id,module_id,status,grade")
          .in("module_id", moduleIds);
        if (submissionsErr) throw submissionsErr;
        pendingMap = buildPendingGradingMap(submissionRows);
      }

      setRows(profileRes.data || []);
      setAssignedModules(modules);
      setPendingGradingMap(pendingMap);
      setSelectedModuleId((current) => current || modules[0]?.moduleId || "");
    } catch (e) {
      console.error(e);
      setError(e?.message || "Failed to load supervisor dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const hay = `${row.email || ""} ${row.full_name || ""} ${row.username || ""} ${row.verification_status || ""} ${row.role || ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, query]);

  const selectedModule = useMemo(
    () => assignedModules.find((module) => String(module.id) === String(selectedModuleId)),
    [assignedModules, selectedModuleId]
  );

  const totalPendingGrading = useMemo(
    () => Object.values(pendingGradingMap).reduce((sum, entry) => sum + entry.count, 0),
    [pendingGradingMap]
  );

  const currentAssignmentPending = isAssignmentPendingGrading(detailData?.assignment);

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

  const toggleResultCard = (key) => {
    setExpandedResultCards((current) => ({
      ...current,
      [key]: !current[key],
    }));
  };

  const openDetails = (row) => {
    setSelected(row);
    setSelectedModuleId((current) => current || assignedModules[0]?.moduleId || "");
    setExpandedResultCards({ quiz: false, ai: false, assignment: false });
  };

  const closeDetails = () => {
    setSelected(null);
    setDetailData(null);
    setDetailError("");
  };

  useEffect(() => {
    const fetchDetail = async () => {
      if (!selected?.id || !selectedModuleId) return;
      setDetailLoading(true);
      setDetailError("");
      try {
        const moduleId = String(selectedModuleId);
        const [progressRes, quizRes, aiRes, assignmentRes] = await Promise.all([
          supabase
            .from("user_module_progress")
            .select("module_id,progress_percentage,updated_at")
            .eq("user_id", selected.id)
            .eq("module_id", moduleId)
            .maybeSingle(),
          supabase
            .from("quiz_submissions")
            .select("score,total_questions,answers,updated_at")
            .eq("user_id", selected.id)
            .eq("module_id", moduleId)
            .maybeSingle(),
          supabase
            .from("ai_quiz_submissions")
            .select("score,answers,grading_results,updated_at")
            .eq("user_id", selected.id)
            .eq("module_id", moduleId)
            .maybeSingle(),
          supabase
            .from("assignment_submissions")
            .select("*")
            .eq("user_id", selected.id)
            .eq("module_id", moduleId)
            .maybeSingle(),
        ]);

        [progressRes, quizRes, aiRes, assignmentRes].forEach((res) => {
          if (res.error) throw res.error;
        });

        const assignment = assignmentRes.data || null;
        setDetailData({
          progress: progressRes.data || null,
          quiz: quizRes.data || null,
          ai: aiRes.data || null,
          assignment,
        });
        setGradeInput(assignment?.grade || "");
        setNotesInput(assignment?.grading_notes || "");
      } catch (e) {
        console.error(e);
        setDetailError(e?.message || "Failed to load trainee module results.");
        setDetailData(null);
      } finally {
        setDetailLoading(false);
      }
    };

    fetchDetail();
  }, [selected?.id, selectedModuleId]);

  useEffect(() => {
    if (detailLoading || !currentAssignmentPending) return;
    setExpandedResultCards((current) => ({ ...current, assignment: true }));
  }, [selected?.id, selectedModuleId, currentAssignmentPending, detailLoading]);

  const clearPendingForUserModule = (userId, moduleId) => {
    setPendingGradingMap((current) => {
      const entry = current[userId];
      if (!entry) return current;
      const moduleIds = entry.moduleIds.filter((id) => id !== String(moduleId));
      if (moduleIds.length === 0) {
        const next = { ...current };
        delete next[userId];
        return next;
      }
      return { ...current, [userId]: { count: moduleIds.length, moduleIds } };
    });
  };

  const downloadFile = async (file) => {
    if (!file?.storagePath) return;
    try {
      const { data, error: signedUrlError } = await supabase.storage.from(BUCKET_NAME).createSignedUrl(file.storagePath, 3600);
      if (signedUrlError) throw signedUrlError;

      const response = await fetch(data.signedUrl);
      if (!response.ok) throw new Error("Download failed.");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = file.name || "assignment-submission";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
      alert("Could not download the file. It may have been removed or access was denied.");
    }
  };

  const saveGrade = async () => {
    if (!selected?.id || !selectedModuleId || !gradeInput.trim()) return;
    setGradeSaving(true);
    setDetailError("");
    try {
      const { data, error: gradeErr } = await supabase.rpc("supervisor_grade_assignment", {
        target_user_id: selected.id,
        target_module_id: String(selectedModuleId),
        assignment_grade: gradeInput.trim(),
        assignment_grading_notes: notesInput.trim() || null,
      });
      if (gradeErr) throw gradeErr;
      setDetailData((current) => ({ ...current, assignment: data }));
      clearPendingForUserModule(selected.id, selectedModuleId);
    } catch (e) {
      console.error(e);
      setDetailError(e?.message || "Failed to save assignment grade.");
    } finally {
      setGradeSaving(false);
    }
  };

  const renderQuizAnswers = () => {
    const moduleData = MODULE_DATA_BY_ID[String(selectedModuleId)];
    const quiz = detailData?.quiz;
    const questions = moduleData?.quizQuestions || [];
    if (!quiz) {
      return <div className="text-sm" style={{ color: colors.muted }}>No multiple-choice submission yet.</div>;
    }

    return (
      <div className="space-y-3">
        <div className="text-sm font-bold" style={{ color: colors.text }}>
          Score: {quiz.score ?? 0}/{quiz.total_questions ?? questions.length}
        </div>
        <div className="space-y-2 max-h-64 overflow-auto pr-1">
          {questions.map((question, index) => {
            const answer = quiz.answers?.[question.id];
            const correct = answer === question.correctAnswer;
            return (
              <div key={question.id || index} className="rounded-xl border p-3 text-sm" style={{ borderColor: `${colors.primary}12`, color: colors.text }}>
                <div className="font-semibold">
                  {index + 1}. {question.question}
                </div>
                <div className="mt-2 text-xs" style={{ color: correct ? "#10B981" : "#EF4444" }}>
                  Answer: {answer || "Not answered"}
                </div>
                <div className="mt-1 text-xs" style={{ color: colors.muted }}>
                  Correct answer: {question.correctAnswer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAiAnswers = () => {
    const moduleData = MODULE_DATA_BY_ID[String(selectedModuleId)];
    const ai = detailData?.ai;
    const questions = moduleData?.aiQuizQuestions || [];
    if (!ai) {
      return <div className="text-sm" style={{ color: colors.muted }}>No Response submission yet.</div>;
    }

    return (
      <div className="space-y-3">
        <div className="text-sm font-bold" style={{ color: colors.text }}>
          Score: {ai.score ?? "-"}
        </div>
        <div className="space-y-2 max-h-64 overflow-auto pr-1">
          {questions.map((question, index) => {
            const result = ai.grading_results?.results?.find((item) => item.questionId === question.id);
            return (
              <div key={question.id || index} className="rounded-xl border p-3 text-sm" style={{ borderColor: `${colors.primary}12`, color: colors.text }}>
                <div className="font-semibold">
                  {index + 1}. {question.question || question.prompt}
                </div>
                <div className="mt-2 text-xs whitespace-pre-wrap" style={{ color: colors.muted }}>
                  Answer: {ai.answers?.[question.id] || "Not answered"}
                </div>
                {result ? (
                  <div className="mt-2 rounded-lg p-2 text-xs" style={{ background: `${colors.primary}10`, color: colors.text }}>
                    <div className="font-bold">Feedback: {result.score ?? "-"} / {result.maxScore ?? "-"}</div>
                    <div className="mt-1 whitespace-pre-wrap">{result.feedback || result.explanation || "No feedback provided."}</div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderAssignment = () => {
    const assignment = detailData?.assignment;
    if (!assignment) {
      return <div className="text-sm" style={{ color: colors.muted }}>No assignment submission yet.</div>;
    }

    const files = assignment.files || [];
    const pendingGrading = isAssignmentPendingGrading(assignment);
    return (
      <div className="space-y-4">
        {pendingGrading ? (
          <div
            className="rounded-2xl border px-4 py-3 flex items-start gap-3 text-sm"
            style={{
              background: "rgba(245, 158, 11, 0.1)",
              borderColor: "rgba(245, 158, 11, 0.35)",
              color: colors.text,
            }}
          >
            <Clock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#F59E0B" }} />
            <div>
              <div className="font-black" style={{ color: "#F59E0B" }}>Awaiting your grade</div>
              <div className="mt-1 text-xs" style={{ color: colors.muted }}>
                This trainee submitted their assignment. Review the files below and save a grade when ready.
              </div>
            </div>
          </div>
        ) : null}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          <div className="rounded-xl border p-3" style={{ borderColor: `${colors.primary}12`, color: colors.text }}>
            <div className="text-[11px] uppercase font-bold" style={{ color: colors.muted }}>Status</div>
            <div className="font-black capitalize flex items-center gap-2 flex-wrap">
              {assignment.status || "submitted"}
              {pendingGrading ? <PendingGradingBadge compact /> : null}
            </div>
          </div>
          <div className="rounded-xl border p-3" style={{ borderColor: `${colors.primary}12`, color: colors.text }}>
            <div className="text-[11px] uppercase font-bold" style={{ color: colors.muted }}>Grade</div>
            <div className="font-black">{assignment.grade || "Pending"}</div>
          </div>
          <div className="rounded-xl border p-3" style={{ borderColor: `${colors.primary}12`, color: colors.text }}>
            <div className="text-[11px] uppercase font-bold" style={{ color: colors.muted }}>Updated</div>
            <div className="font-black text-xs">{assignment.updated_at ? new Date(assignment.updated_at).toLocaleString() : "-"}</div>
          </div>
        </div>

        <div className="space-y-2">
          {files.length > 0 ? (
            files.map((file, index) => (
              <div key={file.id || file.storagePath || index} className="flex items-center justify-between gap-3 rounded-xl border p-3" style={{ borderColor: `${colors.primary}12` }}>
                <div className="min-w-0">
                  <div className="text-sm font-semibold truncate" style={{ color: colors.text }}>{file.name || file.storageName || "Submission file"}</div>
                  <div className="text-xs" style={{ color: colors.muted }}>{file.uploadDate || "-"} {file.size ? `- ${file.size}` : ""}</div>
                </div>
                <button
                  type="button"
                  onClick={() => downloadFile(file)}
                  className="px-3 py-2 rounded-xl text-xs font-bold inline-flex items-center gap-2"
                  style={{ background: `${colors.primary}14`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))
          ) : (
            <div className="text-sm" style={{ color: colors.muted }}>No files attached.</div>
          )}
        </div>

        <div className="rounded-2xl border p-4 space-y-3" style={{ borderColor: `${colors.primary}15`, background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="text-sm font-black" style={{ color: colors.text }}>Grade assignment</div>
          <input
            value={gradeInput}
            onChange={(e) => setGradeInput(e.target.value)}
            placeholder="e.g. 85%, Pass, A"
            className="w-full px-4 py-3 rounded-xl border outline-none"
            style={{ background: theme === "dark" ? "#111827" : "#fff", color: colors.text, borderColor: `${colors.primary}25` }}
          />
          <textarea
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
            placeholder="Optional grading notes"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border outline-none resize-none"
            style={{ background: theme === "dark" ? "#111827" : "#fff", color: colors.text, borderColor: `${colors.primary}25` }}
          />
          <button
            type="button"
            disabled={gradeSaving || !gradeInput.trim()}
            onClick={saveGrade}
            className="px-4 py-2.5 rounded-xl text-sm font-bold inline-flex items-center gap-2 disabled:opacity-60"
            style={{ background: `${colors.primary}18`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
          >
            {gradeSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save grade
          </button>
        </div>
      </div>
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
                <ShieldCheck className="w-6 h-6" />
              </span>
              Supervisor Dashboard
            </h1>
            <p className="mt-2 text-sm" style={{ color: colors.muted }}>
              Review trainee results for your assigned modules.
            </p>
          </div>
          <button
            onClick={load}
            className="px-4 py-2.5 rounded-2xl font-semibold inline-flex items-center gap-2 transition-all hover:scale-[1.01]"
            style={{ background: `${colors.primary}14`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {error ? (
          <div className="mb-4 rounded-2xl p-4 border" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)", color: "#EF4444" }}>
            {error}
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <div className="rounded-3xl border p-4" style={{ background: colors.card, borderColor: `${colors.primary}20` }}>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>Users</div>
            <div className="mt-1 text-2xl font-black" style={{ color: colors.text }}>{rows.length}</div>
          </div>
          <div className="rounded-3xl border p-4" style={{ background: colors.card, borderColor: `${colors.primary}20` }}>
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>Assigned modules</div>
            <div className="mt-1 text-2xl font-black" style={{ color: colors.text }}>{assignedModules.length}</div>
          </div>
          <div
            className="rounded-3xl border p-4"
            style={{
              background: colors.card,
              borderColor: totalPendingGrading > 0 ? "rgba(245, 158, 11, 0.35)" : `${colors.primary}20`,
            }}
          >
            <div className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>Awaiting grade</div>
            <div className="mt-1 text-2xl font-black" style={{ color: totalPendingGrading > 0 ? "#F59E0B" : colors.text }}>
              {totalPendingGrading}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border p-4 mb-4" style={{ background: colors.card, borderColor: `${colors.primary}20` }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider" style={{ color: colors.muted }}>Scope</div>
              <div className="mt-1 text-sm font-semibold" style={{ color: colors.text }}>
                Modules available for this supervisor to review
              </div>
            </div>
            <span className="rounded-2xl p-2.5" style={{ background: `${colors.primary}12`, color: colors.primary }}>
              <BookOpen className="w-5 h-5" />
            </span>
          </div>
          {assignedModules.length ? (
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-2.5">
              {assignedModules.map((module) => (
                <div
                  key={module.id}
                  className="rounded-2xl border px-3.5 py-3"
                  style={{
                    background:
                      theme === "dark"
                        ? `linear-gradient(135deg, ${colors.primary}10, rgba(124,77,255,0.09))`
                        : `linear-gradient(135deg, ${colors.primary}08, rgba(124,77,255,0.06))`,
                    borderColor: `${colors.primary}18`,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 rounded-xl px-2.5 py-1 text-[11px] font-black"
                      style={{ background: `${colors.primary}18`, color: colors.primary }}
                    >
                      Module {module.id}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-bold leading-snug" style={{ color: colors.text }}>
                        {module.name}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border px-3 py-3 text-sm font-semibold" style={{ borderColor: `${colors.primary}12`, color: colors.muted }}>
              No modules assigned
            </div>
          )}
        </div>

        <div className="rounded-3xl border p-4 mb-4" style={{ background: colors.card, borderColor: `${colors.primary}20` }}>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.muted }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, role, status..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border outline-none transition-all"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                borderColor: `${colors.primary}25`,
                color: colors.text,
              }}
            />
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
                        Loading users...
                      </div>
                    </td>
                  </tr>
                ) : filteredRows.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8" style={{ color: colors.muted }}>No users found.</td>
                  </tr>
                ) : (
                  filteredRows.map((row) => {
                    const createdAt = formatCreatedAt(row.created_at);
                    const pendingForUser = pendingGradingMap[row.id];
                    return (
                      <tr key={row.id} style={{ borderTop: `1px solid ${colors.primary}12` }} className="transition-colors hover:bg-white/5">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm border" style={{ borderColor: `${colors.primary}18`, color: colors.primary }}>
                              {getInitials(row)}
                            </div>
                            <div className="min-w-0">
                              <div className="font-semibold truncate" style={{ color: colors.text }}>{row.full_name || row.email || row.id}</div>
                              <div className="text-xs mt-0.5 truncate" style={{ color: colors.muted }}>{row.email || ""}</div>
                              {pendingForUser ? (
                                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                                  <PendingGradingBadge compact />
                                  <span className="text-[11px] font-semibold" style={{ color: "#F59E0B" }}>
                                    {pendingForUser.count} assignment{pendingForUser.count > 1 ? "s" : ""} awaiting grade
                                  </span>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 capitalize" style={{ color: colors.muted }}>{row.verification_status || "pending"}</td>
                        <td className="px-4 py-3 capitalize" style={{ color: colors.muted }}>{row.role || "trainee"}</td>
                        <td className="px-4 py-3" style={{ color: colors.muted }}>
                          {createdAt ? (
                            <div className="leading-tight">
                              <div className="font-semibold" style={{ color: colors.text }}>
                                {createdAt.date}
                              </div>
                              <div className="mt-1 text-xs">{createdAt.time}</div>
                            </div>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end">
                            <button
                              onClick={() => openDetails(row)}
                              disabled={assignedModules.length === 0}
                              className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all hover:scale-[1.01] disabled:opacity-50"
                              style={{ background: `${colors.primary}14`, color: colors.primary, border: `1px solid ${colors.primary}35` }}
                            >
                              <Eye className="w-4 h-4" />
                              Details
                            </button>
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
            <div className="fixed inset-0 z-[9998]" style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(12px)" }} onClick={closeDetails} />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-8 md:p-10 pointer-events-none">
              <div
                className="w-full max-w-6xl h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] rounded-[1.75rem] overflow-hidden shadow-2xl border pointer-events-auto"
                style={{ background: colors.card, borderColor: `${colors.primary}22` }}
                onClick={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
              >
                <div className="relative h-full overflow-auto">
                  <button
                    type="button"
                    className="absolute top-4 right-4 z-10 p-2.5 rounded-xl transition-all hover:scale-105"
                    style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)", color: colors.muted }}
                    onClick={closeDetails}
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="border-b lg:border-b-0 lg:border-r" style={{ borderColor: `${colors.primary}12` }}>
                      <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
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
                            <div className="relative rounded-[1.35rem] p-1" style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.gradientEnd})` }}>
                              <DetailAvatar key={selected.id} row={selected} colors={colors} theme={theme} getInitials={getInitials} />
                            </div>
                          </div>
                          <h2 className="mt-6 text-xl sm:text-2xl font-black tracking-tight px-2" style={{ color: colors.text }}>
                            {selected.full_name || selected.email || "User"}
                          </h2>
                        </div>

                        <div className="px-6 pb-6 -mt-6 relative">
                          <div className="rounded-2xl border p-1 overflow-hidden" style={{ background: theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)", borderColor: `${colors.primary}15` }}>
                            <InfoRow icon={<Mail className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />} label="Email" value={selected.email} colors={colors} />
                            <InfoRow icon={<User className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />} label="Username" value={selected.username ? `@${selected.username}` : "-"} colors={colors} />
                            <InfoRow icon={<ShieldCheck className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />} label="Role" value={selected.role || "trainee"} colors={colors} />
                            <InfoRow icon={<CalendarClock className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />} label="Joined" value={selected.created_at ? new Date(selected.created_at).toLocaleString() : "-"} colors={colors} />
                            <InfoRow icon={<User className="w-4 h-4 shrink-0" style={{ color: colors.primary }} />} label="User ID" value={selected.id} colors={colors} mono />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-6 pt-8 pb-8">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div>
                          <h3 className="text-lg font-black tracking-tight" style={{ color: colors.text }}>Module results</h3>
                          <p className="text-sm mt-1" style={{ color: colors.muted }}>Only assigned modules are available here.</p>
                        </div>
                        <div className="relative w-full">
                          <select
                            value={selectedModuleId}
                            onChange={(e) => setSelectedModuleId(e.target.value)}
                            className="w-full appearance-none rounded-2xl border px-4 py-3 pr-11 text-sm font-bold outline-none shadow-lg transition-all focus:ring-2"
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
                          >
                            {assignedModules.map((module) => (
                              <option key={module.id} value={module.moduleId} style={{ background: theme === "dark" ? "#111827" : "#fff", color: colors.text }}>
                                Module {module.id}: {module.name}
                              </option>
                            ))}
                          </select>
                          <span
                            className="pointer-events-none absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-xl"
                            style={{ background: `${colors.primary}16`, color: colors.primary }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </span>
                        </div>
                      </div>

                      {detailError ? (
                        <div className="mt-3 rounded-2xl p-4 border text-sm" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)", color: "#EF4444" }}>
                          {detailError}
                        </div>
                      ) : null}

                      {detailLoading ? (
                        <div className="mt-4 rounded-2xl border p-4 flex items-center gap-3" style={{ borderColor: `${colors.primary}15`, color: colors.muted }}>
                          <Loader2 className="w-5 h-5 animate-spin" style={{ color: colors.primary }} />
                          Loading module results...
                        </div>
                      ) : (
                        <div className="mt-4 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="rounded-2xl border p-3" style={{ borderColor: `${colors.primary}15`, color: colors.text }}>
                              <BookOpen className="w-4 h-4 mb-2" style={{ color: colors.primary }} />
                              <div className="text-[11px] font-bold uppercase" style={{ color: colors.muted }}>Module</div>
                              <div className="text-sm font-black">Module {selectedModule?.id || "-"}</div>
                            </div>
                            <div className="rounded-2xl border p-3" style={{ borderColor: `${colors.primary}15`, color: colors.text }}>
                              <Trophy className="w-4 h-4 mb-2" style={{ color: colors.primary }} />
                              <div className="text-[11px] font-bold uppercase" style={{ color: colors.muted }}>Progress</div>
                              <div className="text-sm font-black">{Math.round(detailData?.progress?.progress_percentage || 0)}%</div>
                            </div>
                            <div
                              className="rounded-2xl border p-3"
                              style={{
                                borderColor: currentAssignmentPending ? "rgba(245, 158, 11, 0.45)" : `${colors.primary}15`,
                                background: currentAssignmentPending
                                  ? theme === "dark"
                                    ? "rgba(245, 158, 11, 0.08)"
                                    : "rgba(245, 158, 11, 0.06)"
                                  : "transparent",
                                color: colors.text,
                              }}
                            >
                              <Award className="w-4 h-4 mb-2" style={{ color: currentAssignmentPending ? "#F59E0B" : colors.primary }} />
                              <div className="text-[11px] font-bold uppercase" style={{ color: colors.muted }}>Assignment</div>
                              <div className="text-sm font-black capitalize flex items-center gap-2 flex-wrap">
                                {detailData?.assignment?.status || "none"}
                                {currentAssignmentPending ? <PendingGradingBadge compact /> : null}
                              </div>
                            </div>
                          </div>

                          <div className="max-h-[calc(100vh-22rem)] overflow-y-auto pr-1 space-y-4">
                            <ResultCard
                              title="Multiple-choice quiz"
                              icon={<FileText className="w-4 h-4" style={{ color: colors.primary }} />}
                              colors={colors}
                              theme={theme}
                              expanded={expandedResultCards.quiz}
                              onToggle={() => toggleResultCard("quiz")}
                            >
                              {renderQuizAnswers()}
                            </ResultCard>
                            <ResultCard
                              title="Response quiz"
                              icon={<Brain className="w-4 h-4" style={{ color: colors.primary }} />}
                              colors={colors}
                              theme={theme}
                              expanded={expandedResultCards.ai}
                              onToggle={() => toggleResultCard("ai")}
                            >
                              {renderAiAnswers()}
                            </ResultCard>
                            <ResultCard
                              title="Assignment submission"
                              icon={<FileText className="w-4 h-4" style={{ color: colors.primary }} />}
                              colors={colors}
                              theme={theme}
                              expanded={expandedResultCards.assignment}
                              onToggle={() => toggleResultCard("assignment")}
                              badge={currentAssignmentPending ? <PendingGradingBadge /> : null}
                            >
                              {renderAssignment()}
                            </ResultCard>
                          </div>
                        </div>
                      )}
                    </div>
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
