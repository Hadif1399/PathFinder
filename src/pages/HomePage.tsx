import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import AIMascot from '../components/AIMascot';
import { Sparkles, ArrowRight, Trophy, Users, BookOpen, Award, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';

const typewriterTexts = [
  "Hi! I'm PathBot 🤖",
  "Let's discover your perfect career!",
  "Ready to explore Malaysia's top STEM careers?",
];

export default function HomePage() {
  const { dispatch } = useApp();
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const currentText = typewriterTexts[textIndex];
    let charIndex = 0;
    const timer = setInterval(() => {
      if (charIndex <= currentText.length) {
        setDisplayedText(currentText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % typewriterTexts.length);
          setDisplayedText('');
        }, 2000);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [textIndex]);

  const features = [
    { icon: <Trophy className="w-6 h-6" />, title: 'Gamified Quiz', desc: '15 interactive questions with drag-and-drop, sliders & scenarios' },
    { icon: <Users className="w-6 h-6" />, title: 'AI-Powered', desc: 'Personalized career recommendations based on your unique profile' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Career Catalogue', desc: 'Explore 31 diverse careers across STEM, IT, Healthcare, Business & more' },
    { icon: <GraduationCap className="w-6 h-6" />, title: 'Universities', desc: 'Compare 25+ local & international universities with detailed costs', action: () => dispatch({ type: 'NAVIGATE', page: 'universities' }) },
    { icon: <Award className="w-6 h-6" />, title: 'Pre-U Scholarships', desc: '12+ pre-university scholarships with interactive filtering', action: () => dispatch({ type: 'NAVIGATE', page: 'preuni-scholarships' }) },
    { icon: <Award className="w-6 h-6" />, title: 'Degree Scholarships', desc: '130+ Malaysian & international scholarships to fund your journey', action: () => dispatch({ type: 'NAVIGATE', page: 'scholarships' }) },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
              >
                <Sparkles className="w-4 h-4 text-neon-yellow" />
                <span className="text-sm text-white/80">AI-Powered Career Guidance for Malaysian Students</span>
              </motion.div>

              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Discover Your{' '}
                <span className="gradient-text">Dream Career</span>{' '}
                in Malaysia
              </h1>

              <p className="text-lg text-white/60 mb-8 max-w-lg">
                Take our fun, gamified assessment and let AI guide you to the perfect STEM or IT career path. Explore roadmaps, get certificates, and unlock your future!
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold text-lg flex items-center gap-2 shadow-lg shadow-neon-blue/25 animate-pulse-glow"
                >
                  Start Your Journey
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })}
                  className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  Browse Careers
                </motion.button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                {[
                  { num: '31', label: 'Career Paths' },
                  { num: '15', label: 'Quiz Questions' },
                  { num: '100%', label: 'Free' },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-2xl font-bold gradient-text">{stat.num}</div>
                    <div className="text-sm text-white/50">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right - AI Mascot */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-center justify-center"
            >
              <AIMascot size="lg" message={displayedText} />
              
              {/* Floating cards around mascot */}
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-2, 2, -2] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute top-20 right-10 glass rounded-xl px-3 py-2 hidden lg:block"
              >
                <span className="text-2xl">🚀</span>
                <span className="text-xs text-white/70 ml-1">Launch!</span>
              </motion.div>
              <motion.div
                animate={{ y: [5, -5, 5], rotate: [2, -2, 2] }}
                transition={{ duration: 3.5, repeat: Infinity }}
                className="absolute bottom-40 left-10 glass rounded-xl px-3 py-2 hidden lg:block"
              >
                <span className="text-2xl">💡</span>
                <span className="text-xs text-white/70 ml-1">Ideas!</span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Our AI-powered platform makes career discovery fun and personalized
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5 }}
                onClick={feature.action}
                className="glass rounded-2xl p-6 text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center mx-auto mb-3 text-neon-blue group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="font-display text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-border p-12 rounded-2xl"
          >
            <h2 className="font-display text-3xl font-bold text-white mb-4">
              Ready to Find Your Path?
            </h2>
            <p className="text-white/60 mb-8">
              Join thousands of Malaysian students who've discovered their dream career through PathFinder AI
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })}
              className="px-10 py-4 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-bold text-lg shadow-xl shadow-neon-blue/30"
            >
              Take the Quiz Now 🎯
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/40 text-sm">
            © 2025 PathFinder AI Malaysia — Empowering the next generation of Malaysian talent 🇲🇾
          </p>
        </div>
      </footer>
    </div>
  );
}
