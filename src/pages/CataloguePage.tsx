import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Briefcase, TrendingUp, DollarSign, Star, ArrowRight, Sparkles } from 'lucide-react';
import { careers, Career } from '../data/careers';
import { useApp } from '../store/AppContext';

type FilterCategory = 'All' | 'IT' | 'STEM' | 'Healthcare' | 'Business' | 'Creative' | 'Education';

export default function CataloguePage() {
  const { dispatch } = useApp();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);
  const filters: FilterCategory[] = ['All', 'IT', 'STEM', 'Healthcare', 'Business', 'Creative', 'Education'];

  const filteredCareers = useMemo(() => {
    return careers.filter((career) => {
      const matchesFilter = activeFilter === 'All' || career.category === activeFilter;
      const matchesSearch = searchQuery === '' || career.title.toLowerCase().includes(searchQuery.toLowerCase()) || career.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'IT': return { bg: 'bg-neon-blue/20', text: 'text-neon-blue' };
      case 'STEM': return { bg: 'bg-neon-green/20', text: 'text-neon-green' };
      case 'Healthcare': return { bg: 'bg-neon-pink/20', text: 'text-neon-pink' };
      case 'Business': return { bg: 'bg-neon-purple/20', text: 'text-neon-purple' };
      case 'Creative': return { bg: 'bg-neon-orange/20', text: 'text-neon-orange' };
      case 'Education': return { bg: 'bg-neon-yellow/20', text: 'text-neon-yellow' };
      default: return { bg: 'bg-white/10', text: 'text-white/70' };
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"><Sparkles className="w-4 h-4 text-neon-yellow" /><span className="text-sm text-white/80">Explore Malaysia's Top Careers</span></div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Career Catalogue</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">Discover 36 high-demand careers across STEM, IT, Healthcare, Business, Creative & Education fields.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="sticky top-20 z-30 mb-8">
          <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" placeholder="Search careers, skills, or descriptions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50 transition-all" />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filters.map((filter) => (
                <motion.button key={filter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(filter)} className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30' : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'}`}>
                  {filter === 'All' && '🌟 '}{filter === 'IT' && '💻 '}{filter === 'STEM' && '🔬 '}{filter === 'Healthcare' && '🏥 '}{filter === 'Business' && '💼 '}{filter === 'Creative' && '🎨 '}{filter === 'Education' && '📚 '}{filter} ({filter === 'All' ? careers.length : careers.filter(c => c.category === filter).length})
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCareers.map((career, index) => {
              const colors = getCategoryColor(career.category);
              return (
                <motion.div key={career.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ y: -4 }} className="group">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/10 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0" style={{ background: `${career.color}20` }}>{career.icon}</div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.bg} ${colors.text}`}>{career.category}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-blue transition-colors">{career.title}</h3>
                    <p className="text-sm text-white/40 mb-3 font-medium">{career.titleMalay}</p>
                    <p className="text-sm text-white/60 mb-4 line-clamp-2 flex-grow">{career.description}</p>
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm"><DollarSign className="w-4 h-4 text-neon-yellow flex-shrink-0" /><span className="text-neon-yellow font-semibold">{career.salaryRange}</span></div>
                      <div className="flex items-center gap-2 text-sm"><TrendingUp className="w-4 h-4 flex-shrink-0 text-white/40" /><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${career.demandLevel === 'Critical' ? 'text-red-400 bg-red-500/10' : career.demandLevel === 'Very High' ? 'text-orange-400 bg-orange-500/10' : 'text-green-400 bg-green-500/10'}`}>{career.demandLevel} Demand</span></div>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedCareer(career)} className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple hover:text-white hover:border-transparent transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2">
                      <Briefcase className="w-4 h-4" />Quick View
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredCareers.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-white/60 text-lg">No careers found matching your criteria.</p>
            <button onClick={() => { setActiveFilter('All'); setSearchQuery(''); }} className="mt-4 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all">Clear Filters</button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedCareer && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCareer(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', duration: 0.5 }} onClick={(e) => e.stopPropagation()} className="bg-space-800 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-space-800 border-b border-white/10 p-6 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center text-4xl shrink-0" style={{ background: `${selectedCareer.color}20` }}>{selectedCareer.icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCareer.title}</h2>
                    <p className="text-white/60">{selectedCareer.titleMalay}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedCareer(null)} className="p-2 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5 text-white/60" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2"><DollarSign className="w-5 h-5 text-neon-yellow" /><span className="text-sm text-white/60">Salary</span></div>
                    <p className="text-sm font-bold text-neon-yellow">{selectedCareer.salaryRange}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-5 h-5 text-neon-green" /><span className="text-sm text-white/60">Demand</span></div>
                    <p className={`text-sm font-bold ${selectedCareer.demandLevel === 'Critical' ? 'text-red-400' : selectedCareer.demandLevel === 'Very High' ? 'text-orange-400' : 'text-green-400'}`}>{selectedCareer.demandLevel}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2"><Star className="w-5 h-5 text-neon-purple" /><span className="text-sm text-white/60">Scholarships</span></div>
                    <p className="text-sm font-bold text-neon-purple">{selectedCareer.scholarships.length} Available</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                  <p className="text-white/70 leading-relaxed">{selectedCareer.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Ideal Personality Traits</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCareer.personalityTraits.map((trait) => (<span key={trait} className="px-3 py-1.5 rounded-full bg-neon-pink/10 text-neon-pink text-sm">{trait}</span>))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/10">
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => { dispatch({ type: 'SELECT_CAREER', careerId: selectedCareer.id }); dispatch({ type: 'NAVIGATE', page: 'career-detail' }); setSelectedCareer(null); }} className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center justify-center gap-2">View Full Details<ArrowRight className="w-4 h-4" /></motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
