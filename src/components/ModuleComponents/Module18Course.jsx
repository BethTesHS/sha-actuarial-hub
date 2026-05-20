import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Maximize,
  Minimize,
} from "lucide-react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const onChange = () => setReduced(Boolean(mq.matches));
    setReduced(Boolean(mq.matches));
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function slideAccentGradient(bg) {
  const map = {
    orange: "from-orange-500 via-amber-500 to-orange-400",
    indigo: "from-[#6B3FA0] via-[#5B2D86] to-[#4B226F]",
    slate: "from-slate-500 via-slate-400 to-slate-500",
    emerald: "from-emerald-500 via-teal-400 to-emerald-400",
    amber: "from-amber-500 via-orange-400 to-amber-400",
    blue: "from-blue-500 via-sky-400 to-blue-400",
  };
  return map[bg] || map.slate;
}

function getSlideBg(bg, theme) {
  const dark = {
    orange: "linear-gradient(135deg, rgba(255, 123, 42, 0.18), rgba(0, 0, 0, 0.72) 55%, rgba(255, 123, 42, 0.10))",
    indigo:
      "linear-gradient(135deg, rgba(107, 63, 160, 0.18), rgba(0, 0, 0, 0.72) 55%, rgba(107, 63, 160, 0.10))",
    slate: "linear-gradient(135deg, rgba(148, 163, 184, 0.14), rgba(0, 0, 0, 0.72) 55%, rgba(148, 163, 184, 0.08))",
    emerald: "linear-gradient(135deg, rgba(16, 185, 129, 0.16), rgba(0, 0, 0, 0.72) 55%, rgba(16, 185, 129, 0.10))",
    amber: "linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(0, 0, 0, 0.72) 55%, rgba(245, 158, 11, 0.10))",
    blue: "linear-gradient(135deg, rgba(59, 130, 246, 0.16), rgba(0, 0, 0, 0.72) 55%, rgba(59, 130, 246, 0.10))",
  };
  const light = {
    orange: "linear-gradient(135deg, rgba(255, 237, 213, 0.95), rgba(255, 255, 255, 0.92))",
    indigo: "linear-gradient(135deg, rgba(237, 233, 254, 0.95), rgba(255, 255, 255, 0.92))",
    slate: "linear-gradient(135deg, rgba(241, 245, 249, 0.98), rgba(255, 255, 255, 0.92))",
    emerald: "linear-gradient(135deg, rgba(209, 250, 229, 0.95), rgba(255, 255, 255, 0.92))",
    amber: "linear-gradient(135deg, rgba(254, 243, 199, 0.95), rgba(255, 255, 255, 0.92))",
    blue: "linear-gradient(135deg, rgba(219, 234, 254, 0.95), rgba(255, 255, 255, 0.92))",
  };
  const palette = theme === "light" ? light : dark;
  return palette[bg] || (theme === "light" ? light.slate : dark.slate);
}

