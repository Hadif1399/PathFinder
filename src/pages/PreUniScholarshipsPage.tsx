import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Award, Calendar, Users, BookOpen, ExternalLink } from 'lucide-react';

const preUniversityScholarships = [
  { id: 'jpa-pc', name: 'JPA Program Cemerlang', institution: 'Jabatan Perkhidmatan Awam', amount: 'Full Sponsorship', deadline: 'March 2025', category: 'Merit', eligibility: ['SPM leavers with 8A+ in all subjects', 'Malaysian citizen', 'Under 19 years old'], benefits: ['Full tuition coverage', 'Monthly allowance RM 500', 'Book allowance RM 1,000'], requirements: ['Excellent SPM results (8A+)', 'Strong co-curriculum record', 'Good health', 'Pass interview'], description: 'The most prestigious pre-university scholarship in Malaysia for top SPM achievers.' },
  { id: 'mara-ypm', name: 'MARA Young Talent Programme', institution: 'MARA', amount: 'Full + Living Allowance', deadline: 'April 2025', category: 'STEM', eligibility: ['Bumiputera students', 'SPM with 7A+ in STEM subjects', 'Under 20 years old'], benefits: ['Full tuition fees', 'Monthly allowance RM 600', 'Laptop provided'], requirements: ['Strong STEM subjects', 'Active in STEM competitions', 'Good character reference'], description: 'Focused on developing future STEM leaders.' },
  { id: 'khazanah-watan', name: 'Khazanah Watan Scholarship', institution: 'Yayasan Khazanah', amount: 'RM 50,000/year', deadline: 'May 2025', category: 'Merit', eligibility: ['SPM leavers with 7A+', 'Malaysian citizen', 'From B40/M40 families'], benefits: ['Full tuition at top universities', 'Monthly allowance RM 800', 'Mentorship program'], requirements: ['Excellent academic record', 'Leadership experience', 'Community service involvement'], description: 'Prestigious scholarship for high-achieving students from middle-income families.' },
  { id: 'petronas-education', name: 'Petronas Education Sponsorship', institution: 'Petronas', amount: 'Full Sponsorship', deadline: 'June 2025', category: 'STEM', eligibility: ['SPM with 8A+ in STEM', 'Malaysian citizen', 'Interest in energy sector'], benefits: ['Full tuition + fees', 'Monthly allowance RM 700', 'Guaranteed internship at Petronas'], requirements: ['Strong performance in Math, Physics, Chemistry', 'Pass Petronas assessment', 'Medical check-up'], description: 'Sponsorship for students passionate about the energy sector.' },
  { id: 'yayasan-ukhuwwah', name: 'Yayasan Ukhuwwah Scholarship', institution: 'Yayasan Ukhuwwah', amount: 'RM 15,000/year', deadline: 'February 2025', category: 'Need-Based', eligibility: ['Family income below RM 4,000/month', 'SPM with minimum 5A', 'Malaysian citizen'], benefits: ['Tuition fee coverage', 'Monthly allowance RM 400', 'Book allowance RM 500'], requirements: ['Proof of family income', 'Good academic record', 'Active in school activities'], description: 'Financial assistance for deserving students from low-income families.' },
  { id: 'sime-darby', name: 'Sime Darby Foundation Scholarship', institution: 'Sime Darby Foundation', amount: 'RM 40,000/year', deadline: 'July 2025', category: 'Merit', eligibility: ['SPM with 7A+', 'Strong leadership record', 'Malaysian citizen'], benefits: ['Full tuition at top institutions', 'Monthly allowance RM 600', 'Leadership training'], requirements: ['Excellent SPM results', 'Proven leadership skills', 'Community involvement'], description: 'Comprehensive scholarship focusing on developing future leaders.' },
];

type FilterCategory = 'All' | 'STEM' | 'Merit' | 'Need-Based';

