export interface FAQItemData {
  id: string;
  number: string;
  question: string;
  answer: string[];
}

export const FAQS_DATA: FAQItemData[] = [
  {
    id: "faq-01",
    number: "01",
    question: "WHAT INDUSTRIES DO YOU SPECIALIZE IN?",
    answer: [
      "Armia Systems works with technology, fintech, healthcare, and enterprise teams. We focus on clarity, speed, and systems that scale.",
      "We prioritize clean architecture, fast delivery, and handoffs that make ongoing maintenance straightforward.",
    ],
  },
  {
    id: "faq-02",
    number: "02",
    question: "HOW DO YOU HANDLE PROJECT SCOPE CHANGES?",
    answer: [
      "Our agile delivery framework incorporates iterative milestone check-ins, allowing scope adjustments without stalling momentum.",
      "Any required pivot is documented with clear timeline and resource impacts before execution.",
    ],
  },
  {
    id: "faq-03",
    number: "03",
    question: "WHAT IS YOUR TYPICAL PROJECT TIMELINE?",
    answer: [
      "Timeline depends on complexity: rapid modernizations typically complete in 4 to 8 weeks, while full enterprise platforms range from 3 to 6 months.",
      "We provide granular roadmap commitments during our initial technical blueprinting phase.",
    ],
  },
  {
    id: "faq-04",
    number: "04",
    question: "DO YOU OFFER POST-LAUNCH SUPPORT?",
    answer: [
      "Yes. We offer 24/7 proactive infrastructure monitoring, security patch management, and dedicated SLA-backed engineering support packages.",
      "Our team seamlessly transitions into long-term system optimization and feature development.",
    ],
  },
  {
    id: "faq-05",
    number: "05",
    question: "HOW DO YOU ENSURE CODE QUALITY?",
    answer: [
      "We enforce automated CI/CD testing pipelines, peer code reviews, static security analysis, and strict adherence to architectural design patterns.",
      "Every release undergoes rigorous compliance and performance benchmarks prior to production deployment.",
    ],
  },
  {
    id: "faq-06",
    number: "06",
    question: "HOW DO WE START A PROJECT?",
    answer: [
      "Starting is seamless: book an initial architectural discovery call with our senior technical leads.",
      "We audit your current requirements and deliver a comprehensive proposal with transparent milestones within 48 hours.",
    ],
  },
];
