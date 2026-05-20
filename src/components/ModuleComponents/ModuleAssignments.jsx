import React from 'react';
import { CheckCircle2, RotateCcw, FileText, Download, Award, Database, Settings, Upload, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from "../../supabaseClient";
import filesService from "../../services/files.service";

const BUCKET_NAME = 'submissions';

export default function ModuleAssignments({
  moduleData, user, theme, styles, downloadFile,
  assignmentStatus, setAssignmentStatus,
  assignmentSubmission, setAssignmentSubmission,
  savedSubmissionFiles, setSavedSubmissionFiles,
  isResubmitting, setIsResubmitting,
  uploadedFiles, setUploadedFiles,
  uploading, setUploading,
  uploadError, setUploadError,
  submitting, setSubmitting,
  submitSuccess, setSubmitSuccess,
  loadingFiles,
  successViewRef, uploadViewRef
}) {
  const { assignments } = moduleData;
  const hasSubmittedAssignment =
    assignmentStatus === 'submitted' ||
    assignmentStatus === 'graded' ||
    assignmentSubmission?.status === 'submitted' ||
    assignmentSubmission?.status === 'graded' ||
    !!assignmentSubmission?.grade ||
    (savedSubmissionFiles && savedSubmissionFiles.length > 0);
  const showSuccessOnTop = hasSubmittedAssignment && !isResubmitting;

  const getStoragePath = (fileName) => {
    const uid = user?.id;
    const modId = moduleData?.id || 'unknown';
    const timestamp = Date.now();
    const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    return `${uid}/${modId}/${timestamp}_${sanitized}`;
  };

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    if (!user?.id) {
      setUploadError('Please log in to upload files.');
      return;
    }

    setUploading(true);
    setUploadError(null);

    const newFiles = [];

    for (const file of files) {
      if (file.size > 50 * 1024 * 1024) {
        setUploadError(`File "${file.name}" exceeds 50MB limit.`);
        continue;
      }

      const storagePath = getStoragePath(file.name);

      try {
        const { data, error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(storagePath, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) throw error;

        newFiles.push({
          id: data?.id || storagePath,
          name: file.name,
          storageName: storagePath.split('/').pop(),
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          type: file.type,
          uploadDate: new Date().toLocaleDateString(),
          storagePath: storagePath,
          uploaded: true
        });
      } catch (err) {
        console.error(`Error uploading ${file.name}:`, err);
        setUploadError(`Failed to upload "${file.name}": ${err.message}`);
      }
    }

    if (newFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }

    setUploading(false);
    event.target.value = '';
  };

  const removeFile = async (fileId) => {
    const file = uploadedFiles.find(f => f.id === fileId);
    if (!file) return;

    if (file.storagePath) {
      try {
        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .remove([file.storagePath]);
        if (error) throw error;
      } catch (err) {
        console.error('Error removing file from storage:', err);
        setUploadError(`Failed to remove "${file.name}": ${err.message}`);
        return;
      }
    }

    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleDownloadSubmittedFile = async (file) => {
    try {
      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .createSignedUrl(file.storagePath, 3600); 
        
      if (error) throw error;
      
      if (data?.signedUrl) {
        downloadFile(data.signedUrl, file.name);
      }
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Could not download the file. It may have been removed or access was denied.");
    }
  };

  const handleSubmitAll = async () => {
    if (!user?.id || uploadedFiles.length === 0) return;

    setSubmitting(true);
    setSubmitSuccess(false);
    setUploadError(null);

    try {
      const payload = {
        user_id: user.id,
        module_id: String(moduleData.id),
        files: uploadedFiles,
        status: 'submitted',
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('assignment_submissions')
        .upsert(payload, {
          onConflict: 'user_id, module_id'
        })
        .select('*')
        .maybeSingle();

      if (error) throw error;

      setSubmitSuccess(true);
      setAssignmentStatus('submitted');
      setAssignmentSubmission?.(data || payload);
      setSavedSubmissionFiles(uploadedFiles);
      setIsResubmitting(false); 
      
      setTimeout(() => {
        successViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting files:', err);
      setUploadError(`Submission failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6 space-y-8 ${styles.transition}`}>
      <h3 className={`text-2xl font-bold ${styles.text} mb-6 ${styles.transition}`}>Assignments</h3>

      {showSuccessOnTop && (
        <div ref={successViewRef} className={`space-y-4 mb-8 pb-8 border-b ${styles.border} ${styles.transition}`}>
          {/* <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-600' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
            <CheckCircle2 className="w-6 h-6" />
            Submission & Results
          </h4> */}
          <div className={`rounded-3xl p-6 md:p-8 border ${theme === 'light' ? 'bg-green-50 border-green-200' : 'bg-green-500/10 border-green-400/30'} ${styles.transition}`}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
              <div class="w-full">
                <h5 className={`text-xl font-bold flex items-center gap-2 ${theme === 'light' ? 'text-green-700' : 'text-green-400'}`}>
                  <CheckCircle2 className="w-6 h-6" />
                  Assignment Submitted
                </h5>
                <p className={`mt-2 ${theme === 'light' ? 'text-green-800' : 'text-green-200'}`}>
                  You have successfully submitted your files. You can now access the result files below.
                </p>
                <div className={`mt-4 rounded-2xl border p-4 ${assignmentSubmission?.status === 'graded' || assignmentSubmission?.grade
                  ? theme === 'light' ? 'bg-blue-50 border-blue-200 text-blue-800' : 'bg-blue-500/10 border-blue-400/30 text-blue-200'
                  : theme === 'light' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-amber-500/10 border-amber-400/30 text-amber-200'
                }`}>
                  <div className="text-sm font-bold">
                    {assignmentSubmission?.status === 'graded' || assignmentSubmission?.grade
                      ? 'Supervisor graded this assignment'
                      : 'Pending supervisor grading'}
                  </div>
                  {assignmentSubmission?.grade && (
                    <div className="mt-2 text-sm">
                      <span className="font-bold">Grade:</span> {assignmentSubmission.grade}
                    </div>
                  )}
                  {assignmentSubmission?.grading_notes && (
                    <div className="mt-2 text-sm whitespace-pre-wrap">
                      <span className="font-bold">Notes:</span> {assignmentSubmission.grading_notes}
                    </div>
                  )}
                  {assignmentSubmission?.graded_at && (
                    <div className="mt-2 text-xs opacity-80">
                      Graded {new Date(assignmentSubmission.graded_at).toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
              
              <button
                onClick={() => {
                  setIsResubmitting(true);
                  setTimeout(() => {
                    uploadViewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 150);
                }}
                className={`px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-sm hover:shadow-md ${
                  theme === 'light' 
                    ? 'bg-white text-green-600 border border-green-200 hover:bg-green-50' 
                    : 'bg-black/40 text-green-400 border border-green-500/30 hover:bg-green-500/10'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                Resubmit
              </button>
            </div>

            <div className="mb-8">
              <h6 className={`text-sm font-bold uppercase tracking-wider mb-4 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>Your Submissions</h6>
              <div className="space-y-3">
                {savedSubmissionFiles.map((file, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${theme === 'light' ? 'bg-white border-green-200 shadow-sm' : 'bg-black/20 border-green-500/20'}`}>
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} />
                      <div>
                        <p className={`font-medium ${styles.text}`}>{file.name}</p>
                        <p className={`text-xs ${styles.textTertiary}`}>{file.uploadDate} • {file.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadSubmittedFile(file)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 ${theme === 'light' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'}`}
                    >
                      <Download className="w-4 h-4" /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {(assignments.resultFiles || assignments.results) && (
              <div className={`mt-8 pt-8 border-t ${theme === 'light' ? 'border-green-200' : 'border-green-500/30'}`}>
                <h4 className={`text-xl font-bold mb-2 flex items-center gap-2 ${theme === 'light' ? 'text-purple-700' : 'text-purple-400'}`}>
                  <Award className="w-6 h-6" /> Solution / Result Files
                </h4>
                <p className={`mb-6 text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Compare your work with the correct solutions.
                </p>
                <div className="space-y-4">
                  {(assignments.resultFiles || assignments.results).map((file, idx) => (
                    <div key={idx} className={`rounded-[20px] ${theme === 'light'
                      ? `bg-purple-50 border-purple-200 hover:bg-purple-100`
                      : `bg-purple-500/20 border-purple-400/30 hover:bg-purple-500/30`
                      } border p-5 flex items-center justify-between transition-all`}>
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 ${theme === 'light' ? `bg-purple-200 text-purple-700` : `bg-purple-600/40 text-purple-300`} rounded-xl`}>
                          {file.icon || <Database className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className={`text-md font-semibold ${styles.text}`}>{file.title}</h4>
                          <p className={`text-xs ${styles.textTertiary}`}>{file.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => downloadFile(filesService.getFileUrl(file.url), file.filename)}
                        className={`px-5 py-2 ${theme === 'light'
                          ? `bg-purple-600 hover:bg-purple-700`
                          : `bg-purple-500 hover:bg-purple-600`
                          } rounded-lg text-white transition flex items-center gap-2 text-sm`}
                      >
                        <Download className="w-4 h-4" /> Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {assignments.dataFiles && assignments.dataFiles.length > 0 && (
        <div className="space-y-4">
          <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'} flex items-center gap-3 ${styles.transition}`}>
            <Database className="w-6 h-6" />
            Data Files
          </h4>
          <p className={`${styles.textTertiary} ${styles.transition}`}>
            Download the following datasets to practice your skills:
          </p>

          <div className="space-y-4">
            {assignments.dataFiles.map((file, idx) => (
              <div key={idx} className={`rounded-[30px] ${theme === 'light'
                ? 'bg-blue-50 border-blue-200 hover:bg-blue-100'
                : 'bg-blue-500/20 border-blue-400/30 hover:bg-blue-500/30'
                } border p-6 flex items-center justify-between ${styles.transition}`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-4 ${theme === 'light' ? 'bg-blue-200 text-blue-700' : 'bg-blue-600/40 text-blue-300'} rounded-2xl ${styles.transition}`}>
                    {file.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>{file.title}</h4>
                    <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>{file.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => downloadFile(filesService.getFileUrl(file.url), file.filename)}
                  className={`px-6 py-2 ${theme === 'light'
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-blue-500 hover:bg-blue-600'
                    } rounded-lg text-white transition flex items-center gap-2`}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {assignments.workingFiles && assignments.workingFiles.length > 0 && (
        <div className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
          <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-orange-600' : 'text-orange-400'} flex items-center gap-3 ${styles.transition}`}>
            <Settings className="w-6 h-6" />
            Working Files
          </h4>
          <p className={`${styles.textTertiary} ${styles.transition}`}>
            Download these templates to structure your workflow:
          </p>

          <div className="space-y-4">
            {assignments.workingFiles.map((file, idx) => (
              <div key={idx} className={`rounded-[30px] ${theme === 'light'
                ? 'bg-orange-50 border-orange-200 hover:bg-orange-100'
                : 'bg-orange-500/20 border-orange-400/30 hover:bg-orange-500/30'
                } border p-6 flex items-center justify-between ${styles.transition}`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-4 ${theme === 'light' ? 'bg-orange-200 text-orange-700' : 'bg-orange-600/40 text-orange-300'} rounded-2xl ${styles.transition}`}>
                    {file.icon}
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${styles.text} ${styles.transition}`}>{file.title}</h4>
                    <p className={`text-sm ${styles.textTertiary} ${styles.transition}`}>{file.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => downloadFile(filesService.getFileUrl(file.url), file.filename)} 
                  className={`px-6 py-2 ${theme === 'light'
                    ? 'bg-orange-600 hover:bg-orange-700'
                    : 'bg-orange-500 hover:bg-orange-600'
                    } rounded-lg text-white transition flex items-center gap-2`}
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!showSuccessOnTop && (
        <div ref={uploadViewRef} className={`space-y-4 pt-6 border-t ${styles.border} ${styles.transition}`}>
          <h4 className={`text-xl font-semibold ${theme === 'light' ? 'text-green-600' : 'text-green-400'} flex items-center gap-3 ${styles.transition}`}>
            <Upload className="w-6 h-6" />
            Submission
          </h4>
          <p className={`${styles.textTertiary} ${styles.transition}`}>
            Upload your completed assignments for review and feedback:
          </p>

          <div className={`rounded-3xl ${theme === 'light'
            ? 'bg-green-50 border-green-200'
            : 'bg-green-500/10 border-green-400/20'
            } border p-6 ${styles.transition}`}>
            
            {!user?.id && (
              <div className={`rounded-xl p-4 mb-4 flex items-center gap-3 ${theme === 'light' ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-amber-500/10 border border-amber-400/20 text-amber-300'}`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Please log in to upload and submit assignment files.</p>
              </div>
            )}

            {uploadError && (
              <div className={`rounded-xl p-4 mb-4 flex items-center gap-3 ${theme === 'light' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/10 border border-red-400/20 text-red-300'}`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">{uploadError}</p>
                <button onClick={() => setUploadError(null)} className="ml-auto text-xs underline">Dismiss</button>
              </div>
            )}

            {submitSuccess && (
              <div className={`rounded-xl p-4 mb-4 flex items-center gap-3 ${theme === 'light' ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-green-500/10 border border-green-400/20 text-green-300'}`}>
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm">Files submitted successfully for review!</p>
              </div>
            )}

            <div className={`border-2 border-dashed ${theme === 'light'
              ? 'border-green-300 hover:border-green-400'
              : 'border-green-400/30 hover:border-green-400/50'
              } rounded-2xl p-8 text-center transition-colors ${styles.transition} ${!user?.id ? 'opacity-50 pointer-events-none' : ''}`}>
              {uploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className={`w-12 h-12 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} animate-spin mb-4`} />
                  <h5 className={`text-lg font-semibold ${styles.text} mb-2`}>Uploading to Supabase Storage...</h5>
                  <p className={`${styles.textTertiary}`}>Please wait while your files are being uploaded</p>
                </div>
              ) : (
                <>
                  <Upload className={`w-12 h-12 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} mx-auto mb-4 ${styles.transition}`} />
                  <h5 className={`text-lg font-semibold ${styles.text} mb-2 ${styles.transition}`}>Upload Your Completed Work</h5>
                  <p className={`${styles.textTertiary} mb-4 ${styles.transition}`}>
                    Drag and drop your files here, or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.xlsx,.xls,.docx,.pptx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                    disabled={!user?.id || uploading}
                  />
                  <label
                    htmlFor="file-upload"
                    className={`inline-block px-6 py-2 ${theme === 'light'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-green-500 hover:bg-green-600'
                      } rounded-lg text-white cursor-pointer transition ${!user?.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Choose Files
                  </label>
                  <p className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mt-2 ${styles.transition}`}>
                    Supported formats: .xlsx, .xls, .pdf, .docx, .pptx (Max 50MB per file)
                  </p>
                </>
              )}
            </div>

            {loadingFiles && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <Loader2 className={`w-4 h-4 animate-spin ${theme === 'light' ? 'text-green-600' : 'text-green-400'}`} />
                <span className={`text-sm ${styles.textTertiary}`}>Loading your previously uploaded files...</span>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h6 className={`text-md font-semibold ${styles.text} mb-3 ${styles.transition}`}>Uploaded Files:</h6>
                <div className="space-y-2">
                  {uploadedFiles.map(file => (
                    <div key={file.id} className={`flex items-center justify-between ${styles.inputBg} rounded-lg p-3 ${styles.transition}`}>
                      <div className="flex items-center space-x-3">
                        <FileText className={`w-4 h-4 ${theme === 'light' ? 'text-green-600' : 'text-green-400'} ${styles.transition}`} />
                        <div>
                          <p className={`${styles.text} text-sm font-medium ${styles.transition}`}>{file.name}</p>
                          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xs ${styles.transition}`}>
                            {file.size} • {file.uploadDate}
                            {file.uploaded && <span className="ml-2 text-green-400">✓ Stored</span>}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-400 hover:text-red-300 transition text-sm"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                  {isResubmitting && (
                    <button
                      onClick={() => {
                        setIsResubmitting(false);
                        setTimeout(() => {
                          if (successViewRef.current) {
                            const yOffset = -150;
                            const y = successViewRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }, 150);
                      }}
                      disabled={submitting || uploading}
                      className={`px-8 py-3 rounded-xl font-semibold transition flex-1 sm:flex-none ${
                        theme === 'light' 
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
                          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      Cancel Resubmission
                    </button>
                  )}
                  
                  <button
                    onClick={handleSubmitAll}
                    disabled={submitting || uploading}
                    className={`px-8 py-3 ${theme === 'light'
                      ? 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
                      : 'bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-green-500/25'
                      } rounded-xl text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 flex-[2] sm:flex-none`}
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                    ) : (
                      <>Submit {isResubmitting ? 'New' : 'All'} Files</>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}