import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { Award, Download, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function CertificatePage() {
  const { state, dispatch } = useApp();
  const [name, setName] = useState('');
  const [generated, setGenerated] = useState(false);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <Award className="w-20 h-20 text-neon-yellow mx-auto mb-6" />
          <h1 className="font-display text-3xl font-bold text-white mb-4">Congratulations!</h1>
          <p className="text-white/60 mb-8">You've completed your career exploration journey. Claim your certificate of completion!</p>
          
          {!generated ? (
            <div className="glass-strong rounded-2xl p-8">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your full name" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-blue mb-4" />
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => name && setGenerated(true)} disabled={!name} className="w-full px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold disabled:opacity-30">Generate Certificate</motion.button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass-strong rounded-2xl p-8 border-2 border-neon-blue/30">
              <div className="border-2 border-dashed border-neon-blue/30 rounded-xl p-6 mb-6">
                <Award className="w-12 h-12 text-neon-yellow mx-auto mb-4" />
                <p className="text-xs text-white/40 mb-2">Certificate of Completion</p>
                <p className="font-display text-2xl font-bold text-white mb-2">{name}</p>
                <p className="text-sm text-white/50">has successfully completed the</p>
                <p className="text-neon-blue font-medium">CareerCompass Career Assessment</p>
                <p className="text-xs text-white/30 mt-4">Verified by CareerCompass Malaysia</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-green-400 text-sm mb-4">
                <CheckCircle className="w-4 h-4" />Certificate generated successfully
              </div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center justify-center gap-2 mx-auto">
                <Download className="w-4 h-4" />Download Certificate
              </motion.button>
            </motion.div>
          )}

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => dispatch({ type: 'RESET' })} className="mt-8 px-6 py-3 rounded-full glass text-white/60 hover:text-white">Start Over 🔄</motion.button>
        </motion.div>
      </div>
    </div>
  );
}
