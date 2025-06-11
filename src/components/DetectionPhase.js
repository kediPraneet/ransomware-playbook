import React, { useState } from "react";
import ReactFlow, { Controls, Background, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import DecisionNode from "./DecisionNode";

const nodeTypes = { decisionNode: DecisionNode };

const defaultNodeStyle = {
  background: "linear-gradient(135deg, #1e3a8a, #6dd5ed)",
  color: "white",
  borderRadius: "12px",
  padding: "15px",
  border: "2px solid #fff",
  fontWeight: "bold",
  textAlign: "center",
  boxShadow: "3px 3px 12px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease-in-out",
};


const allNodes = [
  { id: "1", position: { x: 400, y: 20 },   data:  { label: "1.Detection & Analysis - Potential Scope and Indicators" }, type: "input", style: defaultNodeStyle },
  { id: "A", position: { x: 400, y: 200 },  data: { label: "Is the Alert False Positive?" }, type: "decisionNode" },
  { id: "B", position: { x: 700, y: 400 },  data: { label: "Update Detection Rules" }, type: "default", style: defaultNodeStyle },
  { id: "C", position: { x: 700, y: 600 },  data: { label: "Record incident track changes towards closure" }, type: "output", style: defaultNodeStyle },
  { id: "2", position: { x: 200, y: 400 },  data: { label: "2. Key Stakeholders Informed" },type: "default", style: defaultNodeStyle  },
  { id: "3", position: { x: 200, y: 600 },  data: { label: "3. Contact EY IR Team" }, type: "default", style: defaultNodeStyle },
  { id: "D", position: { x: 200, y: 800 },  data: { label: "Key Contacts" }, type: "default", style: defaultNodeStyle },
  { id: "a", position: { x: 100, y: 1000 }, data: { label: "Nalayini G      -   +91 9482139967" }, type: "output", style: defaultNodeStyle },
  { id: "b", position: { x: 300, y: 1000 }, data: { label: "Irshadh A Rasheed - +91 9940018120" }, type: "output", style: defaultNodeStyle },
  { id: "c", position: { x: 500, y: 1000 }, data: { label: "Tiffy Isaac     -   +91 9902677442" }, type: "output", style: defaultNodeStyle },
  { id: "4", position: { x: 800, y: 1000 }, data: { label: "4. Setup Teams Bridge Call" }, type: "default", style: defaultNodeStyle },
  { id: "5", position: { x: 800, y: 1200 }, data: { label: "5. Incident Detail walkthrough" }, type: "default", style: defaultNodeStyle },
  { id: "6", position: { x: 800, y: 1400 }, data: { label: "6. War Room invoked" }, type: "default", style: defaultNodeStyle },
  { id: "7", position: { x: 800, y: 1600 }, data: { label: "7. Timely Update on Process to Microland Management" }, type: "output", style: defaultNodeStyle },
];

const allEdges = [
  { id: "e1-A", source: "1", target: "A", animated: true, type: "straight", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "eA-B", source: "A", target: "B",label:"Yes", animated: true, type: "step", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "eB-C", source: "B", target: "C", animated: true, type: "straight", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "eA-2", source: "A", target: "2",label:"No", animated: true, type: "step", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e2-3", source: "2", target: "3", type: "straight", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e4-5", source: "4", target: "5", type: "step", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e5-6", source: "5", target: "6", animated: true, type: "straight", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e6-7", source: "6", target: "7", animated: true, type: "straight", markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "e3-D", source: "3", target: "D", type: "step", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "eD-a", source: "D", target: "a", type: "step", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "eD-b", source: "D", target: "b", type: "step", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "eD-c", source: "D", target: "c", type: "step", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
  { id: "eD-4", source: "D", target: "4", type: "step", animated: true, markerEnd: { type: MarkerType.ArrowClosed } },

];

const DetectionPhase = () => {
  const [nodes, setNodes] = useState([{ ...allNodes[0], data: { ...allNodes[0].data, onDecision: () => {} } }]);
  const [edges, setEdges] = useState([]);

  const handleDecision = (nodeId, decision) => {
    const nextNodes = allNodes.filter(n =>
      allEdges.some(e => e.source === nodeId && e.target === n.id && e.label?.toLowerCase() === decision)
    );
    const nextEdges = allEdges.filter(e => e.source === nodeId && e.label?.toLowerCase() === decision);
    setNodes(prevNodes => [...prevNodes, ...nextNodes]);
    setEdges(prevEdges => [...prevEdges, ...nextEdges]);
  };

  const handleNodeClick = (event, node) => {
    if (node.type !== "decisionNode") {
      const newNodes = allNodes.filter(n => allEdges.some(e => e.source === node.id && e.target === n.id));
      const newEdges = allEdges.filter(e => e.source === node.id);
      setNodes(prevNodes => [...prevNodes, ...newNodes]);
      setEdges(prevEdges => [...prevEdges, ...newEdges]);
      return;
    }
    setNodes(prevNodes =>
      prevNodes.map(n =>
        n.id === node.id
          ? { ...n, data: { ...n.data, onDecision: (decision) => handleDecision(node.id, decision) } }
          : n
      )
    );
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#1f2937", minHeight: "100vh", color: "white" }}>
      <h2 className="text-2xl font-bold mb-4" style={{ color: "white" }}>Detection Phase Flowchart</h2>
      <p>Click on a box to reveal the next steps.</p>
      <div style={{ height: "80vh", width: "100%", background: "#1f2937", borderRadius: "10px", padding: "10px" }}>
        <ReactFlow nodes={nodes} edges={edges} onNodeClick={handleNodeClick} nodeTypes={nodeTypes} fitView>
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <button 
        onClick={() => setNodes([allNodes[0]]) && setEdges([])} 
        style={{
          marginTop: "20px",
          padding: "12px 24px",
          fontSize: "16px",
          background: "#FFD700",
          color: "black",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
          fontWeight: "bold",
          transition: "all 0.3s ease-in-out"
        }}
      >
        🔄 Restart Flowchart
      </button>
    </div>
  );
};

export default DetectionPhase;