export default function PreUniScholarshipsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState<typeof preUniversityScholarships[0] | null>(null);
  const filters: FilterCategory[] = ['All', 'STEM', 'Merit', 'Need-Based'];

  const filteredScholarships = useMemo(() => {
    return preUniversityScholarships.filter((s) => {
      const matchesFilter = activeFilter === 'All' || s.category === activeFilter;
      const matchesSearch = searchQuery === '' || s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.institution.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Pre-University Scholarships</h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">Discover funding opportunities for your pre-university education.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="sticky top-20 z-30 mb-8">
          <div className="glass-strong rounded-2xl p-4 sm:p-6 shadow-xl">
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input type="text" placeholder="Search scholarships or institutions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-blue/50 transition-all" />
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {filters.map((filter) => (
                <motion.button key={filter} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setActiveFilter(filter)} className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30' : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'}`}>
                  {filter}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredScholarships.map((scholarship, index) => (
              <motion.div key={scholarship.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, delay: index * 0.05 }} whileHover={{ y: -4 }} className="group">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/10 transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${scholarship.category === 'STEM' ? 'bg-neon-blue/20 text-neon-blue' : scholarship.category === 'Merit' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-neon-green/20 text-neon-green'}`}>{scholarship.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">{scholarship.name}</h3>
                  <p className="text-sm text-white/60 mb-4 font-medium">{scholarship.institution}</p>
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm"><Award className="w-4 h-4 text-neon-yellow flex-shrink-0" /><span className="text-neon-yellow font-semibold">{scholarship.amount}</span></div>
                    <div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-neon-pink flex-shrink-0" /><span className="text-neon-pink">Deadline: {scholarship.deadline}</span></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setSelectedScholarship(scholarship)} className="w-full py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-gradient-to-r hover:from-neon-blue hover:to-neon-purple hover:text-white hover:border-transparent transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2">
                    <BookOpen className="w-4 h-4" />Quick View
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedScholarship && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedScholarship(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', duration: 0.5 }} onClick={(e) => e.stopPropagation()} className="bg-space-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="sticky top-0 bg-space-800 border-b border-white/10 p-6 flex items-start justify-between">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${selectedScholarship.category === 'STEM' ? 'bg-neon-blue/20 text-neon-blue' : selectedScholarship.category === 'Merit' ? 'bg-neon-purple/20 text-neon-purple' : 'bg-neon-green/20 text-neon-green'}`}>{selectedScholarship.category}</span>
                  <h2 className="text-2xl font-bold text-white">{selectedScholarship.name}</h2>
                  <p className="text-white/60 mt-1">{selectedScholarship.institution}</p>
                </div>
                <button onClick={() => setSelectedScholarship(null)} className="p-2 rounded-lg hover:bg-white/10 transition-colors"><X className="w-5 h-5 text-white/60" /></button>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2"><Award className="w-5 h-5 text-neon-yellow" /><span className="text-sm text-white/60">Amount</span></div>
                    <p className="text-lg font-bold text-neon-yellow">{selectedScholarship.amount}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2"><Calendar className="w-5 h-5 text-neon-pink" /><span className="text-sm text-white/60">Deadline</span></div>
                    <p className="text-lg font-bold text-neon-pink">{selectedScholarship.deadline}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                  <p className="text-white/70 leading-relaxed">{selectedScholarship.description}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Users className="w-5 h-5 text-neon-blue" />Eligibility</h3>
                  <ul className="space-y-2">
                    {selectedScholarship.eligibility.map((item, index) => (<li key={index} className="flex items-start gap-2 text-white/70"><span className="text-neon-blue mt-1">•</span><span>{item}</span></li>))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2"><Award className="w-5 h-5 text-neon-green" />Benefits</h3>
                  <ul className="space-y-2">
                    {selectedScholarship.benefits.map((item, index) => (<li key={index} className="flex items-start gap-2 text-white/70"><span className="text-neon-green mt-1">✓</span><span>{item}</span></li>))}
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
