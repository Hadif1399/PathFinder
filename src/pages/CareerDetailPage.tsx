import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Users, MapPin, Briefcase, Play, Award, TrendingUp } from 'lucide-react';
import { careers } from '../data/careers';

export default function CareerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const career = careers.find(c => c.id === id);
  const [activeTab, setActiveTab] = useState('overview');

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'pathways', label: 'Pathways', icon: MapPin },
    { id: 'environment', label: 'Day in Life', icon: Briefcase },
    { id: 'videos', label: 'Real Stories', icon: Play },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/catalogue">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Catalogue
          </motion.button>
        </Link>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="text-6xl sm:text-7xl"
            >
              {career.npcAvatar}
            </motion.div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl sm:text-4xl font-bold text-white">{career.title}</h1>
                <span className="text-3xl">{career.icon}</span>
              </div>
              <p className="text-white/60 text-lg mb-4">{career.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-full text-sm bg-neon-green/10 text-neon-green border border-neon-green/20">
                  <TrendingUp className="w-3 h-3 inline mr-1" />
                  {career.demandLevel} Demand
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-neon-blue/10 text-neon-blue border border-neon-blue/20">
                  💰 {career.salaryRange}
                </span>
                <span className="px-3 py-1 rounded-full text-sm bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                  {career.category}
                </span>
              </div>
            </div>
          </div>
          {/* Background glow */}
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl"
            style={{ background: career.color }}
          />
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                    : 'glass text-white/60 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* SPM Requirements */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-neon-blue" />
                  SPM Requirements
                </h3>
                <ul className="space-y-3">
                  {career.spmRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-neon-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-neon-blue text-xs font-bold">{i + 1}</span>
                      </span>
                      <span className="text-white/80">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Personality Traits */}
              <div className="glass rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-neon-purple" />
                  Ideal Personality
                </h3>
                <div className="mb-4">
                  <p className="text-sm text-white/50 mb-2">Holland Code: <span className="text-neon-purple">{career.hollandCode}</span></p>
                  <p className="text-sm text-white/50">MBTI Types: <span className="text-neon-blue">{career.mbtiTypes.join(', ')}</span></p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {career.personalityTraits.map((trait, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-sm bg-neon-purple/10 text-neon-purple border border-neon-purple/20">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pathways' && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-neon-green" />
                Post-SPM Pathways in Malaysia
              </h3>
              <div className="space-y-6">
                {career.pathways.map((pathway, i) => (
                  <div key={i} className="border-l-2 border-neon-blue/30 pl-6 relative">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neon-blue" />
                    <h4 className="text-white font-semibold mb-2">{pathway.type}</h4>
                    <div className="space-y-2">
                      {pathway.options.map((option, j) => (
                        <div key={j} className="glass rounded-lg px-4 py-2 text-white/80 text-sm">
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to={`/roadmap/${career.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-blue text-white font-semibold flex items-center gap-2"
                  >
                    <Award className="w-5 h-5" /> View Full Career Roadmap
                  </motion.button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === 'environment' && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-neon-orange" />
                A Day in the Life
              </h3>
              <div className="space-y-4">
                {career.dayInLife.map((activity, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-20 text-right text-sm text-neon-blue font-mono flex-shrink-0">
                      {activity.split(' - ')[0]}
                    </div>
                    <div className="w-3 h-3 rounded-full bg-neon-orange mt-1.5 flex-shrink-0" />
                    <div className="text-white/80">{activity.split(' - ')[1]}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'videos' && (
            <div className="glass rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Play className="w-5 h-5 text-neon-pink" />
                Real Worker Stories
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Watch real Malaysian professionals share their experiences and advice.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Video placeholder 1 */}
                <div className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-neon-pink/20 flex items-center justify-center mx-auto mb-3">
                      <Play className="w-8 h-8 text-neon-pink" />
                    </div>
                    <p className="text-white/60 text-sm">A Day as a {career.title} in Malaysia</p>
                    <p className="text-white/40 text-xs mt-1">Video from Malaysian professional</p>
                  </div>
                </div>
                {/* Video placeholder 2 */}
                <div className="aspect-video rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="text-center p-4">
                    <div className="w-16 h-16 rounded-full bg-neon-blue/20 flex items-center justify-center mx-auto mb-3">
                      <Play className="w-8 h-8 text-neon-blue" />
                    </div>
                    <p className="text-white/60 text-sm">Career Advice: {career.title}</p>
                    <p className="text-white/40 text-xs mt-1">Tips from industry experts</p>
                  </div>
                </div>
              </div>
              <p className="text-white/40 text-xs mt-4 italic">
                * Videos feature real Malaysian professionals. Placeholder shown — actual videos would be embedded from YouTube/Vimeo.
              </p>
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link to="/completion">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold shadow-lg shadow-neon-blue/30"
            >
              ✨ Complete Exploration & Earn Certificate
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
