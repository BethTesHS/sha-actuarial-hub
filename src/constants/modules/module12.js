export const module12Data = {
  id: 12,
  title: "Pension Valuation",
  shortDescription: "Master the practical skills for calculating pension liabilities under Deposit Administration (DA) and Individual Pension Plans (IPP). Learn to analyze contributions, validate data, apply actuarial assumptions, and compute accurate actuarial liabilities for pension business.",
  themeColor: "blue",
  
  objectives: {
    text: [
      "This module aims to equip learners with practical skills in calculating the liabilities under pension business.",
      "By the end of the module, participants will be able to analyze contributions and withdrawals data, apply actuarial assumptions, and calculate the actuarial liabilities for Deposit Administration (“DA”) and Individual Pension Plans (“IPP”) businesses."
    ]
  },

  learningOutcomes: {
    text: "By the end of this module, participants will be able to:",
    points: [
      "Compile and validate data on contributions, and withdrawals to ensure accuracy for valuation purposes.",
      "Calculate liabilities for Deposit Administration (DA) and Individual Pension Plans (IPP) using appropriate actuarial methods.",
    ],
  },

  courseContent: {
    description: "This module provides comprehensive guidance on pension valuation through detailed technical documents. Download and use them as your primary references to master DA & IPP Valuation.",
    resources: [
      {
        title: "KAFS_Internal Technical Procedures - DA & IPP - Valuation Manual",
        url: "/Training Modules/Module 12_DA Valuation/Course Content/KAFS_Internal Technical Procedures_DA & IPP - Valuation Manual.pdf",
        filename: "KAFS_Internal Technical Procedures_DA & IPP - Valuation Manual.pdf",
        icon: "📄"
      }
    ]
  },

  assignments: {
    dataFiles: [
      {
        title: "DA Training Dataset",
        description: "Excel • Sample dataset",
        url: "/Training Modules/Module 12_DA Valuation/Data/DA_training_dataset_with_full_dates.xlsx",
        filename: "DA_training_dataset_with_full_dates.xlsx",
        // icon: "📊",
        icon: "📈",
        // icon: "📋",
      }
    ],
    workingFiles: [
      {
        title: "DA & IPP - Working File",
        description: "Excel • Template",
        url: "/Training Modules/Module 12_DA Valuation/Working Files/DA & IPP_Working File.xlsx",
        filename: "DA & IPP_Working File.xlsx",
        icon: "🛠️",
        // icon: "⚙️",
      }
    ],
    resultFiles: [
      {
        title: "DA & IPP - Result File",
        url: "/Training Modules/Module 12_DA Valuation/Results Files/DA_Results_File.xlsx",
        filename: "DA_Results_File.xlsx",
      }
    ]
  },

  aiQuizQuestions: [
    {
      id: "aq1",
      question: "Explain the primary difference between Deposit Administration (DA) schemes and Individual Pension Plans (IPP) regarding how fund balances are managed and liabilities are calculated.",
      hint: "Consider how DA pools funds and declares annual interest, while IPP calculates liabilities based on individual member account values at the valuation date."
    },
    {
      id: "aq2",
      question: "In a Deposit Administration scheme, who bears the investment risk, and how are management fees accounted for when calculating the year-end fund balance?",
      hint: "Think about the insurer's role in guaranteeing returns and how fees are deducted from the fund before or alongside the addition of declared interest."
    },
    {
      id: "aq3",
      question: "Describe the crucial data validation steps (reasonability, completeness, and accuracy checks) an actuary must perform before valuing pension liabilities.",
      hint: "Focus on verifying eligibility ages, identifying missing data, and reconciling aggregate contributions and withdrawals with audited financial statements."
    },
    {
      id: "aq4",
      question: "Walk through the general formula used to calculate the closing fund balance (liability) for a DA or IPP member over a financial year.",
      hint: "Detail the equation: Opening Balance + Contributions + Transfers In - Withdrawals - Management Fees + Declared Interest."
    },
    {
      id: "aq5",
      question: "Identify the principal regulatory body overseeing DA and IPP schemes in Kenya. Why is accurate valuation of these pension liabilities essential for regulatory compliance?",
      hint: "Mention the Retirement Benefits Authority (RBA) and the necessity of ensuring that promised retirement benefits are fully backed by accurately calculated and securely invested funds."
    }
  ],

  

  // ---------- Quiz Questions ----------
  
  quizQuestions: [
    {
      id: 1,
      // section: "Investment Risk",
      question: "Under a DA Scheme, who bears the investment risk?",
      options: [
        "A. The employer",
        "B. The insurance company",
        "C. The members collectively",
        "D. The Retirement Benefits Authority (RBA)"
      ],
      correctAnswer: "B. The insurance company",
      explanation: "In Deposit Administration (DA) schemes, the insurer manages and invests the pooled fund and guarantees the declared return; hence, the investment risk lies with the insurer, not the employer or members."
    },
    {
      id: 2,
      // section: "Management Fees",
      question: "What does the insurer deduct from the fund's investment returns to cover administrative and operational expenses?",
      options: [
        "A. Transfer fee",
        "B. Withdrawal levy",
        "C. Management fee",
        "D. Trustee commission"
      ],
      correctAnswer: "C. Management fee",
      explanation: "The manual states that management fees are deducted from investment returns to cover administrative, investment, and operational costs."
    },
    {
      id: 3,
      // section: "IPP Liabilities",
      question: "In an IPP, each member's fund value reflects:",
      options: [
        "A. The pooled balance of all members",
        "B. The insurer's declared bonus rate only",
        "C. The member's individual account value at valuation date",
        "D. The average of all scheme balances"
      ],
      correctAnswer: "C. The member's individual account value at valuation date",
      explanation: "IPP liabilities equal the member's own account balance (units × unit price) at the valuation date rather than a pooled fund."
    },
    {
      id: 4,
      // section: "Regulatory Framework",
      question: "Which authority regulates both DA and IPP schemes in Kenya?",
      options: [
        "A. Central Bank of Kenya",
        "B. Capital Markets Authority",
        "C. Retirement Benefits Authority (RBA)",
        "D. Insurance Regulatory Authority (IRA)"
      ],
      correctAnswer: "C. Retirement Benefits Authority (RBA)",
      explanation: "Both DA and IPP schemes are governed by the Retirement Benefits Authority (RBA) under the Retirement Benefits Act (Kenya)."
    },
    {
      id: 5,
      // section: "Data Requirements",
      question: "Which of the following is not listed as required data for a DA valuation?",
      options: [
        "A. Detailed product descriptions",
        "B. Contributions and withdrawals data",
        "C. Declared interest rates",
        "D. Staff payroll records"
      ],
      correctAnswer: "D. Staff payroll records",
      explanation: "Data requirements include product descriptions, contributions, withdrawals, and declared interest rates — not payroll records."
    },
    {
      id: 6,
      // section: "Data Checks",
      question: "One of the main goals of the data-checks phase is to confirm:",
      options: [
        "A. Future contribution rates",
        "B. Credibility, consistency, and completeness of the data",
        "C. Company profitability",
        "D. Market share of pension schemes"
      ],
      correctAnswer: "B. Credibility, consistency, and completeness of the data",
      explanation: "Data checks aim to verify credibility, consistency, and completeness, ensuring reliable inputs for valuation."
    },
    {
      id: 7,
      // section: "Reasonability Checks",
      question: "Reasonability checks include all the following except:",
      options: [
        "A. Checking data formats",
        "B. Comparing declared bonuses across insurers",
        "C. Identifying blanks or unreasonable values",
        "D. Confirming entry ages meet eligibility"
      ],
      correctAnswer: "B. Comparing declared bonuses across insurers",
      explanation: "Reasonability checks relate to internal data integrity, not external benchmarking such as comparing industry bonus rates."
    },
    {
      id: 8,
      // section: "Completeness Checks",
      question: "What is the purpose of performing completeness and accuracy checks?",
      options: [
        "A. To verify interest-rate projections",
        "B. To compare total contributions and withdrawals with financial statements",
        "C. To audit actuarial assumptions",
        "D. To ensure pension-law compliance"
      ],
      correctAnswer: "B. To compare total contributions and withdrawals with financial statements",
      explanation: "Completeness and accuracy checks confirm that aggregate policy data reconcile with the insurer's audited or management accounts."
    },
    {
      id: 9,
      // section: "Liability Calculation",
      question: "The liability for DA & IPP business represents:",
      options: [
        "A. Expected future premiums",
        "B. Accumulated contributions and transfers plus declared interest",
        "C. Profit margin retained by insurer",
        "D. Regulatory solvency capital"
      ],
      correctAnswer: "B. Accumulated contributions and transfers plus declared interest",
      explanation: "The fund liability equals the accumulated value of contributions + transfers + declared interest credited over the period."
    },
    {
      id: 10,
      // section: "Fund Balance Formula",
      question: "Which of the following is included in the fund-balance formula?",
      options: [
        "A. Premium receivable",
        "B. Management fees",
        "C. Deferred tax",
        "D. Claims reserves"
      ],
      correctAnswer: "B. Management fees",
      explanation: "The formula for year-end fund balance explicitly deducts management fees before applying interest: Opening + Contributions − Withdrawals − Fees + Interest."
    }
  ]
};
