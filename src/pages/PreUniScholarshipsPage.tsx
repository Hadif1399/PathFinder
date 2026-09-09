import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Award, Calendar, Users, BookOpen, ExternalLink } from 'lucide-react';
import { preUniScholarships, PreUniScholarship } from '../data/preUniScholarships';

type FilterCategory = 'All' | 'STEM' | 'Merit' | 'Need-Based' | 'Sports' | 'Arts';

export default function PreUniScholarshipsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState<PreUniScholarship | null>(null);

  const filters: FilterCategory[] = ['All', 'STEM', 'Merit', 'Need-Based', 'Sports', 'Arts'];

  const filteredScholarships = useMemo(() => {
    return preUniScholarships.filter((scholarship) => {
      const matchesFilter = activeFilter === 'All' || scholarship.category === activeFilter;
      const matchesSearch = searchQuery === '' ||
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.institution.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

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
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Pre-University Scholarships
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover {preUniScholarships.length} funding opportunities for your pre-university education. Filter by category or search to find the perfect scholarship for you.
          </p>
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
                placeholder="Search scholarships or institutions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filters.map((filter) => (
                <motion.button
                  key={filter}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
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
          Showing {filteredScholarships.length} of {preUniScholarships.length} scholarships
        </motion.div>

        {/* Scholarship Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div
                key={scholarship.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/10 transition-all duration-300 h-full flex flex-col">
                  {/* Category Badge */}
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      scholarship.category === 'STEM' ? 'bg-neon-blue/20 text-neon-blue' :
                      scholarship.category === 'Merit' ? 'bg-neon-purple/20 text-neon-purple' :
                      scholarship.category === 'Need-Based' ? 'bg-neon-green/20 text-neon-green' :
                      scholarship.category === 'Sports' ? 'bg-neon-orange/20 text-neon-orange' :
                      'bg-neon-pink/20 text-neon-pink'
                    }`}>
                      {scholarship.category}
                    </span>
                  </div>

                  {/* Scholarship Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {scholarship.name}
                  </h3>

                  {/* Institution */}
                  <p className="text-sm text-white/60 mb-4 font-medium">
                    {scholarship.institution}
                  </p>

                  {/* Amount & Deadline */}
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-neon-yellow flex-shrink-0" />
                      <span className="text-neon-yellow font-semibold">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-neon-pink flex-shrink-0" />
                      <span className="text-neon-pink">Deadline: {scholarship.deadline}</span>
                    </div>
                  </div>

                  {/* Quick View Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedScholarship(scholarship)}
                    className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple hover:text-white hover:border-transparent transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
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
                setActiveFilter('All');
                setSearchQuery('');
              }}
              className="mt-4 px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>

      {/* Modal */}
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
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                    selectedScholarship.category === 'STEM' ? 'bg-neon-blue/20 text-neon-blue' :
                    selectedScholarship.category === 'Merit' ? 'bg-neon-purple/20 text-neon-purple' :
                    selectedScholarship.category === 'Need-Based' ? 'bg-neon-green/20 text-neon-green' :
                    selectedScholarship.category === 'Sports' ? 'bg-neon-orange/20 text-neon-orange' :
                    'bg-neon-pink/20 text-neon-pink'
                  }`}>
                    {selectedScholarship.category}
                  </span>
                  <h2 className="text-2xl font-bold text-white">{selectedScholarship.name}</h2>
                  <p className="text-white/60 mt-1">{selectedScholarship.institution}</p>
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
                {/* Amount & Deadline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="w-5 h-5 text-neon-yellow" />
                      <span className="text-sm text-white/60">Amount</span>
                    </div>
                    <p className="text-lg font-bold text-neon-yellow">{selectedScholarship.amount}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-neon-pink" />
                      <span className="text-sm text-white/60">Deadline</span>
                    </div>
                    <p className="text-lg font-bold text-neon-pink">{selectedScholarship.deadline}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                  <p className="text-white/70 leading-relaxed">{selectedScholarship.description}</p>
                </div>

                {/* Eligibility */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-neon-blue" />
                    Eligibility
                  </h3>
                  <ul className="space-y-2">
                    {selectedScholarship.eligibility.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="text-neon-blue mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Benefits */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5 text-neon-green" />
                    Benefits
                  </h3>
                  <ul className="space-y-2">
                    {selectedScholarship.benefits.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="text-neon-green mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-neon-purple" />
                    Requirements
                  </h3>
                  <ul className="space-y-2">
                    {selectedScholarship.requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="text-neon-purple mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Website Link */}
                {selectedScholarship.website && (
                  <a
                    href={selectedScholarship.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    Visit Official Website
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
