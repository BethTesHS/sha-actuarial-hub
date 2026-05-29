// src/components/Module Components/ModuleAdditionalResources.jsx
import React from 'react';
import { Download, FileText, FileSpreadsheet, File, Eye } from "lucide-react";
import filesService from "../../services/files.service";

export default function ModuleAdditionalResources({ additionalResources, theme, styles, downloadFile, setViewingPdf }) {
  if (!additionalResources || additionalResources.length === 0) return null;

  const handleViewFile = (resource) => {
    const resolvedUrl = filesService.getFileUrl(resource.url);
    const isExternalLink =
      resource.type === 'Link' ||
      resource.url?.startsWith('http://') ||
      resource.url?.startsWith('https://');
    const isInternalRoute =
      resource.url?.startsWith('/') &&
      !resource.url?.startsWith('/Training Modules') &&
      !resource.url?.toLowerCase().endsWith('.pdf');

    if (isExternalLink) {
      window.open(resolvedUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (isInternalRoute) {
      window.location.href = resolvedUrl;
      return;
    }

    if (setViewingPdf) {
      setViewingPdf({
        ...resource,
        url: resolvedUrl,
      });
    } else {
      window.open(resolvedUrl, '_blank');
    }
  };

  return (
    <div className={`p-8 rounded-[30px] ${styles.cardBg} ${styles.border} border shadow-xl`}>
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
        Additional Resources
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {additionalResources.map((resource, index) => {
          // Determine which icon to show based on the resource type
          const typeLower = resource.type?.toLowerCase() || '';
          let ResourceIcon = File;
          if (typeLower.includes('pdf')) ResourceIcon = FileText;
          if (typeLower.includes('excel') || typeLower.includes('csv')) ResourceIcon = FileSpreadsheet;

          const isDownloadable = resource.downloadable !== false;

          return (
            <div key={index} className={`p-6 rounded-2xl border transition-all duration-200 flex flex-col h-full ${
              theme === 'light' 
                ? 'bg-white border-gray-200 shadow-sm hover:shadow-md' 
                : 'bg-white/5 border-white/10 hover:bg-white/10'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2.5 rounded-xl ${
                  theme === 'light' 
                    ? 'bg-purple-50 text-purple-600' 
                    : 'bg-purple-500/20 text-purple-400'
                }`}>
                  <ResourceIcon className="w-7 h-6" strokeWidth={1.5} />
                </div>

                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  theme === 'light' 
                    ? 'bg-gray-100 text-gray-600' 
                    : 'bg-white/10 text-gray-300'
                }`}>
                  {resource.type}
                </span>
              </div>
              
              {/* Reduced title font size to text-sm */}
              <h3 className={`font-semibold text-sm mb-4 flex-grow ${
                theme === 'light' ? 'text-gray-900' : 'text-white'
              }`}>
                {resource.title}
              </h3>
              
              {/* Added text-sm to the button as well */}
              {isDownloadable ? (
                <button
                  onClick={() => downloadFile(filesService.getFileUrl(resource.url), resource.filename)}
                  className={`w-full flex items-center justify-center space-x-2 py-2 px-4 text-sm rounded-xl font-medium transition-all ${
                    theme === 'light'
                      ? 'bg-purple-50 text-purple-700 hover:bg-purple-100'
                      : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              ) : (
                <button
                  onClick={() => handleViewFile(resource)}
                  className={`w-full flex items-center justify-center space-x-2 py-2 px-4 text-sm rounded-xl font-medium transition-all ${
                    theme === 'light'
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}