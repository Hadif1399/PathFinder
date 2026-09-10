import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, GraduationCap, Briefcase, TrendingUp, Crown, CheckCircle2 } from 'lucide-react';
import { careers } from '../data/careers';

export default function RoadmapPage() {
  const { id } = useParams<{ id: string }>();
  const career = careers.find(c => c.id === id);

  if (!career) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Career not found</h1>
          <Link to="/catalogue" className="text-neon-blue hover:underline">Back to Catalogue</Link>
        </div>
      </div>
    );
  }

  const stageIcons = [GraduationCap, Briefcase, TrendingUp, Crown];
  const stageColors = ['from-neon-blue to-cyan-400', 'from-neon-green to-emerald-400', 'from-neon-purple to-violet-400', 'from-neon-yellow to-amber-400'];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <Link to={`/career/${career.id}`}>
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to {career.title}
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-5xl mb-4">{career.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Career Roadmap: <span className="gradient-text">{career.title}</span>
          </h1>
          <p className="text-white/60">Your visual journey from SPM to the top</p>
        </motion.div>

        {/* Skill Tree / Roadmap */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-blue via-neon-purple to-neon-yellow rounded-full" />

          <div className="space-y-8">
            {career.roadmap.map((stage, i) => {
              const Icon = stageIcons[i] || GraduationCap;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="relative pl-16 sm:pl-20"
                >
                  {/* Node */}
                  <div className={`absolute left-2 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${stageColors[i]} flex items-center justify-center shadow-lg z-10`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Content Card */}
                  <div className="glass rounded-2xl p-6 card-hover">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                        <p className="text-white/50 text-sm">{stage.duration}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs bg-white/10 text-white/60 border border-white/10">
                        Stage {i + 1}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {stage.details.map((detail, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-neon-green mt-0.5 flex-shrink-0" />
                          <span className="text-white/80 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center space-y-4"
        >
          <p className="text-white/60">Ready to explore more?</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to={`/career/${career.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl glass text-white font-semibold border border-white/20"
              >
                📋 View Full Career Details
              </motion.button>
            </Link>
            <Link to="/catalogue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold"
              >
                🔍 Explore Other Careers
              </motion.button>
            </Link>
            <Link to="/completion">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-blue text-white font-semibold"
              >
                🏆 Complete & Get Certificate
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
