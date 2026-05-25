import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Grid, HardDrive, BarChart2, Code, FileText, Database, ExternalLink, Search } from "lucide-react";
import { getShaThemeColors } from "./theme/sha";

export default function TrainingLinks({ theme = 'dark' }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-quart" });
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
        iconShadow: rgba(shaTheme.blue, 0.3),
        headerText: `linear-gradient(to right, ${shaTheme.cyan}, ${shaTheme.blue})`,
        linkBg: rgba(shaTheme.blue, 0.12),
        linkBorder: rgba(shaTheme.blue, 0.24),
        linkHover: rgba(shaTheme.blue, 0.22),
        linkText: '#D6F4FF',
        sourceBg: rgba(shaTheme.blue, 0.26),
        sourceText: '#B7ECFF',
        sourceBorder: rgba(shaTheme.cyan, 0.35),
        iconColor: shaTheme.cyan,
        cardShadow: rgba(shaTheme.blue, 0.18)
      },
      purple: {
        cardBg: `linear-gradient(135deg, ${rgba(shaTheme.green, 0.16)}, ${rgba(shaTheme.darkBlue, 0.55)})`,
        cardBorder: rgba(shaTheme.green, 0.35),
        iconBg: `linear-gradient(135deg, ${shaTheme.green}, ${shaTheme.blue})`,
        iconShadow: rgba(shaTheme.green, 0.28),
        headerText: `linear-gradient(to right, ${shaTheme.green}, ${shaTheme.blue})`,
        linkBg: rgba(shaTheme.green, 0.12),
        linkBorder: rgba(shaTheme.green, 0.24),
        linkHover: rgba(shaTheme.green, 0.2),
        linkText: '#E7F8D8',
        sourceBg: rgba(shaTheme.green, 0.22),
        sourceText: '#D6F5BC',
        sourceBorder: rgba(shaTheme.green, 0.35),
        iconColor: shaTheme.green,
        cardShadow: rgba(shaTheme.green, 0.16)
      },
      glows: [
        { color: shaTheme.blue, opacity: 0.12, size: '320px', position: { top: '18%', left: '8%' } },
        { color: shaTheme.green, opacity: 0.12, size: '420px', position: { bottom: '15%', right: '10%' } },
        { color: shaTheme.darkBlue, opacity: 0.2, size: '260px', position: { top: '50%', right: '30%' } }
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
        headerText: `linear-gradient(to right, ${shaTheme.blue}, ${shaTheme.cyan})`,
        linkBg: rgba(shaTheme.blue, 0.06),
        linkBorder: rgba(shaTheme.blue, 0.15),
        linkHover: rgba(shaTheme.blue, 0.12),
        linkText: shaTheme.blue,
        sourceBg: rgba(shaTheme.blue, 0.12),
        sourceText: shaTheme.blue,
        sourceBorder: rgba(shaTheme.blue, 0.26),
        iconColor: shaTheme.blue,
        cardShadow: rgba(shaTheme.blue, 0.12)
      },
      purple: {
        cardBg: `linear-gradient(135deg, ${rgba(shaTheme.green, 0.1)}, ${rgba(shaTheme.blue, 0.03)})`,
        cardBorder: rgba(shaTheme.green, 0.28),
        iconBg: `linear-gradient(135deg, ${shaTheme.green}, ${shaTheme.blue})`,
        iconShadow: rgba(shaTheme.green, 0.24),
        headerText: `linear-gradient(to right, ${shaTheme.green}, ${shaTheme.blue})`,
        linkBg: rgba(shaTheme.green, 0.07),
        linkBorder: rgba(shaTheme.green, 0.18),
        linkHover: rgba(shaTheme.green, 0.13),
        linkText: shaTheme.darkBlue,
        sourceBg: rgba(shaTheme.green, 0.14),
        sourceText: shaTheme.darkBlue,
        sourceBorder: rgba(shaTheme.green, 0.3),
        iconColor: shaTheme.green,
        cardShadow: rgba(shaTheme.green, 0.13)
      },
      glows: [
        { color: shaTheme.blue, opacity: 0.05, size: '320px', position: { top: '18%', left: '8%' } },
        { color: shaTheme.green, opacity: 0.07, size: '420px', position: { bottom: '15%', right: '10%' } },
        { color: shaTheme.darkBlue, opacity: 0.04, size: '260px', position: { top: '50%', right: '30%' } }
      ]
    }
  };

  const currentColors = isDark ? colors.dark : colors.light;

  const categories = [
    { theme: 'blue', icon: Grid, title: 'Excel', links: [{ name: 'Master Microsoft Excel', source: 'LinkedIn', url: 'https://www.linkedin.com/learning/paths/master-microsoft-excel' }] },
    { theme: 'blue', icon: HardDrive, title: 'Power Query', links: [{ name: 'Excel Power Query', source: 'LinkedIn', url: 'https://www.linkedin.com/learning/excel-power-query-get-transform-23753644' }] },
    { theme: 'blue', icon: BarChart2, title: 'Power BI', links: [{ name: 'Power BI Masterclass', source: 'Udemy', url: 'https://www.udemy.com/course/70-778-analyzing-and-visualizing-data-with-power-bi/' }] },
    { theme: 'blue', icon: FileText, title: 'VBA', links: [{ name: 'Excel VBA Automation', source: 'Udemy', url: 'https://www.udemy.com/course/excel-vba-and-macros-course/' }] },
    { theme: 'blue', icon: Database, title: 'SQL', links: [{ name: 'SQL Database Training', source: 'Udemy', url: 'https://www.udemy.com/course/the-ultimate-mysql-bootcamp-go-from-sql-beginner-to-expert/' }] },
    { theme: 'blue', icon: Code, title: 'R & Python', links: [{ name: 'Data Science Path', source: 'DataCamp', url: 'https://www.datacamp.com' }] }
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
      className="relative px-6 pt-24 pb-12 md:px-10 md:pt-28 md:pb-16 min-h-screen font-sans transition-colors duration-300"
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
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5" style={{ color: currentColors.subtitle }} />
          <input
            type="text"
            placeholder="Search categories, courses, or platforms..."
            className="w-full border rounded-full py-4 pl-14 pr-6 focus:outline-none transition-all shadow-md text-lg"
            style={{
              background: shaTheme.inputBg,
              borderColor: shaTheme.inputBorder,
              color: currentColors.text,
              boxShadow: isDark ? `0 4px 20px ${rgba(shaTheme.blue, 0.14)}` : `0 4px 15px ${rgba(shaTheme.blue, 0.08)}`
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
        <div className="max-w-6xl mx-auto py-16 text-center rounded-2xl border border-dashed" style={{ borderColor: shaTheme.cardBorder, background: isDark ? rgba(shaTheme.blue, 0.06) : rgba(shaTheme.blue, 0.03) }}>
          <p className="text-xl" style={{ color: currentColors.subtitle }}>No resources found matching "{searchTerm}"</p>
          <button onClick={() => setSearchTerm("")} className="mt-4 font-medium transition-colors hover:underline" style={{ color: shaTheme.blue }}>
            Clear search
          </button>
        </div>
      )}
    </div>
  );
}