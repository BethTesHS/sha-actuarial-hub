export const module7Data = {
  id: 7,
  title: "Premium Certification",
  shortDescription: "Master actuarial premium certification for general insurance business. Learn to assess pricing adequacy, compute loss & expense ratios, evaluate average premium rates, test regulatory compliance, and issue actuarial certification opinions for IRA approval.",
  themeColor: "blue",
  
  objectives: {
    text: [
      "This module equips learners with practical skills in performing Actuarial Premium Certification for general insurance business. Participants will learn how to assess pricing adequacy, compute loss & expense ratios, evaluate average premium rates, test regulatory compliance, and issue an actuarial certification opinion for approval by IRA.",
    ]
  },

  learningOutcomes: {
    text: "By the end of this module, participants will be able to:",
    points: [
      "Understand the purpose and regulatory basis of premium certification under the Insurance Act.",
      "Explain how premium adequacy links to solvency, loss experience and capital sustainability.",
      "Validate premium and loss data for accuracy, completeness and reconciliation integrity.",
      "Calculate core actuarial certification metrics including",
      "Determine whether proposed premium rates are sufficient using adequacy formulas.",
      "Apply premium review methodology to real insurer datasets.",
      "Produce an actuarial certification report and recommendation suitable for IRA submission.",

    ],
  },

  courseContent: {
    description: "This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master Premium Certification Analysis. Download and use them as your primary references throughout the module.",
    resources: [
      {
        title: "KAFS - Internal Technical Procedures - Premium Certification - 2025",
        url: "/Training Modules/Module 7_Premium Certificate/Course Content/KAFS_Internal Technical Procedures_Premium Certification_2025.pdf",
        filename: "KAFS_Internal Technical Procedures_Premium Certification_2025.pdf",
        icon: "📄"
      }
    ],
  },

  assignments: {
    dataFiles: [
      {
        title: "ABC Company - Data Shared",
        description: "Excel • Sample dataset",
        url: "/Training Modules/Module 7_Premium Certificate/Data/ABC Company_Data Shared.xlsx",
        filename: "ABC Company_Data Shared.xlsx",
        icon: "📊",
        // icon: "📈",
        // icon: "📋",
      },
    ],
    workingFiles: [
      {
        title: "ABC -Premium Certification - 2025",
        description: "Excel • Template",
        url: "/Training Modules/Module 7_Premium Certificate/Working Files/ABC- Premium Certification 2025.xlsx",
        filename: "ABC- Premium Certification 2025.xlsx",
        icon: "🛠️",
        // icon: "⚙️",
      }
    ],
    resultFiles: [
      {
        title: "ABC- Premium Certification 2025 - Results",
        url: "/Training Modules/Module 7_Premium Certificate/Results Files/ABC- Premium Certification 2025_Results.xlsx",
        filename: "ABC- Premium Certification 2025_Results.xlsx",
      }
    ]
  },

  // aiQuizQuestions: [
  //   {
  //     id: "aq1",
  //     question: "What is the primary purpose of conducting a Premium Certification in general insurance, and why is data reconciliation between the premium register and management accounts a critical first step?",
  //     hint: "Consider the regulatory requirements for IRA approval and how data integrity directly impacts the reliability of loss and expense ratio calculations."
  //   },
  //   {
  //     id: "aq2",
  //     question: "Explain the components of the combined ratio. If an insurer's combined ratio is consistently above 110%, what does this indicate about their pricing, and what recommendations should an actuary make?",
  //     hint: "The combined ratio includes both the loss ratio and expense ratio. A ratio consistently over 100% indicates underwriting strain and unsustainable pricing."
  //   },
  //   {
  //     id: "aq3",
  //     question: "Detail the formula for calculating the minimum adequate premium. Why is it necessary to incorporate a margin alongside the pure premium and expenses?",
  //     hint: "Recall the formula: (Pure Premium + Expenses) / (1 – Margin). Think about how recovering costs plus a margin ensures long-term capital sustainability."
  //   },
  //   {
  //     id: "aq4",
  //     question: "Under what specific circumstances would an actuary issue a 'Conditional Approval' (Approve with Conditions) for proposed premium rates rather than an outright approval or refusal?",
  //     hint: "Consider scenarios where rates are near the adequacy threshold, but emerging risks or deteriorating trends necessitate close monitoring."
  //   },
  //   {
  //     id: "aq5",
  //     question: "How does claims inflation affect the loss ratio, and what specific risk management actions (such as adjusting policy structures) can an insurer take to mitigate rapid increases in claim severity?",
  //     hint: "Inflation primarily increases the average cost per claim (severity). Think about how implementing or increasing deductibles controls high severity exposures."
  //   },
  //   {
  //     id: "aq6",
  //     question: "Why is the analysis of the average premium rate essential during the certification process, and how does it help an actuary detect pricing drift over time?",
  //     hint: "Evaluate how comparing the actual charged rates against the theoretical adequate rates year-over-year helps identify if a portfolio is silently becoming underpriced."
  //   }
  // ],


  // ---------- Quiz Questions ----------
  
  quizQuestions: [
    {
      id: 1,
      // section: "Certification Fundamentals",
      question: "Which of the following BEST describes the purpose of premium certification?",
      options: [
        "A. To increase insurer profits",
        "B. To prove that pricing matches competitors",
        "C. To confirm adequacy and compliance of premium rates",
        "D. To support broker commissions"
      ],
      correctAnswer: "C. To confirm adequacy and compliance of premium rates",
      explanation: "Ensures premiums are financially adequate, compliant and sustainable."
    },
    {
      id: 2,
      // section: "Data Validation",
      question: "Which dataset MUST reconcile before any certification can proceed?",
      options: [
        "A. Reinsurance treaties vs underwriting guidelines",
        "B. Premium registers vs management accounts",
        "C. Sales projections vs investment returns",
        "D. Payroll expenses vs claim reserves"
      ],
      correctAnswer: "B. Premium registers vs management accounts",
      explanation: "Premium register must match management accounts for data integrity."
    },
    {
      id: 3,
      // section: "Combined Ratio Analysis",
      question: "A combined ratio consistently above 110% indicates:",
      options: [
        "A. Strong profitability",
        "B. Borderline pricing",
        "C. Underpricing and emerging loss strain",
        "D. Good reserve strength"
      ],
      correctAnswer: "C. Underpricing and emerging loss strain",
      explanation: "Claims + expenses > 110% of premiums = unsustainable pricing."
    },
    {
      id: 4,
      // section: "Loss Ratio Calculation",
      question: "Loss Ratio = Incurred Claims / Earned Premium. If claims = 85M and premium = 100M, LR =",
      options: [
        "A. 75%",
        "B. 85%",
        "C. 115%",
        "D. 100%"
      ],
      correctAnswer: "B. 85%",
      explanation: "85 divided by 100 = 85% loss ratio."
    },
    {
      id: 5,
      // section: "Certification Approval Conditions",
      question: "Which condition prevents certification?",
      options: [
        "A. Combined ratio < 95%",
        "B. CAR > 100%",
        "C. Expense ratio at 28%",
        "D. Commission rate exceeds IRA limit"
      ],
      correctAnswer: "D. Commission rate exceeds IRA limit",
      explanation: "Commission breaches regulatory limits = automatic certification fail"
    },
    {
      id: 6,
      // section: "Premium Adequacy",
      question: "Minimum adequate premium is calculated as:",
      options: [
        "A. Claims + Commissions + Expenses",
        "B. Pure Premium / Expense Ratio",
        "C. (Pure Premium + Expenses) / (1 – Margin)",
        "D. GWP – Loss Ratio"
      ],
      correctAnswer: "C. (Pure Premium + Expenses) / (1 – Margin)",
      explanation: "Ensures pure premium + cost + profit recovered fully"
    },
    {
      id: 7,
      // section: "Rate Adjustment Triggers",
      question: "Strongest indicator for rate increase?",
      options: [
        "A. Stable frequency + declining severity",
        "B. Loss ratio rises 18% YoY",
        "C. Premium growth >20%",
        "D. Expense ratio <20%"
      ],
      correctAnswer: "B. Loss ratio rises 18% YoY",
      explanation: "Rapid deterioration implies underpricing risk."
    },
    {
      id: 8,
      // section: "Certification Refusal",
      question: "Certification should not proceed when:",
      options: [
        "A. CR = 97%",
        "B. Avg rate 2% above adequacy",
        "C. Pricing 12% below adequacy",
        "D. LR = 60%"
      ],
      correctAnswer: "C. Pricing 12% below adequacy",
      explanation: "Underpricing >10% requires adjustment before approval."
    },
    {
      id: 9,
      // section: "Conditional Approval",
      question: "'Approve with Conditions' means:",
      options: [
        "A. Fully adequate",
        "B. Must increase pricing immediately",
        "C. Adequate but requires monitoring",
        "D. IRA approval irrelevant"
      ],
      correctAnswer: "C. Adequate but requires monitoring",
      explanation: "Suitable when near adequacy threshold with emerging risk."
    },
    {
      id: 10,
      // section: "Inflation Impacts",
      question: "Most sensitive to claims inflation?",
      options: [
        "A. Expense Ratio",
        "B. Loss Ratio",
        "C. Commission Ratio",
        "D. CAR"
      ],
      correctAnswer: "B. Loss Ratio",
      explanation: "Claims inflation increases severity and loss ratio primarily."
    },
    {
      id: 11,
      // section: "Capital Assessment",
      question: "CAR Fall 150% → 110% suggests:",
      options: [
        "A. Strong profits",
        "B. Low growth",
        "C. Capital strain from losses",
        "D. Commission savings"
      ],
      correctAnswer: "C. Capital strain from losses",
      explanation: "Decline signals underwriting deterioration affecting solvency"
    },
    {
      id: 12,
      // section: "Risk Management",
      question: "If severity increases, appropriate action is:",
      options: [
        "A. Reduce premiums",
        "B. Increase deductibles",
        "C. Remove reinsurance",
        "D. Cut commission only"
      ],
      correctAnswer: "B. Increase deductibles",
      explanation: "Deductibles control high severity exposure."
    },
    {
      id: 13,
      // section: "Reporting Requirements",
      question: "Mandatory content in certificate?",
      options: [
        "A. Broker feedback",
        "B. Pricing adequacy opinion",
        "C. Competitor benchmarking only",
        "D. Marketing summary"
      ],
      correctAnswer: "B. Pricing adequacy opinion",
      explanation: "Certificate must contain adequacy conclusion and recommendation."
    },
    {
      id: 14,
      // section: "Data Integrity",
      question: "Dataset acceptable only after:",
      options: [
        "A. Gaps ignored",
        "B. Validation log signed",
        "C. Market assumption only",
        "D. CAR >100%"
      ],
      correctAnswer: "B. Validation log signed",
      explanation: "Signed validation confirms data integrity."
    },
    {
      id: 15,
      // section: "Rate Analysis",
      question: "Purpose of average premium rate analysis?",
      options: [
        "A. Track revenue",
        "B. Detect pricing drift & underpricing",
        "C. Measure distribution profit only",
        "D. Validate investment returns"
      ],
      correctAnswer: "B. Detect pricing drift & underpricing",
      explanation: "Used to compare adequacy across years"
    }
  ]
};
