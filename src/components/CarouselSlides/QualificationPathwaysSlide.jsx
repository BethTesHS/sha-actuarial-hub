import React from 'react';
import './QualificationPathwaysSlide.css';

const QualificationPathwaysSlide = ({ isActive, user, handleNavigation, onDownloadQualificationPathway }) => {
  const handlePrimaryAction = () => {
    onDownloadQualificationPathway?.();
  };

  const handleSecondaryAction = () => {
    handleNavigation('/my-progress');
  };

  return (
    <section className={`slide ${isActive ? 'active' : ''}`}>
      <div className="container">
        <div className="content">
          <div className="eyebrow">
            <svg className="eyebrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
              <polyline points="16 7 22 7 22 13"/>
            </svg>
            Career Growth
          </div>

          <h1>
            Qualification Pathways
            <span className="accent">From Associate to Fellow, one guided route.</span>
          </h1>

          <p className="subtitle">Three stages, thirteen exams, one clear plan.</p>

          <div className="cta-row">
            <button onClick={handlePrimaryAction} className="cta">
              <svg className="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
              View Handbook
            </button>
            {/* <button onClick={handleSecondaryAction} className="cta-secondary">
              Compare routes
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button> */}
          </div>

          <div className="routes">
            <span className="routes-label">Routes covered</span>
            <span className="route-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z"/>
              </svg>
              Certificate
            </span>
            <span className="route-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z"/>
              </svg>
              Associate
            </span>
            <span className="route-chip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L3 7v6c0 5 4 9 9 10 5-1 9-5 9-10V7l-9-5z"/>
              </svg>
              Fellow
            </span>
          </div>
        </div>

        <div className="visual">
          <div className="qual-wrap">
            <div className="sparkle sparkle-1">✦</div>
            <div className="sparkle sparkle-2">✦</div>
            <div className="sparkle sparkle-3">✦</div>

            <div className="stage-card s1">
              <div className="stage-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div className="stage-text">
                <div className="stage-title">Stage 1 &middot; Core Principles</div>
                <div className="stage-sub">7 foundation exams</div>
              </div>
            </div>

            <div className="stage-card s2">
              <div className="stage-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </div>
              <div className="stage-text">
                <div className="stage-title">Stage 2 &middot; Core Practices</div>
                <div className="stage-sub">3 application exams</div>
              </div>
            </div>

            <div className="stage-card s3">
              <div className="stage-icon">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                </svg>
              </div>
              <div className="stage-text">
                <div className="stage-title">Stage 3 &middot; Specialism</div>
                <div className="stage-sub">Choose your track</div>
              </div>
            </div>

            <div className="float-chip">
              <span className="chip-dot"></span>
              IFoA Accredited Route
            </div>

            <div className="qual-card-frame">
              <img src="/images/qualification-pathways-card.png" alt="Qualification Pathways" className="qual-card" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualificationPathwaysSlide;
