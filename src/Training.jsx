// src/Training.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Lock, CheckCircle, BookOpen, Award, Play, Clock, Star } from "lucide-react";

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

export default function Training() {
  const specialBanner = {
    id: "ifrs17",
    name: "IFRS 17",
    color: "#FF6B35",
    status: "accessible",
    description: "Master IFRS 17 insurance contracts accounting and implementation. This foundational module provides essential knowledge for all subsequent actuarial training.",
    image: ifrs17Img,
    isSpecial: true
  };

  const modules = [
    {
      id: 1,
      name: "Data Clean Up",
      color: "#00E5FF",
      status: "accessible",
      description: "Learn data validation, cleaning, and standardization techniques for actuarial datasets.",
      image: dataCleanupImg,
      number: "01"
    },
    {
      id: 2,
      name: "Pricing Fundamentals",
      color: "#7C4DFF",
      status: "locked",
      description: "Master the core principles of insurance pricing and risk assessment.",
      image: pricingFundamentalsImg,
      number: "02"
    },
    {
      id: 3,
      name: "Liability for Remaining Coverage (LRC)",
      color: "#00E5FF",
      status: "locked",
      description: "Understand LRC calculations and their importance in insurance valuations.",
      image: lrcImg,
      number: "03"
    },
    {
      id: 4,
      name: "General Insurance Valuations (Liability for Incurred Claims)",
      color: "#7C4DFF",
      status: "locked",
      description: "Advanced techniques for general insurance liability valuations.",
      image: giValuationsImg,
      number: "04"
    },
    {
      id: 5,
      name: "Capital Adequacy Analysis",
      color: "#00E5FF",
      status: "locked",
      description: "Learn capital adequacy requirements and solvency analysis methods.",
      image: capitalAdequacyImg,
      number: "05"
    },
    {
      id: 6,
      name: "Financial Performance Analysis (Ratio Analysis)",
      color: "#7C4DFF",
      status: "locked",
      description: "Master financial ratio analysis and balance sheet evaluation techniques.",
      image: finPerformanceImg,
      number: "06"
    },
    {
      id: 7,
      name: "Premium Certificates",
      color: "#00E5FF",
      status: "locked",
      description: "Learn premium certificate preparation and validation processes.",
      image: premCertificatesImg,
      number: "07"
    },
    {
      id: 8,
      name: "Reinsurance Certificates",
      color: "#7C4DFF",
      status: "locked",
      description: "Understand reinsurance certificate creation and management.",
      image: reinCertificatesImg, 
      number: "08"
    },
    {
      id: 9,
      name: "Financial Condition Reporting",
      color: "#00E5FF",
      status: "locked",
      description: "Master financial condition reporting standards and requirements.",
      image: finConditionImg, 
      number: "09"
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
          <Link to={`/modules/${module.id}`} className="h-full flex flex-col group">
            {/* Top Half - Module Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img
                src={module.image}
                alt={module.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
             
              {/* Special Banner Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 text-xs bg-orange-500/30 text-orange-300 rounded-full border border-orange-500/50 flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  Foundation
                </span>
              </div>
            </div>

            {/* Bottom Half - Module Content */}
            <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4 bg-gradient-to-b from-gray-900/90 to-gray-800/80">
              <div>
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <Award className="w-3 h-3 lg:w-4 lg:h-4 text-orange-400 group-hover:text-orange-300 transition-colors" />
                  <h3 className="text-xs lg:text-sm font-bold text-white line-clamp-1 group-hover:text-orange-300 transition-colors">
                    {module.name}
                  </h3>
                </div>
             
                <p className="text-gray-300 text-xs line-clamp-2 lg:line-clamp-3">
                  {module.description}
                </p>
              </div>

              <div className="mt-2">
                <div className="w-full bg-white/10 rounded-full h-1.5 mb-2 overflow-hidden">
                  <div className="bg-orange-500 h-1.5 w-full" />
                </div>
             
                <div className="flex justify-between items-center">
                  <span className="text-sm lg:text-lg font-bold text-orange-300">Start Here</span>
                  <div className="flex items-center gap-1 text-orange-300 group-hover:text-orange-200 transition-colors">
                    <span className="text-xs">Begin</span>
                    <Play className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
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
        <div className={`${baseClasses} h-64 lg:h-72 xl:h-80`} style={style}>
          <Link to={`/modules/${module.id}`} className="h-full flex flex-col group">
            {/* Top Half - Module Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img
                src={module.image}
                alt={module.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
           
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
                  Accessible
                </span>
              </div>
            </div>

            {/* Bottom Half - Module Content */}
            <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4 bg-gradient-to-b from-gray-900/90 to-gray-800/80">
              <div>
                <div className="flex items-center gap-2 mb-1 lg:mb-2">
                  <BookOpen className="w-3 h-3 lg:w-4 lg:h-4 text-white/70 group-hover:text-[#00E5FF] transition-colors" />
                  <h3 className="text-xs lg:text-sm font-bold text-white line-clamp-1 group-hover:text-[#00E5FF] transition-colors">
                    {module.name}
                  </h3>
                </div>
             
                <p className="text-gray-300 text-xs line-clamp-2 lg:line-clamp-3">
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
          </Link>
        </div>
      );
    } else {
      // Locked modules
      const style = {
        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
        border: "2px solid rgba(239, 68, 68, 0.3)",
        boxShadow: `0 0 20px rgba(239, 68, 68, 0.1)`,
      };
      
      return (
        <div className={`${baseClasses} h-64 lg:h-72 xl:h-80`} style={style}>
          <div className="h-full flex flex-col">
            {/* Top Half - Module Image */}
            <div className="h-1/2 relative overflow-hidden">
              <img
                src={module.image}
                alt={module.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-red-500/5" />
           
              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <span className="px-2 py-1 text-xs bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                  Locked
                </span>
              </div>
            </div>

            {/* Bottom Half - Module Content */}
            <div className="h-1/2 flex flex-col justify-between p-3 lg:p-4 bg-gradient-to-b from-gray-900/90 to-gray-800/80">
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
          radial-gradient(1000px at 80% 20%, rgba(124,77,255,0.08), transparent 70%),
          radial-gradient(800px at 20% 80%, rgba(0,229,255,0.08), transparent 70%),
          #060A1E
        `,
      }}
    >
      {/* Module Header Bar */}
      <div className="relative bg-gradient-to-r from-gray-900/90 to-gray-800/90 border-b border-white/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF]">
              Training Modules
            </h1>
            <p className="text-gray-300 text-base sm:text-md leading-relaxed max-w-4xl mx-auto lg:mx-0">
              Your structured actuarial learning path. Each module builds on the previous one. 
              Complete them in order to unlock advanced content and strengthen your analytical expertise.
            </p>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Module Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Responsive grid - 4 cards on all laptop sizes (1024px and up) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Special IFRS 17 Banner - spans full width on mobile, 2 columns on sm, 1 column on lg+ */}
          <div className="sm:col-span-2 lg:col-span-1">
            <ModuleCard module={specialBanner} isSpecial={true} />
          </div>
          
          {/* Regular Modules 1-16 - will automatically flow into 4-column layout on laptops */}
          {modules.map((module) => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      </div>
    </div>
  );
}