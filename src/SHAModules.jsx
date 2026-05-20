// src/Modules.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Lock, BookOpen, Award, Play, Star, Home } from "lucide-react";

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
import ordLifeValuationImg from "./assets/ordinary-life.jpg";
import groupBusinessValuationImg from "./assets/business-valuation.jpg";
import daValuationImg from "./assets/da-valuation.jpg";
import ipsImg from "./assets/investment-policy.jpg";
import prmfImg from "./assets/post-retirement.jpg";
import dbdcValuationsImg from "./assets/dbdc-valuations.jpg";
import ias19Img from "./assets/ias-19.jpg";
import ifrs17Img from "./assets/ifrs-17.jpg";
import shaLogo from "./assets/SHA_logo.png";
import kenbrightLogo from "./assets/kenbright-logo-white.png";

export default function SHAModules() {
    // SHA Brand Colors
    const shaBlue = "#0066B3";
    const shaGreen = "#8BC53F";
    const shaDarkBlue = "#003D6B";

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
            color: shaBlue,
            status: "accessible",
            description: "Learn data validation, cleaning, and standardization techniques for actuarial datasets.",
            image: dataCleanupImg,
            number: "01"
        },
        {
            id: 2,
            name: "Pricing Fundamentals",
            color: shaGreen,
            status: "locked",
            description: "Master the core principles of insurance pricing and risk assessment.",
            image: pricingFundamentalsImg,
            number: "02"
        },
        {
            id: 3,
            name: "Liability for Remaining Coverage (LRC)",
            color: shaBlue,
            status: "locked",
            description: "Understand LRC calculations and their importance in insurance valuations.",
            image: lrcImg,
            number: "03"
        },
        {
            id: 4,
            name: "General Insurance Valuations (Liability for Incurred Claims)",
            color: shaGreen,
            status: "locked",
            description: "Advanced techniques for general insurance liability valuations.",
            image: giValuationsImg,
            number: "04"
        },
        {
            id: 5,
            name: "Capital Adequacy Analysis",
            color: shaBlue,
            status: "locked",
            description: "Learn capital adequacy requirements and solvency analysis methods.",
            image: capitalAdequacyImg,
            number: "05"
        },
        {
            id: 6,
            name: "Financial Performance Analysis (Ratio Analysis)",
            color: shaGreen,
            status: "locked",
            description: "Master financial ratio analysis and balance sheet evaluation techniques.",
            image: finPerformanceImg,
            number: "06"
        },
        {
            id: 7,
            name: "Premium Certificates",
            color: shaBlue,
            status: "locked",
            description: "Learn premium certificate preparation and validation processes.",
            image: premCertificatesImg,
            number: "07"
        },
        {
            id: 8,
            name: "Reinsurance Certificates",
            color: shaGreen,
            status: "locked",
            description: "Understand reinsurance certificate creation and management.",
            image: reinCertificatesImg,
            number: "08"
        },
        {
            id: 9,
            name: "Financial Condition Reporting",
            color: shaBlue,
            status: "locked",
            description: "Master financial condition reporting standards and requirements.",
            image: finConditionImg,
            number: "09"
        },
        {
            id: 10,
            name: "Ordinary Life Valuation",
            color: shaGreen,
            status: "locked",
            description: "Learn ordinary life insurance valuation techniques and methodologies.",
            image: ordLifeValuationImg,
            number: "10"
        },
        {
            id: 11,
            name: "Group Business Valuation",
            color: shaBlue,
            status: "locked",
            description: "Understand group business valuation principles and applications.",
            image: groupBusinessValuationImg,
            number: "11"
        },
        {
            id: 12,
            name: "DA Valuation",
            color: shaGreen,
            status: "locked",
            description: "Master deferred acquisition cost valuation and accounting treatment.",
            image: daValuationImg,
            number: "12"
        },
        {
            id: 13,
            name: "Investment Policy Statements (IPS)",
            color: shaBlue,
            status: "locked",
            description: "Learn investment policy statement development and implementation.",
            image: ipsImg,
            number: "13"
        },
        {
            id: 14,
            name: "Post Retirement Medical Fund",
            color: shaGreen,
            status: "locked",
            description: "Understand post-retirement medical fund valuation and management.",
            image: prmfImg,
            number: "14"
        },
        {
            id: 15,
            name: "Defined Benefit (DB) & Defined Contribution (DC) Valuations",
            color: shaBlue,
            status: "locked",
            description: "Master DB and DC pension scheme valuation and funding assessment.",
            image: dbdcValuationsImg,
            number: "15"
        },
        {
            id: 16,
            name: "IAS 19 Valuation",
            color: shaGreen,
            status: "locked",
            description: "Learn IAS 19 employee benefits valuation and reporting standards.",
            image: ias19Img,
            number: "16"
        }
    ];

    const ModuleCard = ({ module, isSpecial = false }) => {
        const baseClasses = "relative rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-md border-2 hover:scale-105 hover:shadow-2xl flex flex-col w-full";

        if (isSpecial) {
            const style = {
                background: `linear-gradient(135deg, ${module.color}20 0%, ${module.color}10 100%)`,
                boxShadow: `0 0 30px ${module.color}40`,
                borderColor: `${module.color}60`,
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

                        <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4" style={{
                            background: 'linear-gradient(to bottom, rgba(0, 61, 107, 0.95), rgba(0, 51, 89, 0.9))'
                        }}>
                            <div>
                                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                    <Award className="w-3 h-3 lg:w-4 lg:h-4 transition-colors" style={{ color: shaGreen }} />
                                    <h3 className="text-xs lg:text-sm font-bold text-white line-clamp-1 group-hover:opacity-80 transition-opacity">
                                        {module.name}
                                    </h3>
                                </div>
                                <p className="text-gray-200 text-xs line-clamp-2 lg:line-clamp-3">
                                    {module.description}
                                </p>
                            </div>

                            <div className="mt-2">
                                <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
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

        if (module.status === "accessible") {
            const style = {
                background: `linear-gradient(135deg, ${module.color}15 0%, ${module.color}05 100%)`,
                boxShadow: `0 0 25px ${module.color}33`,
                borderColor: `${module.color}40`,
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
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 text-xs rounded-full border"
                                    style={{
                                        backgroundColor: `${shaGreen}20`,
                                        color: shaGreen,
                                        borderColor: `${shaGreen}30`
                                    }}>
                                    Accessible
                                </span>
                            </div>
                        </div>

                        <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4" style={{
                            background: 'linear-gradient(to bottom, rgba(0, 61, 107, 0.95), rgba(0, 51, 89, 0.9))'
                        }}>
                            <div>
                                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                    <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 text-white/70 transition-colors"
                                        style={{ '--hover-color': shaBlue }} />
                                    <h3 className="text-xs lg:text-sm font-bold text-white line-clamp-1 group-hover:opacity-80 transition-opacity">
                                        {module.name}
                                    </h3>
                                </div>
                                <p className="text-gray-200 text-xs line-clamp-2 lg:line-clamp-3">
                                    {module.description}
                                </p>
                            </div>

                            <div className="mt-2">
                                <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
                                    <div className="h-1.5 w-1/4" style={{ backgroundColor: module.color }} />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm lg:text-lg font-bold text-white/30">{module.number}</span>
                                    <div className="flex items-center gap-1 text-white/70 group-hover:text-white transition-colors">
                                        <span className="text-xs">Start</span>
                                        <Play className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            );
        } else {
            const style = {
                background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                border: "2px solid rgba(239, 68, 68, 0.3)",
                boxShadow: `0 0 20px rgba(239, 68, 68, 0.1)`,
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
                            <div className="absolute inset-0 bg-red-500/5" />
                            <div className="absolute top-3 right-3">
                                <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                                    Locked
                                </span>
                            </div>
                        </div>

                        <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4" style={{
                            background: 'linear-gradient(to bottom, rgba(0, 61, 107, 0.95), rgba(0, 51, 89, 0.9))'
                        }}>
                            <div>
                                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                                    <Lock className="w-3 h-3 lg:w-4 lg:h-4 text-red-400" />
                                    <h3 className="text-xs lg:text-sm font-bold text-white/70 line-clamp-1">
                                        {module.name}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-xs line-clamp-2 lg:line-clamp-3">
                                    {module.description}
                                </p>
                            </div>

                            <div className="mt-2">
                                <div className="w-full bg-white/5 rounded-full h-1.5 mb-2 overflow-hidden">
                                    <div className="bg-red-400/30 h-1.5 w-0" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm lg:text-lg font-bold text-white/20">{module.number}</span>
                                    <Lock className="w-3 h-3 lg:w-4 lg:h-4 text-red-400" />
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
            className="min-h-screen relative text-white overflow-x-hidden"
            style={{
                background: `
          radial-gradient(1000px at 80% 20%, ${shaBlue}15, transparent 70%),
          radial-gradient(800px at 20% 80%, ${shaGreen}15, transparent 70%),
          linear-gradient(180deg, #001529 0%, #002847 100%)
        `,
            }}
        >
            {/* Header Bar with SHA Logo on left and Back button on right */}
            <div className="relative border-b backdrop-blur-xl" style={{
                background: 'linear-gradient(to right, rgba(0, 61, 107, 1), rgba(0, 51, 89, 1))',
                borderColor: 'rgba(255, 255, 255, 0.1)'
            }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
                    <div className="flex justify-between items-center">
                        {/* SHA Logo on the left */}
                        <div className="flex items-center">
                            <img
                                src={shaLogo}
                                alt="SHA Logo"
                                className="h-9 sm:h-11 w-auto"
                            />
                        </div>

                        {/* Right side with ONLY Back to Dashboard button */}
                        <div className="flex items-center">
                            <Link to="/SHADashboard"
                                className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all duration-200 hover:bg-white/10 border-2"
                                style={{
                                    borderColor: shaGreen,
                                    backgroundColor: 'rgba(139, 197, 63, 0.1)'
                                }}>
                                <Home className="w-5 h-5" style={{ color: shaGreen }} />
                                <span className="text-sm">Dashboard</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Title and Description - Centered content */}
                <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-6 pt-2">
                    <div className="text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight pb-1"
                            style={{
                                background: `linear-gradient(135deg, ${shaBlue} 0%, ${shaGreen} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
                                letterSpacing: '-0.02em'
                            }}>
                            Training Modules
                        </h1>

                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-3xl mx-auto font-light" style={{
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
                            <span className="text-white text-lg font-medium">Powered by</span>
                            <div className="flex flex-col items-center">
                                <img src={kenbrightLogo} alt="Kenbright Logo" className="h-16 w-auto" />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}