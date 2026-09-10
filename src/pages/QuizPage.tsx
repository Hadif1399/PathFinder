import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { quizQuestions, calculateResults } from '../data/quizQuestions';
import { useApp } from '../store/AppContext';

function MascotBubble({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="flex items-start gap-3 mb-6"
    >
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center flex-shrink-0">
        <span className="text-xl">🤖</span>
      </div>
      <div className="glass rounded-xl rounded-tl-none px-4 py-3 max-w-md">
        <p className="text-white/90 text-sm">{message}</p>
      </div>
    </motion.div>
  );
}

function ChoiceQuestion({ question, value, onChange }: { question: typeof quizQuestions[0]; value?: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {question.options?.map((option) => (
        <motion.button
          key={option.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onChange(option.id)}
          className={`p-5 rounded-xl border-2 transition-all text-left ${
            value === option.id
              ? 'border-neon-blue bg-neon-blue/10 shadow-lg shadow-neon-blue/20'
              : 'border-white/10 bg-white/5 hover:border-white/30'
          }`}
        >
          <span className="text-3xl mb-3 block">{option.icon}</span>
          <span className="text-white font-medium">{option.label}</span>
        </motion.button>
      ))}
    </div>
  );
}

function SliderQuestion({ question, value, onChange }: { question: typeof quizQuestions[0]; value?: number; onChange: (v: number) => void }) {
  const config = question.sliderConfig!;
  const currentValue = (value as number) || 5;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          key={currentValue}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold gradient-text mb-2"
        >
          {currentValue}
        </motion.div>
        <div className="flex justify-between text-sm text-white/60">
          <span>{config.leftLabel}</span>
          <span>{config.rightLabel}</span>
        </div>
      </div>
      <div className="relative px-2">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={currentValue}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #00d4ff 0%, #a855f7 ${((currentValue - config.min) / (config.max - config.min)) * 100}%, rgba(255,255,255,0.1) ${((currentValue - config.min) / (config.max - config.min)) * 100}%)`,
          }}
        />
      </div>
    </div>
  );
}

