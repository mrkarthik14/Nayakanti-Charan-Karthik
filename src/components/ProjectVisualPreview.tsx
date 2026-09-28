import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ProjectVisualPreviewProps {
  type: 'dashboard' | 'pipeline' | 'model' | 'vision' | 'api' | 'nlp' | 'metrics';
  title: string;
  tags: string[];
}

export const ProjectVisualPreview: React.FC<ProjectVisualPreviewProps> = ({ type, title, tags }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`w-full aspect-[16/9] rounded-xl overflow-hidden relative border transition-all p-3.5 flex flex-col justify-between font-technical select-none ${
        isDark ? 'bg-[#0E0E0E] border-white/10' : 'bg-[#F6F5F2] border-black/10'
      }`}
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Top Bar with Micro System Tag & LED Indicator */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E8500A] animate-pulse" />
          <span
            className={`text-[9px] tracking-widest uppercase font-semibold ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}
          >
            SYS // {type.toUpperCase()}
          </span>
        </div>
        <span
          className={`text-[8px] tracking-wider px-1.5 py-0.5 rounded border ${
            isDark ? 'bg-white/5 border-white/10 text-white/50' : 'bg-black/5 border-black/10 text-black/50'
          }`}
        >
          {tags[0] || 'METRIC'}
        </span>
      </div>

      {/* Middle Interactive Conceptual Graphic */}
      <div className="relative z-10 my-auto py-1">
        {type === 'dashboard' && (
          <div className="space-y-2">
            <div className="flex items-end gap-1.5 h-12 justify-center">
              <div className="w-4 bg-[#E8500A]/30 rounded-t h-[35%]" />
              <div className="w-4 bg-[#E8500A]/50 rounded-t h-[55%]" />
              <div className="w-4 bg-[#E8500A]/70 rounded-t h-[40%]" />
              <div className="w-4 bg-[#E8500A] rounded-t h-[88%]" />
              <div className="w-4 bg-[#E8500A]/60 rounded-t h-[72%]" />
              <div className="w-4 bg-[#E8500A]/40 rounded-t h-[60%]" />
            </div>
            <div className="flex justify-between text-[8px] opacity-60">
              <span>STAR_SCHEMA</span>
              <span className="text-[#E8500A]">AGGREGATE: OK</span>
              <span>SLICER_DAX</span>
            </div>
          </div>
        )}

        {type === 'pipeline' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1 text-[9px]">
              <div className={`px-2 py-1 rounded border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'}`}>
                SQL SERVER
              </div>
              <span className="text-[#E8500A] font-bold">── ADF ──▶</span>
              <div className={`px-2 py-1 rounded border text-[#E8500A] font-bold ${isDark ? 'bg-white/5 border-[#E8500A]/30' : 'bg-white border-[#E8500A]/30'}`}>
                SNOWFLAKE
              </div>
            </div>
            <div className="text-[8px] text-center opacity-60 tracking-wider">
              ELT FLOW: EXTRACT → INGEST → ANALYTIC MARTS
            </div>
          </div>
        )}

        {type === 'model' && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[9px]">
              <span className="opacity-60">HYPOTHESIS / ROC-AUC</span>
              <span className="text-[#E8500A] font-bold">LIFT: +8.45%</span>
            </div>
            <div className="w-full bg-black/20 dark:bg-white/5 h-2 rounded-full overflow-hidden flex">
              <div className="bg-[#E8500A] h-full w-[84%]" />
              <div className="bg-amber-400 h-full w-[16%] opacity-60" />
            </div>
            <div className="flex justify-between text-[8px] opacity-50">
              <span>CONFIDENCE 95%</span>
              <span>CUPED THETA = 0.42</span>
            </div>
          </div>
        )}

        {type === 'vision' && (
          <div className="flex items-center justify-center gap-3">
            <div className="relative w-12 h-12 rounded-full border border-dashed border-[#E8500A] flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#E8500A] animate-ping" />
              <div className="absolute inset-1 rounded-full border border-[#E8500A]/30" />
            </div>
            <div className="text-left text-[9px] space-y-0.5">
              <div className="text-[#E8500A] font-bold">FACIAL LANDMARKS</div>
              <div className="opacity-60">OSA CRANIOFACIAL RISK</div>
              <div className="opacity-40">OPENCV + STREAMLIT</div>
            </div>
          </div>
        )}

        {type === 'nlp' && (
          <div className="space-y-1.5 text-[9px]">
            <div className="flex items-center gap-2">
              <span className="text-[#E8500A]">AGENT:</span>
              <span className="opacity-80">Reasoning Loop Initiated</span>
            </div>
            <div className={`p-1.5 rounded border text-[8px] ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'}`}>
              <code>tools: [vector_search, code_exec, memory_buffer]</code>
            </div>
          </div>
        )}

        {type === 'api' && (
          <div className="space-y-1.5 text-[9px]">
            <div className="flex items-center justify-between">
              <span className="text-[#E8500A] font-bold">API GATEWAY / REST</span>
              <span className="text-green-500">200 STATUS</span>
            </div>
            <div className={`p-1.5 rounded border text-[8px] font-mono ${isDark ? 'bg-white/5 border-white/10 text-white/70' : 'bg-white border-black/10 text-black/70'}`}>
              GET /v1/healthcheck → latency 42ms
            </div>
          </div>
        )}

        {type === 'metrics' && (
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className={`p-1.5 rounded border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'}`}>
              <div className="text-[8px] opacity-60">ANOMALY SCORE</div>
              <div className="text-sm font-bold text-[#E8500A]">99.2%</div>
            </div>
            <div className={`p-1.5 rounded border ${isDark ? 'bg-white/5 border-white/10' : 'bg-white border-black/10'}`}>
              <div className="text-[8px] opacity-60">RISK VECTOR</div>
              <div className="text-sm font-bold">LOW-RISK</div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Row: Minimalist Technical Indicator */}
      <div className="relative z-10 flex items-center justify-between text-[8px] pt-1.5 border-t border-black/5 dark:border-white/5 opacity-60">
        <span>VERIFIED REPO</span>
        <span className="font-mono">PUBLIC / MIT</span>
      </div>
    </div>
  );
};
