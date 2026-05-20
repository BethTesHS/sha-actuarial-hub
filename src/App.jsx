// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

// Contexts
import { TutorialProvider } from "./contexts/TutorialContext";
// Pages
import MyProgress from "./MyProgress";
import QASReports from "./QasReports";
import TrainingLinks from "./TrainingLinks";
import SHATrainingLinks from "./SHATrainingLinks";
import ToolsPage from "./ToolsPage";
import FileSavingFormat from "./FileSavingFormat";
import SHAModules from "./SHAModules";
import ModulePage from "./ModulePage";
import SHALandingpage from "./SHALandingpage";
import SHADashboard from "./SHADashboard";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsOfServicePage from "./components/TermsOfServicePage";
import CookiesPolicyPage from "./components/CookiePolicyPage";

// import Module4Videos from "./Module4Videos";
import SHAAuthPage from "./components/Auth/SHAAuthPage";
import UserProfile from "./components/UserProfile";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import IFRS17PolicyPapers from "./IFRS17PolicyPapers";

// Components
import SHANavbar from "./SHANavbar";
import ScrollToTop from "./components/ScrollToTop";
import ThemeToggle from "./components/ThemeToggle";
import AuthCallback from "./components/AuthCallback";
import RequireSuperAdmin from "./components/SuperAdmin/RequireSuperAdmin";
import SuperAdminLogin from "./components/SuperAdmin/SuperAdminLogin";
import SuperAdminModule from "./components/SuperAdmin/SuperAdminModule";
import SuperAdminNavbar from "./components/SuperAdmin/SuperAdminNavbar";
import RequireSupervisor from "./components/Supervisor/RequireSupervisor";
import SupervisorModule from "./components/Supervisor/SupervisorModule";
import SupervisorLogin from "./components/Supervisor/SupervisorLogin";
import AwaitVerification from "./components/AwaitVerification";
import AccessDenied from "./components/AccessDenied";
import { fetchMyProfile, profileToAppUser } from "./services/profile.service";

function getFallbackRole(authUser) {
  if (authUser?.app_metadata?.role === "superadmin") return "admin";
  return authUser?.app_metadata?.role || authUser?.user_metadata?.role || "trainee";
}

