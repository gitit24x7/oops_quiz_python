import React, { useState } from 'react';

export default function TimelineSlider({ traceLog }) {
  const [step, setStep] = useState(0);
  const [inspectorActive, setInspectorActive] = useState(false);

  if (!traceLog || traceLog.length === 0) return null;

  const currentTrace = traceLog[step];
  
  // Calculate which Memory IDs are shared by multiple variables AT THIS STEP
  const idCounts = {};
  Object.values(currentTrace.locals).forEach(data => {
    idCounts[data.id] = (idCounts[data.id] || 0) + 1;
  });
  const sharedIds = new Set(Object.keys(idCounts).filter(id => idCounts[id] > 1));
  
  return (
    <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-6 mt-6 shadow-inner text-slate-300 font-mono animate-fade-in relative overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="relative z-10 flex justify-between items-center mb-6 border-b border-slate-700 pb-3">
        <h4 className="text-google-blue font-bold tracking-widest uppercase text-sm flex items-center">
          <span className="mr-2 text-xl">⏳</span> The Time-Weaver (Memory Timeline)
        </h4>
        <div className="flex gap-4 items-center">
          <button 
            onClick={() => setInspectorActive(!inspectorActive)}
            className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors shadow-sm flex items-center gap-2 cursor-pointer ${
              inspectorActive 
                ? 'bg-google-green text-emerald-900 border-emerald-400 shadow-[0_0_15px_rgba(52,168,83,0.5)]' 
                : 'bg-slate-800 text-slate-400 border-slate-600 hover:bg-slate-700'
            }`}
          >
            <span>🔍</span> Inspector Glass {inspectorActive ? 'ON' : 'OFF'}
          </button>
          <span className="bg-slate-800 px-3 py-1 rounded-full text-xs text-slate-400 font-bold border border-slate-700 shadow-sm">
            Step {step + 1} / {traceLog.length}
          </span>
        </div>
      </div>
      
      <div className="relative z-10 w-full mb-8 px-2 flex items-center gap-4">
        <button 
          onClick={() => setStep(Math.max(0, step - 1))}
          className="bg-slate-800 p-2 rounded hover:bg-slate-700 border border-slate-600 transition-colors cursor-pointer text-google-yellow"
        >◀</button>
        
        <input 
          type="range" 
          min="0" 
          max={traceLog.length - 1} 
          value={step} 
          onChange={(e) => setStep(parseInt(e.target.value))}
          className="w-full cursor-pointer accent-google-blue h-2 bg-slate-800 rounded-lg appearance-none"
        />

        <button 
          onClick={() => setStep(Math.min(traceLog.length - 1, step + 1))}
          className="bg-slate-800 p-2 rounded hover:bg-slate-700 border border-slate-600 transition-colors cursor-pointer text-google-yellow"
        >▶</button>
      </div>
      
      <div className="relative z-10 bg-slate-800 rounded-lg p-5 shadow-lg border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <div className="text-google-yellow text-xs uppercase tracking-widest font-bold">
            Executing Line {currentTrace.line}
          </div>
          <div className="text-slate-500 text-[10px] uppercase">
            Event: {currentTrace.event}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(currentTrace.locals).map(([key, data]) => {
            const isShared = inspectorActive && sharedIds.has(String(data.id));
            return (
              <div 
                key={key} 
                className={`p-3 rounded-md border-l-4 flex flex-col shadow-sm transition-all duration-300 ${
                  isShared 
                    ? 'bg-emerald-900/50 border-google-green shadow-[0_0_15px_rgba(52,168,83,0.3)] scale-105 z-10' 
                    : 'bg-slate-900 border-slate-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-white font-bold text-sm">{key}</span>
                  {isShared && <span className="text-[10px] bg-google-green text-emerald-900 font-bold px-1 rounded animate-pulse">LINKED</span>}
                </div>
                <span className={`font-mono truncate text-sm px-2 py-1 rounded transition-colors ${
                  isShared ? 'text-emerald-300 bg-emerald-900/80' : 'text-google-green bg-slate-800'
                }`}>
                  {data.value}
                </span>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase tracking-wider">Memory Address</span>
                  <span className={`text-xs font-mono px-1 rounded transition-colors ${
                    isShared ? 'text-google-yellow bg-slate-800' : 'text-slate-400 bg-slate-800'
                  }`}>
                    id: {data.id}
                  </span>
                </div>
              </div>
            );
          })}
          
          {Object.keys(currentTrace.locals).length === 0 && (
            <div className="text-slate-500 italic col-span-2 text-center py-4 bg-slate-900 rounded border border-dashed border-slate-700">
              No sigils materialized in memory yet...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
