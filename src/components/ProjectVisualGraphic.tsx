import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface ProjectVisualGraphicProps {
  projectId: string;
  category: string;
  title: string;
  tags: string[];
}

export const ProjectVisualGraphic: React.FC<ProjectVisualGraphicProps> = ({
  projectId,
  category,
  title,
  tags
}) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`w-full aspect-[16/9] rounded-xl overflow-hidden relative border transition-all p-3.5 flex flex-col justify-between font-technical select-none ${
        isDark ? 'bg-[#0E0E0E] border-white/10' : 'bg-[#F6F5F2] border-black/10'
      }`}
    >
      {/* Background Micro Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-35 pointer-events-none" />

      {/* Top Header Row with LED indicator & specialized sub-system tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E8500A] animate-pulse" />
          <span
            className={`text-[9px] tracking-widest uppercase font-semibold ${
              isDark ? 'text-white/60' : 'text-black/60'
            }`}
          >
            {getSysTag(projectId, category)}
          </span>
        </div>
        <span
          className={`text-[8px] tracking-wider px-1.5 py-0.5 rounded border uppercase ${
            isDark ? 'bg-white/5 border-white/10 text-white/60' : 'bg-black/5 border-black/10 text-black/60'
          }`}
        >
          {tags[0] || 'METRIC'}
        </span>
      </div>

      {/* ========================================================
          UNIQUE GRAPHIC FOR EACH OF THE TOP 6 PROJECTS
          ======================================================== */}
      <div className="relative z-10 my-auto py-1 w-full">
        {/* 1. A/B Testing: CUPED Variance Reduction & Distribution Bell Curve */}
        {projectId === 'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing' && (
          <div className="space-y-1.5">
            <svg viewBox="0 0 280 70" className="w-full h-14 overflow-visible">
              {/* Baseline bell curve (Grey) */}
              <path
                d="M 10,65 Q 60,65 95,35 Q 120,5 140,5 Q 160,5 185,35 Q 220,65 270,65"
                fill="none"
                stroke={isDark ? '#4A4A4A' : '#C0C0C0'}
                strokeWidth="1.8"
                strokeDasharray="3 3"
              />
              {/* Variant treatment bell curve shifted right (Orange Lift) */}
              <path
                d="M 30,65 Q 80,65 115,28 Q 142,-2 165,-2 Q 188,-2 215,28 Q 245,65 275,65"
                fill="none"
                stroke="#E8500A"
                strokeWidth="2.4"
              />
              {/* Shaded statistical lift area */}
              <path
                d="M 140,5 Q 160,5 185,35 Q 220,65 245,65 L 185,65 Q 160,40 140,5 Z"
                fill="#E8500A"
                opacity="0.25"
              />
              {/* Vertical confidence threshold line */}
              <line x1="165" y1="0" x2="165" y2="65" stroke="#E8500A" strokeWidth="1" strokeDasharray="2 2" />
              <text x="170" y="16" fill="#E8500A" fontSize="8" fontFamily="monospace" fontWeight="bold">
                +8.45% LIFT
              </text>
            </svg>
            <div className="flex justify-between text-[8px] opacity-60">
              <span>CONTROL (15.1%)</span>
              <span className="text-[#E8500A] font-bold">p &lt; 0.001 (POWER: 0.88)</span>
              <span>TREATMENT (16.4%)</span>
            </div>
          </div>
        )}

        {/* 2. Retail BigQuery Analytics: SQL Query Console & Partitioned Shards */}
        {projectId === 'retail-bigquery-analytics' && (
          <div className="space-y-1.5 font-technical">
            <div className={`p-2 rounded-lg border font-mono text-[8.5px] leading-tight ${isDark ? 'bg-black/60 border-white/10' : 'bg-white border-black/10'}`}>
              <div className="flex items-center justify-between text-white/50 pb-1 mb-1 border-b border-white/5">
                <span className="text-[#E8500A]">BIGQUERY_CONSOLE</span>
                <span className="text-emerald-400">LATENCY 1.2s</span>
              </div>
              <div className={isDark ? 'text-white/80' : 'text-black/80'}>
                <span className="text-[#E8500A] font-bold">SELECT</span> rfm_segment, <span className="text-amber-400">COUNT</span>(1) <br />
                <span className="text-[#E8500A] font-bold">FROM</span> `retail_prod.transactions_partitioned` <br />
                <span className="text-[#E8500A] font-bold">WHERE</span> date &gt;= <span className="text-emerald-400">CURRENT_DATE()</span> - 90
              </div>
            </div>
            <div className="flex justify-between text-[8px] opacity-60">
              <span>SQL WINDOW FUNCTIONS</span>
              <span className="text-[#E8500A]">RFM COHORT MARTS</span>
              <span>PARTITIONED TABLE</span>
            </div>
          </div>
        )}

        {/* 3. Telco Churn: ML ROC-AUC Curve & Feature Importance Bars */}
        {projectId === 'telco-churn-prediction-customer-churn-prediction' && (
          <div className="space-y-1.5 font-technical">
            <div className="grid grid-cols-2 gap-3 items-center">
              {/* Mini ROC Curve */}
              <div className="h-12 flex flex-col justify-end">
                <svg viewBox="0 0 100 50" className="w-full h-full overflow-visible">
                  {/* Diagonal random baseline */}
                  <line x1="5" y1="45" x2="95" y2="5" stroke={isDark ? '#444' : '#CCC'} strokeWidth="1" strokeDasharray="2 2" />
                  {/* High performance ROC curve */}
                  <path d="M 5,45 Q 10,8 95,5" fill="none" stroke="#E8500A" strokeWidth="2.2" />
                  <circle cx="28" cy="14" r="3" fill="#E8500A" />
                  <text x="36" y="16" fill="#E8500A" fontSize="7" fontWeight="bold">AUC 0.86</text>
                </svg>
              </div>
              {/* Feature Importance Stack */}
              <div className="space-y-1 text-[8px]">
                <div>
                  <div className="flex justify-between opacity-70">
                    <span>TENURE_MONTHS</span>
                    <span className="text-[#E8500A]">38%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8500A] w-[38%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between opacity-70">
                    <span>TOTAL_CHARGES</span>
                    <span className="text-[#E8500A]">29%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8500A] w-[29%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between opacity-70">
                    <span>CONTRACT_TYPE</span>
                    <span className="text-[#E8500A]">21%</span>
                  </div>
                  <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E8500A] w-[21%]" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-[8px] opacity-60 pt-0.5">
              <span>XGBOOST CLASSIFIER</span>
              <span className="text-[#E8500A]">30-60D ATTRITION</span>
              <span>FASTAPI SERVING</span>
            </div>
          </div>
        )}

        {/* 4. Retail Data Pipeline: Azure Data Factory -> Snowflake Architectural Diagram */}
        {projectId === 'retail-data-pipeline-adf-sqlserver-snowflake' && (
          <div className="space-y-2 font-technical">
            <div className="flex items-center justify-between gap-1 text-[8.5px]">
              {/* Node 1: SQL Server */}
              <div className={`p-1.5 rounded-lg border text-center flex-1 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}>
                <div className="text-[7.5px] opacity-60">SOURCE</div>
                <div className="font-bold">SQL SERVER</div>
                <div className="text-[7px] text-[#E8500A]">OLTP DB</div>
              </div>

              {/* Pipeline Arrow: Azure Data Factory */}
              <div className="flex flex-col items-center px-1">
                <span className="text-[7.5px] text-[#E8500A] font-bold">ADF PIPELINE</span>
                <span className="text-[#E8500A] text-xs">────────▶</span>
                <span className="text-[7px] opacity-50">ELT INGEST</span>
              </div>

              {/* Node 2: Snowflake */}
              <div className={`p-1.5 rounded-lg border text-center flex-1 border-[#E8500A]/40 ${isDark ? 'bg-[#E8500A]/10 text-white' : 'bg-[#E8500A]/10 text-black'}`}>
                <div className="text-[7.5px] text-[#E8500A] font-bold">WAREHOUSE</div>
                <div className="font-bold">SNOWFLAKE</div>
                <div className="text-[7px] opacity-70">STAGING MARTS</div>
              </div>
            </div>
            <div className="flex justify-between text-[8px] opacity-60">
              <span>TRIGGER: DAILY BATCH</span>
              <span className="text-[#E8500A]">DELTA LOAD: VERIFIED</span>
              <span>SCHEMA EVOLUTION</span>
            </div>
          </div>
        )}

        {/* 5. SomnoVision: Facial Landmark Mesh & Sleep Apnea Biomarkers */}
        {projectId === 'SomnoVision' && (
          <div className="space-y-1.5 font-technical">
            <div className="flex items-center justify-around">
              {/* Facial Geometry Target Scanner */}
              <div className="relative w-14 h-14 rounded-full border border-dashed border-[#E8500A] flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A] animate-ping" />
                </div>
                {/* Crosshairs */}
                <div className="absolute inset-x-0 h-px bg-[#E8500A]/40" />
                <div className="absolute inset-y-0 w-px bg-[#E8500A]/40" />
              </div>
              {/* Landmark Biomarker Readout */}
              <div className={`p-2 rounded-lg border font-mono text-[8px] leading-tight space-y-1 ${isDark ? 'bg-black/50 border-white/10' : 'bg-white border-black/10'}`}>
                <div className="text-[#E8500A] font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>LANDMARKS DETECTED (68-PT)</span>
                </div>
                <div className="opacity-80">MANDIBULAR_RETROGNATHIA: 0.14</div>
                <div className="opacity-80">CERVICAL_CIRCUMFERENCE: NORM</div>
                <div className="text-emerald-400 font-semibold">STREAMLIT CLOUD LIVE</div>
              </div>
            </div>
            <div className="flex justify-between text-[8px] opacity-60 pt-0.5">
              <span>OPENCV SCANNER</span>
              <span className="text-[#E8500A]">OSA RISK SCREENING</span>
              <span>BIOMARKER EXTRACTION</span>
            </div>
          </div>
        )}

        {/* 6. ICC T20 World Cup Dashboard: Dimensional Star Schema & Strike Rate Spectrum */}
        {projectId === 'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard' && (
          <div className="space-y-2 font-technical">
            {/* Unique Sports Analytics Visual: Phase-wise Run Rates */}
            <div className="flex items-end gap-2 h-12 justify-center pt-1">
              <div className="flex flex-col items-center flex-1">
                <span className="text-[7.5px] opacity-60 mb-0.5">POWERPLAY</span>
                <div className="w-full bg-[#E8500A]/50 rounded-t h-7" />
                <span className="text-[7px] mt-0.5">7.2 RPO</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-[7.5px] opacity-60 mb-0.5">MIDDLE (7-15)</span>
                <div className="w-full bg-[#E8500A]/70 rounded-t h-8" />
                <span className="text-[7px] mt-0.5">8.1 RPO</span>
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-[7.5px] text-[#E8500A] font-bold mb-0.5">DEATH (16-20)</span>
                <div className="w-full bg-[#E8500A] rounded-t h-12" />
                <span className="text-[7px] text-[#E8500A] font-bold mt-0.5">11.4 RPO</span>
              </div>
            </div>
            <div className="flex justify-between text-[8px] opacity-60">
              <span>200+ ATHLETES</span>
              <span className="text-[#E8500A]">STAR SCHEMA DAX</span>
              <span>PRESSURE INDEX</span>
            </div>
          </div>
        )}

        {/* Fallback for other projects if expanded */}
        {![
          'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
          'retail-bigquery-analytics',
          'telco-churn-prediction-customer-churn-prediction',
          'retail-data-pipeline-adf-sqlserver-snowflake',
          'SomnoVision',
          'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard'
        ].includes(projectId) && (
          <div className="space-y-2 text-center py-2">
            <div className="text-xs font-bold text-[#E8500A]">{title}</div>
            <div className="text-[9px] opacity-70 font-mono">PUBLIC REPOSITORY · VERIFIED CODE</div>
          </div>
        )}
      </div>

      {/* Bottom Footer Row */}
      <div className="relative z-10 flex items-center justify-between text-[8px] pt-1.5 border-t border-black/5 dark:border-white/5 opacity-60">
        <span>VERIFIED REPO</span>
        <span className="font-mono">PUBLIC / MIT</span>
      </div>
    </div>
  );
};

function getSysTag(id: string, category: string): string {
  if (id === 'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing') return 'SYS // A/B STATS';
  if (id === 'retail-bigquery-analytics') return 'SYS // BIGQUERY SQL';
  if (id === 'telco-churn-prediction-customer-churn-prediction') return 'SYS // ML CLASSIFIER';
  if (id === 'retail-data-pipeline-adf-sqlserver-snowflake') return 'SYS // ELT PIPELINE';
  if (id === 'SomnoVision') return 'SYS // VISION SCANNER';
  if (id === 'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard') return 'SYS // POWER BI';
  return `SYS // ${category}`;
}
