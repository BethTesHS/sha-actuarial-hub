// src/Modules.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, BookOpen, Award, Play, Star, CheckCircle } from "lucide-react";
import { getShaThemeColors } from "./theme/sha";
import { supabase } from "./supabaseClient";

// Import images from assets folder
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
import shaLogo from "./assets/SHA_logo.png";
import kenbrightLogo from "./assets/kenbright-logo-white.png";

export default function SHAModules({ theme = "dark", user }) {
    const [moduleProgress, setModuleProgress] = useState({});

    // Match KAFS: read saved module progress directly from Supabase.
    useEffect(() => {
        const fetchProgress = async () => {
            if (!user?.id) {
                setModuleProgress({});
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('user_module_progress')
                    .select('module_id, progress_percentage')
                    .eq('user_id', user.id);

                if (error) {
                    console.error("Supabase query error:", error);
                    throw error;
                }

                const progressMap = {};
                (data || []).forEach((item) => {
                    progressMap[String(item.module_id)] = item.progress_percentage || 0;
                });
                setModuleProgress(progressMap);
            } catch (err) {
                console.error("Error fetching module progress:", err);
            }
        };

        fetchProgress();
    }, [user?.id]);

    // SHA Brand Colors
    const shaBlue = "#0066B3";
    const shaGreen = "#8BC53F";
    const isDark = theme === "dark";
    const colors = getShaThemeColors(theme);
    const cardContentBg = isDark
        ? "linear-gradient(to bottom, rgba(0, 61, 107, 0.95), rgba(0, 51, 89, 0.9))"
        : "linear-gradient(to bottom, rgba(255, 255, 255, 0.96), rgba(248, 250, 252, 0.94))";
    const cardTitleColor = colors.text;
    const cardTextColor = colors.textSecondary;
    const cardMutedColor = isDark ? "rgba(255,255,255,0.7)" : "rgba(15,23,42,0.65)";
    const cardFaintColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(15,23,42,0.42)";
    const trackBg = isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)";
    const getModuleColor = (moduleNumber) => (moduleNumber % 2 === 0 ? shaGreen : shaBlue);
    const getModuleProgress = (moduleId) => moduleProgress[String(moduleId)] || 0;
    const isModuleUnlocked = (moduleId) => {
        if (moduleId === 1) return true;
        return getModuleProgress(moduleId - 1) === 100;
    };

    const specialBanner = {
        id: "ifrs17",
        name: "IFRS 17",
        color: shaGreen,
        status: "accessible",
        description: "Master IFRS 17 insurance contracts accounting and implementation. This foundational module provides essential knowledge for all subsequent actuarial training.",
        image: ifrs17Img,
        isSpecial: true
    };

    const modules = [
        {
            id: 1,
            name: "Data Clean Up",
            color: getModuleColor(1),
            status: "accessible",
            description: "Learn data validation, cleaning, and standardization techniques for actuarial datasets.",
            image: dataCleanupImg,
            number: "01"
        },
        {
            id: 2,
            name: "Pricing Fundamentals",
            color: getModuleColor(2),
            status: "locked",
            description: "Master the core principles of insurance pricing and risk assessment.",
            image: pricingFundamentalsImg,
            number: "02"
        },
        {
            id: 3,
            name: "Liability for Remaining Coverage (LRC)",
            color: getModuleColor(3),
            status: "locked",
            description: "Understand LRC calculations and their importance in insurance valuations.",
            image: lrcImg,
            number: "03"
        },
        {
            id: 4,
            name: "General Insurance Valuations (Liability for Incurred Claims)",
            color: getModuleColor(4),
            status: "locked",
            description: "Advanced techniques for general insurance liability valuations.",
            image: giValuationsImg,
            number: "04"
        },
        {
            id: 5,
            name: "Capital Adequacy Analysis",
            color: getModuleColor(5),
            status: "locked",
            description: "Learn capital adequacy requirements and solvency analysis methods.",
            image: capitalAdequacyImg,
            number: "05"
        },
        {
            id: 6,
            name: "Financial Performance Analysis (Ratio Analysis)",
            color: getModuleColor(6),
            status: "locked",
            description: "Master financial ratio analysis and balance sheet evaluation techniques.",
            image: finPerformanceImg,
            number: "06"
        },
        {
            id: 7,
            name: "Premium Certificates",
            color: getModuleColor(7),
            status: "locked",
            description: "Learn premium certificate preparation and validation processes.",
            image: premCertificatesImg,
            number: "07"
        },
        {
            id: 8,
            name: "Reinsurance Certificates",
            color: getModuleColor(8),
            status: "locked",
            description: "Understand reinsurance certificate creation and management.",
            image: reinCertificatesImg,
            number: "08"
        },
        {
            id: 9,
            name: "Financial Condition Reporting",
            color: getModuleColor(9),
            status: "locked",
            description: "Master financial condition reporting standards and requirements.",
            image: finConditionImg,
            number: "09"
        }
    ];

    const ModuleCard = ({ module, isSpecial = false }) => {
        const progress = isSpecial ? 0 : getModuleProgress(module.id);
        const isUnlocked = isSpecial || isModuleUnlocked(module.id);
        const baseClasses = "relative rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-md border-2 hover:scale-105 hover:shadow-2xl flex flex-col w-full";

        if (isSpecial) {
            const style = {
                background: isDark
                    ? `linear-gradient(135deg, ${module.color}20 0%, ${module.color}10 100%)`
                    : `linear-gradient(135deg, ${module.color}18 0%, ${module.color}08 100%)`,
                boxShadow: isDark ? `0 0 30px ${module.color}40` : `0 10px 30px ${module.color}20`,
                borderColor: isDark ? `${module.color}60` : `${module.color}35`,
            };

            return (
                <div className={`${baseClasses} h-64 lg:h-72 xl:h-80`} style={style}>
                    <div className="h-full flex flex-col group cursor-pointer">
                        <div className="h-1/2 relative overflow-hidden">
                            <img
                                src={module.image}
                                alt={module.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                            <div className="absolute top-3 right-3">
                                <span className="px-3 py-1 text-xs rounded-full border flex items-center gap-1"
                                    style={{
                                        backgroundColor: `${shaGreen}30`,
                                        color: shaGreen,
                                        borderColor: `${shaGreen}50`
                                    }}>
                                    <Star className="w-3 h-3" />
                                    Foundation
                                </span>
                            </div>
                        </div>

                        <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4" style={{ background: cardContentBg }}>
                            <div>
                                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                    <Award className="w-3 h-3 lg:w-4 lg:h-4 transition-colors" style={{ color: shaGreen }} />
                                    <h3 className="text-xs lg:text-sm font-bold line-clamp-1 group-hover:opacity-80 transition-opacity" style={{ color: cardTitleColor }}>
                                        {module.name}
                                    </h3>
                                </div>
                                <p className="text-xs line-clamp-2 lg:line-clamp-3" style={{ color: cardTextColor }}>
                                    {module.description}
                                </p>
                            </div>

                            <div className="mt-2">
                                <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{ background: trackBg }}>
                                    <div className="h-1.5 w-full" style={{ backgroundColor: shaGreen }} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm lg:text-lg font-bold" style={{ color: shaGreen }}>Start Here</span>
                                    <div className="flex items-center gap-1 transition-opacity group-hover:opacity-80" style={{ color: shaGreen }}>
                                        <span className="text-xs">Begin</span>
                                        <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (isUnlocked) {
            const style = {
                background: isDark
                    ? `linear-gradient(135deg, ${module.color}15 0%, ${module.color}05 100%)`
                    : `linear-gradient(135deg, ${module.color}10 0%, ${module.color}04 100%)`,
                boxShadow: isDark ? `0 0 25px ${module.color}33` : `0 10px 25px ${module.color}18`,
                borderColor: isDark ? `${module.color}40` : `${module.color}30`,
            };

            return (
                <Link to={`/modules/${module.id}`} className={`${baseClasses} h-64 lg:h-72 xl:h-80 block`} style={style}>
                    <div className="h-full flex flex-col group cursor-pointer">
                        <div className="h-1/2 relative overflow-hidden">
                            <img
                                src={module.image}
                                alt={module.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className={`absolute inset-0 transition-colors ${isDark ? "bg-black/20 group-hover:bg-black/10" : "bg-black/10 group-hover:bg-black/5"}`} />
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 text-xs rounded-full border"
                                    style={{
                                        backgroundColor: `${shaGreen}20`,
                                        color: shaGreen,
                                        borderColor: `${shaGreen}30`
                                    }}>
                                    {progress === 100 ? 'Completed' : 'Accessible'}
                                </span>
                            </div>
                        </div>

                        <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4" style={{ background: cardContentBg }}>
                            <div>
                                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                    <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 transition-colors"
                                        style={{ color: cardMutedColor, '--hover-color': shaBlue }} />
                                    <h3 className="text-xs lg:text-sm font-bold line-clamp-1 group-hover:opacity-80 transition-opacity" style={{ color: cardTitleColor }}>
                                        {module.name}
                                    </h3>
                                </div>
                                <p className="text-xs line-clamp-2 lg:line-clamp-3" style={{ color: cardTextColor }}>
                                    {module.description}
                                </p>
                            </div>

                            <div className="mt-2">
                                <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{ background: trackBg }}>
                                    <div
                                        className="h-1.5 transition-all duration-1000"
                                        style={{
                                            width: `${progress}%`,
                                            backgroundColor: progress === 100 ? shaGreen : module.color
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm lg:text-lg font-bold" style={{ color: cardFaintColor }}>{module.number}</span>
                                    <div
                                        className="flex items-center gap-1 transition-colors"
                                        style={{ color: progress === 100 ? shaGreen : cardMutedColor }}
                                    >
                                        {progress > 0 && progress < 100 && <span className="text-xs font-bold">{progress}%</span>}
                                        <span className="text-xs">{progress === 100 ? 'Done' : progress > 0 ? 'Resume' : 'Start'}</span>
                                        {progress === 100 ? <CheckCircle className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        } else {
            const style = {
                background: isDark
                    ? "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)"
                    : "linear-gradient(135deg, rgba(255,255,255,0.94) 0%, rgba(248,250,252,0.9) 100%)",
                border: isDark ? "2px solid rgba(239, 68, 68, 0.3)" : "2px solid rgba(239, 68, 68, 0.2)",
                boxShadow: isDark ? "0 0 20px rgba(239, 68, 68, 0.1)" : "0 10px 25px rgba(15, 23, 42, 0.08)",
            };

            return (
                <div className={`${baseClasses} h-64 lg:h-72 xl:h-80`} style={style}>
                    <div className="h-full flex flex-col">
                        <div className="h-1/2 relative overflow-hidden">
                            <img
                                src={module.image}
                                alt={module.name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0" style={{ background: isDark ? "rgba(239, 68, 68, 0.05)" : "rgba(239, 68, 68, 0.03)" }} />
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 text-xs rounded-full border" style={{
                                    backgroundColor: isDark ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.12)",
                                    color: isDark ? "#F87171" : "#DC2626",
                                    borderColor: isDark ? "rgba(239, 68, 68, 0.3)" : "rgba(239, 68, 68, 0.24)"
                                }}>
                                    Locked
                                </span>
                            </div>
                        </div>

                        <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4" style={{ background: cardContentBg }}>
                            <div>
                                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                    <Lock className="w-3 h-3 lg:w-4 lg:h-4" style={{ color: isDark ? "#F87171" : "#DC2626" }} />
                                    <h3 className="text-xs lg:text-sm font-bold line-clamp-1" style={{ color: cardMutedColor }}>
                                        {module.name}
                                    </h3>
                                </div>
                                <p className="text-xs line-clamp-2 lg:line-clamp-3" style={{ color: cardTextColor }}>
                                    {module.description}
                                </p>
                            </div>

                            <div className="mt-2">
                                <div className="w-full rounded-full h-1.5 mb-2 overflow-hidden" style={{ background: isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.07)" }}>
                                    <div className="h-1.5 w-0" style={{ background: isDark ? "rgba(248, 113, 113, 0.3)" : "rgba(220, 38, 38, 0.3)" }} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm lg:text-lg font-bold" style={{ color: isDark ? "rgba(255,255,255,0.2)" : "rgba(15,23,42,0.35)" }}>{module.number}</span>
                                    <Lock className="w-3 h-3 lg:w-4 lg:h-4" style={{ color: isDark ? "#F87171" : "#DC2626" }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div
            className="min-h-screen relative overflow-x-hidden transition-colors duration-300"
            style={{
                background: colors.pageGradient,
                color: colors.text,
            }}
        >
            {/* Header Bar with SHA Logo on left and Back button on right */}
            <div className="relative border-b backdrop-blur-xl transition-colors duration-300" style={{
                background: isDark
                    ? "linear-gradient(to right, rgba(0, 61, 107, 1), rgba(0, 51, 89, 1))"
                    : "linear-gradient(to right, rgba(255, 255, 255, 0.94), rgba(248, 250, 252, 0.9))",
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)"
            }}>

                {/* Title and Description - Centered content */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6 pt-14">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight pb-2"
                            style={{
                                background: `linear-gradient(135deg, ${shaBlue} 0%, ${shaGreen} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: isDark ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' : 'drop-shadow(0 2px 8px rgba(0,102,179,0.12))',
                                letterSpacing: '-0.02em'
                            }}>
                            Training Modules
                        </h1>

                        <p className="text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-light" style={{
                            color: colors.textSecondary,
                            letterSpacing: '0.01em',
                            lineHeight: '1.6'
                        }}>
                            Your structured actuarial learning path. Each module builds on the previous one.
                            Complete them in order to unlock advanced content and strengthen your analytical expertise.
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-24 h-24 rounded-full blur-2xl" style={{
                    backgroundColor: `${shaGreen}20`
                }}></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-2xl" style={{
                    backgroundColor: `${shaBlue}10`
                }}></div>
            </div>

            {/* Module Cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <ModuleCard module={specialBanner} isSpecial={true} />
                    </div>

                    {modules.map((module) => (
                        <ModuleCard key={module.id} module={module} />
                    ))}
                </div>
            </div>

            {/* Footer with Powered by Kenbright AI */}
            <footer className="py-8 backdrop-blur-xl border-t mt-8"
                style={{ 
                    background: 'linear-gradient(to right, rgba(0, 61, 107, 0.95), rgba(0, 51, 89, 0.95))', 
                    borderColor: 'rgba(255, 255, 255, 0.1)' 
                }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <img src={shaLogo} alt="SHA Logo" className="h-10 w-auto" />
                            <div className="text-white text-md font-medium">
                                © {new Date().getFullYear()} SHA Training Platform
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-white text-lg font-medium">Powered by <span className="font-bold text-xl">Kenbright AI</span></span>
                            {/* <div className="flex flex-col items-center">
                                <img src={kenbrightLogo} alt="Kenbright Logo" className="h-16 w-auto" />
                            </div> */}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}