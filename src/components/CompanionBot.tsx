import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2 } from 'lucide-react';

// Dialogue map with 2-3 varied lines per page
const DIALOGUES: Record<string, string[]> = {
  home: [
    "Hey there, explorer! 🧭 I'm Kompas, your career guide. Ready to find your perfect path?",
    "Welcome to CareerCompass! 🌟 Let's discover the career that fits you best!",
    "Hi! I'm Kompas 🤖 Let's start your journey to find the perfect career!",
  ],
  quiz: [
    "This is the fun part! 🎯 Just answer honestly — I'll match you to your perfect path!",
    "Time to discover your strengths! 💪 Answer naturally, no wrong answers here!",
    "Let's find your career match! ✨ Be yourself, I'll do the rest!",
  ],
  results: [
    "Look at you! ✨ These careers matched your personality. Click any card to explore!",
    "Great job! 🎉 Here are your top career matches. Which one excites you most?",
    "Amazing! 🌟 I found careers that fit you perfectly. Explore them all!",
  ],
  catalogue: [
    "Welcome to the catalogue! 📚 31 amazing careers await. Use filters or just browse!",
    "Explore all careers here! 🔍 Filter by category or search for something specific!",
    "31 careers to discover! 🌟 Each one has unique paths and opportunities!",
  ],
  'career-detail': [
    "Great pick! 👀 Here's everything about this career — skills, scholarships, and more!",
    "Excellent choice! 🎯 Let me show you the full details and opportunities!",
    "Perfect! 🌟 Explore all the pathways, requirements, and funding options here!",
  ],
  universities: [
    "Let's talk universities! 🎓 Filter by location, ranking, or program type!",
    "Education paths await! 📚 Compare Malaysian and international options here!",
    "Find your perfect university! 🌏 Check costs, rankings, and programs!",
  ],
  'preuni-scholarships': [
    "Smart move thinking ahead! 💰 These scholarships can fund your foundation or diploma!",
    "Pre-U funding opportunities! 🎓 Filter by eligibility and deadlines!",
    "Plan ahead! 🌟 These scholarships cover your pre-university education!",
  ],
  scholarships: [
    "Time to get funded! 🤑 Browse scholarships matched to your career path!",
    "Scholarships await! 💰 Filter by coverage and location to find your match!",
    "Funding your future! 🎓 Explore full and partial scholarships here!",
  ],
  '404': [
    "Oops, looks like we wandered off the map! 🗺️ Let me guide you back!",
    "Lost? 🧭 No worries! Let's get you back on track!",
    "Page not found! 🌟 But don't worry, I'm here to help you navigate!",
  ],
};

// Contextual tips for idle detection
const CONTEXTUAL_TIPS: Record<string, string[]> = {
  home: [
    "Start with the quiz to find your perfect career match! 🎯",
    "We have 31 careers to explore! 🌟",
  ],
  quiz: [
    "Take your time — thoughtful answers = better matches! 💡",
    "Your streak is building! Keep going! 🔥",
  ],
  results: [
    "Click any career to see full details! 👀",
    "Each career has scholarships and university options! 🎓",
  ],
  catalogue: [
    "Try filtering by 'STEM' to see tech careers! 🔬",
    "Use search to find specific careers! 🔍",
  ],
  'career-detail': [
    "Check the Education tab for university options! 🎓",
    "Don't miss the scholarships available! 💰",
  ],
  universities: [
    "Public universities are more affordable! 💡",
    "Compare total costs, not just tuition! 💰",
  ],
  'preuni-scholarships': [
    "JPA scholarships are competitive but worth it! 🏆",
    "Apply early — deadlines come fast! ⏰",
  ],
  scholarships: [
    "Filter by 'Full' coverage for maximum benefits! 💎",
    "Check eligibility carefully before applying! ✅",
  ],
};

