import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { ArrowLeft, TrendingUp, GraduationCap } from 'lucide-react';
import { careers } from '../data/careers';

export default function RoadmapPage() {
  const { state, dispatch } = useApp();
  const career = careers.find((c) => c.id === state.selectedCareer);

  if (!career) return (<div className="min-h-screen pt-20 flex items-center justify-center"><p className="text-white/60">Career not found</p></div>);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'career-detail' })} className="flex items-center gap-2 text-white/60 hover:text-neon-blue mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to Career Details
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="text-5xl mb-4">{career.icon}</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">{career.title} Career Roadmap</h1>
          <p className="text-white/60">Your journey from SPM to becoming a {career.title}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-orange hidden md:block" />
          <div className="space-y-8">
            {[
              { title: 'SPM (Form 5)', desc: `Achieve required grades in ${career.spmRequirements.map(r => r.subject).join(', ')}`, status: 'current', color: '#00d4ff' },
              { title: career.pathways[0]?.type || 'Pre-University', desc: `${career.pathways[0]?.duration || '1-2 years'} at ${career.pathways[0]?.institutions.slice(0, 2).join(' or ')}`, status: 'locked', color: '#a855f7' },
              { title: career.pathways[1]?.type || 'Bachelor\'s Degree', desc: `${career.pathways[1]?.duration || '3-4 years'} specializing in ${career.title}`, status: 'locked', color: '#f472b6' },
              { title: 'Internship / Entry Level', desc: `Gain real-world experience. Starting salary: ${career.salaryRange.split(' - ')[0]}`, status: 'locked', color: '#22d3ee' },
              { title: 'Mid-Level Professional', desc: `3-5 years experience. Specialize in ${career.personalityTraits[0].toLowerCase()} areas.`, status: 'locked', color: '#fbbf24' },
              { title: 'Senior / Lead Role', desc: `Lead teams and projects. Salary: ${career.salaryRange.split(' - ')[1] || 'RM 15,000+'}`, status: 'locked', color: '#fb923c' },
            ].map((stage, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.15 }} className="relative flex gap-6 items-start">
                <div className="hidden md:flex shrink-0">
                  <motion.div whileHover={{ scale: 1.2 }} className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${stage.status === 'current' ? 'bg-neon-blue/20' : 'bg-space-700 border-white/20'}`} style={stage.status === 'current' ? { borderColor: stage.color } : {}}>
                    {stage.status === 'current' ? <GraduationCap className="w-6 h-6 text-neon-blue" /> : <TrendingUp className="w-5 h-5 text-white/40" />}
                  </motion.div>
                </div>
                <motion.div whileHover={{ x: 5 }} className={`flex-1 glass rounded-2xl p-6 ${stage.status === 'current' ? 'ring-1 ring-neon-blue/50' : ''}`}>
                  <h3 className="font-display text-lg font-bold text-white mb-2">{stage.title}</h3>
                  <p className="text-white/60 text-sm">{stage.desc}</p>
                  {stage.status === 'current' && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
                      <span className="text-xs text-neon-green">You are here</span>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
