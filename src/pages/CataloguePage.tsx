import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, TrendingUp, Award } from 'lucide-react';
import { careers } from '../data/careers';

function NPCPopup({ career, onClose }: { career: typeof careers[0]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-2xl p-6 max-w-md w-full"
      >
        <div className="text-center mb-4">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.6 }}
            className="text-6xl mb-3 inline-block"
          >
            {career.npcAvatar}
          </motion.div>
          <h3 className="text-xl font-bold text-white">{career.title}</h3>
          <p className="text-white/60 text-sm mt-2">{career.description}</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 justify-center">
          <span className="px-2 py-1 rounded-full text-xs bg-neon-green/10 text-neon-green border border-neon-green/20">
            {career.demandLevel} Demand
          </span>
          <span className="px-2 py-1 rounded-full text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
            {career.salaryRange}
          </span>
          <span className="px-2 py-1 rounded-full text-xs bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
            {career.category}
          </span>
        </div>
        <div className="flex gap-3">
          <Link to={`/career/${career.id}`} className="flex-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center justify-center gap-2"
            >
              Full Details <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="px-4 py-3 rounded-xl glass text-white/60 hover:text-white"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function CataloguePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedCareer, setSelectedCareer] = useState<typeof careers[0] | null>(null);

  const categories = ['All', 'IT', 'STEM', 'Engineering', 'Healthcare', 'Business'];

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesCategory = categoryFilter === 'All' || career.category === categoryFilter;
      const matchesSearch = searchQuery === '' ||
        career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        career.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'Very High': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'High': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-white/60 bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Career <span className="gradient-text">Catalogue</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore {careers.length} careers. Click any card to meet the NPC and learn more!
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-16 z-30 mb-8"
        >
          <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategoryFilter(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    categoryFilter === category
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-neon-blue" />
          <span className="text-sm text-white/60">
            Showing {filteredCareers.length} of {careers.length} careers
          </span>
        </div>

        {/* Career Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCareers.map((career, i) => (
            <motion.div
              key={career.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 card-hover cursor-pointer group relative overflow-hidden"
              onClick={() => setSelectedCareer(career)}
            >
              {/* NPC Avatar */}
              <motion.div
                whileHover={{ scale: 1.3, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className="text-4xl mb-3 inline-block"
              >
                {career.npcAvatar}
              </motion.div>

              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-bold text-white group-hover:text-neon-blue transition-colors">{career.title}</h3>
                <span className="text-2xl">{career.icon}</span>
              </div>

              <p className="text-white/60 text-sm mb-4 line-clamp-2">{career.description}</p>

              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-1 rounded-full text-xs border ${getDemandColor(career.demandLevel)}`}>
                  <Award className="w-3 h-3 inline mr-1" />
                  {career.demandLevel}
                </span>
                <span className="px-2 py-1 rounded-full text-xs bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                  {career.salaryRange}
                </span>
              </div>

              {/* Category badge */}
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 rounded-full text-xs bg-white/5 text-white/50 border border-white/10">
                  {career.category}
                </span>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ background: `radial-gradient(circle at center, ${career.color}, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* NPC Popup */}
        <AnimatePresence>
          {selectedCareer && (
            <NPCPopup career={selectedCareer} onClose={() => setSelectedCareer(null)} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
