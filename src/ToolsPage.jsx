// src/ToolsPage.jsx
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Calculator,
  TrendingUp,
  ExternalLink,
  Search,
  GraduationCap
} from "lucide-react";
import toolsImage from "/src/assets/tools.jpg";
import { getShaThemeColors } from "./theme/sha";

export const toolCategories = [
  {
    title: "Actuarial",
    tools: [
      { 
        name: 'LRC Model', 
        url: 'https://kenbright-lrc-model.share.connect.posit.cloud/',
        icon: Calculator,
        theme: 'blue'
      },
      { 
        name: 'Risk Adjustment', 
        url: 'https://kenbright-risk-adjustment-and-loss-triangles-model.share.connect.posit.cloud',
        icon: TrendingUp,
        theme: 'blue'
      },
      {
        name: 'IFRS 17 Exam',
        url: 'https://ifrs-17-exam-sha.vercel.app/dashboard',
        icon: GraduationCap,
        theme: 'blue'
      },
      { 
        name: 'PRMF Calculator', 
        url: 'https://sha-prmf-calculator.vercel.app',
        icon: Calculator,
        theme: 'blue'
      }
    ]
  }
];

export const totalToolsCount = toolCategories.reduce((acc, category) => acc + category.tools.length, 0);

export default function ToolsPage({ theme = 'dark' }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ 
      duration: 800, 
      easing: "ease-out-quart",
      once: true 
    });
  }, []);

  const isDark = theme === 'dark';
  const shaTheme = getShaThemeColors(theme);
  const rgba = (hex, alpha) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // SHA Actuarial Hub color scheme
  const colors = {
    dark: {
      background: shaTheme.pageGradient,
      text: shaTheme.text,
      title: `linear-gradient(135deg, ${shaTheme.blue}, ${shaTheme.green})`,
      subtitle: shaTheme.textSecondary,
      blue: {
        cardBg: `linear-gradient(135deg, ${rgba(shaTheme.darkBlue, 0.82)}, ${rgba(shaTheme.blue, 0.16)})`,
        cardBorder: rgba(shaTheme.blue, 0.42),
        iconBg: `linear-gradient(135deg, ${shaTheme.blue}, ${shaTheme.cyan})`,
        iconShadow: rgba(shaTheme.blue, 0.32),
        iconColor: shaTheme.cyan,
        cardShadow: rgba(shaTheme.blue, 0.2)
      },
      glows: [
        { color: shaTheme.blue, opacity: 0.12, size: '320px', position: { top: '20%', left: '10%' } },
        { color: shaTheme.green, opacity: 0.1, size: '400px', position: { bottom: '15%', right: '10%' } },
      ]
    },
    light: {
      background: shaTheme.pageGradient,
      text: shaTheme.text,
      title: `linear-gradient(135deg, ${shaTheme.blue}, ${shaTheme.green})`,
      subtitle: shaTheme.textSecondary,
      blue: {
        cardBg: `linear-gradient(135deg, ${rgba(shaTheme.darkBlue, 0.18)}, ${rgba(shaTheme.blue, 0.12)})`,
        cardBorder: rgba(shaTheme.blue, 0.32),
        iconBg: `linear-gradient(135deg, ${shaTheme.blue}, ${shaTheme.cyan})`,
        iconShadow: rgba(shaTheme.blue, 0.24),
        iconColor: shaTheme.blue,
        cardShadow: rgba(shaTheme.blue, 0.13)
      },
      glows: [
        { color: shaTheme.blue, opacity: 0.05, size: '320px', position: { top: '20%', left: '10%' } },
        { color: shaTheme.green, opacity: 0.06, size: '400px', position: { bottom: '15%', right: '10%' } },
      ]
    }
  };

  const currentColors = isDark ? colors.dark : colors.light;

  // Check if there are any results matching the search term across all categories
  const hasResults = toolCategories.some(category => 
    category.tools.some(tool => tool.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div 
        className="relative h-screen w-full font-sans transition-colors duration-300 overflow-y-auto overflow-x-hidden hide-scrollbar"
        style={{
          background: currentColors.background,
          color: currentColors.text
        }}
      >
        {/* Background glow circles */}
        <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
          {currentColors.glows.map((glow, index) => (
            <div
              key={index}
              className="absolute rounded-full blur-3xl"
              style={{
                width: glow.size,
                height: glow.size,
                backgroundColor: glow.color,
                opacity: glow.opacity,
                ...glow.position
              }}
            />
          ))}
        </div>

        {/* Full-Width Background Blended Image (Adjusted height and fade) */}
        <div className="absolute top-0 inset-x-0 h-[250px] md:h-[300px] overflow-hidden pointer-events-none z-0" data-aos="fade-in" data-aos-duration="1500">
          <img 
            src={toolsImage} 
            alt="Actuarial Tools Background" 
            className="w-full h-full object-cover transition-opacity duration-300"
            style={{
              opacity: isDark ? 0.4 : 0.6,
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)'
            }}
          />
        </div>

        {/* Main Foreground Content (Adjusted padding to prevent overlap) */}
        <div className="relative z-10 pt-[250px] md:pt-[300px] px-6 md:px-10 pb-20 max-w-7xl mx-auto min-h-full">
          
          {/* Header & Search */}
          <div id="tools-header" className="text-center mb-16">
            
            <div data-aos="fade-down">
              <h1 
                className="text-4xl md:text-5xl font-black mb-4 bg-clip-text text-transparent drop-shadow-sm"
                style={{ backgroundImage: currentColors.title }}
              >
                Actuarial Tools
              </h1>
              <p 
                className="text-lg md:text-xl mb-10 font-medium"
              style={{ color: currentColors.subtitle }}
              >
                Access our suite of actuarial models and calculators
              </p>
            </div>

            {/* In-Page Search Bar */}
            <div className="relative w-full max-w-2xl mx-auto">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: currentColors.subtitle }} />
              <input
                type="text"
                placeholder="Search actuarial tools..."
                className="w-full border rounded-full py-4 pl-14 pr-6 focus:outline-none transition-all shadow-xl text-lg backdrop-blur-md"
                style={{
                  background: shaTheme.inputBg,
                  borderColor: shaTheme.inputBorder,
                  color: currentColors.text,
                  boxShadow: isDark ? `0 10px 30px ${rgba(shaTheme.blue, 0.16)}` : `0 10px 30px ${rgba(shaTheme.blue, 0.08)}`
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Grouped Tools Grid / Empty State */}
          {hasResults ? (
            <div className="space-y-16">
              {toolCategories.map((category, categoryIndex) => {
                const filteredTools = category.tools.filter(tool => 
                  tool.name.toLowerCase().includes(searchTerm.toLowerCase())
                );

                if (filteredTools.length === 0) return null;

                return (
                  <div key={category.title} data-aos="fade-up" data-aos-delay={categoryIndex * 100} data-aos-anchor="#tools-header">
                    
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6 pl-2">
                      <div className="w-1.5 h-8 rounded-full" style={{ background: currentColors.blue.iconBg }}></div>
                      <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: currentColors.text }}>
                        {category.title}
                      </h2>
                    </div>

                    {/* Category Tools Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredTools.map((tool, index) => {
                        const themeColors = currentColors.blue;
                        const Icon = tool.icon;
                        
                        return (
                          <div 
                            key={tool.name} 
                            data-aos="zoom-in-up" 
                            data-aos-delay={(index * 50)}
                            data-aos-anchor="#tools-header"
                          >
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group flex flex-col h-full backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                              style={{
                                background: themeColors.cardBg,
                                border: `1px solid ${themeColors.cardBorder}`,
                                boxShadow: `0 8px 32px ${themeColors.cardShadow}`
                              }}
                            >
                              <div className="flex justify-between items-start mb-6">
                                <div
                                  className="w-14 h-14 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                                  style={{
                                    background: themeColors.iconBg,
                                    boxShadow: `0 8px 20px ${themeColors.iconShadow}`
                                  }}
                                >
                                  <Icon size={28} className="text-white" />
                                </div>
                                
                                <div className="p-2 rounded-full opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:bg-white/10">
                                  <ExternalLink size={18} style={{ color: themeColors.iconColor }} />
                                </div>
                              </div>

                              <h3 className="text-lg font-bold tracking-wide leading-snug">
                                {tool.name}
                              </h3>
                            </a>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-16 text-center rounded-2xl border border-dashed backdrop-blur-md" 
                 style={{ borderColor: shaTheme.cardBorder, background: isDark ? rgba(shaTheme.blue, 0.06) : rgba(shaTheme.blue, 0.03) }}>
              <p className="text-xl" style={{ color: currentColors.subtitle }}>No tools found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm("")} className="mt-4 font-semibold transition-colors hover:underline" style={{ color: currentColors.blue.iconColor }}>
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}