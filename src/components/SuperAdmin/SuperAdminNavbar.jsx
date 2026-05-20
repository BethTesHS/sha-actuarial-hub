import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  LogOut,
  ChevronDown,
  ExternalLink,
  Sun,
  Moon,
  Menu,
  X,
} from "lucide-react";
import { getShaThemeColors } from "../../theme/sha";
import shaLogo from "../../assets/SHA_Logo2.png";

export default function SuperAdminNavbar({ user, theme = "dark", toggleTheme, onLogout, basePath = "/superadmin", areaLabel = "Super Admin" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const c = getShaThemeColors(theme);
  const colors = {
    primary: c.primary,
    gradientStart: c.gradientStart,
    gradientEnd: c.gradientEnd,
    text: c.text,
    muted: c.textSecondary,
    barBg: c.navBg,
    border: c.navBorder,
  };

  const path = location.pathname;
  const isDash = path === basePath || path === `${basePath}/`;
  const isProfile = path === `${basePath}/profile`;

  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest?.(".sa-profile-dropdown")) setShowProfileMenu(false);
      if (!e.target.closest?.(".sa-mobile-wrap")) setShowMobileMenu(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const getInitials = () => {
    if (!user) return areaLabel === "Supervisor" ? "SV" : "SA";
    if (user.name) return user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    if (user.username) return String(user.username).slice(0, 2).toUpperCase();
    if (user.email) return user.email.slice(0, 2).toUpperCase();
    return "SA";
  };

  const NavLink = ({ to, icon, label, active }) => (
    <Link
      to={to}
      onClick={() => setShowMobileMenu(false)}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
      style={{
        color: active ? colors.primary : colors.text,
        background: active ? `${colors.primary}18` : "transparent",
        border: active ? `1px solid ${colors.primary}35` : "1px solid transparent",
      }}
    >
      {icon}
      {label}
    </Link>
  );

  return (
    <nav
      className="fixed top-0 left-0 w-full z-[90] transition-all duration-300"
      style={{
        background: colors.barBg,
        backdropFilter: "blur(20px)",
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link to={basePath} className="flex items-center gap-3 group shrink-0" onClick={() => setShowMobileMenu(false)}>
            <div className="relative flex items-center justify-center w-28 h-16 -my-2 transition-transform duration-300 group-hover:scale-105">
              <img src={shaLogo} alt="SHA Logo" className="w-full h-full object-contain" />
            </div>
            <div className="hidden sm:block min-w-0">
              <div className="font-bold text-sm leading-tight truncate" style={{ color: colors.text }}>
                SHA Actuarial Hub
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider truncate" style={{ color: colors.primary }}>
                {areaLabel}
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2.5 rounded-xl transition-all hover:scale-105"
            style={{
              background: `${colors.primary}15`,
              color: colors.primary,
              border: `1px solid ${colors.primary}30`,
            }}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>

          <div className="relative sa-profile-dropdown">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowProfileMenu((v) => !v);
              }}
              className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl transition-all hover:scale-[1.02]"
              style={{
                border: `1px solid ${colors.primary}30`,
                background: theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${colors.gradientStart}, ${colors.gradientEnd})` }}
              >
                {user?.profilePic ? (
                  <img src={user.profilePic} alt="" className="w-full h-full object-cover" />
                ) : (
                  getInitials()
                )}
              </div>
              <div className="text-left max-w-[140px]">
                <div className="text-xs font-bold truncate" style={{ color: colors.text }}>
                  {user?.name || user?.email || "Admin"}
                </div>
                <div className="text-[10px] truncate" style={{ color: colors.muted }}>
                  @{user?.username || ""}
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${showProfileMenu ? "rotate-180" : ""}`} style={{ color: colors.muted }} />
            </button>

            {showProfileMenu && (
              <div
                className="absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-2xl py-1 z-[100]"
                style={{
                  background: theme === "dark" ? "rgba(26,31,46,0.98)" : "rgba(255,255,255,0.98)",
                  border: `1px solid ${colors.primary}28`,
                }}
              >
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-white/5"
                  style={{ color: colors.text }}
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate(`${basePath}/profile`);
                  }}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>

                <div style={{ borderTop: `1px solid ${colors.border}` }} />
                <a
                  href="/"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ color: colors.muted }}
                >
                  <ExternalLink className="w-4 h-4" />
                  Main site
                </a>

                <div style={{ borderTop: `1px solid ${colors.border}` }} />
                <button
                  type="button"
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-left text-red-500 hover:bg-red-500/10"
                  onClick={() => {
                    setShowProfileMenu(false);
                    onLogout?.();
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Log out
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden sa-mobile-wrap">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowMobileMenu((v) => !v);
              }}
              className="p-2.5 rounded-xl"
              style={{ border: `1px solid ${colors.primary}35`, color: colors.text }}
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {showMobileMenu && (
        <div
          className="md:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ borderColor: colors.border, background: theme === "dark" ? "rgba(10,15,30,0.98)" : "rgba(255,255,255,0.98)" }}
        >
          <NavLink to={basePath} icon={<LayoutDashboard className="w-4 h-4 shrink-0" />} label="Dashboard" active={isDash} />
          <NavLink to={`${basePath}/profile`} icon={<User className="w-4 h-4 shrink-0" />} label="Profile" active={isProfile} />
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
            style={{ color: colors.muted }}
            onClick={() => setShowMobileMenu(false)}
          >
            <ExternalLink className="w-4 h-4" />
            Main site
          </a>
          <button
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-red-500"
            onClick={() => {
              setShowMobileMenu(false);
              onLogout?.();
            }}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      )}
    </nav>
  );
}
