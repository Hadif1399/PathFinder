import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, SkipForward } from 'lucide-react';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';

export default function ResultsPage() {
  const { state } = useApp();
  const recommendedIds = state.recommendedCareers;
  const recommendedCareers = recommendedIds
    .map(id => careers.find(c => c.id === id))
    .filter(Boolean);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"
          >
            <Sparkles className="w-4 h-4 text-neon-yellow" />
            <span className="text-sm text-white/80">Your Personalized Results</span>
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Your Top <span className="gradient-text">Career Matches</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Based on your quiz answers, here are the careers that best match your personality, strengths, and preferences!
          </p>
        </motion.div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {recommendedCareers.map((career, index) => (
            <motion.div
              key={career!.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <Link to={`/career/${career!.id}`}>
                <div className="glass rounded-2xl p-6 card-hover h-full relative overflow-hidden group">
                  {/* Rank badge */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                    <span className="text-white font-bold text-sm">#{index + 1}</span>
                  </div>

                  {/* NPC Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-5xl mb-4"
                  >
                    {career!.npcAvatar}
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-2">{career!.title}</h3>
                  <p className="text-white/60 text-sm mb-4">{career!.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-neon-green/10 text-neon-green border border-neon-green/20">
                      {career!.demandLevel} Demand
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                      {career!.salaryRange}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-neon-blue text-sm font-medium group-hover:gap-3 transition-all">
                    Explore Career <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                    style={{ background: `radial-gradient(circle at center, ${career!.color}, transparent 70%)` }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center space-y-4"
        >
          <p className="text-white/60 mb-6">Choose your next step:</p>
          <div className="flex flex-wrap gap-4 justify-center">
            {recommendedCareers[0] && (
              <Link to={`/roadmap/${recommendedCareers[0].id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center gap-2 shadow-lg shadow-neon-blue/30"
                >
                  🗺️ Explore Top Match Roadmap
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            )}
            <Link to="/catalogue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass text-white font-semibold border border-white/20 flex items-center gap-2"
              >
                <SkipForward className="w-5 h-5" />
                Browse All Careers
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
