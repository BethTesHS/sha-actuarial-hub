// src/HomePage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronLeft, ChevronRight, Sparkles, ArrowRight, Brain, Target,
  Shield, TrendingUp, Users, GraduationCap, Calculator, BookOpen,
  Award, Gamepad2, CheckCircle2, Trophy, Compass, Rocket, Star,
} from "lucide-react";
import { supabase } from "./supabaseClient";
import { totalToolsCount } from "./ToolsPage";
import ActuarialTrainingHubSlide from "./components/CarouselSlides/ActuarialTrainingHubSlide";
import IFRS17GameSlide from "./components/CarouselSlides/IFRS17GameSlide";
import ActuarialToolsSlide from "./components/CarouselSlides/ActuarialToolsSlide";
import QualificationPathwaysSlide from "./components/CarouselSlides/QualificationPathwaysSlide";
import Learn17Slide from "./components/CarouselSlides/Learn17Slide";
import Footer from "./components/footer";
import { getShaThemeColors } from "./theme/sha";
import { TRAINING_MODULES } from "./constants/moduleCatalog";

const buildHomeColors = (theme) => {
  const c = getShaThemeColors(theme);
  return {
    cyan: c.cyan,
    purple: c.purple,
    blue: c.blue,
    green: c.green,
    orange: c.orange,
    pink: c.orange,
    bg: c.bg,
    card: c.card,
    text: c.text,
    textSecondary: c.textSecondary,
    gray: c.muted,
    red: c.danger,
    darkBlue: c.darkBlue,
  };
};

const carouselSlides = [
  { component: ActuarialTrainingHubSlide, id: 'actuarial-training' },
  { component: Learn17Slide, id: 'learn-17' },
  { component: ActuarialToolsSlide, id: 'actuarial-tools' },
  { component: QualificationPathwaysSlide, id: 'qualification-pathways' },
  { component: IFRS17GameSlide, id: 'ifrs-17-game' },
];

const QUALIFICATION_PATHWAY_FILE = "/pdfs/qualification-handbook-2025-2026.pdf";

function useCountUp(end, duration = 2000, shouldStart) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!shouldStart) return;
    let startTime, animationFrame;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(animate);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);
  return count;
}

