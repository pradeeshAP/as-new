// Photography sourced from Pexels (free license, pexels.com/license).
// Not client screenshots — representative imagery for visual sections only.

import heroImageSrc from "../assets/Hero/hero-image.png";

import solutionMicroservicesImg from "../assets/Our solutions/Micro services and management.png";
import solutionCloudImg from "../assets/Our solutions/cloud enablement and devops.png";
import solutionAiImg from "../assets/Our solutions/AI intelligent and automation.png";
import solutionDataImg from "../assets/Our solutions/Data and analytics.png";
import solutionApiImg from "../assets/Our solutions/API management.png";
import solutionDigitalImg from "../assets/Our solutions/Digital Experience.png";
import solutionSecurityImg from "../assets/Our solutions/Security and compliance.png";
import solutionLegacyImg from "../assets/Our solutions/Legacy Modernization.png";

import industryHealthcareImg from "../assets/Cards/Health care.png";
import industryFinanceImg from "../assets/Cards/finance.png";
import industryEducationImg from "../assets/Cards/Education.png";
import industryRetailImg from "../assets/Cards/Retail & E-Commerce.png";
import industryManufacturingImg from "../assets/Cards/Manufacturing.png";
import industryLogisticsImg from "../assets/Cards/Logistics.png";
import industryRealEstateImg from "../assets/Cards/Real estate-.png";
import industryNgoImg from "../assets/Cards/Ngo.png";
import industryEnterpriseImg from "../assets/Cards/Enterprise.png";

import workReclinersImg from "../assets/Selected work/Recliners.png";
import workInfraImg from "../assets/Selected work/Infra.png";
import workENetworkImg from "../assets/Selected work/E-Network.png";
import workExportImg from "../assets/Selected work/export.png";

import whyChooseUsImg from "../assets/Why choose us/why choose us.png";

const pexels = (id: string, ext: "jpeg" | "png" = "jpeg") =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.${ext}?auto=compress&cs=tinysrgb&w=1600`;

export const heroImage = {
  src: heroImageSrc,
  alt: "Software engineer working across dual monitors in a modern studio",
};

export const solutionImages = [
  { src: solutionMicroservicesImg, alt: "Microservices & event-driven systems" },
  { src: solutionCloudImg, alt: "Cloud enablement & DevOps" },
  { src: solutionAiImg, alt: "AI & intelligent automation" },
  { src: solutionDataImg, alt: "Data & analytics" },
  { src: solutionApiImg, alt: "API management & integration" },
  { src: solutionDigitalImg, alt: "Digital experience & platforms" },
  { src: solutionSecurityImg, alt: "Security & compliance" },
  { src: solutionLegacyImg, alt: "Legacy modernization" },
];

export const selectedWorkImages = [
  { src: workReclinersImg, alt: "Throne Recliners" },
  { src: workInfraImg, alt: "Vidharth Infra" },
  { src: workENetworkImg, alt: "E-Network" },
  { src: workExportImg, alt: "Elshadai Exports" },
];

export const industryImages: Record<string, { src: string; alt: string }> = {
  Healthcare: { src: industryHealthcareImg, alt: "Healthcare" },
  "Finance & FinTech": { src: industryFinanceImg, alt: "Finance & FinTech" },
  "Education & EdTech": { src: industryEducationImg, alt: "Education & EdTech" },
  "Retail & E-commerce": { src: industryRetailImg, alt: "Retail & E-commerce" },
  Manufacturing: { src: industryManufacturingImg, alt: "Manufacturing" },
  "Logistics & Supply Chain": { src: industryLogisticsImg, alt: "Logistics & Supply Chain" },
  "Real Estate": { src: industryRealEstateImg, alt: "Real Estate" },
  "Non-profit / NGO": { src: industryNgoImg, alt: "Non-profit / NGO" },
  "Enterprise Solutions": { src: industryEnterpriseImg, alt: "Enterprise Solutions" },
};

export const globeImage = {
  src: pexels("30596209"),
  alt: "Earth at night from space showing city lights",
};

export const whyChooseUsImage = {
  src: whyChooseUsImg,
  alt: "Why choose Ascending Software",
};
