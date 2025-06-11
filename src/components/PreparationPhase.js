import { useState } from "react";
import { motion } from "framer-motion";

const PreparationPhase = () => {
  const preparationSteps = [
    "Step P1: Clearly define the roles and responsibilities of SOC team members. This ensures everyone understands their duties and can effectively collaborate during security incidents.",
    "Step P2: Identify and equip with necessary technologies and resources to detect security alerts in SOC.",
    "Step P3: Ensure all the critical devices, applications, and log sources are integrated and monitored.",
    "Step P4: Deploy the latest version of EDR on all servers and endpoints and ensure they are actively monitored.",
    "Step P5: Evaluate and validate the efficacy of threat detection use cases in both SIEM and EDR."
  ];

  const [visibleSteps, setVisibleSteps] = useState(1);

  const revealNextStep = () => {
    if (visibleSteps < preparationSteps.length) {
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
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">Preparation Phase</h2>
      <ul className="list-disc list-inside space-y-2">
        {preparationSteps.slice(0, visibleSteps).map((step, index) => (
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

export default PreparationPhase;
