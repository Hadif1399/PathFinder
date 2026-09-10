export type QuestionType = 'choice' | 'slider' | 'dragdrop' | 'scenario' | 'rank';

export interface QuizQuestion {
  id: number;
  type: QuestionType;
  question: string;
  subtitle: string;
  mascotMessage: string;
  options?: { id: string; label: string; icon: string; value: number; category: string }[];
  sliderConfig?: { min: number; max: number; step: number; leftLabel: string; rightLabel: string };
  dragItems?: { id: string; label: string; icon: string }[];
  scenarioImage?: string;
  scoring: Record<string, string[]>;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    type: 'choice',
    question: 'When you face a tough problem, what\'s your first instinct?',
    subtitle: 'Let\'s understand how you approach challenges!',
    mascotMessage: 'There\'s no wrong answer here! Just be yourself 🌟',
    options: [
      { id: 'a', label: 'Break it down logically step by step', icon: '🧩', value: 4, category: 'analytical' },
      { id: 'b', label: 'Brainstorm creative solutions', icon: '💡', value: 4, category: 'creative' },
      { id: 'c', label: 'Ask others for their perspective', icon: '🤝', value: 3, category: 'social' },
      { id: 'd', label: 'Research and gather data first', icon: '📊', value: 4, category: 'investigative' },
    ],
    scoring: {
      a: ['software-engineer', 'data-scientist', 'cybersecurity-analyst'],
      b: ['ux-designer', 'game-developer', 'ai-engineer'],
      c: ['doctor', 'pharmacist', 'digital-marketer'],
      d: ['data-scientist', 'ai-engineer', 'biotechnologist'],
    },
  },
  {
    id: 2,
    type: 'slider',
    question: 'How much do you enjoy working with numbers and mathematics?',
    subtitle: 'Slide to show your comfort level',
    mascotMessage: 'Math is everywhere in tech! Even designers use it 💪',
    sliderConfig: { min: 1, max: 10, step: 1, leftLabel: 'Not my thing', rightLabel: 'I love it!' },
    scoring: {
      '1-3': ['ux-designer', 'digital-marketer', 'graphic-designer'],
      '4-6': ['doctor', 'pharmacist', 'renewable-energy-engineer'],
      '7-10': ['software-engineer', 'data-scientist', 'ai-engineer', 'cybersecurity-analyst'],
    },
  },
  {
    id: 3,
    type: 'scenario',
    question: 'You\'re given a weekend project. Which excites you most?',
    subtitle: 'Choose the scenario that sparks your interest',
    mascotMessage: 'Follow your excitement! That\'s where your passion lies ✨',
    options: [
      { id: 'a', label: 'Build a mobile app that solves a real problem', icon: '📱', value: 5, category: 'tech-builder' },
      { id: 'b', label: 'Design a beautiful website for a local business', icon: '🎨', value: 4, category: 'creative-designer' },
      { id: 'c', label: 'Analyze data to find trends in student life', icon: '📈', value: 4, category: 'data-analyst' },
      { id: 'd', label: 'Set up a smart home automation system', icon: '🏠', value: 4, category: 'hardware-engineer' },
    ],
    scoring: {
      a: ['software-engineer', 'game-developer'],
      b: ['ux-designer', 'digital-marketer'],
      c: ['data-scientist', 'ai-engineer'],
      d: ['robotics-engineer', 'network-engineer', 'renewable-energy-engineer'],
    },
  },
  {
    id: 4,
    type: 'choice',
    question: 'What type of work environment do you prefer?',
    subtitle: 'Your ideal workspace says a lot about you',
    mascotMessage: 'Picture yourself 5 years from now... where are you? 🏢',
    options: [
      { id: 'a', label: 'A modern tech office with flexible hours', icon: '🖥️', value: 4, category: 'tech-corporate' },
      { id: 'b', label: 'A hospital or clinical setting', icon: '🏥', value: 4, category: 'healthcare' },
      { id: 'c', label: 'A creative studio or workshop', icon: '🎭', value: 4, category: 'creative-studio' },
      { id: 'd', label: 'A laboratory or research facility', icon: '🔬', value: 4, category: 'research' },
    ],
    scoring: {
      a: ['software-engineer', 'data-scientist', 'cybersecurity-analyst', 'cloud-architect'],
      b: ['doctor', 'pharmacist', 'biotechnologist'],
      c: ['ux-designer', 'game-developer', 'digital-marketer'],
      d: ['ai-engineer', 'biotechnologist', 'renewable-energy-engineer'],
    },
  },
  {
    id: 5,
    type: 'rank',
    question: 'Rank these skills from most to least important to you:',
    subtitle: 'Drag to reorder — what matters most?',
    mascotMessage: 'Your priorities reveal your career DNA! 🧬',
    dragItems: [
      { id: 'coding', label: 'Coding & Programming', icon: '💻' },
      { id: 'communication', label: 'Communication & People Skills', icon: '🗣️' },
      { id: 'creativity', label: 'Creativity & Design', icon: '🎨' },
      { id: 'analysis', label: 'Data Analysis & Logic', icon: '📊' },
      { id: 'leadership', label: 'Leadership & Management', icon: '👑' },
    ],
    scoring: {
      coding: ['software-engineer', 'ai-engineer', 'game-developer'],
      communication: ['doctor', 'digital-marketer', 'pharmacist'],
      creativity: ['ux-designer', 'game-developer', 'digital-marketer'],
      analysis: ['data-scientist', 'cybersecurity-analyst', 'ai-engineer'],
      leadership: ['cloud-architect', 'renewable-energy-engineer', 'electrical-engineer'],
    },
  },
  {
    id: 6,
    type: 'slider',
    question: 'How do you feel about working long or irregular hours?',
    subtitle: 'Some careers demand more flexibility than others',
    mascotMessage: 'Being honest here helps me match you better! ⏰',
    sliderConfig: { min: 1, max: 10, step: 1, leftLabel: 'Strict 9-5 only', rightLabel: 'I\'m flexible!' },
    scoring: {
      '1-3': ['network-engineer', 'digital-marketer', 'ux-designer'],
      '4-6': ['software-engineer', 'data-scientist', 'game-developer'],
      '7-10': ['doctor', 'pharmacist', 'cybersecurity-analyst'],
    },
  },
  {
    id: 7,
    type: 'scenario',
    question: 'A friend asks for your help. What are you most likely to do?',
    subtitle: 'Your natural helping style matters',
    mascotMessage: 'How you help others reflects your career strengths! 🤗',
    options: [
      { id: 'a', label: 'Fix their computer or set up their network', icon: '🔧', value: 4, category: 'tech-support' },
      { id: 'b', label: 'Give them health or wellness advice', icon: '💊', value: 4, category: 'healthcare' },
      { id: 'c', label: 'Help them plan and organize something', icon: '📋', value: 4, category: 'planning' },
      { id: 'd', label: 'Create something visual for them', icon: '🎨', value: 4, category: 'creative' },
    ],
    scoring: {
      a: ['software-engineer', 'network-engineer', 'cybersecurity-analyst'],
      b: ['doctor', 'pharmacist', 'biotechnologist'],
      c: ['data-scientist', 'cloud-architect', 'renewable-energy-engineer'],
      d: ['ux-designer', 'game-developer', 'digital-marketer'],
    },
  },
  {
    id: 8,
    type: 'choice',
    question: 'Which school subject do you enjoy the most?',
    subtitle: 'Your favourite subject is a strong career indicator',
    mascotMessage: 'Remember — it\'s okay if it\'s not the "expected" one! 📚',
    options: [
      { id: 'a', label: 'Mathematics / Add Maths', icon: '🔢', value: 5, category: 'math' },
      { id: 'b', label: 'Biology / Chemistry', icon: '🧪', value: 4, category: 'science' },
      { id: 'b', label: 'Physics', icon: '⚛️', value: 4, category: 'physics' },
      { id: 'c', label: 'Computer Science / ICT', icon: '💻', value: 5, category: 'computing' },
      { id: 'd', label: 'Art / Design / BM', icon: '🎨', value: 4, category: 'creative-subject' },
    ],
    scoring: {
      math: ['data-scientist', 'ai-engineer', 'software-engineer'],
      science: ['doctor', 'pharmacist', 'biotechnologist'],
      physics: ['electrical-engineer', 'renewable-energy-engineer', 'robotics-engineer'],
      computing: ['software-engineer', 'cybersecurity-analyst', 'cloud-architect', 'game-developer'],
      'creative-subject': ['ux-designer', 'digital-marketer', 'game-developer'],
    },
  },
  {
    id: 9,
    type: 'slider',
    question: 'How important is job stability to you?',
    subtitle: 'Some paths are more established, others more dynamic',
    mascotMessage: 'Both stability and adventure have their merits! ⚖️',
    sliderConfig: { min: 1, max: 10, step: 1, leftLabel: 'Adventure!', rightLabel: 'Stability first' },
    scoring: {
      '1-3': ['game-developer', 'ai-engineer', 'digital-marketer'],
      '4-6': ['software-engineer', 'ux-designer', 'data-scientist'],
      '7-10': ['doctor', 'pharmacist', 'electrical-engineer', 'network-engineer'],
    },
  },
  {
    id: 10,
    type: 'choice',
    question: 'What kind of impact do you want to make?',
    subtitle: 'Think about what drives you every day',
    mascotMessage: 'Your "why" is the most important question! 💫',
    options: [
      { id: 'a', label: 'Help people directly and save lives', icon: '❤️', value: 5, category: 'direct-help' },
      { id: 'b', label: 'Build technology that changes the world', icon: '🚀', value: 5, category: 'tech-impact' },
      { id: 'c', label: 'Protect the environment and planet', icon: '🌍', value: 5, category: 'environment' },
      { id: 'd', label: 'Create things that bring joy', icon: '✨', value: 4, category: 'joy-creation' },
    ],
    scoring: {
      'direct-help': ['doctor', 'pharmacist', 'biotechnologist'],
      'tech-impact': ['software-engineer', 'ai-engineer', 'cloud-architect', 'cybersecurity-analyst'],
      environment: ['renewable-energy-engineer', 'biotechnologist', 'electrical-engineer'],
      'joy-creation': ['game-developer', 'ux-designer', 'digital-marketer'],
    },
  },
  {
    id: 11,
    type: 'dragdrop',
    question: 'Which of these activities would you do for fun? (Pick your top 3)',
    subtitle: 'Your hobbies reveal hidden career strengths',
    mascotMessage: 'The things you do for fun often become your career! 🎯',
    dragItems: [
      { id: 'gaming', label: 'Playing video games', icon: '🎮' },
      { id: 'puzzles', label: 'Solving puzzles & brain teasers', icon: '🧩' },
      { id: 'building', label: 'Building things with my hands', icon: '🔨' },
      { id: 'drawing', label: 'Drawing or designing', icon: '✏️' },
      { id: 'reading', label: 'Reading science articles', icon: '📖' },
      { id: 'social', label: 'Organizing events for friends', icon: '🎉' },
    ],
    scoring: {
      gaming: ['game-developer', 'software-engineer'],
      puzzles: ['data-scientist', 'cybersecurity-analyst', 'ai-engineer'],
      building: ['robotics-engineer', 'electrical-engineer', 'renewable-energy-engineer'],
      drawing: ['ux-designer', 'digital-marketer'],
      reading: ['biotechnologist', 'doctor', 'pharmacist'],
      social: ['digital-marketer', 'doctor', 'pharmacist'],
    },
  },
  {
    id: 12,
    type: 'slider',
    question: 'How do you handle pressure and high-stakes situations?',
    subtitle: 'Some careers require calm under pressure',
    mascotMessage: 'Honesty is key! I\'ll find the right fit for you 🎯',
    sliderConfig: { min: 1, max: 10, step: 1, leftLabel: 'I get stressed', rightLabel: 'I thrive under pressure' },
    scoring: {
      '1-3': ['data-scientist', 'biotechnologist', 'ux-designer'],
      '4-6': ['software-engineer', 'network-engineer', 'game-developer'],
      '7-10': ['doctor', 'cybersecurity-analyst', 'cloud-architect'],
    },
  },
  {
    id: 13,
    type: 'choice',
    question: 'What\'s your ideal salary expectation 5 years after graduating?',
    subtitle: 'Be realistic — but also dream big!',
    mascotMessage: 'All these careers offer great growth potential! 📈',
    options: [
      { id: 'a', label: 'RM 4,000 - 6,000 (Comfortable start)', icon: '💰', value: 3, category: 'moderate' },
      { id: 'b', label: 'RM 6,000 - 10,000 (Good growth)', icon: '💎', value: 4, category: 'growth' },
      { id: 'c', label: 'RM 10,000 - 15,000 (High earner)', icon: '🏆', value: 5, category: 'high' },
      { id: 'd', label: 'RM 15,000+ (Top tier)', icon: '👑', value: 5, category: 'top' },
    ],
    scoring: {
      moderate: ['network-engineer', 'digital-marketer', 'pharmacist'],
      growth: ['software-engineer', 'data-scientist', 'ux-designer', 'biotechnologist'],
      high: ['ai-engineer', 'cloud-architect', 'cybersecurity-analyst', 'robotics-engineer'],
      top: ['cloud-architect', 'ai-engineer', 'doctor', 'cybersecurity-analyst'],
    },
  },
  {
    id: 14,
    type: 'scenario',
    question: 'You discover a major bug in a system everyone depends on. What do you do?',
    subtitle: 'Your reaction shows your professional style',
    mascotMessage: 'This reveals how you handle real-world challenges! 🔍',
    options: [
      { id: 'a', label: 'Immediately jump in and start debugging', icon: '🔥', value: 5, category: 'action' },
      { id: 'b', label: 'Analyze the root cause methodically first', icon: '🔬', value: 4, category: 'analysis' },
      { id: 'c', label: 'Coordinate the team to handle it together', icon: '👥', value: 4, category: 'teamwork' },
      { id: 'd', label: 'Document everything and create a prevention plan', icon: '📝', value: 4, category: 'prevention' },
    ],
    scoring: {
      action: ['software-engineer', 'cybersecurity-analyst', 'doctor'],
      analysis: ['data-scientist', 'ai-engineer', 'biotechnologist'],
      teamwork: ['cloud-architect', 'renewable-energy-engineer', 'digital-marketer'],
      prevention: ['network-engineer', 'pharmacist', 'electrical-engineer'],
    },
  },
  {
    id: 15,
    type: 'choice',
    question: 'Finally — what excites you most about the future?',
    subtitle: 'Your vision for tomorrow shapes your path today',
    mascotMessage: 'This is the big one! What future do YOU want to build? 🌅',
    options: [
      { id: 'a', label: 'AI and robots doing amazing things', icon: '🤖', value: 5, category: 'ai-future' },
      { id: 'b', label: 'A healthier, longer-living society', icon: '🧬', value: 5, category: 'health-future' },
      { id: 'c', label: 'A sustainable, green planet', icon: '🌱', value: 5, category: 'green-future' },
      { id: 'd', label: 'Connected, digital-first experiences', icon: '🌐', value: 5, category: 'digital-future' },
    ],
    scoring: {
      'ai-future': ['ai-engineer', 'robotics-engineer', 'data-scientist', 'software-engineer'],
      'health-future': ['doctor', 'pharmacist', 'biotechnologist'],
      'green-future': ['renewable-energy-engineer', 'biotechnologist', 'electrical-engineer'],
      'digital-future': ['cloud-architect', 'software-engineer', 'ux-designer', 'cybersecurity-analyst', 'game-developer'],
    },
  },
];

export function calculateResults(answers: Record<number, any>): string[] {
  const scores: Record<string, number> = {};
  
  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = quizQuestions.find(q => q.id === parseInt(questionId));
    if (!question) return;

    if (question.type === 'slider') {
      const value = answer as number;
      Object.entries(question.scoring).forEach(([range, careerIds]) => {
        const [min, max] = range.split('-').map(Number);
        if (value >= min && value <= max) {
          careerIds.forEach(id => {
            scores[id] = (scores[id] || 0) + 1;
          });
        }
      });
    } else if (question.type === 'rank' || question.type === 'dragdrop') {
      const rankedItems = answer as string[];
      rankedItems.forEach((itemId, index) => {
        const careerIds = question.scoring[itemId];
        if (careerIds) {
          const weight = Math.max(1, rankedItems.length - index);
          careerIds.forEach(id => {
            scores[id] = (scores[id] || 0) + weight;
          });
        }
      });
    } else {
      const selectedOption = answer as string;
      const careerIds = question.scoring[selectedOption];
      if (careerIds) {
        careerIds.forEach(id => {
          scores[id] = (scores[id] || 0) + 1;
        });
      }
    }
  });

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted.slice(0, 5).map(([id]) => id);
}
