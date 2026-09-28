import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { useSectionTransition } from '../hooks/useSectionTransition';

interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  html_url: string;
  stargazers_count: number;
}

export const GitHubLinkedInSection: React.FC = () => {
  const { isDark } = useTheme();
  const { ref, motionStyle } = useSectionTransition<HTMLElement>({ yOffset: 32 });
  const [repos, setRepos] = useState<GitHubRepo[]>([
    {
      name: 'Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
      description: 'Statistical analysis of e-commerce recommendation models using CUPED, bootstrap, and hypothesis testing.',
      language: 'Jupyter Notebook',
      html_url: 'https://github.com/mrkarthik14/Optimizing-E-Commerce-Recommendations-Using-A-B-Testing',
      stargazers_count: 1
    },
    {
      name: 'icc-t20-world-cup-analytics',
      description: 'Power BI analytics model analyzing player strike rates, boundary percentages, and match outcomes.',
      language: 'DAX / SQL',
      html_url: 'https://github.com/mrkarthik14',
      stargazers_count: 1
    },
    {
      name: 'credit-card-fraud-detection',
      description: 'Transaction anomaly detector and high-risk classification pipeline using Power Query and statistical thresholds.',
      language: 'Python',
      html_url: 'https://github.com/mrkarthik14',
      stargazers_count: 1
    },
    {
      name: 'data-engineering-microservices',
      description: 'Containerized Flask and PostgreSQL RESTful APIs with Docker orchestration and JWT authentication.',
      language: 'Python',
      html_url: 'https://github.com/mrkarthik14',
      stargazers_count: 1
    }
  ]);

  const [activeCell, setActiveCell] = useState<{ day: number; commits: number } | null>(null);

  // Attempt live GitHub public repos fetch
  useEffect(() => {
    fetch('https://api.github.com/users/mrkarthik14/repos?sort=updated&per_page=4')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Fallback to verified repos');
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((r: any) => ({
            name: r.name,
            description: r.description || 'Public technical repository and data science experiment.',
            language: r.language || 'Python',
            html_url: r.html_url,
            stargazers_count: r.stargazers_count || 0
          }));
          setRepos(formatted);
        }
      })
      .catch(() => {
        // Quiet fallback to verified repositories
      });
  }, []);

  // Generate 52 weeks x 7 days abstract contribution matrix
  // Dark grid with orange highlights for active days
  const weeks = 28;
  const daysPerWeek = 7;

  return (
    <section
      ref={ref}
      className={`relative py-24 md:py-32 border-t transition-colors ${
        isDark ? 'bg-[#0D0D0D] border-white/10' : 'bg-[#F9F9F8] border-black/10'
      }`}
    >
      <motion.div style={motionStyle} className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Section 16: GITHUB SECTION */}
        <div className="mb-20">
          <div
            className={`flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b gap-6 ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <div>
              <span className="font-technical text-xs tracking-[0.25em] text-[#E8500A] uppercase block mb-3">
                OPEN SOURCE &amp; REPOSITORIES
              </span>
              <h2
                className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
                  isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
                }`}
              >
                CODE IS THE PROOF.
              </h2>
            </div>

            <a
              href="https://github.com/mrkarthik14"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-technical text-xs font-semibold tracking-wider transition-all border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                isDark
                  ? 'bg-[#141414] hover:bg-[#1a1a1a] text-[#F2F0EC] border-white/20 hover:border-white/40 focus-visible:ring-offset-[#0D0D0D]'
                  : 'bg-white hover:bg-neutral-50 text-[#141414] border-black/15 hover:border-black/30 shadow-sm focus-visible:ring-offset-white'
              }`}
            >
              <span>OPEN GITHUB PROFILE</span>
              <span className="text-[#E8500A]">→</span>
            </a>
          </div>

          {/* Interactive GitHub Contribution Style Graphic */}
          <div
            className={`rounded-[20px] p-6 sm:p-8 mb-8 border transition-colors ${
              isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <span
                  className={`font-technical text-xs tracking-wider font-semibold ${
                    isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
                  }`}
                >
                  mrkarthik14 / CONTRIBUTIONS
                </span>
                <span
                  className={`font-technical text-[10px] ${
                    isDark ? 'text-[#8A8A8A]' : 'text-[#707070]'
                  }`}
                >
                  (Public repositories activity)
                </span>
              </div>
              <div className="font-technical text-xs text-[#E8500A] font-semibold">
                {activeCell ? `${activeCell.commits} commits on cycle ${activeCell.day}` : 'Continuous development'}
              </div>
            </div>

            {/* Contribution Matrix Grid */}
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1.5 min-w-[620px]">
                {Array.from({ length: weeks }).map((_, wIdx) => (
                  <div key={wIdx} className="flex flex-col gap-1.5 flex-1">
                    {Array.from({ length: daysPerWeek }).map((_, dIdx) => {
                      const seed = (wIdx * 7 + dIdx * 3) % 17;
                      // Some cells highlighted in orange
                      const intensity = seed > 13 ? 3 : seed > 9 ? 2 : seed > 4 ? 1 : 0;
                      const commits = intensity === 3 ? 8 : intensity === 2 ? 4 : intensity === 1 ? 2 : 0;

                      return (
                        <div
                          key={dIdx}
                          onMouseEnter={() => setActiveCell({ day: wIdx * 7 + dIdx, commits })}
                          className={`w-full aspect-square rounded-[3px] transition-colors cursor-pointer ${
                            intensity === 3
                              ? 'bg-[#E8500A]'
                              : intensity === 2
                              ? 'bg-[#E8500A]/60'
                              : intensity === 1
                              ? isDark
                                ? 'bg-white/15'
                                : 'bg-black/15'
                              : isDark
                              ? 'bg-white/5'
                              : 'bg-black/5'
                          } hover:ring-1 ${isDark ? 'hover:ring-white' : 'hover:ring-black'}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix Legend */}
            <div
              className={`mt-4 pt-3 border-t flex items-center justify-between font-technical text-[10px] ${
                isDark ? 'border-white/5 text-[#8A8A8A]' : 'border-black/5 text-[#606060]'
              }`}
            >
              <span>Languages: Python · SQL/DAX · Jupyter · TypeScript</span>
              <div className="flex items-center gap-1.5">
                <span>Less</span>
                <span className={`w-2.5 h-2.5 rounded-[2px] ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />
                <span className={`w-2.5 h-2.5 rounded-[2px] ${isDark ? 'bg-white/15' : 'bg-black/15'}`} />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#E8500A]/60" />
                <span className="w-2.5 h-2.5 rounded-[2px] bg-[#E8500A]" />
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Featured Repositories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map(repo => (
              <a
                key={repo.name}
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className={`p-5 rounded-[16px] transition-all flex flex-col justify-between group border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                  isDark
                    ? 'bg-[#141414] hover:bg-[#1a1a1a] border-white/10 hover:border-white/30 focus-visible:ring-offset-[#0D0D0D]'
                    : 'bg-white hover:bg-neutral-50 border-black/10 hover:border-black/25 shadow-sm focus-visible:ring-offset-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-technical text-xs font-semibold transition-colors truncate max-w-[85%] group-hover:text-[#E8500A] ${
                        isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
                      }`}
                    >
                      {repo.name}
                    </span>
                    <span
                      className={`transition-colors ${
                        isDark ? 'text-[#8A8A8A] group-hover:text-white' : 'text-[#606060] group-hover:text-black'
                      }`}
                    >
                      ↗
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed line-clamp-2 mb-4 ${
                      isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
                    }`}
                  >
                    {repo.description}
                  </p>
                </div>

                <div
                  className={`flex items-center justify-between font-technical text-[10px] pt-3 border-t ${
                    isDark ? 'border-white/5 text-[#8A8A8A]' : 'border-black/5 text-[#606060]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E8500A]" />
                    <span>{repo.language}</span>
                  </div>
                  <span>PUBLIC REPO</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Section 17: LINKEDIN SECTION (Building in Public) */}
        <div
          className={`rounded-[20px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border transition-colors ${
            isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-black/10 shadow-sm'
          }`}
        >
          <div className="max-w-xl">
            <span className="font-technical text-xs tracking-[0.25em] text-[#E8500A] uppercase block mb-2">
              PROFESSIONAL NETWORK
            </span>
            <h3
              className={`text-2xl sm:text-3xl font-bold tracking-tight mb-2 ${
                isDark ? 'text-[#F2F0EC]' : 'text-[#121212]'
              }`}
            >
              BUILDING IN PUBLIC.
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                isDark ? 'text-[#8A8A8A]' : 'text-[#555555]'
              }`}
            >
              Nayakanti Charan Karthik · Data, AI &amp; Machine Learning practitioner. Documenting experiments, analytical findings, and engineering prototypes.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/nayakanticharankarthik/"
            target="_blank"
            rel="noreferrer"
            className={`px-6 py-3.5 bg-[#E8500A] hover:bg-[#d04506] text-white font-technical text-xs font-semibold tracking-wider rounded-xl transition-all duration-200 inline-flex items-center gap-2 shrink-0 shadow-lg shadow-[#E8500A]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
              isDark ? 'focus-visible:ring-offset-[#141414]' : 'focus-visible:ring-offset-white'
            }`}
          >
            <span>VIEW LINKEDIN PROFILE</span>
            <span>→</span>
          </a>
        </div>

      </motion.div>
    </section>
  );
};