function AppShell({ user, onLogout, onAuthSuccess, onUserUpdate, onSuperAdminLogout, theme, toggleTheme }) {
  const location = useLocation();
  const isSuperAdminArea = location.pathname.startsWith("/superadmin");
  const isSuperAdminLogin = location.pathname === "/superadmin/login";
  const isSupervisorArea = location.pathname.startsWith("/supervisor");
  const isSupervisorLogin = location.pathname === "/supervisor/login";
  const showSuperAdminChrome = isSuperAdminArea && !isSuperAdminLogin;
  const showSupervisorChrome = isSupervisorArea && !isSupervisorLogin;
  const isAwaitPage = location.pathname === "/awaiting-verification";
  const isDeniedPage = location.pathname === "/access-denied";
  const isPrivilegedArea = isSuperAdminArea || isSupervisorArea;

  const verificationStatus = user?.verificationStatus || "approved";
  const isVerified = verificationStatus === "approved";
  const isGatedPage = isAwaitPage || isDeniedPage;
  const shouldGate =
    !!user && !isVerified && !isGatedPage && !isPrivilegedArea;

  const isAuthPage =
    location.pathname === "/SHAAuth" ||
    location.pathname.startsWith("/auth") ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/superadmin/login" ||
    location.pathname === "/supervisor/login";

  const hideChrome = isPrivilegedArea || isGatedPage || isAuthPage;

  if (shouldGate) {
    return <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />;
  }

  return (
    <div className="min-h-screen bg-var(--bg-primary) text-var(--text-primary) transition-colors duration-300">
      {!hideChrome && <ThemeToggle theme={theme} toggleTheme={toggleTheme} />}
      {!hideChrome && <SHANavbar user={user} onLogout={onLogout} theme={theme} />}
      {showSuperAdminChrome && (
        <SuperAdminNavbar user={user} theme={theme} toggleTheme={toggleTheme} onLogout={onSuperAdminLogout} />
      )}
      {showSupervisorChrome && (
        <SuperAdminNavbar
          user={user}
          theme={theme}
          toggleTheme={toggleTheme}
          onLogout={onLogout}
          basePath="/supervisor"
          areaLabel="Supervisor"
        />
      )}

      <Routes>
        {/* Super Admin (separate sign in) */}
        <Route path="/superadmin/login" element={<SuperAdminLogin theme={theme} />} />
        <Route
          path="/superadmin/profile"
          element={
            <RequireSuperAdmin>
              <div className="pt-24 min-h-screen">
                <UserProfile user={user} onLogout={onSuperAdminLogout} onUserUpdate={onUserUpdate} theme={theme} />
              </div>
            </RequireSuperAdmin>
          }
        />
        <Route
          path="/superadmin"
          element={
            <RequireSuperAdmin>
              <SuperAdminModule theme={theme} />
            </RequireSuperAdmin>
          }
        />

        {/* Supervisor (separate sign in) */}
        <Route path="/supervisor/login" element={<SupervisorLogin theme={theme} />} />
        <Route
          path="/supervisor/profile"
          element={
            <RequireSupervisor>
              <div className="pt-24 min-h-screen">
                <UserProfile user={user} onLogout={onLogout} onUserUpdate={onUserUpdate} theme={theme} />
              </div>
            </RequireSupervisor>
          }
        />
        <Route
          path="/supervisor"
          element={
            <RequireSupervisor>
              <SupervisorModule theme={theme} />
            </RequireSupervisor>
          }
        />
        {/* Auth Routes */}
        <Route path="/auth/callback" element={<AuthCallback theme={theme} />} />
        <Route path="/auth" element={<Navigate to="/SHAAuth" replace />} />
        <Route
          path="/SHAAuth"
          element={user ? <Navigate to="/" replace /> : <SHAAuthPage onAuthSuccess={onAuthSuccess} theme={theme} />}
        />
        <Route path="/forgot-password" element={user ? <Navigate to="/" replace /> : <ForgotPassword theme={theme} />} />
        {/* Supabase recovery links create a session; allow access even if `user` exists */}
        <Route path="/reset-password" element={<ResetPassword theme={theme} />} />

        {/* Public Pages */}
        <Route
          path="/"
          element={
            <SHALandingpage />
          }
        />
        <Route
          path="/SHADashboard"
          element={
            user ? (
              isVerified ? (
                <SHADashboard user={user} theme={theme} />
              ) : (
                <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />
              )
            ) : (
              <Navigate to="/SHAAuth" replace />
            )
          }
        />
        <Route
          path="/awaiting-verification"
          element={user && isVerified ? <Navigate to="/" replace /> : <AwaitVerification theme={theme} />}
        />
        <Route
          path="/access-denied"
          element={user && isVerified ? <Navigate to="/" replace /> : <AccessDenied theme={theme} />}
        />

        {/* Legal Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/cookie-policy" element={<CookiesPolicyPage />} />

        {/* Protected Data-Driven Pages */}
        <Route
          path="/my-progress"
          element={
            user ? (
              isVerified ? (
                <MyProgress theme={theme} user={user} />
              ) : (
                <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />
              )
            ) : (
              <Navigate to="/SHAAuth" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              isVerified ? (
                <div className="pt-20">
                  <UserProfile user={user} onLogout={onLogout} onUserUpdate={onUserUpdate} theme={theme} />
                </div>
              ) : (
                <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />
              )
            ) : (
              <Navigate to="/SHAAuth" replace />
            )
          }
        />
        <Route
          path="/modules"
          element={
            user ? (
              isVerified ? (
                <div className="pt-20">
                  <SHAModules theme={theme} user={user} />
                </div>
              ) : (
                <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />
              )
            ) : (
              <Navigate to="/SHAAuth" replace />
            )
          }
        />
        <Route
          path="/SHAmodules"
          element={
            user ? (
              isVerified ? (
                <div className="pt-20">
                  <SHAModules theme={theme} user={user} />
                </div>
              ) : (
                <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />
              )
            ) : (
              <Navigate to="/SHAAuth" replace />
            )
          }
        />
        <Route
          path="/modules/:moduleId"
          element={
            user ? (
              isVerified ? (
                <div className="pt-20">
                  <ModulePage theme={theme} user={user} />
                </div>
              ) : (
                <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />
              )
            ) : (
              <Navigate to="/SHAAuth" replace />
            )
          }
        />

        {/* Protected Static Pages */}
        <Route
          path="/ifrs17-policy-papers"
          element={
            user ? (isVerified ? <IFRS17PolicyPapers theme={theme} /> : <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />) : <Navigate to="/SHAAuth" replace />
          }
        />
        <Route
          path="/training-links"
          element={
            user ? (isVerified ? <SHATrainingLinks theme={theme} /> : <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />) : <Navigate to="/SHAAuth" replace />
          }
        />
        <Route
          path="/SHA-training-links"
          element={
            user ? (isVerified ? <SHATrainingLinks theme={theme} /> : <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />) : <Navigate to="/SHAAuth" replace />
          }
        />
        <Route
          path="/file-saving-format"
          element={
            user ? (isVerified ? <FileSavingFormat theme={theme} /> : <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />) : <Navigate to="/SHAAuth" replace />
          }
        />
        <Route
          path="/qas-reports"
          element={user ? (isVerified ? <QASReports theme={theme} /> : <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />) : <Navigate to="/SHAAuth" replace />}
        />
        <Route
          path="/tools"
          element={user ? (isVerified ? <ToolsPage theme={theme} /> : <Navigate to={verificationStatus === "denied" ? "/access-denied" : "/awaiting-verification"} replace />) : <Navigate to="/SHAAuth" replace />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [verifyingProfile, setVerifyingProfile] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const RECOVERY_FLAG_KEY = 'kb_password_recovery_in_progress';
    const RECOVERY_TS_KEY = 'kb_password_recovery_ts';
    const RECOVERY_TTL_MS = 15 * 60 * 1000; // 15 minutes

    const setRecoveryInProgress = () => {
      try {
        localStorage.setItem(RECOVERY_FLAG_KEY, '1');
      } catch {
        // ignore
      }
    };

    const clearRecoveryInProgress = () => {
      try {
        localStorage.removeItem(RECOVERY_FLAG_KEY);
        localStorage.removeItem(RECOVERY_TS_KEY);
      } catch {
        // ignore
      }
    };

    const isRecoveryInProgress = () => {
      try {
        const ts = Number(localStorage.getItem(RECOVERY_TS_KEY) || '0');
        if (ts && Date.now() - ts > RECOVERY_TTL_MS) {
          clearRecoveryInProgress();
          return false;
        }
        return localStorage.getItem(RECOVERY_FLAG_KEY) === '1';
      } catch {
        return false;
      }
    };

    const isPasswordRecoveryFlow = () => {
      try {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        return (
          hashParams.get('type') === 'recovery' ||
          queryParams.get('type') === 'recovery' ||
          queryParams.has('token') ||
          queryParams.has('token_hash') ||
          queryParams.has('code')
        );
      } catch {
        return false;
      }
    };

    // Check for existing Supabase session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();

        if (session?.user) {
          // During password recovery, Supabase creates a temporary session.
          // We should NOT treat it as a full "logged-in" app session.
          if (isPasswordRecoveryFlow() || isRecoveryInProgress()) {
            if (isPasswordRecoveryFlow()) {
              setRecoveryInProgress();
              try {
                localStorage.setItem(RECOVERY_TS_KEY, String(Date.now()));
              } catch {
                // ignore
              }
            }
            setUser(null);
            localStorage.removeItem('user');
            // Keep supabase session intact for ResetPassword.jsx to work
          } else {
          // User is logged in via Supabase
          // Role must come from a server-controlled field (metadata/profile), never from the email string.
          const role = getFallbackRole(session.user);

          const fallbackUser = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
            profilePic: session.user.user_metadata?.profilePic || null, 
            role: role,
          };

          // Default verification to approved (until profiles fetch confirms otherwise).
          const baseUser = { ...fallbackUser, verificationStatus: "approved" };
          setUser(baseUser);
          localStorage.setItem('user', JSON.stringify(baseUser));

          // Pull verification status from `public.profiles` (blocking + timeout) to avoid UI flicker.
          setVerifyingProfile(true);
          try {
            const merged = await Promise.race([
              (async () => {
                const profile = await fetchMyProfile();
                return profileToAppUser(profile, fallbackUser);
              })(),
              new Promise((resolve) => setTimeout(() => resolve(null), 4000)),
            ]);
            if (merged) {
              setUser(merged);
              localStorage.setItem('user', JSON.stringify(merged));
            }
          } catch (e) {
            console.warn("Profile fetch failed:", e?.message || e);
          } finally {
            setVerifyingProfile(false);
          }
          }
        } else {
          // No session -> clear any stale recovery flag
          clearRecoveryInProgress();
          // Do not restore `user` from localStorage. It's forgeable and must never be treated as an auth source.
          localStorage.removeItem('user');
          setUser(null);
        }

        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
        
        // Sync custom data attribute
        document.documentElement.setAttribute('data-theme', savedTheme);
        // Sync Tailwind's dark class
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }

      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes (for social login, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);

        // Prevent reloading the page/UI on events that happen when changing tabs (like TOKEN_REFRESH)
        if (event === 'TOKEN_REFRESH' || event === 'INITIAL_SESSION' || event === 'USER_UPDATED') {
          return;
        }

        if (session?.user) {
          // If we already have a logged in user in localStorage and it matches this session, don't flash UI.
          // This prevents SIGNED_IN from causing a flash when switching tabs.
          const storedUserStr = localStorage.getItem('user');
          if (storedUserStr) {
            try {
              const storedUser = JSON.parse(storedUserStr);
              if (storedUser?.id === session.user.id) {
                return;
              }
            } catch {
              // ignore parse errors
            }
          }

          if (event === 'PASSWORD_RECOVERY') {
            setRecoveryInProgress();
            try {
              localStorage.setItem(RECOVERY_TS_KEY, String(Date.now()));
            } catch {
              // ignore
            }
          }

          // Do not "log in" the app UI during password recovery.
          if (event === 'PASSWORD_RECOVERY' || isPasswordRecoveryFlow() || isRecoveryInProgress()) {
            setRecoveryInProgress();
            setUser(null);
            localStorage.removeItem('user');
            // Keep supabase session/token for password update on reset page
            return;
          }

          // Role must come from a server-controlled field (metadata/profile), never from the email string.
          const role = getFallbackRole(session.user);

          const fallbackUser = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            username: session.user.user_metadata?.username || session.user.email?.split('@')[0],
            profilePic: session.user.user_metadata?.profilePic || null,
            role: role,
          };
          // Default verification to approved (until profiles fetch confirms otherwise).
          const baseUser = { ...fallbackUser, verificationStatus: "approved" };
          setUser(baseUser);
          localStorage.setItem('user', JSON.stringify(baseUser));

          // Block on verification status fetch (timeout) to prevent landing page flash.
          setVerifyingProfile(true);
          try {
            const merged = await Promise.race([
              (async () => {
                const profile = await fetchMyProfile();
                return profileToAppUser(profile, fallbackUser);
              })(),
              new Promise((resolve) => setTimeout(() => resolve(null), 4000)),
            ]);
            if (merged) {
              setUser(merged);
              localStorage.setItem('user', JSON.stringify(merged));
            }
          } catch (e) {
            console.warn("Profile fetch failed:", e?.message || e);
          } finally {
            setVerifyingProfile(false);
          }

          // If user just signed in from auth modal, show a loading screen and redirect to home
          if (window.location.pathname.includes('/SHAAuth') || window.location.pathname.includes('/auth')) {
            setLoading(true);
            setTimeout(() => {
              window.location.href = '/';
            }, 1500);
          }
        } else {
          // No session, clear everything
          clearRecoveryInProgress();
          setUser(null);
          localStorage.removeItem('user');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAuthSuccess = async (userData) => {
    const fallbackUser = {
      id: userData.id,
      email: userData.email,
      name: userData.user_metadata?.name || userData.user_metadata?.full_name || userData.email?.split('@')[0],
      username: userData.user_metadata?.username || userData.email?.split('@')[0],
      profilePic: userData.user_metadata?.profilePic || null,
      role: getFallbackRole(userData),
      verificationStatus: "approved",
    };

    setUser(fallbackUser);
    localStorage.setItem('user', JSON.stringify(fallbackUser));

    try {
      const profile = await fetchMyProfile();
      const merged = profileToAppUser(profile, fallbackUser);
      if (merged) {
        setUser(merged);
        localStorage.setItem('user', JSON.stringify(merged));
      }
    } catch (e) {
      console.warn("Profile fetch failed:", e?.message || e);
    }
  };

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  const handleSuperAdminLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.warn("Supabase sign-out warning:", error);
    } catch (e) {
      console.error("Super admin sign-out error:", e);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      window.location.href = "/superadmin/login";
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.warn('Supabase sign-out warning:', error);
    } catch (error) {
      console.error('Error signing out:', error.message);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update custom data attribute
    document.documentElement.setAttribute('data-theme', newTheme);
    // Add or remove Tailwind's dark class
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (loading || verifyingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#001529' }}>
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-white text-2xl mx-auto mb-4 animate-pulse"
            style={{ background: 'linear-gradient(135deg, #0066B3, #8BC53F)' }}>SHA</div>
          <div className="text-white text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  return (
      <TutorialProvider>
      <Router>
        <ScrollToTop />
        <AppShell
          user={user}
          onLogout={handleLogout}
          onAuthSuccess={handleAuthSuccess}
          onUserUpdate={handleUserUpdate}
          onSuperAdminLogout={handleSuperAdminLogout}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        {/* Toast Notifications */}
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={theme === "dark" ? "dark" : "light"}
        />
    </Router>
      </TutorialProvider>
  );
}

export default App;