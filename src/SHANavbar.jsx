// src/SHANavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Home, BookOpen, Gamepad2, Calculator, User, ChevronDown, ChevronRight, LogOut, Menu, X, LogIn, UserPlus, FileText, Search, TrendingUp, ShieldCheck } from "lucide-react";
import shaLogo from "./assets/SHA_Logo2.png";
import { getShaThemeColors } from "./theme/sha";

export default function SHANavbar({ user, onLogout, theme = "dark" }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showIfrs17Menu, setShowIfrs17Menu] = useState(false);
  const [showIfrs17GameSubmenu, setShowIfrs17GameSubmenu] = useState(false);
  const [showResourcesMenu, setShowResourcesMenu] = useState(false);
  const [showResourcesIndustrySubmenu, setShowResourcesIndustrySubmenu] = useState(false);
  const [, setShowToolsMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Search State
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMobileMenu && e.target.closest('.mobile-menu-container')) return;
      
      if (!e.target.closest('.profile-dropdown')) setShowProfileMenu(false);
      if (!e.target.closest('.resources-dropdown')) setShowResourcesMenu(false);
      if (!e.target.closest('.tools-dropdown')) setShowToolsMenu(false);
      if (!e.target.closest('.ifrs17-dropdown')) setShowIfrs17Menu(false);
      if (!e.target.closest('.mobile-menu-button') && !e.target.closest('.mobile-menu-container')) {
        setShowMobileMenu(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showMobileMenu]);

  useEffect(() => {
    if (!showIfrs17Menu) setShowIfrs17GameSubmenu(false);
  }, [showIfrs17Menu]);

  useEffect(() => {
    if (!showResourcesMenu) setShowResourcesIndustrySubmenu(false);
  }, [showResourcesMenu]);

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    } else {
      setSearchQuery(""); // Clear on close
    }
  }, [showSearchModal]);

  const homePath = isLoggedIn ? "/SHADashboard" : "/";

  const isActive = (path) => {
    if (path === homePath) {
      return currentPath === "/" || currentPath === "/SHADashboard";
    }
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const colors = getShaThemeColors(theme);

  const navItems = [
    { path: homePath, label: "Home", icon: <Home className="w-5 h-5" /> },
    { path: "/my-progress", label: "My Progress", icon: <TrendingUp className="w-5 h-5" /> },
    { path: "/modules", label: "Training", icon: <BookOpen className="w-5 h-5" /> },
    ...(user?.role === "supervisor" ? [{ path: "/supervisor", label: "Supervisor", icon: <ShieldCheck className="w-5 h-5" /> }] : []),
  ];

  const ifrs17GameOptions = [
    {
      label: "Quest and Conquer",
      headline: "IFRS 17 Quest and Conquer",
      description: "Master IFRS 17 insurance accounting standards through interactive gamified learning",
      url: "https://www.ifrs17game.com/",
    },
    {
      label: "Executive Game",
      headline: "IFRS 17 Executive Game",
      description: "Executive-level IFRS 17 simulation and strategic scenarios.",
      url: "https://ifrs17-game-v2.vercel.app/play",
    },
  ];

  const ifrs17Items = [
    { label: "Module 0 (IFRS 17)", url: "/modules/IFRS 17", icon: <BookOpen className="w-4 h-4" />, internal: true },
    { label: "Learn17", url: "https://learn17.com/", icon: <BookOpen className="w-4 h-4" /> },
    { label: "IFRS 17 Insurance Contracts", url: "/pdfs/ifrs-17-insurance-contracts.pdf", icon: <FileText className="w-4 h-4" />, download: true },
    { label: "IFRS 17 Illustrative Examples", url: "/pdfs/IFRS-17-Insurance-contracts-illustrative-examples.pdf", icon: <FileText className="w-4 h-4" />, download: true },
  ];

  const toolItems = [
    { label: "UPR & GEP Model", url: "https://kenbright-upr-and-gep-model.share.connect.posit.cloud", icon: <Calculator className="w-4 h-4" /> },
    { label: "LRC Model", url: "https://kenbright-lrc-model.share.connect.posit.cloud/", icon: <Calculator className="w-4 h-4" /> },
    { label: "Exposure, Frequency & Severity Model", url: "https://kenbright-exposure-frequency-and-severity-model.share.connect.posit.cloud", icon: <Calculator className="w-4 h-4" /> },
    { label: "Risk Adjustment & Loss Triangles", url: "https://kenbright-risk-adjustment-and-loss-triangles-model.share.connect.posit.cloud", icon: <Calculator className="w-4 h-4" /> },
    { label: "PRMF Calculator", url: "https://prmf-calculator.vercel.app/ ", icon: <Calculator className="w-4 h-4" /> }
  ];

  const industryReportRegions = [
    { label: "Kenya", url: "/" },
    { label: "Uganda", url: "/" },
    { label: "Tanzania", url: "/" },
  ];

  const resourceItems = [
    { label: "QAS Reports", path: "/qas-reports", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Training Links", path: "/training-links", icon: <BookOpen className="w-4 h-4" /> },
    { label: "File Formats", path: "/file-saving-format", icon: <BookOpen className="w-4 h-4" /> },
    { label: "Qualification Pathway", url: "/pdfs/qualification-handbook-2025-2026.pdf", icon: <BookOpen className="w-4 h-4" /> },
  ];

  const qualificationPathwayItem = resourceItems.find((x) => x.label === "Qualification Pathway");

  // List of all training modules to make them globally searchable
  const trainingModules = [
    { id: "IFRS 17", name: "IFRS 17 (Foundation)" },
    { id: 1, name: "GI Data Clean Up" },
    { id: 2, name: "Pricing Fundamentals" },
    { id: 3, name: "Liability for Remaining Coverage (LRC)" },
    { id: 4, name: "General Insurance Valuations (Liability for Incurred Claims)" },
    { id: 5, name: "Capital Adequacy Analysis" },
    { id: 6, name: "Financial Performance Analysis (Ratio Analysis)" },
    { id: 7, name: "Premium Certificates" },
    { id: 8, name: "Reinsurance Certificates" },
    { id: 9, name: "Financial Condition Report (FCR)" },
    { id: 10, name: "Ordinary Life Valuation" },
    { id: 11, name: "Group Business Valuation" },
    { id: 12, name: "Pension Valuation" },
    { id: 13, name: "Investment Policy Statements (IPS)" },
    { id: 14, name: "Post Retirement Medical Fund" },
    { id: 15, name: "Defined Benefit (DB) & Defined Contribution (DC) Valuations" },
    { id: 16, name: "IAS 19 Valuation" },
    { id: 17, name: "ESG (Environmental, Social and Governance)" },
    { id: 18, name: "Business Development" }
  ];

  // Combine items for the Global Search
  const searchableItems = [
    ...navItems.map(i => ({ title: i.label, link: i.path, type: "Page", icon: i.icon })),
    ...trainingModules.map(i => ({ title: i.name, link: `/modules/${i.id}`, type: "Training Module", icon: <BookOpen className="w-4 h-4" /> })),
    ...ifrs17Items.map(i => ({ title: i.label, link: i.url, type: "IFRS 17", icon: i.icon, download: i.download })),
    ...ifrs17GameOptions.map((g) => ({
      title: g.headline,
      link: g.url,
      type: "IFRS 17",
      icon: <Gamepad2 className="w-4 h-4" />,
    })),
    ...toolItems.map(i => ({ title: i.label, link: i.url, type: "Tool", icon: i.icon })),
    ...resourceItems.map(i => ({ title: i.label, link: i.path || i.url, type: "Resource", icon: i.icon })),
    ...industryReportRegions.map((r) => ({
      title: `Industry report — ${r.label}`,
      link: r.url,
      type: "Resource",
      icon: <BookOpen className="w-4 h-4" />,
    })),
    { title: "Dashboard", link: "/SHADashboard", type: "Page", icon: <Home className="w-4 h-4" /> },
    { title: "Tools Dashboard", link: "/tools", type: "Page", icon: <Calculator className="w-4 h-4" /> },
    { title: "Profile", link: "/profile", type: "Account", icon: <User className="w-4 h-4" /> }
  ];

  const filteredSearchItems = searchQuery
    ? searchableItems.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.type.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const getUserInitials = () => {
    if (!user) return "U";
    if (user.name) return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    if (user.username) return user.username.slice(0, 2).toUpperCase();
    return "U";
  };

  const toggleMobileMenu = (e) => {
    e.stopPropagation();
    setShowMobileMenu(!showMobileMenu);
  };

  const handleLogout = () => {
    if (onLogout) onLogout();
    setShowMobileMenu(false);
    setShowProfileMenu(false);
  };

  const handleSearchResultClick = (item) => {
    setShowSearchModal(false);
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.link);
    }
  };

  const renderShaLogo = () => (
    <Link to={homePath} className="flex items-center gap-3 group shrink-0">
      <div className="relative flex items-center justify-center w-32 h-32 -my-4 transition-transform duration-300 group-hover:scale-105">
        <img src={shaLogo} alt="SHA Logo" className="w-full h-full object-contain" />
      </div>
      {/* <div className="hidden sm:block whitespace-nowrap">
        <div className="font-bold text-lg leading-tight" style={{ color: colors.text }}>Actuarial Hub</div>
        <div className="text-xs font-medium mt-0.5" style={{ color: colors.textSecondary }}>Professional Training</div>
      </div> */}
    </Link>
  );

  // LOGGED OUT NAVBAR
  if (!isLoggedIn) {
    return (
      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: isScrolled 
            ? colors.navBg
            : colors.navBg.replace('0.95', '0.98'),
          backdropFilter: 'blur(20px)',
          borderBottom: isScrolled 
            ? `1px solid ${colors.navBorder}`
            : `1px solid ${colors.navBorder}`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {renderShaLogo()}

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => navigate('/SHAAuth?mode=login')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 whitespace-nowrap"
                style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', color: colors.text }}
              >
                <LogIn className="w-4 h-4" /> Log In
              </button>
              <button
                onClick={() => navigate('/SHAAuth?mode=signup')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 hover:shadow-2xl whitespace-nowrap"
                style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})`, color: 'white' }}
              >
                <UserPlus className="w-4 h-4" /> Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // LOGGED IN NAVBAR
  return (
    <>
      {/* Search Modal Overlay */}
      {showSearchModal && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-24 pb-4 px-4 bg-black/40 backdrop-blur-sm"
          onClick={() => setShowSearchModal(false)}
        >
          <div 
            className="w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ background: colors.darkCard, border: `1px solid ${colors.primary}30` }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border-b" style={{ borderColor: `${colors.primary}20` }}>
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search resources, modules, tools..."
                className="w-full bg-transparent py-4 pl-12 pr-4 outline-none text-lg"
                style={{ color: colors.text }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                onClick={() => setShowSearchModal(false)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-lg hover:bg-white/10"
                style={{ color: colors.textSecondary }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchQuery === "" ? (
                <div className="p-6 text-center text-sm" style={{ color: colors.textSecondary }}>
                  Type to start searching...
                </div>
              ) : filteredSearchItems.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {filteredSearchItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchResultClick(item)}
                      className="flex items-center justify-between w-full text-left p-3 rounded-xl transition-colors hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                          {item.icon}
                        </div>
                        <div>
                          <div className="font-medium text-sm" style={{ color: colors.text }}>{item.title}</div>
                          <div className="text-xs mt-0.5" style={{ color: colors.textSecondary }}>{item.type}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm" style={{ color: colors.textSecondary }}>
                  No results found for "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <nav
        className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
        style={{
          background: colors.navBg,
          backdropFilter: 'blur(20px)',
          borderBottom: theme === 'dark' ? `1px solid ${colors.primary}20` : '1px solid rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="w-full px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {renderShaLogo()}
            </div>

            {/* Center Navigation - Desktop */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${isActive(item.path) ? 'font-semibold' : 'hover:scale-105'}`}
                    style={{
                      color: isActive(item.path) ? colors.primary : colors.text,
                      background: isActive(item.path) ? `${colors.primary}15` : 'transparent'
                    }}
                  >
                    {item.icon}
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  </Link>
                ))}

                <div className="relative ifrs17-dropdown">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowIfrs17Menu(!showIfrs17Menu); setShowToolsMenu(false); setShowResourcesMenu(false); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ color: showIfrs17Menu ? colors.primary : colors.text, background: showIfrs17Menu ? `${colors.primary}15` : 'transparent' }}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-medium whitespace-nowrap">IFRS</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showIfrs17Menu ? 'rotate-180' : ''}`} />
                  </button>
                  {showIfrs17Menu && (
                    <div className="absolute top-full left-0 mt-2 w-72 rounded-xl shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                      <Link
                        to="/modules/IFRS 17"
                        className="flex items-center gap-3 px-4 py-3 transition-all text-sm hover:bg-white/5"
                        style={{ color: colors.text, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                      >
                        <BookOpen className="w-4 h-4 shrink-0" />
                        <span className="font-medium whitespace-nowrap">Module 0 (IFRS 17)</span>
                      </Link>

                      <div
                        className="relative border-b border-white/5"
                        onMouseEnter={() => setShowIfrs17GameSubmenu(true)}
                        onMouseLeave={() => setShowIfrs17GameSubmenu(false)}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowIfrs17GameSubmenu((v) => !v);
                          }}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 transition-all text-sm text-left hover:bg-white/5"
                          style={{ color: colors.text }}
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <Gamepad2 className="w-4 h-4 shrink-0" />
                            <span className="font-medium whitespace-nowrap">Game</span>
                          </span>
                          <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${showIfrs17GameSubmenu ? 'rotate-90' : ''}`} style={{ color: colors.textSecondary }} />
                        </button>

                        {showIfrs17GameSubmenu && (
                          <div
                            className="absolute left-full top-0 ml-1 pl-1 z-[60] min-w-[20rem] max-w-[22rem]"
                            onMouseEnter={() => setShowIfrs17GameSubmenu(true)}
                            onMouseLeave={() => setShowIfrs17GameSubmenu(false)}
                          >
                            <div
                              className="rounded-xl shadow-2xl overflow-hidden"
                              style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}
                            >
                              {ifrs17GameOptions.map((opt, idx) => (
                                <a
                                  key={opt.url}
                                  href={opt.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block px-4 py-3 transition-all hover:bg-white/5"
                                  style={{
                                    borderBottom: idx < ifrs17GameOptions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                                  }}
                                >
                                  <div className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: colors.primary }}>
                                    {opt.label}
                                  </div>
                                  <div className="text-sm font-semibold leading-snug mb-1" style={{ color: colors.text }}>
                                    {opt.headline}
                                  </div>
                                  <div className="text-xs leading-relaxed" style={{ color: colors.textSecondary }}>
                                    {opt.description}
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {ifrs17Items.slice(1).map((item, i) => (
                        <a
                          key={item.url}
                          href={item.url}
                          {...(item.download ? { download: true } : {})}
                          target={item.download ? undefined : '_blank'}
                          rel={item.download ? undefined : 'noopener noreferrer'}
                          className="flex items-center gap-3 px-4 py-3 transition-all text-sm hover:bg-white/5"
                          style={{ color: colors.text, borderBottom: i < ifrs17Items.slice(1).length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
                        >
                          {item.icon}
                          <span className="font-medium whitespace-nowrap">{item.label}</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/tools"
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 ${isActive('/tools') ? 'font-semibold' : 'hover:scale-105'}`}
                  style={{ color: isActive('/tools') ? colors.primary : colors.text, background: isActive('/tools') ? `${colors.primary}15` : 'transparent' }}
                >
                  <Calculator className="w-5 h-5" />
                  <span className="text-sm font-medium whitespace-nowrap">Tools</span>
                </Link>

                <div className="relative resources-dropdown">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowResourcesMenu(!showResourcesMenu); setShowToolsMenu(false); setShowIfrs17Menu(false); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ color: showResourcesMenu ? colors.primary : colors.text, background: showResourcesMenu ? `${colors.primary}15` : 'transparent' }}
                  >
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm font-medium whitespace-nowrap">Resources</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showResourcesMenu ? 'rotate-180' : ''}`} />
                  </button>
                  {showResourcesMenu && (
                    <div className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                      {resourceItems.slice(0, 3).map((item) => {
                        const href = item.path || item.url;
                        const isExternal = /^https?:\/\//i.test(href);
                        if (!isExternal) {
                          return (
                            <Link
                              key={href}
                              to={href}
                              className="flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5"
                              style={{ color: colors.text, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                            >
                              {item.icon} <span className="whitespace-nowrap">{item.label}</span>
                            </Link>
                          );
                        }
                        return (
                          <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5"
                            style={{ color: colors.text, borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                          >
                            {item.icon} <span className="whitespace-nowrap">{item.label}</span>
                          </a>
                        );
                      })}

                      <div
                        className="relative border-b border-white/5"
                        onMouseEnter={() => setShowResourcesIndustrySubmenu(true)}
                        onMouseLeave={() => setShowResourcesIndustrySubmenu(false)}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowResourcesIndustrySubmenu((v) => !v);
                          }}
                          className="w-full flex items-center justify-between gap-3 px-4 py-3 text-sm text-left transition-all hover:bg-white/5"
                          style={{ color: colors.text }}
                        >
                          <span className="flex items-center gap-3 min-w-0">
                            <BookOpen className="w-4 h-4 shrink-0" />
                            <span className="font-medium whitespace-nowrap">Industry report</span>
                          </span>
                          <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${showResourcesIndustrySubmenu ? 'rotate-90' : ''}`} style={{ color: colors.textSecondary }} />
                        </button>

                        {showResourcesIndustrySubmenu && (
                          <div
                            className="absolute left-full top-0 ml-1 pl-1 z-[60] min-w-[12rem]"
                            onMouseEnter={() => setShowResourcesIndustrySubmenu(true)}
                            onMouseLeave={() => setShowResourcesIndustrySubmenu(false)}
                          >
                            <div
                              className="rounded-xl shadow-2xl overflow-hidden"
                              style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}
                            >
                              {industryReportRegions.map((r, idx) => {
                                const isExternal = /^https?:\/\//i.test(r.url);
                                return (
                                  <a
                                    key={r.label}
                                    href={r.url}
                                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all hover:bg-white/5"
                                    style={{
                                      color: colors.text,
                                      borderBottom: idx < industryReportRegions.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                                    }}
                                  >
                                    {r.label}
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>

                      {qualificationPathwayItem && (
                        <a
                          href={qualificationPathwayItem.url}
                          className="flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5"
                          style={{ color: colors.text }}
                        >
                          {qualificationPathwayItem.icon} <span className="whitespace-nowrap">{qualificationPathwayItem.label}</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Search Button */}
              <button
                onClick={() => setShowSearchModal(true)}
                className="p-2.5 rounded-xl transition-all hover:scale-110"
                style={{ background: `${colors.primary}15`, color: colors.primary }}
                title="Search Hub"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Profile Dropdown */}
              <div 
                className="relative profile-dropdown" 
                style={{ 
                  border: `1px solid ${colors.primary}30`, 
                  borderRadius: '12px',
                  backgroundColor: theme === 'light' ? '#f1f5f9' : 'transparent'
                }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); setShowProfileMenu(!showProfileMenu); }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 hover:scale-105"
                  style={{ background: showProfileMenu ? `${colors.primary}20` : 'rgba(255,255,255,0.08)' }}
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-sm overflow-hidden" style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})` }}>
                    {user?.profilePic ? (
                      <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      getUserInitials()
                    )}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold leading-none mb-1 whitespace-nowrap" style={{ color: colors.text }}>{user?.name || 'User'}</div>
                    <div className="text-xs leading-none whitespace-nowrap" style={{ color: colors.primary }}>{'@' + (user?.username || 'user')}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} style={{ color: colors.text }} />
                </button>

                {showProfileMenu && (
                  <div className="absolute top-full right-0 mt-2 w-64 rounded-xl overflow-hidden shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                    <div className="p-2">
                      <Link to="/profile" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-white/5 whitespace-nowrap" style={{ color: colors.text }}><User className="w-4 h-4" /> Profile</Link>
                      {/* <a href="/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm hover:bg-white/5 whitespace-nowrap" style={{ color: colors.text }}><Settings className="w-4 h-4" /> Settings</a> */}
                    </div>
                    <div className="p-2 border-t border-white/5">
                      <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm w-full text-red-500 hover:bg-red-500/10 whitespace-nowrap"><LogOut className="w-4 h-4" /> Sign Out</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button onClick={() => setShowSearchModal(true)} className="p-2 rounded-lg" style={{ background: `${colors.primary}15`, color: colors.primary }}>
                <Search className="w-5 h-5" />
              </button>
              <button onClick={toggleMobileMenu} className="p-2 rounded-lg" style={{ border: `1px solid ${colors.primary}40`, color: colors.text }}>
                {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu - Logged In */}
          {showMobileMenu && (
            <div className="mobile-menu-container lg:hidden pb-4">
              <div className="pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1 px-2">
                  <Link to={homePath} onClick={() => setShowMobileMenu(false)} className="px-4 py-3 rounded-lg flex gap-3 text-sm whitespace-nowrap" style={{ color: colors.text }}><Home className="w-5 h-5"/> Home</Link>
                  <Link to="/my-progress" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 rounded-lg flex gap-3 text-sm whitespace-nowrap" style={{ color: colors.text }}><TrendingUp className="w-5 h-5"/> My Progress</Link>
                  <Link to="/modules" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 rounded-lg flex gap-3 text-sm whitespace-nowrap" style={{ color: colors.text }}><BookOpen className="w-5 h-5"/> Training</Link>
                  <Link to="/tools" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 rounded-lg flex gap-3 text-sm whitespace-nowrap" style={{ color: colors.text }}><Calculator className="w-5 h-5"/> Tools</Link>
                  <Link to="/qas-reports" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 rounded-lg flex gap-3 text-sm whitespace-nowrap" style={{ color: colors.text }}><FileText className="w-5 h-5"/> QAS Reports</Link>
                  <button onClick={handleLogout} className="px-4 py-3 rounded-lg flex gap-3 text-sm text-red-500 mt-4 whitespace-nowrap"><LogOut className="w-5 h-5"/> Sign Out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}