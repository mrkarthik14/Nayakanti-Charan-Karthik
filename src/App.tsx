import { useState, useCallback, useEffect } from 'react';
import { useTheme } from './context/ThemeContext';
import { Navigation } from './components/Navigation';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Hero3DCanvas } from './components/Hero3DCanvas';
import { HeroSection } from './components/HeroSection';
import { TechStackBand } from './components/TechStackBand';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SelectedWork } from './components/SelectedWork';
import { GitHubLinkedInSection } from './components/GitHubLinkedInSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ProcessSection } from './components/ProcessSection';
import { ManifestoSection } from './components/ManifestoSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';

export default function App() {
  const { isDark } = useTheme();
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');

  // Enforce Hero-First initial landing state (scrollY = 0 on fresh load)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    // Always start at top hero if not navigated via hash link
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleViewWork = useCallback(() => {
    scrollToSection('work');
  }, [scrollToSection]);

  const handleConnect = useCallback(() => {
    scrollToSection('contact');
  }, [scrollToSection]);

  return (
    <div
      id="top"
      className={`min-h-screen relative selection:bg-[#E8500A] selection:text-white transition-colors duration-300 ${
        isDark ? 'bg-[#141414] text-[#F2F0EC]' : 'bg-white text-[#121212]'
      }`}
    >
      {/* 1.5px Orange Scroll Progress Indicator at top of viewport */}
      <ScrollProgressBar />
      {/* Subtle Background Ambience (Section 23: micro grid lines & coordinate telemetry) */}
      <div className={`fixed inset-0 bg-grid-pattern pointer-events-none z-0 transition-opacity ${isDark ? 'opacity-60' : 'opacity-35'}`} />

      {/* Floating Micro Coordinate Telemetry (Quiet technical laboratory feel) */}
      <div
        className={`fixed bottom-3 left-6 z-40 hidden xl:flex items-center gap-4 font-technical text-[10px] pointer-events-none select-none transition-colors ${
          isDark ? 'text-[#8A8A8A]/40' : 'text-black/35'
        }`}
      >
        <span>NCK_SYS: v2.6.4</span>
        <span>•</span>
        <span>LAT: 12.9716° N</span>
        <span>LON: 77.5946° E</span>
        <span>•</span>
        <span>STATE: ACTIVE</span>
      </div>

      {/* Hero 3D Three.js Spatial Environment */}
      <Hero3DCanvas />

      {/* Fixed Navigation Bar */}
      <Navigation onConnectClick={handleConnect} />

      {/* Main Sequential Content Layout */}
      <main className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          onViewWorkClick={handleViewWork}
          onConnectClick={handleConnect}
          onFilterCategory={category => {
            setActiveCategoryFilter(category);
            scrollToSection('work');
          }}
        />

        {/* Orange Tech Stack Band */}
        <TechStackBand />

        {/* 01 / About Section */}
        <AboutSection />

        {/* 02 / Featured AI/ML Engineering Projects Section */}
        <ProjectsSection />

        {/* 03 / Selected Work Grid */}
        <SelectedWork />

        {/* GitHub & LinkedIn Sections */}
        <GitHubLinkedInSection />

        {/* 03 / Capabilities Bento */}
        <CapabilitiesSection />

        {/* 04 / Process Progression */}
        <ProcessSection />

        {/* 05 / Manifesto Principles */}
        <ManifestoSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* NCK.AI Dedicated Portfolio Chatbot */}
      <ChatbotWidget />
    </div>
  );
}
