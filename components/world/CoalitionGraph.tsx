'use client';

import { useState } from 'react';
import { FACTIONS } from '@/lib/data/factions';

// Node positions — arranged in coalition clusters
const NODES: Record<string, { x: number; y: number; r: number }> = {
  // Coalition A (Pro-Deployment) — top-left cluster
  f1: { x: 150, y: 120, r: 28 },  // Center, largest
  f7: { x: 80, y: 190, r: 20 },
  f5: { x: 220, y: 190, r: 20 },  // Swing — dashed circle
  f8: { x: 150, y: 240, r: 20 },  // Conditional — dashed connection

  // Coalition B (Domestic Opposition) — bottom-left cluster
  f4: { x: 100, y: 350, r: 22 },
  f6: { x: 180, y: 380, r: 20 },
  f9: { x: 60, y: 410, r: 18 },   // Partial member

  // Coalition C (Global Governance) — right cluster
  f2: { x: 420, y: 200, r: 22 },
  f10: { x: 500, y: 260, r: 20 },

  // Orphan
  f3: { x: 450, y: 390, r: 18 },
};

// Solid alliance lines
const SOLID_EDGES: [string, string][] = [
  ['f1', 'f7'],
  ['f1', 'f5'],
  ['f4', 'f6'],
  ['f4', 'f9'],
  ['f6', 'f9'],
  ['f2', 'f10'],
];

// Dashed / fracture lines
const DASHED_EDGES: [string, string][] = [
  ['f1', 'f8'],
  ['f5', 'f8'],
];

interface CoalitionGraphProps {
  onNodeClick?: (factionId: string) => void;
  onEdgeClick?: (f1: string, f2: string) => void;
}

export default function CoalitionGraph({ onNodeClick, onEdgeClick }: CoalitionGraphProps) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<string | null>(null);

  function getFaction(id: string) {
    return FACTIONS.find((f) => f.id === id);
  }

  return (
    <svg viewBox="0 0 600 460" className="w-full" style={{ maxWidth: 600 }}>
      {/* Background */}
      <rect width="600" height="460" fill="#07090F" rx="12" />

      {/* Coalition region labels */}
      <text x="145" y="60" textAnchor="middle" className="font-mono" fill="#4A5570" fontSize="9" letterSpacing="0.15em">
        PRO-DEPLOYMENT
      </text>
      <text x="120" y="310" textAnchor="middle" className="font-mono" fill="#4A5570" fontSize="9" letterSpacing="0.15em">
        DOMESTIC OPPOSITION
      </text>
      <text x="460" y="155" textAnchor="middle" className="font-mono" fill="#4A5570" fontSize="9" letterSpacing="0.15em">
        GLOBAL GOVERNANCE
      </text>
      <text x="450" y="435" textAnchor="middle" className="font-mono" fill="#4A5570" fontSize="9" letterSpacing="0.15em">
        ORPHAN
      </text>

      {/* Solid alliance lines */}
      {SOLID_EDGES.map(([a, b]) => {
        const na = NODES[a];
        const nb = NODES[b];
        const key = `${a}-${b}`;
        return (
          <line
            key={key}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={hoveredEdge === key ? '#C9A84C' : '#C9A84C66'}
            strokeWidth={2.5}
            className="cursor-pointer transition-all duration-150"
            onMouseEnter={() => setHoveredEdge(key)}
            onMouseLeave={() => setHoveredEdge(null)}
            onClick={() => onEdgeClick?.(a, b)}
          />
        );
      })}

      {/* Dashed fracture lines */}
      {DASHED_EDGES.map(([a, b]) => {
        const na = NODES[a];
        const nb = NODES[b];
        const key = `${a}-${b}`;
        return (
          <line
            key={key}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={hoveredEdge === key ? '#F87171' : '#F8717166'}
            strokeWidth={1.5}
            strokeDasharray="4 3"
            className="cursor-pointer transition-all duration-150"
            onMouseEnter={() => setHoveredEdge(key)}
            onMouseLeave={() => setHoveredEdge(null)}
            onClick={() => onEdgeClick?.(a, b)}
          />
        );
      })}

      {/* Nodes */}
      {Object.entries(NODES).map(([id, node]) => {
        const faction = getFaction(id);
        if (!faction) return null;
        const isSwing = id === 'f5' || id === 'f8';
        const isHovered = hoveredNode === id;
        const scale = isHovered ? 1.1 : 1;

        return (
          <g
            key={id}
            className="cursor-pointer"
            onMouseEnter={() => setHoveredNode(id)}
            onMouseLeave={() => setHoveredNode(null)}
            onClick={() => onNodeClick?.(id)}
            transform={`translate(${node.x}, ${node.y}) scale(${scale})`}
            style={{ transformOrigin: `${node.x}px ${node.y}px`, transition: 'transform 0.15s ease' }}
          >
            {/* Swing indicator dashed circle */}
            {isSwing && (
              <circle
                r={node.r + 6}
                fill="none"
                stroke={faction.color}
                strokeWidth={1}
                strokeDasharray="3 3"
                opacity={0.5}
              />
            )}

            {/* Main circle */}
            <circle
              r={node.r}
              fill={`${faction.color}22`}
              stroke={faction.color}
              strokeWidth={isHovered ? 2.5 : 1.5}
            />

            {/* Code label */}
            <text
              textAnchor="middle"
              dominantBaseline="central"
              fill={faction.color}
              fontSize={node.r > 22 ? 11 : 9}
              fontWeight="bold"
              fontFamily="monospace"
            >
              {faction.code}
            </text>
          </g>
        );
      })}

      {/* Hover tooltip for node */}
      {hoveredNode && (() => {
        const faction = getFaction(hoveredNode);
        const node = NODES[hoveredNode];
        if (!faction || !node) return null;
        return (
          <g>
            <rect
              x={node.x + node.r + 8}
              y={node.y - 18}
              width={Math.max(faction.name.length * 6, 100)}
              height={28}
              rx={4}
              fill="#111820"
              stroke="#1A2535"
            />
            <text
              x={node.x + node.r + 14}
              y={node.y - 2}
              fill="#E6DDD0"
              fontSize="10"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {faction.name}
            </text>
          </g>
        );
      })()}
    </svg>
  );
}
