import React from 'react';
import './ActuarialTrainingHubSlide.css';

const ActuarialTrainingHubSlide = ({ isActive, user, handleNavigation }) => {
  const handlePrimaryAction = () => {
    const path = user ? '/modules' : '/SHAAuth?mode=signup';
    handleNavigation(path);
  };

  const handleSecondaryAction = () => {
    handleNavigation('/modules');
  };

  return (
    <section className={`ath-slide ${isActive ? 'active' : ''}`}>
      <div className="ath-orb ath-orb-1" aria-hidden="true"></div>
      <div className="ath-orb ath-orb-2" aria-hidden="true"></div>

      <div className="ath-container">
        <div className="ath-content">
          <div className="ath-eyebrow">
            <span className="ath-eyebrow-dot"></span>
            Professional Training
          </div>

          <h1 className="ath-headline">
            Actuarial<br/>
            Training <span className="ath-headline-accent">Hub</span>
          </h1>

          <p className="ath-subtitle">
            Practical, job-ready training for actuarial professionals &mdash; from data clean-up to capital adequacy, built around the work you actually do.
          </p>

          <div className="ath-cta-row">
            <button type="button" className="ath-cta-primary" onClick={handlePrimaryAction}>
              <span>{user ? 'Go to Training Modules' : 'Start Learning Now'}</span>
              <svg className="ath-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            {/* <button type="button" className="ath-cta-secondary" onClick={handleSecondaryAction}>
              See curriculum
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button> */}
          </div>

          <div className="ath-stats">
            <div className="ath-stat">
              <div className="ath-stat-num">17<span className="ath-stat-unit">modules</span></div>
              <div className="ath-stat-label">Structured path</div>
            </div>
            <div className="ath-stat">
              <div className="ath-stat-num">120<span className="ath-stat-unit">hrs</span></div>
              <div className="ath-stat-label">Of content</div>
            </div>
            <div className="ath-stat">
              <div className="ath-stat-num">Self-<span className="ath-stat-unit">paced</span></div>
              <div className="ath-stat-label">Start anytime</div>
            </div>
          </div>
        </div>

        <div className="ath-visual">
          <div className="ath-visual-wrap">
            <span className="ath-sparkle ath-sparkle-1" aria-hidden="true">✦</span>
            <span className="ath-sparkle ath-sparkle-2" aria-hidden="true">✦</span>
            <span className="ath-sparkle ath-sparkle-3" aria-hidden="true">✦</span>
            <span className="ath-sparkle ath-sparkle-4" aria-hidden="true">✦</span>

            <div className="ath-screen-glow" aria-hidden="true"></div>

            <div className="ath-chip ath-chip-level">
              <span className="ath-chip-dot"></span>
              Level 3 · IFRS 17 Explorer
            </div>

            <div className="ath-chip ath-chip-free">🎓 Free to start</div>

            <div className="ath-monitor-frame">
              <img
                src="/images/actuarial-training-hub-screen.png"
                alt="Actuarial Training Hub dashboard"
                className="ath-monitor-img"
              />
            </div>

            <div className="ath-reflection" aria-hidden="true">
              <img
                src="/images/actuarial-training-hub-screen.png"
                alt=""
                className="ath-monitor-img"
              />
            </div>

            <div className="ath-chip ath-chip-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <polyline points="17 11 19 13 23 9" />
              </svg>
              95% Success Rate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActuarialTrainingHubSlide;
