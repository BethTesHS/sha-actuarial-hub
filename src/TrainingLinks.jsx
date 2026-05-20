import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Grid, HardDrive, BarChart2, Code, FileText, Database, ExternalLink, Search } from "lucide-react";

export default function TrainingLinks({ theme = 'dark' }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-quart" });
  }, []);

  const isDark = theme === 'dark';

  // Theme-specific color schemes
  const colors = {
    dark: {
      background: 'linear-gradient(to bottom right, #0f172a, #020617)',
      text: '#ffffff',
      title: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
      subtitle: '#94a3b8',
      blue: {
        cardBg: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.1))',
        cardBorder: 'rgba(96, 165, 250, 0.3)',
        iconBg: 'linear-gradient(to bottom right, #3b82f6, #06b6d4)',
        iconShadow: 'rgba(59, 130, 246, 0.3)',
        headerText: 'linear-gradient(to right, #93c5fd, #67e8f9)',
        linkBg: 'rgba(59, 130, 246, 0.1)',
        linkBorder: 'rgba(96, 165, 250, 0.2)',
        linkHover: 'rgba(59, 130, 246, 0.2)',
        linkText: '#bfdbfe',
        sourceBg: 'rgba(59, 130, 246, 0.3)',
        sourceText: '#93c5fd',
        sourceBorder: 'rgba(96, 165, 250, 0.4)',
        iconColor: '#60a5fa',
        cardShadow: 'rgba(59, 130, 246, 0.2)'
      },
      purple: {
        cardBg: 'linear-gradient(to bottom right, rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.1))',
        cardBorder: 'rgba(167, 139, 250, 0.3)',
        iconBg: 'linear-gradient(to bottom right, #8b5cf6, #d946ef)',
        iconShadow: 'rgba(139, 92, 246, 0.3)',
        headerText: 'linear-gradient(to right, #c4b5fd, #f0abfc)',
        linkBg: 'rgba(139, 92, 246, 0.1)',
        linkBorder: 'rgba(167, 139, 250, 0.2)',
        linkHover: 'rgba(139, 92, 246, 0.2)',
        linkText: '#ddd6fe',
        sourceBg: 'rgba(139, 92, 246, 0.3)',
        sourceText: '#c4b5fd',
        sourceBorder: 'rgba(167, 139, 250, 0.4)',
        iconColor: '#a78bfa',
        cardShadow: 'rgba(139, 92, 246, 0.2)'
      },
      glows: [
        { color: '#a855f7', opacity: 0.15, size: '300px', position: { top: '20%', left: '10%' } },
        { color: '#06b6d4', opacity: 0.15, size: '400px', position: { bottom: '15%', right: '10%' } },
        { color: '#3b82f6', opacity: 0.15, size: '250px', position: { top: '50%', right: '30%' } }
      ]
    },
    light: {
      background: 'linear-gradient(to bottom right, #f8fafc, #e2e8f0)',
      text: '#0f172a',
      title: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      subtitle: '#475569',
      blue: {
        cardBg: 'linear-gradient(to bottom right, rgba(37, 99, 235, 0.08), rgba(14, 165, 233, 0.08))',
        cardBorder: 'rgba(37, 99, 235, 0.25)',
        iconBg: 'linear-gradient(to bottom right, #2563eb, #0ea5e9)',
        iconShadow: 'rgba(37, 99, 235, 0.25)',
        headerText: 'linear-gradient(to right, #1d4ed8, #0284c7)',
        linkBg: 'rgba(37, 99, 235, 0.06)',
        linkBorder: 'rgba(37, 99, 235, 0.15)',
        linkHover: 'rgba(37, 99, 235, 0.12)',
        linkText: '#1e40af',
        sourceBg: 'rgba(37, 99, 235, 0.15)',
        sourceText: '#1e40af',
        sourceBorder: 'rgba(37, 99, 235, 0.3)',
        iconColor: '#2563eb',
        cardShadow: 'rgba(37, 99, 235, 0.15)'
      },
      purple: {
        cardBg: 'linear-gradient(to bottom right, rgba(124, 58, 237, 0.08), rgba(192, 38, 211, 0.08))',
        cardBorder: 'rgba(124, 58, 237, 0.25)',
        iconBg: 'linear-gradient(to bottom right, #7c3aed, #c026d3)',
        iconShadow: 'rgba(124, 58, 237, 0.25)',
        headerText: 'linear-gradient(to right, #6d28d9, #a21caf)',
        linkBg: 'rgba(124, 58, 237, 0.06)',
        linkBorder: 'rgba(124, 58, 237, 0.15)',
        linkHover: 'rgba(124, 58, 237, 0.12)',
        linkText: '#6b21a8',
        sourceBg: 'rgba(124, 58, 237, 0.15)',
        sourceText: '#6b21a8',
        sourceBorder: 'rgba(124, 58, 237, 0.3)',
        iconColor: '#7c3aed',
        cardShadow: 'rgba(124, 58, 237, 0.15)'
      },
      glows: [
        { color: '#a855f7', opacity: 0.04, size: '300px', position: { top: '20%', left: '10%' } },
        { color: '#06b6d4', opacity: 0.04, size: '400px', position: { bottom: '15%', right: '10%' } },
        { color: '#3b82f6', opacity: 0.04, size: '250px', position: { top: '50%', right: '30%' } }
      ]
    }
  };

  const currentColors = isDark ? colors.dark : colors.light;

  const categories = [
    { theme: 'blue', icon: Grid, title: 'Excel', links: [{ name: 'Master Microsoft Excel', source: 'LinkedIn', url: 'https://www.linkedin.com/learning/paths/master-microsoft-excel' }] },
    { theme: 'blue', icon: HardDrive, title: 'Power Query', links: [{ name: 'Excel Power Query', source: 'LinkedIn', url: 'https://www.linkedin.com/learning/excel-power-query-get-transform-23753644' }] },
    { theme: 'blue', icon: BarChart2, title: 'Power BI', links: [{ name: 'Power BI Masterclass', source: 'Udemy', url: 'https://www.udemy.com/course/70-778-analyzing-and-visualizing-data-with-power-bi/' }] },
    { theme: 'purple', icon: FileText, title: 'VBA', links: [{ name: 'Excel VBA Automation', source: 'Udemy', url: 'https://www.udemy.com/course/excel-vba-and-macros-course/' }] },
    { theme: 'purple', icon: Database, title: 'SQL', links: [{ name: 'SQL Database Training', source: 'Udemy', url: 'https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/' }] },
    { theme: 'purple', icon: Code, title: 'R & Python', links: [{ name: 'Data Science Path', source: 'DataCamp', url: 'https://www.datacamp.com' }] }
  ];

  // Intelligent filter logic
  const filteredCategories = categories.map(cat => {
    // Check if the category title matches
    const matchCatTitle = cat.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Check if any links inside match
    const filteredLinks = cat.links.filter(link => 
      link.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      link.source.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // If the category title matches, show all its links. If not, only show the matching links.
    if (matchCatTitle) {
      return cat;
    } else if (filteredLinks.length > 0) {
      return { ...cat, links: filteredLinks };
    }
    
    return null;
  }).filter(cat => cat !== null);

  return (
    <div 
      className="relative p-6 pt-24 md:p-10 md:pt-28 min-h-screen font-sans transition-colors duration-300"
      style={{ background: currentColors.background, color: currentColors.text }}
    >
      {/* Background glow circles */}
      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        {currentColors.glows.map((glow, index) => (
          <div key={index} className="absolute rounded-full blur-3xl" style={{ width: glow.size, height: glow.size, backgroundColor: glow.color, opacity: glow.opacity, ...glow.position }} />
        ))}
      </div>

      {/* Header & Search */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent h-16" style={{ backgroundImage: currentColors.title }}>
          Training Resources
        </h1>
        <p className="text-lg md:text-xl mb-8" style={{ color: currentColors.subtitle }}>
          Curated collection of premium courses to boost your skills
        </p>

        {/* In-Page Search Bar */}
        <div className="relative w-full max-w-2xl mx-auto">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search categories, courses, or platforms..."
            className="w-full border rounded-full py-4 pl-14 pr-6 focus:outline-none transition-all shadow-md text-lg"
            style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              color: currentColors.text,
              boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.2)' : '0 4px 15px rgba(0,0,0,0.05)'
            }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {filteredCategories.map((category, index) => {
            const themeColors = currentColors[category.theme];
            const Icon = category.icon;
            
            return (
              <div
                key={index}
                className="backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:scale-105"
                style={{ background: themeColors.cardBg, border: `1px solid ${themeColors.cardBorder}`, boxShadow: `0 8px 32px ${themeColors.cardShadow}` }}
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="flex items-center gap-4 mb-4 pb-4" style={{ borderBottom: `1px solid ${themeColors.cardBorder}` }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg" style={{ background: themeColors.iconBg, boxShadow: `0 4px 15px ${themeColors.iconShadow}` }}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h2 className="text-xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: themeColors.headerText }}>
                    {category.title}
                  </h2>
                </div>

                <ul className="space-y-2">
                  {category.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 group"
                        style={{ background: themeColors.linkBg, border: `1px solid ${themeColors.linkBorder}` }}
                        onMouseEnter={(e) => e.currentTarget.style.background = themeColors.linkHover}
                        onMouseLeave={(e) => e.currentTarget.style.background = themeColors.linkBg}
                      >
                        <span style={{ color: themeColors.linkText }} className="font-medium text-sm lg:text-base">
                          {link.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded font-medium" style={{ background: themeColors.sourceBg, color: themeColors.sourceText, border: `1px solid ${themeColors.sourceBorder}` }}>
                            {link.source}
                          </span>
                          <ExternalLink size={16} style={{ color: themeColors.iconColor }} className="opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto py-16 text-center rounded-2xl border border-dashed" style={{ borderColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)', background: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)' }}>
          <p className="text-xl" style={{ color: currentColors.subtitle }}>No resources found matching "{searchTerm}"</p>
          <button onClick={() => setSearchTerm("")} className="mt-4 font-medium transition-colors hover:underline text-blue-500 hover:text-blue-400">
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}