function DragDropQuestion({ question, value, onChange }: { question: typeof quizQuestions[0]; value?: string[]; onChange: (v: string[]) => void }) {
  const items = question.dragItems || [];
  const selected = value || [];

  const toggleItem = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter(s => s !== id));
    } else if (selected.length < 3) {
      onChange([...selected, id]);
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...selected];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newOrder.length) return;
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    onChange(newOrder);
  };

  return (
    <div className="space-y-4">
      <p className="text-white/60 text-sm mb-4">Tap to select (max 3), then reorder by priority:</p>
      <div className="space-y-3">
        {items.map((item) => {
          const isSelected = selected.includes(item.id);
          const selectedIdx = selected.indexOf(item.id);
          return (
            <motion.div
              key={item.id}
              layout
              className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                isSelected
                  ? 'border-neon-blue bg-neon-blue/10'
                  : 'border-white/10 bg-white/5 hover:border-white/30'
              }`}
              onClick={() => toggleItem(item.id)}
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="flex-1 text-white font-medium">{item.label}</span>
              {isSelected && (
                <div className="flex items-center gap-1">
                  <span className="text-neon-blue font-bold text-sm">#{selectedIdx + 1}</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveItem(selectedIdx, 'up'); }}
                    className="text-white/60 hover:text-white p-1"
                  >↑</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); moveItem(selectedIdx, 'down'); }}
                    className="text-white/60 hover:text-white p-1"
                  >↓</button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function RankQuestion({ question, value, onChange }: { question: typeof quizQuestions[0]; value?: string[]; onChange: (v: string[]) => void }) {
  const items = question.dragItems || [];
  const ordered = value || items.map(i => i.id);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newOrder = [...ordered];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newOrder.length) return;
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    onChange(newOrder);
  };

  return (
    <div className="space-y-3">
      <p className="text-white/60 text-sm mb-4">Drag arrows to reorder by importance:</p>
      {ordered.map((itemId, index) => {
        const item = items.find(i => i.id === itemId);
        if (!item) return null;
        return (
          <motion.div
            key={itemId}
            layout
            className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-white font-bold text-sm">
              {index + 1}
            </span>
            <span className="text-2xl">{item.icon}</span>
            <span className="flex-1 text-white font-medium">{item.label}</span>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => moveItem(index, 'up')}
                disabled={index === 0}
                className="text-white/60 hover:text-white disabled:opacity-30 p-1"
              >▲</button>
              <button
                onClick={() => moveItem(index, 'down')}
                disabled={index === ordered.length - 1}
                className="text-white/60 hover:text-white disabled:opacity-30 p-1"
              >▼</button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function QuizPage() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const question = quizQuestions[currentQ];
  const progress = ((currentQ + 1) / quizQuestions.length) * 100;
  const isAnswered = answers[question.id] !== undefined;

  const handleAnswer = useCallback((value: any) => {
    setAnswers(prev => ({ ...prev, [question.id]: value }));
  }, [question.id]);

  const handleNext = () => {
    if (!isAnswered) return;
    
    if (currentQ < quizQuestions.length - 1) {
      setShowFeedback(true);
      setTimeout(() => {
        setShowFeedback(false);
        setCurrentQ(prev => prev + 1);
      }, 1500);
    } else {
      // Quiz complete
      const results = calculateResults(answers);
      dispatch({ type: 'SET_RECOMMENDATIONS', careers: results });
      navigate('/results');
    }
  };

  const handleBack = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const encouragements = [
    'Great choice! 🌟',
    'Interesting! Tell me more... ✨',
    'You\'re doing amazing! 💪',
    'Love that answer! 🎯',
    'Keep going, you\'re on fire! 🔥',
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-white/60">Question {currentQ + 1} of {quizQuestions.length}</span>
            <span className="text-sm text-neon-blue font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {/* XP Counter */}
          <div className="flex items-center gap-2 mt-2">
            <span className="text-neon-yellow text-sm">⚡ {currentQ * 100} XP</span>
            <div className="flex gap-1">
              {Array.from({ length: currentQ }).map((_, i) => (
                <CheckCircle2 key={i} className="w-3 h-3 text-neon-green" />
              ))}
            </div>
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="glass-strong rounded-2xl p-6 sm:p-8"
          >
            {/* Mascot Message */}
            <MascotBubble message={question.mascotMessage} />

            {/* Question */}
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{question.question}</h2>
            <p className="text-white/60 mb-8">{question.subtitle}</p>

            {/* Question Content */}
            <div className="mb-8">
              {question.type === 'choice' && (
                <ChoiceQuestion question={question} value={answers[question.id]} onChange={handleAnswer} />
              )}
              {question.type === 'slider' && (
                <SliderQuestion question={question} value={answers[question.id]} onChange={handleAnswer} />
              )}
              {question.type === 'dragdrop' && (
                <DragDropQuestion question={question} value={answers[question.id]} onChange={handleAnswer} />
              )}
              {question.type === 'rank' && (
                <RankQuestion question={question} value={answers[question.id]} onChange={handleAnswer} />
              )}
              {question.type === 'scenario' && (
                <ChoiceQuestion question={question} value={answers[question.id]} onChange={handleAnswer} />
              )}
            </div>

            {/* Feedback Animation */}
            <AnimatePresence>
              {showFeedback && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-4"
                >
                  <span className="text-2xl font-bold text-neon-green">
                    {encouragements[currentQ % encouragements.length]}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBack}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </motion.button>

              <motion.button
                whileHover={{ scale: isAnswered ? 1.05 : 1 }}
                whileTap={{ scale: isAnswered ? 0.95 : 1 }}
                onClick={handleNext}
                disabled={!isAnswered}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                  isAnswered
                    ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-lg shadow-neon-blue/30'
                    : 'bg-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                {currentQ === quizQuestions.length - 1 ? 'See Results' : 'Next'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
