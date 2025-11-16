import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function BreathingAnimation() {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [count, setCount] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev === 1) {
          if (phase === 'inhale') {
            setPhase('hold');
            return 4;
          } else if (phase === 'hold') {
            setPhase('exhale');
            return 4;
          } else {
            setPhase('inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhala';
      case 'hold':
        return 'Sostén';
      case 'exhale':
        return 'Exhala';
    }
  };

  // Create array of 5 bars with different colors and delays
  const bars = [
    { color: '#AEE3E9', delay: 0 },
    { color: '#C9D9F0', delay: 0.1 },
    { color: '#D4B3D0', delay: 0.2 },
    { color: '#FBD5D9', delay: 0.1 },
    { color: '#BCE0C3', delay: 0 },
  ];

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="relative flex flex-col items-center gap-6">
        {/* Animated bars */}
        <motion.div
          className="flex items-end justify-center gap-3"
          animate={{
            scale: phase === 'inhale' ? 1.1 : phase === 'hold' ? 1.1 : 1,
          }}
          transition={{
            duration: phase === 'hold' ? 0 : 4,
            ease: 'easeInOut',
          }}
        >
          {bars.map((bar, index) => (
            <motion.div
              key={index}
              className="rounded-full backdrop-blur-sm"
              style={{
                width: '12px',
                background: `linear-gradient(to top, ${bar.color}, rgba(255, 255, 255, 0.4))`,
                boxShadow: `0 4px 12px ${bar.color}40`,
              }}
              animate={{
                height: phase === 'inhale' ? '120px' : phase === 'hold' ? '120px' : '40px',
              }}
              transition={{
                duration: phase === 'hold' ? 0 : 4,
                ease: 'easeInOut',
                delay: bar.delay,
              }}
            />
          ))}
        </motion.div>

        {/* Counter */}
        <motion.div
          className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(174, 227, 233, 0.5), rgba(227, 200, 224, 0.5), rgba(251, 213, 217, 0.4))',
            boxShadow: '0 8px 24px rgba(227, 200, 224, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.4)'
          }}
          animate={{
            scale: phase === 'inhale' ? 1.1 : phase === 'hold' ? 1.1 : 1,
          }}
          transition={{
            duration: phase === 'hold' ? 0 : 4,
            ease: 'easeInOut',
          }}
        >
          <span 
            className="text-3xl"
            style={{ 
              color: '#D4B3D0',
              fontWeight: 300
            }}
          >
            {count}
          </span>
        </motion.div>
      </div>

      <motion.p
        key={phase}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ 
          color: '#D4B3D0',
          fontWeight: 300,
          letterSpacing: '0.05em',
          fontSize: '1.125rem'
        }}
      >
        {getPhaseText()}
      </motion.p>
    </div>
  );
}
