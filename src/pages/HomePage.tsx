import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, BookOpen, GraduationCap, Award, DollarSign } from 'lucide-react';

export default function HomePage() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Career Catalogue',
      description: 'Explore 31 careers with detailed information',
      link: '/catalogue',
      gradient: 'from-neon-blue to-neon-purple',
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Universities',
      description: 'Compare Malaysian & international universities',
      link: '/universities',
      gradient: 'from-neon-purple to-neon-pink',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Pre-U Scholarships',
      description: 'Find pre-university funding opportunities',
      link: '/preuni-scholarships',
      gradient: 'from-neon-pink to-neon-orange',
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Scholarships',
      description: 'Discover degree-level scholarships',
      link: '/scholarships',
      gradient: 'from-neon-orange to-neon-yellow',
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6"
          >
            <Sparkles className="w-5 h-5 text-neon-yellow" />
            <span className="text-sm text-white/80">Your Career Journey Starts Here</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
            Navigate Your
            <span className="block gradient-text">Dream Career</span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Discover 31 careers, explore universities, and find scholarships to fund your future. Your personalized career guidance platform.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/catalogue">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold flex items-center gap-2 shadow-lg shadow-neon-blue/30"
              >
                Explore Careers
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/scholarships">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-xl glass text-white font-semibold border border-white/20"
              >
                Find Scholarships
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-xl text-white/60">Complete career guidance at your fingertips</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.link}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="glass-strong rounded-2xl p-8 h-full cursor-pointer group"
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-white/60">{feature.description}</p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '31', label: 'Career Paths' },
            { number: '13+', label: 'Universities' },
            { number: '12+', label: 'Pre-U Scholarships' },
            { number: '25+', label: 'Degree Scholarships' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: 'spring' }}
              className="text-center"
            >
              <div className="text-5xl font-bold gradient-text mb-2">{stat.number}</div>
              <div className="text-white/60">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