export default function CompanionBot() {
  // TWO separate states as requested:
  // - isVisible: controls whether the bot exists at all (never changes after mount)
  // - isMinimized: controls whether showing full bot or dot
  const [isVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const [showBubble, setShowBubble] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [topCareer, setTopCareer] = useState<string>('');
  
  const idleTimerRef = useRef<number | null>(null);
  const messageTimerRef = useRef<number | null>(null);
  const shownTipsRef = useRef<Set<string>>(new Set());
  const lastPageRef = useRef<string>('');

  // Get current route from URL
  const getCurrentRoute = (): string => {
    const path = window.location.pathname;
    if (path === '/' || path === '') return 'home';
    if (path.includes('/quiz')) return 'quiz';
    if (path.includes('/results')) return 'results';
    if (path.includes('/catalogue')) return 'catalogue';
    if (path.includes('/career/')) return 'career-detail';
    if (path.includes('/universities')) return 'universities';
    if (path.includes('/preuni-scholarships')) return 'preuni-scholarships';
    if (path.includes('/scholarships')) return 'scholarships';
    return '404';
  };

  // Check reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Load saved position
  useEffect(() => {
    const saved = localStorage.getItem('kompasPosition');
    if (saved) {
      setPosition(JSON.parse(saved));
      setHasMoved(true);
    }
  }, []);

  // Save position
  useEffect(() => {
    if (hasMoved) {
      localStorage.setItem('kompasPosition', JSON.stringify(position));
    }
  }, [position, hasMoved]);

  // Load top career from localStorage
  useEffect(() => {
    const savedCareers = localStorage.getItem('recommendedCareers');
    if (savedCareers) {
      try {
        const careers = JSON.parse(savedCareers);
        if (careers && careers.length > 0) {
          setTopCareer(careers[0]);
        }
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  // Get personalized message
  const getPersonalizedMessage = (route: string): string => {
    // Personalize scholarships message with top career
    if (route === 'scholarships' && topCareer) {
      return `Here are scholarships perfect for future ${topCareer}s like you! 🌟`;
    }

    // Get random dialogue for the route
    const dialogues = DIALOGUES[route] || DIALOGUES['404'];
    return dialogues[Math.floor(Math.random() * dialogues.length)];
  };

  // Show message with typing indicator
  const showMessage = (message: string, duration = 7000) => {
    if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    
    // Show typing indicator
    setIsTyping(true);
    setShowBubble(true);
    
    // Simulate typing delay
    setTimeout(() => {
      setIsTyping(false);
      setCurrentMessage(message);
    }, 500);
    
    // Auto-dismiss after duration
    messageTimerRef.current = window.setTimeout(() => {
      setShowBubble(false);
    }, duration);
  };

  // Detect route changes
  useEffect(() => {
    const checkRoute = () => {
      const currentRoute = getCurrentRoute();
      
      if (lastPageRef.current !== currentRoute) {
        lastPageRef.current = currentRoute;
        
        // Trigger wave animation
        setIsWaving(true);
        setTimeout(() => setIsWaving(false), 1000);
        
        // Show personalized message
        setTimeout(() => {
          const message = getPersonalizedMessage(currentRoute);
          showMessage(message);
        }, 500);
        
        // Reset idle timer
        resetIdleTimer();
      }
    };

    // Check on mount
    checkRoute();

    // Listen for URL changes
    const interval = setInterval(checkRoute, 500);
    return () => clearInterval(interval);
  }, []);

  // Idle timer for contextual tips
  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    
    idleTimerRef.current = window.setTimeout(() => {
      const currentRoute = getCurrentRoute();
      const tips = CONTEXTUAL_TIPS[currentRoute];
      
      if (tips && tips.length > 0) {
        // Show tip only once per session
        const tipKey = `${currentRoute}-tip`;
        if (!shownTipsRef.current.has(tipKey)) {
          shownTipsRef.current.add(tipKey);
          const randomTip = tips[Math.floor(Math.random() * tips.length)];
          showMessage(randomTip, 5000);
        }
      }
    }, 8000);
  };

  // Reset idle timer on user interaction
  useEffect(() => {
    const handleInteraction = () => resetIdleTimer();
    
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('click', handleInteraction);
    
    return () => {
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (messageTimerRef.current) clearTimeout(messageTimerRef.current);
    };
  }, []);

  // ESC key to close bubble
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showBubble) {
        setShowBubble(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBubble]);

  const handleDragEnd = (event: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y });
    setHasMoved(true);
  };

  // Minimize handler - ONLY toggles isMinimized
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
    setShowBubble(false);
  };

  // Restore handler - ONLY toggles isMinimized back to false
  const handleRestore = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(false);
    
    // Show greeting when restoring
    setTimeout(() => {
      const currentRoute = getCurrentRoute();
      showMessage(getPersonalizedMessage(currentRoute));
    }, 300);
  };

  const handleBotClick = () => {
    if (!showBubble && !isMinimized) {
      const currentRoute = getCurrentRoute();
      showMessage(getPersonalizedMessage(currentRoute));
    }
  };

  // Don't render if not visible (but isVisible is always true after mount)
  if (!isVisible) return null;

  return (
    <>
      {/* Minimized dot - ALWAYS rendered when minimized */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            key="kompas-dot"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={handleRestore}
            className="fixed bottom-6 right-6 z-[9999] group cursor-pointer w-14 h-14 md:w-16 md:h-16"
            aria-label="Restore Kompas assistant"
            style={{ pointerEvents: 'auto' }}
          >
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink"
            />
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full h-full rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink shadow-xl shadow-neon-blue/50 flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <span className="text-2xl">🤖</span>
            </motion.div>
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 rounded-lg glass-strong text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Chat with Kompas! 💬
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main bot - ONLY rendered when NOT minimized */}
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key="kompas-bot"
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            drag
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            style={{ x: hasMoved ? position.x : undefined, y: hasMoved ? position.y : undefined }}
            className="fixed bottom-6 right-6 z-[9999] cursor-move select-none"
          >
            {/* Speech bubble */}
            <AnimatePresence>
              {showBubble && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-full right-0 mb-4 w-72 sm:w-80 z-[10000]"
                >
                  <div className="glass-strong rounded-2xl p-4 shadow-2xl border border-white/20 relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBubble(false);
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                      aria-label="Close message"
                    >
                      <X className="w-4 h-4 text-white/60" />
                    </button>
                    
                    {isTyping ? (
                      <div className="flex items-center gap-1 text-sm text-white/70">
                        <span>Kompas is typing</span>
                        <motion.span
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ...
                        </motion.span>
                      </div>
                    ) : (
                      <p className="text-sm text-white/90 leading-relaxed pr-6">{currentMessage}</p>
                    )}
                    
                    <div className="absolute -bottom-2 right-8 w-4 h-4 glass-strong border-r border-b border-white/20 rotate-45" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Bot character */}
            <motion.div
              onClick={handleBotClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleBotClick();
                }
              }}
              tabIndex={0}
              role="button"
              aria-label="Kompas AI assistant - click for help"
              animate={
                !prefersReducedMotion
                  ? isWaving
                    ? { rotate: [0, -15, 15, -15, 0], scale: [1, 1.1, 1.1, 1.1, 1] }
                    : { y: [0, -8, 0] }
                  : {}
              }
              transition={
                isWaving
                  ? { duration: 0.8, ease: 'easeInOut' }
                  : { duration: 3, repeat: Infinity, ease: 'easeInOut' }
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-[90px] md:h-[90px]"
            >
              {/* Glow aura */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink blur-xl"
              />
              
              {/* Bot body */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-1 shadow-2xl shadow-neon-blue/50">
                <div className="w-full h-full rounded-full bg-space-900 flex items-center justify-center relative overflow-hidden">
                  {/* Face */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Eyes */}
                    <motion.div
                      animate={
                        !prefersReducedMotion
                          ? { scaleY: [1, 1, 0.1, 1, 1] }
                          : {}
                      }
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        times: [0, 0.45, 0.5, 0.55, 1],
                      }}
                      className="flex gap-2 sm:gap-3"
                    >
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50" />
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50" />
                    </motion.div>

                    {/* Smile */}
                    <motion.div
                      animate={
                        !prefersReducedMotion
                          ? { scaleX: [1, 1.1, 1] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute bottom-4 sm:bottom-5 md:bottom-6 w-5 sm:w-6 md:w-8 h-2.5 sm:h-3 md:h-4 border-b-2 border-neon-pink rounded-b-full"
                    />

                    {/* Antenna */}
                    <motion.div
                      animate={
                        !prefersReducedMotion
                          ? { rotate: [-5, 5, -5] }
                          : {}
                      }
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 w-1 h-3 sm:h-4 bg-gradient-to-t from-neon-purple to-neon-blue rounded-full"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-neon-blue shadow-lg shadow-neon-blue/50"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Minimize button */}
              <button
                onClick={handleMinimize}
                className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-space-800 border-2 border-white/30 flex items-center justify-center hover:bg-neon-blue/20 hover:border-neon-blue/50 hover:scale-110 transition-all group"
                aria-label="Minimize Kompas"
              >
                <Minimize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white/70 group-hover:text-neon-blue transition-colors" />
                <div className="absolute top-full right-0 mt-2 px-2 py-1 rounded bg-space-800 border border-white/20 text-xs text-white/80 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  Minimize
                </div>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
