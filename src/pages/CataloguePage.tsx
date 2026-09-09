import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import { useState } from 'react';

export default function CataloguePage() {
  const { dispatch } = useApp();
  const [activeNPC, setActiveNPC] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'IT', 'STEM', 'Healthcare'];
  const filteredCareers = filter === 'All' ? careers : careers.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Career Catalogue
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Explore Malaysia's most in-demand careers. Click on any career to meet your personal guide!
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                  : 'glass text-white/60 hover:text-white'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Career Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCareers.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="relative"
            >
              <motion.div
                onClick={() => {
                  setActiveNPC(activeNPC === career.id ? null : career.id);
                }}
                className="glass-strong rounded-2xl p-6 cursor-pointer group relative overflow-hidden h-full"
              >
                {/* NPC Avatar */}
                <motion.div
                  animate={activeNPC === career.id ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="absolute top-3 right-3 text-3xl"
                >
                  {career.npcEmoji}
                </motion.div>

                {/* Career Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-4"
                  style={{ background: `${career.color}20` }}
                >
                  {career.icon}
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-1">
                  {career.title}
                </h3>
                <p className="text-xs text-white/40 mb-3">{career.titleMalay}</p>
                <p className="text-sm text-white/60 mb-4 line-clamp-2">
                  {career.description}
                </p>

                {/* NPC Popup */}
                {activeNPC === career.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="mt-4 p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <p className="text-xs text-white/70">
                      <span className="font-bold text-neon-blue">{career.npcName}:</span>{" "}
                      "Hey there! I'm {career.npcName}. This career is {career.demandLevel.toLowerCase()} demand in Malaysia. Let me show you the path!"
                    </p>
                  </motion.div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    career.demandLevel === 'Critical' ? 'bg-red-500/20 text-red-300' :
                    career.demandLevel === 'Very High' ? 'bg-orange-500/20 text-orange-300' :
                    'bg-green-500/20 text-green-300'
                  }`}>
                    {career.demandLevel}
                  </span>
                  <span className="px-2 py-1 rounded-full text-xs bg-white/10 text-white/60">
                    {career.salaryRange.split(' - ')[0]}+
                  </span>
                </div>

                {/* Click hint */}
                <div className="mt-4 text-xs text-neon-blue opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to meet {career.npcName} →
                </div>
              </motion.div>

              {/* View Detail Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  dispatch({ type: 'SELECT_CAREER', careerId: career.id });
                  dispatch({ type: 'NAVIGATE', page: 'career-detail' });
                }}
                className="mt-3 w-full py-2 rounded-xl glass text-sm text-white/70 hover:text-neon-blue transition-colors"
              >
                View Full Details →
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
