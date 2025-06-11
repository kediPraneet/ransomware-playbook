import { useState } from "react";
import { motion } from "framer-motion";

const LessonsLearnedPhase = () => {
  const lessonsLearnedSteps = [
    "Step LL1: Prepare the after-Incident Report to analyze the root cause post the disruption due to ransomware attack.",
    "- Description of the cyber incident and its impact on the services.",
    "- Time and date of the incident.",
    "- Root cause of the incident.",
    "- Recovery measures taken.",
    "- Deviation from the defined recovery strategies or plans if any.",
    "- Impact Assessment: Financial, Reputational, Customer Impact.",
    "- Legal and Regulatory Compliance.",
    "- Communication Strategy effectiveness.",
    "- Key lessons learned.",
    "- Retain evidence in line with legal requirements.",
    "- Retain evidence in line with company policy.",
    "Step LL2: Awareness Checklist.",
    "- Malware infection caused by guests, vendors, contractors, or third parties: communicate appropriate behavior, inform them about the infection, and advise them to upgrade their AV.",
    "- Add all events (initial trigger and discovered while analyzing) in the list of indicators/precursors.",
    "- If events were false positives: document IOC of the false positive and how to confirm that it’s the same false positive.",
    "- External information sharing.",
    "- Any identified shortcomings will be categorized into two sections: short-term and long-term recommendations.",
    "- Short-term recommendations should be addressed within a timeframe of 1-3 months, while long-term recommendations should be addressed within 6-12 months."
  ];

  const [visibleSteps, setVisibleSteps] = useState(1);

  const revealNextStep = () => {
    if (visibleSteps < lessonsLearnedSteps.length) {
      setVisibleSteps(visibleSteps + 1);
    }
  };

  return (
    <motion.div
      className="p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-6 w-full max-w-3xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">Lessons Learned Phase</h2>
      <ul className="list-disc list-inside space-y-2">
        {lessonsLearnedSteps.slice(0, visibleSteps).map((step, index) => (
          <li
            key={index}
            className="bg-gray-700 p-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
            onClick={revealNextStep}
          >
            {step}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default LessonsLearnedPhase;
