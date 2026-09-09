import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import AIMascot from '../components/AIMascot';
import { ArrowRight, SkipForward, Sparkles } from 'lucide-react';

export default function ResultsPage() {
  const { state, dispatch } = useApp();
  const recommendedCareers = state.recommendedCareers
    .map((id) => careers.find((c) => c.id === id))
    .filter(Boolean);

  const handleSelect = (careerId: string) => {
    dispatch({ type: 'SELECT_CAREER', careerId });
    dispatch({ type: 'NAVIGATE', page: 'roadmap' });
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <AIMascot size="md" message="Here are your top career matches! 🎉" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Your AI Career Matches
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Based on your quiz responses, here are the careers that best match your personality, capabilities, and interests.
          </p>
        </motion.div>

        {/* Career Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recommendedCareers.map((career, i) => (
            career && (
              <motion.div
                key={career.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-strong rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
                onClick={() => handleSelect(career.id)}
              >
                {/* Rank badge */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                  <span className="text-xs font-bold text-white">#{i + 1}</span>
                </div>

                {/* Glow effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ background: `radial-gradient(circle at center, ${career.color}, transparent)` }}
                />

                <div className="relative">
                  <div className="text-4xl mb-4">{career.icon}</div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">
                    {career.title}
                  </h3>
                  <p className="text-xs text-white/40 mb-3">{career.titleMalay}</p>
                  <p className="text-sm text-white/60 mb-4 line-clamp-2">
                    {career.description}
                  </p>

                  <div className="flex items-center gap-2 mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      career.demandLevel === 'Critical' ? 'bg-red-500/20 text-red-300' :
                      career.demandLevel === 'Very High' ? 'bg-orange-500/20 text-orange-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {career.demandLevel} Demand
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/60">
                      {career.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-neon-blue text-sm font-medium group-hover:gap-3 transition-all">
                    <span>Explore Path</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* Match Score Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-2xl p-8 mb-12"
        >
          <h3 className="font-display text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-neon-yellow" />
            Match Analysis
          </h3>
          <div className="space-y-4">
            {recommendedCareers.map((career, i) => (
              career && (
                <div key={career.id} className="flex items-center gap-4">
                  <span className="text-2xl w-10">{career.icon}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-white/80">{career.title}</span>
                      <span className="text-sm text-neon-blue">{95 - i * 8}%</span>
                    </div>
                    <div className="h-2 bg-space-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${95 - i * 8}%` }}
                        transition={{ delay: 0.8 + i * 0.2, duration: 1 }}
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(to right, ${career.color}, ${career.color}88)` }}
                      />
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full glass text-white font-semibold hover:bg-white/10"
          >
            <SkipForward className="w-5 h-5" />
            Browse All Careers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold"
          >
            Retake Quiz
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
