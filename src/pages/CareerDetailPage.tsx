import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import { ArrowLeft, BookOpen, Briefcase, GraduationCap, Heart, Play, Star, Award, Globe, MapPin } from 'lucide-react';

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

          {/* Post-SPM Pathways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-neon-green" />
              Post-SPM Pathways
            </h3>
            <div className="space-y-4">
              {career.pathways.map((pathway, i) => (
                <div key={i} className="p-3 rounded-xl bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90 text-sm font-medium">{pathway.type}</span>
                    <span className="text-neon-blue text-xs">{pathway.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pathway.institutions.map((inst) => (
                      <span key={inst} className="text-xs text-white/50 px-2 py-0.5 rounded bg-white/5">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Work Environment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-neon-orange" />
              Day in the Life
            </h3>
            <p className="text-white/60 text-sm mb-4">{career.workEnvironment}</p>
            <div className="space-y-2">
              {career.dayInLife.map((activity, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-neon-blue text-xs font-mono min-w-[60px]">
                    {activity.split(' - ')[0]}
                  </span>
                  <span className="text-white/70">{activity.split(' - ')[1]}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Scholarships Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-neon-yellow" />
            Scholarships & Financial Aid
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Funding opportunities available for pursuing this career path
          </p>

          {/* Malaysian Scholarships */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-neon-blue" />
              <h4 className="font-semibold text-white/90 text-sm">🇲🇾 Malaysian Scholarships</h4>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {career.scholarships
                .filter((s) => s.location === 'Malaysia')
                .map((scholarship, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-neon-blue/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <h5 className="text-sm font-medium text-white/90 leading-tight pr-2">
                        {scholarship.name}
                      </h5>
                      <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                        scholarship.coverage === 'Full' ? 'bg-green-500/20 text-green-300' :
                        scholarship.coverage === 'Partial' ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-blue-500/20 text-blue-300'
                      }`}>
                        {scholarship.coverage}
                      </span>
                    </div>
                    <p className="text-xs text-white/40 mb-1">{scholarship.provider}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50">
                        {scholarship.level}
                      </span>
                    </div>
                    {scholarship.description && (
                      <p className="text-xs text-white/40 mt-2 leading-relaxed">
                        {scholarship.description}
                      </p>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>

          {/* Overseas Scholarships */}
          {career.scholarships.filter((s) => s.location === 'Overseas').length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-4 h-4 text-neon-purple" />
                <h4 className="font-semibold text-white/90 text-sm">🌏 International Scholarships</h4>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {career.scholarships
                  .filter((s) => s.location === 'Overseas')
                  .map((scholarship, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      className="p-3 rounded-xl bg-gradient-to-br from-neon-purple/5 to-neon-blue/5 border border-neon-purple/20 hover:border-neon-purple/40 transition-all"
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h5 className="text-sm font-medium text-white/90 leading-tight pr-2">
                          {scholarship.name}
                        </h5>
                        <span className={`shrink-0 px-2 py-0.5 rounded-full text-xs font-medium ${
                          scholarship.coverage === 'Full' ? 'bg-green-500/20 text-green-300' :
                          scholarship.coverage === 'Partial' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {scholarship.coverage}
                        </span>
                      </div>
                      <p className="text-xs text-white/40 mb-1">{scholarship.provider}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-white/50">
                          {scholarship.level}
                        </span>
                      </div>
                      {scholarship.description && (
                        <p className="text-xs text-white/40 mt-2 leading-relaxed">
                          {scholarship.description}
                        </p>
                      )}
                    </motion.div>
                  ))}
              </div>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 border border-white/5">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-neon-blue">
                  {career.scholarships.filter((s) => s.location === 'Malaysia').length}
                </p>
                <p className="text-xs text-white/50">Local Scholarships</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-neon-purple">
                  {career.scholarships.filter((s) => s.location === 'Overseas').length}
                </p>
                <p className="text-xs text-white/50">Overseas Scholarships</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-neon-green">
                  {career.scholarships.filter((s) => s.coverage === 'Full').length}
                </p>
                <p className="text-xs text-white/50">Full Coverage</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <h3 className="font-display text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-neon-pink" />
            Real Professionals Share Their Experience
          </h3>
          <p className="text-white/50 text-sm mb-6">
            Watch real Malaysian professionals talk about their career journey
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="aspect-video rounded-xl bg-space-700 flex items-center justify-center border border-white/10 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10" />
              <div className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-white/20 transition-colors">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-white/70">Malaysian Software Engineer</p>
                <p className="text-xs text-white/40">Career Journey & Tips</p>
              </div>
            </div>
            <div className="aspect-video rounded-xl bg-space-700 flex items-center justify-center border border-white/10 relative overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-neon-orange/10" />
              <div className="text-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-white/20 transition-colors">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm text-white/70">Day in the Life</p>
                <p className="text-xs text-white/40">What to Expect</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* NPC Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-strong rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-4">
            <div className="text-4xl">{career.npcEmoji}</div>
            <div>
              <p className="font-display font-bold text-neon-blue mb-1">{career.npcName} says:</p>
              <p className="text-white/70 text-sm">
                "This is an exciting career path! In Malaysia, we're seeing huge growth in this field. 
                With the right SPM results and passion, you can definitely make it. There are also 
                <span className="text-neon-yellow font-medium"> {career.scholarships.length} scholarships </span> 
                available to help fund your journey — both local and overseas! Start building your 
                skills now and don't be afraid to explore!"
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
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
            className="px-6 py-3 rounded-full glass text-white/70 hover:text-white"
          >
            Explore More Careers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'COMPLETE_EXPLORATION' })}
            className="px-6 py-3 rounded-full glass text-white/70 hover:text-white"
          >
            I'm Done Exploring ✨
          </motion.button>
        </div>
      </div>
    </div>
  );
}
