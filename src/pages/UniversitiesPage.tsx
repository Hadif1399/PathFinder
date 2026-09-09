import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { commonPreUniversity, universitiesMalaysia, universitiesOverseas } from '../data/education';
import { GraduationCap, MapPin, Globe, Search, DollarSign, Clock, Building2 } from 'lucide-react';

export default function UniversitiesPage() {
  const { dispatch } = useApp();
  const [tab, setTab] = useState<'preuni' | 'malaysia' | 'overseas'>('malaysia');
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState<string>('all');

  const allMalaysiaUnis = useMemo(() => [
    ...universitiesMalaysia.publicTop,
    ...universitiesMalaysia.privateTop,
    ...universitiesMalaysia.specialized,
  ], []);

  const allOverseasUnis = useMemo(() => [
    ...universitiesOverseas.singapore,
    ...universitiesOverseas.australia,
    ...universitiesOverseas.uk,
    ...universitiesOverseas.usa,
    ...universitiesOverseas.japan,
    ...universitiesOverseas.southKorea,
    ...universitiesOverseas.germany,
  ], []);

  const countries = useMemo(() => {
    const set = new Set(allOverseasUnis.map((u) => u.country).filter(Boolean));
    return ['all', ...Array.from(set)] as string[];
  }, [allOverseasUnis]);

  const filteredMalaysia = useMemo(() => {
    if (!searchQuery) return allMalaysiaUnis;
    const q = searchQuery.toLowerCase();
    return allMalaysiaUnis.filter((u) => u.name.toLowerCase().includes(q) || u.program.toLowerCase().includes(q));
  }, [allMalaysiaUnis, searchQuery]);

  const filteredOverseas = useMemo(() => {
    let result = allOverseasUnis;
    if (countryFilter !== 'all') {
      result = result.filter((u) => u.country === countryFilter);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((u) => u.name.toLowerCase().includes(q) || u.program.toLowerCase().includes(q));
    }
    return result;
  }, [allOverseasUnis, countryFilter, searchQuery]);

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
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <GraduationCap className="w-4 h-4 text-neon-green" />
            <span className="text-sm text-white/80">Education Pathways & Costs</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
            Universities & Education Guide
          </h1>
          <p className="text-white/60 max-w-lg mx-auto">
            Compare pre-university pathways, Malaysian universities, and international options with detailed cost breakdowns
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-8">
          {[
            { value: 'preuni', label: '📚 Pre-University', count: commonPreUniversity.length },
            { value: 'malaysia', label: '🇲🇾 Malaysian', count: allMalaysiaUnis.length },
            { value: 'overseas', label: '🌏 International', count: allOverseasUnis.length },
          ].map((t) => (
            <motion.button
              key={t.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setTab(t.value as typeof tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                tab === t.value
                  ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                  : 'glass text-white/60 hover:text-white'
              }`}
            >
              {t.label} ({t.count})
            </motion.button>
          ))}
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search universities or programs..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-neon-blue"
            />
          </div>
        </div>

        {/* Pre-University Tab */}
        {tab === 'preuni' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {commonPreUniversity.map((preU, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="glass-strong rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-display text-base font-bold text-white">{preU.name}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-neon-green/10 text-neon-green font-medium">
                      {preU.type}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <Clock className="w-4 h-4" />
                      <span>{preU.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-neon-yellow" />
                      <span className="text-neon-yellow font-semibold">{preU.cost}</span>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-1">Available at:</p>
                      <div className="flex flex-wrap gap-1">
                        {preU.institutions.map((inst) => (
                          <span key={inst} className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/60">
                            {inst}
                          </span>
                        ))}
                      </div>
                    </div>
                    {preU.notes && (
                      <p className="text-xs text-white/40 italic border-t border-white/5 pt-2 mt-2">
                        💡 {preU.notes}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Cost Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8 glass-strong rounded-2xl p-6"
            >
              <h4 className="font-display text-lg font-bold text-white mb-4">💰 Pre-University Cost Comparison</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 text-white/60 font-medium">Program</th>
                      <th className="text-left py-2 text-white/60 font-medium">Duration</th>
                      <th className="text-right py-2 text-neon-yellow font-medium">Cost Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commonPreUniversity.map((preU, i) => (
                      <tr key={i} className="border-b border-white/5">
                        <td className="py-2 text-white/80">{preU.name}</td>
                        <td className="py-2 text-white/60">{preU.duration}</td>
                        <td className="py-2 text-right text-neon-green font-medium">{preU.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Malaysian Universities Tab */}
        {tab === 'malaysia' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Public Universities */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-neon-blue" />
                Public Universities (IPTA)
              </h3>
              <p className="text-white/50 text-sm mb-4">Government-funded, more affordable for Malaysian students</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMalaysia.filter((u) => !u.notes?.includes('Premier') && !u.notes?.includes('Top Private')).map((uni, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm font-semibold text-white/90 leading-tight">{uni.name}</h5>
                      {uni.ranking && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-neon-blue/10 text-neon-blue shrink-0 ml-2">
                          {uni.ranking.split(' ').pop()}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="text-white/60">{uni.program}</p>
                      <div className="flex items-center gap-2 text-white/50">
                        <Clock className="w-3 h-3" />
                        <span>{uni.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neon-yellow">
                        <DollarSign className="w-3 h-3" />
                        <span>Annual: {uni.annualFee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neon-green font-medium">
                        <span>Total: {uni.totalCost}</span>
                      </div>
                      {uni.notes && (
                        <p className="text-white/40 italic mt-1">{uni.notes}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Private Universities */}
            <div className="mb-8">
              <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-neon-purple" />
                Private Universities (IPTS)
              </h3>
              <p className="text-white/50 text-sm mb-4">Industry-focused programs with modern facilities</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMalaysia.filter((u) => u.notes?.includes('Top Private') || u.notes?.includes('Premier') || u.notes?.includes('industry') || u.notes?.includes('Petronas') || u.notes?.includes('Cyberjaya') || u.notes?.includes('Lancaster') || u.notes?.includes('affordable')).map((uni, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -3 }}
                    className="p-4 rounded-xl bg-white/5 border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="text-sm font-semibold text-white/90 leading-tight">{uni.name}</h5>
                      {uni.ranking && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple shrink-0 ml-2">
                          {uni.ranking.split(' ').pop()}
                        </span>
                      )}
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <p className="text-white/60">{uni.program}</p>
                      <div className="flex items-center gap-2 text-white/50">
                        <Clock className="w-3 h-3" />
                        <span>{uni.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neon-yellow">
                        <DollarSign className="w-3 h-3" />
                        <span>Annual: {uni.annualFee}</span>
                      </div>
                      <div className="flex items-center gap-2 text-neon-green font-medium">
                        <span>Total: {uni.totalCost}</span>
                      </div>
                      {uni.notes && (
                        <p className="text-white/40 italic mt-1">{uni.notes}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="glass-strong rounded-2xl p-6">
              <h4 className="font-display text-lg font-bold text-white mb-4">📊 Malaysian Education Cost Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-neon-blue/10">
                  <p className="text-xl font-bold text-neon-blue">RM 500-3K</p>
                  <p className="text-xs text-white/50">STPM/Matriculation</p>
                </div>
                <div className="p-3 rounded-xl bg-neon-blue/10">
                  <p className="text-xl font-bold text-neon-blue">RM 9K-32K</p>
                  <p className="text-xs text-white/50">Public University (Total)</p>
                </div>
                <div className="p-3 rounded-xl bg-neon-purple/10">
                  <p className="text-xl font-bold text-neon-purple">RM 54K-168K</p>
                  <p className="text-xs text-white/50">Private University (Total)</p>
                </div>
                <div className="p-3 rounded-xl bg-neon-pink/10">
                  <p className="text-xl font-bold text-neon-pink">RM 400K-600K</p>
                  <p className="text-xs text-white/50">Medicine (Total)</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Overseas Universities Tab */}
        {tab === 'overseas' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Country Filter */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {countries.map((country) => (
                <button
                  key={country}
                  onClick={() => setCountryFilter(country)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    countryFilter === country
                      ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  {country === 'all' ? '🌏 All Countries' : `${getCountryFlag(country)} ${country}`}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredOverseas.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -3 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      {uni.country && <span className="text-sm mr-1">{getCountryFlag(uni.country)}</span>}
                      <h5 className="text-sm font-semibold text-white/90 leading-tight inline">{uni.name}</h5>
                    </div>
                    {uni.ranking && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/10 text-neon-purple shrink-0 ml-2">
                        {uni.ranking.split(' ').pop()}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-white/60">{uni.program}</p>
                    <div className="flex items-center gap-2 text-white/50">
                      <Clock className="w-3 h-3" />
                      <span>{uni.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neon-yellow">
                      <DollarSign className="w-3 h-3" />
                      <span>Annual: {uni.annualFee}</span>
                    </div>
                    <div className="flex items-center gap-2 text-neon-green font-medium">
                      <span>Total: {uni.totalCost}</span>
                    </div>
                    {uni.notes && (
                      <p className="text-white/40 italic mt-1">{uni.notes}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="mt-8 glass-strong rounded-2xl p-6">
              <h4 className="font-display text-lg font-bold text-white mb-4">📊 International Education Cost Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-3 rounded-xl bg-neon-green/10">
                  <p className="text-lg font-bold text-neon-green">RM 50K-87K</p>
                  <p className="text-xs text-white/50">🇯🇵 Japan / 🇰🇷 Korea</p>
                </div>
                <div className="p-3 rounded-xl bg-neon-blue/10">
                  <p className="text-lg font-bold text-neon-blue">RM 312K-594K</p>
                  <p className="text-xs text-white/50">🇦🇺 Australia</p>
                </div>
                <div className="p-3 rounded-xl bg-neon-purple/10">
                  <p className="text-lg font-bold text-neon-purple">RM 345K-960K</p>
                  <p className="text-xs text-white/50">🇬🇧 United Kingdom</p>
                </div>
                <div className="p-3 rounded-xl bg-neon-pink/10">
                  <p className="text-lg font-bold text-neon-pink">RM 810K-1.1M</p>
                  <p className="text-xs text-white/50">🇺🇸 United States</p>
                </div>
              </div>
              <p className="text-xs text-white/40 text-center mt-4">
                💡 Many overseas universities offer scholarships for Malaysian students. Check the Scholarships page for details.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-white mb-3">
              Need help choosing the right path?
            </h3>
            <p className="text-white/60 text-sm mb-6">
              Take our career quiz to get personalized education and scholarship recommendations
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold"
              >
                Take Career Quiz 🎯
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => dispatch({ type: 'NAVIGATE', page: 'scholarships' })}
                className="px-6 py-3 rounded-full glass text-white/70 hover:text-neon-yellow"
              >
                🎓 View Scholarships
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
