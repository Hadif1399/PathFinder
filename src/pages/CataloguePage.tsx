import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Briefcase, TrendingUp, Award, ArrowRight } from 'lucide-react';

const careers = [
  { id: 'software-engineer', title: 'Software Engineer', category: 'IT', icon: '💻', color: '#00d4ff', demandLevel: 'Critical', salaryRange: 'RM 4,000 - RM 15,000', description: 'Build the digital future with code' },
  { id: 'data-scientist', title: 'Data Scientist', category: 'IT', icon: '📊', color: '#a855f7', demandLevel: 'Very High', salaryRange: 'RM 5,000 - RM 18,000', description: 'Transform data into insights' },
  { id: 'doctor', title: 'Medical Doctor', category: 'Healthcare', icon: '👨‍⚕️', color: '#34d399', demandLevel: 'Critical', salaryRange: 'RM 5,000 - RM 25,000', description: 'Save lives and heal communities' },
  { id: 'accountant', title: 'Accountant', category: 'Business', icon: '📊', color: '#10b981', demandLevel: 'High', salaryRange: 'RM 3,000 - RM 12,000', description: 'Manage financial records and strategy' },
  { id: 'architect', title: 'Architect', category: 'STEM', icon: '🏛️', color: '#f59e0b', demandLevel: 'High', salaryRange: 'RM 3,500 - RM 18,000', description: 'Design buildings and structures' },
  { id: 'graphic-designer', title: 'Graphic Designer', category: 'Creative', icon: '🎨', color: '#ec4899', demandLevel: 'High', salaryRange: 'RM 2,500 - RM 10,000', description: 'Create visual concepts and designs' },
];

export default function CataloguePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const categories = ['All', 'IT', 'STEM', 'Healthcare', 'Business', 'Creative'];

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
      case 'Critical': return 'text-red-400 bg-red-500/10';
      case 'Very High': return 'text-orange-400 bg-orange-500/10';
      case 'High': return 'text-green-400 bg-green-500/10';
      default: return 'text-white/60 bg-white/5';
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
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Career Catalogue
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Discover {careers.length} careers across multiple industries
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
                placeholder="Search careers..."
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

        {/* Results Count */}
        <div className="mb-6 text-sm text-white/60">
          Showing {filteredCareers.length} of {careers.length} careers
        </div>

        {/* Career Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCareers.map((career, index) => (
              <motion.div
                key={career.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
              >
                <Link to={`/career/${career.id}`}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:shadow-neon-blue/10 transition-all duration-300 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                        style={{ background: `${career.color}20` }}
                      >
                        {career.icon}
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-blue/20 text-neon-blue">
                        {career.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{career.title}</h3>
                    <p className="text-sm text-white/60 mb-4">{career.description}</p>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-neon-green" />
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getDemandColor(career.demandLevel)}`}>
                          {career.demandLevel} Demand
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="w-4 h-4 text-neon-yellow" />
                        <span className="text-neon-yellow font-semibold">{career.salaryRange}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-neon-blue text-sm font-medium group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