function SlideShell({ children, theme, styles, bg, className = "", referenceDeck = false }) {
  if (referenceDeck) {
    return (
      <div
        className={`relative w-full max-w-4xl mx-auto rounded-2xl border border-slate-200/90 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.18)] overflow-hidden flex flex-col ${className}`}
      >
        <div className="relative flex flex-col flex-1 min-h-0">{children}</div>
      </div>
    );
  }
  return (
    <div
      className={`relative w-full rounded-[1.75rem] border overflow-hidden ring-1 ${
        theme === "light"
          ? "bg-white/95 ring-black/[0.04]"
          : "bg-black/70 ring-white/[0.08]"
      } ${styles.border} ${className}`}
      style={{
        backgroundImage: getSlideBg(bg, theme),
        boxShadow:
          theme === "light"
            ? "0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 24px 48px -12px rgba(15, 23, 42, 0.14), inset 0 1px 0 0 rgba(255,255,255,0.85)"
            : "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 28px 56px -16px rgba(0, 0, 0, 0.65), inset 0 1px 0 0 rgba(255,255,255,0.06)",
      }}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-[0.45] ${
          theme === "light"
            ? "bg-[radial-gradient(ellipse_85%_65%_at_50%_-15%,rgba(255,255,255,0.9),transparent)]"
            : "bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.07),transparent)]"
        }`}
      />
      <div className="relative z-[1] flex flex-col flex-1 min-h-0">{children}</div>
    </div>
  );
}

function SlideHeader({ slide, theme, styles, bg = "slate", referenceDeck = false }) {
  const accent = slideAccentGradient(bg);
  if (referenceDeck) {
    return (
      <div className="relative border-b border-slate-100 bg-white py-3 pl-4 pr-5 sm:py-3.5 sm:pl-5 sm:pr-6 md:py-4 md:pl-6 md:pr-7">
        <div
          className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#6B3FA0] to-[#5B2D86]"
          aria-hidden
        />
        <div className="relative pl-3 sm:pl-4">
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold leading-tight tracking-tight text-slate-900 [text-wrap:balance]">
            {slide.title}
          </h3>
          {slide.subtitle && (
            <p className="mt-1 text-sm leading-snug text-slate-600 whitespace-pre-line max-w-3xl">
              {slide.subtitle}
            </p>
          )}
        </div>
      </div>
    );
  }
  return (
    <div
      className={`relative border-b py-3 pl-4 pr-5 sm:py-3.5 sm:pl-5 sm:pr-6 md:py-4 md:pl-6 md:pr-7 overflow-hidden ${
        theme === "light" ? "bg-white/75 backdrop-blur-md" : "bg-black/35 backdrop-blur-md"
      } ${styles.border}`}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${accent} opacity-90`}
        aria-hidden
      />
      <div className="relative pl-3 sm:pl-4">
        <h3
          className={`text-lg sm:text-xl md:text-2xl font-extrabold leading-tight tracking-tight ${styles.text} [text-wrap:balance]`}
        >
          {slide.title}
        </h3>
        {slide.subtitle && (
          <p
            className={`mt-1 text-sm leading-snug ${styles.textSecondary} whitespace-pre-line max-w-3xl`}
          >
            {slide.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function Bullets({ bullets, styles, referenceDeck = false }) {
  if (!bullets?.length) return null;
  return (
    <ul className="space-y-4">
      {bullets.map((b, idx) => (
        <li key={idx} className="flex gap-3.5 items-start group">
          <span
            className={
              referenceDeck
                ? "mt-2 h-2 w-2 shrink-0 rounded-full bg-[#6B3FA0] opacity-90 shadow-[0_0_0_3px_rgba(107,63,160,0.22)] transition-all duration-300 motion-safe:group-hover:scale-110"
                : `mt-2 shrink-0 w-2 h-2 rounded-full bg-gradient-to-br ${styles.progressBg} ${styles.gradientTo} shadow-[0_0_0_3px_rgba(255,255,255,0.15)] opacity-90 group-hover:opacity-100 motion-safe:group-hover:scale-110 transition-all duration-300`
            }
            aria-hidden
          />
          <span
            className={`leading-relaxed text-[15px] sm:text-base ${referenceDeck ? "text-slate-600" : styles.textSecondary}`}
          >
            {b}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Hero({ slide, theme, styles, reducedMotion, referenceDeck = false }) {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => setPulse((p) => !p), 1400);
    return () => clearInterval(t);
  }, [reducedMotion]);

  if (referenceDeck) {
    return (
      <div className="relative flex min-h-[240px] flex-1 items-center p-8 md:p-12">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(107,63,160,0.14),transparent_55%)]"
          aria-hidden
        />
        <div className="relative max-w-4xl">
          <h3 className="text-3xl font-black leading-[1.1] tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            <span className="bg-gradient-to-r from-[#4B226F] via-[#5B2D86] to-[#6B3FA0] bg-clip-text text-transparent">
              {slide.title}
            </span>
          </h3>
        </div>
        {slide.subtitle && (
          <p className="absolute bottom-8 left-8 max-w-md whitespace-pre-line border-t border-[#6B3FA0]/20 pt-4 text-left text-base leading-relaxed text-slate-600 sm:bottom-10 sm:left-10 sm:text-lg md:bottom-12 md:left-12">
            {slide.subtitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex min-h-[200px] flex-1 items-center p-8 md:p-12">
      <div
        className={`absolute inset-0 opacity-[0.35] ${
          theme === "light"
            ? "bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.25),transparent_50%)]"
            : "bg-[radial-gradient(circle_at_25%_30%,rgba(249,115,22,0.2),transparent_55%)]"
        }`}
        aria-hidden
      />
      <div
        className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl ${
          theme === "light" ? "bg-orange-200/40" : "bg-orange-500/20"
        }`}
        style={{
          transform: pulse ? "scale(1.06)" : "scale(1)",
          transition: reducedMotion ? "none" : "transform 900ms ease",
        }}
      />
      <div
        className={`absolute -bottom-28 -left-28 w-80 h-80 rounded-full blur-3xl ${
          theme === "light" ? "bg-[#6B3FA0]/18" : "bg-[#6B3FA0]/12"
        }`}
        style={{
          transform: pulse ? "scale(1)" : "scale(1.06)",
          transition: reducedMotion ? "none" : "transform 900ms ease",
        }}
      />
      <div className="relative max-w-4xl">
        <h3 className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.1] ${styles.text}`}>
          <span className={`bg-gradient-to-r ${styles.textGradient} ${styles.gradientTo} bg-clip-text text-transparent drop-shadow-sm`}>
            {slide.title}
          </span>
        </h3>
      </div>
      {slide.subtitle && (
        <p
          className={`absolute bottom-8 left-8 max-w-md whitespace-pre-line border-t pt-4 text-left text-base leading-relaxed sm:bottom-10 sm:left-10 sm:text-lg md:bottom-12 md:left-12 ${styles.textSecondary} ${theme === "light" ? "border-orange-200/60" : "border-white/10"}`}
        >
          {slide.subtitle}
        </p>
      )}
    </div>
  );
}

function Sections({ sections, theme, styles, referenceDeck = false, glowBullets = false }) {
  const glowDot =
    "mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#6B3FA0] opacity-95 shadow-[0_0_0_3px_rgba(107,63,160,0.22),0_0_14px_2px_rgba(107,63,160,0.32)] ring-1 ring-[#6B3FA0]/35 transition-all duration-300 motion-safe:group-hover:scale-110";

  const bodyText = referenceDeck ? "text-slate-600" : styles.textSecondary;
  const discLi = referenceDeck
    ? "text-[15px] leading-relaxed text-slate-600 sm:text-base"
    : `text-sm sm:text-base leading-relaxed ${styles.textSecondary}`;

  return (
    <div className="space-y-4">
      {(sections ?? []).map((s, idx) => {
        const hasDiscList = (s.bulletLines?.length ?? 0) > 0;
        const hasGlowSubItems = (s.glowLineItems?.length ?? 0) > 0;
        const isClosing = s.variant === "closing";
        const useGlow =
          referenceDeck &&
          !isClosing &&
          !hasDiscList &&
          !hasGlowSubItems &&
          s.glowLines !== false &&
          (s.glowLines === true || glowBullets);

        return (
          <div
            key={idx}
            className={
              referenceDeck
                ? "rounded-xl border border-slate-200/90 bg-slate-50/50 p-5 shadow-sm transition-shadow hover:shadow"
                : `rounded-2xl border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md ${
                    theme === "light"
                      ? "bg-white/85 border-slate-200/90 backdrop-blur-sm"
                      : "bg-black/25 border-white/10 backdrop-blur-sm hover:border-white/15"
                  }`
            }
          >
            {s.heading ? (
              <div
                className={`text-base font-extrabold ${referenceDeck ? "text-slate-900" : styles.text}`}
              >
                {/* {s.heading} */}
              </div>
            ) : null}
            {referenceDeck && isClosing ? (
              <div className="text-center">
                {/* {s.heading ? (
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#5B2D86]">
                    {s.heading}
                  </div>
                ) : null} */}
                <div className={`${s.heading ? "mt-3" : ""} space-y-2`}>
                  {(s.lines ?? []).map((line, lineIdx) => {
                    if (!line) return <div key={lineIdx} className="h-3" />;
                    const isWebsite = typeof line === "string" && line.trim().includes("www.kenbright.co.ke");
                    const cls =
                      lineIdx === 0
                        ? "text-lg sm:text-xl font-black text-slate-900"
                        : lineIdx === 1
                          ? "text-sm sm:text-base font-bold text-slate-700"
                          : line.includes("Kenbright Actuarial")
                            ? "pt-2 text-sm sm:text-base font-extrabold text-slate-900"
                            : line.includes("www.")
                              ? "pt-2 text-sm sm:text-base font-semibold text-[#5B2D86]"
                              : "text-[15px] sm:text-base text-slate-600";
                    return (
                      <div key={lineIdx} className={cls}>
                        {isWebsite ? (
                          <a
                            href="https://www.kenbright.co.ke"
                            target="_blank"
                            rel="noreferrer"
                            className="pointer-events-auto underline decoration-[#6B3FA0]/40 underline-offset-4 transition-colors hover:text-[#4B226F]"
                          >
                            {line}
                          </a>
                        ) : (
                          line
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : useGlow ? (
              <ul className={`${s.heading ? "mt-3" : ""} space-y-2`}>
                {(s.lines ?? []).map((line, lineIdx) => (
                  <li key={lineIdx} className="group flex items-start gap-3">
                    <span className={glowDot} aria-hidden />
                    <span className="text-[15px] leading-snug text-slate-600 sm:text-base">{line}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className={`${s.heading ? "mt-3" : ""} space-y-1.5`}>
                {(s.lines ?? []).map((line, lineIdx) => (
                  <div key={lineIdx} className={`leading-relaxed ${bodyText} ${referenceDeck ? "text-[15px] sm:text-base" : "text-sm sm:text-base"}`}>
                    {line}
                  </div>
                ))}
                {hasDiscList ? (
                  <ul className={`mt-3 list-disc space-y-2 pl-5 ${referenceDeck ? "marker:text-slate-500" : "marker:text-slate-400"}`}>
                    {(s.bulletLines ?? []).map((line, lineIdx) => (
                      <li key={lineIdx} className={discLi}>
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {hasGlowSubItems && referenceDeck && s.glowLines !== false ? (
                  <ul
                    className={`${(s.lines?.length ?? 0) > 0 || s.heading || hasDiscList ? "mt-3" : ""} space-y-2`}
                  >
                    {(s.glowLineItems ?? []).map((line, lineIdx) => (
                      <li key={`glow-${lineIdx}`} className="group flex items-start gap-3">
                        <span className={glowDot} aria-hidden />
                        <span className="text-[15px] leading-snug text-slate-600 sm:text-base">{line}</span>
                      </li>
                    ))}
                  </ul>
                ) : hasGlowSubItems ? (
                  <div
                    className={`${(s.lines?.length ?? 0) > 0 || s.heading || hasDiscList ? "mt-3" : ""} space-y-1.5`}
                  >
                    {(s.glowLineItems ?? []).map((line, lineIdx) => (
                      <div
                        key={`glow-${lineIdx}`}
                        className={`leading-relaxed ${bodyText} ${referenceDeck ? "text-[15px] sm:text-base" : "text-sm sm:text-base"}`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                ) : null}
                {(s.linesAfter ?? []).map((line, lineIdx) => (
                  <div
                    key={`after-${lineIdx}`}
                    className={`leading-relaxed ${bodyText} ${referenceDeck ? "text-[15px] sm:text-base" : "text-sm sm:text-base"} ${hasDiscList ? "mt-3" : ""}`}
                  >
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Boxes({ boxes, theme, styles, referenceDeck = false, stacked = false, cols, equal = false, bigText = false }) {
  const gridClass = stacked
    ? "grid grid-cols-1 gap-4"
    : cols === 3
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
      : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4";

  const titleClass = bigText ? "text-base sm:text-lg" : "text-sm";
  const lineClass = bigText ? "text-[15px] sm:text-base" : "text-sm";
  return (
    <div className={`${gridClass} ${equal ? "items-stretch auto-rows-fr" : ""}`}>
      {(boxes ?? []).map((b, idx) => (
        <div
          key={idx}
          className={
            referenceDeck
              ? `flex min-h-0 flex-col rounded-xl border border-slate-200/90 bg-slate-50/40 p-4 shadow-sm transition-all duration-300 motion-safe:hover:-translate-y-0.5 hover:shadow-md sm:p-5 ${
                  equal ? "h-full self-stretch" : "h-auto self-start"
                }`
              : `flex min-h-0 flex-col rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md motion-safe:hover:-translate-y-0.5 ${
                  theme === "light"
                    ? "bg-white/85 border-slate-200/90 backdrop-blur-sm"
                    : "bg-black/25 border-white/10 backdrop-blur-sm hover:border-white/15"
                } ${equal ? "h-full self-stretch" : "h-auto self-start"}`
          }
        >
          <div className={`${titleClass} font-extrabold ${referenceDeck ? "text-slate-900" : styles.text}`}>
            {b.title}
          </div>
          {(b.lines?.length ?? 0) > 0 && (
            <div className="mt-3 space-y-1.5">
              {b.lines.map((line, lineIdx) => (
                <div
                  key={lineIdx}
                  className={`${lineClass} leading-relaxed ${referenceDeck ? "text-slate-600" : styles.textSecondary}`}
                >
                  {line}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function OrderedLines({ ordered, theme, styles, referenceDeck = false, startAt = 1 }) {
  return (
    <div className="space-y-2">
      {(ordered ?? []).map((line, idx) => (
        <div
          key={idx}
          className={`flex gap-3 ${referenceDeck ? "items-center" : ""}`}
        >
          {referenceDeck ? (
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#6B3FA0] text-xs font-bold text-white shadow-sm"
              aria-hidden
            >
              {startAt + idx}
            </span>
          ) : null}
          <div
            className={`min-w-0 flex-1 rounded-xl border p-4 shadow-sm ${
              referenceDeck
                ? "border-slate-200/90 bg-slate-50/40"
                : theme === "light"
                  ? "bg-white/85 border-slate-200/90 backdrop-blur-sm"
                  : "bg-black/25 border-white/10 backdrop-blur-sm"
            }`}
          >
            <div
              className={`text-sm sm:text-base leading-relaxed whitespace-pre-wrap ${referenceDeck ? "text-slate-600" : styles.textSecondary}`}
            >
              {line}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TableSlide({ table, theme, styles, referenceDeck = false }) {
  const columns = table?.columns ?? [];
  const rows = table?.rows ?? [];
  const gridCols = { gridTemplateColumns: "72px 1fr 1fr 1fr" };

  // Merge "Stage" cells when subsequent rows have an empty stage value.
  const stageSpanByRow = useMemo(() => {
    const spans = new Array(rows.length).fill(1);
    for (let i = 0; i < rows.length; i++) {
      const stage = rows[i]?.[0];
      if (!stage) {
        spans[i] = 0; // row doesn't render a stage cell
        continue;
      }
      let span = 1;
      for (let j = i + 1; j < rows.length; j++) {
        const nextStage = rows[j]?.[0];
        if (nextStage) break;
        span += 1;
      }
      spans[i] = span;
    }
    return spans;
  }, [rows]);
  if (referenceDeck) {
    return (
      <div className="overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-md">
        <div
          className="grid gap-0 bg-gradient-to-b from-[#6B3FA0] to-[#4B226F] text-xs font-bold uppercase tracking-wide text-white"
          style={gridCols}
        >
          {columns.map((c, idx) => (
            <div key={idx} className="p-3">
              {c}
            </div>
          ))}
        </div>
        <div className="max-h-[52vh] overflow-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/80">
          <div className="grid" style={gridCols}>
            {rows.map((r, rowIdx) => {
              const stage = r?.[0];
              const stageSpan = stageSpanByRow[rowIdx] ?? 1;
              const isFirstRow = rowIdx === 0;
              const cellBorder = isFirstRow ? "" : "border-t border-[#6B3FA0]/20";
              const vBorder = "border-l border-[#6B3FA0]/20";

              return (
                <React.Fragment key={rowIdx}>
                  {stage && stageSpan > 0 ? (
                    <div
                      className={`p-3 text-xs font-extrabold text-slate-900 ${cellBorder}`}
                      style={{ gridRow: `span ${stageSpan}` }}
                    >
                      {stage}
                    </div>
                  ) : null}
                  <div className={`p-3 text-xs leading-relaxed text-slate-600 ${cellBorder} ${vBorder}`}>{r?.[1]}</div>
                  <div className={`p-3 text-xs leading-relaxed text-slate-600 ${cellBorder} ${vBorder}`}>{r?.[2]}</div>
                  <div className={`p-3 text-xs leading-relaxed text-slate-600 ${cellBorder} ${vBorder}`}>{r?.[3]}</div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`rounded-2xl border overflow-hidden shadow-md ${theme === "light" ? "bg-white/90 border-slate-200/90" : "bg-black/30 border-white/10"}`}>
      <div
        className={`grid gap-0 text-xs font-bold tracking-wide uppercase ${theme === "light" ? "bg-gradient-to-b from-slate-100 to-slate-50 text-slate-700" : "bg-gradient-to-b from-white/12 to-black/20 text-white/85"}`}
        style={gridCols}
      >
        {columns.map((c, idx) => (
          <div key={idx} className="p-3">
            {c}
          </div>
        ))}
      </div>
      <div className="max-h-[52vh] overflow-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/80 dark:[&::-webkit-scrollbar-thumb]:bg-white/20">
        <div className="grid" style={gridCols}>
          {rows.map((r, rowIdx) => {
            const stage = r?.[0];
            const stageSpan = stageSpanByRow[rowIdx] ?? 1;
            const isFirstRow = rowIdx === 0;
            const cellBorder = isFirstRow
              ? ""
              : theme === "light"
                ? "border-t border-orange-200/70"
                : "border-t border-white/10";
            const vBorder = theme === "light" ? "border-l border-orange-200/70" : "border-l border-white/10";

            return (
              <React.Fragment key={rowIdx}>
                {stage && stageSpan > 0 ? (
                  <div className={`p-3 text-xs font-extrabold ${styles.text} ${cellBorder}`} style={{ gridRow: `span ${stageSpan}` }}>
                    {stage}
                  </div>
                ) : null}
                  <div className={`p-3 text-xs leading-relaxed ${styles.textSecondary} ${cellBorder} ${vBorder}`}>{r?.[1]}</div>
                  <div className={`p-3 text-xs leading-relaxed ${styles.textSecondary} ${cellBorder} ${vBorder}`}>{r?.[2]}</div>
                  <div className={`p-3 text-xs leading-relaxed ${styles.textSecondary} ${cellBorder} ${vBorder}`}>{r?.[3]}</div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Checklist({ items, theme, styles, referenceDeck = false }) {
  const [checked, setChecked] = useState(() => items?.map(() => false) ?? []);
  useEffect(() => setChecked(items?.map(() => false) ?? []), [items]);

  const list = items ?? [];
  const splitAt = Math.ceil(list.length / 2);
  const left = list.slice(0, splitAt);
  const right = list.slice(splitAt);

  const renderItem = (it, idx) => (
    <button
      key={idx}
      onClick={() =>
        setChecked((prev) => {
          const next = [...prev];
          next[idx] = !next[idx];
          return next;
        })
      }
      className={
        referenceDeck
          ? `flex h-full min-h-[72px] items-start gap-3 rounded-xl border p-4 text-left shadow-sm transition-all duration-200 ${
              checked[idx]
                ? "border-[#6B3FA0]/35 bg-[#6B3FA0]/10"
                : "border-slate-200/90 bg-slate-50/30 hover:border-[#6B3FA0]/25 hover:bg-white"
            }`
          : `rounded-2xl border p-4 text-left transition-all duration-200 flex items-start gap-3 h-full min-h-[72px] shadow-sm ${
              theme === "light"
                ? checked[idx]
                  ? "bg-emerald-50/90 border-emerald-300/80 shadow-emerald-100/50"
                  : "bg-white/85 border-slate-200/90 hover:bg-slate-50/90 hover:border-slate-300 hover:shadow"
                : checked[idx]
                  ? "bg-emerald-500/15 border-emerald-400/35 shadow-emerald-900/20"
                  : "bg-black/25 border-white/10 hover:bg-white/[0.06] hover:border-white/15"
            }`
      }
    >
      <div
        className={`mt-0.5 flex h-5 w-5 shrink-0 aspect-square items-center justify-center rounded-full border ${
          referenceDeck
            ? checked[idx]
              ? "border-[#5B2D86] bg-[#6B3FA0]"
              : "border-slate-300 bg-white"
            : checked[idx]
              ? theme === "light"
                ? "border-emerald-300"
                : "border-emerald-400/40"
              : theme === "light"
                ? "border-slate-200"
                : "border-white/15"
        }`}
      >
        {referenceDeck && checked[idx] ? (
          <Check className="h-3 w-3 text-white" strokeWidth={3} />
        ) : (
          <div
            className={`h-2.5 w-2.5 rounded-full ${checked[idx] ? (theme === "light" || referenceDeck ? "bg-emerald-600" : "bg-emerald-300") : "bg-transparent"}`}
          />
        )}
      </div>
      <div className={`text-sm font-bold ${referenceDeck ? "text-slate-900" : styles.text}`}>{it}</div>
    </button>
  );

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4" style={{ gridAutoRows: "1fr" }}>
      <div className="grid grid-cols-1 gap-3">
        {left.map((it, i) => renderItem(it, i))}
      </div>
      <div className="grid grid-cols-1 gap-3">
        {right.map((it, i) => renderItem(it, splitAt + i))}
      </div>
    </div>
  );
}

function renderSlideLayout(slide, theme, styles, reducedMotion, referenceDeck = false) {
  const layout = slide.layout;

  if (layout === "hero") {
    return (
      <Hero
        slide={slide}
        theme={theme}
        styles={styles}
        reducedMotion={reducedMotion}
        referenceDeck={referenceDeck}
      />
    );
  }

  return (
    <>
      {layout === "bullets" && (
        <div
          className={
            referenceDeck
              ? "rounded-xl border border-slate-200/90 bg-slate-50/50 p-5 shadow-sm transition-shadow hover:shadow"
              : `rounded-2xl border p-5 shadow-sm transition-shadow duration-300 hover:shadow-md ${
                  theme === "light"
                    ? "bg-white/85 border-slate-200/90 backdrop-blur-sm"
                    : "bg-black/25 border-white/10 backdrop-blur-sm hover:border-white/15"
                }`
          }
        >
          {slide.bulletsHeading ? (
            <div
              className={`mb-4 text-base font-extrabold leading-tight ${
                referenceDeck ? "text-slate-900" : styles.text
              }`}
            >
              {slide.bulletsHeading}
            </div>
          ) : null}
          <Bullets bullets={slide.bullets ?? []} styles={styles} referenceDeck={referenceDeck} />
        </div>
      )}

      {layout === "sections" && (
        <Sections
          sections={slide.sections ?? []}
          theme={theme}
          styles={styles}
          referenceDeck={referenceDeck}
          glowBullets={Boolean(slide.sectionGlowBullets)}
        />
      )}

      {layout === "boxes" && (
        <Boxes
          boxes={slide.boxes ?? []}
          theme={theme}
          styles={styles}
          referenceDeck={referenceDeck}
          stacked={Boolean(slide.boxesStacked)}
          cols={slide.boxesCols}
          equal={Boolean(slide.boxesEqual)}
          bigText={Boolean(slide.boxesBigText)}
        />
      )}

      {layout === "ordered" && (
        <div className="space-y-3">
          {slide.orderedIntro ? (
            <div
              className={`text-sm sm:text-base leading-relaxed ${
                referenceDeck ? "text-slate-600" : styles.textSecondary
              } py-2`}
            >
              {slide.orderedIntro}
            </div>
          ) : null}
          <OrderedLines
            ordered={slide.ordered ?? []}
            theme={theme}
            styles={styles}
            referenceDeck={referenceDeck}
            startAt={slide.orderedStartAt ?? 1}
          />
        </div>
      )}

      {layout === "table" && (
        <TableSlide table={slide.table} theme={theme} styles={styles} referenceDeck={referenceDeck} />
      )}

      {layout === "checklist" && (
        <Checklist items={slide.checklist ?? []} theme={theme} styles={styles} referenceDeck={referenceDeck} />
      )}
    </>
  );
}

function InnerCarousel({ children, panelCount, labels, reducedMotion }) {
  const scrollerRef = useRef(null);
  const [active, setActive] = useState(0);

  const syncIndexFromScroll = () => {
    const el = scrollerRef.current;
    if (!el || panelCount <= 0) return;
    const first = el.firstElementChild;
    if (!first) return;
    const step = first.offsetWidth || 1;
    const idx = clamp(Math.round(el.scrollLeft / step), 0, panelCount - 1);
    setActive(idx);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => syncIndexFromScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    syncIndexFromScroll();
    return () => el.removeEventListener("scroll", onScroll);
  }, [panelCount]);

  const go = (idx) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.children[idx];
    if (!target || !(target instanceof HTMLElement)) return;
    el.scrollTo({
      left: target.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
    setActive(idx);
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(clamp(active - 1, 0, panelCount - 1));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(clamp(active + 1, 0, panelCount - 1));
    }
  };

  if (panelCount <= 1) return children;

  const arrowBtn =
    "pointer-events-auto z-20 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all motion-safe:hover:scale-105 motion-safe:active:scale-95 disabled:pointer-events-none disabled:opacity-25";

  return (
    <div
      className="relative flex h-full min-h-0 flex-col"
      role="region"
      aria-roledescription="carousel"
      aria-label="Slide sections"
    >
      <div
        ref={scrollerRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="flex min-h-0 min-w-0 w-full flex-1 flex-row flex-nowrap overflow-x-auto overflow-y-hidden overscroll-x-contain py-1 [scrollbar-width:none] snap-x snap-mandatory scroll-smooth outline-none focus-visible:ring-2 focus-visible:ring-[#6B3FA0] focus-visible:ring-offset-2 [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>

      <div className="flex shrink-0 flex-row items-center gap-2 border-t border-slate-100 bg-white px-2 py-3 sm:gap-3 sm:px-4 sm:py-4">
        <button
          type="button"
          aria-label="Previous section"
          disabled={active <= 0}
          onClick={() => go(active - 1)}
          className={arrowBtn}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.5} aria-hidden />
        </button>
        <div className="flex min-w-0 flex-1 flex-col items-center gap-2">
          <p className="max-w-md truncate text-center text-xs font-medium text-slate-500" title={labels?.[active]}>
            {labels?.[active] ?? `Section ${active + 1}`}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {Array.from({ length: panelCount }).map((_, i) => {
              const label = labels?.[i] ?? `${i + 1}`;
              const isOn = i === active;
              const isLast = i === panelCount - 1;
              return (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to section ${i + 1}: ${label}`}
                  aria-current={isOn ? "true" : undefined}
                  onClick={() => go(i)}
                  className={`flex items-center justify-center rounded-full font-semibold transition-all duration-300 motion-safe:hover:scale-105 ${
                    isOn
                      ? isLast
                      ? "h-10 w-10 bg-[#6B3FA0] text-white shadow-md shadow-[#6B3FA0]/30"
                      : "h-10 w-10 bg-[#6B3FA0] text-sm text-white shadow-md shadow-[#6B3FA0]/30"
                      : "h-2.5 w-2.5 bg-slate-300 hover:bg-slate-400"
                  }`}
                >
                  {isOn ? (
                    isLast ? (
                      <Check className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                    ) : (
                      <span>{i + 1}</span>
                    )
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          aria-label="Next section"
          disabled={active >= panelCount - 1}
          onClick={() => go(active + 1)}
          className={arrowBtn}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}

function SlideBody({ slide, theme, styles, reducedMotion }) {
  const layout = slide.layout;

  if (layout === "hero") {
    return renderSlideLayout(slide, theme, styles, reducedMotion, true);
  }

  const panels = Array.isArray(slide.panels) ? slide.panels : [];
  const useCarousel = panels.length > 1;
  const panelLabels = panels.map((p, i) => p.panelLabel ?? `Part ${i + 1}`);
  const referenceDeck = true;

  if (useCarousel) {
    return (
      <InnerCarousel panelCount={panels.length} labels={panelLabels} reducedMotion={reducedMotion}>
        {panels.map((panel, idx) => {
          const merged = { ...slide, ...panel };
          merged.bulletsHeading =
            panel.bulletsHeading ?? panel.panelLabel ?? slide.bulletsHeading;
          merged.orderedStartAt =
            panel.orderedStartAt ?? slide.orderedStartAt;
          delete merged.panels;
          delete merged.panelLabel;
          return (
            <div
              key={idx}
              className="box-border h-full min-h-0 w-full flex-[0_0_100%] snap-start snap-always overflow-x-hidden overflow-y-auto px-4 py-2 sm:px-10 sm:py-3 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300/70"
            >
              {renderSlideLayout(merged, theme, styles, reducedMotion, referenceDeck)}
            </div>
          );
        })}
      </InnerCarousel>
    );
  }

  return (
    <div className="p-5 sm:p-6 md:p-8">
      {renderSlideLayout(slide, theme, styles, reducedMotion, referenceDeck)}
    </div>
  );
}

export default function Module18Course({ courseContent, theme, styles }) {
  const reducedMotion = usePrefersReducedMotion();
  const slides = courseContent?.slides ?? [];
  const deckRef = useRef(null);
  const scrollRef = useRef(null);
  const slideRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  slideRefs.current = useMemo(
    () => slides.map((_, i) => slideRefs.current[i] || React.createRef()),
    [slides]
  );

  useEffect(() => {
    const root = scrollRef.current;
    if (!root || slides.length === 0) return;

    const els = slideRefs.current.map((r) => r.current).filter(Boolean);
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const idx = els.indexOf(visible.target);
        if (idx >= 0) setActive(idx);
      },
      { root, threshold: [0.45, 0.6, 0.75] }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [slides.length]);

  useEffect(() => {
    const onFs = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const scrollTo = (idx, block) => {
    const el = slideRefs.current?.[idx]?.current;
    if (!el) return;
    el.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: block ?? (isFullscreen ? "center" : "start"),
    });
  };

  // When toggling fullscreen, scroll snap alignment changes (start vs center).
  // Re-align to the active slide after layout settles to avoid landing between slides.
  useEffect(() => {
    if (slides.length === 0) return;
    const idx = clamp(active, 0, slides.length - 1);
    const raf1 = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollTo(idx, isFullscreen ? "center" : "start");
      });
    });
    return () => cancelAnimationFrame(raf1);
    // Intentionally only run on fullscreen toggles.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullscreen]);

  const toggleFullscreen = async () => {
    try {
      const host = deckRef.current;
      if (!host) return;
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await host.requestFullscreen();
      }
    } catch {
      // ignore
    }
  };

  const deckGray = active % 2 === 0;
  const mainNavBtnY =
    "flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-white/90 text-[#4B226F] shadow-xl backdrop-blur-md transition-all motion-safe:hover:scale-105 motion-safe:active:scale-95 disabled:pointer-events-none disabled:opacity-30 md:h-14 md:w-14";

  return (
    <div
      className={`${styles.cardBg} rounded-[1.75rem] border p-5 shadow-lg sm:p-6 md:p-8 ${styles.border}`}
    >
      <div className="mb-5 flex flex-col gap-1 sm:mb-6">
        <h3 className={`text-lg font-bold tracking-tight sm:text-xl ${styles.text}`}>Course</h3>
        <p className={`${styles.textTertiary} max-w-2xl text-sm leading-relaxed`}>
          {courseContent?.description || "Business development & tendering — slide deck"}
        </p>
      </div>

      <div
        ref={deckRef}
        className={`relative min-h-[72vh] overflow-hidden rounded-3xl transition-colors duration-500 ${
          deckGray ? "bg-slate-100" : "bg-[#2B0F3B]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,255,0.12),transparent_55%)]" />

        <button
          type="button"
          onClick={toggleFullscreen}
          className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/90 text-[#4B226F] shadow-md backdrop-blur-sm transition-all hover:bg-white sm:left-6 sm:top-5"
          aria-label={isFullscreen ? "Exit fullscreen" : "Present fullscreen"}
        >
          {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </button>

        <div
          className="absolute right-[4.25rem] top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 md:right-[5rem]"
          role="group"
          aria-label="Previous and next slide"
        >
          <button
            type="button"
            aria-label="Previous slide"
            disabled={active <= 0}
            onClick={() => scrollTo(clamp(active - 1, 0, slides.length - 1))}
            className={mainNavBtnY}
          >
            <ChevronUp className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            disabled={active >= slides.length - 1}
            onClick={() => scrollTo(clamp(active + 1, 0, slides.length - 1))}
            className={mainNavBtnY}
          >
            <ChevronDown className="h-6 w-6" strokeWidth={2.25} aria-hidden />
          </button>
        </div>

        <nav
          className="absolute right-3 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-2.5 rounded-full border border-white/15 bg-slate-700/95 px-2.5 py-5 shadow-2xl backdrop-blur-sm md:right-5"
          aria-label="Slide progress"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => scrollTo(i)}
              className={`rounded-full transition-all ${
                i === active
                  ? "h-3 w-3 bg-white shadow ring-2 ring-[#6B3FA0]/60"
                  : "h-2 w-2 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </nav>

        <div
          ref={scrollRef}
          className={`${isFullscreen ? "max-h-[100vh]" : "max-h-[80vh]"} overflow-y-auto scroll-smooth pb-10 pt-16 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400/50 ${
            isFullscreen
              ? "px-6 sm:px-10 md:px-16 pt-6 pb-6"
              : "px-4 pr-5 sm:px-10 sm:pr-12 md:px-16 md:pr-20"
          } sm:pb-12 md:pb-14`}
          style={{
            scrollSnapType: "y mandatory",
            overscrollBehavior: "contain",
          }}
        >
          {slides.map((slide, idx) => {
            return (
              <div
                key={slide.id}
                ref={slideRefs.current[idx]}
                className={`flex items-center justify-center ${
                  isFullscreen ? "min-h-[100vh] py-0" : "min-h-[72vh] py-6 sm:min-h-[76vh] sm:py-8"
                }`}
                style={{ scrollSnapAlign: isFullscreen ? "center" : "start" }}
              >
                <SlideShell
                  theme={theme}
                  styles={styles}
                  bg={slide.bg}
                  referenceDeck
                  className="h-[min(80vh,860px)] min-h-[320px] w-full flex-col sm:h-[74vh]"
                >
                  {slide.layout !== "hero" && (
                    <SlideHeader
                      slide={slide}
                      theme={theme}
                      styles={styles}
                      bg={slide.bg}
                      referenceDeck
                    />
                  )}
                  <div
                    className={`flex min-h-0 flex-1 flex-col ${
                      slide.panels?.length > 1 ? "overflow-hidden" : "overflow-y-auto"
                    }`}
                  >
                    <SlideBody slide={slide} theme={theme} styles={styles} reducedMotion={reducedMotion} />
                  </div>
                </SlideShell>
              </div>
            );
          })}
        </div>

        {slides.length > 0 ? (
          <div
            className="pointer-events-none absolute right-4 top-4 z-[35] sm:right-5 sm:top-5"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="inline-flex items-center rounded-full border border-white/25 bg-slate-900/80 px-3.5 py-1.5 text-xs font-semibold tabular-nums text-white shadow-lg backdrop-blur-sm sm:text-sm">
              <span className="text-white/90">{clamp(active + 1, 1, slides.length)}</span>
              <span className="mx-1.5 text-white/45" aria-hidden>
                /
              </span>
              <span className="text-white/75">{slides.length}</span>
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

