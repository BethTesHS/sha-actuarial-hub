import React from "react";
import "./ActuarialTrainingHubSlide.css";

const ActuarialTrainingHubSlide = ({ isActive, user, handleNavigation, totalTrainingModules }) => {
  const handlePrimaryAction = () => {
    handleNavigation?.(user ? "/SHADashboard" : "/SHAAuth?mode=signup");
  };

  return (
    <section className={`sha-slide ${isActive ? "active" : ""}`}>
      <div className="sha-grid" aria-hidden="true" />
      <div className="sha-orb sha-orb-1" aria-hidden="true" />
      <div className="sha-orb sha-orb-2" aria-hidden="true" />

      <div className="sha-container">
        <div className="sha-content">
          <div className="sha-eyebrow">
            <span className="sha-eyebrow-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.9 4.7L19 9l-4.1 1.3L12 15l-1.9-4.7L6 9l4.1-1.3z" />
              </svg>
            </span>
            {totalTrainingModules} Modules Available
          </div>

          <h1 className="sha-headline">
            SHA<span className="sha-headline-accent"> Actuarial Hub</span>
          </h1>

          <p className="sha-subtitle">
            Comprehensive training and tools for health-insurance and actuarial professionals - built around the Social Health Authority's real-world workflows.
          </p>

          <div className="sha-cta-row">
            <button type="button" className="sha-cta-primary" onClick={handlePrimaryAction}>
              <span>Go to Dashboard</span>
              <svg className="sha-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          <div className="sha-stats">
            <div className="sha-stat">
              <div className="sha-stat-num">{totalTrainingModules}<span className="sha-stat-unit"> modules</span></div>
              <div className="sha-stat-label">Structured path</div>
            </div>
            <div className="sha-stat">
              <div className="sha-stat-num">80<span className="sha-stat-unit">hrs</span></div>
              <div className="sha-stat-label">Of content</div>
            </div>
            <div className="sha-stat">
              <div className="sha-stat-num">Self<span className="sha-stat-unit">-paced</span></div>
              <div className="sha-stat-label">Start anytime</div>
            </div>
          </div>
        </div>

        <div className="sha-visual">
          <div className="sha-visual-wrap">
            <span className="sha-sparkle sha-sparkle-1" aria-hidden="true">✦</span>
            <span className="sha-sparkle sha-sparkle-2" aria-hidden="true">✧</span>
            <span className="sha-sparkle sha-sparkle-3" aria-hidden="true">✦</span>

            <div className="sha-card">
              <div className="sha-card-glow" aria-hidden="true" />

              <div className="sha-photo-wrap">
                <div className="sha-chip sha-chip-brand">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6l-8-4z" />
                    <polyline points="9 12 11 14 15 10" />
                  </svg>
                  SHA Actuarial Hub
                </div>

                <img
                  className="sha-photo"
                  src="/images/actuarial-training-hub-screen.png"
                  alt="SHA Actuarial Hub dashboard"
                />
              </div>

              <div className="sha-card-caption">
                <div className="sha-card-title">Learn. Analyze. Solve. Lead.</div>
                <div className="sha-card-sub">Build expertise. Drive impact.</div>
              </div>

              <div className="sha-tiles">
                <div className="sha-tile">
                  <div className="sha-tile-num">{totalTrainingModules}</div>
                  <div className="sha-tile-label">Modules</div>
                </div>
                <div className="sha-tile">
                  <div className="sha-tile-num">120h</div>
                  <div className="sha-tile-label">Content</div>
                </div>
              </div>
            </div>

            <div className="sha-chip sha-chip-risk">
              <svg viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="3" y1="15" x2="21" y2="15" />
                <line x1="9" y1="3" x2="9" y2="21" />
                <line x1="15" y1="3" x2="15" y2="21" />
              </svg>
              Risk Matrix
            </div>

            <div className="sha-chip sha-chip-claims">
              <svg viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3v18h18" />
                <polyline points="7 14 11 10 14 13 19 7" />
              </svg>
              Claims Analytics
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActuarialTrainingHubSlide;
