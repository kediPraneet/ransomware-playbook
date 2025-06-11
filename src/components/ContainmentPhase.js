import { motion } from "framer-motion";
import { useState } from "react";

const ContainmentPhase = ({ goToRecoveryPhase, resetToC1 }) => {
  const prioritySteps = [
    "Step C1: Disconnect the infected/encrypted PC or server from the network by unplugging Ethernet cables or disabling Wi-Fi. DO NOT SHUTDOWN THE ENCRYPTED/INFECTED SYSTEMS.",
    "Step C2: Ensure the system is completely isolated from the local network by disabling network interfaces.",
    "Step C5: Block the identified Subnet IPs from other subnets. If entire infra is infected, block entire incoming and outgoing traffic in firewall.",
    "Step C6: Update firewall, proxy to latest version and patch them. Update the firewall, IDS/IPS rules, Proxy, EDR to block IP addresses, domains, hashes, and URLs known to be associated with the ransomware shared by InfoSec team.",
    "Step C8: Create and enforce security policy in EDR to detect, quarantine, block, and isolate the system and to limit the ransomware spread. EDR policy blocking must include process name, exe, filename, file path, hash, IP, domain, username. Not limited to this as per the IOC and IOA update this policy.",
    null,
    "Step C12: Isolate infected cloud instances using instance tags to prevent accidental deletion or reboot.",
    "Step C15: Track and revalidate all containment steps to ensure complete containment is in place.",
    "Step C16: Make a list of assets infected/encrypted and share with the Security Incident Manager as new asset information is added. The list should have Device IP, Name, OS Name, OS version, and Region.",
    "Step C18: Create a Recovery plan based on Business impact and if additional IT resource support is required, notify the Incident Steering Board (ISB).",
    "Step C19: Share all the list of IOCs, IOA (IP, domain, hash, file name file path) to IT team.",
    "Step C23: Ensure the system connectivity and take a forensic image of the infected system's hard drive and memory once approved by Security Incident Manager.",
    "Step C25: Analyze the forensic image and collected logs to identify the root cause, data loss, infection depth, and affected radius.",
    "Step C26: Share eradication and cleaning steps with the IT team and Security Incident Manager based on the outcome of the analysis."
  ];

  const [visibleSteps, setVisibleSteps] = useState(1);

  const revealNextStep = () => {
    if (visibleSteps < prioritySteps.length) {
      setVisibleSteps(visibleSteps + 1);
    }
  };

  // Custom rendering for Step C10
  const renderStep = (step, index) => {
    if (index === 5) {
      return (
        <li
          key={index}
          className="bg-gray-700 p-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
          onClick={revealNextStep}
        >
          Step C10: If Active Directory is infected, perform{' '}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              resetToC1 && resetToC1();
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
            Step C1
          </button>
          {' '}for containment and{' '}
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              goToRecoveryPhase && goToRecoveryPhase();
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
            Step R1
          </button>
          {' '}for Recovery.
        </li>
      );
    }
    if (step) {
      return (
        <li
          key={index}
          className="bg-gray-700 p-2 rounded-md cursor-pointer transition duration-300 ease-in-out hover:shadow-lg hover:scale-105"
          onClick={revealNextStep}
        >
          {step}
        </li>
      );
    }
    return null;
  };

  return (
    <motion.div
      className="p-6 bg-gray-800 text-white rounded-lg shadow-lg mt-6 w-full max-w-3xl"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-extrabold text-yellow-400 mb-4">Containment and Eradication Phase</h2>
      <ul className="list-disc list-inside space-y-2">
        {prioritySteps.slice(0, visibleSteps).map((step, index) => renderStep(step, index))}
      </ul>
    </motion.div>
  );
};

export default ContainmentPhase;
