import { motion } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { Sparkles, ArrowRight, Trophy, Users, BookOpen, Award, GraduationCap, Zap, TrendingUp, Star, Compass } from 'lucide-react';
import { useEffect, useState } from 'react';

const typewriterTexts = ["Navigate Your Future with AI", "Discover Your Dream Career", "31 Careers. Infinite Possibilities."];

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
    { icon: <Trophy className="w-6 h-6" />, title: 'Interactive Quiz', desc: '18 engaging questions with timers, streaks & fun facts', color: 'from-neon-blue to-neon-purple' },
    { icon: <Users className="w-6 h-6" />, title: 'AI-Powered', desc: 'Smart matching across 31 diverse career paths', color: 'from-neon-purple to-neon-pink' },
    { icon: <BookOpen className="w-6 h-6" />, title: 'Career Catalogue', desc: 'Explore STEM, IT, Healthcare, Business & Creative fields', color: 'from-neon-pink to-neon-orange' },
    { icon: <GraduationCap className="w-6 h-6" />, title: 'Education Paths', desc: 'Compare 25+ universities with detailed costs', color: 'from-neon-orange to-neon-yellow', action: () => dispatch({ type: 'NAVIGATE', page: 'universities' }) },
    { icon: <Award className="w-6 h-6" />, title: 'Scholarships', desc: '130+ Malaysian & international funding opportunities', color: 'from-neon-yellow to-neon-green', action: () => dispatch({ type: 'NAVIGATE', page: 'scholarships' }) },
    { icon: <Star className="w-6 h-6" />, title: 'Career Roadmaps', desc: 'Visual journey from SPM to senior roles', color: 'from-neon-green to-neon-blue' },
  ];

  return (
    <div className="min-h-screen pt-16">
      <section className="relative overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <motion.div animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-10 left-10 w-[500px] h-[500px] bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 rounded-full blur-3xl" />
          <motion.div animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1, 1.3, 1] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-10 right-10 w-[600px] h-[600px] bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 rounded-full blur-3xl" />
          <motion.div animate={{ x: [0, 50, 0], y: [0, -100, 0] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-neon-pink/20 to-neon-orange/20 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-strong mb-8 border border-neon-blue/30">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}>
                  <Sparkles className="w-4 h-4 text-neon-yellow" />
                </motion.div>
                <span className="text-sm font-medium text-white/90">AI-Powered Career Guidance for Malaysian Students</span>
              </motion.div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tight">
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="block">Find Your</motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="block gradient-text py-2">Perfect Career</motion.span>
                <motion.span initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="block">Path</motion.span>
              </h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-xl text-white/70 mb-10 max-w-xl leading-relaxed">
                Take our <span className="text-neon-blue font-semibold">gamified 18-question quiz</span> and let AI guide you to the perfect career from <span className="text-neon-purple font-semibold">31+ options</span>. Explore scholarships, universities, and career roadmaps.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap gap-4 mb-12">
                <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 212, 255, 0.5)" }} whileTap={{ scale: 0.95 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })} className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white font-bold text-lg shadow-2xl shadow-neon-blue/30 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-3">
                    Start Your Journey
                    <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <ArrowRight className="w-6 h-6" />
                    </motion.div>
                  </span>
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-neon-purple via-neon-pink to-neon-blue" initial={{ x: "-100%" }} whileHover={{ x: "0%" }} transition={{ duration: 0.5 }} />
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'catalogue' })} className="px-10 py-5 rounded-2xl glass-strong text-white font-bold text-lg hover:bg-white/10 transition-all border border-white/20">
                  Browse 31 Careers
                </motion.button>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="grid grid-cols-3 gap-8">
                {[
                  { num: '31', label: 'Career Paths', icon: <TrendingUp className="w-5 h-5" /> },
                  { num: '18', label: 'Quiz Questions', icon: <Zap className="w-5 h-5" /> },
                  { num: '130+', label: 'Scholarships', icon: <Award className="w-5 h-5" /> },
                ].map((stat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 + i * 0.1 }} whileHover={{ scale: 1.1 }} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <div className="text-neon-blue">{stat.icon}</div>
                      <div className="text-4xl font-black gradient-text">{stat.num}</div>
                    </div>
                    <div className="text-sm text-white/60 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="relative flex flex-col items-center justify-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-80 h-80 rounded-full border-2 border-dashed border-neon-blue/30" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-96 h-96 rounded-full border border-neon-purple/20" />
              
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink p-1 shadow-2xl shadow-neon-blue/50 animate-float">
                  <div className="w-full h-full rounded-full bg-space-900 flex items-center justify-center">
                    <Compass className="w-16 h-16 text-neon-blue" />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-neon-yellow to-neon-orange flex items-center justify-center text-2xl animate-bounce">✨</div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
            <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-neon-blue" />
          </div>
        </motion.div>
      </section>

      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">
              Your Complete Career<span className="gradient-text block mt-2">Discovery Platform</span>
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">From quiz to certificate, we've got everything to guide your career journey</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -10, scale: 1.02 }} onClick={feature.action} className="group relative glass-strong rounded-3xl p-8 cursor-pointer overflow-hidden">
                <motion.div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>{feature.icon}</div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative rounded-3xl overflow-hidden">
            <div className="relative glass-strong p-16 text-center">
              <h2 className="font-display text-4xl sm:text-5xl font-black text-white mb-6 tracking-tight">Ready to Discover Your<span className="gradient-text block mt-2">Dream Career?</span></h2>
              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Join thousands of Malaysian students who've found their perfect career path through CareerCompass</p>
              <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 212, 255, 0.6)" }} whileTap={{ scale: 0.95 }} onClick={() => dispatch({ type: 'NAVIGATE', page: 'quiz' })} className="group relative px-12 py-6 rounded-2xl bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink text-white font-black text-xl shadow-2xl shadow-neon-blue/40 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">Take the Quiz Now<motion.div animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight className="w-7 h-7" /></motion.div></span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-neon-blue via-neon-purple to-neon-pink flex items-center justify-center"><Compass className="w-5 h-5 text-white" /></div>
            <span className="font-display font-bold text-xl text-white">Career<span className="gradient-text">Compass</span></span>
          </div>
          <p className="text-white/40 text-sm">© 2025 CareerCompass Malaysia — Empowering the next generation of Malaysian talent 🇲🇾</p>
        </div>
      </footer>
    </div>
  );
}
