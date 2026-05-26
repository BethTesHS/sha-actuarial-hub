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
  const [, setShowToolsMenu] = useState(false);
  const [showTrainingMenu, setShowTrainingMenu] = useState(false);
  const [showPricingMenu, setShowPricingMenu] = useState(false);
  const [showRiskMenu, setShowRiskMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileTraining, setShowMobileTraining] = useState(false);
  const [showMobileIfrs17, setShowMobileIfrs17] = useState(false);
  const [showMobilePricing, setShowMobilePricing] = useState(false);
  const [showMobileRisk, setShowMobileRisk] = useState(false);
  const [showMobileResources, setShowMobileResources] = useState(false);
  
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
      if (!e.target.closest('.training-dropdown')) setShowTrainingMenu(false);
      if (!e.target.closest('.pricing-dropdown')) setShowPricingMenu(false);
      if (!e.target.closest('.risk-dropdown')) setShowRiskMenu(false);
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

  // Focus search input when modal opens
  useEffect(() => {
    if (showSearchModal && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    } else {
      setSearchQuery(""); // Clear on close
    }
  }, [showSearchModal]);

  const homePath = "/";

  const isActive = (path) => {
    if (path === homePath) {
      return currentPath === "/";
    }
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const colors = getShaThemeColors(theme);

  const navItems = [
    { path: homePath, label: "Home", icon: <Home className="w-5 h-5" /> },
    ...(user?.role === "supervisor" ? [{ path: "/supervisor", label: "Supervisor", icon: <ShieldCheck className="w-5 h-5" /> }] : []),
  ];

  const externalLinks = {
    // TODO: ADD LINKS
    analytics: "",
    fraudRiskMatrix: "",
    pricing: {
      pricingTools: "",
      prmfTool: "https://sha-prmf-calculator.vercel.app",
    }
  };

  const analyticsItem = {
    label: "Analytics",
    url: externalLinks.analytics,
    icon: <TrendingUp className="w-5 h-5" />,
  };

  const trainingItems = [
    { label: "Training Modules", path: "/modules", internal: true },
    { label: "My Progress", path: "/my-progress", internal: true },
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

  const pricingItems = [
    { label: "Pricing Tool", url: externalLinks.pricing.pricingTools, icon: <Calculator className="w-4 h-4" /> },
    { label: "PRMF tool", url: externalLinks.pricing.prmfTool, icon: <Calculator className="w-4 h-4" /> },
  ];

  const riskItems = [
    { label: "Fraud Risk Matrix", url: externalLinks.fraudRiskMatrix, icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const resourceItems = [
    { label: "Tools", path: "/tools", icon: <Calculator className="w-4 h-4" /> },
    { label: "Training Links", path: "/training-links", icon: <BookOpen className="w-4 h-4" /> },
    { label: "SHA IFRS 17 Policy Papers", path: "/ifrs17-policy-papers", icon: <FileText className="w-4 h-4" /> },
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
    ...pricingItems.map(i => ({ title: i.label, link: i.internal ? i.path : i.url, type: "Pricing", icon: i.icon })),
    ...resourceItems.map(i => ({ title: i.label, link: i.path || i.url, type: "Resource", icon: i.icon })),
    { title: "Analytics", link: analyticsItem.url, type: "Analytics", icon: <TrendingUp className="w-4 h-4" /> },
    ...riskItems.map(i => ({ title: i.label, link: i.url, type: "Risk", icon: i.icon })),
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

  const renderExternalMenuItem = ({ label, url, icon, className = "", style = {} }) => {
    const isEnabled = !!url;
    if (!isEnabled) {
      return (
        <div
          className={`flex items-center gap-3 px-4 py-3 text-sm select-none ${className}`}
          style={{ color: colors.textSecondary, opacity: 0.6, ...style }}
        >
          {icon}
          <span className="font-medium whitespace-nowrap">{label}</span>
        </div>
      );
    }
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 px-4 py-3 transition-all text-sm hover:bg-white/5 ${className}`}
        style={{ color: colors.text, ...style }}
      >
        {icon}
        <span className="font-medium whitespace-nowrap">{label}</span>
      </a>
    );
  };

  const closeAllDropdowns = () => {
    setShowTrainingMenu(false);
    setShowIfrs17Menu(false);
    setShowPricingMenu(false);
    setShowRiskMenu(false);
    setShowResourcesMenu(false);
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
          <div className="relative flex items-center justify-between gap-3 h-24">
            {/* Logo */}
            <div className="flex items-center gap-3 shrink-0 z-10">
              {renderShaLogo()}
            </div>

            {/* Center Navigation - Desktop */}
            <div className="hidden xl:flex flex-1 min-w-0 items-center justify-center gap-1 px-3 z-10">
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

              {analyticsItem.url ? (
                <a
                  href={analyticsItem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ color: colors.text }}
                >
                  {analyticsItem.icon}
                  <span className="text-sm font-medium whitespace-nowrap">{analyticsItem.label}</span>
                </a>
              ) : (
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg select-none"
                  style={{ color: colors.textSecondary, opacity: 0.6 }}
                >
                  {analyticsItem.icon}
                  <span className="text-sm font-medium whitespace-nowrap">{analyticsItem.label}</span>
                </div>
              )}

              <div className="relative training-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTrainingMenu(!showTrainingMenu);
                    setShowIfrs17Menu(false);
                    setShowPricingMenu(false);
                    setShowRiskMenu(false);
                    setShowResourcesMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ color: showTrainingMenu ? colors.primary : colors.text, background: showTrainingMenu ? `${colors.primary}15` : 'transparent' }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium whitespace-nowrap">Training</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showTrainingMenu ? 'rotate-180' : ''}`} />
                </button>
                {showTrainingMenu && (
                  <div className="absolute top-full left-0 mt-2 w-60 rounded-xl shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                    {trainingItems.map((it, idx) => (
                      <Link
                        key={it.path}
                        to={it.path}
                        onClick={() => closeAllDropdowns()}
                        className="flex items-center gap-3 px-4 py-3 transition-all text-sm hover:bg-white/5"
                        style={{ color: colors.text, borderBottom: idx < trainingItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
                      >
                        <BookOpen className="w-4 h-4 shrink-0" />
                        <span className="font-medium whitespace-nowrap">{it.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative ifrs17-dropdown">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowIfrs17Menu(!showIfrs17Menu); setShowToolsMenu(false); setShowResourcesMenu(false); setShowTrainingMenu(false); setShowPricingMenu(false); setShowRiskMenu(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ color: showIfrs17Menu ? colors.primary : colors.text, background: showIfrs17Menu ? `${colors.primary}15` : 'transparent' }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium whitespace-nowrap">IFRS 17</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showIfrs17Menu ? 'rotate-180' : ''}`} />
                </button>
                {showIfrs17Menu && (
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-xl shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                    <Link
                      to="/modules/IFRS 17"
                      onClick={() => closeAllDropdowns()}
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

                    {ifrs17Items.slice(1).map((item, i) => {
                      if (item.internal) {
                        return (
                          <Link
                            key={item.url}
                            to={item.url}
                            onClick={() => closeAllDropdowns()}
                            className="flex items-center gap-3 px-4 py-3 transition-all text-sm hover:bg-white/5"
                            style={{ color: colors.text, borderBottom: i < ifrs17Items.slice(1).length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
                          >
                            {item.icon}
                            <span className="font-medium whitespace-nowrap">{item.label}</span>
                          </Link>
                        );
                      }
                      return (
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
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="relative pricing-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPricingMenu(!showPricingMenu);
                    setShowTrainingMenu(false);
                    setShowIfrs17Menu(false);
                    setShowRiskMenu(false);
                    setShowResourcesMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ color: showPricingMenu ? colors.primary : colors.text, background: showPricingMenu ? `${colors.primary}15` : 'transparent' }}
                >
                  <Calculator className="w-5 h-5" />
                  <span className="text-sm font-medium whitespace-nowrap">Pricing</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showPricingMenu ? 'rotate-180' : ''}`} />
                </button>
                {showPricingMenu && (
                  <div className="absolute top-full left-0 mt-2 w-56 rounded-xl shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                    {pricingItems.map((it, idx) => {
                      if (it.internal) {
                        return (
                          <Link
                            key={it.path}
                            to={it.path}
                            onClick={() => closeAllDropdowns()}
                            className="flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5"
                            style={{ color: colors.text, borderBottom: idx < pricingItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
                          >
                            {it.icon} <span className="whitespace-nowrap font-medium">{it.label}</span>
                          </Link>
                        );
                      }
                      return (
                        <div key={it.url} style={{ borderBottom: idx < pricingItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}>
                          {renderExternalMenuItem({ label: it.label, url: it.url, icon: it.icon })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="relative risk-dropdown">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRiskMenu(!showRiskMenu);
                    setShowTrainingMenu(false);
                    setShowIfrs17Menu(false);
                    setShowPricingMenu(false);
                    setShowResourcesMenu(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ color: showRiskMenu ? colors.primary : colors.text, background: showRiskMenu ? `${colors.primary}15` : 'transparent' }}
                >
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-sm font-medium whitespace-nowrap">Risk</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showRiskMenu ? 'rotate-180' : ''}`} />
                </button>
                {showRiskMenu && (
                  <div className="absolute top-full left-0 mt-2 w-60 rounded-xl shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                    {riskItems.map((it, idx) => (
                      <div key={it.label} style={{ borderBottom: idx < riskItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}>
                        {renderExternalMenuItem({ label: it.label, url: it.url, icon: it.icon })}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative resources-dropdown">
                <button
                  onClick={(e) => { e.stopPropagation(); setShowResourcesMenu(!showResourcesMenu); setShowToolsMenu(false); setShowIfrs17Menu(false); setShowTrainingMenu(false); setShowPricingMenu(false); setShowRiskMenu(false); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{ color: showResourcesMenu ? colors.primary : colors.text, background: showResourcesMenu ? `${colors.primary}15` : 'transparent' }}
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="text-sm font-medium whitespace-nowrap">Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showResourcesMenu ? 'rotate-180' : ''}`} />
                </button>
                {showResourcesMenu && (
                  <div className="absolute top-full left-0 mt-2 w-max min-w-56 rounded-xl shadow-2xl z-50" style={{ background: `${colors.darkCard}f5`, border: `1px solid ${colors.primary}30` }}>
                    {resourceItems.map((item, idx) => {
                      const href = item.path || item.url;
                      const isExternal = /^https?:\/\//i.test(href);
                      const isDownload = item.label === "Qualification Pathway";

                      if (!isExternal && item.path) {
                        return (
                          <Link
                            key={href}
                            to={href}
                            onClick={() => closeAllDropdowns()}
                            className="flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5"
                            style={{ color: colors.text, borderBottom: idx < resourceItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
                          >
                            {item.icon} <span className="whitespace-nowrap font-medium">{item.label}</span>
                          </Link>
                        );
                      }

                      return (
                        <a
                          key={href}
                          href={href}
                          {...(isDownload ? { download: true } : {})}
                          target={isDownload ? undefined : "_blank"}
                          rel={isDownload ? undefined : "noopener noreferrer"}
                          className="flex items-center gap-3 px-4 py-3 text-sm transition-all hover:bg-white/5"
                          style={{ color: colors.text, borderBottom: idx < resourceItems.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined }}
                        >
                          {item.icon} <span className="whitespace-nowrap font-medium">{item.label}</span>
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Desktop */}
            <div className="hidden xl:flex items-center gap-4 shrink-0 z-10">
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
            <div className="flex xl:hidden items-center gap-3">
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
            <div className="mobile-menu-container xl:hidden pb-4">
              <div className="pt-4 border-t border-white/10">
                <div className="flex flex-col gap-1 px-2">
                  <Link to={homePath} onClick={() => setShowMobileMenu(false)} className="px-4 py-3 rounded-lg flex gap-3 text-sm whitespace-nowrap" style={{ color: colors.text }}><Home className="w-5 h-5"/> Home</Link>

                  <div className="rounded-lg">
                    {renderExternalMenuItem({
                      label: analyticsItem.label,
                      url: analyticsItem.url,
                      icon: analyticsItem.icon,
                      className: "rounded-lg",
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowMobileTraining((v) => !v)}
                    className="px-4 py-3 rounded-lg flex items-center justify-between text-sm"
                    style={{ color: colors.text }}
                  >
                    <span className="flex gap-3 items-center whitespace-nowrap">
                      <BookOpen className="w-5 h-5" /> Training
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showMobileTraining ? 'rotate-180' : ''}`} />
                  </button>
                  {showMobileTraining && (
                    <div className="pl-8 pr-2 pb-2 flex flex-col gap-1">
                      {trainingItems.map((it) => (
                        <Link
                          key={it.path}
                          to={it.path}
                          onClick={() => setShowMobileMenu(false)}
                          className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5"
                          style={{ color: colors.text }}
                        >
                          {it.label}
                        </Link>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowMobileIfrs17((v) => !v)}
                    className="px-4 py-3 rounded-lg flex items-center justify-between text-sm"
                    style={{ color: colors.text }}
                  >
                    <span className="flex gap-3 items-center whitespace-nowrap">
                      <BookOpen className="w-5 h-5" /> IFRS 17
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showMobileIfrs17 ? 'rotate-180' : ''}`} />
                  </button>
                  {showMobileIfrs17 && (
                    <div className="pl-8 pr-2 pb-2 flex flex-col gap-1">
                      <Link to="/modules/IFRS 17" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        Module 0 (IFRS 17)
                      </Link>
                      <a href="https://learn17.com/" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        Learn17
                      </a>
                      <a href="/pdfs/ifrs-17-insurance-contracts.pdf" download className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        IFRS 17 Insurance Contracts
                      </a>
                      <a href="/pdfs/IFRS-17-Insurance-contracts-illustrative-examples.pdf" download className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        IFRS 17 Illustrative Examples
                      </a>
                      <div className="pt-1 pb-1 text-xs uppercase tracking-wide" style={{ color: colors.textSecondary }}>
                        Game
                      </div>
                      {ifrs17GameOptions.map((g) => (
                        <a key={g.url} href={g.url} target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                          {g.label}
                        </a>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowMobilePricing((v) => !v)}
                    className="px-4 py-3 rounded-lg flex items-center justify-between text-sm"
                    style={{ color: colors.text }}
                  >
                    <span className="flex gap-3 items-center whitespace-nowrap">
                      <Calculator className="w-5 h-5" /> Pricing
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showMobilePricing ? 'rotate-180' : ''}`} />
                  </button>
                  {showMobilePricing && (
                    <div className="pl-8 pr-2 pb-2 flex flex-col gap-1">
                      <Link to="/tools" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        Pricing Tool
                      </Link>
                      <a href="https://sha-prmf-calculator.vercel.app" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        PRMF tool
                      </a>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowMobileRisk((v) => !v)}
                    className="px-4 py-3 rounded-lg flex items-center justify-between text-sm"
                    style={{ color: colors.text }}
                  >
                    <span className="flex gap-3 items-center whitespace-nowrap">
                      <ShieldCheck className="w-5 h-5" /> Risk
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showMobileRisk ? 'rotate-180' : ''}`} />
                  </button>
                  {showMobileRisk && (
                    <div className="pl-8 pr-2 pb-2 flex flex-col gap-1">
                      {riskItems.map((it) => (
                        <div key={it.label} className="rounded-lg">
                          {renderExternalMenuItem({
                            label: it.label,
                            url: it.url,
                            icon: it.icon,
                            className: "rounded-lg",
                            style: { paddingLeft: 0, paddingRight: 0 },
                          })}
                        </div>
                      ))}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowMobileResources((v) => !v)}
                    className="px-4 py-3 rounded-lg flex items-center justify-between text-sm"
                    style={{ color: colors.text }}
                  >
                    <span className="flex gap-3 items-center whitespace-nowrap">
                      <BookOpen className="w-5 h-5" /> Resources
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showMobileResources ? 'rotate-180' : ''}`} />
                  </button>
                  {showMobileResources && (
                    <div className="pl-8 pr-2 pb-2 flex flex-col gap-1">
                      <Link to="/tools" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        Tools
                      </Link>
                      <Link to="/training-links" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        Training Links
                      </Link>
                      <Link to="/ifrs17-policy-papers" onClick={() => setShowMobileMenu(false)} className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        SHA IFRS 17 Policy Papers
                      </Link>
                      <a href="/pdfs/qualification-handbook-2025-2026.pdf" download className="px-3 py-2 rounded-lg text-sm whitespace-nowrap hover:bg-white/5" style={{ color: colors.text }}>
                        Qualification Pathway
                      </a>
                    </div>
                  )}

                  {user?.role === "supervisor" && (
                    <Link to="/supervisor" onClick={() => setShowMobileMenu(false)} className="px-4 py-3 rounded-lg flex gap-3 text-sm whitespace-nowrap" style={{ color: colors.text }}>
                      <ShieldCheck className="w-5 h-5"/> Supervisor
                    </Link>
                  )}

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