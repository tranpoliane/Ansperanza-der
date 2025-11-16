import { motion } from 'motion/react';
import { Music, Timer, Wind, Flower2 } from 'lucide-react';
import { BreathingAnimation } from './BreathingAnimation';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AmbianceScreenProps {
  onBack: () => void;
  backgroundImage: string;
}

export function AmbianceScreen({ onBack, backgroundImage }: AmbianceScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex flex-col"
    >
      {/* Background with image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src={backgroundImage}
          alt="Peaceful ambiance"
          className="w-full h-full object-cover"
        />
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(174, 227, 233, 0.75) 0%, rgba(201, 217, 240, 0.7) 40%, rgba(251, 213, 217, 0.75) 100%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-16">
          <button
            onClick={onBack}
            className="transition-all"
            style={{ 
              color: '#D4B3D0',
              fontWeight: 300
            }}
          >
            ← Volver
          </button>
          <div className="flex gap-3">
            <button 
              className="w-11 h-11 rounded-full backdrop-blur-sm flex items-center justify-center transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            >
              <Timer className="w-5 h-5" style={{ color: '#D4B3D0' }} />
            </button>
            <button 
              className="w-11 h-11 rounded-full backdrop-blur-sm flex items-center justify-center transition-all"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.5)'
              }}
            >
              <Music className="w-5 h-5" style={{ color: '#D4B3D0' }} />
            </button>
          </div>
        </div>

        {/* Breathing Animation */}
        <div className="flex-1 flex items-center justify-center">
          <BreathingAnimation />
        </div>

        {/* Bottom decorative elements */}
        <div className="flex justify-center gap-10 pb-10">
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Flower2 className="w-6 h-6" style={{ color: '#A3D4AD' }} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <Wind className="w-6 h-6" style={{ color: '#8BD4DC' }} />
          </motion.div>
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          >
            <Flower2 className="w-6 h-6" style={{ color: '#6FAA8C' }} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
