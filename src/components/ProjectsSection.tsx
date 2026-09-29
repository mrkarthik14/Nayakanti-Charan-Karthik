import React, { useState, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import { GitHubPortfolioProject, GITHUB_IDENTITY } from '../data/githubPortfolio';
import { GitHubProjectDetailModal } from './GitHubProjectDetailModal';
import { ProjectVisualGraphic } from './ProjectVisualGraphic';
import { SectionHeader } from './SectionHeader';
import { useTheme } from '../context/ThemeContext';

interface PhaseStep {
  key: string;
  label: string;
  detail: string;
  status: 'completed' | 'active' | 'upcoming';
}

interface ProjectProgression {
  phaseNumber: number; // 1 to 4
  phaseTag: string;
  phaseTitle: string;
  isLive: boolean;
  steps: PhaseStep[];
}

/**
 * Maps an AI/ML engineering project to its standardized 4-stage lifecycle progression:
 * 1. Data Ingestion & Featurization (DATA)
 * 2. Model Architecture & Training (MODEL)
 * 3. Validation & Performance Benchmark (EVAL)
 * 4. Serving & Production Deployment (SERVE)
 */
function getProjectProgression(project: GitHubPortfolioProject): ProjectProgression {
  const isLive = project.status === 'LIVE' || Boolean(project.liveUrl);

  // 1. SomnoVision (Clinical Computer Vision screening on Streamlit)
  if (project.id === 'SomnoVision') {
    return {
      phaseNumber: 4,
      phaseTag: 'PHASE 04 · LIVE PRODUCTION',
      phaseTitle: 'Streamlit Cloud Serving',
      isLive: true,
      steps: [
        { key: 'DATA', label: 'DATA', detail: 'Facial landmarks & craniofacial morphometrics', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'OpenCV & Deep Learning representations', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Clinical biomarker sensitivity verification', status: 'completed' },
        { key: 'SERVE', label: 'SERVE', detail: 'Streamlit Cloud web application', status: 'active' }
      ]
    };
  }

  // 2. Autonomous AI Agents (Multi-Agent Reasoning & Tool Calling)
  if (project.id === 'AI-Agents') {
    return {
      phaseNumber: 4,
      phaseTag: 'PHASE 04 · AGENTIC RUNTIME',
      phaseTitle: 'Multi-Agent Tool Orchestration',
      isLive: false,
      steps: [
        { key: 'DATA', label: 'DATA', detail: 'Context schemas & persistent state buffers', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'Chain-of-thought reasoning loops', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Tool invocation accuracy & plan validation', status: 'completed' },
        { key: 'SERVE', label: 'SERVE', detail: 'Autonomous execution runtime', status: 'active' }
      ]
    };
  }

  // 3. Telco Customer Churn Prediction (End-to-End Classification + FastAPI)
  if (project.id === 'telco-churn-prediction-customer-churn-prediction') {
    return {
      phaseNumber: 4,
      phaseTag: 'PHASE 04 · REST API SERVED',
      phaseTitle: 'FastAPI Production Service',
      isLive: false,
      steps: [
        { key: 'DATA', label: 'DATA', detail: 'Customer churn cohort feature engineering', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'XGBoost & Random Forest ensemble training', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Cost-sensitive threshold optimization', status: 'completed' },
        { key: 'SERVE', label: 'SERVE', detail: 'Containerized FastAPI inference service', status: 'completed' }
      ]
    };
  }

  // 4. Tata Steel Industrial Defect Detection in Hot Rolling
  if (project.id === 'Defect-Detection-in-Hot-Rolling') {
    return {
      phaseNumber: 3,
      phaseTag: 'PHASE 03 · BENCHMARKED',
      phaseTitle: 'Telemetry Audit & Validation',
      isLive: false,
      steps: [
        { key: 'DATA', label: 'DATA', detail: '49 industrial pyrometer sensor streams', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'Binary defect classification models', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Cross-validated ROC-AUC (p < 0.001)', status: 'active' },
        { key: 'SERVE', label: 'SERVE', detail: 'Plant floor edge dispatch integration', status: 'upcoming' }
      ]
    };
  }

  // 5. Wildfire Intensity Prediction (Flask Web App)
  if (project.id === 'END-2-END-ML-PROJECT-WITH-DEPLOYMENT') {
    return {
      phaseNumber: 4,
      phaseTag: 'PHASE 04 · WEB APP SERVED',
      phaseTitle: 'Flask Deployment Pipeline',
      isLive: false,
      steps: [
        { key: 'DATA', label: 'DATA', detail: 'Meteorological telemetry & scrubbed logs', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'Regression pipeline & pickle serialization', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Cross-validated RMSE & R² evaluation', status: 'completed' },
        { key: 'SERVE', label: 'SERVE', detail: 'Flask application deployment', status: 'completed' }
      ]
    };
  }

  // 6. A/B Testing & Recommendation Optimization
  if (project.id === 'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing') {
    return {
      phaseNumber: 4,
      phaseTag: 'PHASE 04 · STATISTICALLY PROVEN',
      phaseTitle: 'CUPED Variance Audit & App',
      isLive: isLive,
      steps: [
        { key: 'DATA', label: 'DATA', detail: '50k users & 237k session historical logs', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'CUPED covariate variance adjustment', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Bootstrap Z-test (p < 0.001, lift +8.45%)', status: 'completed' },
        { key: 'SERVE', label: 'SERVE', detail: 'Interactive Streamlit experiment portal', status: 'completed' }
      ]
    };
  }

  // 7. General Fallback
  if (isLive) {
    return {
      phaseNumber: 4,
      phaseTag: 'PHASE 04 · LIVE DEPLOYED',
      phaseTitle: 'Production Deployment',
      isLive: true,
      steps: [
        { key: 'DATA', label: 'DATA', detail: 'Data pipeline & featurization', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'Model training & parameter optimization', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Validation & benchmark metrics', status: 'completed' },
        { key: 'SERVE', label: 'SERVE', detail: 'Live web / cloud serving active', status: 'active' }
      ]
    };
  }

  if (project.status === 'COMPLETED') {
    return {
      phaseNumber: 4,
      phaseTag: 'PHASE 04 · VERIFIED & RELEASED',
      phaseTitle: 'Production Release',
      isLive: false,
      steps: [
        { key: 'DATA', label: 'DATA', detail: 'Data pipeline completed', status: 'completed' },
        { key: 'MODEL', label: 'MODEL', detail: 'Model training completed', status: 'completed' },
        { key: 'EVAL', label: 'EVAL', detail: 'Metrics validation completed', status: 'completed' },
        { key: 'SERVE', label: 'SERVE', detail: 'Codebase & weights packaged', status: 'completed' }
      ]
    };
  }

  return {
    phaseNumber: 3,
    phaseTag: 'PHASE 03 · BENCHMARKING',
    phaseTitle: 'Active Development',
    isLive: false,
    steps: [
      { key: 'DATA', label: 'DATA', detail: 'Dataset curation complete', status: 'completed' },
      { key: 'MODEL', label: 'MODEL', detail: 'Model architectures training', status: 'completed' },
      { key: 'EVAL', label: 'EVAL', detail: 'Benchmarking performance', status: 'active' },
      { key: 'SERVE', label: 'SERVE', detail: 'Deployment scheduled', status: 'upcoming' }
    ]
  };
}

export const ProjectsSection: React.FC = () => {
  const { projects } = useGitHubProjects();
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [selectedStack, setSelectedStack] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalProject, setActiveModalProject] = useState<GitHubPortfolioProject | null>(null);
  const { isDark } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.72']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  // Curated list of AI / ML engineering project IDs for this dedicated showcase
  const aiMlProjectIds = useMemo(() => [
    'AI-Agents',
    'SomnoVision',
    'telco-churn-prediction-customer-churn-prediction',
    'Defect-Detection-in-Hot-Rolling',
    'END-2-END-ML-PROJECT-WITH-DEPLOYMENT',
    'faang-ml-journey',
    'TensorTonic-Solutions',
    'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing'
  ], []);

  // Filtered pool restricted to AI/ML projects
  const baseAiMlProjects = useMemo(() => {
    // Collect projects that match AI/ML IDs or have AI / ML / DL categories
    return projects.filter(p => {
      const isExplicitId = aiMlProjectIds.some(
        id => p.id.toLowerCase() === id.toLowerCase() || p.repoName.toLowerCase() === id.toLowerCase()
      );
      const isAiMlCategory = [
        'MACHINE LEARNING',
        'DEEP LEARNING',
        'AI / GEN AI'
      ].includes(p.primaryCategory);
      return isExplicitId || isAiMlCategory;
    });
  }, [projects, aiMlProjectIds]);

  // Domain Filter Categories
  const domainTabs = [
    { label: 'ALL AI/ML', id: 'ALL' },
    { label: 'GEN AI & AGENTS', id: 'AI / GEN AI' },
    { label: 'DEEP LEARNING & CV', id: 'DEEP LEARNING' },
    { label: 'ML SYSTEMS & PIPELINES', id: 'MACHINE LEARNING' }
  ];

  // Key tech stack options for quick badge filtering
  const techStackFilters = [
    'ALL',
    'PYTHON',
    'SCIKIT-LEARN',
    'XGBOOST',
    'OPENCV',
    'FASTAPI',
    'STREAMLIT',
    'LLM'
  ];

  // Filtered output based on search, domain, and tech badge
  const filteredProjects = useMemo(() => {
    return baseAiMlProjects.filter(p => {
      // Domain filter
      if (selectedDomain !== 'ALL' && p.primaryCategory !== selectedDomain) {
        return false;
      }

      // Tech Stack filter
      if (selectedStack !== 'ALL') {
        const matchesTag = p.secondaryTags.some(tag =>
          tag.toUpperCase().includes(selectedStack.toUpperCase())
        );
        const matchesLang = p.primaryLanguage.toUpperCase().includes(selectedStack.toUpperCase());
        if (!matchesTag && !matchesLang) return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = p.displayTitle.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inTags = p.secondaryTags.some(t => t.toLowerCase().includes(q));
        const inRepo = p.repoName.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inTags && !inRepo) return false;
      }

      return true;
    });
  }, [baseAiMlProjects, selectedDomain, selectedStack, searchQuery]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className={`relative py-24 md:py-32 border-t transition-colors ${
        isDark ? 'bg-[#0F0F0F] border-white/10' : 'bg-[#FAFAF9] border-black/10'
      }`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className="max-w-[1440px] mx-auto px-6 md:px-12"
      >
        {/* ========================================================
            1. SECTION HEADER
            ======================================================== */}
        <SectionHeader
          monoLabel="ENGINEERING / AI & ML SYSTEMS"
          counter="[ 02 / PROJECTS ]"
          titleLines={['FEATURED AI & ML', 'ENGINEERING PROJECTS']}
          description="Production machine learning pipelines, deep learning computer vision architectures, autonomous agent workflows, and telemetry defect scanners backed by live GitHub repositories and verified codebases."
          className="mb-12"
        />

        {/* ========================================================
            2. REPO REPERTORY STATS & SEARCH / FILTER TOOLBAR
            ======================================================== */}
        <div
          className={`p-6 rounded-[20px] border mb-10 transition-colors ${
            isDark
              ? 'bg-[#141414] border-white/10'
              : 'bg-white border-black/10 shadow-sm'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Domain Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              {domainTabs.map(tab => {
                const isActive = selectedDomain === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedDomain(tab.id)}
                    className={`font-technical text-xs tracking-wider uppercase px-3.5 py-2 rounded-[10px] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                      isActive
                        ? 'bg-[#E8500A] text-white font-semibold shadow-md shadow-[#E8500A]/20'
                        : isDark
                        ? 'bg-white/5 text-[#8A8A8A] hover:text-white hover:bg-white/10'
                        : 'bg-black/5 text-[#606060] hover:text-black hover:bg-black/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Input & Total Count */}
            <div className="flex items-center gap-3">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter by model, library..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className={`w-full font-technical text-xs px-3.5 py-2 pl-9 rounded-[10px] border transition-colors focus:outline-none focus:border-[#E8500A] ${
                    isDark
                      ? 'bg-black/40 border-white/10 text-white placeholder-white/40'
                      : 'bg-white border-black/15 text-black placeholder-black/40'
                  }`}
                />
                <svg
                  className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A8A]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A8A8A] hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div
                className={`hidden sm:flex items-center gap-2 px-3 py-2 rounded-[10px] border font-technical text-xs whitespace-nowrap ${
                  isDark ? 'border-white/10 text-[#8A8A8A]' : 'border-black/10 text-[#606060]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#E8500A]" />
                <span>{filteredProjects.length} REPOS</span>
              </div>
            </div>

          </div>

          {/* Quick Tech Badge Filter Strip */}
          <div className="mt-5 pt-4 border-t flex flex-wrap items-center gap-2 border-inherit">
            <span
              className={`font-technical text-[10px] tracking-[0.2em] uppercase mr-2 ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              STACK FILTER:
            </span>
            {techStackFilters.map(tech => {
              const isSelected = selectedStack === tech;
              return (
                <button
                  key={tech}
                  onClick={() => setSelectedStack(tech)}
                  className={`font-technical text-[10px] px-2.5 py-1 rounded-[6px] border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#E8500A] ${
                    isSelected
                      ? 'border-[#E8500A] bg-[#E8500A]/15 text-[#E8500A] font-semibold'
                      : isDark
                      ? 'border-white/10 bg-white/5 text-[#8A8A8A] hover:text-white hover:border-white/20'
                      : 'border-black/10 bg-black/5 text-[#606060] hover:text-black hover:border-black/20'
                  }`}
                >
                  {tech}
                </button>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            3. PROJECTS CARDS GRID
            ======================================================== */}
        {filteredProjects.length === 0 ? (
          <div
            className={`p-12 text-center rounded-[20px] border ${
              isDark ? 'bg-[#141414] border-white/10 text-[#8A8A8A]' : 'bg-white border-black/10 text-[#606060]'
            }`}
          >
            <p className="font-technical text-sm mb-3">No AI/ML projects match your filter criteria.</p>
            <button
              onClick={() => {
                setSelectedDomain('ALL');
                setSelectedStack('ALL');
                setSearchQuery('');
              }}
              className="font-technical text-xs text-[#E8500A] hover:underline uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const isLive = project.status === 'LIVE' || Boolean(project.liveUrl);
              const progression = getProjectProgression(project);

              return (
                <motion.article
                  key={project.id}
                  initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className={`group rounded-[20px] border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                    isDark
                      ? 'bg-[#141414] border-white/10 hover:border-[#E8500A]/50 hover:shadow-black/40'
                      : 'bg-white border-black/10 hover:border-[#E8500A]/50 hover:shadow-black/10'
                  }`}
                >
                  <div>
                    {/* Top Status & GitHub Stats Bar */}
                    <div
                      className={`px-5 py-3.5 border-b flex items-center justify-between font-technical text-[10px] tracking-wider ${
                        isDark ? 'border-white/10 bg-black/20' : 'border-black/5 bg-black/[0.02]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            isLive
                              ? 'bg-emerald-500 animate-pulse'
                              : project.status === 'ACTIVE'
                              ? 'bg-[#E8500A] animate-pulse'
                              : 'bg-neutral-400'
                          }`}
                        />
                        <span
                          className={`font-semibold uppercase ${
                            isLive
                              ? 'text-emerald-500'
                              : project.status === 'ACTIVE'
                              ? 'text-[#E8500A]'
                              : isDark
                              ? 'text-[#8A8A8A]'
                              : 'text-[#606060]'
                          }`}
                        >
                          {isLive ? 'LIVE DEMO' : project.status}
                        </span>
                      </div>

                      <div
                        className={`flex items-center gap-3 ${
                          isDark ? 'text-[#8A8A8A]' : 'text-[#707070]'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.399 8.167-7.333-3.856-7.333 3.856 1.399-8.167-5.934-5.784 8.2-1.192zm0 5.702l-2.223 4.505-4.972.723 3.598 3.507-.849 4.952 4.446-2.338 4.446 2.338-.849-4.952 3.598-3.507-4.972-.723z" />
                          </svg>
                          <span>{project.stars || 1}</span>
                        </span>

                        <span className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 10a3 3 0 10-2.829-4H8.829A3.001 3.001 0 003 7c0 1.306.835 2.418 2 2.83V15a3 3 0 002.83 2h.341a3.001 3.001 0 105.658 0H15a3 3 0 002.829-2H18a3 3 0 100-5zm-13-3a1 1 0 112 0 1 1 0 01-2 0zm10 11a1 1 0 11-2 0 1 1 0 012 0zm3-11a1 1 0 11-2 0 1 1 0 012 0z" />
                          </svg>
                          <span>{project.forks || 0}</span>
                        </span>
                      </div>
                    </div>

                    {/* Graphic Telemetry Banner */}
                    <div className="overflow-hidden border-b border-inherit relative bg-black/10 flex items-center justify-center p-3">
                      <ProjectVisualGraphic
                        projectId={project.id}
                        category={project.primaryCategory}
                        title={project.displayTitle}
                        tags={project.secondaryTags}
                      />
                    </div>

                    {/* Main Content Body */}
                    <div className="p-5">
                      {/* Project Category & Phase Chip Header */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-technical text-[9px] font-bold tracking-[0.2em] px-2 py-0.5 rounded-[4px] bg-[#E8500A]/10 text-[#E8500A] border border-[#E8500A]/20 uppercase">
                          {project.primaryCategory}
                        </span>
                        
                        {/* Compact Phase Tag */}
                        <span
                          className={`font-technical text-[9px] font-bold tracking-wider px-2 py-0.5 rounded-[4px] border uppercase truncate ${
                            progression.phaseNumber === 4
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                              : 'border-[#E8500A]/40 bg-[#E8500A]/10 text-[#E8500A]'
                          }`}
                        >
                          {progression.phaseTag}
                        </span>
                      </div>

                      <h3
                        onClick={() => setActiveModalProject(project)}
                        className={`text-lg font-bold tracking-tight mb-2 group-hover:text-[#E8500A] transition-colors cursor-pointer line-clamp-2 ${
                          isDark ? 'text-[#F2F0EC]' : 'text-[#141414]'
                        }`}
                      >
                        {project.displayTitle}
                      </h3>

                      <p
                        className={`text-xs leading-relaxed line-clamp-3 mb-4 ${
                          isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
                        }`}
                      >
                        {project.description}
                      </p>

                      {/* Evidence / Architecture Banner */}
                      <div
                        className={`p-2.5 rounded-[8px] mb-4 border font-technical text-[10px] tracking-wide flex items-center gap-2 ${
                          isDark
                            ? 'bg-black/40 border-white/5 text-white/80'
                            : 'bg-black/[0.03] border-black/5 text-black/80'
                        }`}
                      >
                        <span className="text-[#E8500A] font-bold">›</span>
                        <span className="truncate">{project.evidence}</span>
                      </div>

                      {/* Metrics Strip */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          {project.metrics.slice(0, 2).map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className={`p-2 rounded-[8px] border text-center ${
                                isDark
                                  ? 'bg-white/[0.02] border-white/5'
                                  : 'bg-black/[0.02] border-black/5'
                              }`}
                            >
                              <div className="font-technical text-[9px] uppercase tracking-wider text-[#8A8A8A]">
                                {m.label}
                              </div>
                              <div
                                className={`font-technical text-xs font-bold mt-0.5 truncate ${
                                  m.highlight ? 'text-[#E8500A]' : isDark ? 'text-white' : 'text-black'
                                }`}
                              >
                                {m.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* ========================================================
                          HORIZONTAL VISUAL TIMELINE INDICATOR & PROGRESSION
                          ======================================================== */}
                      <div className="mb-4 p-3 rounded-[12px] border border-inherit bg-black/[0.03] dark:bg-white/[0.02]">
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <span className="font-technical text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8A8A8A]">
                            ENGINEERING TIMELINE:
                          </span>
                          <span className="font-technical text-[9px] text-[#8A8A8A] font-semibold">
                            STAGE {progression.phaseNumber}/4 · {progression.phaseTitle}
                          </span>
                        </div>

                        {/* Horizontal Timeline Track */}
                        <div className="relative pt-1 pb-1">
                          {/* Background Rail */}
                          <div className="absolute top-[9px] left-3 right-3 h-[2px] bg-black/10 dark:bg-white/10 -z-0" />

                          {/* Completed Rail Fill */}
                          <div
                            className="absolute top-[9px] left-3 h-[2px] bg-[#E8500A] -z-0 transition-all duration-500"
                            style={{
                              width: `${((progression.phaseNumber - 1) / 3) * 100}%`
                            }}
                          />

                          {/* Phase Step Nodes */}
                          <div className="relative z-10 flex justify-between items-center">
                            {progression.steps.map((step) => {
                              const isCompleted = step.status === 'completed';
                              const isActive = step.status === 'active';

                              return (
                                <div
                                  key={step.key}
                                  className="flex flex-col items-center group/step relative cursor-help"
                                  title={`${step.label}: ${step.detail}`}
                                >
                                  {/* Node Dot Indicator */}
                                  <div
                                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold transition-transform group-hover/step:scale-125 ${
                                      isCompleted
                                        ? 'bg-[#E8500A] text-white shadow-sm'
                                        : isActive
                                        ? 'bg-[#E8500A] text-white ring-4 ring-[#E8500A]/30 animate-pulse'
                                        : isDark
                                        ? 'border-2 border-white/20 bg-[#1A1A1A] text-white/30'
                                        : 'border-2 border-black/20 bg-neutral-100 text-black/30'
                                    }`}
                                  >
                                    {isCompleted ? (
                                      <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                      </svg>
                                    ) : (
                                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                    )}
                                  </div>

                                  {/* Step Monospace Label */}
                                  <span
                                    className={`font-technical text-[8px] font-bold tracking-wider mt-1.5 transition-colors ${
                                      isCompleted || isActive
                                        ? isDark
                                          ? 'text-[#F2F0EC]'
                                          : 'text-[#121212]'
                                        : 'text-[#8A8A8A]'
                                    }`}
                                  >
                                    {step.label}
                                  </span>

                                  {/* Tooltip on Hover */}
                                  <div className="absolute bottom-full mb-1.5 hidden group-hover/step:block z-30 pointer-events-none">
                                    <div
                                      className={`px-2.5 py-1.5 rounded-[6px] text-[9px] font-technical whitespace-nowrap shadow-xl border ${
                                        isDark
                                          ? 'bg-[#1C1C1C] border-white/20 text-white'
                                          : 'bg-white border-black/20 text-black'
                                      }`}
                                    >
                                      <span className="text-[#E8500A] font-bold mr-1">[{step.key}]</span>
                                      <span>{step.detail}</span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="mb-2">
                        <div
                          className={`font-technical text-[9px] uppercase tracking-[0.2em] mb-2 font-semibold ${
                            isDark ? 'text-[#8A8A8A]' : 'text-[#707070]'
                          }`}
                        >
                          TECH STACK:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.secondaryTags.slice(0, 6).map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className={`font-technical text-[10px] px-2.5 py-1 rounded-[6px] border transition-colors ${
                                isDark
                                  ? 'bg-white/5 border-white/10 text-white/90 hover:border-[#E8500A]/50 hover:text-[#E8500A]'
                                  : 'bg-black/5 border-black/10 text-black/80 hover:border-[#E8500A]/50 hover:text-[#E8500A]'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                          {project.secondaryTags.length > 6 && (
                            <span
                              className={`font-technical text-[10px] px-2 py-1 rounded-[6px] border ${
                                isDark
                                  ? 'bg-white/5 border-white/10 text-[#8A8A8A]'
                                  : 'bg-black/5 border-black/10 text-[#707070]'
                              }`}
                            >
                              +{project.secondaryTags.length - 6}
                            </span>
                          )}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Bottom Action Footer with Repository Links */}
                  <div
                    className={`p-5 pt-3 border-t flex items-center justify-between gap-3 ${
                      isDark ? 'border-white/10 bg-black/20' : 'border-black/5 bg-black/[0.02]'
                    }`}
                  >
                    {/* Direct GitHub Repository Link */}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] border font-technical text-xs font-semibold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] cursor-pointer ${
                        isDark
                          ? 'bg-[#181818] hover:bg-[#222222] border-white/15 text-white hover:border-[#E8500A]'
                          : 'bg-white hover:bg-neutral-100 border-black/15 text-black hover:border-[#E8500A] shadow-sm'
                      }`}
                      title={`Visit ${project.repoName} on GitHub`}
                    >
                      {/* GitHub Icon */}
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>REPO</span>
                      <span className="text-[#E8500A]">↗</span>
                    </a>

                    <div className="flex items-center gap-2">
                      {/* Live Demo Link (if applicable) */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-2 bg-[#E8500A] hover:bg-[#d04506] text-white rounded-[10px] font-technical text-xs font-semibold tracking-wider transition-all shadow-md shadow-[#E8500A]/20 cursor-pointer"
                          title="Open Live App Demo"
                        >
                          <span>LIVE</span>
                          <span>↗</span>
                        </a>
                      )}

                      {/* Modal Quick View */}
                      <button
                        onClick={() => setActiveModalProject(project)}
                        className={`p-2 rounded-[10px] border transition-colors cursor-pointer ${
                          isDark
                            ? 'border-white/10 hover:border-white/30 text-[#8A8A8A] hover:text-white'
                            : 'border-black/10 hover:border-black/30 text-[#606060] hover:text-black'
                        }`}
                        title="View Architecture Specification"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </button>
                    </div>

                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Bottom GitHub Profile Callout */}
        <div
          className={`mt-12 p-6 rounded-[20px] border flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors ${
            isDark
              ? 'bg-[#141414] border-white/10'
              : 'bg-white border-black/10 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-10 h-10 rounded-full bg-[#E8500A]/10 border border-[#E8500A]/30 flex items-center justify-center text-[#E8500A]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </div>
            <div>
              <div
                className={`font-technical text-xs font-bold tracking-wider ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                OPEN SOURCE AI / ML RESEARCH & PRODUCTION CODE
              </div>
              <div
                className={`font-technical text-[11px] ${
                  isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                }`}
              >
                Explore complete git commit history, Jupyter analysis notebooks, and Docker container configurations.
              </div>
            </div>
          </div>

          <a
            href={GITHUB_IDENTITY.githubProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-[#E8500A] hover:bg-[#d04506] text-white rounded-[10px] font-technical text-xs font-semibold tracking-wider transition-all shadow-md shadow-[#E8500A]/20 whitespace-nowrap cursor-pointer"
          >
            VIEW ALL REPOSITORIES ({GITHUB_IDENTITY.totalPublicRepos}+) ↗
          </a>
        </div>

      </motion.div>

      {/* Architecture Detail Modal */}
      <GitHubProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
