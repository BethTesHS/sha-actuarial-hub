// src/components/ModuleComponent.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, CheckCircle2 } from "lucide-react";
import { supabase } from "../supabaseClient";

// Import Refactored Components
import bgImage from '/src/assets/bground.jpg';
import PdfViewerModal from "./ModuleComponents/PdfViewerModal";
import ModuleOverview from "./ModuleComponents/ModuleOverview";
import ModuleCourse from "./ModuleComponents/ModuleCourse";
import Module18Course from "./ModuleComponents/Module18Course";
import ModuleVideos from "./ModuleComponents/ModuleVideos";
import ModuleQuiz from "./ModuleComponents/ModuleQuiz";
import ModuleAdditionalResources from "./ModuleComponents/ModuleAdditionalResources";

export default function ModuleComponent({ theme = 'dark', moduleData, user }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [viewingPdf, setViewingPdf] = useState(null);

  // AI Quiz Grading state
  const [aiQuizAnswers, setAiQuizAnswers] = useState({});
  const [gradingInProgress, setGradingInProgress] = useState(false);
  const [gradingResults, setGradingResults] = useState(null);
  const [gradingError, setGradingError] = useState(null);
  const [expandedResults, setExpandedResults] = useState({});
  const [quizSubTab, setQuizSubTab] = useState('multiple-choice');
  
  // Loading Fetch States
  const [isFetchingQuiz, setIsFetchingQuiz] = useState(true);
  const [isFetchingAiQuiz, setIsFetchingAiQuiz] = useState(true);

  // Progress State
  const [progressPercentage, setProgressPercentage] = useState(0);

  const { title, description, shortDescription, objectives, learningOutcomes, themeColor, courseContent, additionalResources } = moduleData;

  const getThemeStyles = () => {
    const accentColor = themeColor || 'purple';
    
    // Map tailwind classes for supported colors to ensure they are swept into the build
    const colorMap = {
      purple: {
        shadowText: 'shadow-purple-500/10', shadowTextDark: 'shadow-purple-500/20',
        accentText: 'text-purple-600', accentTextDark: 'text-purple-400',
        accentBg: 'bg-purple-50/80', accentBgDark: 'bg-purple-500/20',
        accentBorder: 'border-purple-200/50', accentBorderDark: 'border-purple-400/30',
        accentHover: 'hover:bg-purple-100/80', accentHoverDark: 'hover:bg-purple-500/30',
        gradientFrom: 'from-purple-600', gradientFromDark: 'from-purple-400',
        gradientStartBg: 'from-purple-400', gradientStartBgDark: 'from-purple-500/40',
        textGradientLight: 'from-purple-700', textGradientDark: 'from-purple-500',
        progressBg: 'from-purple-500', progressBgDark: 'from-purple-400',
        gradientToLight: 'to-pink-500', gradientToDark: 'to-pink-400', gradientToDarkIcon: 'to-pink-500/40',
        tabBorderLight: 'border-purple-200', tabBgLight: 'bg-purple-600/20', tabBgDark: 'bg-purple-400/10',
        tabHoverBorderDark: 'hover:border-purple-300', tabHoverBgDark: 'hover:bg-purple-500/10',
        overlayLight: 'from-blue-600/50 to-purple-600/50', overlayDark: 'from-blue-950/60 to-purple-950/70',
      },
      blue: {
        shadowText: 'shadow-blue-500/10', shadowTextDark: 'shadow-blue-500/20',
        accentText: 'text-blue-600', accentTextDark: 'text-blue-400',
        accentBg: 'bg-blue-50/80', accentBgDark: 'bg-blue-500/20',
        accentBorder: 'border-blue-200/50', accentBorderDark: 'border-blue-400/30',
        accentHover: 'hover:bg-blue-100/80', accentHoverDark: 'hover:bg-blue-500/30',
        gradientFrom: 'from-blue-600', gradientFromDark: 'from-blue-400',
        gradientStartBg: 'from-blue-400', gradientStartBgDark: 'from-blue-500/40',
        textGradientLight: 'from-blue-700', textGradientDark: 'from-blue-500',
        progressBg: 'from-blue-500', progressBgDark: 'from-blue-400',
        gradientToLight: 'to-cyan-500', gradientToDark: 'to-cyan-400', gradientToDarkIcon: 'to-cyan-500/40',
        tabBorderLight: 'border-blue-200', tabBgLight: 'bg-blue-600/20', tabBgDark: 'bg-blue-400/10',
        tabHoverBorderDark: 'hover:border-blue-300', tabHoverBgDark: 'hover:bg-blue-500/10',
        overlayLight: 'from-sky-600/50 to-blue-600/50', overlayDark: 'from-sky-950/60 to-blue-950/70',
      },
      green: {
        shadowText: 'shadow-green-500/10', shadowTextDark: 'shadow-green-500/20',
        accentText: 'text-green-600', accentTextDark: 'text-green-400',
        accentBg: 'bg-green-50/80', accentBgDark: 'bg-green-500/20',
        accentBorder: 'border-green-200/50', accentBorderDark: 'border-green-400/30',
        accentHover: 'hover:bg-green-100/80', accentHoverDark: 'hover:bg-green-500/30',
        gradientFrom: 'from-green-600', gradientFromDark: 'from-green-400',
        gradientStartBg: 'from-green-400', gradientStartBgDark: 'from-green-500/40',
        textGradientLight: 'from-green-700', textGradientDark: 'from-green-500',
        progressBg: 'from-green-500', progressBgDark: 'from-green-400',
        gradientToLight: 'to-emerald-500', gradientToDark: 'to-emerald-400', gradientToDarkIcon: 'to-emerald-500/40',
        tabBorderLight: 'border-green-200', tabBgLight: 'bg-green-600/20', tabBgDark: 'bg-green-400/10',
        tabHoverBorderDark: 'hover:border-green-300', tabHoverBgDark: 'hover:bg-green-500/10',
        overlayLight: 'from-teal-600/50 to-green-600/50', overlayDark: 'from-teal-950/60 to-green-950/70',
      },
      rose: {
        shadowText: 'shadow-rose-500/10', shadowTextDark: 'shadow-rose-500/20',
        accentText: 'text-rose-600', accentTextDark: 'text-rose-400',
        accentBg: 'bg-rose-50/80', accentBgDark: 'bg-rose-500/20',
        accentBorder: 'border-rose-200/50', accentBorderDark: 'border-rose-400/30',
        accentHover: 'hover:bg-rose-100/80', accentHoverDark: 'hover:bg-rose-500/30',
        gradientFrom: 'from-rose-600', gradientFromDark: 'from-rose-400',
        gradientStartBg: 'from-rose-400', gradientStartBgDark: 'from-rose-500/40',
        textGradientLight: 'from-rose-700', textGradientDark: 'from-rose-500',
        progressBg: 'from-rose-500', progressBgDark: 'from-rose-400',
        gradientToLight: 'to-orange-500', gradientToDark: 'to-orange-400', gradientToDarkIcon: 'to-orange-500/40',
        tabBorderLight: 'border-rose-200', tabBgLight: 'bg-rose-600/20', tabBgDark: 'bg-rose-400/10',
        tabHoverBorderDark: 'hover:border-rose-300', tabHoverBgDark: 'hover:bg-rose-500/10',
        overlayLight: 'from-pink-600/50 to-rose-600/50', overlayDark: 'from-pink-950/60 to-rose-950/70',
      },
      amber: {
        shadowText: 'shadow-amber-500/10', shadowTextDark: 'shadow-amber-500/20',
        accentText: 'text-amber-600', accentTextDark: 'text-amber-400',
        accentBg: 'bg-amber-50/80', accentBgDark: 'bg-amber-500/20',
        accentBorder: 'border-amber-200/50', accentBorderDark: 'border-amber-400/30',
        accentHover: 'hover:bg-amber-100/80', accentHoverDark: 'hover:bg-amber-500/30',
        gradientFrom: 'from-amber-600', gradientFromDark: 'from-amber-400',
        gradientStartBg: 'from-amber-400', gradientStartBgDark: 'from-amber-500/40',
        textGradientLight: 'from-amber-700', textGradientDark: 'from-amber-500',
        progressBg: 'from-amber-500', progressBgDark: 'from-amber-400',
        gradientToLight: 'to-orange-500', gradientToDark: 'to-yellow-400', gradientToDarkIcon: 'to-yellow-400/40',
        tabBorderLight: 'border-amber-200', tabBgLight: 'bg-amber-600/20', tabBgDark: 'bg-amber-400/10',
        tabHoverBorderDark: 'hover:border-amber-300', tabHoverBgDark: 'hover:bg-amber-500/10',
        overlayLight: 'from-yellow-600/50 to-amber-600/50', overlayDark: 'from-yellow-950/60 to-amber-950/70',
      },
      orange: {
        shadowText: 'shadow-orange-500/10', shadowTextDark: 'shadow-orange-500/20',
        accentText: 'text-orange-600', accentTextDark: 'text-orange-400',
        accentBg: 'bg-orange-50/80', accentBgDark: 'bg-orange-500/20',
        accentBorder: 'border-orange-200/50', accentBorderDark: 'border-orange-400/30',
        accentHover: 'hover:bg-orange-100/80', accentHoverDark: 'hover:bg-orange-500/30',
        gradientFrom: 'from-orange-600', gradientFromDark: 'from-orange-400',
        gradientStartBg: 'from-orange-400', gradientStartBgDark: 'from-orange-500/40',
        textGradientLight: 'from-orange-700', textGradientDark: 'from-orange-500',
        progressBg: 'from-orange-500', progressBgDark: 'from-orange-400',
        gradientToLight: 'to-red-500', gradientToDark: 'to-red-400', gradientToDarkIcon: 'to-red-500/40',
        tabBorderLight: 'border-orange-200', tabBgLight: 'bg-orange-600/20', tabBgDark: 'bg-orange-400/10',
        tabHoverBorderDark: 'hover:border-orange-300', tabHoverBgDark: 'hover:bg-orange-500/10',
        overlayLight: 'from-amber-600/50 to-orange-600/50', overlayDark: 'from-amber-950/60 to-orange-950/70',
      },
      teal: {
        shadowText: 'shadow-teal-500/10', shadowTextDark: 'shadow-teal-500/20',
        accentText: 'text-teal-600', accentTextDark: 'text-teal-400',
        accentBg: 'bg-teal-50/80', accentBgDark: 'bg-teal-500/20',
        accentBorder: 'border-teal-200/50', accentBorderDark: 'border-teal-400/30',
        accentHover: 'hover:bg-teal-100/80', accentHoverDark: 'hover:bg-teal-500/30',
        gradientFrom: 'from-teal-600', gradientFromDark: 'from-teal-400',
        gradientStartBg: 'from-teal-400', gradientStartBgDark: 'from-teal-500/40',
        textGradientLight: 'from-teal-700', textGradientDark: 'from-teal-500',
        progressBg: 'from-teal-500', progressBgDark: 'from-teal-400',
        gradientToLight: 'to-emerald-500', gradientToDark: 'to-emerald-400', gradientToDarkIcon: 'to-emerald-500/40',
        tabBorderLight: 'border-teal-200', tabBgLight: 'bg-teal-600/20', tabBgDark: 'bg-teal-400/10',
        tabHoverBorderDark: 'hover:border-teal-300', tabHoverBgDark: 'hover:bg-teal-500/10',
        overlayLight: 'from-cyan-600/50 to-teal-600/50', overlayDark: 'from-cyan-950/60 to-teal-950/70',
      },
      indigo: {
        shadowText: 'shadow-indigo-500/10', shadowTextDark: 'shadow-indigo-500/20',
        accentText: 'text-indigo-600', accentTextDark: 'text-indigo-400',
        accentBg: 'bg-indigo-50/80', accentBgDark: 'bg-indigo-500/20',
        accentBorder: 'border-indigo-200/50', accentBorderDark: 'border-indigo-400/30',
        accentHover: 'hover:bg-indigo-100/80', accentHoverDark: 'hover:bg-indigo-500/30',
        gradientFrom: 'from-indigo-600', gradientFromDark: 'from-indigo-400',
        gradientStartBg: 'from-indigo-400', gradientStartBgDark: 'from-indigo-500/40',
        textGradientLight: 'from-indigo-700', textGradientDark: 'from-indigo-500',
        progressBg: 'from-indigo-500', progressBgDark: 'from-indigo-400',
        gradientToLight: 'to-purple-500', gradientToDark: 'to-purple-400', gradientToDarkIcon: 'to-purple-500/40',
        tabBorderLight: 'border-indigo-200', tabBgLight: 'bg-indigo-600/20', tabBgDark: 'bg-indigo-400/10',
        tabHoverBorderDark: 'hover:border-indigo-300', tabHoverBgDark: 'hover:bg-indigo-500/10',
        overlayLight: 'from-blue-600/50 to-indigo-600/50', overlayDark: 'from-blue-950/60 to-indigo-950/70',
      },
      pink: {
        shadowText: 'shadow-pink-500/10', shadowTextDark: 'shadow-pink-500/20',
        accentText: 'text-pink-600', accentTextDark: 'text-pink-400',
        accentBg: 'bg-pink-50/80', accentBgDark: 'bg-pink-500/20',
        accentBorder: 'border-pink-200/50', accentBorderDark: 'border-pink-400/30',
        accentHover: 'hover:bg-pink-100/80', accentHoverDark: 'hover:bg-pink-500/30',
        gradientFrom: 'from-pink-600', gradientFromDark: 'from-pink-400',
        gradientStartBg: 'from-pink-400', gradientStartBgDark: 'from-pink-500/40',
        textGradientLight: 'from-pink-700', textGradientDark: 'from-pink-500',
        progressBg: 'from-pink-500', progressBgDark: 'from-pink-400',
        gradientToLight: 'to-rose-500', gradientToDark: 'to-rose-400', gradientToDarkIcon: 'to-rose-500/40',
        tabBorderLight: 'border-pink-200', tabBgLight: 'bg-pink-600/20', tabBgDark: 'bg-pink-400/10',
        tabHoverBorderDark: 'hover:border-pink-300', tabHoverBgDark: 'hover:bg-pink-500/10',
        overlayLight: 'from-rose-600/50 to-pink-600/50', overlayDark: 'from-rose-950/60 to-pink-950/70',
      },
      emerald: {
        shadowText: 'shadow-emerald-500/10', shadowTextDark: 'shadow-emerald-500/20',
        accentText: 'text-emerald-600', accentTextDark: 'text-emerald-400',
        accentBg: 'bg-emerald-50/80', accentBgDark: 'bg-emerald-500/20',
        accentBorder: 'border-emerald-200/50', accentBorderDark: 'border-emerald-400/30',
        accentHover: 'hover:bg-emerald-100/80', accentHoverDark: 'hover:bg-emerald-500/30',
        gradientFrom: 'from-emerald-600', gradientFromDark: 'from-emerald-400',
        gradientStartBg: 'from-emerald-400', gradientStartBgDark: 'from-emerald-500/40',
        textGradientLight: 'from-emerald-700', textGradientDark: 'from-emerald-500',
        progressBg: 'from-emerald-500', progressBgDark: 'from-emerald-400',
        gradientToLight: 'to-teal-500', gradientToDark: 'to-teal-400', gradientToDarkIcon: 'to-teal-500/40',
        tabBorderLight: 'border-emerald-200', tabBgLight: 'bg-emerald-600/20', tabBgDark: 'bg-emerald-400/10',
        tabHoverBorderDark: 'hover:border-emerald-300', tabHoverBgDark: 'hover:bg-emerald-500/10',
        overlayLight: 'from-teal-600/50 to-emerald-600/50', overlayDark: 'from-teal-950/60 to-emerald-950/70',
      }
    };
    
    // Fallback if color is not found
    const c = colorMap[accentColor] || colorMap['purple'];
    
    if (theme === 'light') {
      return {
        bg: 'bg-white/95',
        cardBg: 'bg-white/95',
        text: 'text-gray-900',
        textSecondary: 'text-gray-700',
        textTertiary: 'text-gray-600',
        border: 'border-gray-200',
        hover: 'hover:bg-gray-50',
        inputBg: 'bg-white/90',
        shadow: `shadow-2xl ${c.shadowText}`,
        accent: c.accentText,
        accentBg: c.accentBg,
        accentBorder: c.accentBorder,
        accentHover: c.accentHover,
        gradientText: `bg-gradient-to-r ${c.gradientFrom} ${c.gradientToLight} bg-clip-text text-transparent`,
        gradientStartBg: c.gradientStartBg,
        textGradient: c.textGradientLight,
        progressBg: c.progressBg,
        gradientTo: c.gradientToLight,
        iconGradientTo: c.gradientToLight,
        tabBorder: c.tabBorderLight,
        tabBg: c.tabBgLight,
        tabActive: `border-b-2 border-current ${c.accentText} font-semibold ${c.tabBgLight}`,
        tabInactive: 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300',
        tabHoverBorder: '',
        tabHoverBg: '',
        bgOverlay: c.overlayLight,
        transition: 'transition-all duration-300 ease-in-out'
      };
    }
    return {
      bg: 'bg-transparent',
      cardBg: 'bg-black/75',
      text: 'text-white',
      textSecondary: 'text-gray-200',
      textTertiary: 'text-gray-300',
      border: 'border-white/30',
      hover: 'hover:bg-white/10',
      inputBg: 'bg-white/5',
      shadow: `shadow-2xl ${c.shadowTextDark}`,
      accent: c.accentTextDark,
      accentBg: c.accentBgDark,
      accentBorder: c.accentBorderDark,
      accentHover: c.accentHoverDark,
      gradientText: `bg-gradient-to-r ${c.gradientFromDark} ${c.gradientToDark} bg-clip-text text-transparent`,
      gradientStartBg: c.gradientStartBgDark,
      textGradient: c.textGradientDark,
      progressBg: c.progressBgDark,
      gradientTo: c.gradientToDark,
      iconGradientTo: c.gradientToDarkIcon,
      tabBorder: 'border-gray-500',
      tabBg: c.tabBgDark,
      tabActive: `border-b-2 border-white text-white font-semibold ${c.tabBgDark}`,
      tabInactive: `border-transparent text-gray-200 hover:text-white ${c.tabHoverBorderDark} ${c.tabHoverBgDark}`,
      tabHoverBorder: c.tabHoverBorderDark,
      tabHoverBg: c.tabHoverBgDark,
      bgOverlay: c.overlayDark,
      transition: 'transition-all duration-300 ease-in-out'
    };
  };

  const styles = getThemeStyles();

  // 1. Fetch Multiple Choice Quiz background
  useEffect(() => {
    const fetchPreviousSubmission = async () => {
      if (moduleData?.disableQuiz) {
        setIsFetchingQuiz(false);
        return;
      }
      if (!user?.id || !moduleData?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('quiz_submissions')
          .select('*')
          .eq('user_id', user.id)
          .eq('module_id', String(moduleData.id))
          .limit(1)
          .maybeSingle();
          
        if (error) throw error;
        if (data) {
          setQuizAnswers(data.answers || {});
          setShowQuizResults(true);
        }
      } catch (err) {
        console.error("Error fetching previous quiz submission:", err);
      } finally {
        setIsFetchingQuiz(false);
      }
    };
    fetchPreviousSubmission();
  }, [user?.id, moduleData?.id, moduleData?.disableQuiz]);

  // 2. Fetch AI Quiz background
  useEffect(() => {
    const fetchPreviousAiSubmission = async () => {
      if (moduleData?.disableQuiz) {
        setIsFetchingAiQuiz(false);
        return;
      }
      if (!user?.id || !moduleData?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('ai_quiz_submissions')
          .select('*')
          .eq('user_id', user.id)
          .eq('module_id', String(moduleData.id))
          .limit(1)
          .maybeSingle();
          
        if (error) throw error;
        if (data) {
          setAiQuizAnswers(data.answers || {});
          setGradingResults(data.grading_results || null);
          if (data.grading_results?.results) {
             const expanded = {};
             data.grading_results.results.forEach(r => { expanded[r.questionId] = true; });
             setExpandedResults(expanded);
          }
        }
      } catch (err) {
        console.error("Error fetching previous AI quiz submission:", err);
      } finally {
        setIsFetchingAiQuiz(false);
      }
    };
    fetchPreviousAiSubmission();
  }, [user?.id, moduleData?.id, moduleData?.disableQuiz]);

  // 3. Calculate Progress AND Save to Database (multiple choice quiz only)
  useEffect(() => {
    if (moduleData?.disableProgress) {
      setProgressPercentage(0);
      return;
    }
    const hasQuizTask = !moduleData?.disableQuiz;

    if (hasQuizTask && isFetchingQuiz) return;

    const isMCQuizDone = showQuizResults;
    const calculatedProgress = hasQuizTask ? (isMCQuizDone ? 100 : 0) : 0;
    setProgressPercentage(calculatedProgress);

    // Save to Database
    const saveProgressToDB = async () => {
      if (!user?.id || !moduleData?.id) return;
      
      try {
        const { error } = await supabase
          .from('user_module_progress')
          .upsert(
            {
              user_id: user.id,
              module_id: String(moduleData.id),
              progress_percentage: calculatedProgress,
              updated_at: new Date().toISOString()
            },
            { onConflict: 'user_id, module_id' }
          );

        if (error) throw error;
      } catch (err) {
        console.error("Error saving module progress to DB:", err);
      }
    };

    saveProgressToDB();

  }, [isFetchingQuiz, showQuizResults, moduleData, user?.id]);

  const downloadFile = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      window.open(url, '_blank');
    }
  };

  const switchTab = (tabId) => {
    setActiveTab(tabId);
    
    // Resetting question index when re-entering the quiz tab is fine
    // But we NO LONGER force setShowQuizResults to false here so your results persist
    if (tabId === 'quiz') {
      setCurrentQuestionIndex(0);
      setQuizSubTab('multiple-choice');
    }
  };

  if (!moduleData) {
    return <div>Loading module...</div>;
  }

  // Dynamically build available tabs based on data presence (or an explicit override in module data)
  const navTabs = Array.isArray(moduleData?.tabs) && moduleData.tabs.length > 0
    ? moduleData.tabs
    : (() => {
        const tabs = ['overview', 'course'];
        if (courseContent?.videoResources && courseContent.videoResources.length > 0) {
          tabs.push('videos');
        }
        if (!moduleData?.disableQuiz) {
          tabs.push('quiz');
        }
        if (additionalResources && additionalResources.length > 0) {
          tabs.push('resources');
        }
        return tabs;
      })();

  return (
    <div className={`min-h-screen relative ${styles.transition}`}>
      <PdfViewerModal 
        viewingPdf={viewingPdf} 
        setViewingPdf={setViewingPdf} 
        downloadFile={downloadFile} 
      />

      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-500"
        // style={{ backgroundImage: `url('/src/assets/bground.jpg')` }}
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div
          className={`absolute inset-0 transition-all duration-500 bg-gradient-to-br ${styles.bgOverlay}`}
          style={{
            backdropFilter: 'blur(2px)',
          }}
        />
      </div>

      <main className={`relative z-10 max-w-6xl mx-auto px-4 pt-12 pb-8 ${styles.transition}`}>
        <Link
          to="/modules"
          className={`fixed left-4 top-28 z-20 flex items-center justify-center w-10 h-10 rounded-full ${theme === 'light'
            ? 'bg-white hover:bg-gray-50 text-gray-900 hover:text-gray-950 shadow-xl hover:shadow-2xl backdrop-blur-md border border-gray-200'
            : 'bg-white/30 hover:bg-white/40 text-white hover:text-white backdrop-blur-md border-2 border-white/40 hover:border-white/60 shadow-2xl'
            } transition-all duration-300 hover:scale-110 ${styles.transition}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>

        {/* Module Header Container */}
        <div
          className={`rounded-[40px] overflow-hidden mb-6 relative ${theme === 'light'
            ? `bg-white/95 ${styles.shadow} border border-white/30`
            : `bg-black/75 backdrop-blur-xl border border-white/10 ${styles.shadow}`
            } ${styles.transition}`}
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className={`inline-block p-4 rounded-full ${theme === 'light'
                ? `bg-gradient-to-br ${styles.gradientStartBg} ${styles.iconGradientTo}`
                : `bg-gradient-to-br ${styles.gradientStartBg} ${styles.iconGradientTo} border border-white/10`
                } flex-shrink-0`}>
                <Book className="w-9 h-9 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className={`text-2xl md:text-3xl font-bold leading-tight bg-gradient-to-r ${styles.textGradient} ${styles.gradientTo} bg-clip-text text-transparent`}>
                  {title}
                </h1>
              </div>
            </div>
            <p className={`text-base leading-relaxed mt-4 md:mt-5 ${styles.textSecondary}`}>
              {shortDescription || description}
            </p>

            {/* PROGRESS BAR SECTION */}
            {!moduleData?.hideProgress && (
            <div className="mt-8 max-w-2xl">
              <div className="flex justify-between items-center mb-2">
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  Module Progress
                </span>
                
                {/* Dynamic Percentage Text Color */}
                <span className={`text-sm font-bold transition-all duration-1000 ${
                  progressPercentage === 100 
                    ? 'text-green-500' 
                    : `bg-gradient-to-r ${styles.progressBg} ${styles.gradientTo} bg-clip-text text-transparent`
                }`}>
                  {progressPercentage}%
                </span>
              </div>
              
              <div className={`w-full h-2.5 rounded-full overflow-hidden ${theme === 'light' ? 'bg-gray-200' : 'bg-white/10'}`}>
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    progressPercentage === 100 
                      ? 'bg-green-500' 
                      : `bg-gradient-to-r ${styles.progressBg} ${styles.gradientTo}`
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              
              {/* Progress Breakdown Indicators */}
              {!moduleData?.disableQuiz && (
              <div className="flex gap-4 mt-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${showQuizResults ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className={theme === 'light' ? 'text-gray-600' : 'text-gray-400'}>MC Quiz</span>
                  </div>
              </div>
              )}
            </div>
            )}

          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className={`border-b ${styles.tabBorder} ${styles.transition} overflow-x-auto`}>
            <nav className="flex space-x-8 min-w-max px-1">
              {navTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => switchTab(tab)}
                  className={`pb-4 text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeTab === tab
                    ? `${styles.tabActive} px-3 py-1 rounded-t-lg`
                    : `${styles.tabInactive} px-1`
                    }`}
                >
                  {tab === 'resources' ? 'Additional Resources' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === 'overview' && (
            <ModuleOverview objectives={objectives} learningOutcomes={learningOutcomes} theme={theme} styles={styles} />
          )}

          {activeTab === 'course' && (
            courseContent?.type === 'slides'
              ? (
                <Module18Course
                  courseContent={courseContent}
                  theme={theme}
                  styles={styles}
                />
              )
              : <ModuleCourse courseContent={courseContent} theme={theme} styles={styles} setViewingPdf={setViewingPdf} />
          )}

          {activeTab === 'videos' && (
            <ModuleVideos courseContent={courseContent} theme={theme} styles={styles} />
          )}

          {activeTab === 'quiz' && !moduleData?.disableQuiz && (
            <ModuleQuiz
              moduleData={moduleData} user={user} theme={theme} styles={styles}
              quizAnswers={quizAnswers} setQuizAnswers={setQuizAnswers}
              showQuizResults={showQuizResults} setShowQuizResults={setShowQuizResults}
              currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}
              quizSubTab={quizSubTab} setQuizSubTab={setQuizSubTab}
              isFetchingQuiz={isFetchingQuiz}
              aiQuizAnswers={aiQuizAnswers} setAiQuizAnswers={setAiQuizAnswers}
              gradingInProgress={gradingInProgress} setGradingInProgress={setGradingInProgress}
              gradingResults={gradingResults} setGradingResults={setGradingResults}
              gradingError={gradingError} setGradingError={setGradingError}
              expandedResults={expandedResults} setExpandedResults={setExpandedResults}
              isFetchingAiQuiz={isFetchingAiQuiz}
            />
          )}

          {/* Additional Resources Tab */}
          {activeTab === 'resources' && (
            <ModuleAdditionalResources
              additionalResources={additionalResources}
              theme={theme}
              styles={styles}
              downloadFile={downloadFile}
              setViewingPdf={setViewingPdf}
            />
          )}
        </div>
      </main>
    </div>
  );
}