import React from "react";
import "./IFRS17GameSlide.css";

const TrophyMarkSvg = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden={true}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

const IFRS17GameSlide = ({ isActive, user, handleNavigation }) => {
  const handlePrimaryAction = () => {
    handleNavigation("https://www.ifrs17game.com/");
  };

  return (
    <section className={`ifr-slide ${isActive ? "active" : ""}`}>
      <div className="ifr-orb ifr-orb-1" aria-hidden="true"></div>
      <div className="ifr-orb ifr-orb-2" aria-hidden="true"></div>

      <div className="ifr-container">
        <div className="ifr-content">
          <div className="ifr-eyebrow">
            <span className="ifr-eyebrow-dot"></span>
            IFRS 17 Game
          </div>

          <h1 className="ifr-headline">
            IFRS 17
            <span className="ifr-headline-accent"> Quest &amp; Conquer</span>
          </h1>

          <p className="ifr-subtitle">
            Step into Kenbright&apos;s <strong>IFRS 17 Game</strong> and build
            practical understanding of insurance financial reporting through a
            fun, immersive learning experience.
          </p>

          <p className="ifr-tagline">
            The only game your employer will thank you for playing at work
            <span
              role="img"
              aria-label="winking face"
              className="ifr-tagline-emoji"
            >
              😉
            </span>
          </p>

          <div className="ifr-cta-row">
            <button
              type="button"
              className="ifr-cta-primary"
              onClick={handlePrimaryAction}
            >
              <svg
                className="ifr-cta-arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
              <span>
                Click here to Play the Game
              </span>
            </button>
          </div>

          <div className="ifr-stats">
            <div className="ifr-stat">
              <div className="ifr-stat-num">
                15<span className="ifr-stat-unit">levels</span>
              </div>
              <div className="ifr-stat-label">Bite-sized modules</div>
            </div>
            <div className="ifr-stat">
              <div className="ifr-stat-num">
                100<span className="ifr-stat-unit">% free</span>
              </div>
              <div className="ifr-stat-label">No paywall</div>
            </div>
            <div className="ifr-stat">
              <div className="ifr-stat-num">
                CPD<span className="ifr-stat-unit">eligible</span>
              </div>
              <div className="ifr-stat-label">Earn credits</div>
            </div>
          </div>
        </div>

        <div className="ifr-visual">
          <div className="ifr-visual-wrap">
            <span className="ifr-star ifr-star-1" aria-hidden="true">
              ✦
            </span>
            <span className="ifr-star ifr-star-2" aria-hidden="true">
              ✧
            </span>
            <span className="ifr-star ifr-star-3" aria-hidden="true">
              ✦
            </span>
            <span className="ifr-star ifr-star-4" aria-hidden="true">
              ✧
            </span>
            <span className="ifr-star ifr-star-5" aria-hidden="true">
              ✦
            </span>
            <span className="ifr-star ifr-star-6" aria-hidden="true">
              ⋆
            </span>
            <span className="ifr-star ifr-star-7" aria-hidden="true">
              ✦
            </span>

            <div className="ifr-phone-glow" aria-hidden="true"></div>

            <div className="ifr-badge ifr-badge-levels">
              <span className="ifr-badge-icon">
                <TrophyMarkSvg size={14} />
              </span>
              <span>15 Levels</span>
            </div>

            <div className="ifr-badge ifr-badge-free">
              <span className="ifr-badge-emoji" aria-hidden="true">
                🎁
              </span>
              <span>Free to play</span>
            </div>

            <div className="ifr-badge ifr-badge-xp">
              <span className="ifr-badge-icon-star" aria-hidden="true">
                ★
              </span>
              <span>Earn XP</span>
            </div>

            <div className="ifr-trophy-badge">
              <span className="ifr-confetti ifr-confetti-1" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-2" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-3" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-4" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-5" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-6" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-7" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-8" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-9" aria-hidden="true"></span>
              <span className="ifr-confetti ifr-confetti-10" aria-hidden="true"></span>
              <div className="ifr-trophy-icon">
                <TrophyMarkSvg size={32} />
              </div>
            </div>

            <div className="ifr-phone">
              <div className="ifr-phone-notch" aria-hidden="true"></div>
              <div className="ifr-phone-screen">
                <div className="ifr-phone-header">
                  <div className="ifr-phone-title">IFRS 17 Game</div>
                  <div className="ifr-phone-xp">
                    <span className="ifr-xp-star">★</span>
                    Lv 1 · 450 XP
                  </div>
                </div>

                <div className="ifr-tile-grid">
                  <div className="ifr-tile ifr-tile-green ifr-tile-progress">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">IFRS 17 Fundamentals</div>
                    <div className="ifr-tile-lv">LV.01</div>
                  </div>
                  <div className="ifr-tile ifr-tile-emerald ifr-tile-unlocked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 3H7l-4 4 4 4h10l4-4z" />
                        <path d="M17 13H7l-4 4 4 4h10l4-4z" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Combination & Separation</div>
                    <div className="ifr-tile-lv">LV.02</div>
                  </div>
                  <div className="ifr-tile ifr-tile-teal ifr-tile-unlocked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Level of Aggregation</div>
                    <div className="ifr-tile-lv">LV.03</div>
                  </div>
                  <div className="ifr-tile ifr-tile-cyan ifr-tile-unlocked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Recognition of Contracts</div>
                    <div className="ifr-tile-lv">LV.04</div>
                  </div>
                  <div className="ifr-tile ifr-tile-blue ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">
                      Measurement on Initial Recog.
                    </div>
                    <div className="ifr-tile-lv">LV.05</div>
                  </div>
                  <div className="ifr-tile ifr-tile-indigo ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Subsequent Measurement</div>
                    <div className="ifr-tile-lv">LV.06</div>
                  </div>
                  <div className="ifr-tile ifr-tile-purple ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">
                      Discounting CSM & Risk Adj.
                    </div>
                    <div className="ifr-tile-lv">LV.07</div>
                  </div>
                  <div className="ifr-tile ifr-tile-violet ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Onerous Contracts</div>
                    <div className="ifr-tile-lv">LV.08</div>
                  </div>
                  <div className="ifr-tile ifr-tile-fuchsia ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">
                      Premium Allocation Approach
                    </div>
                    <div className="ifr-tile-lv">LV.09</div>
                  </div>
                  <div className="ifr-tile ifr-tile-pink ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Reinsurance Contracts Held</div>
                    <div className="ifr-tile-lv">LV.10</div>
                  </div>
                  <div className="ifr-tile ifr-tile-rose ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Investment Contracts</div>
                    <div className="ifr-tile-lv">LV.11</div>
                  </div>
                  <div className="ifr-tile ifr-tile-red ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">
                      Modification & Derecognition
                    </div>
                    <div className="ifr-tile-lv">LV.12</div>
                  </div>
                  <div className="ifr-tile ifr-tile-orange ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Financial Position</div>
                    <div className="ifr-tile-lv">LV.13</div>
                  </div>
                  <div className="ifr-tile ifr-tile-amber ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Insurance Service Result</div>
                    <div className="ifr-tile-lv">LV.14</div>
                  </div>
                  <div className="ifr-tile ifr-tile-yellow ifr-tile-locked">
                    <div className="ifr-tile-corner-icon">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="11" width="18" height="11" rx="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    <div className="ifr-tile-label">Insurance Finance Income</div>
                    <div className="ifr-tile-lv">LV.15</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IFRS17GameSlide;
