import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Briefcase, TrendingUp, Award, GraduationCap, Heart, Clock, MapPin } from 'lucide-react';

const careers = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    category: 'IT',
    icon: '💻',
    color: '#00d4ff',
    demandLevel: 'Critical',
    salaryRange: 'RM 4,000 - RM 15,000',
    description: 'Build the digital future with code. Software engineers design, develop, and maintain software applications that power businesses and everyday life.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
      { subject: 'Physics', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Analytical', 'Problem-solver', 'Detail-oriented', 'Logical thinker'],
    pathways: [
      { type: 'Foundation in Computing', duration: '1 year', institutions: ['UM', 'USM', 'APU'] },
      { type: 'Bachelor in Computer Science', duration: '3-4 years', institutions: ['UM', 'USM', 'APU', 'MMU'] },
    ],
    scholarships: 15,
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'IT',
    icon: '📊',
    color: '#a855f7',
    demandLevel: 'Very High',
    salaryRange: 'RM 5,000 - RM 18,000',
    description: 'Transform data into insights. Data scientists use machine learning and statistics to drive business decisions.',
    spmRequirements: [
      { subject: 'Mathematics', grade: 'Distinction (A/A+)' },
      { subject: 'Additional Mathematics', grade: 'Credit (A-C)' },
    ],
    personalityTraits: ['Curious', 'Analytical', 'Patient', 'Statistical mind'],
    pathways: [
      { type: 'Foundation in Science', duration: '1 year', institutions: ['UM', 'USM'] },
      { type: 'Bachelor in Data Science', duration: '3-4 years', institutions: ['UM', 'APU'] },
    ],
    scholarships: 12,
  },
];

export default function CareerDetailPage() {
  const { id } = useParams();
  const career = careers.find((c) => c.id === id);

  if (!career) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-white/60">Career not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link to="/catalogue">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Catalogue</span>
          </motion.button>
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start gap-6 mb-8">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0 shadow-lg"
              style={{ background: `linear-gradient(135deg, ${career.color}20, ${career.color}10)` }}
            >
              {career.icon}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{career.title}</h1>
              <p className="text-white/70 text-lg leading-relaxed">{career.description}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-neon-yellow" />
                <span className="text-xs text-white/50 uppercase">Salary</span>
              </div>
              <p className="text-sm font-semibold text-white">{career.salaryRange}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-neon-green" />
                <span className="text-xs text-white/50 uppercase">Demand</span>
              </div>
              <p className="text-sm font-semibold text-white">{career.demandLevel}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-neon-purple" />
                <span className="text-xs text-white/50 uppercase">Scholarships</span>
              </div>
              <p className="text-sm font-semibold text-white">{career.scholarships} Available</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-neon-blue" />
                <span className="text-xs text-white/50 uppercase">Category</span>
              </div>
              <p className="text-sm font-semibold text-white">{career.category}</p>
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-6">
          {/* SPM Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <GraduationCap className="w-5 h-5 text-neon-blue" />
              SPM Requirements
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {career.spmRequirements.map((req, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white/80 text-sm">{req.subject}</span>
                  <span className="text-neon-green text-xs font-medium px-3 py-1 rounded-full bg-green-500/10">
                    {req.grade}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Personality Traits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <Heart className="w-5 h-5 text-neon-pink" />
              Ideal Personality
            </h3>
            <div className="flex flex-wrap gap-2">
              {career.personalityTraits.map((trait) => (
                <span key={trait} className="px-4 py-2 rounded-full bg-white/5 text-white/70 text-sm border border-white/10">
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Education Pathways */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 rounded-2xl p-8 border border-white/10"
          >
            <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-neon-green" />
              Education Pathways
            </h3>
            <div className="space-y-3">
              {career.pathways.map((pathway, i) => (
                <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/90 text-sm font-medium">{pathway.type}</span>
                    <span className="text-neon-blue text-xs">{pathway.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pathway.institutions.map((inst) => (
                      <span key={inst} className="text-xs text-white/50 px-2 py-1 rounded bg-white/5">
                        {inst}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex flex-wrap gap-4 justify-center"
        >
          <Link to="/scholarships">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold"
            >
              View Scholarships
            </motion.button>
          </Link>
          <Link to="/universities">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-xl glass text-white/70 hover:text-white"
            >
              Explore Universities
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
