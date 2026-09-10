import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Brain, Trophy, BookOpen, Zap } from 'lucide-react';

function TypewriterText({ text, speed = 50 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      {!done && <span className="cursor-blink text-neon-blue">|</span>}
    </span>
  );
}

function RobotMascot({ size = 'large' }: { size?: 'small' | 'large' }) {
  const s = size === 'large' ? 'w-48 h-48' : 'w-20 h-20';
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className={`${s} relative`}
    >
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 blur-xl" />
      <svg viewBox="0 0 200 200" className="relative w-full h-full">
        {/* Robot body */}
        <rect x="50" y="70" width="100" height="90" rx="20" fill="url(#robotGrad)" stroke="#00d4ff" strokeWidth="2" />
        {/* Robot head */}
        <rect x="60" y="30" width="80" height="60" rx="15" fill="url(#robotGrad)" stroke="#00d4ff" strokeWidth="2" />
        {/* Antenna */}
        <line x1="100" y1="30" x2="100" y2="15" stroke="#a855f7" strokeWidth="3" />
        <circle cx="100" cy="12" r="5" fill="#a855f7">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>
        {/* Eyes */}
        <circle cx="82" cy="55" r="10" fill="#0a0e1a" />
        <circle cx="118" cy="55" r="10" fill="#0a0e1a" />
        <circle cx="82" cy="55" r="6" fill="#00d4ff">
          <animate attributeName="r" values="6;4;6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="118" cy="55" r="6" fill="#00d4ff">
          <animate attributeName="r" values="6;4;6" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Smile */}
        <path d="M 80 72 Q 100 85 120 72" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
        {/* Arms */}
        <rect x="30" y="85" width="20" height="50" rx="10" fill="url(#robotGrad)" stroke="#00d4ff" strokeWidth="1.5" />
        <rect x="150" y="85" width="20" height="50" rx="10" fill="url(#robotGrad)" stroke="#00d4ff" strokeWidth="1.5" />
        {/* Chest light */}
        <circle cx="100" cy="110" r="8" fill="#a855f7" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.5s" repeatCount="indefinite" />
        </circle>
        {/* Legs */}
        <rect x="70" y="160" width="20" height="30" rx="8" fill="url(#robotGrad)" stroke="#00d4ff" strokeWidth="1.5" />
        <rect x="110" y="160" width="20" height="30" rx="8" fill="url(#robotGrad)" stroke="#00d4ff" strokeWidth="1.5" />
        <defs>
          <linearGradient id="robotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c2647" />
            <stop offset="100%" stopColor="#0f1629" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function HomePage() {
  const heroText = "Hi! I'm Pathfinder 🤖 Your AI career guide. Let's discover YOUR perfect career path in Malaysia!";

  const features = [
    { icon: <Brain className="w-7 h-7" />, title: 'AI-Powered Quiz', desc: '15 fun, gamified questions to find your match', gradient: 'from-neon-blue to-neon-purple' },
    { icon: <BookOpen className="w-7 h-7" />, title: 'Career Catalogue', desc: 'Explore 15+ STEM & IT careers in detail', gradient: 'from-neon-purple to-neon-pink' },
    { icon: <Zap className="w-7 h-7" />, title: 'Visual Roadmaps', desc: 'See your path from SPM to senior roles', gradient: 'from-neon-pink to-neon-orange' },
    { icon: <Trophy className="w-7 h-7" />, title: 'MOE Certificate', desc: 'Earn a verified completion certificate', gradient: 'from-neon-orange to-neon-yellow' },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1 text-center lg:text-left"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
            >
              <Sparkles className="w-4 h-4 text-neon-yellow" />
              <span className="text-sm text-white/80">AI-Powered Career Discovery for Malaysian Students</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Find Your
              <span className="block gradient-text">Dream Career</span>
              <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2">in Malaysia</span>
            </h1>

            <div className="glass rounded-xl p-4 mb-8 text-left max-w-lg mx-auto lg:mx-0">
              <p className="text-white/80 text-lg">
                <TypewriterText text={heroText} speed={30} />
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/quiz">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center gap-2 shadow-lg shadow-neon-blue/30 text-lg"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <Link to="/catalogue">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl glass text-white font-semibold border border-white/20 text-lg"
                >
                  Browse Careers
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* Right: Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex-shrink-0"
          >
            <RobotMascot size="large" />
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-lg text-white/60">Your journey from confusion to clarity in 4 simple steps</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 card-hover"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}>
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-white/60 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-8 sm:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '15+', label: 'STEM Careers' },
              { value: '15', label: 'Quiz Questions' },
              { value: '100%', label: 'Free to Use' },
              { value: 'MOE', label: 'Verified Certificate' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Find Your Path?</h2>
          <p className="text-lg text-white/60 mb-8 max-w-xl mx-auto">
            Take our 15-question quiz and discover careers perfectly matched to your personality and strengths.
          </p>
          <Link to="/quiz">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 rounded-xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white font-bold text-lg shadow-lg shadow-neon-purple/30"
            >
              🚀 Begin the Adventure
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
