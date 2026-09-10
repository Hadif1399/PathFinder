import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import { X, MessageCircle, Minimize2 } from 'lucide-react';

interface Dialogue {
  message: string;
  duration?: number;
}

const pageDialogues: Record<string, Dialogue> = {
  home: { message: "Hey there, explorer! 🧭 I'm your CareerCompass buddy. Ready to find the career that fits you? Hit 'Start Your Journey' and let's go!", duration: 6000 },
  quiz: { message: "This is the fun part! 🎯 Just answer honestly — there are no wrong answers. I'll match you to your perfect path from 31 careers!", duration: 6000 },
  results: { message: "Look at you! ✨ These careers matched your personality. Click any card to explore — I'll be right here if you get stuck.", duration: 6000 },
  catalogue: { message: "Welcome to the catalogue! 📚 31 amazing careers await. Use the filters to narrow it down, or just browse and dream big!", duration: 6000 },
  'career-detail': { message: "Great pick! 👀 Here's everything about your career — what you'll do, the skills you need, and scholarships to fund it.", duration: 6000 },
  universities: { message: "Let's talk universities! 🎓 Here are top Malaysian and international unis for your chosen path.", duration: 6000 },
  'preuni-scholarships': { message: "Smart move thinking ahead! 💰 These pre-university scholarships can fund your foundation, diploma, or A-Levels.", duration: 6000 },
  scholarships: { message: "Time to get funded! 🤑 Browse scholarships matched to your career.", duration: 6000 },
};

const contextualTips: Record<string, string[]> = {
  catalogue: ["Psst — try filtering by 'STEM' to see tech careers! 🔬", "Did you know? 80% of our careers are in STEM and IT! 💻"],
  universities: ["Pro tip: Public universities are more affordable! 💡", "Check out scholarship options before deciding! 🎓"],
  'preuni-scholarships': ["JPA scholarships are super competitive but worth it! 🏆", "Apply early — deadlines come fast! ⏰"],
  scholarships: ["Filter by 'Full' coverage for maximum benefits! 💎"],
  quiz: ["Take your time — thoughtful answers = better matches! 🎯", "Your streak is building! Keep going! 🔥"],
};

