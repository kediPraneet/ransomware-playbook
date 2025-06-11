import React from "react";
import { Handle } from "reactflow";

const DecisionNode = ({ data }) => {
  return (
    <div style={decisionNodeStyle}>
      {/* Handles at the exact corners */}
      <Handle
        type="target"
        id="top-left"
        style={{ left: "0px", top: "0px" }}
      />
      <Handle
        type="target"
        id="top-right"
        style={{ left: "155px", top: "-5px" }}
      />
      <Handle
        type="target"
        id="bottom-left"
        style={{ left: "0px", top: "155px" }}
      />
      <Handle
        type="source"
        id="bottom-right"
        style={{ left: "155px", top: "155px" }}
      />

      {/* Inner container with rotated text */}
      <div style={innerContainerStyle}>
        <div>{data.label}</div>
        <div style={buttonContainerStyle}>
          {/* Ensure onDecision exists before calling it */}
          <button style={yesButtonStyle} onClick={() => data.onDecision?.("yes")}>Yes</button>
          <button style={noButtonStyle} onClick={() => data.onDecision?.("no")}>No</button>
        </div>
      </div>
    </div>
  );
};

const decisionNodeStyle = {
  width: "160px",
  height: "160px",
  background: "linear-gradient(135deg, #FF8C00, #FF4500)", 
  color: "white",
  borderRadius: "12px", // Rounded corners for a professional look
  border: "3px solid white",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  position: "relative",
  transform: "rotate(45deg)", // Keeps the diamond shape
  boxShadow: "5px 5px 15px rgba(0,0,0,0.3)", // Soft shadow for depth
  transition: "all 0.3s ease-in-out",
};

const innerContainerStyle = {
  transform: "rotate(-45deg)", // Keep text upright
  textAlign: "center",
  fontWeight: "bold",
  color: "white",
  fontSize: "14px",
  width: "80%", // Adjusted for better alignment
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  marginTop: "10px",
};

const yesButtonStyle = {
  padding: "6px 14px",
  background: "#32CD32",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontWeight: "bold",
  borderRadius: "5px",
  fontSize: "12px",
  transition: "all 0.2s ease-in-out",
};

const noButtonStyle = {
  ...yesButtonStyle,
  background: "#DC143C", // Red for "No" button
};

export default DecisionNode;
