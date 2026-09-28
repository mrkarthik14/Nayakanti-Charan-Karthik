import { useState, useEffect } from 'react';
import {
  GitHubPortfolioProject,
  VERIFIED_CACHED_PROJECTS,
  classifyGitHubRepo
} from '../data/githubPortfolio';
import { GITHUB_REPO_OVERRIDES } from '../data/repoOverrides';

const CACHE_STORAGE_KEY = 'nck_github_projects_cache_v2';
const CACHE_TIME_KEY = 'nck_github_projects_cache_time';
const CACHE_TTL_MS = 1000 * 60 * 60; // 1 hour cache

export function useGitHubProjects() {
  const [projects, setProjects] = useState<GitHubPortfolioProject[]>(VERIFIED_CACHED_PROJECTS);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Sep 26, 2026');
  const [isFromCache, setIsFromCache] = useState(true);

  useEffect(() => {
    // 1. Check local storage cache first
    try {
      const stored = localStorage.getItem(CACHE_STORAGE_KEY);
      const storedTime = localStorage.getItem(CACHE_TIME_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          if (storedTime) {
            setLastUpdated(new Date(parseInt(storedTime, 10)).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }));
          }
        }
      }
    } catch (e) {
      console.warn('Could not read cached projects', e);
    }

    // 2. Fetch live data silently and merge with overrides
    async function fetchLiveProjects() {
      setIsLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/mrkarthik14/repos?per_page=100&sort=updated');
        if (!res.ok) {
          // GitHub rate limit or network issue -> stay on verified projects
          setIsLoading(false);
          return;
        }

        const rawRepos = await res.json();
        if (!Array.isArray(rawRepos)) {
          setIsLoading(false);
          return;
        }

        const validRepos = rawRepos.filter((repo: any) => {
          // Exclude profile readme and empty boilerplates
          if (repo.name === 'mrkarthik14') return false;
          if (repo.fork && repo.name === 'Data-Science-For-Beginners') return false;
          if (repo.size === 0 && !repo.description) return false;
          return true;
        });

        const classifiedProjects: GitHubPortfolioProject[] = validRepos.map((repo: any) => {
          const override = GITHUB_REPO_OVERRIDES[repo.name] || {};
          const detectedCategory = classifyGitHubRepo(repo);
          const finalCategory = (override.category || detectedCategory) as GitHubPortfolioProject['primaryCategory'];

          // Fallback to verified project if known
          const existing = VERIFIED_CACHED_PROJECTS.find(p => p.repoName === repo.name);

          const status: GitHubPortfolioProject['status'] = repo.archived
            ? 'ARCHIVED'
            : repo.homepage
            ? 'LIVE'
            : existing?.status || 'COMPLETED';

          return {
            id: repo.name,
            repoName: repo.name,
            name: repo.name,
            displayTitle: override.displayTitle || existing?.displayTitle || repo.name.replace(/[-_]/g, ' '),
            primaryCategory: finalCategory,
            secondaryTags: override.tags || existing?.secondaryTags || [
              repo.language?.toUpperCase() || 'PYTHON',
              finalCategory
            ],
            description: override.shortDescription || existing?.description || repo.description || 'Public technical repository in ' + finalCategory,
            readmeSummary: existing?.readmeSummary || {
              problem: repo.description || 'Engineering and analytical problem solving.',
              approach: 'Structured implementation with verified source code.',
              stack: repo.language || 'Python',
              status: status
            },
            evidence: override.evidence || existing?.evidence || `${repo.stargazers_count} STARS · ${repo.language || 'CODE'} · PUBLIC REPOSITORY`,
            metrics: override.metrics || existing?.metrics || [
              { label: 'Language', value: repo.language || 'Python', highlight: true },
              { label: 'Visibility', value: 'Public' },
              { label: 'Branch', value: repo.default_branch || 'main' }
            ],
            status,
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || override.liveUrl || existing?.liveUrl,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            updatedAt: repo.updated_at ? repo.updated_at.split('T')[0] : '2026-09',
            primaryLanguage: repo.language || 'Python',
            featured: override.featured !== undefined ? override.featured : (existing?.featured ?? false),
            priority: override.priority || existing?.priority || 50,
            visualType: override.visualType || existing?.visualType || 'model'
          };
        });

        // Sort by priority descending
        classifiedProjects.sort((a, b) => b.priority - a.priority);

        if (classifiedProjects.length > 0) {
          setProjects(classifiedProjects);
          setIsFromCache(false);
          const now = Date.now();
          setLastUpdated(new Date(now).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }));
          localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(classifiedProjects));
          localStorage.setItem(CACHE_TIME_KEY, now.toString());
        }
      } catch (err) {
        console.warn('GitHub fetch fell back to cached catalog:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLiveProjects();
  }, []);

  return {
    projects,
    isLoading,
    lastUpdated,
    isFromCache
  };
}
