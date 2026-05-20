// src/QASReports.jsx
import React, { useState } from "react";
import { FaFilePdf, FaSearch, FaRegFileAlt } from "react-icons/fa";

// Import 10 unique images for each policy
import policy1Img from "./assets/policy1.jpg";
import policy2Img from "./assets/policy2.jpg";
import policy3Img from "./assets/policy3.jpg";
import policy4Img from "./assets/policy4.jpg";
import policy5Img from "./assets/policy5.jpg";
import policy6Img from "./assets/policy6.jpg";
import policy7Img from "./assets/policy7.jpg";
import policy8Img from "./assets/policy8.jpg";
import policy9Img from "./assets/policy9.jpg";
import policy10Img from "./assets/policy10.jpg";
import policy11Img from "./assets/policy11.jpg";

export default function QASReports() {
  const [searchTerm, setSearchTerm] = useState("");

  const policies = [
    {
      title: "KAFS Actuarial Work Review Policy 2025",
      description:
        "Framework for reviewing actuarial work to ensure accuracy, objectivity, and compliance with professional standards. Includes peer-review, sign-off processes, and documentation requirements.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Actuarial%20Work%20Review%20Policy_2025.pdf",
      img: policy1Img,
    },
    {
      title: "KAFS Code of Conduct Policy 2025",
      description:
        "Outlines the ethical principles, professional standards, and behaviors expected from all KAFS employees and associates.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Code%20of%20Conduct%20Policy_2025.pdf",
      img: policy2Img,
    },
    {
      title: "KAFS Complaints Handling Policy 2025",
      description:
        "Details the procedures for receiving, managing, and resolving complaints efficiently, fairly, and transparently.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Complaints%20Handling%20Policy_2025.pdf",
      img: policy3Img,
    },
    {
      title: "KAFS Conflict of Interest Policy 2025",
      description:
        "Guidelines for identifying, reporting, and managing potential conflicts of interest to maintain integrity and objectivity in all engagements.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Conflict%20of%20Interest%20Policy_2025.pdf",
      img: policy4Img, 
    },
    {
      title: "KAFS Data Management Policy 2025",
      description:
        "Establishes the rules and best practices for creating, storing, accessing, and archiving business and client data securely.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Data%20Management%20Policy_2025.pdf",
      img: policy5Img, 
    },
    {
      title: "KAFS Data Protection Policy 2025",
      description:
        "Explains how KAFS safeguards personal and sensitive data in compliance with Kenya’s Data Protection Act (2019) and global standards.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Data%20Protection%20Policy_2025.pdf",
      img: policy6Img, 
    },
    {
      title: "KAFS Engagement and Communication Policy 2025",
      description:
        "Framework for effective, professional, and consistent communication with internal and external stakeholders.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Engagement%20and%20Communication%20Policy_2025.pdf",
      img: policy7Img, 
    },
    {
      title: "KAFS Quality Assurance Policy 2025",
      description:
        "Defines the overall quality management system, ensuring all deliverables meet the highest standards of excellence.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Quality%20Assurance%20Policy_2025.pdf",
      img: policy8Img, 
    },
    {
      title: "KAFS Speaking Up Policy 2025",
      description:
        "Provides a safe, confidential mechanism for reporting unethical behavior, malpractice, or non-compliance (Whistleblowing).",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Speaking%20Up%20Policy_2025.pdf",
      img: policy9Img, 
    },
    {
      title: "KAFS Training and Development Policy 2025",
      description:
        "Emphasizes continuous learning, mentorship, and skills enhancement to support employee professional growth and performance.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20Training%20and%20Development%20Policy_2025.pdf",
      img: policy10Img, 
    },
    {
      title: "KAFS Study policy",
      description:
        "Outlines the procedures and guidelines for conducting academic and professional studies within the KAFS framework.",
      file: "https://kenbright-my.sharepoint.com/personal/lakello_kenbright_africa/Documents/Microsoft%20Teams%20Chat%20Files/KAFS%20-%20Actuarial%20Study%20Policy_2025.pdf",
      img: policy11Img, 
    }
  ];

  // Filter policies based on the search term
  const filteredPolicies = policies.filter(
    (policy) =>
      policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans px-6 pt-24 pb-16 transition-colors duration-300">
      {/* Hero / Intro */}
      <div className="max-w-[1400px] mx-auto mb-16 pt-4 px-2 md:px-0">
        <div className="inline-block mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-left text-purple-700 dark:text-purple-300 mb-3">
            QAS Reports & Policies
          </h1>
          {/* very thin subtle underline */}
          <div className="w-full h-[2px] bg-[#00E5FF] rounded-full" />
        </div>

        <div className="flex flex-col gap-8">
          <p className="text-lg md:text-md text-gray-700 dark:text-gray-300 leading-relaxed text-left">
            Explore our key policies and reports that guide actuarial work, data
            protection, and professional development at KAFS. They are part of
            our{" "}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              Quality Assurance Scheme (QAS)
            </span>{" "}
            and ensure <span className="text-purple-600 dark:text-purple-400">high standards</span>,{" "}
            <span className="text-purple-600 dark:text-purple-400">compliance</span>, and{" "}
            <span className="text-purple-600 dark:text-purple-400">continuous improvement</span>.
          </p>

          {/* Full-width Search Bar */}
          <div className="relative w-full">
            <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search policies by title or keyword..."
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 rounded-full py-4 pl-14 pr-6 focus:outline-none focus:border-[#00E5FF] focus:ring-1 focus:ring-[#00E5FF] transition-all shadow-md dark:shadow-lg text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Interactive Policy Tiles - 5 columns on extra large screens */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy, index) => (
            <div
              key={index}
              className="relative flex flex-col group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700/50 hover:border-[#00E5FF]/60 hover:shadow-[0_8px_30px_rgb(0,229,255,0.15)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Policy Image with Overlays */}
              <div className="relative h-44 w-full overflow-hidden shrink-0 bg-gray-100 dark:bg-gray-900">
                <img
                  src={policy.img}
                  alt={policy.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 dark:opacity-60 dark:group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/60 to-white dark:via-gray-900/60 dark:to-gray-900 border-b border-gray-100 dark:border-gray-800 transition-colors duration-300"></div>
                
                {/* Always visible title positioned at the bottom of the image area */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-start gap-2 leading-tight group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors duration-300">
                    <FaRegFileAlt className="text-[#00E5FF] mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-3 drop-shadow-sm dark:drop-shadow-none">{policy.title}</span>
                  </h2>
                </div>
              </div>

              {/* Description and Download Button Container */}
              <div className="p-5 flex flex-col flex-grow justify-between bg-white dark:bg-gray-800 transition-colors duration-300">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-4 group-hover:text-gray-900 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {policy.description}
                </p>

                <a
                  href={policy.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700/50 hover:bg-purple-600 dark:hover:bg-purple-600/80 text-gray-700 dark:text-gray-200 hover:text-white font-medium transition-all duration-300 border border-transparent hover:border-purple-500 text-sm"
                >
                  <FaFilePdf className="text-red-500 dark:text-red-400 group-hover:text-white transition-colors" />
                  View PDF
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center text-gray-500 dark:text-gray-400 bg-gray-100/50 dark:bg-gray-800/50 rounded-2xl border border-gray-300 dark:border-gray-700 border-dashed">
            <p className="text-xl">No policies found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-4 text-[#00E5FF] hover:text-purple-600 dark:hover:text-purple-300 hover:underline transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}