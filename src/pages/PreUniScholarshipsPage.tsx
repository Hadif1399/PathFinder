import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Award, Calendar, X } from 'lucide-react';

const scholarships = [
  {
    id: 'jpa-pc',
    name: 'JPA Program Cemerlang',
    provider: 'Jabatan Perkhidmatan Awam',
    amount: 'Full Sponsorship',
    deadline: 'March 2025',
    category: 'Merit',
    description: 'The most prestigious pre-university scholarship in Malaysia for top SPM achievers.',
    eligibility: ['SPM leavers with 8A+', 'Malaysian citizen', 'Under 19 years old'],
    benefits: ['Full tuition coverage', 'Monthly allowance RM 500', 'Book allowance RM 1,000'],
  },
  {
    id: 'mara-ypm',
    name: 'MARA Young Talent Programme',
    provider: 'MARA',
    amount: 'Full + Living Allowance',
    deadline: 'April 2025',
    category: 'STEM',
    description: 'Focused on developing future STEM leaders.',
    eligibility: ['Bumiputera students', 'SPM with 7A+ in STEM', 'Under 20 years old'],
    benefits: ['Full tuition fees', 'Monthly allowance RM 600', 'Laptop provided'],
  },
  {
    id: 'khazanah-watan',
    name: 'Khazanah Watan Scholarship',
    provider: 'Yayasan Khazanah',
    amount: 'RM 50,000/year',
    deadline: 'May 2025',
    category: 'Merit',
    description: 'Prestigious scholarship for high-achieving students from middle-income families.',
    eligibility: ['SPM leavers with 7A+', 'Malaysian citizen', 'From B40/M40 families'],
    benefits: ['Full tuition at top universities', 'Monthly allowance RM 800', 'Mentorship program'],
  },
  {
    id: 'petronas-education',
    name: 'Petronas Education Sponsorship',
    provider: 'Petronas',
    amount: 'Full Sponsorship',
    deadline: 'June 2025',
    category: 'STEM',
    description: 'Sponsorship for students passionate about the energy sector.',
    eligibility: ['SPM with 8A+ in STEM', 'Malaysian citizen', 'Interest in energy sector'],
    benefits: ['Full tuition + fees', 'Monthly allowance RM 700', 'Guaranteed internship'],
  },
];

export default function PreUniScholarshipsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedScholarship, setSelectedScholarship] = useState<any>(null);

  const categories = ['All', 'Merit', 'STEM', 'Need-Based'];

  const filteredScholarships = useMemo(() => {
    return scholarships.filter((scholarship) => {
      const matchesCategory = categoryFilter === 'All' || scholarship.category === categoryFilter;
      const matchesSearch = searchQuery === '' || 
        scholarship.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scholarship.provider.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [categoryFilter, searchQuery]);

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
            <span className="text-sm text-white/80">Pre-University Funding</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Pre-U Scholarships
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover {scholarships.length} scholarships for pre-university education
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

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Eligibility</h3>
                  <ul className="space-y-2">
                    {selectedScholarship.eligibility.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="text-neon-blue mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {selectedScholarship.benefits.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-2 text-white/70">
                        <span className="text-neon-green mt-1">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
