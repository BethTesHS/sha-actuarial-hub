import React, { useState } from 'react';
import { FileText, Maximize2, Download } from 'lucide-react';
import filesService from "../../services/files.service";

export default function ModuleCourse({ courseContent, theme, styles, setViewingPdf, downloadFile }) {
  const [activeTab, setActiveTab] = useState(0);

  const hasMultipleResources = courseContent.resources && courseContent.resources.length > 1;
  const activeResource = courseContent.resources ? courseContent.resources[activeTab] : null;

  return (
    <div className={`${styles.cardBg} backdrop-blur-md rounded-3xl p-6 md:p-8 border ${styles.border}`}>
      <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4`}>Course Content</h3>
      <p className={`${styles.textTertiary} mb-6 text-sm md:text-base`}>
        {courseContent.description}
      </p>

      {hasMultipleResources && (
        <div className={`flex flex-wrap gap-2 mb-6 border-b ${styles.border} pb-2`}>
          {courseContent.resources.map((resource, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 ${
                activeTab === idx
                  ? theme === 'light'
                    ? `${styles.accentBg} ${styles.accent} border-b-2 border-current font-semibold`
                    : `${styles.accentBg} ${styles.accent} border-b-2 border-current font-semibold`
                  : theme === 'light'
                    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    : `${styles.textTertiary} hover:bg-white/10 hover:text-white`
              }`}
            >
              {resource.title}
            </button>
          ))}
        </div>
      )}

      {activeResource && (
        <div className={`mb-8 overflow-hidden rounded-2xl border ${styles.border}`}>
          <div className={`${styles.accentBg} p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b ${styles.border}`}>
            <div className="flex items-center space-x-3 md:space-x-4 w-full">
              <div className={`p-3 ${styles.accentBg} rounded-xl shrink-0`}>
                <FileText className={`w-5 h-5 ${styles.accent}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-base md:text-lg font-semibold ${styles.text} truncate`}>{activeResource.title}</h4>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => setViewingPdf({ 
                  url: filesService.getFileUrl(activeResource.url),
                  title: activeResource.title, 
                  filename: activeResource.filename 
                })}
                className={`w-full md:w-auto px-4 md:px-6 py-2.5 ${theme === 'light' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white'} rounded-lg transition-all flex items-center justify-center gap-2 text-sm font-medium`}
              >
                <Maximize2 className="w-4 h-4" /> Full View
              </button>
              <button
                onClick={() => downloadFile(filesService.getFileUrl(activeResource.url), activeResource.filename)}
                className={`w-full md:w-auto px-4 md:px-6 py-2.5 ${theme === 'light' ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-md hover:shadow-lg' : 'bg-gradient-to-r from-purple-500 to-blue-500 shadow-md hover:shadow-lg'} rounded-lg text-white transition-all flex items-center justify-center gap-2 text-sm font-medium`}
              >
                <Download className="w-4 h-4" /> Download PDF
              </button>
            </div>
          </div>
          <div className="w-full h-[70vh] md:h-[800px] bg-white relative">
            <object 
              data={`${filesService.getFileUrl(activeResource.url).replace(/&/g, '%26')}#toolbar=0&view=FitH`} 
              type="application/pdf" 
              className="w-full h-full absolute inset-0 border-0"
            >
              <div className="flex items-center justify-center h-full flex-col gap-4 p-6 text-center bg-gray-50">
                <FileText className="w-12 h-12 text-gray-400" />
                <p className="text-gray-600 max-w-md">The PDF could not be displayed directly in your browser. You can still download it using the button above.</p>
              </div>
            </object>
          </div>
        </div>
      )}
    </div>
  );
}
