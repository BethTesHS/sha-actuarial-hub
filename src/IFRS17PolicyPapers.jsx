import React from "react";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight, BookOpen } from "lucide-react";
import { getShaThemeColors } from "./theme/sha";

export default function IFRS17PolicyPapers({ theme = "dark" }) {
  const colors = getShaThemeColors(theme);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-24 px-4 lg:px-8" style={{ background: theme === "dark" ? "#000a15" : "#f8fafc" }}>
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-3xl p-8 md:p-10 border"
          style={{
            background: theme === "dark" ? `linear-gradient(135deg, ${colors.primary}12, rgba(255,255,255,0.03))` : "white",
            borderColor: `${colors.primary}30`,
          }}
        >
          <div className="flex items-start justify-between gap-6 flex-col md:flex-row">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5" style={{ background: `${colors.primary}18`, color: colors.primary }}>
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-semibold">IFRS 17</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ color: colors.text }}>
                SHA IFRS 17 Policy Papers
              </h1>
              <p className="text-base md:text-lg leading-relaxed max-w-2xl" style={{ color: colors.textSecondary }}>
                A curated landing area for SHA IFRS 17 policy papers and related reading.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/modules/IFRS 17")}
              className="px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`, color: "white" }}
            >
              Go to IFRS 17 Module 0 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Coming soon",
              description: "Add policy paper links/documents here when ready.",
            },
            {
              title: "Reference documents",
              description: "You can also link out to IFRS 17 documents or internal PDFs.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-6 border"
              style={{
                background: theme === "dark" ? "rgba(255,255,255,0.03)" : "white",
                borderColor: theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl" style={{ background: `${colors.primary}18`, color: colors.primary }}>
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-lg mb-1" style={{ color: colors.text }}>
                    {card.title}
                  </div>
                  <div className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                    {card.description}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

