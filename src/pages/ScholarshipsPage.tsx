import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { Award, MapPin, Globe, Search, BookOpen } from 'lucide-react';
import { careers } from '../data/careers';

export default function ScholarshipsPage() {
  const { dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<'All' | 'Malaysia' | 'Overseas'>('All');
  
  const allScholarships = careers.flatMap((c) => c.scholarships.map((s) => ({ ...s, career: c.title })));
  const uniqueScholarships = Array.from(new Map(allScholarships.map((s) => [s.name, s])).values());

  const filteredScholarships = useMemo(() => {
    return uniqueScholarships.filter((s) => {
      const matchesLocation = locationFilter === 'All' || s.location === locationFilter;
      const matchesSearch = searchQuery === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLocation && matchesSearch;
    });
  }, [uniqueScholarships, locationFilter, searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"><Award className="w-4 h-4 text-neon-yellow" /><span className="text-sm text-white/80">Funding Your Future</span></div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Scholarships Directory</h1>
          <p className="text-white/60 max-w-lg mx-auto">Discover {uniqueScholarships.length} scholarships available for Malaysian students pursuing STEM & IT careers</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{ label: 'Total', value: uniqueScholarships.length, icon: '🎓' }, { label: 'Malaysian', value: uniqueScholarships.filter((s) => s.location === 'Malaysia').length, icon: '🇲🇾' }, { label: 'Overseas', value: uniqueScholarships.filter((s) => s.location === 'Overseas').length, icon: '🌏' }, { label: 'Full Coverage', value: uniqueScholarships.filter((s) => s.coverage === 'Full').length, icon: '💯' }].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold ${i === 0 ? 'text-neon-blue' : i === 1 ? 'text-neon-green' : i === 2 ? 'text-neon-purple' : 'text-neon-yellow'}`}>{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-strong rounded-2xl p-4 sm:p-6 mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="text"
              placeholder="Search scholarships by name, provider, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50 transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {(['All', 'Malaysia', 'Overseas'] as const).map((location) => (
              <motion.button
                key={location}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLocationFilter(location)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  locationFilter === location
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                }`}
              >
                {location === 'All' && '🌍 All Locations'}
                {location === 'Malaysia' && '🇲🇾 Malaysian'}
                {location === 'Overseas' && '🌏 Overseas'}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-6 text-sm text-white/60">
          Showing {filteredScholarships.length} of {uniqueScholarships.length} scholarships
        </motion.div>

        {/* Scholarships Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredScholarships.map((scholarship, i) => (
            <motion.div
              key={i}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className={`glass rounded-xl p-5 border transition-all ${
                scholarship.location === 'Malaysia'
                  ? 'border-white/10 hover:border-neon-blue/30'
                  : 'border-neon-purple/20 hover:border-neon-purple/40'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-sm font-semibold text-white/90 leading-tight flex-1">{scholarship.name}</h4>
                <span className="text-xs ml-2">
                  {scholarship.location === 'Malaysia' ? '🇲🇾' : '🌏'}
                </span>
              </div>
              <p className="text-xs text-white/40 mb-3">{scholarship.provider}</p>
              {scholarship.description && (
                <p className="text-xs text-white/60 mb-3 line-clamp-2">{scholarship.description}</p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 font-medium">{scholarship.coverage}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">{scholarship.level}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredScholarships.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <p className="text-white/60 text-lg">No scholarships found matching your criteria.</p>
            <button
              onClick={() => { setLocationFilter('All'); setSearchQuery(''); }}
              className="mt-4 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 text-center">
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-white mb-3">Not sure which scholarship to apply for?</h3>
            <p className="text-white/60 text-sm mb-6">Take our career quiz to get personalized scholarship recommendations</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })} className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold">Take Career Quiz 🎯</motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
