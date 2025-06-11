import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import PreparationPhase from "./PreparationPhase";
import DetectionPhase from "./DetectionPhase";
import ContainmentPhase from "./ContainmentPhase";
import RecoveryPhase from "./RecoveryPhase";
import LessonsLearnedPhase from "./LessonLearnedPhase";

const phases = [
  "Preparation",
  "Detection and Analysis",
  "Containment and Eradication",
  "Recovery",
  "Lessons Learned"
];

export default function RansomwareSOP() {
  const [activePhase, setActivePhase] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [containmentResetKey, setContainmentResetKey] = useState(0);

  const resetToC1 = () => {
    // This will force ContainmentPhase to re-mount and reset its state
    setContainmentResetKey(prev => prev + 1);
    setActivePhase("Containment and Eradication");
  };

  return (
    <div className={`min-h-screen flex flex-col items-center transition-all duration-500 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      
      {/* Header */}
      <motion.header
        className="bg-gray-900 text-center py-10 relative overflow-hidden w-full"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-yellow-300 opacity-20 blur-3xl" />
        <h1 className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
          Ransomware SOP
        </h1>
      </motion.header>

      {/* Toggle Theme Button */}
      <button 
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-6 right-6 px-4 py-2 rounded-lg bg-yellow-300 hover:bg-yellow-400 transition-all duration-300 shadow-lg flex items-center"
      >
        {darkMode ? <Sun className="w-5 h-5 mr-2" /> : <Moon className="w-5 h-5 mr-2" />} Toggle Theme
      </button>

      {/* Phase Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-10">
        {phases.map((phase, index) => (
          <motion.button
            key={index}
            className="p-6 rounded-lg text-center font-semibold shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg bg-gradient-to-r from-blue-200 to-yellow-200 text-gray-900"
            whileTap={{ scale: 0.95 }}
            onClick={() => setActivePhase(phase)}
          >
            {phase}
          </motion.button>
        ))}
      </div>

      {/* Render Flowchart Component Dynamically */}
      <div className="w-full max-w-4xl mt-10">
        {activePhase === "Preparation" && <PreparationPhase />}
        {activePhase === "Detection and Analysis" && <DetectionPhase />}
        {activePhase === "Containment and Eradication" && (
          <ContainmentPhase
            key={containmentResetKey}
            goToRecoveryPhase={() => setActivePhase("Recovery")}
            resetToC1={resetToC1}
          />
        )}
        {activePhase === "Recovery" && <RecoveryPhase />}
        {activePhase === "Lessons Learned" && <LessonsLearnedPhase />}
      </div>
    </div>
  );
}
