import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Award, FileText, GraduationCap, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../store/AppContext';

export default function CompletionPage() {
  const { dispatch } = useApp();
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    dispatch({ type: 'COMPLETE_EXPLORATION' });
    
    // Confetti celebration
    if (!celebrated) {
      setCelebrated(true);
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00d4ff', '#a855f7', '#ec4899', '#34d399', '#fbbf24'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00d4ff', '#a855f7', '#ec4899', '#34d399', '#fbbf24'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();

      // Big burst
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#00d4ff', '#a855f7', '#ec4899', '#34d399', '#fbbf24'],
      });
    }
  }, [celebrated, dispatch]);

  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: 'MOE Verified Certificate',
      description: 'Get a beautiful completion certificate verified by the Malaysian Ministry of Education. Requires @moe.edu.my email.',
      gradient: 'from-neon-yellow to-neon-orange',
      link: '/certificate',
      cta: 'Claim Certificate',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'University Recommendation Letters',
      description: 'AI-generated recommendation letters highlighting your strengths, sent directly to universities of your choice.',
      gradient: 'from-neon-blue to-neon-purple',
      link: '/certificate',
      cta: 'Generate Letters',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Career Pathway Summary',
      description: 'A comprehensive PDF summary of your quiz results, recommended careers, and personalized pathways.',
      gradient: 'from-neon-green to-neon-blue',
      link: '/certificate',
      cta: 'Download Summary',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Celebration Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ rotate: -10, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="text-7xl mb-6 inline-block"
          >
            🎉
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Congratulations, <span className="gradient-text">Explorer!</span>
          </h1>
          <p className="text-xl text-white/60 max-w-xl mx-auto">
            You've completed your career exploration journey! Here's what you've unlocked:
          </p>
        </motion.div>

        {/* Mascot Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="glass rounded-2xl p-6 mb-12 flex items-start gap-4"
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <p className="text-white font-semibold mb-1">Pathfinder says:</p>
            <p className="text-white/80">
              "Amazing work! 🌟 You've taken a huge step towards finding your dream career. 
              I've prepared some special rewards for you. Check them out below — you've earned every single one!"
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.2 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.gradient} flex items-center justify-center text-white mb-4`}>
                {benefit.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
              <p className="text-white/60 text-sm mb-4">{benefit.description}</p>
              <Link to={benefit.link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  {benefit.cta}
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Progress Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="glass-strong rounded-2xl p-6 sm:p-8"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-neon-green" />
            Your Journey Summary
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Quiz Completed', value: '✅', sub: '15 questions' },
              { label: 'Careers Explored', value: '🔍', sub: '1+ careers' },
              { label: 'XP Earned', value: '⚡', sub: '1,500 XP' },
              { label: 'Status', value: '🏆', sub: 'Pathfinder' },
            ].map((item, i) => (
              <div key={i} className="text-center glass rounded-xl p-4">
                <div className="text-3xl mb-2">{item.value}</div>
                <div className="text-white font-semibold text-sm">{item.label}</div>
                <div className="text-white/50 text-xs">{item.sub}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Continue Exploring */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-center"
        >
          <Link to="/catalogue">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-xl glass text-white font-semibold border border-white/20"
            >
              🔍 Continue Exploring Careers
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