export default function HomePage({ theme = 'dark', user }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const [targetUserCount, setTargetUserCount] = useState(1500); // Dynamic user count
  const statsRef = useRef(null);
  const navigate = useNavigate();

  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const autoScrollIntervalRef = useRef(null);
  const restartAutoScrollTimeoutRef = useRef(null);
  const totalTrainingModules = TRAINING_MODULES.length;

  const currentColors = buildHomeColors(theme);
  const ctaTextOnAccent = theme === 'dark' ? currentColors.darkBlue : '#FFFFFF';

  // Function to start auto-scrolling
  const startAutoScrolling = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
    autoScrollIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
  };

  // Function to stop auto-scrolling
  const stopAutoScrolling = () => {
    if (autoScrollIntervalRef.current) {
      clearInterval(autoScrollIntervalRef.current);
    }
  };

  // Effect to manage auto-scrolling state
  useEffect(() => {
    if (isAutoScrolling) {
      startAutoScrolling();
    } else {
      stopAutoScrolling();
    }

    return () => {
      stopAutoScrolling();
      if (restartAutoScrollTimeoutRef.current) {
        clearTimeout(restartAutoScrollTimeoutRef.current);
      }
    };
  }, [isAutoScrolling]);

  // Fetch actual user count from Supabase
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const { data, error } = await supabase.rpc('get_user_count');
        
        if (error) throw error;
        if (data !== null) {
          // Update to the actual number from the database
          setTargetUserCount(data); 
        }
      } catch (error) {
        console.error("Error fetching user count:", error);
      }
    };

    fetchUserCount();
  }, []);

  const userCount = useCountUp(targetUserCount, 2000, statsVisible);
  const moduleCount = useCountUp(totalTrainingModules, 2000, statsVisible);
  const toolCount = useCountUp(totalToolsCount, 2000, statsVisible);
  const successRate = useCountUp(95, 2000, statsVisible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const handleManualNavigation = (direction) => {
    setCurrentSlide((prev) => {
      const newSlide = direction === 'next'
        ? (prev + 1) % carouselSlides.length
        : (prev - 1 + carouselSlides.length) % carouselSlides.length;
      return newSlide;
    });

    setIsAutoScrolling(false);

    if (restartAutoScrollTimeoutRef.current) {
      clearTimeout(restartAutoScrollTimeoutRef.current);
    }

    restartAutoScrollTimeoutRef.current = setTimeout(() => {
      setIsAutoScrolling(true);
    }, 7000);
  };

  const nextSlide = () => handleManualNavigation('next');
  const prevSlide = () => handleManualNavigation('prev');

  // Helper function to handle external vs internal routing safely
  const handleNavigation = (path) => {
    if (!path) return;

    // Centralized logic for navigation
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(path);
    }
  };

  const handlePrimaryAction = () => {
    if (user) {
      navigate('/my-progress');
    } else {
      navigate('/SHAAuth');
    }
  };

  const viewQualificationPathway = () => {
    if (!user) {
      navigate('/SHAAuth');
      return;
    }

    window.open(QUALIFICATION_PATHWAY_FILE, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen overflow-hidden transition-colors duration-300 pt-20" style={{ background: currentColors.bg }}>
      {/* HERO CAROUSEL */}
      <div className="relative">
        <div className="relative h-[550px] md:h-[650px] overflow-hidden">
          {carouselSlides.map((slide, i) => {
            const SlideComponent = slide.component;
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === i ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <SlideComponent
                  isActive={currentSlide === i}
                  user={user}
                  handleNavigation={handleNavigation}
                  totalToolsCount={totalToolsCount}
                  totalTrainingModules={totalTrainingModules}
                  onDownloadQualificationPathway={viewQualificationPathway}
                />
              </div>
            );
          })}

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full transition-all hover:scale-110 backdrop-blur-sm shadow-xl"
            style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', color: theme === 'dark' ? 'white' : currentColors.text }}>
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {carouselSlides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)}
                className={`h-3 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-10' : 'w-3'}`}
                style={{ 
                  background: currentSlide === i 
                    ? (theme === 'dark' ? 'white' : currentColors.cyan)
                    : (theme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.3)'),
                  boxShadow: currentSlide === i ? '0 2px 10px rgba(0,0,0,0.3)' : 'none'
                }} />
            ))}
          </div>
        </div>
      </div>

      {/* PLATFORM OVERVIEW */}
      <section id="features" className="py-20 px-4 lg:px-8 transition-colors duration-300" 
        style={{ background: theme === 'dark' ? `linear-gradient(180deg, ${currentColors.card} 0%, ${currentColors.bg} 100%)` : '#FFFFFF' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4" 
              style={{ background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              All Your Actuarial Needs in One Platform
            </h2>
            <p className="text-lg max-w-3xl mx-auto" style={{ color: currentColors.textSecondary }}>From training and tools to exams and games - everything you need to succeed in your actuarial journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <GraduationCap className="w-8 h-8" />, title: "Actuarial Training Hub", desc: `${totalTrainingModules} comprehensive modules covering everything from data cleanup to valuation`, features: ["Structured learning paths", "Real-world case studies", "Progress tracking"], color: currentColors.cyan, link: "/modules" },
              { icon: <BookOpen className="w-8 h-8" />, title: "IFRS 17 Training Hub", desc: "Dedicated platform for mastering the new insurance accounting standard", features: ["25+ detailed lessons", "Interactive examples", "Certification prep"], color: currentColors.purple, link: "https://learn17.com/" },
              { icon: <Calculator className="w-8 h-8" />, title: "Valuation Tools", desc: "Professional-grade models for risk adjustment, LRC, and liability calculations", features: [`${totalToolsCount} actuarial tools`, "Excel integration", "Instant calculations"], color: currentColors.green, link: "/tools" },
              { icon: <Award className="w-8 h-8" />, title: "Qualification Pathways", desc: "Complete roadmap for actuarial professional exams and certifications", features: ["15+ exam guides", "Study resources", "Career planning"], color: currentColors.orange, action: viewQualificationPathway },
              { icon: <Gamepad2 className="w-8 h-8" />, title: "IFRS 17 Game", desc: "Gamified learning experience with competitive leaderboards", features: ["100+ quiz questions", "Global rankings", "Achievement badges"], color: currentColors.pink, link: "https://www.ifrs17game.com/" },
              { icon: <Compass className="w-8 h-8" />, title: "Integrated Experience", desc: "Seamless navigation between all platforms with unified progress tracking", features: ["Single dashboard", "Cross-platform sync", "Unified analytics"], color: currentColors.blue, link: "/my-progress" }
            ].map((platform, i) => (
              <div key={i} onClick={() => platform.action ? platform.action() : handleNavigation(platform.link)} className="group p-6 rounded-2xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer"
                style={{ 
                  background: theme === 'dark' ? `linear-gradient(135deg, ${platform.color}10, ${platform.color}05)` : currentColors.card,
                  borderColor: `${platform.color}30`, 
                  boxShadow: theme === 'dark' ? `0 4px 20px ${platform.color}15` : '0 2px 15px rgba(0,0,0,0.08)'
                }}
                onMouseEnter={(e) => { 
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 15px 50px ${platform.color}40` : `0 10px 30px ${platform.color}30`; 
                  e.currentTarget.style.borderColor = `${platform.color}60`; 
                }}
                onMouseLeave={(e) => { 
                  e.currentTarget.style.boxShadow = theme === 'dark' ? `0 4px 20px ${platform.color}15` : '0 2px 15px rgba(0,0,0,0.08)'; 
                  e.currentTarget.style.borderColor = `${platform.color}30`; 
                }}>
                <div className="p-3 rounded-xl w-fit mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3" 
                  style={{ background: `${platform.color}20`, color: platform.color }}>{platform.icon}</div>
                <h3 className="text-xl font-bold mb-2" style={{ color: currentColors.text }}>{platform.title}</h3>
                <p className="mb-4 leading-relaxed text-sm" style={{ color: currentColors.textSecondary }}>{platform.desc}</p>
                <ul className="space-y-2">
                  {platform.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: platform.color }} />
                      <span className="text-xs" style={{ color: currentColors.textSecondary }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button onClick={handlePrimaryAction} className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center gap-3"
              style={{ 
                background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`, 
                boxShadow: `0 10px 40px ${currentColors.cyan}40`,
                color: ctaTextOnAccent
              }}>
              <Star className="w-6 h-6" />
              {user ? "Go to My Progress" : "Get Started Free - No Credit Card Required"}
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE KENBRIGHT */}
      <section id="training" className="py-20 px-4 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0" style={{ 
          background: theme === 'dark' 
            ? `linear-gradient(135deg, ${currentColors.cyan}15, ${currentColors.purple}15)` 
            : `linear-gradient(135deg, ${currentColors.cyan}10, ${currentColors.purple}10)` 
        }} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-black mb-4" 
              style={{ background: `linear-gradient(135deg, ${currentColors.cyan}, ${currentColors.purple})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Why Choose Kenbright?
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: currentColors.textSecondary }}>Comprehensive actuarial platform designed by industry experts</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Brain className="w-8 h-8" />, title: "Expert Content", desc: "Industry-leading curriculum", color: currentColors.cyan },
              { icon: <Target className="w-8 h-8" />, title: "Practical Skills", desc: "Real-world applications", color: currentColors.green },
              { icon: <Shield className="w-8 h-8" />, title: "Compliance Ready", desc: "IFRS 17 & regulations", color: currentColors.purple },
              { icon: <TrendingUp className="w-8 h-8" />, title: "Career Growth", desc: "Advance your expertise", color: currentColors.blue }
            ].map((item, i) => (
              <div key={i} className="group relative h-full flex flex-col">
                <div className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl" 
                  style={{ background: `linear-gradient(135deg, ${item.color}40, ${item.color}20)` }} />
                <div className="relative p-8 rounded-3xl border-2 transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-xl overflow-hidden flex-grow"
                  style={{ 
                    background: theme === 'dark' ? `linear-gradient(135deg, ${item.color}20, ${item.color}10)` : currentColors.card,
                    borderColor: `${item.color}50`, 
                    boxShadow: theme === 'dark' ? `0 8px 32px ${item.color}20` : `0 4px 20px ${item.color}15`
                  }}
                  onMouseEnter={(e) => { 
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; 
                    e.currentTarget.style.boxShadow = `0 20px 60px ${item.color}40`; 
                  }}
                  onMouseLeave={(e) => { 
                    e.currentTarget.style.transform = 'translateY(0) scale(1)'; 
                    e.currentTarget.style.boxShadow = theme === 'dark' ? `0 8px 32px ${item.color}20` : `0 4px 20px ${item.color}15`; 
                  }}>
                  <div className="relative z-10">
                    <div className="p-4 rounded-2xl w-fit mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6" 
                      style={{ background: `${item.color}25`, color: item.color, boxShadow: `0 4px 20px ${item.color}30` }}>{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: currentColors.text }}>{item.title}</h3>
                    <p style={{ color: currentColors.textSecondary }}>{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section ref={statsRef} className="py-20 px-4 lg:px-8 transition-colors duration-300" 
        style={{ background: theme === 'dark' ? currentColors.card : '#FFFFFF' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <Users className="w-8 h-8" />, value: userCount, suffix: "+", label: "Active Users", color: currentColors.cyan },
              { icon: <GraduationCap className="w-8 h-8" />, value: moduleCount, suffix: "", label: "Training Modules", color: currentColors.purple },
              { icon: <Calculator className="w-8 h-8" />, value: toolCount, suffix: "", label: "Valuation Tools", color: currentColors.green },
              { icon: <Trophy className="w-8 h-8" />, value: successRate, suffix: "%", label: "Success Rate", color: currentColors.orange }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 transition-transform group-hover:scale-110" 
                  style={{ background: `${stat.color}20`, color: stat.color }}>{stat.icon}</div>
                <div className="text-5xl font-black mb-2" 
                  style={{ 
                    color: stat.color,
                    textShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'
                  }}>
                  {stat.value}{stat.suffix}
                </div>
                <div className="font-medium" style={{ color: currentColors.textSecondary }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-4 lg:px-8" 
        style={{ background: theme === 'dark' ? `linear-gradient(135deg, ${currentColors.cyan}20, ${currentColors.purple}20)` : `linear-gradient(135deg, ${currentColors.cyan}10, ${currentColors.purple}10)` }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-black mb-6" style={{ color: currentColors.text }}>Ready to Accelerate Your Actuarial Career?</h2>
          <p className="text-xl mb-10" style={{ color: currentColors.textSecondary }}>Join {targetUserCount.toLocaleString()}+ professionals already learning with Kenbright. Start your free account today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <button onClick={() => navigate('/my-progress')} className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
                style={{ 
                  background: currentColors.cyan, 
                  boxShadow: `0 10px 40px ${currentColors.cyan}50`,
                  color: ctaTextOnAccent
                }}>
                <TrendingUp className="w-6 h-6" />
                Go to My Progress
              </button>
            ) : (
              <>
                <button onClick={() => navigate('/SHAAuth?mode=signup')} className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
                  style={{ 
                    background: currentColors.cyan, 
                    boxShadow: `0 10px 40px ${currentColors.cyan}50`,
                    color: ctaTextOnAccent
                  }}>
                  <Rocket className="w-6 h-6" />
                  Create Free Account
                </button>
                <button onClick={() => navigate('/SHAAuth')} className="px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-3"
                  style={{ 
                    background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.8)', 
                    border: `2px solid ${theme === 'dark' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)'}`,
                    color: currentColors.text
                  }}>
                  Already have an account? Log In
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer theme={theme} />
    </div>
  );
}