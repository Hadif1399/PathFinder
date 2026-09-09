import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import AIMascot from '../components/AIMascot';
import { useState } from 'react';
import { Award, Download, Mail, CheckCircle, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CertificatePage() {
  const { state, dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [name, setName] = useState(state.userName || '');
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [showCelebration, setShowCelebration] = useState(!state.explorationComplete);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#00d4ff', '#a855f7', '#f472b6', '#22d3ee'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00d4ff', '#a855f7', '#f472b6', '#22d3ee'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const validateEmail = (email: string): boolean => {
    const moeDomains = [
      '@moe.edu.my',
      '@moe.gov.my',
      '@edu.my',
      '@smk',
      '@sbt',
      '@mrsm',
      '@sbp',
    ];
    const isValidDomain = moeDomains.some(domain => email.toLowerCase().includes(domain));
    return isValidDomain;
  };

  const handleEmailSubmit = () => {
    if (!email) {
      setEmailError('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Email must be a valid MOE/school email (e.g., @moe.edu.my, @smk..., @mrsm...)');
      return;
    }
    setEmailError('');
    dispatch({ type: 'SET_USER_EMAIL', email });
  };

  const handleGenerateCertificate = () => {
    if (!name) return;
    dispatch({ type: 'SET_USER_NAME', name });
    dispatch({ type: 'CLAIM_CERTIFICATE' });
    setCertificateGenerated(true);
    triggerConfetti();
  };

  const handleCelebrationDone = () => {
    setShowCelebration(false);
    triggerConfetti();
  };

  if (showCelebration) {
    return (
      <div className="min-h-screen pt-20 pb-10 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-6xl mb-6"
          >
            <PartyPopper className="w-20 h-20 text-neon-yellow mx-auto" />
          </motion.div>
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            Congratulations! 🎉
          </h1>
          <p className="text-white/60 mb-8">
            You've completed your career exploration journey! You've unlocked exclusive rewards and benefits.
          </p>
          <div className="flex justify-center mb-8">
            <AIMascot size="md" message="You did it! Let's get your rewards! 🏆" />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCelebrationDone}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-lg"
          >
            Claim My Rewards ✨
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-3xl font-bold text-white mb-4">
            Your Rewards 🏆
          </h1>
          <p className="text-white/60">
            Complete the steps below to unlock your exclusive benefits
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Benefit 1: Certificate */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">MOE Certificate</h3>
                <p className="text-xs text-white/40">Verified by Ministry of Education</p>
              </div>
            </div>

            {!certificateGenerated ? (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 mb-1 block">Your Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-blue"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1 block">MOE Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="your.name@moe.edu.my"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-neon-blue"
                  />
                  {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                  <p className="text-xs text-white/30 mt-1">Must be a valid MOE/school email domain</p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEmailSubmit}
                    className="flex-1 px-4 py-2 rounded-xl glass text-sm text-white/70 hover:text-white"
                  >
                    <Mail className="w-4 h-4 inline mr-1" />
                    Verify Email
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGenerateCertificate}
                    disabled={!name || !state.userEmail}
                    className="flex-1 px-4 py-2 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-sm text-white font-semibold disabled:opacity-30"
                  >
                    Generate PDF
                  </motion.button>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                {/* Certificate Preview */}
                <div className="bg-gradient-to-br from-space-700 to-space-800 rounded-xl p-6 border border-neon-blue/30 mb-4">
                  <div className="border-2 border-dashed border-neon-blue/30 rounded-lg p-4">
                    <Award className="w-8 h-8 text-neon-yellow mx-auto mb-2" />
                    <p className="text-xs text-white/40 mb-1">Certificate of Completion</p>
                    <p className="font-display text-lg font-bold text-white mb-1">{name}</p>
                    <p className="text-xs text-white/50">has successfully completed the</p>
                    <p className="text-sm text-neon-blue font-medium">PathFinder AI Career Assessment</p>
                    <p className="text-xs text-white/30 mt-2">Verified by MOE Malaysia</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center justify-center gap-2 mx-auto"
                >
                  <Download className="w-4 h-4" />
                  Download Certificate
                </motion.button>
                <div className="flex items-center justify-center gap-1 mt-3 text-green-400 text-xs">
                  <CheckCircle className="w-3 h-3" />
                  Certificate claimed successfully
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Benefit 2: Recommendation Letters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-strong rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-neon-orange flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-white">Recommendation Letters</h3>
                <p className="text-xs text-white/40">AI-generated for university applications</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-white/60">
                Select universities you'd like to apply to, and we'll generate personalized recommendation letters highlighting your strengths.
              </p>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {[
                  'Universiti Malaya (UM)',
                  'Universiti Sains Malaysia (USM)',
                  'Universiti Teknologi Malaysia (UTM)',
                  'Universiti Putra Malaysia (UPM)',
                  'Universiti Kebangsaan Malaysia (UKM)',
                  'APU (Asia Pacific University)',
                  'Multimedia University (MMU)',
                  'Taylor\'s University',
                  'Sunway University',
                  'Universiti Teknologi PETRONAS (UTP)',
                ].map((uni) => (
                  <label key={uni} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/20 bg-white/5 text-neon-blue focus:ring-neon-blue" />
                    <span className="text-sm text-white/70">{uni}</span>
                  </label>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-r from-neon-pink to-neon-orange text-white font-semibold text-sm"
              >
                Generate & Send Letters ✉️
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => dispatch({ type: 'RESET' })}
            className="px-6 py-3 rounded-full glass text-white/60 hover:text-white"
          >
            Start Over 🔄
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
