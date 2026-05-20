export const module10Data = {
  id: 10,
  title: "Ordinary Life Valuation",
  shortDescription: "Master actuarial valuation of ordinary life insurance products through data validation, product analysis, assumption setting, and reserve calculation techniques for accurate financial reporting.",
  themeColor: "pink",
  objectives: {
    text: [
      "This module aims to build learners’ capability to perform accurate actuarial valuations of ordinary life insurance products by integrating data clean up with the appropriate valuation techniques. It focuses on data validation and clean-up, understanding product features, applying appropriate actuarial assumptions and the use of actuarial models in calculating reserves to produce accurate and reliable valuation results. The objective is to ensure reliable valuation results that support actuarial reporting and decision-making.",
      "By the end of the module, learners will understand the end-to-end process of valuing ordinary life products, ensuring accuracy, consistency, and compliance with actuarial and regulatory standards."
    ]
  },

  learningOutcomes: {
    text: "By the end of this module, participants will be able to:",
    points: [
      "Validate and clean ordinary life policy data to ensure accuracy and completeness before valuation.",
      "Identify and correct common data quality issues such as missing values, inconsistencies, duplicates, or misclassifications in ordinary life datasets.",
      "Understand and explain the different technical terms used in ordinary life insurance valuations (e.g., surrenders, paid ups, lapses, CSM etc.)",
      "Interpret product features and apply appropriate actuarial assumptions (e.g., mortality, interest, expenses) in the valuation process.",
      "Calculate ordinary life liabilities using standard actuarial techniques.",
      "Prepare valuation results in a structured and reproducible format for actuarial reporting and analysis.",
    ],
  },

  courseContent: {
    description: "This module is guided by comprehensive technical documents. They contain all the instructions, worked examples, and exercises you need to master Ordinary Life Valuation. Download and use them as your primary references throughout the module.",
    resources: [
      // TODO: Two courses
      {
        title: "KAFS - Ordinary Life Insurance Data & Checks",
        url: "/Training Modules/Module 10_Ordinary Life Valuation/Course Content/KAFS_ITPs_Ordinary Life Insurance Data & Checks.pdf",
        filename: "KAFS_ITPs_Ordinary Life Insurance Data & Checks.pdf",
        icon: "📄"
      },
      {
        title: "KAFS - Ordinary Life Insurance Valuation",
        url: "/Training Modules/Module 10_Ordinary Life Valuation/Course Content/KAFS_Ordinary Life Insurance Valuation.pdf",
        filename: "KAFS_Ordinary Life Insurance Valuation.pdf",
        icon: "📄"
      },
    ],
  },

  assignments: {
    dataFiles: [
      {
        title: "Ordinary Life_Valuation Data",
        description: "Excel • Sample dataset",
        url: "/Training Modules/Module 10_Ordinary Life Valuation/Data/Ordinary Life_Valuation Data.xlsx",
        filename: "Ordinary Life_Valuation Data.xlsx",
        icon: "📊",
        // icon: "📈",
        // icon: "📋",
      },
    ],
    workingFiles: [
      {
        title: "Company X - StandAlone - IFRS17 GMM Model_Working File",
        description: "Excel • Template",
        url: "/Training Modules/Module 10_Ordinary Life Valuation/Working Files/Company X_StandAlone_IFRS17 GMM Model_Working File.xlsx",
        filename: "Company X_StandAlone_IFRS17 GMM Model_Working File.xlsx",
        // icon: "🛠️",
        icon: "⚙️",
      },
      {
        title: "Ordinary Life - Data Recon - Valuation - Working File",
        description: "Excel • Template",
        url: "/Training Modules/Module 10_Ordinary Life Valuation/Working Files/Ordinary Life_Data Recon - 311223_Valuation_Working File.xlsx",
        filename: "Ordinary Life_Data Recon - 311223_Valuation_Working File.xlsx",
        icon: "🛠️",
        // icon: "⚙️",
      },
    ],
    resultFiles: [
      {
        title: "Company X - StandAlone - IFRS17 GMM Model",
        url: "/Training Modules/Module 10_Ordinary Life Valuation/Results Files/Company X_StandAlone_IFRS17 GMM Model.xlsx",
        filename: "Company X_StandAlone_IFRS17 GMM Model.xlsx",
      },
      {
        title: "Ordinary Life - Data Recon - Valuation",
        url: "/Training Modules/Module 10_Ordinary Life Valuation/Results Files/Ordinary Life_Data Recon - 311223_Valuation.xlsx",
        filename: "Ordinary Life_Data Recon - 311223_Valuation.xlsx",
      },
    ]
  },

  additionalResources: [
    {
      title: "The Insurance (Valuation of Technical Provisions for Life Insurance Business) Guidelines",
      type: "PDF",
      url: "/Training Modules/Module 10_Ordinary Life Valuation/Additional Resources/The Insurance (Valuation of Technical Provisions for Life Insurance Business) Guidelines.pdf",
      filename: "The Insurance (Valuation of Technical Provisions for Life Insurance Business) Guidelines.pdf",
    },
  ],

  aiQuizQuestions: [
    {
      id: "aq1",
      question: "Why is movement analysis and data reconciliation a critical first step in the valuation of ordinary life policies?",
      hint: "Consider how tracking the flow of policies (new business, lapses, maturities, and surrenders) from the opening to closing dates ensures the completeness and accuracy of the valuation data."
    },
    {
      id: "aq2",
      question: "Differentiate between Term Assurance, Endowment Assurance, and Whole Life Assurance in terms of benefit triggers and coverage duration.",
      hint: "Think about when the sum assured is paid out: only on death within a term, on death or survival to a specific term, or on death at any time regardless of age."
    },
    {
      id: "aq3",
      question: "Explain the concept of Expected Present Value (EPV) in the context of calculating life insurance reserves.",
      hint: "Focus on how actuaries combine the probability of future events (like mortality) with the time value of money (discounting) to determine today's value of future cash flows."
    },
    {
      id: "aq4",
      question: "Under the IFRS 17 General Measurement Model (GMM), what is the Contractual Service Margin (CSM) and how does it prevent the premature recognition of profits?",
      hint: "Consider the CSM as the unearned profit over the life of the contract that is amortized into the P&L as the insurer provides services, rather than recognized all at once."
    },
    {
      id: "aq5",
      question: "Discuss the purpose of the Risk Adjustment (RA) for non-financial risk. What happens if, at initial recognition, the expected cash outflows plus the risk adjustment exceed the expected cash inflows?",
      hint: "Look at RA as a compensation for bearing uncertainty related to mortality and morbidity. Also, recall the concept of recognizing an immediate loss component for onerous contracts."
    }
  ],

  

  // ---------- Quiz Questions ----------
  
  quizQuestions: [
    {
      id: 1,
      // section: "Data Validation",
      question: "Which of the following is an example of a consistency check?",
      options: [
        "a) Confirming policy dates are in the correct format",
        "b) Tracking that policies active last year but missing this year appear in the movement schedules",
        "c) Checking unusual values such as negative sums assured",
        "d) Ensuring policyholder names match gender"
      ],
      correctAnswer: "b) Tracking that policies active last year but missing this year appear in the movement schedules",
      explanation: "Consistency checks ensure data remains logical over time, like tracking policy movements between valuation dates."
    },
    {
      id: 2,
      // section: "Movement Analysis",
      question: "What is the purpose of movement analysis in policy data?",
      options: [
        "a) To track how policy counts change between valuation dates",
        "b) To calculate surrender values",
        "c) To project solvency margins",
        "d) To compute expenses per policy"
      ],
      correctAnswer: "a) To track how policy counts change between valuation dates",
      explanation: "Movement analysis reconciles policy counts from opening to closing through new business, lapses, maturities, and surrenders."
    },
    {
      id: 3,
      // section: "Movement Reconciliation",
      question: "At last valuation, 10,000 policies were active. During the year, 2,000 new policies were issued, 800 matured, 200 lapsed and 100 surrendered. How many policies should be active at current valuation?",
      options: [
        "a) 10,000",
        "b) 10,500",
        "c) 11,000",
        "d) 10,900"
      ],
      correctAnswer: "d) 10,900",
      explanation: "Active policies = Opening + New - Matured - Lapsed - Surrendered = 10,000 + 2,000 - 800 - 200 - 100 = 10,900"
    },
    {
      id: 4,
      // section: "Term Assurance",
      question: "In Term Assurance, the sum assured is payable:",
      options: [
        "a) Whenever death occurs",
        "b) Only if the insured dies within the policy term",
        "c) On survival to the end of the term only",
        "d) Both death and survival"
      ],
      correctAnswer: "b) Only if the insured dies within the policy term",
      explanation: "Term Assurance provides death coverage only during the specified policy term with no survival benefit."
    },
    {
      id: 5,
      // section: "Endowment Assurance",
      question: "Which product pays the sum assured on death during the term or on survival at maturity?",
      options: [
        "a) Term Assurance",
        "b) Endowment Assurance",
        "c) Whole Life Assurance",
        "d) Annuity"
      ],
      correctAnswer: "b) Endowment Assurance",
      explanation: "Endowment Assurance pays the sum assured either on death during the term or on survival to maturity."
    },
    {
      id: 6,
      // section: "With-Profit Policies",
      question: "With-profit policies provide benefits through:",
      options: [
        "a) Guaranteed fixed payments only",
        "b) Bonuses in addition to guaranteed benefits",
        "c) Only annuity income",
        "d) Lower premiums"
      ],
      correctAnswer: "b) Bonuses in addition to guaranteed benefits",
      explanation: "With-profit policies provide guaranteed benefits plus bonuses declared from investment profits."
    },
    {
      id: 7,
      // section: "Policy Riders",
      question: "Which of the following is NOT an example of a rider?",
      options: [
        "a) Accidental Death Benefit",
        "b) Critical Illness",
        "c) Disability rider",
        "d) Endowment Assurance"
      ],
      correctAnswer: "d) Endowment Assurance",
      explanation: "Endowment Assurance is a main policy type, not a rider. Riders are additional benefits attached to main policies."
    },
    {
      id: 8,
      // section: "Whole Life Assurance",
      question: "In Whole Life Assurance, when is the sum assured paid?",
      options: [
        "a) Only at maturity",
        "b) At death, whenever it occurs",
        "c) Only if the insured dies before 65",
        "d) At retirement"
      ],
      correctAnswer: "b) At death, whenever it occurs",
      explanation: "Whole Life Assurance provides lifetime coverage with sum assured payable on death at any age."
    },
    {
      id: 9,
      // section: "Savings Insurance",
      question: "Which is a savings-oriented policy that also provides protection?",
      options: [
        "a) Term Assurance",
        "b) Endowment Assurance",
        "c) Annuity",
        "d) Rider"
      ],
      correctAnswer: "b) Endowment Assurance",
      explanation: "Endowment Assurance combines savings (maturity benefit) with life protection (death benefit)."
    },
    {
      id: 10,
      // section: "With-Profit Mechanism",
      question: "What do with-profit policies depend on for bonus declarations?",
      options: [
        "a) The insurer's investment performance and financial results",
        "b) The age of the policyholder",
        "c) Government subsidies",
        "d) Market interest rates only"
      ],
      correctAnswer: "a) The insurer's investment performance and financial results",
      explanation: "Bonus declarations depend on the insurer's actual investment returns and overall profitability."
    },
    {
      id: 11,
      // section: "Valuation Purpose",
      question: "The main purpose of actuarial valuation of life insurance products is to:",
      options: [
        "a) Decide how much profit the insurer makes each year",
        "b) Ensure that reserves are adequate to meet future policyholder benefits",
        "c) Calculate sales targets for agents",
        "d) Set government tax rates"
      ],
      correctAnswer: "b) Ensure that reserves are adequate to meet future policyholder benefits",
      explanation: "Valuation ensures sufficient reserves are held to meet all future benefit obligations to policyholders."
    },
    {
      id: 12,
      // section: "Expected Present Value",
      question: "In valuation, the Expected Present Value (EPV) of future cashflows refers to:",
      options: [
        "a) Historical claims experience",
        "b) The probability-weighted value of all future premiums and benefits discounted to today",
        "c) Only the future premiums expected from policyholders",
        "d) Only the future claims without discounting"
      ],
      correctAnswer: "b) The probability-weighted value of all future premiums and benefits discounted to today",
      explanation: "EPV accounts for probabilities of future events and time value of money through discounting."
    },
    {
      id: 13,
      // section: "Present Value Calculation",
      question: "A policy pays a maturity benefit of KES 1,000,000 in 10 years. The risk-free discount rate is 5% p.a. What is the present value of this benefit?",
      options: [
        "a) KES 613,913",
        "b) KES 700,000",
        "c) KES 950,000",
        "d) KES 1,000,000"
      ],
      correctAnswer: "a) KES 613,913",
      explanation: "PV = 1,000,000 / (1.05)^10 = KES 613,913. Discounting reflects time value of money."
    },
    {
      id: 14,
      // section: "Contractual Service Margin",
      question: "Which of the following best describes the Contractual Service Margin (CSM)?",
      options: [
        "a) The insurer's solvency ratio",
        "b) The unearned profit that will be recognized as the insurer provides future services",
        "c) The reinsurer's profit share",
        "d) The policyholder's bonus allocation"
      ],
      correctAnswer: "b) The unearned profit that will be recognized as the insurer provides future services",
      explanation: "CSM represents unearned profit recognized over the coverage period as services are provided."
    },
    {
      id: 15,
      // section: "Risk Adjustment",
      question: "The Risk Adjustment (RA) in life insurance valuation represents:",
      options: [
        "a) An allowance for investment risk",
        "b) The profit margin for shareholders",
        "c) The compensation for bearing uncertainty in non-financial risks",
        "d) A regulatory penalty"
      ],
      correctAnswer: "c) The compensation for bearing uncertainty in non-financial risks",
      explanation: "RA compensates the insurer for bearing uncertainty about the amount and timing of cash flows."
    },
    {
      id: 16,
      // section: "Risk Adjustment Components",
      question: "Which of the following risks would typically be included in the Risk Adjustment for life insurance?",
      options: [
        "a) Mortality and morbidity risks",
        "b) Equity market fluctuations",
        "c) Foreign exchange movements",
        "d) Policyholder bonuses"
      ],
      correctAnswer: "a) Mortality and morbidity risks",
      explanation: "RA typically covers insurance risks like mortality, morbidity, and lapse uncertainty."
    },
    {
      id: 17,
      // section: "Discounting Rationale",
      question: "Why is discounting used in life insurance valuation?",
      options: [
        "a) To reduce the value of reserves artificially",
        "b) To reflect the time value of money",
        "c) To simplify calculations",
        "d) To comply with tax requirements"
      ],
      correctAnswer: "b) To reflect the time value of money",
      explanation: "Discounting accounts for the fact that money received in the future is worth less than money today."
    },
    {
      id: 18,
      // section: "Best Estimate Assumptions",
      question: "Why do actuaries use best estimate assumptions in valuation?",
      options: [
        "a) To minimize regulatory scrutiny",
        "b) To reflect a realistic view of expected future experience",
        "c) To increase profitability",
        "d) To simplify accounting"
      ],
      correctAnswer: "b) To reflect a realistic view of expected future experience",
      explanation: "Best estimate assumptions represent the actuary's unbiased expectation of future experience."
    },
    {
      id: 19,
      // section: "LRC Components",
      question: "Which of the following best describes the interaction of the 3 components of LRC?",
      options: [
        "a) LRC = Fulfilment Cashflows + CSM + Risk Adjustment",
        "b) LRC = Fulfilment Cashflows – CSM – Risk Adjustment",
        "c) LRC = Premiums – Benefits – Expenses",
        "d) LRC = Incurred Claims + Outstanding Claims"
      ],
      correctAnswer: "a) LRC = Fulfilment Cashflows + CSM + Risk Adjustment",
      explanation: "LRC comprises fulfillment cashflows (PV of future cashflows) plus CSM plus Risk Adjustment."
    },
    {
      id: 20,
      // section: "Loss Recognition",
      question: "If at initial recognition, the LRC is insufficient to cover expected future cashflows, what happens?",
      options: [
        "a) Create a Contractual Service Margin (CSM)",
        "b) Recognise a loss component in LRC",
        "c) Increase the Risk Adjustment",
        "d) Defer to next reporting period"
      ],
      correctAnswer: "b) Recognise a loss component in LRC",
      explanation: "When expected cash outflows exceed inflows at initial recognition, a loss component is recognized immediately."
    }
  ]
};
