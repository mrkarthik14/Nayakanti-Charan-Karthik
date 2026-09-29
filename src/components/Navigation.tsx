import React, { useState, useEffect } from 'react';
import { BrandLogoMark } from './BrandLogoMark';
import { useTheme } from '../context/ThemeContext';

interface NavigationProps {
  onConnectClick: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ onConnectClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Scrollspy active section with priority check
      const sections = ['contact', 'process', 'capabilities', 'work', 'projects', 'about', 'hero'];
      const scrollPos = window.scrollY + 220;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'STACK', href: '#stack', id: 'stack' },
    { label: 'PROCESS', href: '#process', id: 'process' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'py-3 bg-[#0D0D0D]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20'
            : 'py-3 bg-white/90 backdrop-blur-md border-b border-black/10 shadow-md shadow-black/5'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Zone 1: NCK Brand Identity */}
        <a
          href="#top"
          className={`flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 rounded-lg ${
            isDark ? 'focus-visible:ring-offset-[#0D0D0D]' : 'focus-visible:ring-offset-white'
          }`}
          aria-label="NCK - Home"
        >
          <BrandLogoMark height={30} />
          <span className="font-technical text-sm font-bold tracking-[0.25em] transition-colors hidden sm:inline-block">
            <span className="text-[#FF7700]">N</span>
            <span className="text-[#FFFFFF]">C</span>
            <span className="text-[#999999] group-hover:text-white transition-colors">K</span>
          </span>
        </a>

        {/* Zone 2: 4 Primary Nav Links with Active Indicator (● ORANGE DOT) */}
        <nav className="hidden md:flex items-center gap-8 font-technical text-xs tracking-[0.18em]">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 px-1.5 rounded transition-all duration-200 whitespace-nowrap inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                  isDark
                    ? isActive
                      ? 'text-white font-medium'
                      : 'text-[#8A8A8A] hover:text-[#F2F0EC]'
                    : isActive
                    ? 'text-[#141414] font-bold'
                    : 'text-[#606060] hover:text-[#141414]'
                } ${isDark ? 'focus-visible:ring-offset-[#0D0D0D]' : 'focus-visible:ring-offset-white'}`}
              >
                {/* Active indicator dot (Transition: 150-250ms) */}
                <span
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    isActive ? 'bg-[#E8500A] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0'
                  }`}
                />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onConnectClick}
            className={`hidden sm:inline-flex items-center gap-2 px-4 py-2 font-technical text-xs font-semibold tracking-wider text-white bg-[#E8500A] hover:bg-[#d04506] active:scale-[0.98] rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer ${
              isDark ? 'focus-visible:ring-offset-[#0D0D0D]' : 'focus-visible:ring-offset-white'
            }`}
          >
            <span>LET&apos;S CONNECT</span>
            <span aria-hidden="true">→</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
              isDark
                ? 'text-[#8A8A8A] hover:text-white focus-visible:ring-offset-[#0D0D0D]'
                : 'text-[#606060] hover:text-[#141414] focus-visible:ring-offset-white'
            }`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 transition-all duration-200 ${
            isDark ? 'bg-[#0D0D0D] border-white/10' : 'bg-white border-black/10 shadow-lg'
          }`}
        >
          <nav className="flex flex-col gap-4 font-technical text-sm tracking-wider">
            {navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 px-2 rounded flex items-center justify-between border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
                    isDark
                      ? 'text-[#8A8A8A] hover:text-white border-white/5 focus-visible:ring-offset-[#0D0D0D]'
                      : 'text-[#606060] hover:text-black border-black/5 focus-visible:ring-offset-white'
                  }`}
                >
                  <span className={isActive ? 'text-[#E8500A] font-bold' : ''}>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#E8500A]" />}
                </a>
              );
            })}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onConnectClick();
                }}
                className="w-full py-3 text-center bg-[#E8500A] hover:bg-[#d04506] text-white font-technical text-xs font-semibold tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                LET&apos;S CONNECT →
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
