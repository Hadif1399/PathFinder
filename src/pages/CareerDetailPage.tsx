import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import { commonPreUniversity, universitiesMalaysia, universitiesOverseas } from '../data/education';
import { ArrowLeft, BookOpen, Briefcase, GraduationCap, Heart, Play, Star, Award, Globe, MapPin, DollarSign, Building2 } from 'lucide-react';

export default function CareerDetailPage() {
  const { state, dispatch } = useApp();
  const career = careers.find((c) => c.id === state.selectedCareer);

  if (!career) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-white/60">Career not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
          className="flex items-center gap-2 text-white/60 hover:text-neon-blue mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Catalogue
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-8 mb-8 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: `radial-gradient(circle at top right, ${career.color}, transparent)` }}
          />
          <div className="relative flex flex-col md:flex-row gap-6 items-start">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0"
              style={{ background: `${career.color}20` }}
            >
              {career.icon}
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold text-white mb-1">
                {career.title}
              </h1>
              <p className="text-white/40 text-sm mb-3">{career.titleMalay}</p>
              <p className="text-white/70 mb-4">{career.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  career.demandLevel === 'Critical' ? 'bg-red-500/20 text-red-300' :
                  career.demandLevel === 'Very High' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {career.demandLevel} Demand
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/60">
                  💰 {career.salaryRange}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-white/10 text-white/60">
                  {career.category}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* SPM Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-neon-blue" />
              SPM Requirements
            </h3>
            <div className="space-y-3">
              {career.spmRequirements.map((req, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                  <span className="text-white/80 text-sm">{req.subject}</span>
                  <span className="text-neon-green text-xs font-medium px-2 py-1 rounded-full bg-green-500/10">
                    {req.grade}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personality Traits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-neon-pink" />
              Personality & Traits
            </h3>
            <div className="mb-4">
              <p className="text-xs text-white/40 mb-2">Holland Code</p>
              <p className="text-white/80 text-sm">{career.hollandCode}</p>
            </div>
            <div className="mb-4">
              <p className="text-xs text-white/40 mb-2">MBTI Types</p>
              <div className="flex flex-wrap gap-2">
                {career.mbtiTypes.map((type) => (
                  <span key={type} className="px-2 py-1 rounded-lg bg-neon-purple/10 text-neon-purple text-xs font-medium">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-white/40 mb-2">Key Traits</p>
              <div className="flex flex-wrap gap-2">
                {career.personalityTraits.map((trait) => (
                  <span key={trait} className="px-2 py-1 rounded-lg bg-white/5 text-white/70 text-xs">
                    {trait}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* EDUCATION PATHWAYS SECTION */}
        
        {/* Pre-University Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-strong rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-neon-green" />
            Pre-University Pathways
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Choose your pathway after SPM to prepare for university
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {commonPreUniversity.map((preU, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-semibold text-white/90">{preU.name}</h5>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-neon-green/10 text-neon-green">
                    {preU.type}
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-white/60">
                    <span>⏱️</span>
                    <span>{preU.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neon-yellow">
                    <DollarSign className="w-3 h-3" />
                    <span className="font-medium">{preU.cost}</span>
                  </div>
                  <div className="flex items-start gap-2 text-white/50">
                    <Building2 className="w-3 h-3 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{preU.institutions.slice(0, 3).join(', ')}{preU.institutions.length > 3 ? '...' : ''}</span>
                  </div>
                  {preU.notes && (
                    <p className="text-white/40 italic mt-1 text-xs">{preU.notes}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Malaysian Universities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-strong rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-neon-blue" />
            🇲🇾 Malaysian Universities
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Top universities in Malaysia offering relevant programs
          </p>

          {/* Public Universities */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-blue" />
              Public Universities (More Affordable)
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {universitiesMalaysia.publicTop.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
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
                      <span>⏱️ {uni.duration}</span>
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
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon-purple" />
              Private Universities
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {universitiesMalaysia.privateTop.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-gradient-to-br from-neon-purple/5 to-transparent border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
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
                      <span>⏱️ {uni.duration}</span>
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

          {/* Cost Comparison Summary */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-white/5">
            <h5 className="text-sm font-semibold text-white/80 mb-2">💡 Cost Comparison Summary</h5>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-neon-blue">RM 9K - 32K</p>
                <p className="text-xs text-white/50">Public Universities (Total)</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-purple">RM 54K - 220K</p>
                <p className="text-xs text-white/50">Private Universities (Total)</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Overseas Universities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-strong rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-5 h-5 text-neon-purple" />
            🌏 International Universities
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Top universities abroad for Malaysian students
          </p>

          {/* Singapore */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <span>🇸🇬</span> Singapore
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {universitiesOverseas.singapore.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-all"
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
                      <span>⏱️ {uni.duration}</span>
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

          {/* Australia */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <span>🇦🇺</span> Australia
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {universitiesOverseas.australia.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-all"
                >
                  <h5 className="text-sm font-semibold text-white/90 leading-tight mb-2">{uni.name}</h5>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-white/60">{uni.program}</p>
                    <div className="text-neon-green font-medium">Total: {uni.totalCost}</div>
                    {uni.ranking && <p className="text-neon-purple text-xs">{uni.ranking}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* UK */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <span>🇬🇧</span> United Kingdom
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {universitiesOverseas.uk.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.85 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-all"
                >
                  <h5 className="text-sm font-semibold text-white/90 leading-tight mb-2">{uni.name}</h5>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-white/60">{uni.program}</p>
                    <div className="text-neon-green font-medium">Total: {uni.totalCost}</div>
                    {uni.ranking && <p className="text-neon-purple text-xs">{uni.ranking}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* USA */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
              <span>🇺🇸</span> United States
            </h4>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {universitiesOverseas.usa.map((uni, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-neon-purple/30 transition-all"
                >
                  <h5 className="text-sm font-semibold text-white/90 leading-tight mb-2">{uni.name}</h5>
                  <div className="space-y-1.5 text-xs">
                    <p className="text-white/60">{uni.program}</p>
                    <div className="text-neon-green font-medium">Total: {uni.totalCost}</div>
                    {uni.ranking && <p className="text-neon-purple text-xs">{uni.ranking}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Japan, Korea, Germany */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                <span>🇯🇵</span> Japan
              </h4>
              <div className="space-y-3">
                {universitiesOverseas.japan.map((uni, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <h5 className="text-xs font-semibold text-white/90 mb-1">{uni.name}</h5>
                    <p className="text-neon-green text-xs font-medium">{uni.totalCost}</p>
                    {uni.ranking && <p className="text-neon-purple text-xs mt-1">{uni.ranking}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                <span>🇰🇷</span> South Korea
              </h4>
              <div className="space-y-3">
                {universitiesOverseas.southKorea.map((uni, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <h5 className="text-xs font-semibold text-white/90 mb-1">{uni.name}</h5>
                    <p className="text-neon-green text-xs font-medium">{uni.totalCost}</p>
                    {uni.ranking && <p className="text-neon-purple text-xs mt-1">{uni.ranking}</p>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white/70 mb-3 flex items-center gap-2">
                <span>🇩🇪</span> Germany
              </h4>
              <div className="space-y-3">
                {universitiesOverseas.germany.map((uni, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                    <h5 className="text-xs font-semibold text-white/90 mb-1">{uni.name}</h5>
                    <p className="text-neon-green text-xs font-medium">{uni.totalCost}</p>
                    {uni.ranking && <p className="text-neon-purple text-xs mt-1">{uni.ranking}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Overseas Cost Summary */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-white/5">
            <h5 className="text-sm font-semibold text-white/80 mb-2">💡 Overseas Cost Range (Total)</h5>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-lg font-bold text-neon-green">RM 50K-87K</p>
                <p className="text-xs text-white/50">Japan/Korea</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-green">RM 312K-594K</p>
                <p className="text-xs text-white/50">Australia</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-green">RM 345K-960K</p>
                <p className="text-xs text-white/50">UK</p>
              </div>
              <div>
                <p className="text-lg font-bold text-neon-green">RM 810K-1.1M</p>
                <p className="text-xs text-white/50">USA</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scholarships Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-neon-yellow" />
            Scholarships & Financial Aid
          </h3>
          <p className="text-white/50 text-sm mb-6">
            {career.scholarships.length} funding opportunities available for this career path
          </p>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-neon-blue" />
              <h4 className="font-semibold text-white/90 text-sm">🇲🇾 Malaysian Scholarships ({career.scholarships.filter(s => s.location === 'Malaysia').length})</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {career.scholarships.filter((s) => s.location === 'Malaysia').map((scholarship, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="text-sm font-medium text-white/90 leading-tight pr-2">{scholarship.name}</h5>
                    <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">{scholarship.coverage}</span>
                  </div>
                  <p className="text-xs text-white/40">{scholarship.provider}</p>
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50 mt-1 inline-block">{scholarship.level}</span>
                </div>
              ))}
            </div>
          </div>

          {career.scholarships.filter((s) => s.location === 'Overseas').length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-neon-purple" />
                <h4 className="font-semibold text-white/90 text-sm">🌏 International Scholarships ({career.scholarships.filter(s => s.location === 'Overseas').length})</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {career.scholarships.filter((s) => s.location === 'Overseas').map((scholarship, i) => (
                  <div key={i} className="p-3 rounded-xl bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 border border-neon-purple/20">
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="text-sm font-medium text-white/90 leading-tight pr-2">{scholarship.name}</h5>
                      <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-300">{scholarship.coverage}</span>
                    </div>
                    <p className="text-xs text-white/40">{scholarship.provider}</p>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50 mt-1 inline-block">{scholarship.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Work Environment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-neon-orange" />
            Day in the Life
          </h3>
          <p className="text-white/60 text-sm mb-4">{career.workEnvironment}</p>
          <div className="space-y-2">
            {career.dayInLife.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className="text-neon-blue text-xs font-mono min-w-[60px]">{activity.split(' - ')[0]}</span>
                <span className="text-white/70">{activity.split(' - ')[1]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* NPC Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="glass-strong rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{career.npcEmoji}</div>
            <div>
              <p className="font-display font-bold text-neon-blue mb-1">{career.npcName} says:</p>
              <p className="text-white/70 text-sm">
                "This is an exciting career path! There are many scholarships and affordable education options 
                both in Malaysia and overseas. With the right SPM results and passion, you can definitely make it! 
                Don't forget to explore the pre-university pathways and plan your budget early."
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'roadmap' })}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center gap-2"
          >
            <Star className="w-4 h-4" />
            View Career Roadmap
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'preuni-scholarships' })}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-yellow to-neon-orange text-white font-semibold flex items-center gap-2"
          >
            💰 Pre-U Scholarships
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'scholarships' })}
            className="px-6 py-3 rounded-full glass text-white/70 hover:text-neon-yellow"
          >
            🎓 Degree Scholarships
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
            className="px-6 py-3 rounded-full glass text-white/70 hover:text-white"
          >
            Explore More Careers
          </motion.button>
        </div>
      </div>
    </div>
  );
}
