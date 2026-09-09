import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { careers } from '../data/careers';
import { ArrowLeft, CheckCircle2, Lock, GraduationCap, Briefcase, Crown } from 'lucide-react';

export default function RoadmapPage() {
  const { state, dispatch } = useApp();
  const career = careers.find((c) => c.id === state.selectedCareer);

  if (!career) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-white/60">Career not found</p>
      </div>
    );
  }

  const stages = [
    {
      title: 'SPM (Form 5)',
      description: `Achieve required grades in ${career.spmRequirements.map(r => r.subject).join(', ')}`,
      icon: <GraduationCap className="w-6 h-6" />,
      status: 'current',
      color: '#00d4ff',
    },
    {
      title: career.pathways[0]?.type || 'Pre-University',
      description: `${career.pathways[0]?.duration || '1-2 years'} at ${career.pathways[0]?.institutions.slice(0, 2).join(' or ')}`,
      icon: <GraduationCap className="w-6 h-6" />,
      status: 'locked',
      color: '#a855f7',
    },
    {
      title: career.pathways[1]?.type || 'Bachelor\'s Degree',
      description: `${career.pathways[1]?.duration || '3-4 years'} specializing in ${career.title}`,
      icon: <GraduationCap className="w-6 h-6" />,
      status: 'locked',
      color: '#f472b6',
    },
    {
      title: 'Internship / Entry Level',
      description: `Gain real-world experience. Starting salary: ${career.salaryRange.split(' - ')[0]}`,
      icon: <Briefcase className="w-6 h-6" />,
      status: 'locked',
      color: '#22d3ee',
    },
    {
      title: 'Mid-Level Professional',
      description: `3-5 years experience. Specialize in ${career.personalityTraits[0].toLowerCase()} areas.`,
      icon: <Briefcase className="w-6 h-6" />,
      status: 'locked',
      color: '#fbbf24',
    },
    {
      title: 'Senior / Lead Role',
      description: `Lead teams and projects. Salary: ${career.salaryRange.split(' - ')[1] || 'RM 15,000+'}`,
      icon: <Crown className="w-6 h-6" />,
      status: 'locked',
      color: '#fb923c',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => dispatch({ type: 'NAVIGATE', page: 'career-detail' })}
          className="flex items-center gap-2 text-white/60 hover:text-neon-blue mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Career Details
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-5xl mb-4">{career.icon}</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">
            {career.title} Career Roadmap
          </h1>
          <p className="text-white/60">
            Your journey from SPM to becoming a {career.title}
          </p>
        </motion.div>

        {/* Skill Tree / Roadmap */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-orange hidden md:block" />

          <div className="space-y-8">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative flex gap-6 items-start"
              >
                {/* Node */}
                <div className="hidden md:flex shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${
                      stage.status === 'current'
                        ? 'border-neon-blue bg-neon-blue/20 shadow-lg shadow-neon-blue/30'
                        : 'border-white/20 bg-space-700'
                    }`}
                    style={stage.status === 'current' ? { borderColor: stage.color } : {}}
                  >
                    <div style={{ color: stage.status === 'current' ? stage.color : '#ffffff60' }}>
                      {stage.status === 'current' ? stage.icon : <Lock className="w-5 h-5" />}
                    </div>
                  </motion.div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`flex-1 glass rounded-2xl p-6 ${
                    stage.status === 'current' ? 'ring-1 ring-neon-blue/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="md:hidden text-2xl" style={{ color: stage.color }}>
                      {stage.status === 'current' ? stage.icon : <Lock className="w-5 h-5" />}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{stage.title}</h3>
                    {stage.status === 'current' && (
                      <CheckCircle2 className="w-5 h-5 text-neon-green" />
                    )}
                  </div>
                  <p className="text-white/60 text-sm">{stage.description}</p>
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

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'career-detail' })}
            className="px-6 py-3 rounded-full glass text-white/70 hover:text-white"
          >
            View Full Details
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
            className="px-6 py-3 rounded-full glass text-white/70 hover:text-white"
          >
            Explore Other Careers
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              dispatch({ type: 'COMPLETE_EXPLORATION' });
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold"
          >
            Complete & Get Rewards ✨
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
