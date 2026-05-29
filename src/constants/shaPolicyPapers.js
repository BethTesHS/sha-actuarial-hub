import policy1Img from "../assets/policy1.jpg";
import policy2Img from "../assets/policy2.jpg";
import policy3Img from "../assets/policy3.jpg";
import policy4Img from "../assets/policy4.jpg";
import policy5Img from "../assets/policy5.jpg";
import policy6Img from "../assets/policy6.jpg";
import policy7Img from "../assets/policy7.jpg";
import policy8Img from "../assets/policy8.jpg";
import policy9Img from "../assets/policy9.jpg";
import policy10Img from "../assets/policy10.jpg";

/** Public URL for a file in /public/sha-policies */
export function getShaPolicyPdfUrl(filename) {
  return `/sha-policies/${encodeURIComponent(filename)}`;
}

export const shaPolicyPapers = [
  {
    title: "Acquisition Cashflows Policy Paper",
    filename: "SHA Acquisition Cashflows Policy Paper.pdf",
    img: policy1Img,
  },
  {
    title: "Insurance Modification and Extinguishment Policy Paper",
    filename: "SHA Insurance Modification and Extinguishment Policy Paper.pdf",
    img: policy2Img,
  },
  {
    title: "Discounting Policy Paper",
    filename: "Social Health Authority - Discounting Policy Paper.pdf",
    img: policy3Img,
  },
  {
    title: "Level of Aggregation Policy Paper",
    filename: "Social Health Authority - Level of Aggregation Policy Paper.pdf",
    img: policy4Img,
  },
  {
    title: "Initial Recognition & Contract Boundary Policy Paper",
    filename: "Social Health Authority (SHA)_ Initial Recognition & Contract Boundary Policy Paper.pdf",
    img: policy5Img,
  },
  {
    title: "Scope Policy Paper",
    filename: "Social Health Authority (SHA)_Scope Policy Paper.pdf",
    img: policy6Img,
  },
  {
    title: "Risk Adjustment Policy Paper",
    filename: "Social Health Authority Risk Adjustment Policy Paper.pdf",
    img: policy7Img,
  },
  {
    title: "PAA Eligibility Policy Paper",
    filename: "Social Health Authority(SHA)_ PAA Eligibility Policy Paper.pdf",
    img: policy8Img,
  },
  {
    title: "Initial and Subsequent Measurement Policy Paper",
    filename: "Social Health Authority(SHA)_Initial and Subsequent Measurement Policy Paper.pdf",
    img: policy9Img,
  },
  {
    title: "Transition Policy Paper",
    filename: "Social Health Authority_Transition Policy Paper.pdf",
    img: policy10Img,
  },
].map((paper) => ({
  ...paper,
  url: getShaPolicyPdfUrl(paper.filename),
}));
