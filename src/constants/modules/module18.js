export const module18Data = {
  id: 18,
  title: "BUSINESS DEVELOPMENT TRAINING",
  shortDescription: "This module provides practical training on Business Development and Tendering for actuarial professionals.",
  themeColor: "purple",

  tabs: ["overview", "course"],
  disableQuiz: true,
  disableAssignments: true,
  disableProgress: true,
  hideProgress: true,

  objectives: {
    text: [
      "This module aims to equip learners with practical knowledge in Business Development and Tendering. By the end of the module, participants will understand what tendering entails and key terminology used in practice, identify the main tender document types and their contents, apply bid/no-bid considerations to select the right opportunities, and follow the end-to-end tender process and the roles involved.",
    ],
  },

  learningOutcomes: {
    text: "By the end of this module, participants will be able to:",
    points: [
      "Explain what tendering is and how it is used to procure goods and services.",
      "Differentiate between RFT, RFP, EOI, RFI, and RFQ, and describe when each is used.",
      "Describe the typical structure and contents of tender documents, including scope, evaluation, and contract terms.",
      "Outline the end-to-end tender process from opportunity sourcing to submission and follow-up.",
      "Clarify the roles and responsibilities of the bid manager, supervisor, and analysts in preparing competitive submissions.",
    ],
  },

  courseContent: {
    type: "slides",
    description:
      "Business Development Training deck",
    slides: [
      {
        id: "p1",
        title: "BUSINESS DEVELOPMENT TRAINING",
        subtitle: "ACTUARIAL ADVISORY\nVersion 2025",
        layout: "hero",
        bg: "orange",
      },
      {
        id: "p2",
        title: "WHAT TENDERING ENTAILS",
        subtitle: "The Types of Processes",
        layout: "sections",
        bg: "indigo",
        sectionGlowBullets: true,
        // sections: [
        //   {
        //     heading: "Tendering Process",
        //     lines: [
        //       "Organizations in need of services invite other parties to submit a proposal or bid to provide these services.",
        //       "This invitation is commonly referred to as a Request for Tender (RFT), Request for Proposal (RFP), Call for Expression of Interest.",
        //       "Tendering is the process of making an offer through a bid or a proposal or expression of interest in response to the invitation or request to tender.",
        //       "The tender is the document submitted in response to the RFT – essentially an offer to supply the services the buyer requires.",
        //     ],
        //   },
        //   {
        //     heading: "Business Process",
        //     lines: [
        //       "Business process is a collection / set of linked tasks / act which find their end in the delivery of a service or a product to a client / organization and once completed will accomplish an organization’s goals.",
        //     ],
        //   },
        // ],
        panels: [
          {
            panelLabel: "Tendering Process",
            sections: [
              {
                heading: "Tendering Process",
                lines: [
                  "Organization in need of service invite other parties to submit a proposal or bid to provide these services.",
                  "This invitation is commonly referred to as a Request for Tender (RFT), Request for Proposal (RFP), Call for Expression of Interest.",
                  "Tendering is the process of making an offer through a bid or a proposal or expression of interest in response to the invitation or request to tender.",
                  "The tender is the document submitted in response to the RFT – essentially an offer to supply the services the buyer requires.",
                ],
              },
            ],
          },
          {
            panelLabel: "Business Process",
            sections: [
              {
                heading: "Business Process",
                lines: [
                  "Business process is a collection / set of linked tasks / act which find their end in the delivery of a service or a product to a client / organization and once completed will accomplish an organization’s goals.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "p3",
        title: "Bid or No Bid?",
        subtitle: "Bid Participation Factors",
        layout: "bullets",
        bg: "slate",
        bullets: [
          "Intelligence available on the bid- Consider availability of information, internal or external, beyond what is provided in the RFP document, email or call.",
          "Areas of expertise – Consider understanding if the bid is in line with our area of practice or can be practiced",
          "Experience – Undertake judgement to ascertain our experience in the specific area of bid meets the requirements",
          "Bid Requirements – Ensure we meet all mandatory requirements of the bidding firm, or we can attain them before bid submission period.",
          "NB : The most common reason for lack of success is poor choice of tender opportunity",
        ],
        // panels: [
        //   {
        //     panelLabel: "Factors",
        //     bullets: [
        //       "Intelligence available on the bid- Consider availability of information, internal or external, beyond what is provided in the RFP document, email or call.",
        //       "Areas of expertise – Consider understanding if the bid is in line with our area of practice or can be practiced",
        //       "Experience – Undertake judgement to ascertain our experience in the specific area of bid meets the requirements",
        //       "Bid Requirements – Ensure we meet all mandatory requirements of the bidding firm, or we can attain them before bid submission period.",
        //       "NB : The most common reason for lack of success is poor choice of tender opportunity",
        //     ],
        //   },
        // {
        //   panelLabel: "Requirements",
        //   bullets: [
        //     "Bid Requirements – Ensure we meet all mandatory requirements of the bidding firm, or we can attain them before bid submission period.",
        //     "NB : The most common reason for lack of success is poor choice of tender opportunity",
        //   ],
        // },
        // ],
      },
      {
        id: "p4",
        title: "BIDDING OBJECTIVES",
        subtitle: "Why Do We Bid?",
        layout: "bullets",
        bg: "emerald",
        // bullets: [
        //   "Gain Competitive Intelligence – Helps to understand market pricing, client expectations and competitor strategies",
        //   "To grow revenue – tendering in lucrative",
        //   "To expand Actuarial business by building long term relationships with users of actuarial work",
        //   "To expand Actuarial work experience beyond traditional boundaries",
        //   "Expand Market Presence – Helps the firm enter new markets or sectors",
        //   "Demonstrate Value Preposition- Presents a chance to clearly articulate how the firm adds value",
        // ],
        panels: [
          {
            panelLabel: "The Objectives",
            bullets: [
              "Gain Competitive Intelligence – Helps to understand market pricing, client expectations and competitor strategies",
              "To grow revenue – tendering in lucrative",
              "To expand Actuarial business by building long term relationships with users of actuarial work",
              "To expand Actuarial work experience beyond traditional boundaries",
              "Expand Market Presence – Helps the firm enter new markets or sectors",
              "Demonstrate Value Preposition- Presents a chance to clearly articulate how the firm adds value",
            ],
          },
          {
            panelLabel: "How To Achieve",
            bullets: [
              "Designing and writing proposals or tenders, complete with the competitive pricing and submitting completed bids to existing or prospective client, on time and within budget.",
              "Ensuring that all the client’s needs/questions have been answered as fully as possible, and that we have given ourself the best possible chance of success.",
              "Before submission of tenders a meeting/call should be held to undertake an internal evaluation of score achievable and what can be added.",
            ],
          },
        ],
      },
      // {
      //   id: "p5",
      //   title: "BIDDING OBJECTIVES",
      //   subtitle: "Continued",
      //   layout: "sections",
      //   bg: "amber",
      //   sections: [
      //     {
      //       heading: "",
      //       lines: [
      //         "Designing and writing proposals or tenders, complete with the competitive pricing and submitting completed bids to existing or prospective client, on time and within budget.",
      //         "This can be achieved through:",
      //         "i. Designing and writing proposals or tenders, complete with the competitive pricing and submitting completed bids to existing or prospective client, on time and within budget.",
      //         "ii. Ensuring that all the client’s needs/questions have been answered as fully as possible, and that we have given ourself the best possible chance of success.",
      //         "iii. Before submission of tenders a meeting/call should be held to undertake an internal evaluation of score achievable and what can be added.",
      //       ],
      //     },
      //   ],
      //   panels: [
      //     {
      //       panelLabel: "Overview",
      //       sections: [
      //         {
      //           heading: "",
      //           lines: [
      //             "Designing and writing proposals or tenders, complete with the competitive pricing and submitting completed bids to existing or prospective client, on time and within budget.",
      //             "This can be achieved through:",
      //           ],
      //         },
      //       ],
      //     },
      //     {
      //       panelLabel: "How we achieve it",
      //       sections: [
      //         {
      //           heading: "",
      //           lines: [
      //             "i. Designing and writing proposals or tenders, complete with the competitive pricing and submitting completed bids to existing or prospective client, on time and within budget.",
      //             "ii. Ensuring that all the client’s needs/questions have been answered as fully as possible, and that we have given ourself the best possible chance of success.",
      //             "iii. Before submission of tenders a meeting/call should be held to undertake an internal evaluation of score achievable and what can be added.",
      //           ],
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        id: "p5",
        title: "TENDER TYPES",
        subtitle: "",
        layout: "boxes",
        boxesStacked: true,
        bg: "orange",
        boxes: [
          {
            title: "OPEN TENDERING",
            lines: [
              "• Open to the general public by a public advert through public procurement sites, own firm website or newspapers.",
            ],
          },
          {
            title: "SELECT TENDERING",
            lines: [
              "• Only open to select number of suppliers, most often close business associates or prequalified firms.",
            ],
          },
          {
            title: "MULTISTAGE TENDERING",
            lines: [
              "• There are large number of respondents and suppliers are at each stage evaluated, with the best suited being maintained.",
            ],
          },
        ],
        // panels: [
        //   {
        //     panelLabel: "Open",
        //     boxes: [
        //       {
        //         title: "OPEN TENDERING",
        //         lines: [
        //           "• Open to the general public by a public advert through public procurement sites, own firm website or newspapers.",
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     panelLabel: "Select",
        //     boxes: [
        //       {
        //         title: "SELECT TENDERING",
        //         lines: [
        //           "• Only open to select number of suppliers, most often close business associates or prequalified firms.",
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     panelLabel: "Multistage",
        //     boxes: [
        //       {
        //         title: "MULTISTAGE TENDERING",
        //         lines: [
        //           "• There are large number of respondents and suppliers are at each stage evaluated, with the best suited being maintained.",
        //         ],
        //       },
        //     ],
        //   },
        // ],
      },
      {
        id: "p6",
        title: "What Form Can A Tender Be",
        subtitle: "",
        layout: "sections",
        bg: "slate",
        sections: [
          {
            lines: ["The types of Tender can be the following:"],
          },
          {
            glowLines: true,
            lines: [
              "Expression of Interest (EOI)",
              "Request for Proposal (RFP)",
              "Request for Tender (RFT)",
              "Request for Information (RFI)",
              "Request for quotation or quote (RFQ)",
            ],
          },
        ],
      },
      {
        id: "p7",
        title: "What Form Can A Tender Be",
        subtitle: "What Form Can A Tender Be",
        layout: "sections",
        bg: "slate",
        sections: [
          {
            heading:
              "Request for Proposal (RFP) / Request for Tender (RFT) / Request for Information (RFI)",
            lines: [
              "These documents typically include documents outlining the following:",
            ],
            glowLineItems: [
              "Conditions of tender – rules of the tendering process and response.",
              "Form of tender – schedules and details suppliers need to include in their response.",
              "Scope of tender – details of the good/services the buyer requires.",
              "Evaluation criteria – specifics of how the buyer will assess responses.",
              "Conditions of contract – particulars of the legal contract to be awarded to the successful supplier.",
            ],
          },
        ],
        // panels: [
        //   {
        //     panelLabel: "RFP / RFT / RFI (i–iii)",
        //     sections: [
        //       {
        //         heading:
        //           "Request for Proposal (RFP) / Request for Tender (RFT) / Request for Information (RFI)",
        //         lines: [
        //           "These documents typically include documents outlining the following:",
        //           "i. Conditions of tender – rules of the tendering process and response.",
        //           "ii. Form of tender – schedules and details suppliers need to include in their response.",
        //           "iii. Scope of tender – details of the good/services the buyer requires.",
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     panelLabel: "RFP / RFT / RFI (iv–v)",
        //     sections: [
        //       {
        //         heading:
        //           "Request for Proposal (RFP) / Request for Tender (RFT) / Request for Information (RFI)",
        //         lines: [
        //           "iv. Evaluation criteria – specifics of how the buyer will assess responses.",
        //           "v. Conditions of contract – particulars of the legal contract to be awarded to the successful supplier.",
        //         ],
        //       },
        //     ],
        //   },
        // ],
      },
      {
        id: "p8",
        title: "What Form Can A Tender Be?",
        subtitle: "Continued…",
        layout: "sections",
        bg: "indigo",
        sections: [
          {
            lines: [
              "A Call for Expression of Interest (EOI) is a document creating an opportunity for bidders to present themselves in a clear, professional document. It is an opportunity to provide important information and to demonstrate suitability, interest, availability in relation to the position.",
            ],
          },
          {
            lines: [
              "EOI’s typically include documents outlining the following:",
            ],
            glowLineItems: [
              "Request for bidder information – eligibility, qualification, registration & experience.",
              "Form of EOI – schedules and details suppliers need to include in their response.",
              "Scope of work – details of the services the buyer requires.",
            ],
          },
        ],
        // panels: [
        //   {
        //     panelLabel: "EOI overview",
        //     sections: [
        //       {
        //         heading: "What Form Can A Tender Be?",
        //         lines: [
        //           "A Call for Expression of Interest (EOI) is a document creating an opportunity for bidders to present themselves in a clear, professional document. It is an opportunity to provide important information and to demonstrate suitability, interest, availability in relation to the position.",
        //           "EOI’s typically include documents outlining the following:",
        //         ],
        //       },
        //     ],
        //   },
        //   {
        //     panelLabel: "EOI documents",
        //     sections: [
        //       {
        //         heading: "What Form Can A Tender Be?",
        //         lines: [
        //           "i. Request for bidder information – eligibility, qualification, registration & experience.",
        //           "ii. Form of EOI – schedules and details suppliers need to include in their response.",
        //           "iii. Scope of work – details of the services the buyer requires.",
        //           "Continued…",
        //         ],
        //       },
        //     ],
        //   },
        // ],
      },
      {
        id: "p9",
        title: "What Form Can A Tender Be?",
        subtitle: "Continued…",
        layout: "bullets",
        bg: "blue",
        bullets: [
          "A request for quotation or quote (RFQ) is a document that details a buyer’s requirements and asks vendors to respond with pricing and payment terms.",
          "An RFQ is different from an RFP because it focuses almost exclusively on the cost of a specific item or items. RFQ decisions are made primarily based on price while RFPs may be more subjective and consider a number of factors to select the right vendor.",
          "RFQ may also mean request for qualifications.",
        ],
        // panels: [
        //   {
        //     panelLabel: "What is an RFQ?",
        //     bullets: [
        //       "A request for quotation or quote (RFQ) is a document that details a buyer’s requirements and asks vendors to respond with pricing and payment terms.",
        //     ],
        //   },
        //   {
        //     panelLabel: "RFQ vs RFP",
        //     bullets: [
        //       "An RFQ is different from an RFP because it focuses almost exclusively on the cost of a specific item or items. RFQ decisions are made primarily based on price while RFPs may be more subjective and consider a number of factors to select the right vendor.",
        //       "RFQ may also mean request for qualifications.",
        //     ],
        //   },
        // ],
      },
      {
        id: "p10",
        title: "What Form Can A Tender Be?",
        subtitle: "There are 4 Types of RFQs",
        layout: "sections",
        bg: "slate",
        // sections: [
        //   {
        //     heading: "There are 4 Types of RFQs",
        //   },
        //   {
        //     heading: "i. Open bid",
        //     lines: [
        //       "An open bid is when responses are visible to all qualified vendors. Bids are opened during the submission period allowing vendors to see one another’s pricing. Suppliers can alter and update submitted bids until the bid deadline.",
        //     ],
        //   },
        //   {
        //     heading: "ii. Sealed Bid",
        //     lines: [
        //       "A sealed bid is when an RFQ is open to all qualified bidders, but the responses are opened only after the submission deadline has passed. Sealed bids are common in public and government procurement projects.",
        //     ],
        //   },
        //   {
        //     heading: "iii. Invited bid",
        //     lines: [
        //       "An invited bid is when only specific vendors receive the RFQ. They are used with both open and sealed bids.",
        //     ],
        //   },
        //   {
        //     heading: "iv. Reverse auction",
        //     lines: [
        //       "A reverse auction asks vendors to supply their lowest offer and the cost decreases as the auction goes on. The reverse auction may be used as a secondary step if an RFQ is issued, but no vendor meets the price target.",
        //     ],
        //   },
        // ],
        panels: [
          {
            panelLabel: "4 Types of RFQs",
            sections: [
              // {
              //   heading: "There are 4 Types of RFQs",
              // },
              {
                heading: "i. Open bid",
                lines: [
                  "An open bid is when responses are visible to all qualified vendors. Bids are opened during the submission period allowing vendors to see one another’s pricing. Suppliers can alter and update submitted bids until the bid deadline.",
                ],
              },
              {
                heading: "ii. Sealed Bid",
                lines: [
                  "A sealed bid is when an RFQ is open to all qualified bidders, but the responses are opened only after the submission deadline has passed. Sealed bids are common in public and government procurement projects.",
                ],
              },
            ],
          },
          {
            panelLabel: "4 Types of RFQs",
            sections: [
              {
                heading: "iii. Invited bid",
                lines: [
                  "An invited bid is when only specific vendors receive the RFQ. They are used with both open and sealed bids.",
                ],
              },
              {
                heading: "iv. Reverse auction",
                lines: [
                  "A reverse auction asks vendors to supply their lowest offer and the cost decreases as the auction goes on. The reverse auction may be used as a secondary step if an RFQ is issued, but no vendor meets the price target.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "p11",
        title: "What Form Can A Tender Be?",
        subtitle: "Reverse Auction",
        layout: "sections",
        bg: "indigo",
        sections: [
          {
            heading: "iv. Reverse auction",
            lines: [
              "This is the role of one analyst who oversees the delivery of the entire process.",
            ],
            glowLineItems: [
              "Identifies bid opportunities.",
              "Seeks approval to proceed with the bid.",
              "Document preparation.",
              "Collation of mandatory requirements.",
              "Bid intelligence sourcing.",
              "Approval of bid opportunities.",
              "Bid technical matters advisement.",
              "Provide the technical expertise needed in every tender through peer-to-peer review.",
              "Fees quotations approval.",
            ],
          },
        ],
      },
      {
        id: "p12",
        title: "Roles And Responsibilities",
        subtitle: "Bid Manager · Supervisor · Analysts",
        layout: "sections",
        bg: "orange",
        // sections: [
        //   {
        //     heading: "Bid Manager",
        //     lines: [
        //       "This is the role of one analyst who oversees the delivery of the entire process.",
        //     ],
        //     glowLineItems: [
        //       "Identifies bid opportunities.",
        //       "Seeks approval to proceed with the bid.",
        //       "Document preparation.",
        //       "Collation of mandatory requirements.",
        //       "Bid intelligence sourcing.",
        //     ],
        //   },
        //   {
        //     heading: "Supervisor",
        //     glowLineItems: [
        //       "Approval of bid opportunities.",
        //       "Bid technical matters advisement.",
        //       "Fees quotations approval.",
        //     ],
        //   },
        //   {
        //     heading: "Analysts",
        //     glowLineItems: [
        //       "Provide the technical expertise needed in every tender through peer-to-peer review.",
        //     ],
        //   },
        // ],
        panels: [
          {
            panelLabel: "Bid Manager",
            sections: [
              {
                heading: "Bid Manager",
                lines: [
                  "This is the role of one analyst who oversees the delivery of the entire process.",
                ],
                glowLineItems: [
                  "Identifies bid opportunities.",
                  "Seeks approval to proceed with the bid.",
                  "Document preparation.",
                  "Collation of mandatory requirements.",
                  "Bid intelligence sourcing.",
                ],
              },
            ],
          },
          {
            panelLabel: "Supervisor & Analysts",
            sections: [
              {
                heading: "Supervisor",
                glowLineItems: [
                  "Approval of bid opportunities.",
                  "Bid technical matters advisement.",
                  "Fees quotations approval.",
                ],
              },
              {
                heading: "Analysts",
                glowLineItems: [
                  "Provide the technical expertise needed in every tender through peer-to-peer review.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "p13",
        title: "Tender Process",
        subtitle: "",
        layout: "boxes",
        bg: "slate",
        boxesCols: 3,
        boxesEqual: true,
        boxesBigText: true,
        boxes: [
          { title: "Tender opportunity sourcing and approvals", lines: [] },
          { title: "Uploading bid material on SharePoint", lines: [] },
          { title: "Source for financial quotation intelligence", lines: [] },
          {
            title: "Compilation of proposal with required information",
            lines: [],
          },
          {
            title:
              "Proposal review by peer, supervisor & consultant/ directors",
            lines: [],
          },
          { title: "Tender submission & follow up", lines: [] },
        ],
      },
      {
        id: "p14",
        title: "Tender Process",
        subtitle:
          "The tender process follows the following procedure:",
        layout: "ordered",
        bg: "indigo",
        // ordered: [
        //   "Get a proposal request from newspaper/email/client discussions with the consultants/referrals/subscribed online sites.",
        //   "Get approval from management (done via the tender tracking tool/Sales Lead on SharePoint).",
        //   "The request is assigned to a team member and a peer reviewer is allocated as well.",
        //   "Person assigned reviews the tender documents and carries out a market intelligence on the proposal e.g. background on the entity, get a budget from the client.",
        //   "Discussion with the bid manager on areas that may not be clear (methodology & expertise).",
        //   "Save the proposal documents on the Tender’s SharePoint.",
        //   "Prepare the proposals as per the client’s requirements.",
        // ],
        panels: [
          {
            panelLabel: "Steps 1–4",
            orderedStartAt: 1,
            ordered: [
              "Get a proposal request from newspaper/email/client discussions with the consultants/referrals/subscribed online sites.",
              "Get approval from management (done via the tender tracking tool/Sales Lead on SharePoint).",
              "The request is assigned to a team member and a peer reviewer is allocated as well.",
              "Person assigned reviews the tender documents and carries out a market intelligence on the proposal e.g. background on the entity, get a budget from the client.",
            ],
          },
          {
            panelLabel: "Steps 5–9",
            orderedStartAt: 5,
            ordered: [
              "Discussion with the bid manager on areas that may not be clear (methodology & expertise).",
              "Save the proposal documents on the Tender’s SharePoint.",
              "Prepare the proposals as per the client’s requirements.",
              "Get required input form the consultant’s at least 2 days after receipt of tender request.",
              "Finalize on the proposal at least 6 days before submission.",
            ],
          },
          {
            panelLabel: "Steps 10–13",
            orderedStartAt: 10,
            ordered: [
              "Peer Reviewer to review at least 5 days before submission.",
              "Supervisor to review the proposal at least 4 days before submission and any review by the consultant/directors to be done 3 days before submission.",
              "Scan & bind (for hard copy submissions) the tender document 1 day before the tender closure date.",
              "Deliver the tender document & attend the tender opening.",
            ],
          },
        ],
      },
      {
        id: "p15",
        title: "Tender Process",
        subtitle: "Short Quotes Process",
        layout: "ordered",
        bg: "orange",
        // ordered: [
        //   "These are preapproved to always proceed with submission of proposals.",
        //   "1. Discussion with the Supervisor & bid manager on areas that may not be clear (methodology & expertise) – at least 10 minutes.",
        //   "2. Prepare the custom proposal document using available information and similar quotes templates.",
        //   "3. Consult on any matter arising. This includes:",
        //   "• Request for discounts by client,",
        //   "• Where special case pricing applies due to intelligence on the bid.",
        //   "4. Peer to peer review of the proposal.",
        //   "5. Submission of the proposal within 24 hours or within 2 days before the deadline as specified by client.",
        //   "6. Follow up on the proposal outcome within 2 weeks after submission.",
        // ],
        panels: [
          {
            panelLabel: "Setup & prep",
            orderedIntro:
              "These are preapproved to always proceed with submission of proposals.",
            orderedStartAt: 1,
            ordered: [
              "Discussion with the Supervisor & bid manager on areas that may not be clear (methodology & expertise) – at least 10 minutes.",
              "Prepare the custom proposal document using available information and similar quotes templates.",
            ],
          },
          {
            panelLabel: "Review & submit",
            orderedStartAt: 3,
            ordered: [
              "Consult on any matter arising. This includes:\n\t• Request for discounts by client,\n\t• Where special case pricing applies due to intelligence on the bid.",
              "Peer to peer review of the proposal.",
              "Submission of the proposal within 24 hours or within 2 days before the deadline as specified by client.",
              "Follow up on the proposal outcome within 2 weeks after submission.",
            ],
          },
        ],
      },
      {
        id: "p16",
        title: "Activity Time Schedule",
        subtitle: "Stage · Activity · Role & Responsibility · Timeline",
        layout: "table",
        bg: "indigo",
        // table: {
        //   columns: ["Stage", "Activity", "Role & Responsibility", "Timeline"],
        //   rows: [
        //     [
        //       "1",
        //       "Checking for Adverts",
        //       "Interns/Analyst/Bid Manager",
        //       "Daily",
        //     ],
        //     [
        //       "",
        //       "Tender approvals",
        //       "Supervisor",
        //       "24 hr after receipt of tender adverts",
        //     ],
        //     [
        //       "2",
        //       "Getting tender documents & saving",
        //       "Analyst",
        //       "Immediately upon approval",
        //     ],
        //     [
        //       "3",
        //       "Market Intelligence",
        //       "Bid Manager / Supervisor",
        //       "3 Days before submission",
        //     ],
        //     [
        //       "4",
        //       "Required input from the lead consultant",
        //       "Snr Analyst",
        //       "2 Days after receipt of tender documents",
        //     ],
        //     [
        //       "5",
        //       "Compilation of proposal",
        //       "Analysts",
        //       "5 Days before submission date",
        //     ],
        //     [
        //       "6",
        //       "Proposal Review",
        //       "Bid Manager / Snr Analyst",
        //       "4 Days before submission",
        //     ],
        //     ["7", "Proposal Review", "Supervisor", "3 Days before submission"],
        //     [
        //       "8",
        //       "Tender Submission",
        //       "Bid Manager",
        //       "2 Days before submission",
        //     ],
        //     [
        //       "9",
        //       "Tender Follow up",
        //       "Bid Manager/Intern",
        //       "2 weeks after submission",
        //     ],
        //   ],
        // },
        panels: [
          {
            panelLabel: "Stages 1–4",
            table: {
              columns: [
                "Stage",
                "Activity",
                "Role & Responsibility",
                "Timeline",
              ],
              rows: [
                [
                  "1",
                  "Checking for Adverts",
                  "Interns/Analyst/Bid Manager",
                  "Daily",
                ],
                [
                  "",
                  "Tender approvals",
                  "Supervisor",
                  "24 hr after receipt of tender adverts",
                ],
                [
                  "2",
                  "Getting tender documents & saving",
                  "Analyst",
                  "Immediately upon approval",
                ],
                [
                  "3",
                  "Market Intelligence",
                  "Bid Manager / Supervisor",
                  "3 Days before submission",
                ],
                [
                  "4",
                  "Required input from the lead consultant",
                  "Snr Analyst",
                  "2 Days after receipt of tender documents",
                ],
              ],
            },
          },
          {
            panelLabel: "Stages 5–9",
            table: {
              columns: [
                "Stage",
                "Activity",
                "Role & Responsibility",
                "Timeline",
              ],
              rows: [
                [
                  "5",
                  "Compilation of proposal",
                  "Analysts",
                  "5 Days before submission date",
                ],
                [
                  "6",
                  "Proposal Review",
                  "Bid Manager / Snr Analyst",
                  "4 Days before submission",
                ],
                [
                  "7",
                  "Proposal Review",
                  "Supervisor",
                  "3 Days before submission",
                ],
                [
                  "8",
                  "Tender Submission",
                  "Bid Manager",
                  "2 Days before submission",
                ],
                [
                  "9",
                  "Tender Follow up",
                  "Bid Manager/Intern",
                  "2 weeks after submission",
                ],
              ],
            },
          },
        ],
      },
      {
        id: "p17",
        title: "Key Submission Documents Checklist",
        layout: "checklist",
        bg: "slate",
        checklist: [
          "i. Valid licenses",
          "ii. Updated CV's best illustrating capability in the assignment",
          "iii. A spectacular executive summary",
          "iv. Quality assurance",
          "v. Experience best suit for the tender",
          "vi. Compliance with all tender requirements",
          "vii. Proposal design including format",
          "viii. Competitive pricing",
        ],
        // panels: [
        //   {
        //     panelLabel: "Items i–iv",
        //     checklist: [
        //       "i. Valid licenses",
        //       "ii. Updated CV's best illustrating capability in the assignment",
        //       "iii. A spectacular executive summary",
        //       "iv. Quality assurance",
        //     ],
        //   },
        //   {
        //     panelLabel: "Items v–viii",
        //     checklist: [
        //       "v. Experience best suit for the tender",
        //       "vi. Compliance with all tender requirements",
        //       "vii. Proposal design including format",
        //       "viii. Competitive pricing",
        //     ],
        //   },
        // ],
      },
      {
        id: "p18",
        title: "Document Version",
        subtitle: "",
        layout: "sections",
        bg: "orange",
        sections: [
          {
            heading: "",
            lines: [
              "September 2025",
              "Version 3.0",
              "Kenbright Actuarial & Financial Services Ltd",
              "ACK Garden House, Wing D, Ground Floor",
              "1st Ngong Avenue, Nairobi",
              "Kenya",
              "www.kenbright.co.ke",
              "Customer Service Lines: +254 709 783 000",
            ],
          },
        ],
      },
    ],
  },
};
