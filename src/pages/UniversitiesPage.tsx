import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { GraduationCap, MapPin, Globe, Search, X, DollarSign, Clock, Award, Building2 } from 'lucide-react';
import { universitiesMalaysia, universitiesOverseas, commonPreUniversity } from '../data/education';

interface University {
  name: string;
  location: 'Malaysia' | 'Overseas';
  country?: string;
  program: string;
  duration: string;
  annualFee: string;
  totalCost: string;
  ranking?: string;
  notes?: string;
  category?: 'Public' | 'Private' | 'Overseas';
}

type CategoryType = 'All' | 'Public' | 'Private' | 'Overseas';

export default function UniversitiesPage() {
  const { dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('All');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);

  const allUniversities = useMemo(() => {
    const publicUnis = universitiesMalaysia.publicTop.map((u: any) => ({ ...u, category: 'Public' as const }));
    const privateUnis = universitiesMalaysia.privateTop.map((u: any) => ({ ...u, category: 'Private' as const }));
    const overseasUnis = [...universitiesOverseas.singapore, ...universitiesOverseas.australia, ...universitiesOverseas.uk, ...universitiesOverseas.usa, ...universitiesOverseas.japan, ...universitiesOverseas.southKorea, ...universitiesOverseas.germany].map((u: any) => ({ ...u, category: 'Overseas' as const }));
    
    return [...publicUnis, ...privateUnis, ...overseasUnis];
  }, []);

  const filteredUniversities = useMemo(() => {
    return allUniversities.filter((uni) => {
      const matchesCategory = categoryFilter === 'All' || 
        (categoryFilter === 'Public' && uni.category === 'Public') ||
        (categoryFilter === 'Private' && uni.category === 'Private') ||
        (categoryFilter === 'Overseas' && uni.category === 'Overseas');
      
      const matchesSearch = searchQuery === '' || 
        uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.program.toLowerCase().includes(searchQuery.toLowerCase()) ||
        uni.country?.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [allUniversities, categoryFilter, searchQuery]);

  const getCountryFlag = (country?: string) => {
    if (!country) return '🇲🇾';
    const flags: Record<string, string> = {
      'Singapore': '🇸🇬',
      'Australia': '🇦🇺',
      'United Kingdom': '🇬🇧',
      'United States': '🇺🇸',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'Germany': '🇩🇪',
      'Canada': '🇨🇦',
    };
    return flags[country] || '🌏';
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
            <GraduationCap className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-white/80">Education Pathways & Costs</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Universities Directory
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Compare {allUniversities.length} universities across Malaysia and international destinations with detailed cost breakdowns
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
            { label: 'Total Universities', value: allUniversities.length, color: 'text-neon-blue', icon: '🎓' },
            { label: 'Public (Malaysia)', value: allUniversities.filter(u => u.category === 'Public').length, color: 'text-neon-green', icon: '🏛️' },
            { label: 'Private (Malaysia)', value: allUniversities.filter(u => u.category === 'Private').length, color: 'text-neon-purple', icon: '🏢' },
            { label: 'International', value: allUniversities.filter(u => u.category === 'Overseas').length, color: 'text-neon-orange', icon: '🌏' },
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
                placeholder="Search universities, programs, or countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <span className="text-sm text-white/60 py-2">Category:</span>
              {(['All', 'Public', 'Private', 'Overseas'] as const).map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCategoryFilter(filter)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    categoryFilter === filter
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {filter === 'All' && '🌍 '}
                  {filter === 'Public' && '🏛️ '}
                  {filter === 'Private' && '🏢 '}
                  {filter === 'Overseas' && '🌏 '}
                  {filter}
                </motion.button>
              ))}
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
          Showing {filteredUniversities.length} of {allUniversities.length} universities
        </motion.div>

        {/* Universities Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredUniversities.map((university, index) => (
              <motion.div
                key={university.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/10 transition-all duration-300 h-full flex flex-col">
                  {/* Category & Location Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      university.category === 'Public' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : university.category === 'Private'
                        ? 'bg-neon-purple/20 text-neon-purple'
                        : 'bg-neon-orange/20 text-neon-orange'
                    }`}>
                      {university.category === 'Overseas' && getCountryFlag(university.country)}
                      {university.category}
                    </span>
                    {university.ranking && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30">
                        {university.ranking.split(' ').pop()}
                      </span>
                    )}
                  </div>

                  {/* University Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {university.name}
                  </h3>

                  {/* Program */}
                  <p className="text-sm text-white/60 mb-4 font-medium">
                    {university.program}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-neon-blue flex-shrink-0" />
                      <span className="text-white/70">{university.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-neon-green flex-shrink-0" />
                      <span className="text-neon-green font-medium">{university.totalCost}</span>
                    </div>
                  </div>

                  {/* Quick View Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedUniversity(university)}
                    className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple hover:text-white hover:border-transparent transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <GraduationCap className="w-4 h-4" />
                    Quick View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredUniversities.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-white/60 text-lg">No universities found matching your criteria.</p>
            <button
              onClick={() => {
                setCategoryFilter('All');
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
        {selectedUniversity && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUniversity(null)}
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
                      selectedUniversity.category === 'Public' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : selectedUniversity.category === 'Private'
                        ? 'bg-neon-purple/20 text-neon-purple'
                        : 'bg-neon-orange/20 text-neon-orange'
                    }`}>
                      {selectedUniversity.category === 'Overseas' && getCountryFlag(selectedUniversity.country)}
                      {selectedUniversity.category}
                    </span>
                    {selectedUniversity.ranking && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-yellow/20 text-neon-yellow border border-neon-yellow/30">
                        {selectedUniversity.ranking}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedUniversity.name}</h2>
                  {selectedUniversity.country && (
                    <p className="text-white/60 mt-1">{getCountryFlag(selectedUniversity.country)} {selectedUniversity.country}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Program Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-neon-blue" />
                    Program Details
                  </h3>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <p className="text-white/90 font-medium mb-2">{selectedUniversity.program}</p>
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      <Clock className="w-4 h-4" />
                      <span>Duration: {selectedUniversity.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-neon-green" />
                    Cost Breakdown
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-neon-blue" />
                        <span className="text-sm text-white/60">Annual Fee</span>
                      </div>
                      <p className="text-lg font-bold text-neon-blue">{selectedUniversity.annualFee}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-neon-green" />
                        <span className="text-sm text-white/60">Total Cost</span>
                      </div>
                      <p className="text-lg font-bold text-neon-green">{selectedUniversity.totalCost}</p>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedUniversity.notes && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-neon-yellow" />
                      Additional Information
                    </h3>
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                      <p className="text-white/70 leading-relaxed">{selectedUniversity.notes}</p>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedUniversity(null);
                      dispatch({ type: 'NAVIGATE', page: 'scholarships' });
                    }}
                    className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    View Scholarships for This University →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedUniversity(null);
                      dispatch({ type: 'NAVIGATE', page: 'catalogue' });
                    }}
                    className="w-full px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
                  >
                    Explore Related Careers
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
