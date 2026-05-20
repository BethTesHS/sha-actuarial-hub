// src/MyProgress.jsx
import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getShaThemeColors } from "./theme/sha";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calculator,
  Award,
  Gamepad2,
  Clock,
  PlayCircle,
  Calendar,
  Star,
  Trophy,
  Flame,
  Loader2,
  CheckCircle,
  Activity
} from "lucide-react";

import { supabase } from "./supabaseClient";
import { totalToolsCount } from "./ToolsPage";

// Import banner images
import gameBanner from "./assets/IFRS17-game-banner.jpg";
import learnBanner from "./assets/IFRS17-learn-banner.jpg";
import dataCleanupImg from "./assets/data-cleanup.jpg";
import pricingFundamentalsImg from "./assets/pricing-fundamentals.jpg";
import lrcImg from "./assets/lrc.jpg";
import giValuationsImg from "./assets/gi-valuations.jpg";
import capitalAdequacyImg from "./assets/capital-adequacy.jpg";
import finPerformanceImg from "./assets/financial-performance.jpg";
import premCertificatesImg from "./assets/premium-certificates.jpg";
import reinCertificatesImg from "./assets/reinsuarance-certificates.jpg";
import finConditionImg from "./assets/financial-condition.jpg";
import ifrs17Img from "./assets/ifrs-17.jpg";

// Carousel Slides for Dashboard
const carouselSlides = [
  {
    title: "Welcome Back!",
    subtitle: "Continue your actuarial journey",
    highlight: "Your Progress",
    gradient: "linear-gradient(135deg, #3B82F6 0%, #00E5FF 50%, #7C4DFF 100%)",
    cta: "Continue Learning",
    link: "/modules"
  },
  {
    image: gameBanner,
    link: "https://www.ifrs17game.com/"
  },
  {
    image: learnBanner,
    link: "https://learn17.com/"
  },
  {
    title: "IFRS 17 Training",
    subtitle: "Master the new standard",
    highlight: "Trending Now",
    gradient: "linear-gradient(135deg, #7C4DFF 0%, #9D4EDD 50%, #3B82F6 100%)",
    cta: "Start Module",
    link: "/modules"
  },
  {
    title: "Actuarial Tools",
    subtitle: "Professional valuation models",
    highlight: `${totalToolsCount} Tools`,
    gradient: "linear-gradient(135deg, #10B981 0%, #48C774 50%, #3B82F6 100%)",
    cta: "Access Tools",
    link: "/modules"
  },
];

