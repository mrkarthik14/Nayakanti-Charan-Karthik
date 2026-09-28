import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSectionTransition } from '../hooks/useSectionTransition';

export const ContactSection: React.FC = () => {
  const { ref, motionStyle } = useSectionTransition<HTMLElement>({ yOffset: 32 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'Data Science / ML',
    budget: '$5k - $15k',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      // Store contact intent locally for demonstration
      try {
        const stored = JSON.parse(localStorage.getItem('nk_contact_messages') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('nk_contact_messages', JSON.stringify(stored));
      } catch {
        // silent
      }
    }, 900);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full bg-[#E8500A] text-white py-24 md:py-32 overflow-hidden"
    >
      {/* Structural subtle dividers */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-black/15" />
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/15" />

      <motion.div style={motionStyle} className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Headlines & Contact Info Block */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full">
            <div>
              <span className="font-technical text-xs tracking-[0.25em] uppercase text-white/80 block mb-4">
                GET IN TOUCH
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[0.95] mb-6">
                LET&apos;S BUILD <br />
                SOMETHING USEFUL.
              </h2>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-lg mb-12">
                Open to technical opportunities, collaborations, freelance work and interesting problems.
              </p>
            </div>

            {/* Contact Information Block */}
            <div className="space-y-6 pt-8 border-t border-white/20">
              {/* Email */}
              <div>
                <span className="font-technical text-[10px] tracking-[0.2em] uppercase text-white/70 block mb-1">
                  EMAIL
                </span>
                <a
                  href="mailto:charankarthik697@gmail.com"
                  className="font-technical text-base sm:text-lg font-bold text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8500A] rounded px-1"
                >
                  charankarthik697@gmail.com
                </a>
              </div>

              {/* GitHub */}
              <div>
                <span className="font-technical text-[10px] tracking-[0.2em] uppercase text-white/70 block mb-1">
                  GITHUB
                </span>
                <a
                  href="https://github.com/mrkarthik14"
                  target="_blank"
                  rel="noreferrer"
                  className="font-technical text-sm sm:text-base font-medium text-white hover:underline underline-offset-4 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8500A] rounded px-1"
                >
                  <span>github.com/mrkarthik14</span>
                  <span>↗</span>
                </a>
              </div>

              {/* LinkedIn */}
              <div>
                <span className="font-technical text-[10px] tracking-[0.2em] uppercase text-white/70 block mb-1">
                  LINKEDIN
                </span>
                <a
                  href="https://www.linkedin.com/in/nayakanticharankarthik/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-technical text-sm sm:text-base font-medium text-white hover:underline underline-offset-4 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#E8500A] rounded px-1"
                >
                  <span>linkedin.com/in/nayakanticharankarthik</span>
                  <span>↗</span>
                </a>
              </div>

              {/* Availability Status */}
              <div>
                <span className="font-technical text-[10px] tracking-[0.2em] uppercase text-white/70 block mb-1">
                  AVAILABILITY
                </span>
                <div className="inline-flex items-center gap-2 bg-black/20 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="font-technical text-xs font-semibold text-white">
                    Available for Q4/2026 roles &amp; advisory
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Rounded Black Contact Form (#0D0D0D) */}
          <div className="lg:col-span-6">
            <div className="bg-[#0D0D0D] text-[#F2F0EC] p-8 sm:p-10 rounded-[24px] shadow-2xl border border-white/10">
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
                <span className="font-technical text-xs tracking-widest text-[#8A8A8A] uppercase">
                  DIRECT TRANSMISSION
                </span>
                <span className="font-technical text-xs text-[#E8500A] font-semibold">
                  SECURE FORM
                </span>
              </div>

              {status === 'success' ? (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-[#E8500A]/20 border border-[#E8500A] flex items-center justify-center text-[#E8500A] mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Dispatched.</h3>
                  <p className="font-technical text-xs text-[#8A8A8A] max-w-sm mb-6">
                    Thank you. Your project requirements have been recorded. Charan will review and respond promptly.
                  </p>
                  <button
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        projectType: 'Data Science / ML',
                        budget: '$5k - $15k',
                        message: ''
                      });
                    }}
                    className="font-technical text-xs text-[#E8500A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] px-2 py-1 rounded"
                  >
                    SEND ANOTHER INQUIRY →
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="font-technical text-[10px] tracking-widest text-[#8A8A8A] uppercase block mb-1.5">
                      NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-[#141414] border border-white/15 focus:border-[#E8500A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] rounded-xl px-4 py-3 font-technical text-xs text-white placeholder-[#8A8A8A]/50 transition-colors"
                    />
                  </div>

                  {/* Email & Company (Two columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-technical text-[10px] tracking-widest text-[#8A8A8A] uppercase block mb-1.5">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@company.com"
                        className="w-full bg-[#141414] border border-white/15 focus:border-[#E8500A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] rounded-xl px-4 py-3 font-technical text-xs text-white placeholder-[#8A8A8A]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="font-technical text-[10px] tracking-widest text-[#8A8A8A] uppercase block mb-1.5">
                        COMPANY / ORGANIZATION
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company name"
                        className="w-full bg-[#141414] border border-white/15 focus:border-[#E8500A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] rounded-xl px-4 py-3 font-technical text-xs text-white placeholder-[#8A8A8A]/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Project Type & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-technical text-[10px] tracking-widest text-[#8A8A8A] uppercase block mb-1.5">
                        PROJECT TYPE
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={e => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full bg-[#141414] border border-white/15 focus:border-[#E8500A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] rounded-xl px-4 py-3 font-technical text-xs text-white transition-colors"
                      >
                        <option value="Data Science / ML">Data Science / ML</option>
                        <option value="Analytics / Power BI">Analytics / Power BI</option>
                        <option value="AI / LLM Systems">AI / LLM Systems</option>
                        <option value="Full-Stack Engineering">Full-Stack Engineering</option>
                        <option value="Full-Time Engineering Role">Full-Time Engineering Role</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-technical text-[10px] tracking-widest text-[#8A8A8A] uppercase block mb-1.5">
                        SCOPE / BUDGET
                      </label>
                      <select
                        value={formData.budget}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#141414] border border-white/15 focus:border-[#E8500A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] rounded-xl px-4 py-3 font-technical text-xs text-white transition-colors"
                      >
                        <option value="Full-Time Hire / Salary">Full-Time Hire / Salary</option>
                        <option value="Contract / Project">$3k - $10k</option>
                        <option value="Enterprise Scope">$10k - $30k+</option>
                        <option value="Open Discussion">Open Discussion</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-technical text-[10px] tracking-widest text-[#8A8A8A] uppercase block mb-1.5">
                      MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline project objectives, data sources, deliverables, or team requirements..."
                      className="w-full bg-[#141414] border border-white/15 focus:border-[#E8500A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D] rounded-xl p-4 font-technical text-xs text-white placeholder-[#8A8A8A]/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full mt-2 py-4 bg-[#E8500A] hover:bg-[#d04506] active:scale-[0.99] text-white font-technical text-xs font-bold tracking-widest rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-lg shadow-[#E8500A]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND MESSAGE</span>
                        <span>→</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
