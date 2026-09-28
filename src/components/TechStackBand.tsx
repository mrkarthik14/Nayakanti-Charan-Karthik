import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TECH_CHIPS } from '../data/portfolioData';
import { useSectionTransition } from '../hooks/useSectionTransition';

export const TechStackBand: React.FC = () => {
  const [activeChip, setActiveChip] = useState<string | null>(null);
  const { ref, motionStyle } = useSectionTransition<HTMLElement>({ yOffset: 28 });

  const chipContextMap: Record<string, string> = {
    PYTHON: 'Primary language for data manipulation, ML modelling, algorithms, and backend services.',
    SQL: 'Complex analytical queries, window functions, CTEs, performance query tuning.',
    PANDAS: 'Data wrangling, aggregation pipelines, multi-index restructuring, and time series.',
    NUMPY: 'Vectorized mathematical operations, matrix transformations, linear algebra.',
    'SCIKIT-LEARN': 'Supervised regression, classification, clustering, hyperparameter tuning.',
    'POWER BI': 'Enterprise business intelligence dashboards, star schemas, row-level security.',
    DAX: 'Custom analytical measures, time-intelligence formulas, and tabular calculations.',
    TABLEAU: 'Interactive visual exploratory dashboards, calculated fields, and KPI boards.',
    EXCEL: 'Advanced financial/operational modelling, pivot summaries, and data validation.',
    MATPLOTLIB: 'Scientific data plotting, statistical distributions, custom visual figures.',
    SEABORN: 'Exploratory heatmaps, pairwise correlation grids, regression plots.',
    POSTGRESQL: 'Relational database architecture, JSONB schemas, indexing, and integrity.',
    MYSQL: 'Transactional relational databases, schema normalization, and store procedures.',
    GIT: 'Version control, branching strategies, code reviews, and commit hygiene.',
    GITHUB: 'Open-source collaboration, repository management, documentation.',
    DOCKER: 'Containerization, reproducible runtime environments, microservice isolation.',
    AWS: 'Cloud fundamentals, S3 bucket storage, EC2 deployment, cloud workflows.',
    FLASK: 'Lightweight RESTful API design, middleware integration, SQLAlchemy ORM.',
    FASTAPI: 'High-performance asynchronous Python microservices and automatic OpenAPI specs.',
    JUPYTER: 'Reproducible research notebooks, exploratory data analysis, and documentation.',
    PYSPARK: 'Distributed computing paradigms, large-scale data frame processing.',
    'MACHINE LEARNING': 'Feature engineering, model validation, overfitting mitigation, metrics.',
    NLP: 'Text tokenization, sentiment extraction, vector embeddings, TF-IDF analysis.',
    'GEN AI': 'Prompt engineering, RAG retrieval architecture, LLM agent integration.'
  };

  return (
    <section
      id="stack"
      ref={ref}
      className="relative w-full bg-[#E8500A] text-white py-16 md:py-20 overflow-hidden"
    >
      {/* Subtle top/bottom structural lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/15" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/15" />

      <motion.div style={motionStyle} className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Large Engineering Statement */}
          <div className="lg:col-span-6">
            <span className="font-technical text-xs tracking-[0.25em] uppercase text-white/80 block mb-3">
              PIPELINE CAPABILITY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.08]">
              I WORK ACROSS THE <br className="hidden sm:inline" />
              <span className="underline decoration-white/30 underline-offset-8">
                DATA → MODEL → PRODUCT
              </span> <br />
              PIPELINE.
            </h2>
            <p className="mt-4 text-white/85 text-sm md:text-base font-normal max-w-lg leading-relaxed">
              From raw relational queries and exploratory data hygiene to machine learning inference and deployable containerized software.
            </p>

            {/* Active Chip Context Display */}
            <div className="mt-6 pt-4 border-t border-white/20 min-h-[52px]">
              {activeChip ? (
                <div className="transition-opacity duration-200">
                  <span className="font-technical text-[10px] tracking-widest uppercase text-white/70 block">
                    TOOL FOCUS: {activeChip}
                  </span>
                  <p className="font-technical text-xs text-white font-medium mt-0.5">
                    {chipContextMap[activeChip] || 'Core engineering tool in active production workflow.'}
                  </p>
                </div>
              ) : (
                <div className="font-technical text-xs text-white/70">
                  Hover or tap any tool chip to inspect applied workflow context.
                </div>
              )}
            </div>
          </div>

          {/* Dense Collection of Small Outlined Chips */}
          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-2 justify-start lg:justify-end">
              {TECH_CHIPS.map(chip => {
                const isSelected = activeChip === chip;
                return (
                  <button
                    key={chip}
                    onMouseEnter={() => setActiveChip(chip)}
                    onClick={() => setActiveChip(chip)}
                    className={`font-technical text-[11px] md:text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded-full border transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8500A] ${
                      isSelected
                        ? 'bg-black text-white border-black shadow-md scale-105'
                        : 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10'
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
