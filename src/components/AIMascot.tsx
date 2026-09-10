import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AIMascotProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'fixed' | 'static';
  animated?: boolean;
}

export default function AIMascot({ message, size = 'md', position = 'static', animated = true }: AIMascotProps) {
  const [isBlinking, setIsBlinking] = useState(false);
  const [displayText, setDisplayText] = useState('');

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
  };

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 3000);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (message) {
      let i = 0;
      const timer = setInterval(() => {
        if (i <= message.length) {
          setDisplayText(message.slice(0, i));
          i++;
        } else {
          clearInterval(timer);
        }
      }, 30);
      return () => clearInterval(timer);
    }
  }, [message]);

  return (
    <div className={`flex flex-col items-center ${position === 'fixed' ? 'fixed bottom-6 right-6 z-50' : ''}`}>
      <motion.div
        className={`${sizeClasses[size]} relative`}
        animate={animated ? { y: [0, -8, 0] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Robot Body */}
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Antenna */}
          <motion.line
            x1="50" y1="15" x2="50" y2="5"
            stroke="#00d4ff" strokeWidth="2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.circle
            cx="50" cy="4" r="3"
            fill="#00d4ff"
            animate={{ scale: [1, 1.3, 1], fill: ['#00d4ff', '#a855f7', '#00d4ff'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Head */}
          <rect x="25" y="15" width="50" height="40" rx="10" fill="#1a2235" stroke="#00d4ff" strokeWidth="1.5" />
          
          {/* Eyes */}
          <motion.ellipse
            cx="38" cy="32" rx="6" ry={isBlinking ? 1 : 6}
            fill="#00d4ff"
            transition={{ duration: 0.1 }}
          />
          <motion.ellipse
            cx="62" cy="32" rx="6" ry={isBlinking ? 1 : 6}
            fill="#00d4ff"
            transition={{ duration: 0.1 }}
          />
          
          {/* Eye glow */}
          <circle cx="38" cy="32" r="3" fill="white" opacity="0.8" />
          <circle cx="62" cy="32" r="3" fill="white" opacity="0.8" />
          
          {/* Mouth */}
          <motion.path
            d="M 38 44 Q 50 50 62 44"
            stroke="#22d3ee" strokeWidth="2" fill="none"
            animate={{ d: ['M 38 44 Q 50 50 62 44', 'M 38 44 Q 50 46 62 44', 'M 38 44 Q 50 50 62 44'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Body */}
          <rect x="30" y="58" width="40" height="30" rx="8" fill="#1a2235" stroke="#a855f7" strokeWidth="1.5" />
          
          {/* Chest light */}
          <motion.circle
            cx="50" cy="73" r="5"
            fill="#a855f7"
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          
          {/* Arms */}
          <motion.rect
            x="18" y="62" width="10" height="20" rx="5"
            fill="#1a2235" stroke="#22d3ee" strokeWidth="1"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: '23px 62px' }}
          />
          <motion.rect
            x="72" y="62" width="10" height="20" rx="5"
            fill="#1a2235" stroke="#22d3ee" strokeWidth="1"
            animate={{ rotate: [5, -5, 5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: '77px 62px' }}
          />
        </svg>
      </motion.div>

      {/* Speech Bubble */}
      {displayText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="mt-3 glass-strong rounded-xl px-4 py-2 max-w-[200px] text-center"
        >
          <p className="text-xs text-white/90">{displayText}</p>
        </motion.div>
      )}
    </div>
  );
}
