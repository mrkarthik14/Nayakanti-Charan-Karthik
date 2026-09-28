import React, { useState, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useGitHubProjects } from '../hooks/useGitHubProjects';
import { GitHubPortfolioProject, GITHUB_IDENTITY } from '../data/githubPortfolio';
import { GitHubProjectDetailModal } from './GitHubProjectDetailModal';
import { ProjectVisualGraphic } from './ProjectVisualGraphic';
import { useTheme } from '../context/ThemeContext';

export const SelectedWork: React.FC = () => {
  const { projects, lastUpdated } = useGitHubProjects();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedTech, setSelectedTech] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAllProjects, setShowAllProjects] = useState<boolean>(false);
  const [activeModalProject, setActiveModalProject] = useState<GitHubPortfolioProject | null>(null);
  const { isDark } = useTheme();

  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Entrance animations using Framer Motion useScroll & useTransform (restrained to 24px)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.72']
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [24, 0]);

  // Main Categories
  const categoryTabs = [
    { label: 'ALL (TOP 6)', id: 'ALL' },
    { label: 'DATA SCIENCE', id: 'DATA SCIENCE' },
    { label: 'DATA ANALYTICS', id: 'DATA ANALYTICS' },
    { label: 'ML', id: 'MACHINE LEARNING' },
    { label: 'DL', id: 'DEEP LEARNING' },
    { label: 'DATA ENGINEERING', id: 'DATA ENGINEERING' }
  ];

  // The 6 top prioritized projects across distinct domains
  const top6ProjectIds = [
    'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',     // Data Science (CUPED / A/B testing)
    'retail-bigquery-analytics',                                    // Data Analytics (Google BigQuery SQL / RFM)
    'telco-churn-prediction-customer-churn-prediction',            // Machine Learning (End-to-End Classification / FastAPI)
    'retail-data-pipeline-adf-sqlserver-snowflake',                // Data Engineering (ADF / SQL Server / Snowflake)
    'SomnoVision',                                                  // Deep Learning (Computer Vision Sleep Apnea)
    'ICC-T20-World-Cup-2022-Player-Performance-Analytics-Dashboard' // Sports Analytics (Power BI / DAX Star Schema)
  ];

  // Base list depending on whether user clicked "Show all" or stays on top 6
  const baseProjects = useMemo(() => {
    if (showAllProjects || searchQuery.trim() || selectedTech !== 'ALL' || selectedCategory !== 'ALL') {
      return projects;
    }
    // Default: Top 6 flagship projects
    return top6ProjectIds
      .map(id => projects.find(p => p.id === id || p.repoName === id))
      .filter((p): p is GitHubPortfolioProject => p !== undefined);
  }, [projects, showAllProjects, searchQuery, selectedTech, selectedCategory]);

  // Dynamically extract available technologies
  const availableTechnologies = useMemo(() => {
    const prominentOrder = [
      'PYTHON',
      'SQL',
      'PANDAS',
      'SCIKIT-LEARN',
      'POWER BI',
      'GOOGLE BIGQUERY',
      'AZURE DATA FACTORY',
      'SNOWFLAKE',
      'STREAMLIT',
      'OPENCV'
    ];
    return prominentOrder;
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return baseProjects.filter(p => {
      // 1. Category Filter
      if (selectedCategory !== 'ALL' && p.primaryCategory !== selectedCategory) {
        return false;
      }
      // 2. Tech Filter
      if (selectedTech !== 'ALL') {
        const matchesTag = p.secondaryTags.some(t => t.toUpperCase() === selectedTech.toUpperCase());
        const matchesLang = p.primaryLanguage.toUpperCase() === selectedTech.toUpperCase();
        if (!matchesTag && !matchesLang) return false;
      }
      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inTitle = p.displayTitle.toLowerCase().includes(q);
        const inDesc = p.description.toLowerCase().includes(q);
        const inTags = p.secondaryTags.some(t => t.toLowerCase().includes(q));
        const inRepo = p.repoName.toLowerCase().includes(q);
        if (!inTitle && !inDesc && !inTags && !inRepo) {
          return false;
        }
      }
      return true;
    });
  }, [baseProjects, selectedCategory, selectedTech, searchQuery]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className={`relative py-24 md:py-32 border-t transition-colors ${
        isDark ? 'bg-[#121212] border-white/10' : 'bg-white border-black/10'
      }`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { opacity, y }}
        className="max-w-[1440px] mx-auto px-6 md:px-12"
      >
        {/* ========================================================
            1. SECTION HEADER & GITHUB IDENTITY PANEL
            ======================================================== */}
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between mb-10 pb-8 border-b gap-8 ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="font-technical text-xs tracking-[0.25em] text-[#E8500A] uppercase font-bold">
                02 / PROJECTS
              </span>
              <span className={isDark ? 'text-white/20' : 'text-black/20'}>|</span>
              <span
                className={`font-technical text-xs tracking-widest ${
                  isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                }`}
              >
                TOP 6 FLAGSHIP SYSTEMS &amp; EXPERIMENTS
              </span>
            </div>
            <h2
              className={`text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[0.98] select-none ${
                isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
              }`}
            >
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                PROJECTS FROM
              </motion.span>
              <motion.span
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
                whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                REPOSITORIES TO REAL SYSTEMS.
              </motion.span>
            </h2>
          </div>

          {/* GitHub Identity Card */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-all max-w-md w-full flex items-center justify-between gap-4 ${
              isDark ? 'bg-[#0D0D0D] border-white/10' : 'bg-[#F9F9F8] border-black/10 shadow-sm'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E8500A] text-white flex items-center justify-center font-technical font-black text-xs">
                NCK
              </div>
              <div>
                <div className="font-bold text-sm leading-tight flex items-center gap-2">
                  <span>{GITHUB_IDENTITY.name}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected" />
                </div>
                <div
                  className={`font-technical text-[11px] ${
                    isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                  }`}
                >
                  GitHub: {GITHUB_IDENTITY.publicDisplayHandle}
                </div>
                <div className="font-technical text-[10px] text-[#E8500A] mt-0.5">
                  PROJECT DATA UPDATED: {lastUpdated}
                </div>
              </div>
            </div>

            <a
              href={GITHUB_IDENTITY.githubProfileUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#E8500A] hover:bg-[#d04506] text-white font-technical text-[11px] font-bold tracking-wider inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
            >
              <span>OPEN GITHUB</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* ========================================================
            2. SEARCH & DUAL-ROW FILTER SYSTEM
            ======================================================== */}
        <div className="space-y-4 mb-10">
          {/* Row 1: Search Input + Live Stats */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm opacity-50">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="SEARCH PROJECTS (e.g. BigQuery, A/B Testing, Churn, ADF)..."
                className={`w-full pl-9 pr-4 py-2.5 rounded-xl font-technical text-xs border transition-colors focus:outline-none focus:border-[#E8500A] ${
                  isDark
                    ? 'bg-[#0E0E0E] border-white/10 text-white placeholder-white/40'
                    : 'bg-[#F7F7F6] border-black/10 text-black placeholder-black/40'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs opacity-50 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>

            <div
              className={`font-technical text-xs tracking-wider flex items-center gap-3 ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              <span>
                SHOWING: <strong className="text-[#E8500A]">{filteredProjects.length}</strong>{' '}
                {showAllProjects ? 'PROJECTS (ALL)' : 'TOP PROJECTS'}
              </span>
              <span>•</span>
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="underline hover:text-[#E8500A] transition-colors cursor-pointer"
              >
                {showAllProjects ? 'SHOW TOP 6 ONLY' : `VIEW ALL (${projects.length})`}
              </button>
            </div>
          </div>

          {/* Row 2: Category Filter Tabs */}
          <div
            className={`flex items-center gap-1.5 p-1 rounded-xl overflow-x-auto max-w-full border ${
              isDark ? 'bg-[#0D0D0D] border-white/10' : 'bg-[#F2F0EC] border-black/10'
            }`}
          >
            {categoryTabs.map(tab => {
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-3 py-1.5 rounded-lg font-technical text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap inline-flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#E8500A] text-white font-bold shadow-md shadow-[#E8500A]/20'
                      : isDark
                      ? 'text-[#8A8A8A] hover:text-[#F2F0EC] hover:bg-white/5'
                      : 'text-[#606060] hover:text-[#141414] hover:bg-black/5'
                  }`}
                >
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Row 3: Technology Filters */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
            <span
              className={`font-technical text-[10px] tracking-widest uppercase font-semibold whitespace-nowrap ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              TECH:
            </span>
            <button
              onClick={() => setSelectedTech('ALL')}
              className={`px-2.5 py-1 rounded-md font-technical text-[10px] uppercase tracking-wider border transition-colors whitespace-nowrap cursor-pointer ${
                selectedTech === 'ALL'
                  ? 'bg-[#E8500A]/20 border-[#E8500A] text-[#E8500A] font-bold'
                  : isDark
                  ? 'bg-white/5 border-white/5 text-[#8A8A8A] hover:text-white'
                  : 'bg-black/5 border-black/5 text-[#606060] hover:text-black'
              }`}
            >
              ALL
            </button>
            {availableTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => setSelectedTech(selectedTech === tech ? 'ALL' : tech)}
                className={`px-2.5 py-1 rounded-md font-technical text-[10px] uppercase tracking-wider border transition-colors whitespace-nowrap cursor-pointer ${
                  selectedTech === tech
                    ? 'bg-[#E8500A] border-[#E8500A] text-white font-bold'
                    : isDark
                    ? 'bg-white/5 border-white/5 text-[#8A8A8A] hover:text-white'
                    : 'bg-black/5 border-black/5 text-[#606060] hover:text-black'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            3. TOP PROJECTS GRID (EACH WITH A UNIQUE GRAPHIC IMAGE)
            ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, pIdx) => (
            <motion.div
              key={project.id}
              onClick={() => setActiveModalProject(project)}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.55, delay: pIdx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className={`group rounded-2xl border p-5 sm:p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden ${
                isDark
                  ? 'bg-[#0E0E0E] border-white/10 hover:border-white/30 shadow-lg shadow-black/40'
                  : 'bg-white border-black/10 hover:border-black/30 shadow-md shadow-black/5'
              }`}
            >
              {/* Top Unique Visual Graphic Preview */}
              <div className="mb-4">
                <ProjectVisualGraphic
                  projectId={project.id}
                  category={project.primaryCategory}
                  title={project.displayTitle}
                  tags={project.secondaryTags}
                />
              </div>

              {/* Card Content */}
              <div>
                {/* Status & Category */}
                <div className="flex items-center justify-between mb-2">
                  <span className="font-technical text-[10px] font-bold text-[#E8500A] tracking-widest uppercase">
                    {project.primaryCategory}
                  </span>
                  <span
                    className={`font-technical text-[9px] tracking-wider px-2 py-0.5 rounded font-semibold inline-flex items-center gap-1.5 ${
                      project.status === 'LIVE'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : project.status === 'COMPLETED'
                        ? isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
                        : 'bg-[#E8500A]/20 text-[#E8500A]'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'LIVE' ? 'bg-emerald-400' : 'bg-[#E8500A]'}`} />
                    {project.status}
                  </span>
                </div>

                {/* Title */}
                <h4
                  className={`text-lg sm:text-xl font-bold tracking-tight leading-snug mb-2 transition-colors ${
                    isDark ? 'text-white group-hover:text-[#E8500A]' : 'text-black group-hover:text-[#E8500A]'
                  }`}
                >
                  {project.displayTitle}
                </h4>

                {/* Short Description */}
                <p
                  className={`text-xs leading-relaxed mb-4 line-clamp-3 ${
                    isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
                  }`}
                >
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Evidence + Tags + Actions */}
              <div
                className={`pt-4 border-t ${
                  isDark ? 'border-white/10' : 'border-black/10'
                }`}
              >
                {/* Evidence Line */}
                <div
                  className={`font-technical text-[10px] font-semibold tracking-wider mb-3 truncate ${
                    isDark ? 'text-white/70' : 'text-black/70'
                  }`}
                >
                  {project.evidence}
                </div>

                {/* Secondary Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.secondaryTags.slice(0, 4).map(tag => (
                    <span
                      key={tag}
                      className={`font-technical text-[9px] tracking-wider px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-white/5 border-white/5 text-[#8A8A8A] group-hover:text-white'
                          : 'bg-black/5 border-black/5 text-[#606060] group-hover:text-black'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                  {project.secondaryTags.length > 4 && (
                    <span className="font-technical text-[9px] opacity-50">
                      +{project.secondaryTags.length - 4}
                    </span>
                  )}
                </div>

                {/* Link Row */}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-technical text-xs font-bold text-[#E8500A] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    DETAILS &amp; METRICS →
                  </span>

                  <div className="flex items-center gap-2">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="font-technical text-[10px] text-emerald-400 hover:underline inline-flex items-center gap-0.5"
                      >
                        LIVE DEMO ↗
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={e => e.stopPropagation()}
                      className={`font-technical text-[10px] hover:text-[#E8500A] ${
                        isDark ? 'text-white/60' : 'text-black/60'
                      }`}
                    >
                      GITHUB ↗
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state if search finds nothing */}
        {filteredProjects.length === 0 && (
          <div
            className={`p-12 text-center rounded-2xl border ${
              isDark ? 'bg-[#0E0E0E] border-white/10' : 'bg-[#F9F9F8] border-black/10'
            }`}
          >
            <div className="text-3xl mb-2">🔍</div>
            <h4 className="font-bold text-lg mb-1">No Projects Found</h4>
            <p className={`text-xs mb-4 ${isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'}`}>
              No repositories matched your query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
                setSelectedTech('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-[#E8500A] text-white font-technical text-xs font-bold cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        )}

        {/* Toggle between Top 6 and All Projects + GitHub Link */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className={`px-6 py-3.5 rounded-full font-technical text-xs font-bold tracking-wider uppercase border transition-all cursor-pointer ${
              showAllProjects
                ? isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-black/10 border-black/20 text-black'
                : 'border-[#E8500A] text-[#E8500A] hover:bg-[#E8500A] hover:text-white'
            }`}
          >
            {showAllProjects ? 'SHOW TOP 6 PROJECTS ONLY' : `EXPAND ALL ${projects.length} PROJECTS`}
          </button>

          <a
            href={GITHUB_IDENTITY.githubProfileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#E8500A] hover:bg-[#d04506] text-white font-technical text-xs font-bold tracking-widest uppercase transition-all shadow-lg shadow-[#E8500A]/20 cursor-pointer"
          >
            <span>VIEW REPOSITORIES ON GITHUB</span>
            <span>→</span>
          </a>
        </div>
      </motion.div>

      {/* GitHub Project Detail Modal */}
      <GitHubProjectDetailModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