export default function FloatingBot() {
  const { state } = useApp();
  const [isExpanded, setIsExpanded] = useState(true);
  const [showBubble, setShowBubble] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const messageTimerRef = useRef<number | null>(null);
  const lastPageRef = useRef(state.currentPage);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('botPosition');
    if (saved) {
      setPosition(JSON.parse(saved));
      setHasMoved(true);
    }
  }, []);

  useEffect(() => {
    if (hasMoved) {
      localStorage.setItem('botPosition', JSON.stringify(position));
    }
  }, [position, hasMoved]);

  const getPersonalizedMessage = (page: string): string => {
    if (page === 'scholarships' && state.recommendedCareers.length > 0) {
      const topCareer = careers.find(c => c.id === state.recommendedCareers[0]);
      if (topCareer) return `Here are scholarships perfect for future ${topCareer.title}s like you! 🌟`;
    }
    if (page === 'career-detail' && state.selectedCareer) {
      const career = careers.find(c => c.id === state.selectedCareer);
      if (career) return `Great pick! 👀 Here's everything about ${career.title} — what you'll do, the skills you need, and scholarships to fund it.`;
    }
    return pageDialogues[page]?.message || pageDialogues.home.message;
  };

  const showMessage = (message: string, duration = 6000) => {
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    setCurrentMessage(message);
    setShowBubble(true);
    messageTimerRef.current = window.setTimeout(() => setShowBubble(false), duration);
  };

  useEffect(() => {
    if (lastPageRef.current !== state.currentPage) {
      lastPageRef.current = state.currentPage;
      const message = getPersonalizedMessage(state.currentPage);
      setTimeout(() => showMessage(message), 500);
      resetIdleTimer();
    }
  }, [state.currentPage]);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = window.setTimeout(() => {
      const tips = contextualTips[state.currentPage];
      if (tips && tips.length > 0) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        showMessage(randomTip, 5000);
      }
    }, 8000);
  };

  useEffect(() => {
    const handleInteraction = () => resetIdleTimer();
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, [state.currentPage]);

  useEffect(() => {
    setTimeout(() => showMessage(getPersonalizedMessage(state.currentPage)), 1000);
  }, []);

  const handleDragEnd = (event: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y });
    setHasMoved(true);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) showMessage(getPersonalizedMessage(state.currentPage));
  };

  const handleBotClick = () => {
    if (!showBubble) showMessage(getPersonalizedMessage(state.currentPage));
  };

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Minimized dot - simple conditional render */}
      {!isExpanded && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={toggleExpand}
          className="fixed bottom-6 right-6 z-[60] group cursor-pointer w-14 h-14"
          aria-label="Open CareerCompass assistant"
        >
          {/* Pulsing ring */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink"
          />
          {/* Main button */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="relative w-full h-full rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink shadow-xl shadow-neon-blue/50 flex items-center justify-center group-hover:scale-110 transition-transform"
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </motion.div>
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg glass-strong text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Click to chat with your AI guide! 💬
          </div>
        </motion.button>
      )}

      {/* Main bot - only when expanded */}
      {isExpanded && (
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.5, opacity: 0, rotate: 180, transition: { duration: 0.3 } }}
          drag
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x: hasMoved ? position.x : undefined, y: hasMoved ? position.y : undefined }}
          className="fixed bottom-6 right-6 z-[60] cursor-move select-none"
        >
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-full right-0 mb-4 w-72 sm:w-80"
                >
                  <div className="glass-strong rounded-2xl p-4 shadow-2xl border border-white/20 relative">
                    <button onClick={() => setShowBubble(false)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Close message">
                      <X className="w-4 h-4 text-white/60" />
                    </button>
                    <p className="text-sm text-white/90 leading-relaxed pr-6">{currentMessage}</p>
                    <div className="absolute -bottom-2 right-8 w-4 h-4 glass-strong border-r border-b border-white/20 rotate-45" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              onClick={handleBotClick}
              tabIndex={0}
              role="button"
              aria-label="CareerCompass AI assistant"
              animate={!prefersReducedMotion ? { y: [0, -8, 0] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-20 h-20 sm:w-24 sm:h-24"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink blur-xl"
              />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-1 shadow-2xl shadow-neon-blue/50">
                <div className="w-full h-full rounded-full bg-space-900 flex items-center justify-center relative overflow-hidden">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <motion.div
                      animate={!prefersReducedMotion ? { scaleY: [1, 1, 0.1, 1, 1] } : {}}
                      transition={{ duration: 4, repeat: Infinity, times: [0, 0.45, 0.5, 0.55, 1] }}
                      className="flex gap-3"
                    >
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50" />
                      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50" />
                    </motion.div>
                    <motion.div
                      animate={!prefersReducedMotion ? { scaleX: [1, 1.1, 1] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-5 sm:bottom-6 w-6 sm:w-8 h-3 sm:h-4 border-b-2 border-neon-pink rounded-b-full"
                    />
                    <motion.div
                      animate={!prefersReducedMotion ? { rotate: [-5, 5, -5] } : {}}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 w-1 h-4 bg-gradient-to-t from-neon-purple to-neon-blue rounded-full"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); toggleExpand(); }}
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-space-800 border-2 border-white/30 flex items-center justify-center hover:bg-neon-blue/20 hover:border-neon-blue/50 hover:scale-110 transition-all group"
                aria-label="Minimize assistant"
              >
                <Minimize2 className="w-3.5 h-3.5 text-white/70 group-hover:text-neon-blue transition-colors" />
                <div className="absolute top-full right-0 mt-2 px-2 py-1 rounded bg-space-800 border border-white/20 text-xs text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Minimize
                </div>
              </button>
            </motion.div>
        </motion.div>
      )}
    </>
  );
}
