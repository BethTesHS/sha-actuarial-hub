// src/SHADashboard.jsx
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import shaLogo from "./assets/SHA_Logo2.png";
import kenbrightLogo from "./assets/kenbright-logo-white.png";
import {
    BarChart3,
    FileText,
    ArrowRight,
    Sparkles,
    BookOpen,
    ClipboardList,
    Wrench,
    Globe
} from "lucide-react";
import { getShaThemeColors } from "./theme/sha";

export default function SHADashboard({ user: userProp, theme = "dark" }) {
    const colors = getShaThemeColors(theme);
    const isDark = theme === "dark";
    const user = userProp || JSON.parse(localStorage.getItem('user') || '{}');

    const quickAccessCards = [
        { title: "Training Modules", description: "18 actuarial training modules with quizzes and assignments", icon: <BookOpen className="w-8 h-8" />, color: colors.blue, link: "/modules" },
        { title: "My Progress", description: "Track completion across all modules", icon: <BarChart3 className="w-8 h-8" />, color: colors.green, link: "/my-progress" },
        { title: "Tools", description: "Actuarial calculators and utilities", icon: <Wrench className="w-8 h-8" />, color: colors.cyan, link: "/tools" },
        { title: "QAS Reports", description: "Quality assurance and reporting resources", icon: <FileText className="w-8 h-8" />, color: colors.purple, link: "/qas-reports" },
        { title: "Training Links", description: "External learning resources and references", icon: <Globe className="w-8 h-8" />, color: colors.orange, link: "/training-links" },
        { title: "Profile", description: "Manage your account and avatar", icon: <ClipboardList className="w-8 h-8" />, color: colors.darkBlue, link: "/profile" }
    ];

    const textMuted = isDark ? "text-gray-300" : "text-slate-600";
    const textSoft = isDark ? "text-gray-200" : "text-slate-700";
    const cardTitle = isDark ? "text-white" : "text-slate-900";

    return (
        <motion.div
            className={`font-sans min-h-screen transition-colors duration-300 ${isDark ? "text-white" : "text-slate-900"}`}
            style={{ background: colors.pageGradient }}
        >
            <div className="pt-20">
                <header className="relative flex items-center justify-center overflow-hidden py-12">
                    <div className="absolute inset-0" style={{
                        background: `radial-gradient(circle at 20% 30%, ${colors.blue}20, transparent 50%),
                            radial-gradient(circle at 80% 70%, ${colors.green}15, transparent 50%),
                            linear-gradient(to bottom, rgba(6, 18, 28, 0.7), rgba(0, 40, 71, 0.8))`,
                        zIndex: 1
                    }} />

                    <div className="relative z-10 max-w-6xl px-6 text-center">
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-4">

                            <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md border"
                                style={{ background: `linear-gradient(135deg, ${colors.blue}20, ${colors.green}20)`, borderColor: `${colors.green}40` }}>
                                <Sparkles className="w-3.5 h-3.5" style={{ color: colors.green }} />
                                <span className={`text-md font-semibold ${textSoft}`}>
                                    Welcome back, {user?.name || user?.email?.split('@')[0] || 'User'}!
                                </span>
                            </motion.div>

                            <h1 className="leading-tight mt-6">
                                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    className={`block text-2xl md:text-3xl font-medium mb-3 tracking-wider ${textSoft}`}
                                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                                    Your Dashboard
                                </motion.span>
                                <motion.span initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="block text-3xl md:text-4xl font-extrabold mb-4 leading-tight"
                                    style={{
                                        background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.green} 100%)`,
                                        WebkitBackgroundClip: "text", 
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text", 
                                        filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))"
                                    }}>
                                    SHA Actuarial Hub
                                </motion.span>
                            </h1>

                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7, duration: 0.6 }}
                                className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {quickAccessCards.map((card, index) => (
                                    <motion.div key={index}
                                        whileHover={{ scale: 1.03, y: -3, boxShadow: `0 0 30px ${card.color}80, 0 0 60px ${card.color}40` }}
                                        className="group cursor-pointer outline-none">
                                        <Link to={card.link}
                                            className="block rounded-xl p-6 backdrop-blur-md border-2 transition-all duration-300 h-full outline-none ring-0"
                                            style={{
                                                background: `linear-gradient(135deg, ${card.color}20, ${card.color}08)`,
                                                borderColor: `${card.color}60`,
                                                boxShadow: `0 0 20px ${card.color}50, 0 0 40px ${card.color}20`
                                            }}>
                                            <div className="flex flex-col items-center text-center">
                                                <div className="p-4 rounded-lg mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                                                    style={{ background: `${card.color}25`, color: card.color, boxShadow: `0 0 15px ${card.color}60, 0 0 30px ${card.color}30` }}>
                                                    {card.icon}
                                                </div>
                                                <h3 className={`text-lg font-bold mb-2 ${cardTitle}`}>{card.title}</h3>
                                                <p className={`${textMuted} text-sm leading-relaxed mb-3`}>{card.description}</p>
                                                <div className="mt-4 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition"
                                                    style={{ color: card.color }}>
                                                    Open <ArrowRight className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </header>
            </div>

            <footer className="py-8 backdrop-blur-xl border-t"
                style={{ background: colors.footerBg, borderColor: colors.cardBorder }}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <img src={shaLogo} alt="SHA Logo" className="h-12 w-auto" />
                            <div className="text-white text-sm font-medium">© {new Date().getFullYear()} SHA Training Platform</div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-white text-lg font-medium">Powered by <span className="font-bold text-xl">Kenbright AI</span></span>
                            {/* <img src={kenbrightLogo} alt="Kenbright Logo" className="h-16 w-auto" /> */}
                        </div>
                    </div>
                </div>
            </footer>
        </motion.div>
    );
}