import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { Compass, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navigation() {
  const { dispatch } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-40 glass-strong"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'home' })}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              PathFinder<span className="text-neon-blue">AI</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'home' })}
              className="text-sm text-white/70 hover:text-neon-blue transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })}
              className="text-sm text-white/70 hover:text-neon-blue transition-colors"
            >
              Career Quiz
            </button>
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
              className="text-sm text-white/70 hover:text-neon-blue transition-colors"
            >
              Career Catalogue
            </button>
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'universities' })}
              className="text-sm text-white/70 hover:text-neon-blue transition-colors"
            >
              🏫 Universities
            </button>
            <button
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'scholarships' })}
              className="text-sm text-white/70 hover:text-neon-blue transition-colors"
            >
              🎓 Scholarships
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white text-sm font-semibold"
            >
              Start Journey ✨
            </motion.button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass-strong border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => { dispatch({ type: 'NAVIGATE', page: 'home' }); setMobileOpen(false); }} className="block w-full text-left text-white/70 hover:text-neon-blue">Home</button>
            <button onClick={() => { dispatch({ type: 'NAVIGATE', page: 'quiz' }); setMobileOpen(false); }} className="block w-full text-left text-white/70 hover:text-neon-blue">Career Quiz</button>
            <button onClick={() => { dispatch({ type: 'NAVIGATE', page: 'catalogue' }); setMobileOpen(false); }} className="block w-full text-left text-white/70 hover:text-neon-blue">Career Catalogue</button>
            <button onClick={() => { dispatch({ type: 'NAVIGATE', page: 'universities' }); setMobileOpen(false); }} className="block w-full text-left text-white/70 hover:text-neon-blue">🏫 Universities</button>
            <button onClick={() => { dispatch({ type: 'NAVIGATE', page: 'scholarships' }); setMobileOpen(false); }} className="block w-full text-left text-white/70 hover:text-neon-blue">🎓 Scholarships</button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
