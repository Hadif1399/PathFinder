import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { GraduationCap, MapPin, Globe, Search, X, Clock, DollarSign, Award, Building2 } from 'lucide-react';
import { commonPreUniversity, universitiesMalaysia, universitiesOverseas, University, PreUniversity } from '../data/education';

type CategoryType = 'all' | 'preuni' | 'malaysia' | 'overseas';
type SubFilterType = 'all' | string;

interface DisplayItem {
  id: string;
  name: string;
  category: 'preuni' | 'malaysia' | 'overseas';
  subCategory: string;
  duration: string;
  cost: string;
  location?: string;
  country?: string;
  ranking?: string;
  description?: string;
  institutions?: string[];
  notes?: string;
}

export default function UniversitiesPage() {
  const { dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryType>('all');
  const [subFilter, setSubFilter] = useState<SubFilterType>('all');
  const [selectedItem, setSelectedItem] = useState<DisplayItem | null>(null);

  // Convert all data to unified format
  const allItems = useMemo(() => {
    const items: DisplayItem[] = [];

    // Pre-University
    commonPreUniversity.forEach((preu, idx) => {
      items.push({
        id: `preuni-${idx}`,
        name: preu.name,
        category: 'preuni',
        subCategory: preu.type,
        duration: preu.duration,
        cost: preu.cost,
        description: preu.notes,
        institutions: preu.institutions,
        notes: preu.notes,
      });
    });

    // Malaysian Universities
    const addMalaysianUni = (uni: University, type: string) => {
      items.push({
        id: `malaysia-${uni.name}`,
        name: uni.name,
        category: 'malaysia',
        subCategory: type,
        duration: uni.duration,
        cost: uni.totalCost,
        location: 'Malaysia',
        ranking: uni.ranking,
        description: uni.notes,
        notes: uni.notes,
      });
    };

    universitiesMalaysia.publicTop.forEach((uni) => addMalaysianUni(uni, 'Public'));
    universitiesMalaysia.privateTop.forEach((uni) => addMalaysianUni(uni, 'Private'));
    universitiesMalaysia.specialized.forEach((uni) => addMalaysianUni(uni, 'Specialized'));

    // Overseas Universities
    const addOverseasUni = (uni: University) => {
      items.push({
        id: `overseas-${uni.name}`,
        name: uni.name,
        category: 'overseas',
        subCategory: uni.country || 'Other',
        duration: uni.duration,
        cost: uni.totalCost,
        location: 'Overseas',
        country: uni.country,
        ranking: uni.ranking,
        description: uni.notes,
        notes: uni.notes,
      });
    };

    universitiesOverseas.singapore.forEach(addOverseasUni);
    universitiesOverseas.australia.forEach(addOverseasUni);
    universitiesOverseas.uk.forEach(addOverseasUni);
    universitiesOverseas.usa.forEach(addOverseasUni);
    universitiesOverseas.japan.forEach(addOverseasUni);
    universitiesOverseas.southKorea.forEach(addOverseasUni);
    universitiesOverseas.germany.forEach(addOverseasUni);

    return items;
  }, []);

  // Get available sub-filters based on category
  const availableSubFilters = useMemo(() => {
    if (categoryFilter === 'all') return [];
    
    const filtered = allItems.filter((item) => item.category === categoryFilter);
    const subCategories = Array.from(new Set(filtered.map((item) => item.subCategory)));
    return ['all', ...subCategories];
  }, [categoryFilter, allItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
      const matchesSubFilter = subFilter === 'all' || item.subCategory === subFilter;
      const matchesSearch = searchQuery === '' || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubFilter && matchesSearch;
    });
  }, [allItems, categoryFilter, subFilter, searchQuery]);

  // Stats
  const stats = useMemo(() => ({
    total: allItems.length,
    preuni: allItems.filter((i) => i.category === 'preuni').length,
    malaysia: allItems.filter((i) => i.category === 'malaysia').length,
    overseas: allItems.filter((i) => i.category === 'overseas').length,
  }), [allItems]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'preuni': return '📚';
      case 'malaysia': return '🇲🇾';
      case 'overseas': return '🌏';
      default: return '🎓';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'preuni': return 'bg-neon-green/20 text-neon-green';
      case 'malaysia': return 'bg-neon-blue/20 text-neon-blue';
      case 'overseas': return 'bg-neon-purple/20 text-neon-purple';
      default: return 'bg-white/10 text-white/60';
    }
  };

  const getCountryFlag = (country?: string) => {
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
    return flags[country || ''] || '🌏';
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
            <span className="text-sm text-white/80">Your Education Journey</span>
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            Universities & Education
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Explore {stats.total} education pathways including pre-university programs, Malaysian universities, and international options
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
            { label: 'Total Options', value: stats.total, color: 'text-neon-blue', icon: '🎓' },
            { label: 'Pre-University', value: stats.preuni, color: 'text-neon-green', icon: '📚' },
            { label: 'Malaysian', value: stats.malaysia, color: 'text-neon-blue', icon: '🇲🇾' },
            { label: 'Overseas', value: stats.overseas, color: 'text-neon-purple', icon: '🌏' },
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
            <div className="space-y-3">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <span className="text-sm text-white/60 py-2">Category:</span>
                {([
                  { value: 'all', label: 'All', icon: '🎓' },
                  { value: 'preuni', label: 'Pre-University', icon: '📚' },
                  { value: 'malaysia', label: 'Malaysian', icon: '🇲🇾' },
                  { value: 'overseas', label: 'Overseas', icon: '🌏' },
                ] as const).map((filter) => (
                  <motion.button
                    key={filter.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCategoryFilter(filter.value);
                      setSubFilter('all');
                    }}
                    className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      categoryFilter === filter.value
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {filter.icon} {filter.label}
                  </motion.button>
                ))}
              </div>

              {/* Sub Filters */}
              {availableSubFilters.length > 1 && (
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  <span className="text-sm text-white/60 py-2">
                    {categoryFilter === 'preuni' ? 'Type:' : categoryFilter === 'malaysia' ? 'Category:' : 'Country:'}
                  </span>
                  {availableSubFilters.map((filter) => (
                    <motion.button
                      key={filter}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSubFilter(filter)}
                      className={`px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        subFilter === filter
                          ? 'bg-gradient-to-r from-neon-green to-neon-blue text-white shadow-lg shadow-neon-green/30'
                          : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {filter === 'all' ? '✨ All' : filter === 'preuni' ? '📚 Pre-U' : filter}
                    </motion.button>
                  ))}
                </div>
              )}
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
          Showing {filteredItems.length} of {allItems.length} options
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
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
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(item.category)}`}>
                      {getCategoryIcon(item.category)} {item.category === 'preuni' ? 'Pre-U' : item.category === 'malaysia' ? 'Malaysia' : item.country || 'Overseas'}
                    </span>
                    {item.ranking && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-yellow/20 text-neon-yellow">
                        {item.ranking}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors">
                    {item.name}
                  </h3>

                  {/* Sub Category */}
                  <p className="text-sm text-white/60 mb-4 font-medium">
                    {item.subCategory}
                  </p>

                  {/* Details */}
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-neon-blue flex-shrink-0" />
                      <span className="text-white/70">{item.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-neon-yellow flex-shrink-0" />
                      <span className="text-neon-yellow font-medium">{item.cost}</span>
                    </div>
                    {item.description && (
                      <p className="text-sm text-white/50 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* Quick View Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedItem(item)}
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
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-white/60 text-lg">No education options found matching your criteria.</p>
            <button
              onClick={() => {
                setCategoryFilter('all');
                setSubFilter('all');
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
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-space-800 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-space-800 border-b border-white/10 p-6 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(selectedItem.category)}`}>
                      {getCategoryIcon(selectedItem.category)} {selectedItem.category === 'preuni' ? 'Pre-University' : selectedItem.category === 'malaysia' ? 'Malaysian University' : 'Overseas University'}
                    </span>
                    {selectedItem.ranking && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-neon-yellow/20 text-neon-yellow">
                        {selectedItem.ranking}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold text-white">{selectedItem.name}</h2>
                  <p className="text-white/60 mt-1">{selectedItem.subCategory}</p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Key Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-neon-blue" />
                      <span className="text-sm text-white/60">Duration</span>
                    </div>
                    <p className="text-lg font-bold text-white">{selectedItem.duration}</p>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 text-neon-yellow" />
                      <span className="text-sm text-white/60">Total Cost</span>
                    </div>
                    <p className="text-lg font-bold text-neon-yellow">{selectedItem.cost}</p>
                  </div>
                </div>

                {/* Location */}
                {selectedItem.country && (
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-5 h-5 text-neon-purple" />
                      <span className="text-sm text-white/60">Location</span>
                    </div>
                    <p className="text-lg font-bold text-white">
                      {getCountryFlag(selectedItem.country)} {selectedItem.country}
                    </p>
                  </div>
                )}

                {/* Description */}
                {selectedItem.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">About</h3>
                    <p className="text-white/70 leading-relaxed">{selectedItem.description}</p>
                  </div>
                )}

                {/* Institutions (for Pre-University) */}
                {selectedItem.institutions && selectedItem.institutions.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-neon-green" />
                      Available At
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.institutions.map((inst, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white/80">
                          {inst}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notes */}
                {selectedItem.notes && !selectedItem.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Notes</h3>
                    <p className="text-white/70 leading-relaxed">{selectedItem.notes}</p>
                  </div>
                )}

                {/* CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedItem(null);
                      dispatch({ type: 'NAVIGATE', page: 'scholarships' });
                    }}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                  >
                    Find Scholarships →
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedItem(null);
                      dispatch({ type: 'NAVIGATE', page: 'catalogue' });
                    }}
                    className="flex-1 px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all font-medium"
                  >
                    Explore Careers
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
