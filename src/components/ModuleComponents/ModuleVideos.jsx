import React, { useState } from 'react';
import { FileVideo, Play, ArrowLeft } from 'lucide-react';
import filesService from "../../services/files.service";

export default function ModuleVideos({ courseContent, theme, styles }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const getThemeTransition = () => 'transition-all duration-300 ease-in-out';
  const hasVideos = courseContent.videoResources && courseContent.videoResources.length > 0;

  if (!hasVideos) return null;

  return (
    <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${getThemeTransition()}`}>
      <div className="mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`inline-block p-3 rounded-xl ${theme === 'light'
            ? `bg-gradient-to-br ${styles.gradientStartBg} ${styles.iconGradientTo}`
            : `bg-gradient-to-br ${styles.gradientStartBg} ${styles.iconGradientTo} border border-white/10`
            } flex-shrink-0`}>
            <FileVideo className="w-6 h-6 text-white" />
          </div>
          <h3 className={`text-2xl font-bold ${styles.text} ${getThemeTransition()}`}>Training Videos</h3>
        </div>
        <p className={`${styles.textTertiary} text-sm md:text-base`}>
          Watch comprehensive training videos for this module.
        </p>
      </div>

      <div className="mt-4">
        {selectedVideo ? (
          <div className={`rounded-3xl ${styles.cardBg} border ${styles.border} p-6 md:p-8 mb-6 ${getThemeTransition()}`}>
            <div className="mb-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedVideo(null)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${theme === 'light'
                  ? 'bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm'
                  : 'bg-white/10 text-white hover:bg-white/20'
                  } transition-all duration-200 font-medium ${getThemeTransition()}`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Video List</span>
              </button>
              <button
                onClick={() => { setSelectedVideo(null); }}
                className={`text-sm ${styles.textSecondary} hover:${styles.text} underline underline-offset-4 transition-all`}
              >
                Close video
              </button>
            </div>
            <div className="mb-6">
              <h2 className={`text-xl md:text-2xl font-bold ${styles.text} mb-3 ${getThemeTransition()}`}>
                {selectedVideo.title}
              </h2>
              {selectedVideo.description && (
                <p className={`${styles.textTertiary} text-sm md:text-base ${getThemeTransition()}`}>
                  {selectedVideo.description}
                </p>
              )}
            </div>
            <div className="rounded-2xl overflow-hidden bg-black shadow-2xl">
              {selectedVideo.filename?.endsWith('.mp3') ? (
                <audio
                  controls
                  className="w-full"
                  style={{ padding: '20px' }}
                >
                  <source src={filesService.getFileUrl(selectedVideo.url)} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              ) : (
                <video
                  controls
                  className="w-full h-auto"
                  style={{ maxHeight: '75vh' }}
                  preload="metadata"
                >
                  <source src={filesService.getFileUrl(selectedVideo.url)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courseContent.videoResources.map((video, index) => (
              <div
                key={index}
                onClick={() => setSelectedVideo(video)}
                className={`relative group overflow-hidden rounded-[24px] cursor-pointer border transition-all duration-300 
                  ${theme === 'light'
                    ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-xl shadow-sm'
                    : 'bg-gray-800/40 border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600 shadow-lg'
                  }`}
              >
                {/* Thumbnail area / Top half */}
                <div className={`h-40 w-full flex items-center justify-center relative ${theme === 'light'
                  ? 'bg-gradient-to-br from-gray-100 to-gray-200'
                  : 'bg-gradient-to-br from-gray-900 to-black'
                  }`}>
                  
                  {/* Play Button Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${theme === 'light' ? 'bg-white/20 group-hover:bg-white/40' : 'bg-black/20 group-hover:bg-transparent'}`}>
                    <div className={`w-16 h-16 flex items-center justify-center rounded-full shadow-lg transform transition-transform duration-300 group-hover:scale-110 ${theme === 'light'
                      ? `bg-gradient-to-br ${styles.gradientStartBg} ${styles.iconGradientTo}`
                      : `bg-gradient-to-br ${styles.gradientStartBg} ${styles.iconGradientTo} border border-white/10`
                      }`}>
                      <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className={`p-6 border-t ${theme === 'light' ? 'border-gray-100' : 'border-gray-700/50'}`}>
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-lg mb-2 truncate ${theme === 'light' ? 'text-gray-900 group-hover:text-blue-700' : 'text-gray-100 group-hover:text-white'} transition-colors`}>
                        {video.title}
                      </h3>
                      {video.description && (
                        <p className={`text-sm line-clamp-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
                          {video.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Decorative border effect on hover */}
                <div className={`absolute inset-0 pointer-events-none border-2 border-transparent group-hover:border-[currentColor] rounded-[24px] opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${styles.text}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}