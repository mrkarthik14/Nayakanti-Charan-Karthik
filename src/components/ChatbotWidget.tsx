import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { AssistantIcon } from './AssistantIcon';

interface Message {
  role: 'user' | 'model';
  text: string;
  time: string;
}

const DEFAULT_WELCOME: Message = {
  role: 'model',
  text: "Hello! I am the professional assistant for Nayakanti Charan Karthik, an expert in Data, AI & Machine Learning Systems Engineering. Ask me about his technical architecture, ML models, engineering projects, or background.",
  time: 'Just now'
};

const SUGGESTED_QUESTIONS = [
  "What are Charan's core skills & tech stack?",
  "Tell me about his ML & AI projects",
  "How does he handle machine learning in production?",
  "How can I contact or collaborate with him?"
];

/**
 * EditorialTextBlock
 * Formats AI responses into crisp, clean text blocks that match the portfolio's typography:
 * - Bold headings / sections
 * - Aligned bulleted data points with orange accent markers
 * - Inline monospace code badges
 * - Clean paragraph separation with zero unrendered markdown artifacts
 */
const EditorialTextBlock: React.FC<{ text: string; isDark: boolean; isUser: boolean }> = ({
  text,
  isDark,
  isUser
}) => {
  if (isUser) {
    return <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap">{text}</div>;
  }

  // Parse raw text into structured blocks
  const lines = text.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length > 0) {
      blocks.push(
        <ul key={`${keyPrefix}-list`} className="my-2 space-y-1.5 pl-0.5">
          {currentList.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-xs sm:text-[13px] leading-relaxed">
              <span className="inline-block w-1.5 h-1.5 rounded-none bg-[#E8500A] shrink-0 mt-1.5" />
              <span>{formatInline(item, isDark)}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const formatInline = (str: string, dark: boolean): React.ReactNode[] => {
    // Splits by inline code (`code`) and bold (**text**)
    const parts: React.ReactNode[] = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIndex) {
        parts.push(str.substring(lastIndex, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong
            key={match.index}
            className={`font-semibold tracking-normal ${dark ? 'text-white' : 'text-black'}`}
          >
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <span
            key={match.index}
            className={`font-technical text-[11px] px-1.5 py-0.5 rounded border ${
              dark
                ? 'bg-white/5 border-white/10 text-[#E8500A]'
                : 'bg-black/5 border-black/10 text-[#E8500A]'
            }`}
          >
            {token.slice(1, -1)}
          </span>
        );
      }
      lastIndex = regex.lastIndex;
    }

    if (lastIndex < str.length) {
      parts.push(str.substring(lastIndex));
    }

    return parts;
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    // Empty line separates blocks
    if (!trimmed) {
      flushList(`flush-${lineIdx}`);
      return;
    }

    // Bullet points
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ') || /^\d+\.\s/.test(trimmed)) {
      const itemContent = trimmed.replace(/^(\* |- |• |\d+\.\s)/, '');
      currentList.push(itemContent);
      return;
    }

    // Regular line, flush any pending list
    flushList(`flush-${lineIdx}`);

    // Headings (e.g. ### Heading or **Heading:**)
    if (trimmed.startsWith('### ') || trimmed.startsWith('## ') || (/^\*\*[^*]+:\*\*$/.test(trimmed))) {
      const headingText = trimmed.replace(/^#{2,3}\s/, '').replace(/^\*\*|\*\*$/g, '');
      blocks.push(
        <div
          key={`heading-${lineIdx}`}
          className="font-technical text-xs tracking-wider uppercase font-bold text-[#E8500A] mt-3 mb-1 flex items-center gap-1.5"
        >
          <span>//</span>
          <span>{headingText}</span>
        </div>
      );
      return;
    }

    // Clean paragraph text block
    blocks.push(
      <p
        key={`p-${lineIdx}`}
        className={`text-xs sm:text-[13px] leading-relaxed mb-2 last:mb-0 ${
          isDark ? 'text-[#F2F0EC]/90' : 'text-[#141414]/90'
        }`}
      >
        {formatInline(trimmed, isDark)}
      </p>
    );
  });

  flushList('final');

  return <div className="space-y-1">{blocks}</div>;
};

