import React from 'react';

export default function ModuleOverview({ objectives, learningOutcomes, theme, styles }) {
  return (
    <div className={`rounded-3xl ${styles.cardBg} backdrop-blur-xl border ${styles.border} ${styles.shadow} p-6`}>
      <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
        Module Objective
        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-400 to-blue-400'} transform translate-y-1`}></span>
      </h3>
      <p className={`${styles.textSecondary} mb-6 text-sm md:text-base`}>
        {typeof objectives === 'string' ? objectives : (
          <>
            {objectives.text.map((paragraph, idx) => <span key={idx}>{paragraph}<br/><br/></span>)}
          </>
        )}
      </p>

      <h3 className={`text-lg md:text-xl font-bold ${styles.text} mb-4 relative inline-block`}>
        Learning Outcomes
        <span className={`absolute bottom-0 left-0 w-full h-0.5 ${theme === 'light' ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gradient-to-r from-purple-400 to-blue-400'} transform translate-y-1`}></span>
      </h3>
      <p className={`${styles.textSecondary} mb-6 text-sm md:text-base`}>
        <>
          {learningOutcomes.text}
        </>
      </p>
      <ul className={`list-disc pl-5 ${styles.textSecondary} space-y-2 mb-6 text-sm md:text-base`}>
        {learningOutcomes.points.map((outcome, idx) => <li key={idx}>{outcome}</li>)}
      </ul>
    </div>
  );
}