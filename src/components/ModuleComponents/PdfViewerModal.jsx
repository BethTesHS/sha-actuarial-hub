import React from 'react';
import { Download, X, FileText } from 'lucide-react';
import { getShaThemeColors } from '../../theme/sha';

export default function PdfViewerModal({ viewingPdf, setViewingPdf, downloadFile, theme }) {
  if (!viewingPdf) return null;

  const isDownloadable = viewingPdf.downloadable !== false;
  const colors = theme ? getShaThemeColors(theme) : null;
  const isDark = theme === 'dark';

  const headerStyle = colors
    ? {
        background: isDark
          ? 'linear-gradient(to right, rgba(0, 61, 107, 0.98), rgba(0, 40, 71, 0.98))'
          : 'linear-gradient(to right, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98))',
        borderColor: colors.cardBorder,
      }
    : undefined;

  const titleColor = colors ? colors.text : undefined;
  const closeBtnStyle = colors
    ? { background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.08)', color: colors.text }
    : undefined;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-sm">
      <div
        className={`flex items-center justify-between px-4 py-3 border-b ${colors ? '' : 'bg-gray-900/95 border-gray-700'}`}
        style={headerStyle}
      >
        <h4
          className={`font-semibold text-sm md:text-base truncate mr-4 ${colors ? '' : 'text-white'}`}
          style={titleColor ? { color: titleColor } : undefined}
        >
          {viewingPdf.title}
        </h4>
        <div className="flex items-center gap-2">
          {isDownloadable && (
            <button
              onClick={() => downloadFile(viewingPdf.url, viewingPdf.filename)}
              className={`px-3 py-1.5 rounded-lg text-white text-sm flex items-center gap-2 transition-all duration-200 ${
                colors ? '' : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
              }`}
              style={
                colors
                  ? {
                      background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`,
                    }
                  : undefined
              }
            >
              <Download className="w-4 h-4" />
              Download
            </button>
          )}
          <button
            onClick={() => setViewingPdf(null)}
            className={`p-2 rounded-lg transition-colors duration-200 ${colors ? '' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}
            style={closeBtnStyle}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 w-full bg-white">
        <object
          data={`${viewingPdf.url.replace(/&/g, '%26')}#toolbar=0`}
          type="application/pdf"
          className="w-full h-full border-0"
        >
          <div className="flex items-center justify-center h-full flex-col gap-4 p-6 text-center bg-gray-50">
            <FileText className="w-12 h-12 text-gray-400" />
            <p className="text-gray-600 max-w-md">The PDF could not be displayed directly in your browser. You can still download it using the button above.</p>
          </div>
        </object>
      </div>
    </div>
  );
}