export const ChatbotWidget: React.FC = () => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([DEFAULT_WELCOME]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (userText?: string) => {
    const textToSend = (userText || input).trim();
    if (!textToSend || isLoading) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: Message = { role: 'user', text: textToSend, time: timeString };

    const updatedHistory = [...messages, newMsg];
    setMessages(updatedHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory.map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Error ${response.status}`);
      }

      const data = await response.json();
      const modelReply: Message = {
        role: 'model',
        text: data.reply || "No response received.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updatedHistory, modelReply]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const fallbackReply: Message = {
        role: 'model',
        text: "I am having trouble connecting at the moment. You can explore Charan's work directly in the Projects and About sections, or reach him at charankarthik697@gmail.com.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...updatedHistory, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const resetChat = () => {
    setMessages([DEFAULT_WELCOME]);
  };

  return (
    <>
      {/* FLOATING LAUNCHER BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full font-technical text-xs tracking-wider font-semibold border shadow-2xl transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8500A] focus-visible:ring-offset-2 ${
            isOpen
              ? 'bg-[#E8500A] text-white border-[#E8500A]'
              : 'bg-[#141414] text-[#F2F0EC] border-white/20 hover:border-white/40 shadow-black/90'
          }`}
          aria-label="Toggle Personal Assistant Chatbot"
        >
          {/* Custom Orange, Black, and White Assistant Icon */}
          <AssistantIcon size={24} className="shrink-0" />

          <span className="tracking-[0.18em] uppercase font-bold">
            {isOpen ? 'CLOSE // ASSISTANT' : 'CHARAN // ASSISTANT'}
          </span>

          <span className="font-technical text-[10px] text-white/50">
            {isOpen ? '✕' : '┌ AI ┐'}
          </span>
        </motion.button>
      </div>

      {/* CHAT MODAL / DOCKED PANEL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[640px] h-[580px] flex flex-col rounded-[22px] overflow-hidden border shadow-2xl select-none bg-[#0D0D0D] border-white/15 text-[#F2F0EC] shadow-black/90"
          >
            {/* 1. EDITORIAL HEADER */}
            <div className="p-4 border-b border-white/10 bg-[#141414] flex items-center justify-between transition-colors">
              <div className="flex items-center gap-3">
                {/* Dedicated Orange, Black, and White Assistant Icon */}
                <AssistantIcon size={28} />
                <div>
                  <div className="flex items-center gap-2 font-technical text-xs font-bold tracking-[0.2em] uppercase">
                    <span>CHARAN // ASSISTANT</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded border border-[#E8500A]/40 text-[#E8500A]">
                      GEMINI FLASH
                    </span>
                  </div>
                  <div className="font-technical text-[9px] tracking-wider uppercase mt-0.5 text-[#8A8A8A]">
                    DATA, AI & ML SYSTEMS ENGINEERING
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={resetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg font-technical text-[10px] tracking-wider transition-colors hover:text-[#E8500A] cursor-pointer text-[#8A8A8A] hover:bg-white/5"
                >
                  RESET
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg transition-colors cursor-pointer text-[#8A8A8A] hover:text-white hover:bg-white/5"
                  aria-label="Close chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 2. SCROLLABLE MESSAGE THREAD */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Telemetry pill */}
              <div className="text-center">
                <span className="inline-block font-technical text-[9px] tracking-widest uppercase px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[#8A8A8A]">
                  EDITORIAL AI ENGINE · SYSTEM ACTIVE
                </span>
              </div>

              {messages.map((msg, idx) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1">
                      {!isUser && <AssistantIcon size={14} />}
                      <span className="font-technical text-[9px] tracking-widest uppercase font-semibold text-[#E8500A]">
                        {isUser ? 'YOU' : 'CHARAN.AI'}
                      </span>
                      <span className="font-technical text-[8px] text-white/30">
                        {msg.time}
                      </span>
                    </div>

                    <div
                      className={`max-w-[90%] rounded-[18px] p-4 text-xs sm:text-[13px] leading-relaxed select-text ${
                        isUser
                          ? 'bg-[#E8500A] text-white rounded-br-xs font-medium shadow-md'
                          : 'bg-[#151515] border border-white/10 text-[#F2F0EC] rounded-bl-xs'
                      }`}
                    >
                      <EditorialTextBlock text={msg.text} isDark={true} isUser={isUser} />
                    </div>
                  </motion.div>
                );
              })}

              {/* FAST THINKING / STREAMING INDICATOR */}
              {isLoading && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <AssistantIcon size={14} />
                    <span className="font-technical text-[9px] tracking-widest uppercase font-semibold text-[#E8500A]">
                      CHARAN.AI
                    </span>
                    <span className="font-technical text-[8px] text-white/30">
                      Analyzing...
                    </span>
                  </div>
                  <div className="rounded-[16px] px-3.5 py-2.5 text-xs flex items-center gap-2 border bg-[#151515] border-white/10 text-[#8A8A8A]">
                    <span className="w-1.5 h-1.5 rounded-none bg-[#E8500A] animate-pulse" />
                    <span className="font-technical text-[10px] tracking-wider text-[#E8500A]">
                      PROCESSING QUERY WITH FLASH SPEED...
                    </span>
                  </div>
                </div>
              )}

              {/* QUICK SUGGESTIONS (Shown when thread is short) */}
              {messages.length <= 2 && (
                <div className="pt-2">
                  <div className="font-technical text-[9px] tracking-widest uppercase mb-2 text-[#8A8A8A]">
                    SELECT INQUIRY:
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        disabled={isLoading}
                        className="text-left text-xs p-2.5 rounded-xl border transition-all duration-150 flex items-center justify-between group cursor-pointer bg-[#141414] border-white/5 hover:border-[#E8500A]/40 text-[#F2F0EC]/80 hover:text-white"
                      >
                        <span className="line-clamp-1">{q}</span>
                        <span className="text-[#E8500A] opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                          →
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 3. INPUT BAR */}
            <div className="p-3 border-t border-white/10 bg-[#141414] transition-colors">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading}
                  placeholder="Ask about Charan's skills, projects, or background..."
                  className="flex-1 px-3.5 py-2.5 rounded-xl text-xs transition-colors border focus:outline-none focus:ring-1 focus:ring-[#E8500A] bg-[#0D0D0D] border-white/15 text-white placeholder-white/40"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isLoading}
                  className="px-3.5 py-2.5 bg-[#E8500A] hover:bg-[#d04506] disabled:opacity-40 disabled:hover:bg-[#E8500A] text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center shrink-0"
                  aria-label="Send message"
                >
                  <span>→</span>
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 px-1">
                <span className="font-technical text-[8px] tracking-wider uppercase text-[#8A8A8A]">
                  STRICT SCOPE: NAYAKANTI CHARAN KARTHIK
                </span>
                <span className="font-technical text-[8px] text-white/20">
                  ENTER ↵
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
