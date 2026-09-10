import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Award, Mail, AlertCircle, CheckCircle2, Download, FileText, Send } from 'lucide-react';
import { useApp } from '../store/AppContext';

const MOE_DOMAINS = ['moe.edu.my', 'kpm.edu.my', 'moe-dl.edu.my'];

function isValidMOEEmail(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return MOE_DOMAINS.some(d => domain === d || domain.endsWith(`.${d}`));
}

export default function CertificatePage() {
  const { state, dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState(state.userName || '');
  const [emailError, setEmailError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [certificateGenerated, setCertificateGenerated] = useState(state.certificateClaimed);
  const [activeTab, setActiveTab] = useState<'certificate' | 'letters'>('certificate');
  const [selectedUniversities, setSelectedUniversities] = useState<string[]>([]);
  const [letterSent, setLetterSent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const universities = [
    'Universiti Malaya (UM)',
    'Universiti Sains Malaysia (USM)',
    'Universiti Teknologi Malaysia (UTM)',
    'Universiti Kebangsaan Malaysia (UKM)',
    'Asia Pacific University (APU)',
    'Multimedia University (MMU)',
    'Taylor\'s University',
    'Universiti Putra Malaysia (UPM)',
  ];

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError('');
    setEmailValid(false);

    if (value && !value.includes('@')) {
      setEmailError('Please enter a valid email address');
    } else if (value && !isValidMOEEmail(value)) {
      setEmailError('Email must be a valid MOE domain (e.g., @moe.edu.my)');
    } else if (value && isValidMOEEmail(value)) {
      setEmailValid(true);
      setEmailError('');
    }
  };

  const handleClaimCertificate = () => {
    if (!emailValid || !name) return;
    // Simulate one-time claim check
    dispatch({ type: 'SET_USER_NAME', name });
    dispatch({ type: 'SET_USER_EMAIL', email });
    dispatch({ type: 'CLAIM_CERTIFICATE' });
    setCertificateGenerated(true);
    generateCertificate();
  };

  const generateCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 800;
    canvas.width = width;
    canvas.height = height;

    // Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#0a0e1a');
    gradient.addColorStop(0.5, '#0f1629');
    gradient.addColorStop(1, '#1c2647');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Border
    ctx.strokeStyle = '#00d4ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Inner border
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1;
    ctx.strokeRect(45, 45, width - 90, height - 90);

    // Header decoration
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('★ ★ ★ ★ ★', width / 2, 90);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 42px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', width / 2, 160);

    // Subtitle
    ctx.fillStyle = '#00d4ff';
    ctx.font = '18px Arial';
    ctx.fillText('PathFinder AI Malaysia', width / 2, 200);

    // Divider
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(200, 230);
    ctx.lineTo(width - 200, 230);
    ctx.stroke();

    // Body text
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px Arial';
    ctx.fillText('This is to certify that', width / 2, 300);

    // Name
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 36px Georgia, serif';
    ctx.fillText(name || 'Student', width / 2, 360);

    // Underline for name
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(300, 375);
    ctx.lineTo(width - 300, 375);
    ctx.stroke();

    // Description
    ctx.fillStyle = '#ffffff';
    ctx.font = '18px Arial';
    ctx.fillText('has successfully completed the PathFinder AI Malaysia', width / 2, 430);
    ctx.fillText('Career Exploration Programme', width / 2, 460);

    // Details
    ctx.fillStyle = '#a0a0a0';
    ctx.font = '16px Arial';
    ctx.fillText('Completed 15-question career assessment quiz', width / 2, 520);
    ctx.fillText('Explored STEM & IT career pathways', width / 2, 550);
    ctx.fillText(`Date: ${new Date().toLocaleDateString('en-MY', { day: 'numeric', month: 'long', year: 'numeric' })}`, width / 2, 580);

    // Footer
    ctx.fillStyle = '#00d4ff';
    ctx.font = 'bold 14px Arial';
    ctx.fillText('Verified by PathFinder AI Malaysia', width / 2, 660);
    ctx.fillStyle = '#a0a0a0';
    ctx.font = '12px Arial';
    ctx.fillText('This certificate is digitally verified and can be validated at pathfinder-ai.my', width / 2, 690);

    // Seal
    ctx.beginPath();
    ctx.arc(width / 2, 740, 30, 0, Math.PI * 2);
    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 10px Arial';
    ctx.fillText('VERIFIED', width / 2, 744);
  };

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `PathFinder_Certificate_${name.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const toggleUniversity = (uni: string) => {
    setSelectedUniversities(prev =>
      prev.includes(uni) ? prev.filter(u => u !== uni) : [...prev, uni]
    );
  };

  const handleSendLetters = () => {
    if (selectedUniversities.length === 0) return;
    // Simulate sending
    setLetterSent(true);
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Your <span className="gradient-text">Rewards</span>
          </h1>
          <p className="text-white/60">Claim your certificate and generate recommendation letters</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('certificate')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'certificate'
                ? 'bg-gradient-to-r from-neon-yellow to-neon-orange text-white shadow-lg'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            <Award className="w-5 h-5" /> Certificate
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('letters')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === 'letters'
                ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            <FileText className="w-5 h-5" /> Recommendation Letters
          </motion.button>
        </div>

        {activeTab === 'certificate' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            {!certificateGenerated ? (
              /* Claim Form */
              <div className="glass-strong rounded-2xl p-6 sm:p-8 max-w-lg mx-auto">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Award className="w-6 h-6 text-neon-yellow" />
                  Claim Your MOE Certificate
                </h3>
                <p className="text-white/60 text-sm mb-6">
                  Enter your MOE-registered email to receive your verified completion certificate.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/80 mb-1 block">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-yellow/50"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-white/80 mb-1 block">MOE Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="your.name@moe.edu.my"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-neon-yellow/50"
                    />
                    {emailError && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {emailError}
                      </p>
                    )}
                    {emailValid && (
                      <p className="text-neon-green text-sm mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Valid MOE email!
                      </p>
                    )}
                  </div>
                  <div className="glass rounded-xl p-3 text-sm text-white/60">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-neon-blue" />
                      Accepted domains: @moe.edu.my, @kpm.edu.my
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      ⚠️ This certificate can only be claimed ONCE per email address.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: emailValid && name ? 1.02 : 1 }}
                    whileTap={{ scale: emailValid && name ? 0.98 : 1 }}
                    onClick={handleClaimCertificate}
                    disabled={!emailValid || !name}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                      emailValid && name
                        ? 'bg-gradient-to-r from-neon-yellow to-neon-orange text-white shadow-lg'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    <Award className="w-5 h-5" />
                    Generate Certificate
                  </motion.button>
                </div>
              </div>
            ) : (
              /* Certificate Preview */
              <div className="space-y-6">
                <div className="glass-strong rounded-2xl p-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-neon-green mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Certificate Generated!</h3>
                  <p className="text-white/60 text-sm">Your MOE-verified certificate is ready to download.</p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-auto"
                    style={{ imageRendering: 'auto' }}
                  />
                </div>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={downloadCertificate}
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-neon-yellow to-neon-orange text-white font-semibold flex items-center gap-2 mx-auto shadow-lg"
                  >
                    <Download className="w-5 h-5" />
                    Download Certificate
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'letters' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="glass-strong rounded-2xl p-6 sm:p-8">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <FileText className="w-6 h-6 text-neon-blue" />
                University Recommendation Letters
              </h3>
              <p className="text-white/60 text-sm mb-6">
                Select universities you'd like to apply to. We'll generate personalized recommendation letters highlighting your strengths.
              </p>

              {!letterSent ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {universities.map((uni) => (
                      <motion.button
                        key={uni}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleUniversity(uni)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedUniversities.includes(uni)
                            ? 'border-neon-blue bg-neon-blue/10'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selectedUniversities.includes(uni) ? 'border-neon-blue bg-neon-blue' : 'border-white/30'
                          }`}>
                            {selectedUniversities.includes(uni) && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className="text-white text-sm font-medium">{uni}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {selectedUniversities.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass rounded-xl p-4"
                    >
                      <p className="text-white/80 text-sm mb-2">
                        <strong className="text-neon-blue">{selectedUniversities.length}</strong> universities selected
                      </p>
                      <p className="text-white/50 text-xs">
                        Letters will be drafted highlighting your assessed strengths and career interests.
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: selectedUniversities.length > 0 ? 1.02 : 1 }}
                    whileTap={{ scale: selectedUniversities.length > 0 ? 0.98 : 1 }}
                    onClick={handleSendLetters}
                    disabled={selectedUniversities.length === 0}
                    className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 ${
                      selectedUniversities.length > 0
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg'
                        : 'bg-white/10 text-white/30 cursor-not-allowed'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    Generate & Send Letters
                  </motion.button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-neon-green mx-auto mb-4" />
                  </motion.div>
                  <h4 className="text-xl font-bold text-white mb-2">Letters Generated!</h4>
                  <p className="text-white/60">
                    Recommendation letters have been drafted for {selectedUniversities.length} universities.
                    <br />
                    <span className="text-xs text-white/40">(Simulated — in production, these would be sent via email API)</span>
                  </p>
                  <div className="mt-6 space-y-2">
                    {selectedUniversities.map((uni, i) => (
                      <div key={i} className="glass rounded-lg px-4 py-2 text-sm text-white/80 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-neon-green" />
                        {uni} — Letter sent ✓
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Hidden canvas for certificate generation */}
        {!certificateGenerated && <canvas ref={canvasRef} className="hidden" />}
      </div>
    </div>
  );
}
