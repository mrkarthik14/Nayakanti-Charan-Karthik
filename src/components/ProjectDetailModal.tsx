import React, { useEffect } from 'react';
import { Project } from '../types';
import { useTheme } from '../context/ThemeContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
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
      aria-labelledby="modal-project-title"
    >
      <div
        className={`relative w-full max-w-3xl max-h-[90vh] border rounded-[20px] shadow-2xl overflow-y-auto flex flex-col p-6 sm:p-8 transition-colors ${
          isDark
            ? 'bg-[#0D0D0D] border-white/20 text-[#F2F0EC]'
            : 'bg-white border-black/15 text-[#121212]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Bar with Number, Category & Close Button */}
        <div
          className={`flex items-center justify-between pb-6 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="font-technical text-sm font-bold text-[#E8500A]">
              PROJECT {project.number}
            </span>
            <span className={isDark ? 'text-white/20' : 'text-black/20'}>|</span>
            <span
              className={`font-technical text-xs tracking-wider uppercase ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              {project.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-[#8A8A8A] hover:text-white focus-visible:ring-offset-[#0D0D0D]'
                : 'bg-black/5 hover:bg-black/10 text-[#606060] hover:text-black focus-visible:ring-offset-white'
            }`}
            aria-label="Close project modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Project Title & Status */}
        <div className="mt-6 mb-4">
          <div className="flex items-center gap-3 mb-2">
            <h3
              id="modal-project-title"
              className={`text-2xl sm:text-3xl font-bold tracking-tight ${
                isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
              }`}
            >
              {project.title}
            </h3>
            <span
              className={`font-technical text-[10px] tracking-widest px-2.5 py-1 rounded font-semibold ${
                project.status === 'COMPLETED'
                  ? isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
                  : project.status === 'PRODUCTION'
                  ? 'bg-[#E8500A]/20 text-[#E8500A]'
                  : 'bg-amber-950 text-amber-300'
              }`}
            >
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

        {/* Evidence Banner */}
        <div
          className={`p-4 rounded-xl border my-4 flex items-center justify-between flex-wrap gap-2 transition-colors ${
            isDark
              ? 'bg-[#141414] border-white/10'
              : 'bg-[#F7F7F6] border-black/10'
          }`}
        >
          <span
            className={`font-technical text-xs tracking-widest uppercase ${
              isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
            }`}
          >
            DOCUMENTED EVIDENCE:
          </span>
          <span
            className={`font-technical text-xs font-semibold tracking-wider ${
              isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
            }`}
          >
            {project.evidence}
          </span>
        </div>

        {/* Key Quantified Results */}
        <div className="my-4">
          <h4
            className={`font-technical text-xs tracking-[0.2em] uppercase mb-3 ${
              isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
            }`}
          >
            VERIFIED METRICS &amp; IMPACT
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {project.keyResults.map(res => (
              <div
                key={res.label}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isDark
                    ? 'bg-[#141414] border-white/5'
                    : 'bg-[#F9F9F8] border-black/10'
                }`}
              >
                <div
                  className={`font-technical text-[10px] uppercase truncate mb-1 ${
                    isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                  }`}
                >
                  {res.label}
                </div>
                <div
                  className={`text-lg font-bold font-technical ${
                    res.highlight ? 'text-[#E8500A]' : isDark ? 'text-white' : 'text-black'
                  }`}
                >
                  {res.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistical / Engineering Methodology */}
        {project.methodology && project.methodology.length > 0 && (
          <div className="my-4">
            <h4
              className={`font-technical text-xs tracking-[0.2em] uppercase mb-3 ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
              }`}
            >
              METHODOLOGY &amp; ANALYSIS PROTOCOL
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.methodology.map(item => (
                <li
                  key={item}
                  className={`font-technical text-xs flex items-start gap-2 p-2.5 rounded-lg border transition-colors ${
                    isDark
                      ? 'bg-[#141414]/60 text-[#F2F0EC]/90 border-white/5'
                      : 'bg-[#F8F8F6] text-[#222222] border-black/10'
                  }`}
                >
                  <span className="text-[#E8500A] font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Code Snippet Preview (if available) */}
        {project.codeSnippet && (
          <div className="my-4">
            <div className="flex items-center justify-between mb-2">
              <span
                className={`font-technical text-xs tracking-wider ${
                  isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
                }`}
              >
                CODE EXCERPT: {project.codeSnippet.filename}
              </span>
              <span className="font-technical text-[10px] uppercase text-[#E8500A] font-semibold">
                {project.codeSnippet.language}
              </span>
            </div>
            <pre
              className={`p-4 rounded-xl border font-technical text-xs overflow-x-auto leading-relaxed transition-colors ${
                isDark
                  ? 'bg-[#141414] border-white/10 text-[#F2F0EC]'
                  : 'bg-[#F5F5F3] border-black/10 text-[#141414]'
              }`}
            >
              <code>{project.codeSnippet.code}</code>
            </pre>
          </div>
        )}

        {/* Technologies Used */}
        <div className="my-4">
          <h4
            className={`font-technical text-xs tracking-[0.2em] uppercase mb-3 ${
              isDark ? 'text-[#8A8A8A]' : 'text-[#606060]'
            }`}
          >
            TECHNICAL TOOLS &amp; LIBRARIES
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tools.map(tool => (
              <span
                key={tool}
                className={`font-technical text-xs px-3 py-1 rounded-md border transition-colors ${
                  isDark
                    ? 'bg-white/5 border-white/10 text-[#F2F0EC]'
                    : 'bg-black/5 border-black/10 text-[#141414]'
                }`}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Bottom Bar */}
        <div
          className={`mt-6 pt-6 border-t flex items-center justify-end gap-3 ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className={`px-5 py-2.5 rounded-xl font-technical text-xs font-semibold tracking-wider transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-[#F2F0EC] focus-visible:ring-offset-[#0D0D0D]'
                  : 'bg-black/5 hover:bg-black/10 text-[#141414] focus-visible:ring-offset-white'
              }`}
            >
              <span>INSPECT GITHUB SOURCE</span>
              <span>↗</span>
            </a>
          )}
          <button
            onClick={onClose}
            className={`px-5 py-2.5 rounded-xl bg-[#E8500A] hover:bg-[#d04506] text-white font-technical text-xs font-semibold tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
              isDark ? 'focus-visible:ring-offset-[#0D0D0D]' : 'focus-visible:ring-offset-white'
            }`}
          >
            CLOSE INSPECTION
          </button>
        </div>
      </div>
    </div>
  );
};

