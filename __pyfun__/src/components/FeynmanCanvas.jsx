import React, { useState, useRef, useEffect, useCallback } from 'react';

const COLOR_MAP = {
  blue: { bg: '#1e3a5f', border: '#3b82f6', text: '#93c5fd' },
  yellow: { bg: '#4a3728', border: '#eab308', text: '#fde68a' },
  red: { bg: '#4a1c1c', border: '#ef4444', text: '#fca5a5' },
  green: { bg: '#1a3a2a', border: '#22c55e', text: '#86efac' },
};

function EntityNode({ entity, pos, onDrag }) {
  const c = COLOR_MAP[entity.color] || COLOR_MAP.blue;
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const origX = pos.x, origY = pos.y;
    const onMove = (ev) => onDrag(entity.id, { x: origX + ev.clientX - startX, y: origY + ev.clientY - startY });
    const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  };

  return (
    <div
      id={`node-${entity.id}`}
      onMouseDown={handleMouseDown}
      className="absolute select-none cursor-grab active:cursor-grabbing transition-shadow hover:shadow-xl z-20"
      style={{ left: pos.x, top: pos.y, borderColor: c.border, backgroundColor: c.bg, borderWidth: 2, borderRadius: 12, padding: '12px 18px', minWidth: 120 }}
    >
      <div className="text-sm font-bold mb-1" style={{ color: c.text }}>{entity.label}</div>
      {entity.value && <div className="text-xs font-mono opacity-80" style={{ color: c.text }}>{entity.value}</div>}
    </div>
  );
}

function calcPositions(entities) {
  const positions = {};
  const players = entities.filter(e => e.type === 'player' || e.type === 'scope');
  const objects = entities.filter(e => e.type === 'object' || (e.type === 'scope' && !players.includes(e)));

  // All player-types go on the left column, objects on the right
  const leftItems = entities.filter(e => e.type === 'player');
  const rightItems = entities.filter(e => e.type === 'object');
  const scopeItems = entities.filter(e => e.type === 'scope');

  let leftY = 40;
  leftItems.forEach(e => { positions[e.id] = { x: 40, y: leftY }; leftY += 100; });

  let rightY = 40;
  rightItems.forEach(e => { positions[e.id] = { x: 420, y: rightY }; rightY += 100; });

  // Scopes get stacked in the middle
  let scopeY = 40;
  scopeItems.forEach(e => {
    if (!positions[e.id]) { positions[e.id] = { x: 200, y: scopeY }; scopeY += 140; }
  });

  return positions;
}

export default function FeynmanCanvas({ sandbox }) {
  const [showAfter, setShowAfter] = useState(false);
  const [positions, setPositions] = useState({});
  const [svgSize, setSvgSize] = useState({ w: 600, h: 400 });
  const containerRef = useRef(null);

  const currentState = showAfter ? sandbox.after : sandbox.before;

  // Recalculate on toggle
  useEffect(() => {
    setPositions(calcPositions(currentState.entities));
  }, [showAfter]);

  // Track container size
  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(entries => {
      for (let e of entries) {
        setSvgSize({ w: e.contentRect.width, h: e.contentRect.height });
      }
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const handleDrag = useCallback((id, newPos) => {
    setPositions(prev => ({ ...prev, [id]: newPos }));
  }, []);

  // Compute line coordinates from positions (center of nodes)
  const getCenter = (id) => {
    const p = positions[id];
    if (!p) return { x: 0, y: 0 };
    return { x: p.x + 70, y: p.y + 30 };
  };

  return (
    <div className="bg-slate-950 border-2 border-slate-700 rounded-xl overflow-hidden flex flex-col">

      {/* HEADER BAR */}
      <div className="flex justify-between items-center px-5 py-3 bg-slate-900 border-b border-slate-800">
        <h4 className="text-google-blue font-bold tracking-widest uppercase text-xs flex items-center gap-2">
          <span>🧪</span> Visualization Magic
        </h4>

        {/* THE TOGGLE */}
        <div className="flex items-center gap-3">
          <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${!showAfter ? 'text-red-400' : 'text-slate-600'}`}>
            🐛 Buggy
          </span>
          <button
            onClick={() => setShowAfter(!showAfter)}
            className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${showAfter ? 'bg-google-green' : 'bg-red-500'}`}
          >
            <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-all ${showAfter ? 'left-7' : 'left-0.5'}`}></div>
          </button>
          <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${showAfter ? 'text-green-400' : 'text-slate-600'}`}>
            ✅ Fixed
          </span>
        </div>
      </div>

      {/* HINT */}
      <div className="px-5 py-2 text-slate-500 text-xs italic bg-slate-900/50 border-b border-slate-800">
        💡 {sandbox.hint} — Drag the nodes around to understand the connections!
      </div>

      {/* THE CANVAS */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: 350, backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      >
        {/* SVG LINES LAYER */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ width: svgSize.w, height: svgSize.h }}>
          <defs>
            <marker id="arrow-r" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#ef4444" /></marker>
            <marker id="arrow-g" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#22c55e" /></marker>
            <marker id="arrow-b" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto"><polygon points="0 0, 8 3, 0 6" fill="#3b82f6" /></marker>
          </defs>
          {currentState.links.map((link, i) => {
            const from = getCenter(link.from);
            const to = getCenter(link.to);
            const isBlocked = link.label.includes('❌');
            const isGood = link.label.includes('✅') || link.label.includes('locked');
            const color = isBlocked ? '#ef4444' : isGood ? '#22c55e' : '#3b82f6';
            const markerId = isBlocked ? 'arrow-r' : isGood ? 'arrow-g' : 'arrow-b';
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2 - 30;

            return (
              <g key={i}>
                <path
                  d={`M ${from.x} ${from.y} Q ${midX} ${midY}, ${to.x} ${to.y}`}
                  fill="none" stroke={color} strokeWidth={3}
                  strokeDasharray={isBlocked ? "8,5" : "none"}
                  markerEnd={`url(#${markerId})`}
                  style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
                />
                <text x={midX} y={midY - 6} textAnchor="middle" fill={color} fontSize="11" fontWeight="bold" fontFamily="monospace">{link.label}</text>
              </g>
            );
          })}
        </svg>

        {/* ENTITY NODES */}
        {currentState.entities.map(entity => (
          positions[entity.id] && <EntityNode key={entity.id} entity={entity} pos={positions[entity.id]} onDrag={handleDrag} />
        ))}
      </div>

      {/* CAPTION */}
      <div className={`px-5 py-4 text-sm font-medium border-t-2 transition-colors duration-300 ${showAfter ? 'bg-emerald-950 border-google-green text-emerald-200' : 'bg-red-950 border-red-500 text-red-200'}`}>
        {currentState.caption}
      </div>
    </div>
  );
}
