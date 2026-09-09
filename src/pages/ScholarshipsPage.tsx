import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers, Scholarship } from '../data/careers';
import { useState, useMemo } from 'react';
import { Award, Globe, MapPin, Search, Filter, GraduationCap } from 'lucide-react';

export default function ScholarshipsPage() {
  const { dispatch } = useApp();
  const [filter, setFilter] = useState<'all' | 'Malaysia' | 'Overseas'>('all');
  const [coverageFilter, setCoverageFilter] = useState<'all' | 'Full' | 'Partial' | 'Tuition'>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Collect all unique scholarships across careers (deduplicate by name)
  const allScholarships = useMemo(() => {
    const scholarshipMap = new Map<string, { scholarship: Scholarship; careers: string[] }>();
    
    careers.forEach((career) => {
      career.scholarships.forEach((s) => {
        const existing = scholarshipMap.get(s.name);
        if (existing) {
          if (!existing.careers.includes(career.title)) {
            existing.careers.push(career.title);
          }
        } else {
          scholarshipMap.set(s.name, { scholarship: s, careers: [career.title] });
        }
      });
    });

    return Array.from(scholarshipMap.values());
  }, []);

  const filteredScholarships = useMemo(() => {
    return allScholarships.filter(({ scholarship, careers: relatedCareers }) => {
      if (filter !== 'all' && scholarship.location !== filter) return false;
      if (coverageFilter !== 'all' && scholarship.coverage !== coverageFilter) return false;
      if (levelFilter !== 'all' && scholarship.level !== levelFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          scholarship.name.toLowerCase().includes(q) ||
          scholarship.provider.toLowerCase().includes(q) ||
          relatedCareers.some((c) => c.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [allScholarships, filter, coverageFilter, levelFilter, searchQuery]);

  const levels = ['all', 'Foundation', 'Diploma', 'Degree', 'Master', 'PhD'];
  
  const stats = useMemo(() => ({
    total: allScholarships.length,
    malaysia: allScholarships.filter((s) => s.scholarship.location === 'Malaysia').length,
    overseas: allScholarships.filter((s) => s.scholarship.location === 'Overseas').length,
    full: allScholarships.filter((s) => s.scholarship.coverage === 'Full').length,
  }), [allScholarships]);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Award className="w-4 h-4 text-neon-yellow" />
            <span className="text-sm text-white/80">Funding Your Future</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Scholarships Directory
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Discover {stats.total} scholarships available for Malaysian students pursuing STEM & IT careers
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
            { label: 'Total Scholarships', value: stats.total, color: 'text-neon-blue', icon: '🎓' },
            { label: 'Malaysian', value: stats.malaysia, color: 'text-neon-green', icon: '🇲🇾' },
            { label: 'Overseas', value: stats.overseas, color: 'text-neon-purple', icon: '🌏' },
            { label: 'Full Coverage', value: stats.full, color: 'text-neon-yellow', icon: '💯' },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search scholarships, providers, or careers..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue"
              />
            </div>

            {/* Location Filter */}
            <div className="flex gap-2">
              {[
                { value: 'all', label: 'All', icon: <Filter className="w-3 h-3" /> },
                { value: 'Malaysia', label: '🇲🇾 Local', icon: <MapPin className="w-3 h-3" /> },
                { value: 'Overseas', label: '🌏 Overseas', icon: <Globe className="w-3 h-3" /> },
              ].map((f) => (
                <button
                  key={f.value}
                  onClick={() => setFilter(f.value as typeof filter)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ${
                    filter === f.value
                      ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {f.icon}
                  {f.label}
                </button>
              ))}
            </div>

            {/* Coverage Filter */}
            <div className="flex gap-2">
              {(['all', 'Full', 'Partial', 'Tuition'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCoverageFilter(c)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    coverageFilter === c
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {c === 'all' ? 'All' : c}
                </button>
              ))}
            </div>
          </div>

          {/* Level Filter */}
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-white/5">
            <GraduationCap className="w-4 h-4 text-white/40 mt-1" />
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setLevelFilter(level)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  levelFilter === level
                    ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
                }`}
              >
                {level === 'all' ? 'All Levels' : level}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results count */}
        <div className="mb-4 text-sm text-white/50">
          Showing {filteredScholarships.length} of {allScholarships.length} scholarships
        </div>

        {/* Scholarships Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredScholarships.map(({ scholarship, careers: relatedCareers }, i) => (
            <motion.div
              key={scholarship.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ y: -3 }}
              className={`glass rounded-xl p-5 border transition-all ${
                scholarship.location === 'Overseas'
                  ? 'border-neon-purple/20 hover:border-neon-purple/40'
                  : 'border-white/10 hover:border-neon-blue/30'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">
                      {scholarship.location === 'Malaysia' ? '🇲🇾' : '🌏'}
                    </span>
                    <h4 className="text-sm font-semibold text-white/90 leading-tight">
                      {scholarship.name}
                    </h4>
                  </div>
                  <p className="text-xs text-white/40 ml-7">{scholarship.provider}</p>
                </div>
                <span className={`shrink-0 px-2 py-1 rounded-full text-xs font-medium ${
                  scholarship.coverage === 'Full' ? 'bg-green-500/20 text-green-300' :
                  scholarship.coverage === 'Partial' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-blue-500/20 text-blue-300'
                }`}>
                  {scholarship.coverage}
                </span>
              </div>

              {scholarship.description && (
                <p className="text-xs text-white/50 mb-3 ml-7">{scholarship.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 ml-7">
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50">
                  {scholarship.level}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${
                  scholarship.location === 'Malaysia'
                    ? 'bg-neon-blue/10 text-neon-blue'
                    : 'bg-neon-purple/10 text-neon-purple'
                }`}>
                  {scholarship.location}
                </span>
              </div>

              {/* Related Careers */}
              <div className="mt-3 ml-7 pt-3 border-t border-white/5">
                <p className="text-xs text-white/30 mb-1">Available for:</p>
                <div className="flex flex-wrap gap-1">
                  {relatedCareers.slice(0, 4).map((career) => (
                    <span key={career} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/40">
                      {career}
                    </span>
                  ))}
                  {relatedCareers.length > 4 && (
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/40">
                      +{relatedCareers.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Not sure which scholarship to apply for?
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Take our career quiz to get personalized scholarship recommendations based on your interests and achievements.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold"
            >
              Take Career Quiz 🎯
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
