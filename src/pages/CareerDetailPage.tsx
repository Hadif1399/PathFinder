import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import { commonPreUniversity, universitiesMalaysia, universitiesOverseas } from '../data/education';
import { 
  ArrowLeft, 
  GraduationCap, 
  Briefcase, 
  Heart, 
  Award, 
  Globe, 
  MapPin, 
  DollarSign, 
  TrendingUp,
  ChevronDown,
  ChevronRight,
  Star,
  Clock,
  Users,
  BookOpen,
  Building2,
  Sparkles
} from 'lucide-react';

type TabType = 'overview' | 'education' | 'scholarships' | 'pathways';

export default function CareerDetailPage() {
  const { state, dispatch } = useApp();
  const career = careers.find((c) => c.id === state.selectedCareer);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!career) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-white/60">Career not found</p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'education' as TabType, label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'scholarships' as TabType, label: 'Scholarships', icon: <Award className="w-4 h-4" /> },
    { id: 'pathways' as TabType, label: 'Career Path', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back to Recommended Careers button - Primary */}
        {state.recommendedCareers.length > 0 && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'results' })}
            className="w-full sm:w-auto mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 text-white hover:from-neon-blue/30 hover:to-neon-purple/30 hover:border-neon-blue/50 hover:shadow-lg hover:shadow-neon-blue/20 transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-medium">Back to Recommended Careers</span>
            <span className="hidden sm:inline text-xs px-2 py-1 rounded-full bg-neon-blue/20 text-neon-blue">
              {state.recommendedCareers.length} matches
            </span>
          </motion.button>
        )}

        {/* Back to Catalogue button - Secondary */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
          className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm">Browse All Careers</span>
        </motion.button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0 shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${career.color}20, ${career.color}10)`,
                border: `1px solid ${career.color}30`
              }}
            >
              {career.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
                {career.title}
              </h1>
              <p className="text-white/40 text-sm mb-4 font-medium">
                {career.titleMalay}
              </p>
              <p className="text-white/70 text-lg leading-relaxed max-w-3xl">
                {career.description}
              </p>
            </div>
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-neon-yellow" />
                <span className="text-xs text-white/50 uppercase tracking-wide">Salary</span>
              </div>
              <p className="text-sm font-semibold text-white">{career.salaryRange}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-neon-green" />
                <span className="text-xs text-white/50 uppercase tracking-wide">Demand</span>
              </div>
              <p className={`text-sm font-semibold ${
                career.demandLevel === 'Critical' ? 'text-red-400' :
                career.demandLevel === 'Very High' ? 'text-orange-400' :
                'text-green-400'
              }`}>{career.demandLevel}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-neon-purple" />
                <span className="text-xs text-white/50 uppercase tracking-wide">Scholarships</span>
              </div>
              <p className="text-sm font-semibold text-white">{career.scholarships.length} Available</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-neon-blue" />
                <span className="text-xs text-white/50 uppercase tracking-wide">Category</span>
              </div>
              <p className="text-sm font-semibold text-white">{career.category}</p>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-space-900 shadow-lg'
                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* SPM Requirements */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-neon-blue" />
                    SPM Requirements
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {career.spmRequirements.map((req, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-white/80 text-sm">{req.subject}</span>
                        <span className="text-neon-green text-xs font-medium px-3 py-1 rounded-full bg-green-500/10">
                          {req.grade}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Personality & Traits */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Heart className="w-5 h-5 text-neon-pink" />
                    Ideal Personality
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wide mb-3">Key Traits</p>
                      <div className="flex flex-wrap gap-2">
                        {career.personalityTraits.map((trait) => (
                          <span key={trait} className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm border border-white/10">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wide mb-3">MBTI Types</p>
                      <div className="flex flex-wrap gap-2">
                        {career.mbtiTypes.map((type) => (
                          <span key={type} className="px-4 py-2 rounded-full bg-neon-purple/10 text-neon-purple text-sm font-medium border border-neon-purple/20">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wide mb-3">Holland Code</p>
                      <p className="text-white/80 text-sm">{career.hollandCode}</p>
                    </div>
                  </div>
                </div>

                {/* Work Environment */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-neon-orange" />
                    Work Environment
                  </h3>
                  <p className="text-white/70 leading-relaxed mb-6">{career.workEnvironment}</p>
                  
                  {/* Day in Life - Accordion */}
                  <button
                    onClick={() => toggleSection('dayInLife')}
                    className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white/80 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      A Day in the Life
                    </span>
                    <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSections.dayInLife ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedSections.dayInLife && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 space-y-3">
                          {career.dayInLife.map((activity, i) => (
                            <div key={i} className="flex items-start gap-4 text-sm">
                              <span className="text-neon-blue text-xs font-mono min-w-[70px] pt-0.5">
                                {activity.split(' - ')[0]}
                              </span>
                              <span className="text-white/70">{activity.split(' - ')[1]}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* NPC Message */}
                <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-8 border border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl shrink-0">{career.npcEmoji}</div>
                    <div>
                      <p className="font-semibold text-white mb-2">{career.npcName}</p>
                      <p className="text-white/70 text-sm leading-relaxed">
                        "This is an exciting career path! In Malaysia, we're seeing huge growth in this field. 
                        With the right SPM results and passion, you can definitely make it. There are 
                        <span className="text-neon-yellow font-medium"> {career.scholarships.length} scholarships </span> 
                        available to help fund your journey — both local and overseas!"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-6">
                {/* Pre-University */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-neon-green" />
                    Pre-University Pathways
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {commonPreUniversity.slice(0, 4).map((preU, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                        <h4 className="text-sm font-semibold text-white mb-2">{preU.name}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-white/60">
                            <Clock className="w-3 h-3" />
                            <span>{preU.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-neon-yellow">
                            <DollarSign className="w-3 h-3" />
                            <span className="font-medium">{preU.cost}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Malaysian Universities */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-neon-blue" />
                    Malaysian Universities
                  </h3>
                  <div className="space-y-3">
                    {universitiesMalaysia.publicTop.slice(0, 3).map((uni, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-white">{uni.name}</h4>
                          {uni.ranking && (
                            <span className="text-xs px-2 py-1 rounded-full bg-neon-blue/10 text-neon-blue">
                              {uni.ranking.split(' ').pop()}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-xs">
                          <p className="text-white/60">{uni.program}</p>
                          <div className="flex items-center gap-2 text-neon-green font-medium">
                            <span>Total: {uni.totalCost}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'NAVIGATE', page: 'universities' })}
                    className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    View All Universities →
                  </button>
                </div>

                {/* Overseas Universities */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Globe className="w-5 h-5 text-neon-purple" />
                    International Universities
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[...universitiesOverseas.singapore, ...universitiesOverseas.australia].slice(0, 4).map((uni, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-white">{uni.name}</h4>
                          <span className="text-xs">
                            {uni.country === 'Singapore' ? '🇸🇬' : '🇦🇺'}
                          </span>
                        </div>
                        <div className="text-xs text-neon-green font-medium">
                          {uni.totalCost}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => dispatch({ type: 'NAVIGATE', page: 'universities' })}
                    className="mt-4 w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    View All International Options →
                  </button>
                </div>
              </div>
            )}

            {/* Scholarships Tab */}
            {activeTab === 'scholarships' && (
              <div className="space-y-6">
                {/* Malaysian Scholarships */}
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-neon-blue" />
                    Malaysian Scholarships ({career.scholarships.filter(s => s.location === 'Malaysia').length})
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {career.scholarships.filter((s) => s.location === 'Malaysia').map((scholarship, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-neon-blue/30 transition-colors">
                        <h4 className="text-sm font-semibold text-white mb-1">{scholarship.name}</h4>
                        <p className="text-xs text-white/40 mb-2">{scholarship.provider}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 font-medium">
                            {scholarship.coverage}
                          </span>
                          <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">
                            {scholarship.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* International Scholarships */}
                {career.scholarships.filter((s) => s.location === 'Overseas').length > 0 && (
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                      <Globe className="w-5 h-5 text-neon-purple" />
                      International Scholarships ({career.scholarships.filter(s => s.location === 'Overseas').length})
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {career.scholarships.filter((s) => s.location === 'Overseas').map((scholarship, i) => (
                        <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5 hover:border-neon-purple/30 transition-colors">
                          <h4 className="text-sm font-semibold text-white mb-1">{scholarship.name}</h4>
                          <p className="text-xs text-white/40 mb-2">{scholarship.provider}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 font-medium">
                              {scholarship.coverage}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">
                              {scholarship.level}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <button
                  onClick={() => dispatch({ type: 'NAVIGATE', page: 'scholarships' })}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all"
                >
                  Browse All Scholarships →
                </button>
              </div>
            )}

            {/* Career Path Tab */}
            {activeTab === 'pathways' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-neon-green" />
                    Your Career Journey
                  </h3>
                  <div className="space-y-4">
                    {career.pathways.map((pathway, i) => (
                      <div key={i} className="relative pl-8 pb-6 border-l-2 border-white/10 last:border-l-0 last:pb-0">
                        <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-neon-blue -translate-x-[9px]" />
                        <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-sm font-semibold text-white">{pathway.type}</h4>
                            <span className="text-xs text-neon-blue font-medium">{pathway.duration}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {pathway.institutions.map((inst) => (
                              <span key={inst} className="text-xs text-white/50 px-2 py-1 rounded bg-white/5">
                                {inst}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => dispatch({ type: 'NAVIGATE', page: 'roadmap' })}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold hover:shadow-lg hover:shadow-neon-blue/30 transition-all flex items-center justify-center gap-2"
                >
                  <Star className="w-4 h-4" />
                  View Full Career Roadmap
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <button
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all font-medium"
          >
            Explore More Careers
          </button>
          <button
            onClick={() => dispatch({ type: 'COMPLETE_EXPLORATION' })}
            className="px-8 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white transition-all font-medium"
          >
            I'm Done Exploring ✨
          </button>
        </motion.div>
      </div>
    </div>
  );
}
