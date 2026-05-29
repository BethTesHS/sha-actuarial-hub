import React, { useState, useMemo, useCallback } from "react";
import { FaFilePdf, FaSearch, FaRegFileAlt } from "react-icons/fa";
import PdfViewerModal from "./components/ModuleComponents/PdfViewerModal";
import { shaPolicyPapers } from "./constants/shaPolicyPapers";
import { getShaThemeColors } from "./theme/sha";

async function downloadFile(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename || "download.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
    window.open(url, "_blank");
  }
}

export default function IFRS17PolicyPapers({ theme = "dark" }) {
  const colors = getShaThemeColors(theme);
  const isDark = theme === "dark";

  const cardContentBg = isDark
    ? "linear-gradient(to bottom, rgba(0, 61, 107, 0.95), rgba(0, 51, 89, 0.9))"
    : "linear-gradient(to bottom, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.94))";

  const [searchTerm, setSearchTerm] = useState("");
  const [viewingPdf, setViewingPdf] = useState(null);
  const [focusedSearch, setFocusedSearch] = useState(false);

  const filteredPapers = useMemo(
    () =>
      shaPolicyPapers.filter((paper) =>
        paper.title.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  const openPdf = useCallback((paper) => {
    setViewingPdf({
      url: paper.url,
      title: paper.title,
      filename: paper.filename,
    });
  }, []);

  const cardHoverBorder = isDark ? `${colors.cyan}99` : `${colors.blue}66`;
  const cardHoverShadow = isDark
    ? `0 8px 30px ${colors.cyan}26`
    : `0 8px 30px ${colors.blue}1a`;

  return (
    <>
      <div
        className="min-h-screen font-sans px-6 pt-24 pb-16 transition-colors duration-300"
        style={{ background: colors.pageGradient, color: colors.text }}
      >
        <div className="max-w-[1400px] mx-auto mb-16 pt-4 px-2 md:px-0">
          <div className="inline-block mb-6">
            <h1
              className="text-3xl md:text-4xl font-bold text-left mb-3"
              style={{ color: colors.primary }}
            >
              SHA IFRS 17 Policy Papers
            </h1>
            <div
              className="w-full h-[2px] rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors.blue}, ${colors.green})`,
              }}
            />
          </div>

          <div className="flex flex-col gap-8">
            <p
              className="text-lg md:text-md leading-relaxed text-left"
              style={{ color: colors.textSecondary }}
            >
              Browse Social Health Authority policy papers that set out how IFRS 17 is
              applied across{" "}
              <span className="font-semibold" style={{ color: colors.green }}>
                scope
              </span>
              ,{" "}
              <span className="font-semibold" style={{ color: colors.green }}>
                measurement
              </span>
              ,{" "}
              <span className="font-semibold" style={{ color: colors.green }}>
                aggregation
              </span>
              , and{" "}
              <span className="font-semibold" style={{ color: colors.green }}>
                transition
              </span>
              . Open any paper to read it inside the hub—no need to leave the site.
            </p>

            <div className="relative w-full">
              <FaSearch
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-lg"
                style={{ color: colors.muted }}
              />
              <input
                type="text"
                placeholder="Search policy papers by title..."
                className="w-full rounded-full py-4 pl-14 pr-6 transition-all shadow-md text-lg focus:outline-none"
                style={{
                  background: colors.inputBg,
                  border: `1px solid ${focusedSearch ? colors.cyan : colors.inputBorder}`,
                  color: colors.inputText,
                  boxShadow: focusedSearch ? `0 0 0 2px ${colors.cyan}33` : undefined,
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setFocusedSearch(true)}
                onBlur={() => setFocusedSearch(false)}
              />
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
          {filteredPapers.length > 0 ? (
            filteredPapers.map((paper) => (
              <div
                key={paper.filename}
                className="relative flex flex-col group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: colors.card,
                  border: `1px solid ${colors.cardBorder}`,
                  boxShadow: isDark ? `0 4px 20px ${colors.blue}15` : `0 4px 20px ${colors.blue}0d`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = cardHoverBorder;
                  e.currentTarget.style.boxShadow = cardHoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = colors.cardBorder;
                  e.currentTarget.style.boxShadow = isDark
                    ? `0 4px 20px ${colors.blue}15`
                    : `0 4px 20px ${colors.blue}0d`;
                }}
              >
                <div
                  className="relative h-44 w-full overflow-hidden shrink-0"
                  style={{ background: colors.bgElevated }}
                >
                  <img
                    src={paper.img}
                    alt={paper.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ opacity: isDark ? 0.8 : 0.92 }}
                  />
                  <div
                    className={`absolute inset-0 transition-colors ${isDark ? "bg-black/25 group-hover:bg-black/15" : "bg-black/10 group-hover:bg-black/5"}`}
                  />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h2
                      className="text-base font-bold flex items-start gap-2 leading-tight transition-opacity duration-300 group-hover:opacity-90"
                      style={{ color: colors.text }}
                    >
                      <FaRegFileAlt
                        className="mt-0.5 flex-shrink-0"
                        style={{ color: colors.green }}
                      />
                      <span className="line-clamp-3">{paper.title}</span>
                    </h2>
                  </div>
                </div>

                <div className="p-4" style={{ background: cardContentBg }}>
                  <button
                    type="button"
                    onClick={() => openPdf(paper)}
                    className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-medium transition-all duration-300 text-sm text-white"
                    style={{
                      background: `linear-gradient(135deg, ${colors.blue}, ${colors.green})`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "0.9";
                      e.currentTarget.style.boxShadow = `0 4px 14px ${colors.green}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "1";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <FaFilePdf />
                    View PDF
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              className="col-span-full py-16 text-center rounded-2xl border border-dashed"
              style={{
                color: colors.textSecondary,
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0, 102, 179, 0.05)",
                borderColor: colors.cardBorder,
              }}
            >
              <p className="text-xl">No policy papers found matching &quot;{searchTerm}&quot;</p>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="mt-4 hover:underline transition-colors font-medium"
                style={{ color: colors.cyan }}
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      <PdfViewerModal
        viewingPdf={viewingPdf}
        setViewingPdf={setViewingPdf}
        downloadFile={downloadFile}
        theme={theme}
      />
    </>
  );
}
