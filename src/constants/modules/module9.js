export const module9Data = {
  id: 9,
  title: "ESG",
  description: "The Environment Social Governance (ESG) module provides an overview of ESG principles, their importance in the business world, and how to integrate ESG considerations into decision-making processes. This module covers key ESG factors, reporting frameworks, and best practices for sustainable business operations.",
  themeColor: "green",
  
  objectives: {
    text: [
      "The primary objective of this manual is to transition an ESG Analyst from a foundational understanding of ESG to effective day-to-day execution within both Kenbright's internal operations and client-facing advisory engagements. It serves as a practical guide that bridges ESG theory with real-world application, ensuring that the analyst understands not only what ESG is, but how ESG work is performed, delivered, and measured in a professional services environment.",
    ]
  },

  learningOutcomes: {
    text: "By the end of this manual, the analyst will be equipped to handle the practical, cross-functional, and output-driven responsibilities of the role. Specifically, the analyst will be able to:",
    points: [
      "Independently support ESG reporting, risk assessment, stakeholder engagement, and advisory assignments in alignment with global standards such as the Global Reporting Initiative (GRI) and IFRS S1 & S2",
      "Collect, validate, structure, analyze, and visualize ESG data—including tracking Scope 1 and Scope 2 carbon emissions—to inform risk evaluation, support compliance, and drive strategic decision-making.",
      "Conduct structured ESG risk and materiality assessments, facilitate stakeholder workshops, and adapt ESG principles effectively across core sectors like asset management, insurance, and professional services.",
    ],
  },

  courseContent: {
    description: "This course transitions ESG Analysts from theory to practical execution. Master data management, risk assessment, and compliance reporting to support internal operations and client-facing advisory engagements.",
    resources: [
      {
        title: "ESG Manual",
        url: "/Training Modules/Module 17_ESG/Course Content/ESG_Manual.pdf",
        filename: "ESG_Manual.pdf",
        icon: "📄"
      }
    ]
  },

  additionalResources: [
    {
      title: "ESG Guidelines for the Insurance Sector - SIGNED",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/ESG GUIDELINES FOR THE INSURANCE SECTOR-SIGNED.pdf",
      filename: "ESG GUIDELINES FOR THE INSURANCE SECTOR-SIGNED.pdf",
    },
    {
      title: "IFRS S1 & S2 Level 1 Study Guide",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/IFRS S1& S2 Level 1 Study Guide.pdf",
      filename: "IFRS S1 & S2 Level 1 Study Guide.pdf",
      downloadable: false,
    },
    {
      title: "ISSB - 2023 (IFRS S1 General Requirements for Disclosure of Sustainability Related Financial Information)",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/issb-2023-a-ifrs-s1-general-requirements-for-disclosure-of-sustainability-related-financial-information.pdf",
      filename: "issb-2023-a-ifrs-s1-general-requirements-for-disclosure-of-sustainability-related-financial-information.pdf",
    },
    {
      title: "ISSB - 2025 (IFRS S2 Climate-Related Disclosures)",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/issb-2025-a-ifrs-s2-climate-related-disclosures.pdf",
      filename: "issb-2025-a-ifrs-s2-climate-related-disclosures.pdf",
    },
    {
      title: "NSE - ESG Disclosures Guidance Manual",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/NSE-ESG-Disclosures-Guidance-Manual.pdf",
      filename: "NSE-ESG-Disclosures-Guidance-Manual.pdf",
    },
    {
      title: "SASB - Asset Management Standard",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/SASB - Asset Management Standard.pdf",
      filename: "SASB - Asset Management Standard.pdf",
    },
    {
      title: "SASB - Insurance Standard",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/SASB - Insurance Standard.pdf",
      filename: "SASB - Insurance Standard.pdf",
    },
    {
      title: "SASB - Professional Services Standard",
      type: "PDF",
      url: "/Training Modules/Module 17_ESG/Additional Resources/SASB - Professional Services Standard.pdf",
      filename: "SASB - Professional Services Standard.pdf",
    },
  ],

  aiQuizQuestions: [
    {
      id: "aq1",
      question: "Explain the difference between impact materiality (GRI) and financial materiality (IFRS S1/S2). How does double materiality bridge the two?",
      hint: "Consider who the primary audience is for each framework (e.g., broad stakeholders vs. investors) and what kind of impacts they focus on."
    },
    {
      id: "aq2",
      question: "Describe the process you would follow to collect, validate, and track a company's Scope 1 and Scope 2 greenhouse gas emissions.",
      hint: "Think about direct versus indirect emissions, data sources (e.g., utility bills, fuel receipts), and how this data informs risk evaluation."
    },
    {
      id: "aq3",
      question: "IFRS S1 is built on the established structure of the TCFD framework. What are the four core pillars of this framework?",
      hint: "The pillars cover how an organization is directed, its broader execution plan, how it identifies hazards, and how it tracks progress (Governance, Strategy...)."
    },
    {
      id: "aq4",
      question: "How do SASB standards tailor ESG disclosures across different sectors, such as Asset Management versus Professional Services?",
      hint: "Consider how the financially material issues differ between a firm that invests capital versus one that provides human-capital-driven advisory services."
    },
    {
      id: "aq5",
      question: "In the context of the GRI Standards, why is stakeholder inclusiveness a foundational concept, and how does it affect materiality assessment?",
      hint: "Reflect on how an organization decides which economic, environmental, and social impacts are significant enough to report based on external expectations."
    },
    {
      id: "aq6",
      question: "What are the primary climate-related risks and opportunities that organizations must disclose under IFRS S2?",
      hint: "Think about physical risks (e.g., extreme weather) and transition risks (e.g., policy changes, technological shifts) associated with climate change."
    }
  ],


  // ---------- Quiz Questions ----------
  
quizQuestions: [
    // Section 1: GRI Standards Foundation & Concepts
    {
      id: 1,
      // section: "GRI STANDARDS",
      question: "What is the primary purpose of the GRI Standards?",
      options: [
        "a) Financial reporting",
        "b) Sustainability impact reporting",
        "c) Tax reporting",
        "d) Risk auditing"
      ],
      correctAnswer: "b) Sustainability impact reporting",
      explanation: "According to the GRI Standards section, the primary purpose is sustainability impact reporting."
    },
    {
      id: 2,
      // section: "GRI STANDARDS",
      question: "Which GRI standard provides the foundation for reporting principles?",
      options: [
        "a) GRI 1",
        "b) GRI 2",
        "c) GRI 3",
        "d) GRI 101"
      ],
      correctAnswer: "a) GRI 1",
      explanation: "GRI 1 provides the foundation for reporting principles."
    },
    {
      id: 3,
      // section: "GRI STANDARDS",
      question: "Which concept requires organizations to report their most significant economic, environmental, and social impacts?",
      options: [
        "a) Materiality",
        "b) Relevance",
        "c) Consistency",
        "d) Completeness"
      ],
      correctAnswer: "a) Materiality",
      explanation: "Materiality is the concept requiring organizations to report their most significant impacts."
    },
    {
      id: 4,
      // section: "GRI STANDARDS",
      question: "Which GRI disclosure standard focuses on organizational profile and governance?",
      options: [
        "a) GRI 2",
        "b) GRI 201",
        "c) GRI 305",
        "d) GRI 403"
      ],
      correctAnswer: "a) GRI 2",
      explanation: "GRI 2 is the standard that focuses on organizational profile and governance."
    },
    {
      id: 5,
      // section: "GRI STANDARDS",
      question: "What does GRI refer to as impact materiality?",
      options: [
        "a) Issues affecting company profits",
        "b) Issues affecting financial valuation",
        "c) Organization's impacts on economy, environment, and society",
        "d) Issues affecting taxes"
      ],
      correctAnswer: "c) Organization's impacts on economy, environment, and society",
      explanation: "Impact materiality refers to the organization's impacts on the economy, environment, and society."
    },
    {
      id: 6,
      // section: "GRI STANDARDS",
      question: "Which principle requires reporting both positive and negative impacts?",
      options: [
        "a) Balance",
        "b) Accuracy",
        "c) Comparability",
        "d) Timeliness"
      ],
      correctAnswer: "a) Balance",
      explanation: "The balance principle ensures both positive and negative impacts are reported."
    },

    // Section 2: GRI Topic Specific Standards & Scopes
    {
      id: 7,
      // section: "GRI STANDARDS",
      question: "Which GRI topic standard addresses greenhouse gas emissions?",
      options: [
        "a) GRI 302",
        "b) GRI 305",
        "c) GRI 307",
        "d) GRI 401"
      ],
      correctAnswer: "b) GRI 305",
      explanation: "GRI 305 specifically addresses greenhouse gas emissions."
    },
    {
      id: 8,
      // section: "GRI STANDARDS",
      question: "What does GRI 3 primarily require organizations to disclose?",
      options: [
        "a) Material topics and their management",
        "b) Shareholder returns",
        "c) Audit procedures",
        "d) Tax obligations"
      ],
      correctAnswer: "a) Material topics and their management",
      explanation: "GRI 3 primarily requires organizations to disclose material topics and their management."
    },
    {
      id: 9,
      // section: "GRI STANDARDS",
      question: "Which GRI standard covers anti-corruption practices?",
      options: [
        "a) GRI 201",
        "b) GRI 205",
        "c) GRI 403",
        "d) GRI 414"
      ],
      correctAnswer: "b) GRI 205",
      explanation: "GRI 205 covers anti-corruption practices."
    },
    {
      id: 10,
      // section: "GRI STANDARDS",
      question: "Which of the following is a social topic standard?",
      options: [
        "a) GRI 305",
        "b) GRI 401",
        "c) GRI 302",
        "d) GRI 204"
      ],
      correctAnswer: "b) GRI 401",
      explanation: "GRI 401 falls under the social topic standards."
    },
    {
      id: 11,
      // section: "GRI STANDARDS",
      question: "GRI encourages organizations to report impacts across which scope?",
      options: [
        "a) Internal operations only",
        "b) Suppliers only",
        "c) Entire value chain",
        "d) Customers only"
      ],
      correctAnswer: "c) Entire value chain",
      explanation: "GRI encourages reporting impacts across the entire value chain."
    },
    {
      id: 12,
      // section: "GRI STANDARDS",
      question: "Which GRI standard addresses energy consumption?",
      options: [
        "a) GRI 302",
        "b) GRI 305",
        "c) GRI 403",
        "d) GRI 404"
      ],
      correctAnswer: "a) GRI 302",
      explanation: "GRI 302 addresses an organization's energy consumption."
    },

    // Section 3: Principles, Engagement, & Additional GRI Standards
    {
      id: 13,
      // section: "GRI STANDARDS",
      question: "The concept of stakeholder inclusiveness means:",
      options: [
        "a) Only investors are consulted",
        "b) Stakeholder expectations are considered in reporting",
        "c) Reports are confidential",
        "d) Reports are audited"
      ],
      correctAnswer: "b) Stakeholder expectations are considered in reporting",
      explanation: "Stakeholder inclusiveness means stakeholder expectations are factored into the reporting process."
    },
    {
      id: 14,
      // section: "GRI STANDARDS",
      question: "Which disclosure includes reporting governance structure?",
      options: [
        "a) GRI 2",
        "b) GRI 3",
        "c) GRI 205",
        "d) GRI 302"
      ],
      correctAnswer: "a) GRI 2",
      explanation: "GRI 2 includes the reporting of governance structures."
    },
    {
      id: 15,
      // section: "GRI STANDARDS",
      question: "What does comparability enable stakeholders to do?",
      options: [
        "a) Compare sustainability performance across organizations or time",
        "b) Measure profits",
        "c) Calculate taxes",
        "d) Conduct audits"
      ],
      correctAnswer: "a) Compare sustainability performance across organizations or time",
      explanation: "Comparability allows stakeholders to evaluate performance over time and against other entities."
    },
    {
      id: 16,
      // section: "GRI STANDARDS",
      question: "Which standard addresses occupational health and safety?",
      options: [
        "a) GRI 403",
        "b) GRI 404",
        "c) GRI 413",
        "d) GRI 414"
      ],
      correctAnswer: "a) GRI 403",
      explanation: "GRI 403 outlines occupational health and safety disclosures."
    },
    {
      id: 17,
      // section: "GRI STANDARDS",
      question: "GRI reporting primarily focuses on which type of materiality?",
      options: [
        "a) Financial materiality",
        "b) Double materiality",
        "c) Impact materiality",
        "d) Market materiality"
      ],
      correctAnswer: "c) Impact materiality",
      explanation: "GRI reporting primarily focuses on impact materiality."
    },
    {
      id: 18,
      // section: "GRI STANDARDS",
      question: "Which standard addresses training and education?",
      options: [
        "a) GRI 404",
        "b) GRI 401",
        "c) GRI 302",
        "d) GRI 305"
      ],
      correctAnswer: "a) GRI 404",
      explanation: "GRI 404 deals with topics related to training and education."
    },
    {
      id: 19,
      // section: "GRI STANDARDS",
      question: "Which environmental standard relates to water use?",
      options: [
        "a) GRI 303",
        "b) GRI 302",
        "c) GRI 304",
        "d) GRI 305"
      ],
      correctAnswer: "a) GRI 303",
      explanation: "GRI 303 is the standard that covers water use and interactions."
    },
    {
      id: 20,
      // section: "GRI STANDARDS",
      question: "Which principle ensures data is sufficiently detailed for stakeholders to understand impacts?",
      options: [
        "a) Clarity",
        "b) Balance",
        "c) Completeness",
        "d) Accuracy"
      ],
      correctAnswer: "c) Completeness",
      explanation: "The Completeness principle ensures sufficient detail is provided."
    },
    {
      id: 21,
      // section: "GRI STANDARDS",
      question: "What does accuracy require?",
      options: [
        "a) Approximate data",
        "b) Precise and reliable information",
        "c) Marketing narratives",
        "d) Unverified claims"
      ],
      correctAnswer: "b) Precise and reliable information",
      explanation: "Accuracy requires that the information reported is precise and reliable."
    },
    {
      id: 22,
      // section: "GRI STANDARDS",
      question: "Which standard addresses supplier environmental assessment?",
      options: [
        "a) GRI 308",
        "b) GRI 414",
        "c) GRI 302",
        "d) GRI 305"
      ],
      correctAnswer: "a) GRI 308",
      explanation: "GRI 308 specifically addresses supplier environmental assessments."
    },
    {
      id: 23,
      // section: "GRI STANDARDS",
      question: "What does timeliness ensure?",
      options: [
        "a) Reports are audited",
        "b) Information is available when stakeholders need it",
        "c) Reports are confidential",
        "d) Reports are summarized"
      ],
      correctAnswer: "b) Information is available when stakeholders need it",
      explanation: "Timeliness ensures that information is accessible to stakeholders precisely when they need it to make decisions."
    },
    {
      id: 24,
      // section: "GRI STANDARDS",
      question: "Which standard addresses community impacts?",
      options: [
        "a) GRI 413",
        "b) GRI 305",
        "c) GRI 302",
        "d) GRI 201"
      ],
      correctAnswer: "a) GRI 413",
      explanation: "GRI 413 addresses local community impacts."
    },
    {
      id: 25,
      // section: "GRI STANDARDS",
      question: "Stakeholder engagement primarily helps organizations identify:",
      options: [
        "a) Material topics",
        "b) Profit margins",
        "c) Tax rates",
        "d) Audit risks"
      ],
      correctAnswer: "a) Material topics",
      explanation: "Stakeholder engagement is a primary tool for organizations to identify their material topics."
    },
    {
      id: 26,
      // section: "GRI STANDARDS",
      question: "Which principle requires consistent methodologies over time?",
      options: [
        "a) Comparability",
        "b) Accuracy",
        "c) Balance",
        "d) Clarity"
      ],
      correctAnswer: "a) Comparability",
      explanation: "Comparability requires the use of consistent methodologies over time."
    },
    {
      id: 27,
      // section: "GRI STANDARDS",
      question: "GRI sustainability reports primarily communicate impacts to:",
      options: [
        "a) Regulators only",
        "b) Stakeholders broadly",
        "c) Internal auditors only",
        "d) Tax authorities"
      ],
      correctAnswer: "b) Stakeholders broadly",
      explanation: "GRI reports are meant to communicate impacts to a broad range of stakeholders."
    },

    // Section 4: IFRS S1 & S2 Disclosures
    {
      id: 28,
      // section: "IFRS S1 & S2",
      question: "What is the objective of IFRS S1?",
      options: [
        "a) General sustainability-related financial disclosures",
        "b) Tax reporting",
        "c) Accounting standards",
        "d) Audit controls"
      ],
      correctAnswer: "a) General sustainability-related financial disclosures",
      explanation: "The objective of IFRS S1 is to provide general sustainability-related financial disclosures."
    },
    {
      id: 29,
      // section: "IFRS S1 & S2",
      question: "IFRS S2 focuses specifically on:",
      options: [
        "a) Biodiversity",
        "b) Climate-related risks and opportunities",
        "c) Governance only",
        "d) Social impacts"
      ],
      correctAnswer: "b) Climate-related risks and opportunities",
      explanation: "IFRS S2 is specifically tailored for climate-related risks and opportunities."
    },
    {
      id: 30,
      // section: "IFRS S1 & S2",
      question: "IFRS S1 builds on the structure of which framework?",
      options: [
        "a) TCFD",
        "b) GAAP",
        "c) Basel III",
        "d) COSO"
      ],
      correctAnswer: "a) TCFD",
      explanation: "IFRS S1 builds upon the established structure of the TCFD framework."
    }
  ]
};
