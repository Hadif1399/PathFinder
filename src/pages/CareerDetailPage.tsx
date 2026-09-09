import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import { ArrowLeft, GraduationCap, Briefcase, Heart, Award, Globe, MapPin, DollarSign, TrendingUp, ChevronDown, Star, Clock, BookOpen, Sparkles } from 'lucide-react';

type TabType = 'overview' | 'education' | 'scholarships' | 'pathways';

export default function CareerDetailPage() {
  const { state, dispatch } = useApp();
  const career = careers.find((c) => c.id === state.selectedCareer);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!career) return (<div className="min-h-screen pt-20 flex items-center justify-center"><p className="text-white/60">Career not found</p></div>);

  const toggleSection = (section: string) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));

  const tabs = [
    { id: 'overview' as TabType, label: 'Overview', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'education' as TabType, label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'scholarships' as TabType, label: 'Scholarships', icon: <Award className="w-4 h-4" /> },
    { id: 'pathways' as TabType, label: 'Career Path', icon: <TrendingUp className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {state.recommendedCareers.length > 0 && (
          <motion.button initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'results' })} className="w-full sm:w-auto mb-6 px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 border border-neon-blue/30 text-white hover:from-neon-blue/30 hover:to-neon-purple/30 transition-all flex items-center justify-center gap-3 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Recommended Careers</span>
            <span className="hidden sm:inline text-xs px-2 py-1 rounded-full bg-neon-blue/20 text-neon-blue">{state.recommendedCareers.length} matches</span>
          </motion.button>
        )}

        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })} className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /><span className="text-sm">Browse All Careers</span>
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0 shadow-lg" style={{ background: `linear-gradient(135deg, ${career.color}20, ${career.color}10)`, border: `1px solid ${career.color}30` }}>{career.icon}</div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">{career.title}</h1>
              <p className="text-white/40 text-sm mb-4 font-medium">{career.titleMalay}</p>
              <p className="text-white/70 text-lg leading-relaxed max-w-3xl">{career.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2"><DollarSign className="w-4 h-4 text-neon-yellow" /><span className="text-xs text-white/50 uppercase tracking-wide">Salary</span></div>
              <p className="text-sm font-semibold text-white">{career.salaryRange}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4 text-neon-green" /><span className="text-xs text-white/50 uppercase tracking-wide">Demand</span></div>
              <p className={`text-sm font-semibold ${career.demandLevel === 'Critical' ? 'text-red-400' : career.demandLevel === 'Very High' ? 'text-orange-400' : 'text-green-400'}`}>{career.demandLevel}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Award className="w-4 h-4 text-neon-purple" /><span className="text-xs text-white/50 uppercase tracking-wide">Scholarships</span></div>
              <p className="text-sm font-semibold text-white">{career.scholarships.length} Available</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2"><Star className="w-4 h-4 text-neon-blue" /><span className="text-xs text-white/50 uppercase tracking-wide">Category</span></div>
              <p className="text-sm font-semibold text-white">{career.category}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${activeTab === tab.id ? 'bg-white text-space-900 shadow-lg' : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10'}`}>
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"><GraduationCap className="w-5 h-5 text-neon-blue" />SPM Requirements</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {career.spmRequirements.map((req, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                        <span className="text-white/80 text-sm">{req.subject}</span>
                        <span className="text-neon-green text-xs font-medium px-3 py-1 rounded-full bg-green-500/10">{req.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"><Heart className="w-5 h-5 text-neon-pink" />Ideal Personality</h3>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wide mb-3">Key Traits</p>
                      <div className="flex flex-wrap gap-2">
                        {career.personalityTraits.map((trait) => (<span key={trait} className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm border border-white/10">{trait}</span>))}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-white/40 uppercase tracking-wide mb-3">MBTI Types</p>
                      <div className="flex flex-wrap gap-2">
                        {career.mbtiTypes.map((type) => (<span key={type} className="px-4 py-2 rounded-full bg-neon-purple/10 text-neon-purple text-sm font-medium border border-neon-purple/20">{type}</span>))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"><Briefcase className="w-5 h-5 text-neon-orange" />Work Environment</h3>
                  <p className="text-white/70 leading-relaxed mb-6">{career.workEnvironment}</p>
                  <button onClick={() => toggleSection('dayInLife')} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-white/80 font-medium flex items-center gap-2"><Clock className="w-4 h-4" />A Day in the Life</span>
                    <ChevronDown className={`w-5 h-5 text-white/40 transition-transform ${expandedSections.dayInLife ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedSections.dayInLife && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="pt-4 space-y-3">
                          {career.dayInLife.map((activity, i) => (
                            <div key={i} className="flex items-start gap-4 text-sm">
                              <span className="text-neon-blue text-xs font-mono min-w-[70px] pt-0.5">{activity.split(' - ')[0]}</span>
                              <span className="text-white/70">{activity.split(' - ')[1]}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"><BookOpen className="w-5 h-5 text-neon-green" />Education Pathways</h3>
                <div className="space-y-3">
                  {career.pathways.map((pathway, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-semibold text-white">{pathway.type}</h4>
                        <span className="text-xs text-neon-blue font-medium">{pathway.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {pathway.institutions.map((inst) => (<span key={inst} className="text-xs text-white/50 px-2 py-1 rounded bg-white/5">{inst}</span>))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'scholarships' && (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"><MapPin className="w-5 h-5 text-neon-blue" />Malaysian Scholarships ({career.scholarships.filter(s => s.location === 'Malaysia').length})</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {career.scholarships.filter((s) => s.location === 'Malaysia').map((scholarship, i) => (
                      <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                        <h4 className="text-sm font-semibold text-white mb-1">{scholarship.name}</h4>
                        <p className="text-xs text-white/40 mb-2">{scholarship.provider}</p>
                        <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 font-medium">{scholarship.coverage}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {career.scholarships.filter((s) => s.location === 'Overseas').length > 0 && (
                  <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                    <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"><Globe className="w-5 h-5 text-neon-purple" />International Scholarships ({career.scholarships.filter(s => s.location === 'Overseas').length})</h3>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {career.scholarships.filter((s) => s.location === 'Overseas').map((scholarship, i) => (
                        <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                          <h4 className="text-sm font-semibold text-white mb-1">{scholarship.name}</h4>
                          <p className="text-xs text-white/40 mb-2">{scholarship.provider}</p>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 font-medium">{scholarship.coverage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'pathways' && (
              <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3"><TrendingUp className="w-5 h-5 text-neon-green" />Your Career Journey</h3>
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
                          {pathway.institutions.map((inst) => (<span key={inst} className="text-xs text-white/50 px-2 py-1 rounded bg-white/5">{inst}</span>))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