export default function MyProgress({ theme = 'dark', user }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedModulesCount, setCompletedModulesCount] = useState(0);
  const [averageQuizScore, setAverageQuizScore] = useState(0);
  const [studyStreak, setStudyStreak] = useState(0);
  const [timeInvested, setTimeInvested] = useState("0m"); // New state for Time Invested
  const [isProgressLoading, setIsProgressLoading] = useState(true);
  const [isMetadataLoading, setIsMetadataLoading] = useState(true);
  const [moduleProgressData, setModuleProgressData] = useState([]);
  const [activityFilter, setActivityFilter] = useState('Recent');
  const navigate = useNavigate();

  const toProgressColors = (mode) => {
    const c = getShaThemeColors(mode);
    return {
      cyan: c.cyan,
      purple: c.purple,
      blue: c.blue,
      green: c.green,
      orange: c.orange,
      pink: c.purple,
      bg: c.bg,
      card: c.card,
      text: c.text,
      textSecondary: c.textSecondary,
    };
  };
  const colors = { dark: toProgressColors("dark"), light: toProgressColors("light") };

  const currentColors = theme === 'dark' ? colors.dark : colors.light;

  // SHA available modules (10–16 removed)
  const AVAILABLE_MODULE_IDS = useMemo(() => ([1, 2, 3, 4, 5, 6, 7, 8, 9]), []);

  // Fetch completed modules progress DIRECTLY from Supabase
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return;
      
      try {
        const { data, error } = await supabase
          .from('user_module_progress')
          .select('module_id, progress_percentage, updated_at')
          .eq('user_id', user.id);
          
        if (error) throw error;
        
        // Count how many modules have exactly 100% progress
        const completedCount = data ? data.filter(
          res => res.progress_percentage === 100
        ).length : 0;
        
        setCompletedModulesCount(completedCount);
        setModuleProgressData(data || []);

        // Fetch quiz scores
        const { data: quizData, error: quizError } = await supabase
          .from('quiz_submissions')
          .select('score, total_questions')
          .eq('user_id', user.id);
          
        if (quizError) throw quizError;
        
        if (quizData && quizData.length > 0) {
          let totalPercentage = 0;
          let validQuizzes = 0;
          
          quizData.forEach(submission => {
            if (submission.total_questions > 0) {
              totalPercentage += (submission.score / submission.total_questions) * 100;
              validQuizzes++;
            }
          });
          
          setAverageQuizScore(validQuizzes > 0 ? Math.round(totalPercentage / validQuizzes) : 0);
        } else {
          setAverageQuizScore(0);
        }
      } catch (error) {
        console.error("Failed to fetch module progress or quiz scores from Supabase:", error);
      } finally {
        setIsProgressLoading(false);
      }
    };

    fetchProgress();
  }, [user]);

  // Calculate and Update Daily Login Streak & Time Invested
  useEffect(() => {
    const fetchUserMetadata = async () => {
      if (!user?.id) return;
      
      try {
        // Get freshest user data from Supabase Auth
        const { data: { user: authUser }, error } = await supabase.auth.getUser();
        if (error || !authUser) return;

        const metadata = authUser.user_metadata || {};
        
        // 1. Process Time Invested
        const totalSeconds = metadata.total_time_invested || 0;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        setTimeInvested(hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`);

        // 2. Process Study Streak
        const lastLoginStr = metadata.last_login_date;
        let currentStreak = metadata.streak_count || 0;

        const today = new Date();
        const todayStr = today.toDateString(); 

        if (lastLoginStr !== todayStr) {
          today.setHours(0, 0, 0, 0);
          const lastLogin = lastLoginStr ? new Date(lastLoginStr) : new Date(0);
          lastLogin.setHours(0, 0, 0, 0);

          const diffTime = today.getTime() - lastLogin.getTime();
          const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

          if (diffDays === 1) {
            currentStreak += 1; // Logged in yesterday, increment
          } else if (diffDays > 1 || !lastLoginStr) {
            currentStreak = 1; // Missed a day, reset
          }

          // Update user metadata in Supabase
          await supabase.auth.updateUser({
            data: {
              last_login_date: todayStr,
              streak_count: currentStreak
            }
          });
        }

        setStudyStreak(currentStreak);
      } catch (err) {
        console.error("Failed to calculate streak or time:", err);
      } finally {
        setIsMetadataLoading(false);
      }
    };

    fetchUserMetadata();
  }, [user]);

  // Carousel auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);

  const handleSlideClick = (link) => {
    if (link.startsWith('http')) {
      window.open(link, '_blank');
    } else {
      navigate(link);
    }
  };

  // Calculate dynamic progress bar percentage
  const overallProgressPercentage = Math.round((completedModulesCount / AVAILABLE_MODULE_IDS.length) * 100) || 0;

  // Dashboard Quick Stats
  const quickStats = [
    { label: "Modules Completed", value: `${completedModulesCount}/${AVAILABLE_MODULE_IDS.length}`, icon: <BookOpen className="w-5 h-5" />, color: currentColors.cyan, progress: overallProgressPercentage, isLoading: isProgressLoading },
    { label: "Study Streak", value: `${studyStreak} day${studyStreak !== 1 ? 's' : ''}`, icon: <Flame className="w-5 h-5" />, color: currentColors.orange, badge: "🔥", isLoading: isMetadataLoading },
    { label: "Multiple Choice Quiz Score Average", value: `${averageQuizScore}%`, icon: <Trophy className="w-5 h-5" />, color: currentColors.green, isLoading: isProgressLoading },
    { label: "Time Invested", value: timeInvested, icon: <Clock className="w-5 h-5" />, color: currentColors.purple, isLoading: isMetadataLoading }
  ];

  const allModules = [
    { id: 1, name: "GI Data Clean Up", color: currentColors.purple, image: dataCleanupImg },
    { id: 2, name: "Pricing Fundamentals", color: currentColors.blue, image: pricingFundamentalsImg },
    { id: 3, name: "Liability for Remaining Coverage (LRC)", color: currentColors.cyan, image: lrcImg },
    { id: 4, name: "General Insurance Valuations", color: currentColors.green, image: giValuationsImg },
    { id: 5, name: "Capital Adequacy Analysis", color: currentColors.orange, image: capitalAdequacyImg },
    { id: 6, name: "Financial Performance Analysis", color: currentColors.pink, image: finPerformanceImg },
    { id: 7, name: "Premium Certificates", color: currentColors.purple, image: premCertificatesImg },
    { id: 8, name: "Reinsurance Certificates", color: currentColors.blue, image: reinCertificatesImg },
    { id: 9, name: "Financial Condition Report (FCR)", color: currentColors.cyan, image: finConditionImg },
  ];

  // Helper for formatting time elapsed
  const timeAgo = (dateString) => {
    if (!dateString) return '';
    const diff = new Date() - new Date(dateString);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return hours === 0 ? 'Just now' : `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    return days === 1 ? 'Yesterday' : `${days} days ago`;
  };

  // Compute filtered modules
  const getFilteredModules = () => {
    const progressMap = {};
    moduleProgressData.forEach(p => {
      progressMap[p.module_id] = p;
    });

    const modulesWithProgress = allModules.map(m => {
      const p = progressMap[m.id];
      return {
        ...m,
        progress: p ? p.progress_percentage || 0 : 0,
        updated_at: p ? p.updated_at : null,
        timeAgo: p && p.updated_at ? timeAgo(p.updated_at) : 'Not started'
      };
    });

    switch (activityFilter) {
      case 'Recent':
        return modulesWithProgress
          .filter(m => m.updated_at)
          .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
          .slice(0, 5);
      case 'In Progress':
        return modulesWithProgress
          .filter(m => m.progress > 0 && m.progress < 100)
          .sort((a, b) => a.id - b.id);
      case 'Completed':
        return modulesWithProgress
          .filter(m => m.progress === 100)
          .sort((a, b) => a.id - b.id);
      case 'New':
        return modulesWithProgress
          .filter(m => m.progress === 0)
          .sort((a, b) => a.id - b.id);
      default:
        return [];
    }
  };

  const filteredActivities = getFilteredModules();

  return (
    <div className="min-h-screen pt-16 transition-colors duration-300" style={{ background: currentColors.bg }}>
      {/* SVG Gradient Definitions */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id={`starGradient-${theme}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={theme === 'dark' ? currentColors.cyan : currentColors.purple} />
            <stop offset="100%" stopColor={theme === 'dark' ? currentColors.cyan : currentColors.blue} />
          </linearGradient>
        </defs>
      </svg>
      {/* HERO CAROUSEL */}
      {/* <div className="relative">
        <div className="relative h-[300px] md:h-[350px] overflow-hidden" style={{ background: theme === 'dark' ? '#0A0F1E' : '#FFFFFF' }}>
          {carouselSlides.map((slide, i) => (
            <div
              key={i}
              onClick={slide.image ? () => handleSlideClick(slide.link) : undefined}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                currentSlide === i ? 'opacity-100 translate-x-0' : i < currentSlide ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
              } ${slide.image ? 'cursor-pointer' : ''}`}
              style={!slide.image ? { background: slide.gradient } : {}}
            >
              {slide.image ? (
                // PURE IMAGE BANNERS
                <div className="w-full h-full flex items-center justify-center">
                  <img 
                    src={slide.image} 
                    alt="Featured Banner" 
                    className="w-full h-full object-cover object-center" 
                  />
                </div>
              ) : (
                // TEXT & GRADIENT SLIDES
                <>
                  <div className="absolute inset-0 overflow-hidden z-0">
                    <div className="absolute top-10 right-10 w-64 h-64 rounded-full blur-3xl opacity-30" style={{ background: theme === 'dark' ? currentColors.cyan : 'white' }} />
                    <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: theme === 'dark' ? currentColors.purple : 'white' }} />
                    <div className="absolute inset-0" style={{
                      backgroundImage: `linear-gradient(${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'} 1px, transparent 1px)`,
                      backgroundSize: '50px 50px',
                      opacity: 0.3
                    }} />
                  </div>

                  <div className="relative z-10 h-full max-w-7xl mx-auto px-4 lg:px-8 flex items-center">
                    <div className="w-full">
                      <div className="max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 md:mb-6"
                          style={{
                            background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.8)',
                            border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`
                          }}>
                          <Sparkles className="w-4 h-4" style={{ color: currentColors.cyan }} />
                          <span className="text-sm font-semibold" style={{ color: theme === 'dark' ? 'white' : currentColors.text }}>{slide.highlight}</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 leading-tight" style={{ color: theme === 'dark' ? 'white' : '#1A1F2E' }}>
                          {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl mb-6 md:mb-8" style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)' }}>
                          {slide.subtitle}
                        </p>
                        <button
                          onClick={() => handleSlideClick(slide.link)}
                          className="px-6 py-3 md:px-8 md:py-4 rounded-xl font-bold text-base md:text-lg flex items-center gap-3 transition-all hover:scale-105 hover:shadow-2xl relative z-20"
                          style={{
                            background: currentColors.cyan,
                            boxShadow: `0 10px 40px ${currentColors.cyan}50`,
                            color: theme === 'dark' ? '#1A1F2E' : 'white'
                          }}
                        >
                          {slide.cta}
                          <ArrowRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}

          <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 md:p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-30">
            {carouselSlides.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setCurrentSlide(i); }}
                className={`h-2 md:h-3 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-8 md:w-10' : 'w-2 md:w-3'}`}
                style={{
                  background: currentSlide === i
                    ? (theme === 'dark' ? 'white' : currentColors.cyan)
                    : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'),
                  boxShadow: currentSlide === i ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                }} />
            ))}
          </div>
        </div>
      </div> */}

      {/* DASHBOARD CONTENT */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                background: theme === 'dark' ? currentColors.card : 'white',
                borderColor: `${stat.color}30`,
                boxShadow: theme === 'dark' ? `0 4px 20px ${stat.color}15` : '0 2px 15px rgba(0,0,0,0.08)'
              }}>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl" style={{ background: `${stat.color}20`, color: stat.color }}>
                  {stat.icon}
                </div>
                {stat.badge && <span className="text-2xl">{stat.badge}</span>}
                {stat.trend && <span className="text-sm font-bold" style={{ color: currentColors.green }}>{stat.trend}</span>}
              </div>
              
              {stat.isLoading ? (
                <div className="text-3xl font-black mb-1 flex items-center h-[36px]">
                  <Loader2 className="w-[1em] h-[1em] animate-spin" style={{ color: stat.color }} />
                </div>
              ) : (
                <div className="text-3xl font-black mb-1" style={{ color: currentColors.text }}>{stat.value}</div>
              )}
              
              <div className="text-sm" style={{ color: currentColors.textSecondary }}>{stat.label}</div>
              {stat.progress !== undefined && (
                <div className="mt-4">
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${stat.progress}%`, background: stat.color }} />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activities Filter - Takes 1 column */}
          <div className="p-6 rounded-2xl border h-[540px] flex flex-col" style={{
            background: theme === 'dark' ? currentColors.card : 'white',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <h2 className="text-xl font-bold" style={{ color: currentColors.text }}>Activities</h2>
              <Activity className="w-5 h-5" style={{ color: currentColors.cyan }} />
            </div>
            <div className="py-4 space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {['Recent', 'In Progress', 'Completed', 'New'].map((filter) => (
                <div 
                  key={filter} 
                  onClick={() => setActivityFilter(filter)}
                  className={`m-2 py-6 p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer flex justify-between items-center`} 
                  style={{
                    background: activityFilter === filter ? (theme === 'dark' ? `${currentColors.cyan}20` : `${currentColors.cyan}10`) : (theme === 'dark' ? currentColors.card : 'white'),
                    borderColor: activityFilter === filter ? currentColors.cyan : (theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)')
                  }}
                >
                  <span className="font-semibold" style={{ color: activityFilter === filter ? currentColors.cyan : currentColors.text }}>
                    {filter}
                  </span>
                  {activityFilter === filter && <CheckCircle className="w-4 h-4" style={{ color: currentColors.cyan }} />}
                </div>
              ))}
            </div>
          </div>

          {/* Activities List - Takes 2 columns */}
          <div className="lg:col-span-2 p-6 rounded-2xl border h-[540px] flex flex-col" style={{
            background: theme === 'dark' ? currentColors.card : 'white',
            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'
          }}>
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <h2 className="text-2xl font-bold" style={{ color: currentColors.text }}>{activityFilter} Activities</h2>
              <button 
                onClick={() => navigate('/modules')} 
                className="text-sm font-semibold flex items-center gap-2 hover:opacity-70 transition" 
                style={{ color: currentColors.cyan }}
              >
                View All <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {filteredActivities.length === 0 ? (
              <div className="text-center py-8 flex-1" style={{ color: currentColors.textSecondary }}>
                No modules found in this category.
              </div>
            ) : (
              <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {filteredActivities.map((activity, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigate(`/modules/${activity.id}`)} 
                    className="p-4 rounded-xl border transition-all hover:scale-[1.02] cursor-pointer flex gap-4" 
                    style={{
                      background: theme === 'dark' ? `${activity.color}10` : currentColors.card,
                      borderColor: `${activity.color}30`
                    }}
                  >
                    {/* Thumbnail Image */}
                    <div className="hidden sm:block w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                      <img 
                        src={activity.image} 
                        alt={activity.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <PlayCircle className="w-5 h-5 flex-shrink-0" style={{ color: activity.color }} />
                          <span className="font-semibold line-clamp-1" style={{ color: currentColors.text }}>
                            Module {activity.id}: {activity.name}
                          </span>
                        </div>
                        <span className="text-xs flex-shrink-0 ml-2" style={{ color: currentColors.textSecondary }}>
                          {activity.timeAgo}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
                          <div 
                            className="h-full rounded-full transition-all" 
                            style={{ width: `${Math.round(activity.progress)}%`, background: activity.color }} 
                          />
                        </div>
                        <span className="text-sm font-bold flex-shrink-0" style={{ color: activity.color }}>
                          {Math.round(activity.progress)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        {/* <div>
          <h2 className="text-2xl font-bold mb-6" style={{ color: currentColors.text }}>Quick Access</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, i) => (
              <div key={i}
                onClick={() => action.link.startsWith('http') ? window.open(action.link, '_blank') : navigate(action.link)}
                className="group p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 cursor-pointer"
                style={{
                  background: theme === 'dark' ? `${action.color}10` : 'white',
                  borderColor: `${action.color}30`,
                  boxShadow: theme === 'dark' ? `0 4px 20px ${action.color}15` : '0 2px 15px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 15px 50px ${action.color}40` : `0 10px 30px ${action.color}30`;
                  e.currentTarget.style.borderColor = `${action.color}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 4px 20px ${action.color}15` : '0 2px 15px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = `${action.color}30`;
                }}>
                <div className="p-3 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3"
                  style={{ background: `${action.color}20`, color: action.color }}>
                  {action.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: currentColors.text }}>{action.title}</h3>
                <p className="text-sm" style={{ color: currentColors.textSecondary }}>{action.desc}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Achievement Section */}
        {/* <div className="p-8 rounded-2xl border relative overflow-hidden" style={{
          background: theme === 'dark' ? `linear-gradient(135deg, ${currentColors.cyan}20, ${currentColors.purple}20)` : `linear-gradient(135deg, ${currentColors.cyan}10, ${currentColors.purple}10)`,
          borderColor: theme === 'dark' ? `${currentColors.cyan}40` : `${currentColors.cyan}100`
        }}>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" style={{ background: `${currentColors.cyan}20`, border: `1px solid ${currentColors.cyan}40` }}>
                <Star className="w-4 h-4" style={{
                  fill: `url(#starGradient-${theme})`,
                  stroke: `url(#starGradient-${theme})`
                }} />
                <span className="text-sm font-semibold" style={{
                  ...(theme === 'dark'
                    ? { color: currentColors.cyan }
                    : {
                      background: `linear-gradient(135deg, ${currentColors.purple} 0%, ${currentColors.blue} 100%)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    })
                }}>Achievement Unlocked!</span>
              </div>
              <h3 className="text-2xl font-bold mb-2" style={{ color: currentColors.text }}>Keep Up The Great Work!</h3>
              <p className="text-lg mb-6" style={{ color: currentColors.textSecondary }}>You're on a 12-day learning streak. Complete today's module to maintain your momentum!</p>
              <button onClick={() => navigate('/modules')} className="px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all hover:scale-105" style={{
                background: currentColors.cyan,
                color: theme === 'dark' ? '#1A1F2E' : 'white',
                boxShadow: `0 10px 30px ${currentColors.cyan}40`
              }}>
                Continue Learning <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            <div className="text-6xl">🏆</div>
          </div>
        </div> */}
      </div>
    </div>
  );
}