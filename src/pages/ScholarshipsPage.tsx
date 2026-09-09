import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { Award, MapPin, Globe, Search, X, Calendar, DollarSign, Briefcase } from 'lucide-react';
import { careers } from '../data/careers';

interface Scholarship {
  name: string;
  provider: string;
  coverage: string;
  location: string;
  level: string;
  description?: string;
  career?: string;
}

export default function ScholarshipsPage() {
  const { dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<'All' | 'Malaysia' | 'Overseas'>('All');
  const [coverageFilter, setCoverageFilter] = useState<'All' | 'Full' | 'Partial' | 'Tuition'>('All');
  const [selectedScholarship, setSelectedScholarship] = useState<Scholarship | null>(null);

  const allScholarships = careers.flatMap((c) => c.scholarships.map((s) => ({ ...s, career: c.title })));
  const uniqueScholarships = Array.from(new Map(allScholarships.map((s) => [s.name, s])).values());

  const filteredScholarships = useMemo(() => {
    return uniqueScholarships.filter((s) => {
      const matchesLocation = locationFilter === 'All' || s.location === locationFilter;
      const matchesCoverage = coverageFilter === 'All' || s.coverage === coverageFilter;
      const matchesSearch = searchQuery === '' || 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLocation && matchesCoverage && matchesSearch;
    });
  }, [uniqueScholarships, locationFilter, coverageFilter, searchQuery]);

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case 'Full': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Partial': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Tuition': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Award className="w-4 h-4 text-neon-yellow" />
            <span className="text-sm text-white/80">Funding Your Future</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Scholarships Directory
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover {uniqueScholarships.length} scholarships available for Malaysian students pursuing STEM & IT careers
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Scholarships', value: uniqueScholarships.length, color: 'text-neon-blue', icon: '🎓' },
            { label: 'Malaysian', value: uniqueScholarships.filter((s) => s.location === 'Malaysia').length, color: 'text-neon-green', icon: '🇲🇾' },
            { label: 'Overseas', value: uniqueScholarships.filter((s) => s.location === 'Overseas').length, color: 'text-neon-purple', icon: '🌏' },
            { label: 'Full Coverage', value: uniqueScholarships.filter((s) => s.coverage === 'Full').length, color: 'text-neon-yellow', icon: '💯' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="sticky top-20 z-30 mb-8"
        >
          <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-xl">
            {/* Search Input */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search scholarships, providers, or careers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="space-y-3">
              {/* Location Filters */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="text-sm text-white/60 py-2">Location:</span>
                {(['All', 'Malaysia', 'Overseas'] as const).map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLocationFilter(filter)}
                    className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      locationFilter === filter
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {filter === 'All' && '🌍 '}
                    {filter === 'Malaysia' && '🇲🇾 '}
                    {filter === 'Overseas' && '🌏 '}
                    {filter}
                  </motion.button>
                ))}
              </div>

              {/* Coverage Filters */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="text-sm text-white/60 py-2">Coverage:</span>
                {(['All', 'Full', 'Partial', 'Tuition'] as const).map((filter) => (
                  <motion.button
                    key={filter}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCoverageFilter(filter)}
                    className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      coverageFilter === filter
                        ? 'bg-gradient-to-r from-neon-green to-neon-blue text-white shadow-lg shadow-neon-green/30'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {filter === 'All' && '✨ '}
                    {filter === 'Full' && '💯 '}
                    {filter === 'Partial' && '💰 '}
                    {filter === 'Tuition' && '📚 '}
                    {filter}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 text-sm text-white/60"
        >
          Showing {filteredScholarships.length} of {uniqueScholarships.length} scholarships
        </motion.div>

        {/* Scholarships Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/10 transition-all duration-300 h-full flex flex-col">
                  {/* Location Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      scholarship.location === 'Malaysia' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'bg-neon-purple/20 text-neon-purple'
                    }`}>
                      {scholarship.location === 'Malaysia' ? '🇲🇾 Malaysia' : '🌏 Overseas'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCoverageColor(scholarship.coverage)}`}>
                      {scholarship.coverage}
                    </span>
                  </div>

                  {/* Scholarship Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {scholarship.name}
                  </h3>

                  {/* Provider */}
                  <p className="text-sm text-white/60 mb-4 font-medium">
                    {scholarship.provider}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-neon-blue flex-shrink-0" />
                      <span className="text-white/70">{scholarship.level}</span>
                    </div>
                    {scholarship.description && (
                      <p className="text-sm text-white/50 line-clamp-2">
                        {scholarship.description}
                      </p>
                    )}
                  </div>

                  {/* Quick View Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedScholarship(scholarship)}
                    className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple hover:text-white hover:border-transparent transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    Quick View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredScholarships.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-white/60 text-lg">No scholarships found matching your criteria.</p>
            <button
              onClick={() => {
                setLocationFilter('All');
                setCoverageFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedScholarship && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScholarship(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-space-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-space-800 border-b border-white/10 p-6 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedScholarship.location === 'Malaysia' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'bg-neon-purple/20 text-neon-purple'
                    }`}>
                      {selectedScholarship.location === 'Malaysia' ? '🇲🇾 Malaysia' : '🌏 Overseas'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCoverageColor(selectedScholarship.coverage)}`}>
                      {selectedScholarship.coverage}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedScholarship.name}</h2>
                  <p className="text-white/60 mt-1">{selectedScholarship.provider}</p>
                </div>
                <button
                  onClick={() => setSelectedScholarship(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Key Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-neon-blue" />
                      <span className="text-sm text-white/60">Level</span>
                    </div>
                    <p className="text-lg font-bold text-white">{selectedScholarship.level}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-neon-yellow" />
                      <span className="text-sm text-white/60">Coverage</span>
                    </div>
                    <p className="text-lg font-bold text-neon-yellow">{selectedScholarship.coverage}</p>
                  </div>
                </div>

                {/* Description */}
                {selectedScholarship.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                    <p className="text-white/70 leading-relaxed">{selectedScholarship.description}</p>
                  </div>
                )}

                {/* Related Careers */}
                {selectedScholarship.career && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Related Career</h3>
                    <p className="text-white/70">{selectedScholarship.career}</p>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4 border-t border-white/10">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedScholarship(null);
                      dispatch({ type: 'NAVIGATE', page: 'catalogue' });
                    }}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    Explore Related Careers →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
