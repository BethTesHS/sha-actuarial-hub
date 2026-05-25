import React, { useEffect } from 'react';
import { FileText, Brain, Loader2, ArrowLeft, Award, Check, Sparkles, RotateCcw, AlertCircle, MessageSquare, ChevronUp, ChevronDown, Send } from 'lucide-react';
import { supabase } from "../../supabaseClient";
import { gradeAiQuiz } from "../../services/ai-quiz.service";

export default function ModuleQuiz({
  moduleData, user, theme, styles,
  quizAnswers, setQuizAnswers,
  showQuizResults, setShowQuizResults,
  currentQuestionIndex, setCurrentQuestionIndex,
  quizSubTab, setQuizSubTab,
  isFetchingQuiz,
  aiQuizAnswers, setAiQuizAnswers,
  gradingInProgress, setGradingInProgress,
  gradingResults, setGradingResults,
  gradingError, setGradingError,
  expandedResults, setExpandedResults,
  isFetchingAiQuiz
}) {
  const { title, description, shortDescription, objectives, learningOutcomes, courseContent, assignments, aiQuizQuestions, quizQuestions } = moduleData;
  const hasAiGradedQuestions = Array.isArray(aiQuizQuestions) && aiQuizQuestions.length > 0;

  useEffect(() => {
    // If a module has no AI-graded questions defined in its JS data,
    // keep the quiz UI as multiple-choice only.
    if (!hasAiGradedQuestions && quizSubTab !== 'multiple-choice') {
      setQuizSubTab('multiple-choice');
    }
  }, [hasAiGradedQuestions, quizSubTab, setQuizSubTab]);

  const handleAnswerSelect = (questionId, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: quizQuestions.length };
  };

  const submitQuiz = async () => {
    if (!user?.id) {
      alert("You must be logged in to save your score. Your results will be displayed but not saved.");
      setShowQuizResults(true);
      return;
    }

    const { correct, total } = calculateScore();

    try {
      const { error } = await supabase
        .from('quiz_submissions')
        .upsert({
          user_id: user.id,
          module_id: String(moduleData.id),
          score: correct,
          total_questions: total,
          answers: quizAnswers,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id, module_id'
        });

      if (error) throw error;
    } catch (err) {
      console.error("Error saving quiz results:", err);
      alert("There was an error saving your quiz results to the database.");
    }

    setShowQuizResults(true);
  };

  const isAnswerCorrect = (questionId) => {
    const question = quizQuestions.find(q => q.id === questionId);
    return quizAnswers[questionId] === question.correctAnswer;
  };

  const getCurrentSection = (questionIndex) => {
    if (!quizQuestions || quizQuestions.length === 0) return '';
    const question = quizQuestions[questionIndex];
    return question.section || '';
  };

  const getSectionProgress = (questionIndex) => {
    if (!quizQuestions || quizQuestions.length === 0) return '';
    const currentSection = getCurrentSection(questionIndex);
    const sectionQuestions = quizQuestions.filter(q => q.section === currentSection);
    const sectionIndex = quizQuestions.findIndex(q => q.section === currentSection);
    const currentInSection = questionIndex - sectionIndex + 1;
    return `${currentInSection} of ${sectionQuestions.length} questions`;
  };

  const handleAiQuizAnswerChange = (questionId, value) => {
    setAiQuizAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmitForGrading = async () => {
    if (!aiQuizQuestions || aiQuizQuestions.length === 0) return;
    if (!user?.id) {
      setGradingError('Please log in to submit answers for grading.');
      return;
    }

    const answeredCount = Object.values(aiQuizAnswers).filter(a => a && a.trim().length > 0).length;
    if (answeredCount === 0) {
      setGradingError('Please answer at least one question before submitting.');
      return;
    }

    setGradingInProgress(true);
    setGradingError(null);
    setGradingResults(null);

    try {
      const response = await gradeAiQuiz({
        moduleData: {
          title, description, shortDescription, objectives, learningOutcomes, courseContent, assignments,
          quizQuestions: quizQuestions?.slice(0, 10), 
        },
        questions: aiQuizQuestions,
        answers: aiQuizAnswers,
      });

      if (response.success) {
        setGradingResults(response.data);
        const expanded = {};
        response.data.results?.forEach(r => {
          expanded[r.questionId] = true;
        });
        setExpandedResults(expanded);
        
        try {
          const { error: dbError } = await supabase
            .from('ai_quiz_submissions')
            .upsert({
              user_id: user.id,
              module_id: String(moduleData.id),
              score: response.data.overallScore,
              answers: aiQuizAnswers,
              grading_results: response.data,
              updated_at: new Date().toISOString()
            }, {
              onConflict: 'user_id, module_id'
            });

          if (dbError) throw dbError;
        } catch (dbErr) {
          console.error("Error saving AI quiz results to database:", dbErr);
          alert(`DATABASE ERROR: ${dbErr.message || JSON.stringify(dbErr)}. Please ensure the ai_quiz_submissions table exists in Supabase.`);
        }
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setGradingError(response.error || 'Grading failed. Please try again.');
      }
    } catch (err) {
      console.error('Grading error:', err);
      setGradingError(err?.error || err?.message || 'Failed to grade quiz. Please try again.');
    } finally {
      setGradingInProgress(false);
    }
  };

  const resetAiQuizGrading = () => {
    setAiQuizAnswers({});
    setGradingResults(null);
    setGradingError(null);
    setExpandedResults({});
  };

  const toggleResultExpanded = (questionId) => {
    setExpandedResults(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  return (
    <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} p-6`}>
      {hasAiGradedQuestions && (
        <div className="mb-6">
          <div className={`flex gap-2 p-1 rounded-xl ${theme === 'light' ? 'bg-gray-100' : 'bg-white/5'}`}>
            <button
              onClick={() => setQuizSubTab('multiple-choice')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                quizSubTab === 'multiple-choice'
                  ? theme === 'light' ? `bg-white ${styles.accent} shadow-md` : `${styles.accentBg} text-white border ${styles.accentBorder}`
                  : theme === 'light' ? 'text-gray-500 hover:text-gray-700 hover:bg-white/50' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4" /> Multiple Choice
            </button>
            <button
              onClick={() => setQuizSubTab('ai-graded')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                quizSubTab === 'ai-graded'
                  ? theme === 'light' ? `bg-white ${styles.accent} shadow-md` : `${styles.accentBg} text-white border ${styles.accentBorder}`
                  : theme === 'light' ? 'text-gray-500 hover:text-gray-700 hover:bg-white/50' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Brain className="w-4 h-4" /> AI-Graded
            </button>
          </div>
        </div>
      )}

      {quizSubTab === 'multiple-choice' && (
        isFetchingQuiz ? (
          <div className="flex flex-col justify-center items-center py-16 gap-4">
            <Loader2 className={`w-10 h-10 animate-spin ${styles.accent}`} />
            <p className={`${styles.textSecondary}`}>Loading your previous results...</p>
          </div>
        ) : (
          quizQuestions && quizQuestions.length > 0 ? (
            <>
            {!showQuizResults ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className={`text-lg md:text-xl font-bold ${styles.text}`}>Multiple Choice Questions</h3>
                  <div className={`${styles.textTertiary} text-sm md:text-base`}>
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </div>
                </div>

                <div className={`w-full ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'} rounded-full h-2 mb-6`}>
                  <div
                    className={`h-2 rounded-full transition-all duration-300 bg-gradient-to-r ${styles.progressBg} ${styles.gradientTo}`}
                    style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>

                {quizQuestions[currentQuestionIndex]?.section && (
                  <div className="mb-6">
                    <div className={`p-4 rounded-lg border-2 shadow-md ${theme === 'light' ? 'bg-white/80 border-gray-300' : 'bg-white/10 border-white/20'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className={`text-sm font-semibold ${styles.text}`}>{getCurrentSection(currentQuestionIndex)}</p>
                          <p className={`text-xs font-medium ${styles.textSecondary} mt-1`}>{getSectionProgress(currentQuestionIndex)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className={`${styles.inputBg} rounded-2xl p-4 md:p-6 mb-6 border ${styles.border}`}>
                  <h4 className={`text-base md:text-lg font-medium ${styles.text} mb-4`}>
                    {quizQuestions[currentQuestionIndex].question}
                  </h4>

                  <div className="space-y-2.5">
                    {quizQuestions[currentQuestionIndex].options.map((option) => (
                      <label
                        key={option}
                        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all ${quizAnswers[quizQuestions[currentQuestionIndex].id] === option
                          ? `${styles.accentBg} border-2 ${styles.accentBorder}`
                          : theme === 'light' ? 'bg-white border-2 border-gray-200 hover:bg-gray-50' : 'bg-white/5 border-2 border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${quizQuestions[currentQuestionIndex].id}`}
                          value={option}
                          checked={quizAnswers[quizQuestions[currentQuestionIndex].id] === option}
                          onChange={() => handleAnswerSelect(quizQuestions[currentQuestionIndex].id, option)}
                          className="mr-3 w-4 h-4"
                        />
                        <span className={`${styles.textSecondary} text-sm md:text-base`}>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={goToPreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className={`px-4 md:px-6 py-3 ${theme === 'light' ? 'bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-900' : 'bg-gray-600 hover:bg-gray-700 disabled:bg-gray-800 text-white'} disabled:cursor-not-allowed disabled:opacity-50 rounded-lg flex items-center gap-2`}
                  >
                    <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" /> Previous
                  </button>

                  <div className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-xs md:text-sm`}>
                    {Object.keys(quizAnswers).length} of {quizQuestions.length} answered
                  </div>

                  {currentQuestionIndex < quizQuestions.length - 1 ? (
                    <button
                      onClick={goToNextQuestion}
                      className={`px-4 md:px-6 py-3 bg-gradient-to-r ${styles.progressBg} ${styles.gradientTo} hover:opacity-90 shadow-lg text-white rounded-lg flex items-center gap-2`}
                    >
                      Next <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 rotate-180" />
                    </button>
                  ) : (
                    <button
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                      className={`px-6 md:px-8 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-lg font-semibold`}
                    >
                      Submit Quiz
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="space-y-6 md:space-y-8">
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`text-xl font-semibold ${styles.text} flex items-center gap-3 ${styles.transition}`}>
                    <FileText className={`w-6 h-6 ${styles.accent}`} />
                    Multiple Choice Questions
                  </h4>
                  <button
                      onClick={() => {
                        setShowQuizResults(false);
                        setQuizAnswers({});
                        setCurrentQuestionIndex(0);
                      }}
                      className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake
                    </button>
                </div>

                <div className={`rounded-2xl p-6 text-center ${theme === 'light'
                  ? `${styles.accentBg} border ${styles.accentBorder}`
                  : `${styles.accentBg} border ${styles.accentBorder}`
                } ${styles.transition}`}>

                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Award className={`w-8 h-8 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                    <h3 className={`text-xl font-bold ${styles.text}`}>Quiz Complete!</h3>
                  </div>
                  
                  <div className={`text-4xl font-extrabold mb-2 ${
                    (calculateScore().correct / calculateScore().total) * 100 >= 70
                      ? theme === 'light' ? 'text-green-600' : 'text-green-400'
                      : (calculateScore().correct / calculateScore().total) * 100 >= 50
                        ? theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                        : theme === 'light' ? 'text-red-600' : 'text-red-400'
                  }`}>
                    {Math.round((calculateScore().correct / calculateScore().total) * 100)}%
                  </div>
                  
                  <p className={`${styles.textTertiary} text-sm`}>
                    You got {calculateScore().correct} out of {calculateScore().total} questions correct. {calculateScore().correct === calculateScore().total ? 'Excellent work!' : 'Review your answers below and keep studying!'}
                  </p>
                </div>

                <div>
                  <h4 className={`text-lg md:text-xl font-bold ${styles.text} mb-4`}>Answer Review</h4>
                  <div className="space-y-4">
                    {quizQuestions.map((q, index) => (
                      <div key={q.id} className="space-y-3">
                        <div className={`rounded-xl p-4 md:p-6 border-2 ${isAnswerCorrect(q.id) ? (theme === 'light' ? 'bg-green-50 border-green-400' : 'bg-green-500/10 border-green-400/30') : (theme === 'light' ? 'bg-red-50 border-red-400' : 'bg-red-500/10 border-red-400/30')}`}>
                          <div className="flex items-start gap-3 mb-4">
                            <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center ${isAnswerCorrect(q.id) ? (theme === 'light' ? 'bg-green-200 text-green-700' : 'bg-green-500/30 text-green-400') : (theme === 'light' ? 'bg-red-200 text-red-700' : 'bg-red-500/30 text-red-400')}`}>
                              {isAnswerCorrect(q.id) ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : <span className="font-bold">✗</span>}
                            </div>
                            <div className="flex-1">
                              <h5 className={`text-base font-semibold ${styles.text} mb-3`}>Question {index + 1}: {q.question}</h5>
                              {!isAnswerCorrect(q.id) && (
                                <div className={`mb-3 p-3 rounded-lg ${theme === 'light' ? 'bg-red-100' : 'bg-red-500/20'}`}>
                                  <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-red-800' : 'text-red-300'}`}><span className="font-semibold">Your answer:</span> {quizAnswers[q.id]}</p>
                                </div>
                              )}
                              <div className={`mb-3 p-3 rounded-lg ${theme === 'light' ? 'bg-green-100' : 'bg-green-500/20'}`}>
                                <p className={`text-xs md:text-sm ${theme === 'light' ? 'text-green-800' : 'text-green-300'} `}><span className="font-semibold">Correct answer:</span> {q.correctAnswer}</p>
                              </div>
                              <div className={`p-3 md:p-4 rounded-lg ${theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-purple-500/10 border border-purple-400/20'}`}>
                                <p className={`${theme === 'light' ? 'text-blue-700' : 'text-purple-300'} font-medium mb-2 text-sm`}>Explanation:</p>
                                <p className={`${styles.textSecondary} text-sm`}>{q.explanation}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            </>
          ) : (
            <div className={`text-center py-12 ${styles.textTertiary}`}>
              <FileText className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-medium">No multiple choice questions available yet.</p>
            </div>
          )
        )
      )}

      {hasAiGradedQuestions && quizSubTab === 'ai-graded' && (
        isFetchingAiQuiz ? (
          <div className="flex flex-col justify-center items-center py-16 gap-4">
            <Loader2 className={`w-10 h-10 animate-spin ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
            <p className={`${styles.textSecondary}`}>Loading your previous AI grading results...</p>
          </div>
        ) : (
          aiQuizQuestions && aiQuizQuestions.length > 0 ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className={`text-xl font-semibold ${styles.text} flex items-center gap-3 ${styles.transition}`}>
                  <Sparkles className={`w-6 h-6 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                  AI-Graded Questions
                </h4>
                {gradingResults && (
                  <button
                      onClick={resetAiQuizGrading}
                      className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl`}
                    >
                      <RotateCcw className="w-4 h-4" />
                      Retake
                    </button>
                )}
              </div>
              <p className={`${styles.textTertiary} ${styles.transition}`}>
                Answer the questions below based on the module's training materials. Submit your answers to receive instant AI-powered feedback.
              </p>

              {gradingError && (
                <div className={`rounded-xl p-4 flex items-center gap-3 ${theme === 'light' ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-red-500/10 border border-red-400/20 text-red-300'}`}>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">{gradingError}</p>
                  <button onClick={() => setGradingError(null)} className="ml-auto text-xs underline">Dismiss</button>
                </div>
              )}

              {gradingResults && (
                <div className={`rounded-2xl p-6 text-center ${theme === 'light'
                  ? `${styles.accentBg} border ${styles.accentBorder}`
                  : `${styles.accentBg} border ${styles.accentBorder}`
                } ${styles.transition}`}>
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <Sparkles className={`w-8 h-8 ${theme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                    <h3 className={`text-xl font-bold ${styles.text}`}>AI Grading Complete</h3>
                  </div>
                  <div className={`text-4xl font-extrabold mb-2 ${
                    gradingResults.overallScore >= 70
                      ? theme === 'light' ? 'text-green-600' : 'text-green-400'
                      : gradingResults.overallScore >= 50
                        ? theme === 'light' ? 'text-yellow-600' : 'text-yellow-400'
                        : theme === 'light' ? 'text-red-600' : 'text-red-400'
                  }`}>
                    {Math.round(gradingResults.overallScore)}%
                  </div>
                  <p className={`${styles.textTertiary} text-sm`}>{gradingResults.overallFeedback}</p>
                </div>
              )}

              <div className="space-y-5">
                {aiQuizQuestions.map((q, idx) => {
                  const result = gradingResults?.results?.find(r => String(r.questionId) === String(q.id));
                  const isExpanded = expandedResults[q.id];

                  return (
                    <div key={q.id} className={`rounded-2xl border overflow-hidden ${styles.transition} ${
                      result
                        ? result.isCorrect
                          ? theme === 'light'
                            ? 'border-green-300 bg-green-50/50'
                            : 'border-green-400/30 bg-green-500/5'
                          : theme === 'light'
                            ? 'border-red-300 bg-red-50/50'
                            : 'border-red-400/30 bg-red-500/5'
                        : theme === 'light'
                          ? 'border-gray-200 bg-white/80'
                          : 'border-white/10 bg-white/5'
                    }`}>
                      <div className="p-5">
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                            result
                              ? result.isCorrect
                                ? theme === 'light' ? 'bg-green-200 text-green-700' : 'bg-green-500/30 text-green-400'
                                : theme === 'light' ? 'bg-red-200 text-red-700' : 'bg-red-500/30 text-red-400'
                              : theme === 'light' ? 'bg-purple-200 text-purple-700' : 'bg-purple-500/30 text-purple-400'
                          }`}>
                            {result ? (result.isCorrect ? <Check className="w-4 h-4" /> : '✗') : idx + 1}
                          </span>
                          <div className="flex-1">
                            <h5 className={`text-base font-semibold ${styles.text} ${styles.transition}`}>
                              {q.question}
                            </h5>
                            {q.hint && !gradingResults && (
                              <p className={`text-xs mt-1 ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} italic`}>
                                Hint: {q.hint}
                              </p>
                            )}
                            {result && (
                              <div className="flex items-center gap-3 mt-2">
                                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                                  result.isCorrect
                                    ? theme === 'light' ? 'bg-green-200 text-green-800' : 'bg-green-500/25 text-green-300'
                                    : theme === 'light' ? 'bg-red-200 text-red-800' : 'bg-red-500/25 text-red-300'
                                }`}>
                                  {result.isCorrect ? 'Correct' : 'Needs Improvement'} — {result.score}/10
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <textarea
                          value={aiQuizAnswers[q.id] || ''}
                          onChange={(e) => handleAiQuizAnswerChange(q.id, e.target.value)}
                          disabled={gradingInProgress}
                          placeholder="Type your answer here..."
                          rows={4}
                          className={`w-full rounded-xl p-4 text-sm resize-y border transition-all focus:outline-none focus:ring-2 ${
                            theme === 'light'
                              ? 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-purple-400 focus:border-purple-400'
                              : 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-purple-400/50 focus:border-purple-400/50'
                          } ${gradingInProgress ? 'opacity-60 cursor-not-allowed' : ''}`}
                        />
                      </div>

                      {result && (
                        <div className={`border-t ${theme === 'light' ? 'border-gray-200' : 'border-white/10'}`}>
                          <button
                            onClick={() => toggleResultExpanded(q.id)}
                            className={`w-full px-5 py-3 flex items-center justify-between text-sm font-medium transition-colors ${
                              theme === 'light'
                                ? 'hover:bg-gray-100 text-gray-700'
                                : 'hover:bg-white/5 text-gray-300'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              AI Feedback
                            </span>
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>

                          {isExpanded && (
                            <div className="px-5 pb-5 space-y-3">
                              <div className={`p-4 rounded-lg ${theme === 'light'
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-blue-500/10 border border-blue-400/20'
                              }`}>
                                <p className={`text-xs font-semibold mb-1 ${theme === 'light' ? 'text-blue-700' : 'text-blue-300'}`}>
                                  Feedback:
                                </p>
                                <p className={`text-sm ${theme === 'light' ? 'text-blue-800' : 'text-blue-200'}`}>
                                  {result.feedback}
                                </p>
                              </div>

                              {!result.isCorrect && result.correctGuidance && (
                                <div className={`p-4 rounded-lg ${theme === 'light'
                                  ? 'bg-green-50 border border-green-200'
                                  : 'bg-green-500/10 border border-green-400/20'
                                }`}>
                                  <p className={`text-xs font-semibold mb-1 ${theme === 'light' ? 'text-green-700' : 'text-green-300'}`}>
                                    Correct Answer / Key Points:
                                  </p>
                                  <p className={`text-sm ${theme === 'light' ? 'text-green-800' : 'text-green-200'}`}>
                                    {result.correctGuidance}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!gradingResults && (
                <div className="flex justify-center pt-2">
                  <button
                    onClick={handleSubmitForGrading}
                    disabled={gradingInProgress || !user?.id || Object.values(aiQuizAnswers).filter(a => a && a.trim()).length === 0}
                    className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed ${
                      theme === 'light'
                        ? `bg-gradient-to-r ${styles.progressBg} ${styles.gradientTo} hover:opacity-90 shadow-lg hover:shadow-xl`
                        : `bg-gradient-to-r ${styles.progressBg} ${styles.gradientTo} hover:opacity-90 shadow-lg`
                    }`}
                  >
                    {gradingInProgress ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        AI is grading your answers...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit for AI Grading
                      </>
                    )}
                  </button>
                </div>
              )}

              {!user?.id && (
                <div className={`rounded-xl p-4 flex items-center gap-3 ${theme === 'light' ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-amber-500/10 border border-amber-400/20 text-amber-300'}`}>
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <p className="text-sm">Please log in to submit your answers for AI grading.</p>
                </div>
              )}
            </div>
          ) : (
            <div className={`text-center py-12 ${styles.textTertiary}`}>
              <Brain className={`w-12 h-12 mx-auto mb-4 ${theme === 'light' ? 'text-gray-300' : 'text-gray-600'}`} />
              <p className="text-lg font-medium">No AI-graded questions available yet.</p>
              <p className="text-sm mt-2">Check back later or try the Multiple Choice quiz.</p>
            </div>
          )
        )
      )}
    </div>
  );
}