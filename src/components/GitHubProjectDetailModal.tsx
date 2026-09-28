import React, { useEffect } from 'react';
import { GitHubPortfolioProject } from '../data/githubPortfolio';
import { useTheme } from '../context/ThemeContext';
import { ProjectVisualGraphic } from './ProjectVisualGraphic';

interface GitHubProjectDetailModalProps {
  project: GitHubPortfolioProject | null;
  onClose: () => void;
}

export const GitHubProjectDetailModal: React.FC<GitHubProjectDetailModalProps> = ({
  project,
  onClose
}) => {
  const { isDark } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-github-project-title"
    >
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] border rounded-[22px] shadow-2xl overflow-y-auto flex flex-col p-6 sm:p-8 transition-colors ${
          isDark
            ? 'bg-[#0E0E0E] border-white/20 text-[#F2F0EC]'
            : 'bg-white border-black/15 text-[#121212]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div
          className={`flex items-center justify-between pb-6 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-technical text-xs font-bold text-[#E8500A] tracking-widest uppercase">
              {project.primaryCategory}
            </span>
            <span className={isDark ? 'text-white/20' : 'text-black/20'}>|</span>
            <span
              className={`font-technical text-xs tracking-wider ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              ★ {project.stars} · {project.primaryLanguage}
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-[#8A8A8A] hover:text-white'
                : 'bg-black/5 hover:bg-black/10 text-[#606060] hover:text-black'
            }`}
            aria-label="Close project modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Project Visual Preview Header with Unique Graphic */}
        <div className="mt-6 mb-4">
          <ProjectVisualGraphic
            projectId={project.id}
            category={project.primaryCategory}
            title={project.displayTitle}
            tags={project.secondaryTags}
          />
        </div>

        {/* Title & Status */}
        <div className="my-4">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <h3
              id="modal-github-project-title"
              className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
              }`}
            >
              {project.displayTitle}
            </h3>
            <span
              className={`font-technical text-[10px] tracking-widest px-2.5 py-1 rounded font-semibold inline-flex items-center gap-1.5 ${
                project.status === 'LIVE'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : project.status === 'COMPLETED'
                  ? isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
                  : 'bg-[#E8500A]/20 text-[#E8500A]'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'LIVE' ? 'bg-emerald-400 animate-pulse' : 'bg-[#E8500A]'}`} />
              {project.status}
            </span>
          </div>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
            }`}
          >
            {project.description}
          </p>
        </div>

        {/* Structured README Extraction */}
        {project.readmeSummary && (
          <div
            className={`my-4 p-5 rounded-xl border space-y-3.5 transition-colors ${
              isDark ? 'bg-[#141414] border-white/10' : 'bg-[#F9F9F8] border-black/10'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/5">
              <span className="font-technical text-xs font-bold tracking-widest text-[#E8500A] uppercase">
                README SYNTHESIS &amp; OBJECTIVES
              </span>
              <span className={`font-technical text-[10px] ${isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'}`}>
                EXTRACTED FROM SOURCE
              </span>
            </div>

            {project.readmeSummary.problem && (
              <div className="text-xs">
                <span className="font-technical uppercase font-bold tracking-wider text-[#E8500A] block mb-0.5">
                  PROBLEM
                </span>
                <span className={isDark ? 'text-[#D8D6D0]' : 'text-[#333333]'}>
                  {project.readmeSummary.problem}
                </span>
              </div>
            )}

            {project.readmeSummary.approach && (
              <div className="text-xs">
                <span className="font-technical uppercase font-bold tracking-wider text-[#E8500A] block mb-0.5">
                  APPROACH &amp; METHODOLOGY
                </span>
                <span className={isDark ? 'text-[#D8D6D0]' : 'text-[#333333]'}>
                  {project.readmeSummary.approach}
                </span>
              </div>
            )}

            {project.readmeSummary.stack && (
              <div className="text-xs">
                <span className="font-technical uppercase font-bold tracking-wider text-[#E8500A] block mb-0.5">
                  TECH STACK
                </span>
                <span className={isDark ? 'text-[#D8D6D0]' : 'text-[#333333]'}>
                  {project.readmeSummary.stack}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Quantified Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="my-4">
            <h4
              className={`font-technical text-xs tracking-[0.2em] uppercase mb-3 ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              VERIFIED REPOSITORY METRICS
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map(m => (
                <div
                  key={m.label}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isDark ? 'bg-[#141414] border-white/5' : 'bg-[#F9F9F8] border-black/10'
                  }`}
                >
                  <div
                    className={`font-technical text-[10px] uppercase truncate mb-1 ${
                      isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                    }`}
                  >
                    {m.label}
                  </div>
                  <div
                    className={`text-base sm:text-lg font-bold font-technical ${
                      m.highlight ? 'text-[#E8500A]' : isDark ? 'text-white' : 'text-black'
                    }`}
                  >
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technology Chips */}
        <div className="my-4">
          <h4
            className={`font-technical text-xs tracking-[0.2em] uppercase mb-3 ${
              isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
            }`}
          >
            SECONDARY TAGS &amp; SIGNALS
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.secondaryTags.map(tag => (
              <span
                key={tag}
                className={`font-technical text-xs px-3 py-1 rounded-md border transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-[#F2F0EC]'
                    : 'bg-black/5 border-black/10 text-[#141414]'
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Bottom Bar */}
        <div
          className={`mt-6 pt-6 border-t flex items-center justify-between gap-3 flex-wrap ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div className={`font-technical text-xs ${isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'}`}>
            Updated: {project.updatedAt}
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-technical text-xs font-semibold tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <span>LIVE DEMO</span>
                <span>↗</span>
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`px-4 py-2 rounded-xl font-technical text-xs font-semibold tracking-wider transition-colors inline-flex items-center gap-2 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-[#F2F0EC]'
                  : 'bg-black/5 hover:bg-black/10 text-[#141414]'
              }`}
            >
              <span>VIEW SOURCE</span>
              <span>↗</span>
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#E8500A] hover:bg-[#d04506] text-white font-technical text-xs font-semibold tracking-wider transition-colors cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
