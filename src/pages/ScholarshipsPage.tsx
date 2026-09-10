import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, Calendar, X } from 'lucide-react';

const scholarships = [
  {
    id: 'jpa',
    name: 'JPA Scholarship',
    provider: 'Jabatan Perkhidmatan Awam',
    amount: 'Full Sponsorship',
    deadline: 'March 2025',
    category: 'Merit',
    location: 'Malaysia',
    description: 'Full scholarship for top SPM achievers to pursue degree locally or overseas.',
  },
  {
    id: 'khazanah-global',
    name: 'Khazanah Global Scholarship',
    provider: 'Khazanah Nasional',
    amount: 'Full + Living Allowance',
    deadline: 'April 2025',
    category: 'Merit',
    location: 'Overseas',
    description: 'Prestigious scholarship for studies at top global universities.',
  },
  {
    id: 'petronas',
    name: 'Petronas Education Sponsorship',
    provider: 'Petronas',
    amount: 'Full Sponsorship',
    deadline: 'May 2025',
    category: 'STEM',
    location: 'Malaysia',
    description: 'Sponsorship for students passionate about the energy sector.',
  },
  {
    id: 'shell',
    name: 'Shell Malaysia Scholarship',
    provider: 'Shell Malaysia',
    amount: 'Full + Overseas',
    deadline: 'June 2025',
    category: 'STEM',
    location: 'Overseas',
    description: 'For outstanding students in engineering and STEM fields.',
  },
  {
    id: 'maybank',
    name: 'Maybank Foundation Scholarship',
    provider: 'Maybank Foundation',
    amount: 'Full Sponsorship',
    deadline: 'July 2025',
    category: 'Need-Based',
    location: 'Malaysia',
    description: 'For underprivileged students pursuing degree in various fields.',
  },
];

export default function ScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [selectedScholarship, setSelectedScholarship] = useState<any>(null);

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      const matchesLocation = locationFilter === 'All' || scholarship.location === locationFilter;
      const matchesSearch = searchQuery === '' || 
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesLocation && matchesSearch;
    });
  }, [locationFilter, searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Award className="w-4 h-4 text-neon-yellow" />
            <span className="text-sm text-white/80">Degree-Level Funding</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Scholarships Directory
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover {scholarships.length} scholarships for degree-level education
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-20 z-30 mb-8"
        >
          <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                placeholder="Search scholarships..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {['All', 'Malaysia', 'Overseas'].map((location) => (
                <motion.button
                  key={location}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setLocationFilter(location)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    locationFilter === location
                      ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {location === 'Malaysia' && '🇲🇾 '}
                  {location === 'Overseas' && '🌏 '}
                  {location}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scholarships Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/10 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      scholarship.location === 'Malaysia' 
                        ? 'bg-neon-green/20 text-neon-green' 
                        : 'bg-neon-purple/20 text-neon-purple'
                    }`}>
                      {scholarship.location === 'Malaysia' ? '🇲🇾 Malaysia' : '🌏 Overseas'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue/20 text-neon-blue">
                      {scholarship.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{scholarship.name}</h3>
                  <p className="text-sm text-white/60 mb-4">{scholarship.provider}</p>

                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm">
                      <Award className="w-4 h-4 text-neon-yellow" />
                      <span className="text-neon-yellow font-semibold">{scholarship.amount}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-neon-pink" />
                      <span className="text-neon-pink">Deadline: {scholarship.deadline}</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedScholarship(scholarship)}
                    className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple hover:text-white transition-all duration-300 font-medium text-sm"
                  >
                    Quick View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
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
              onClick={(e) => e.stopPropagation()}
              className="bg-space-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="sticky top-0 bg-space-800 border-b border-white/10 p-6 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedScholarship.name}</h2>
                  <p className="text-white/60 mt-1">{selectedScholarship.provider}</p>
                </div>
                <button onClick={() => setSelectedScholarship(null)} className="p-2 rounded-lg hover:bg-white/10">
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              <div className="p-6 space-y-6">
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

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                  <p className="text-white/70 leading-relaxed">{selectedScholarship.description}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
