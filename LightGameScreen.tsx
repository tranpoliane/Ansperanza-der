import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';

interface LightGameScreenProps {
  onBack: () => void;
}

export function LightGameScreen({ onBack }: LightGameScreenProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    // Generate random path points for the light to follow
    const generateNewPosition = () => {
      const newX = Math.random() * 80 + 10; // 10-90% of screen width
      const newY = Math.random() * 70 + 15; // 15-85% of screen height
      setPosition({ x: newX, y: newY });
    };

    // Change position every 8 seconds
    const interval = setInterval(generateNewPosition, 8000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #AEE3E9 0%, #C9D9F0 40%, #FBD5D9 100%)'
      }}
    >
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#D4B3D0' }} />
        </motion.button>

        <h2 
          className="text-2xl text-center flex-1"
          style={{ 
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.05em'
          }}
        >
          Camino de Luz
        </h2>

        <div className="w-12" />
      </div>

      {/* Game area */}
      <div className="relative flex-1">
        {/* Instruction text */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute top-10 left-0 right-0 flex justify-center"
        >
          <p
            className="text-center px-6"
            style={{
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.03em',
              fontSize: '1rem'
            }}
          >
            Sigue el punto de luz con tus ojos<br/>
            y deja que tu mente se calme
          </p>
        </motion.div>

        {/* Moving light point */}
        <motion.div
          className="absolute"
          animate={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          transition={{
            duration: 8,
            ease: 'easeInOut',
          }}
          style={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Outer glow */}
          <motion.div
            className="absolute"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(174, 227, 233, 0.6), rgba(227, 200, 224, 0.4), transparent)',
              filter: 'blur(20px)',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
            }}
          />

          {/* Middle glow */}
          <motion.div
            className="absolute"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(201, 217, 240, 0.7), rgba(251, 213, 217, 0.5), transparent)',
              filter: 'blur(12px)',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
            }}
          />

          {/* Core light */}
          <motion.div
            className="absolute"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.9, 1, 0.9],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 255, 255, 1), rgba(212, 179, 208, 0.9))',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(212, 179, 208, 0.6)',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
