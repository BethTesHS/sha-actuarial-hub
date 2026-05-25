import React from 'react';
import './ActuarialToolsSlide.css';

const ActuarialToolsSlide = ({ isActive, user, handleNavigation, totalToolsCount }) => {
  const handlePrimaryAction = () => {
    const path = user ? '/tools' : '/SHAAuth?mode=signup';
    handleNavigation(path);
  };

  const handleSecondaryAction = () => {
    handleNavigation('/tools');
  };

  return (
    <section className={`ats-slide ${isActive ? 'active' : ''}`}>
      <div className="ats-orb ats-orb-1" aria-hidden="true"></div>
      <div className="ats-orb ats-orb-2" aria-hidden="true"></div>

      <div className="ats-container">
        <div className="ats-content">
          <div className="ats-eyebrow">
            <span className="ats-eyebrow-dot"></span>
            Actuarial Toolkit
          </div>

          <h1 className="ats-headline">
            Every model you need,<span className="ats-headline-accent"> one workspace.</span>
          </h1>

          <p className="ats-subtitle">
            From LRC and UPR to Risk Adjustment and Pensions &mdash; a growing library of production-grade actuarial models you can run in your browser.
          </p>

          <div className="ats-cta-row">
            <button type="button" className="ats-cta-primary" onClick={handlePrimaryAction}>
              <svg className="ats-cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
              <span>{user ? 'View Tools Dashboard' : 'Sign Up Free'}</span>
            </button>

            {/* <button type="button" className="ats-cta-secondary" onClick={handleSecondaryAction}>
              Explore all models
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button> */}
          </div>

          <div className="ats-stats">
            <div className="ats-stat">
              <div className="ats-stat-num">{totalToolsCount}<span className="ats-stat-unit">tools</span></div>
              <div className="ats-stat-label">Available now</div>
            </div>
            <div className="ats-stat">
              <div className="ats-stat-num">3<span className="ats-stat-unit">categories</span></div>
              <div className="ats-stat-label">Actuarial · Reins · Pensions</div>
            </div>
            <div className="ats-stat">
              <div className="ats-stat-num">Browser<span className="ats-stat-unit">only</span></div>
              <div className="ats-stat-label">No install required</div>
            </div>
          </div>
        </div>

        <div className="ats-visual">
          <div className="ats-visual-wrap">
            <span className="ats-sparkle ats-sparkle-1" aria-hidden="true">✦</span>
            <span className="ats-sparkle ats-sparkle-2" aria-hidden="true">✦</span>
            <span className="ats-sparkle ats-sparkle-3" aria-hidden="true">✦</span>
            <span className="ats-sparkle ats-sparkle-4" aria-hidden="true">✦</span>

            <div className="ats-stack-glow" aria-hidden="true"></div>

            <div className="ats-toolkit-frame">
              <img
                src="/images/actuarial-toolkit-stack.png"
                alt="Actuarial Toolkit"
                className="ats-toolkit-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActuarialToolsSlide;
