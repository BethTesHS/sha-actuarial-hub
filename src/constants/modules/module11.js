export const module11Data = {
  id: 11,
  title: "Group Life Business Valuation",
  shortDescription: "Master the valuation of Group Life Insurance business under IFRS 17 using the Premium Allocation Approach (PAA). Learn to calculate key liabilities including LRC, LIC, and Risk Adjustment, and develop comprehensive valuation reports.",
  themeColor: "purple",
  
  objectives: {
    text: [
      "This module introduces learners to the valuation of Group Life Insurance business under IFRS 17 using the Premium Allocation Approach (PAA).",
      "It focuses on the determination of key liabilities: Liability for Remaining Coverage (LRC), Liability for Incurred Claims (LIC), and Risk Adjustment (RA).",
    ]
  },

  learningOutcomes: {
    text: "Upon completion of this module, learners will be able to:",
    points: [
      "Apply data checks for LRC and LIC to ensure quality and credibility of valuation inputs.",
      "Calculate Liability for Remaining Coverage (LRC) under PAA, including Unearned Premium Reserves and the Loss Component.",
      "Perform Liability for Incurred Claims (LIC) estimation using standard reserving techniques (Chain Ladder, Bornhuetter-Ferguson, Cape Cod, Expected Loss Ratio).",
      "Assess and compute Risk Adjustment (RA) using statistical approaches such as bootstrapping.",
      "Evaluate trends in claims reserves utilization and understand their implications on valuation results.",
      "Interpret results, document key assumptions, and prepare a draft valuation report for review and sign-off.",
    ],
  },

  courseContent: {
    description: "Access comprehensive technical procedures and guidelines for Group Life Business valuation. These documents provide the foundation for all exercises and practical applications in this module.",
    resources: [
      {
        title: "KAFS - Group Life Business Data & Checks -2026",
        url: "/Training Modules/Module 11_Group Life Valuation/Course Content/KAFS_Internal Technical Procedures_Group Life Business Data & Checks_2026.pdf",
        filename: "KAFS_Internal Technical Procedures_Group Life Business Data & Checks_2026.pdf",
        icon: "📄"
      },
      {
        title: "KAFS - Group Life Business Valuation -2026",
        url: "/Training Modules/Module 11_Group Life Valuation/Course Content/KAFS_Internal Technical Procedures_Group Life Valuation_2026.pdf",
        filename: "KAFS_Internal Technical Procedures_Group Life Valuation_2026.pdf",
        icon: "📄"
      }
    ],
  },

  assignments: {
    dataFiles: [
      {
        title: "Group Life Claims Data",
        description: "Excel • Sample dataset",
        url: "/Training Modules/Module 11_Group Life Valuation/Data/Group_life_claims data.xlsx",
        filename: "Group_life_claims data.xlsx",
        // icon: "📊",
        // icon: "📈",
        icon: "📋",
      },
      {
        title: "Group Life Premiums Data",
        description: "Excel • Sample dataset",
        url: "/Training Modules/Module 11_Group Life Valuation/Data/Group_life_premiums data.xlsx",
        filename: "Group_life_premiums data.xlsx",
        icon: "📊",
        // icon: "📈",
        // icon: "📋",
      },
    ],
    workingFiles: [
      {
        title: "Group Life Business LRC_Template",
        description: "Excel • Template",
        url: "/Training Modules/Module 11_Group Life Valuation/Working Files/Group Life Business LRC_Template.xlsx",
        filename: "Group Life Business LRC_Template.xlsx",
        icon: "🛠️",
        // icon: "⚙️",
      },
      {
        title: "Group Life Claims Data_Clean_Up_Template",
        description: "Excel • Template",
        url: "/Training Modules/Module 11_Group Life Valuation/Working Files/Group Life Claims Data_Clean_Up_Template.xlsx",
        filename: "Group Life Claims Data_Clean_Up_Template.xlsx",
        // icon: "🛠️",
        icon: "⚙️",
      },
      {
        title: "Group Life IBNR Template_2024",
        description: "Excel • Template",
        url: "/Training Modules/Module 11_Group Life Valuation/Working Files/Group Life IBNR Template_2024.xlsx",
        filename: "{fileName}.xlsx",
        icon: "🛠️",
        // icon: "⚙️",
      },
      {
        title: "Group Life Premium_Data_Clean_Up_Template",
        description: "Excel • Template",
        url: "/Training Modules/Module 11_Group Life Valuation/Working Files/Group Life Premium_Data_Clean_Up_Template.xlsx",
        filename: "Group Life Premium_Data_Clean_Up_Template.xlsx",
        // icon: "🛠️",
        icon: "⚙️",
      },
    ],
    resultFiles: [
      {
        title: "Group Life Business LRC_Results File",
        url: "/Training Modules/Module 11_Group Life Valuation/Results Files/Group Life Business LRC_Results File.xlsx",
        filename: "Group Life Business LRC_Results File.xlsx",
      },
      {
        title: "Group Life Claims Data_Cleaned Data",
        url: "/Training Modules/Module 11_Group Life Valuation/Results Files/Group Life Claims_Cleaned Data}.xlsx",
        filename: "Group Life Claims_Cleaned Data.xlsx",
      },
      {
        title: "Group Life IBNR_2024_Results File",
        url: "/Training Modules/Module 11_Group Life Valuation/Results Files/Group Life IBNR_2024_Results File.xlsx",
        filename: "Group Life IBNR_2024_Results File.xlsx",
      },
      {
        title: "Group Life Premium_Data_Cleaned Data",
        url: "/Training Modules/Module 11_Group Life Valuation/Results Files/Group Life Premium_Cleaned Data.xlsx",
        filename: "Group Life Premium_Cleaned Data.xlsx",
      },
    ]
  },

  additionalResources: [
    {
      title: "The Insurance (Valuation of Technical Provisions for Life Insurance Business) Guidelines",
      type: "PDF",
      url: "/Training Modules/Module 11_Group Life Valuation/Additional Resources/The Insurance (Valuation of Technical Provisions for Life Insurance Business) Guidelines.pdf",
      filename: "The Insurance (Valuation of Technical Provisions for Life Insurance Business) Guidelines.pdf",
    },
  ],

  aiQuizQuestions: [
    {
      id: "aq1",
      question: "Why is the Premium Allocation Approach (PAA) typically considered the most suitable IFRS 17 measurement model for Group Life insurance business compared to the General Measurement Model (GMM)?",
      hint: "Consider the typical coverage period of Group Life contracts (usually 12 months or less) and how PAA simplifies the valuation of the Liability for Remaining Coverage (LRC) without requiring interest accretion."
    },
    {
      id: "aq2",
      question: "Distinguish between the Liability for Remaining Coverage (LRC) and the Liability for Incurred Claims (LIC). What specific sub-components (such as UPR, OCR, and IBNR) fall under each?",
      hint: "Think about which liability deals with unexpired risk (future coverage) versus claims that have already occurred but are either unpaid or unreported."
    },
    {
      id: "aq3",
      question: "In estimating Incurred But Not Reported (IBNR) reserves, how does the Bornhuetter-Ferguson (BF) method blend historical claims development with expected loss ratios, and when might it be preferred over the Basic Chain Ladder method?",
      hint: "Consider situations where historical data might be sparse or volatile, and how incorporating an a priori expected loss ratio helps stabilize projections."
    },
    {
      id: "aq4",
      question: "How is the Risk Adjustment (RA) for non-financial risk calculated using a statistical approach like Bootstrapping, and what is its primary purpose in Group Life valuation?",
      hint: "Focus on how RA compensates the insurer for bearing uncertainty, and how it is typically derived by taking the difference between a high confidence level (e.g., 75th percentile) and the mean estimate."
    },
    {
      id: "aq5",
      question: "Explain the purpose of conducting a Claims Reserves Utilisation Analysis on past reserves. What might a consistently high utilisation rate for IBNR indicate about a company's claims reporting process?",
      hint: "Look at how this analysis tracks the accuracy of past reserve estimates against actual payouts, and consider what systemic issues (like late reporting) cause heavy reliance on IBNR reserves."
    }
  ],

  // ---------- Quiz Questions ----------
  
  quizQuestions: [
    {
      id: 1,
      section: "Liability Components",
      question: "Which insurance liability component represents the cost of running off the unexpired portion of the insurer's policies?",
      options: [
        "A. Liability for Incurred Claims (LIC)",
        "B. Risk Adjustment (RA)",
        "C. Liability for Remaining Coverage (LRC)",
        "D. Outstanding Claims Reported (OCR)"
      ],
      correctAnswer: "C. Liability for Remaining Coverage (LRC)",
      explanation: "LRC reflects the value of unexpired insurance contracts, the cost of providing coverage for the remaining policy period."
    },
    {
      id: 2,
      section: "IFRS 17 Measurement",
      question: "Which IFRS 17 measurement model is typically considered the most suitable for Group Life business, given its short-term coverage?",
      options: [
        "A. General Measurement Model (GMM)",
        "B. Premium Allocation Approach (PAA)",
        "C. Loss Component Model (LCM)",
        "D. Variable Fee Approach (VFA)"
      ],
      correctAnswer: "B. Premium Allocation Approach (PAA)",
      explanation: "Group Life contracts are usually less than 12 months, so the simplified PAA model is most suitable under IFRS 17."
    },
    {
      id: 3,
      section: "Liability Components",
      question: "Which of the following is not a sub-component of the Liability for Incurred Claims (LIC)?",
      options: [
        "A. Outstanding Claims Reported (OCR)",
        "B. Incurred but not Reported (IBNR)",
        "C. Unearned Premium Reserve (UPR)",
        "D. Risk Adjustment (RA)"
      ],
      correctAnswer: "C. Unearned Premium Reserve (UPR)",
      explanation: "UPR belongs to LRC, not LIC. LIC only covers claims already incurred (OCR + IBNR + RA)."
    },
    {
      id: 4,
      section: "Risk Assessment",
      question: "The primary non-financial risks for which the Risk Adjustment (RA) is calculated in Group Life business are:",
      options: [
        "A. Market and Credit risk.",
        "B. Pricing and Expense risk.",
        "C. Mortality and Morbidity risk.",
        "D. Liquidity and Operational risk."
      ],
      correctAnswer: "C. Mortality and Morbidity risk.",
      explanation: "RA under IFRS 17 compensates for uncertainties in non-financial risks mainly death (mortality) and health (morbidity)."
    },
    {
      id: 5,
      section: "Valuation Preparation",
      question: "According to the training, before starting the liability valuation, an actuary must pay close attention to which documents from the last three years?",
      options: [
        "A. Cash Flow Statements and Balance Sheets.",
        "B. Previous valuation reports, focusing on assumptions and recommendations.",
        "C. Regulatory filing forms and tax reports.",
        "D. Internal audit reports on IT systems."
      ],
      correctAnswer: "B. Previous valuation reports, focusing on assumptions and recommendations.",
      explanation: "Reviewing past valuation reports helps ensure consistency and checks if earlier assumptions remain valid."
    },
    {
      id: 6,
      section: "Premium Allocation",
      question: "For Group Life policies measured under the PAA, why is interest accretion on the LRC balance typically not required?",
      options: [
        "A. The company has no debt.",
        "B. The interest rate is assumed to be zero.",
        "C. The coverage terms are generally short-term (less than 12 months).",
        "D. IFRS 17 prohibits interest accretion on all PAA contracts."
      ],
      correctAnswer: "C. The coverage terms are generally short-term (less than 12 months).",
      explanation: "Because policies are short-term, the time value of money is immaterial, no interest accretion is needed."
    },
    {
      id: 7,
      section: "Premium Reserves",
      question: "How is the Gross Unearned Premium Reserve (UPR) for Group Life typically calculated?",
      options: [
        "A. As a percentage of total claims paid.",
        "B. Using the Bornhuetter-Ferguson method.",
        "C. Using the 365ths method.",
        "D. As 50% of the total premium written."
      ],
      correctAnswer: "C. Using the 365ths method.",
      explanation: "The 365ths method allocates premium evenly across each day of the contract."
    },
    {
      id: 8,
      section: "Onerous Contracts",
      question: "A portfolio of insurance contracts is considered 'onerous' if:",
      options: [
        "A. The Liability for Incurred Claims (LIC) exceeds the premiums written.",
        "B. The total assets are less than the total liabilities.",
        "C. The expected future outflows exceed the expected future inflows (premiums) for the remaining coverage.",
        "D. The IBNR reserve is calculated to be zero."
      ],
      correctAnswer: "C. The expected future outflows exceed the expected future inflows (premiums) for the remaining coverage.",
      explanation: "Onerous contracts are loss-making because claims and expenses are expected to exceed premiums."
    },
    {
      id: 9,
      section: "Loss Component",
      question: "When is a Loss Component assigned to an insurance portfolio?",
      options: [
        "A. When the Net Premium is negative.",
        "B. When the utilisation rate of IBNR is too high.",
        "C. When a loss event has occurred but not been settled.",
        "D. When the combined ratio of the portfolio exceeds 100%."
      ],
      correctAnswer: "D. When the combined ratio of the portfolio exceeds 100%.",
      explanation: "A combined ratio above 100% means losses exceed premiums, so a Loss Component is required."
    },
    {
      id: 10,
      section: "Reinsurance",
      question: "For reinsurance, which cash flow is recognized under the Liability for Incurred Claims (LIC)?",
      options: [
        "A. Reinsurance Premiums.",
        "B. Reinsurance Debtors (recoveries) because they are claims-related cash flows.",
        "C. Reinsurance Creditors (payables).",
        "D. The total ceded claims amount."
      ],
      correctAnswer: "B. Reinsurance Debtors (recoveries) because they are claims-related cash flows.",
      explanation: "Reinsurance recoveries reduce claim costs, so they are part of LIC, not LRC."
    },
    {
      id: 11,
      section: "Claims Analysis",
      question: "What is the primary purpose of conducting a Claims Reserves Utilisation Analysis?",
      options: [
        "A. To determine the company's current liquidity ratio.",
        "B. To check if regulatory solvency requirements were met.",
        "C. To validate and refine current reserving assumptions by tracking past estimates.",
        "D. To forecast the total earned premium for the next year."
      ],
      correctAnswer: "C. To validate and refine current reserving assumptions by tracking past estimates.",
      explanation: "Utilisation analysis checks whether past reserves were accurate and helps improve future estimates."
    },
    {
      id: 12,
      section: "Reserve Validation",
      question: "A consistently high utilisation rate for the IBNR reserve might indicate:",
      options: [
        "A. A problem with policy underwriting.",
        "B. The IBNR was consistently overestimated.",
        "C. A systemic issue with late claims reporting.",
        "D. That too many outliers were excluded."
      ],
      correctAnswer: "C. A systemic issue with late claims reporting.",
      explanation: "If many claims are reported late, the IBNR reserve is heavily used."
    },
    {
      id: 13,
      section: "Analysis Period",
      question: "The Utilisation Analysis is performed on claims reserves held from which period?",
      options: [
        "A. The current valuation period only.",
        "B. The next five forecasted years.",
        "C. The past three years.",
        "D. Only the reserves related to the largest loss event."
      ],
      correctAnswer: "C. The past three years.",
      explanation: "Reviewing three years gives a balanced view of reserve accuracy and consistency."
    },
    {
      id: 14,
      section: "OCR Utilisation",
      question: "In the OCR Utilisation analysis, if the difference between the initial OCR estimate and the actual final payment is consistently positive, what does this generally signal about the initial estimate?",
      options: [
        "A. The estimate was consistently underestimated.",
        "B. The estimate was consistently overestimated (a reserve release).",
        "C. The IBNR reserve should be increased.",
        "D. The claim development is highly stable."
      ],
      correctAnswer: "B. The estimate was consistently overestimated (a reserve release).",
      explanation: "Positive differences mean reserves were higher than actual claims, leading to reserve releases."
    },
    {
      id: 15,
      section: "Data Credibility",
      question: "If a small insurer is estimating claims liabilities for a new product, what type of data should be incorporated to improve credibility?",
      options: [
        "A. Claims data from the previous ten years for the old product.",
        "B. External data from similar-sized insurers or industry benchmarks.",
        "C. Projected premium data for the next year.",
        "D. Only the data from the first six months of the new product."
      ],
      correctAnswer: "B. External data from similar-sized insurers or industry benchmarks.",
      explanation: "External benchmarks help improve reliability when internal data is insufficient."
    },
    {
      id: 16,
      section: "Outlier Management",
      question: "What should an actuary do after identifying and removing an 'extreme value' (outlier) from the run-off triangles?",
      options: [
        "A. Forget the value, as it should not recur.",
        "B. Adjust the total earned premium downwards.",
        "C. Incorporate a loading to the final claims reserves based on the observed proportion of large losses.",
        "D. Immediately increase the Risk Adjustment."
      ],
      correctAnswer: "C. Incorporate a loading to the final claims reserves based on the observed proportion of large losses.",
      explanation: "Outliers are excluded for modeling accuracy but must still be allowed for via loadings."
    },
    {
      id: 17,
      section: "Run-off Triangles",
      question: "In the context of run-off triangles, which term describes the number of periods until a payment is made?",
      options: [
        "A. Accident/Loss Period",
        "B. Development Period (or Delay Period)",
        "C. Reporting Period",
        "D. Underwriting Period"
      ],
      correctAnswer: "B. Development Period (or Delay Period)",
      explanation: "The development (delay) period measures the time between when a claim occurs and when it is paid."
    },
    {
      id: 18,
      section: "Reserving Methods",
      question: "Which IBNR method is a blend of the Chain Ladder method and an a priori estimate, and is favored when there is uncertainty in claims development trends?",
      options: [
        "A. Basic Chain Ladder (BCL)",
        "B. Expected Loss Ratio (LR)",
        "C. Bornhuetter-Ferguson (BF)",
        "D. Cape Cod (Standard-Buhlmann)"
      ],
      correctAnswer: "C. Bornhuetter-Ferguson (BF)",
      explanation: "BF combines historical development (Chain Ladder) with an external expected loss ratio to reduce volatility."
    },
    {
      id: 19,
      section: "Valuation Process",
      question: "The second phase of the four-phase reserving approach focuses on:",
      options: [
        "A. Validating and balancing the claims data against accounts.",
        "B. Monitoring projections of claims development.",
        "C. Comparing results from different methods.",
        "D. Applying at least two suitable methods for each homogenous group."
      ],
      correctAnswer: "D. Applying at least two suitable methods for each homogenous group.",
      explanation: "Phase 2 is about applying reserving methods after data validation."
    },
    {
      id: 20,
      section: "Risk Adjustment",
      question: "When calculating the Risk Adjustment using the Bootstrapping method, how is the RA value derived?",
      options: [
        "A. It is the simple average of the BCL and BF estimates.",
        "B. It is a fixed percentage set by the regulator.",
        "C. It is the difference between the 75th percentile reserve and the mean IBNR estimate.",
        "D. It is the total of all claims paid in the last year."
      ],
      correctAnswer: "C. It is the difference between the 75th percentile reserve and the mean IBNR estimate.",
      explanation: "The Risk Adjustment is measured as the margin between the average reserve and a higher confidence level (75th percentile)."
    }
  ]
};
