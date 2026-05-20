import React from 'react';
import './Learn17Slide.css';

const Learn17Slide = ({ isActive, user, handleNavigation }) => {
  const handlePrimaryAction = () => {
    handleNavigation('https://learn17.com/');
  };

  const handleSecondaryAction = () => {
    handleNavigation('https://learn17.com/');
  };

  return (
    <section className={`l17-slide ${isActive ? 'active' : ''}`}>
      <div className="l17-orb l17-orb-1" aria-hidden="true"></div>
      <div className="l17-orb l17-orb-2" aria-hidden="true"></div>

      <div className="l17-container">
        <div className="l17-content">
          <div className="l17-eyebrow">
            <svg className="l17-eyebrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            Independent &amp; Free Educational Resource
          </div>

          <h1 className="l17-headline">
            Learn17.com
            <span className="l17-headline-accent">Your open study companion for Insurance Contracts.</span>
          </h1>

          <p className="l17-subtitle">
            Built for students, actuaries, and finance professionals &mdash; plain language, proper structure, zero jargon.
          </p>

          <div className="l17-cta-row">
            <button type="button" className="l17-cta-primary" onClick={handlePrimaryAction}>
              <svg className="l17-cta-gear" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              {user ? 'Go to Learn17' : 'Try the Policy Sandbox'}
            </button>

            {/* <button type="button" className="l17-cta-secondary" onClick={handleSecondaryAction}>
              Browse the standard
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button> */}
          </div>

          <div className="l17-stats">
            <div className="l17-stat">
              <div className="l17-stat-num">
                100<span className="l17-stat-unit">% free</span>
              </div>
              <div className="l17-stat-label">Open access</div>
            </div>
            <div className="l17-stat">
              <div className="l17-stat-num">
                17<span className="l17-stat-unit">topics</span>
              </div>
              <div className="l17-stat-label">Standard, mapped</div>
            </div>
            <div className="l17-stat">
              <div className="l17-stat-num">
                Web<span className="l17-stat-unit"> based</span>
              </div>
              <div className="l17-stat-label">No download</div>
            </div>
          </div>
        </div>

        <div className="l17-visual">
          <div className="l17-visual-wrap">
            <span className="l17-sparkle l17-sparkle-1" aria-hidden="true">✦</span>
            <span className="l17-sparkle l17-sparkle-2" aria-hidden="true">✦</span>
            <span className="l17-sparkle l17-sparkle-3" aria-hidden="true">✦</span>

            <div className="l17-glow" aria-hidden="true"></div>

            <div className="l17-chip l17-chip-free">🎓 100% Free</div>

            <div className="l17-chip l17-chip-resource">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3ee0e8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                <polyline points="17 6 23 6 23 12"/>
              </svg>
              Independent Resource
            </div>

            <img
              src="/images/learn17-scroll.png"
              alt="Learn17 scroll"
              className="l17-scroll-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Learn17Slide;
