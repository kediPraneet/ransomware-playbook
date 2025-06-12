import { useState } from "react";
import { motion } from "framer-motion";

const RecoveryPhase = () => {
  const recoverySteps = [
    "Step R1: Enable the Blue LAN. Make sure the system is not connected to infected network during the restoration.",
    "Step R2: Enable and create the email accounts for the ISB team and business units in secondary email domain 'microland.net'. Security incident manager will share the list.",
    "Step R3: For critical users essential to business continuity whose endpoints are encrypted following a ransomware incident, the IT team will provide newly configured secondary endpoints with security load-sets post deploying EDR and run scan with no infection.",
    "Step R4: If back-up is not infected rebuild the critical servers (including AD) from N-3 back up, continue with Step R6.",
    "Step R5: If back-up is infected, rebuild the critical servers (including AD) from scratch. It is recommended to utilize an approved golden copy of the OS.",
    "Step R6: Request Infosec to initiate VA scanning. Wait for input from the Infosec team.",
    "Step R7: Post patching the servers, deploy trusted EDR tools and run comprehensive scans on all infected systems to detect and remove ransomware. If infection is found, follow Step R4.",
    "Step R8: Reconfigure the network appliance based on the recommendations.",
    "Step R9: Change passwords and credentials for all accounts (user, administrator, service, computer accounts) and reconfigure network and system settings.",
    "Step R10: IF AD is rebuilt, continue with these steps; if not, move to Step R11.",
    "Reset all LAPS Passwords.",
    "Reset permissions on AdminSDHolders object.",
    "Revoke and re-issue all certificates from ADCS.",
    "Step R11: Move the servers to live network.",
    "Step R12: Re-image rest of the user endpoints infected by ransomware and harden them with the organization's standard security load-sets, including EDR and DLP.",
    "Step R13: Review the actions taken during the Recovery phase and update the incident response tracker timely. Follow Step R4 for all remaining non-critical servers.",
    "Step R14: Once the network is clean and AD is rebuilt, enable email access to employees phase-wise as per the input from Security Incident Manager.",
    "Task or steps to be performed by Infosec team :",
    "Step R15: Initiate VA scanning. If vulnerabilities are found, request IT to patch.",
    "Step R16: Monitor the newly built system and network through the EDR and other log monitoring tools for any traces of threat."
  ];

  const [visibleSteps, setVisibleSteps] = useState(1);
  const [skipToStep11, setSkipToStep11] = useState(false);
  const [skipR5, setSkipR5] = useState(false);

  const revealNextStep = () => {
    if (visibleSteps < recoverySteps.length) {
      setVisibleSteps(visibleSteps + 1);
    }
  };

  const handleSkipToStep11 = () => {
    setSkipToStep11(true);
    setVisibleSteps(14); // Show Step R11 (index 13)
  };
  

  return (
    <motion.div
      className="p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-6 w-full max-w-3xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">Recovery Phase</h2>
      <ul className="list-disc list-inside space-y-2">
      {!skipToStep11 ? (
  (skipR5
    ? recoverySteps.filter((_, i) => i !== 4) // Remove R5 if skipping
    : recoverySteps
  )
    .slice(0, visibleSteps)
    .map((step, index, arr) => {
      // Special rendering for Step R4 (index 3 if not skipping, 3 if skipping)
      const realIndex = skipR5 ? (index >= 4 ? index + 1 : index) : index;
      if (realIndex === 3) {
        const before = step.split("Step R6")[0];
        const after = step.split("Step R6")[1];
        return (
          <li
            key={realIndex}
            className="bg-gray-700 p-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
            onClick={revealNextStep}
          >
            {before}
            <button
              type="button"
              onClick={e => {
                e.stopPropagation();
                setSkipR5(true);
                setVisibleSteps(6); // Show up to R6 (index 5)
              }}
              style={{
                background: '#2563eb',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                padding: '2px 10px',
                font: 'inherit',
                borderRadius: '4px',
                fontWeight: 'bold',
                margin: '0 2px',
                boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                textDecoration: 'none',
                outline: 'none',
              }}
              className="focus:outline-none"
            >
              Step R6
            </button>
            {after}
          </li>
        );
      }
      // Default rendering for all other steps
      return (
        <li
          key={realIndex}
          className="bg-gray-700 p-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
          onClick={revealNextStep}
        >
          {step}
          {realIndex === 9 && ( // Step R10
            <div className="mt-2">
              <button
                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setVisibleSteps(visibleSteps + 1);
                }}
              >
                Continue with next step
              </button>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSkipToStep11();
                }}
              >
                Skip to Step R11
              </button>
            </div>
          )}
        </li>
      );
    })
) : (
  recoverySteps.slice(13, visibleSteps).map((step, index) => (
    <li
      key={index + 13}
      className="bg-gray-700 p-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
      onClick={revealNextStep}
    >
      {step}
    </li>
  ))
)}

      </ul>
    </motion.div>
  );
};

export default RecoveryPhase;
