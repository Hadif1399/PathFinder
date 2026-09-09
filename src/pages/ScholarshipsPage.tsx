import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { Award, MapPin, Globe } from 'lucide-react';
import { careers } from '../data/careers';

export default function ScholarshipsPage() {
  const { dispatch } = useApp();
  const allScholarships = careers.flatMap((c) => c.scholarships.map((s) => ({ ...s, career: c.title })));
  const uniqueScholarships = Array.from(new Map(allScholarships.map((s) => [s.name, s])).values());

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4"><Award className="w-4 h-4 text-neon-yellow" /><span className="text-sm text-white/80">Funding Your Future</span></div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Scholarships Directory</h1>
          <p className="text-white/60 max-w-lg mx-auto">Discover {uniqueScholarships.length} scholarships available for Malaysian students pursuing STEM & IT careers</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[{ label: 'Total', value: uniqueScholarships.length, icon: '🎓' }, { label: 'Malaysian', value: uniqueScholarships.filter((s) => s.location === 'Malaysia').length, icon: '🇲🇾' }, { label: 'Overseas', value: uniqueScholarships.filter((s) => s.location === 'Overseas').length, icon: '🌏' }, { label: 'Full Coverage', value: uniqueScholarships.filter((s) => s.coverage === 'Full').length, icon: '💯' }].map((stat, i) => (
            <div key={i} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-bold ${i === 0 ? 'text-neon-blue' : i === 1 ? 'text-neon-green' : i === 2 ? 'text-neon-purple' : 'text-neon-yellow'}`}>{stat.value}</div>
              <div className="text-xs text-white/50">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <div className="mb-8">
          <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-neon-blue" />🇲🇾 Malaysian Scholarships</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueScholarships.filter((s) => s.location === 'Malaysia').map((scholarship, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} whileHover={{ y: -3 }} className="glass rounded-xl p-5 border border-white/10 hover:border-neon-blue/30 transition-all">
                <h4 className="text-sm font-semibold text-white/90 mb-1">{scholarship.name}</h4>
                <p className="text-xs text-white/40 mb-2">{scholarship.provider}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 font-medium">{scholarship.coverage}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">{scholarship.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-neon-purple" />🌏 International Scholarships</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uniqueScholarships.filter((s) => s.location === 'Overseas').map((scholarship, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} whileHover={{ y: -3 }} className="glass rounded-xl p-5 border border-neon-purple/20 hover:border-neon-purple/40 transition-all">
                <h4 className="text-sm font-semibold text-white/90 mb-1">{scholarship.name}</h4>
                <p className="text-xs text-white/40 mb-2">{scholarship.provider}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-300 font-medium">{scholarship.coverage}</span>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/50">{scholarship.level}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 text-center">
          <div className="glass-strong rounded-2xl p-8">
            <h3 className="font-display text-xl font-bold text-white mb-3">Not sure which scholarship to apply for?</h3>
            <p className="text-white/60 text-sm mb-6">Take our career quiz to get personalized scholarship recommendations</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })} className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold">Take Career Quiz 🎯</motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
