import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../store/AppContext';
import { questions } from '../data/questions';
import { careers } from '../data/careers';
import AIMascot from '../components/AIMascot';
import { useState, useMemo, useEffect } from 'react';
import { ArrowRight, ArrowLeft, GripVertical, Clock, Zap, Sparkles, CheckCircle2 } from 'lucide-react';

const mascotMessages = [
  "Great start! Let's keep going! 🌟",
  "You're doing amazing! 💪",
  "Interesting choice! Tell me more... 🤔",
  "I can see a pattern forming! 📊",
  "Halfway there! You're awesome! 🎉",
  "Your profile is getting clearer! 🔍",
  "Almost there, stay focused! 🎯",
  "Fantastic! Just a few more! ⭐",
  "I love your answers! 🤩",
  "So close to your perfect career! 🚀",
];

export default function QuizPage() {
  const { state, dispatch } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [dragOrder, setDragOrder] = useState<string[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [showFunFact, setShowFunFact] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const question = questions[currentQ];
  const progress = ((currentQ + 1) / questions.length) * 100;
  const encouragement = mascotMessages[currentQ % mascotMessages.length];

  // Timer effect
  useEffect(() => {
    if (question.timeLimit && !answered) {
      setTimeLeft(question.timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev === null || prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setTimeLeft(null);
    }
  }, [currentQ, question.timeLimit, answered]);

  // Show fun fact after answering
  useEffect(() => {
    if (answered && question.funFact) {
      setTimeout(() => setShowFunFact(true), 500);
    } else {
      setShowFunFact(false);
    }
  }, [answered, question.funFact]);

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSliderValue(50);
      setDragOrder([]);
      setMultiSelect([]);
      setAnswered(false);
      setStreak(prev => prev + 1);
    } else {
      const recommendations = calculateRecommendations(state.quizAnswers);
      dispatch({ type: 'SET_RECOMMENDATIONS', careers: recommendations });
      dispatch({ type: 'NAVIGATE', page: 'results' });
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      setAnswered(false);
      setMultiSelect([]);
      setDragOrder([]);
    }
  };

  const handleAnswer = (answer: string | number | string[]) => {
    dispatch({ type: 'ANSWER_QUESTION', questionId: question.id, answer });
    setAnswered(true);
  };

  const handleMultiSelect = (option: string) => {
    const newSelect = multiSelect.includes(option)
      ? multiSelect.filter(s => s !== option)
      : multiSelect.length < 3 ? [...multiSelect, option] : multiSelect;
    setMultiSelect(newSelect);
    if (newSelect.length >= 2) {
      handleAnswer(newSelect);
    }
  };

  const handleDragStart = (index: number) => {
    setDragging(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (dragging === null || dragging === index) return;
    const newOrder = [...(dragOrder.length ? dragOrder : question.options!)];
    const item = newOrder[dragging];
    newOrder.splice(dragging, 1);
    newOrder.splice(index, 0, item);
    setDragOrder(newOrder);
    setDragging(index);
  };

  const handleDragEnd = () => {
    setDragging(null);
    if (dragOrder.length) {
      handleAnswer(dragOrder);
    }
  };

  const canProceed = useMemo(() => {
    const answer = state.quizAnswers[question.id];
    if (question.type === 'slider') return true;
    if (question.type === 'dragdrop') return dragOrder.length > 0 || Array.isArray(answer);
    if (question.type === 'multiselect') return multiSelect.length >= 2;
    return answer !== undefined;
  }, [state.quizAnswers, question, dragOrder, multiSelect]);

  return (
    <div className="min-h-screen pt-20 pb-10 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar with Streak */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <span className="text-sm text-white/60">Question {currentQ + 1} of {questions.length}</span>
              {streak > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 px-2 py-1 rounded-full bg-neon-orange/20 border border-neon-orange/30"
                >
                  <Zap className="w-3 h-3 text-neon-orange" />
                  <span className="text-xs text-neon-orange font-bold">{streak} streak</span>
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {timeLeft !== null && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                    timeLeft > 5 ? 'bg-neon-blue/20 border border-neon-blue/30' : 'bg-red-500/20 border border-red-500/30 animate-pulse'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  <span className={`text-xs font-bold ${timeLeft > 5 ? 'text-neon-blue' : 'text-red-400'}`}>
                    {timeLeft}s
                  </span>
                </motion.div>
              )}
              <span className="text-sm text-neon-blue font-semibold">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="h-3 bg-space-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {/* Milestones */}
          <div className="flex justify-between mt-2">
            {[25, 50, 75, 100].map((milestone) => (
              <div
                key={milestone}
                className={`w-2 h-2 rounded-full ${
                  progress >= milestone ? 'bg-neon-blue' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* AI Mascot */}
        <div className="flex justify-center mb-6">
          <AIMascot size="sm" message={encouragement} />
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -50, rotateY: 10 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className="glass-strong rounded-2xl p-8 mb-6"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-neon-blue/70 font-semibold">
                {question.category}
              </span>
              {question.type === 'multiselect' && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-neon-purple/20 text-neon-purple">
                  Multi-select
                </span>
              )}
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">
              {question.question}
            </h2>
            {question.subtitle && (
              <p className="text-white/50 text-sm mb-6">{question.subtitle}</p>
            )}

            {/* Question Types */}
            {question.type === 'choice' && (
              <div className="space-y-3 mt-6">
                {question.options?.map((option, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(option)}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${
                      state.quizAnswers[question.id] === option
                        ? 'border-neon-blue bg-neon-blue/10 text-white shadow-lg shadow-neon-blue/20'
                        : 'border-white/10 text-white/70 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {question.type === 'scenario' && (
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {question.options?.map((option, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleAnswer(option)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      state.quizAnswers[question.id] === option
                        ? 'border-neon-purple bg-neon-purple/10 text-white shadow-lg shadow-neon-purple/20'
                        : 'border-white/10 text-white/70 hover:border-neon-purple/50 hover:bg-white/5'
                    }`}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}

            {question.type === 'slider' && (
              <div className="mt-8 px-4">
                <div className="flex justify-between text-sm text-white/50 mb-4">
                  <span>Not my thing 😐</span>
                  <span>I love them! 🤩</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderValue}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setSliderValue(val);
                    handleAnswer(val);
                  }}
                  className="w-full h-3 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #00d4ff ${sliderValue}%, #1a2235 ${sliderValue}%)`,
                  }}
                />
                <motion.div
                  key={sliderValue}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-center mt-4"
                >
                  <span className="text-4xl font-bold gradient-text">{sliderValue}%</span>
                </motion.div>
              </div>
            )}

            {question.type === 'rating' && (
              <div className="mt-8">
                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.button
                      key={rating}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: rating * 0.1 }}
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      whileTap={{ scale: 0.8 }}
                      onClick={() => handleAnswer(rating)}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border transition-all ${
                        (state.quizAnswers[question.id] as number) >= rating
                          ? 'border-neon-yellow bg-neon-yellow/20 shadow-lg shadow-neon-yellow/20'
                          : 'border-white/10 bg-white/5'
                      }`}
                    >
                      ⭐
                    </motion.button>
                  ))}
                </div>
                <p className="text-center text-white/50 text-sm mt-3">
                  {(state.quizAnswers[question.id] as number) || 0} / 5
                </p>
              </div>
            )}

            {question.type === 'multiselect' && (
              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                {question.options?.map((option, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMultiSelect(option)}
                    className={`p-4 rounded-xl border text-left transition-all relative ${
                      multiSelect.includes(option)
                        ? 'border-neon-green bg-neon-green/10 text-white shadow-lg shadow-neon-green/20'
                        : 'border-white/10 text-white/70 hover:border-white/30 hover:bg-white/5'
                    }`}
                  >
                    {multiSelect.includes(option) && (
                      <CheckCircle2 className="absolute top-2 right-2 w-5 h-5 text-neon-green" />
                    )}
                    {option}
                  </motion.button>
                ))}
                <div className="col-span-full text-center text-sm text-white/50 mt-2">
                  Selected: {multiSelect.length} / 3
                </div>
              </div>
            )}

            {question.type === 'dragdrop' && (
              <div className="mt-6 space-y-2">
                {(dragOrder.length ? dragOrder : question.options || []).map((option, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    draggable
                    onDragStart={() => handleDragStart(i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                    onDragEnd={handleDragEnd}
                    whileHover={{ scale: 1.01 }}
                    className={`flex items-center gap-3 p-4 rounded-xl border cursor-grab active:cursor-grabbing transition-all ${
                      dragging === i
                        ? 'border-neon-blue bg-neon-blue/10 scale-105 shadow-lg shadow-neon-blue/20'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <GripVertical className="w-5 h-5 text-white/30" />
                    <span className="text-lg mr-2 text-white/40 font-bold">#{i + 1}</span>
                    <span className="text-white/80">{option}</span>
                  </motion.div>
                ))}
                <p className="text-xs text-white/40 text-center mt-2">
                  Drag items to reorder by priority
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Fun Fact Popup */}
        <AnimatePresence>
          {showFunFact && question.funFact && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              className="mb-6 p-4 rounded-xl bg-gradient-to-r from-neon-yellow/10 to-neon-orange/10 border border-neon-yellow/30"
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-neon-yellow shrink-0 mt-0.5" />
                <p className="text-sm text-white/80">{question.funFact}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBack}
            disabled={currentQ === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass text-white/70 disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold disabled:opacity-30 shadow-lg shadow-neon-blue/30"
          >
            {currentQ === questions.length - 1 ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
}

function calculateRecommendations(answers: Record<number, string | number | string[]>): string[] {
  const scores: Record<string, number> = {};
  
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;

    if (q.type === 'choice' || q.type === 'scenario') {
      const optionIndex = q.options?.indexOf(answer as string);
      if (optionIndex !== undefined && optionIndex >= 0) {
        const scoringKeys = Object.keys(q.scoring);
        const key = scoringKeys[Math.min(optionIndex, scoringKeys.length - 1)];
        scores[key] = (scores[key] || 0) + q.scoring[key];
      }
    } else if (q.type === 'slider' || q.type === 'rating') {
      const val = typeof answer === 'number' ? answer : 50;
      const normalizedScore = val / 100;
      Object.entries(q.scoring).forEach(([key, weight]) => {
        scores[key] = (scores[key] || 0) + normalizedScore * weight;
      });
    } else if (q.type === 'dragdrop' && Array.isArray(answer)) {
      answer.forEach((item, index) => {
        const optionIndex = q.options?.indexOf(item);
        if (optionIndex !== undefined) {
          const scoringKeys = Object.keys(q.scoring);
          const key = scoringKeys[Math.min(optionIndex, scoringKeys.length - 1)];
          const weight = (q.options!.length - index) / q.options!.length;
          scores[key] = (scores[key] || 0) + weight * q.scoring[key];
        }
      });
    } else if (q.type === 'multiselect' && Array.isArray(answer)) {
      answer.forEach((item) => {
        const optionIndex = q.options?.indexOf(item);
        if (optionIndex !== undefined) {
          const scoringKeys = Object.keys(q.scoring);
          const key = scoringKeys[Math.min(optionIndex, scoringKeys.length - 1)];
          scores[key] = (scores[key] || 0) + q.scoring[key];
        }
      });
    }
  });

  // Map scores to careers
  const careerScores: Record<string, number> = {};
  careers.forEach((career) => {
    let score = 0;
    if (career.category === 'IT') {
      score += (scores['tech'] || 0) * 2;
      score += (scores['analytical'] || 0) * 1.5;
    }
    if (career.category === 'STEM') {
      score += (scores['science'] || 0) * 1.5;
      score += (scores['research'] || 0) * 1.5;
      score += (scores['engineering'] || 0) * 2;
    }
    if (career.category === 'Healthcare') {
      score += (scores['healthcare'] || 0) * 3;
      score += (scores['social'] || 0) * 1.5;
    }
    if (career.category === 'Business') {
      score += (scores['finance'] || 0) * 2;
      score += (scores['business'] || 0) * 2;
      score += (scores['entrepreneur'] || 0) * 2;
    }
    if (career.category === 'Creative') {
      score += (scores['creative'] || 0) * 3;
    }
    if (career.category === 'Education') {
      score += (scores['education'] || 0) * 3;
      score += (scores['teaching'] || 0) * 2;
    }
    
    // Specific career boosts
    if (career.id === 'ai-engineer') score += (scores['ai'] || 0) * 3;
    if (career.id === 'data-scientist' || career.id === 'data-analyst') score += (scores['data'] || 0) * 2 + (scores['analytical'] || 0) * 2;
    if (career.id === 'cybersecurity-analyst') score += (scores['security'] || 0) * 3;
    if (career.id === 'software-engineer') score += (scores['tech'] || 0) * 2;
    if (career.id === 'biotechnologist') score += (scores['biotech'] || 0) * 3;
    if (career.id === 'renewable-energy') score += (scores['environment'] || 0) * 3;
    if (career.id === 'robotics-engineer' || career.id === 'mechanical-engineer') score += (scores['engineering'] || 0) * 2;
    if (career.id === 'doctor' || career.id === 'nurse' || career.id === 'pharmacist') score += (scores['healthcare'] || 0) * 2;
    if (career.id === 'game-developer' || career.id === 'video-game-designer') score += (scores['gaming'] || 0) * 3;
    if (career.id === 'entrepreneur') score += (scores['entrepreneur'] || 0) * 3;
    if (career.id === 'investment-banking-analyst' || career.id === 'accountant') score += (scores['finance'] || 0) * 3;
    if (career.id === 'lecturer' || career.id === 'teacher') score += (scores['education'] || 0) * 2 + (scores['teaching'] || 0) * 2;
    if (career.id === 'graphic-designer' || career.id === 'animator') score += (scores['creative'] || 0) * 2;
    if (career.id === 'architect' || career.id === 'civil-engineer') score += (scores['engineering'] || 0) * 1.5 + (scores['creative'] || 0) * 1;
    if (career.id === 'mathematician' || career.id === 'statistician') score += (scores['math'] || 0) * 3;
    if (career.id === 'physicist') score += (scores['research'] || 0) * 2 + (scores['math'] || 0) * 2;
    if (career.id === 'pilot') score += (scores['field'] || 0) * 2;
    
    careerScores[career.id] = score + Math.random() * 2;
  });

  const sorted = Object.entries(careerScores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id]) => id);

  return sorted;
}
