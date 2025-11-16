import { motion } from 'motion/react';
import { Smile, Meh, Frown, CloudRain, Sparkles, Heart } from 'lucide-react';

interface MoodSelectorProps {
  onSelectMood: (mood: string, colors: string[]) => void;
}

const moods = [
  {
    id: 'joyful',
    label: 'Alegre',
    icon: Smile,
    colors: ['#FBD5D9', '#FFE5E8', '#FFF0F2'],
    gradient: 'linear-gradient(135deg, #FBD5D9, #FFE5E8)',
  },
  {
    id: 'calm',
    label: 'Tranquilo',
    icon: Heart,
    colors: ['#AEE3E9', '#C9D9F0', '#E0EFF5'],
    gradient: 'linear-gradient(135deg, #AEE3E9, #C9D9F0)',
  },
  {
    id: 'creative',
    label: 'Creativo',
    icon: Sparkles,
    colors: ['#D4B3D0', '#E5D4E3', '#F0E5EE'],
    gradient: 'linear-gradient(135deg, #D4B3D0, #E5D4E3)',
  },
  {
    id: 'peaceful',
    label: 'Sereno',
    icon: CloudRain,
    colors: ['#BCE0C3', '#86BCA1', '#D4E8D8'],
    gradient: 'linear-gradient(135deg, #BCE0C3, #86BCA1)',
  },
  {
    id: 'neutral',
    label: 'Neutral',
    icon: Meh,
    colors: ['#C9D9F0', '#D4B3D0', '#E5E5F0'],
    gradient: 'linear-gradient(135deg, #C9D9F0, #D4B3D0)',
  },
  {
    id: 'anxious',
    label: 'Ansioso',
    icon: Frown,
    colors: ['#86BCA1', '#AEE3E9', '#C0D9DD'],
    gradient: 'linear-gradient(135deg, #86BCA1, #AEE3E9)',
  },
];

export function MoodSelector({ onSelectMood }: MoodSelectorProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-6 z-50"
      style={{
        background: 'linear-gradient(to bottom, rgba(174, 227, 233, 0.98), rgba(201, 217, 240, 0.98))',
        backdropFilter: 'blur(20px)',
      }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <h2
          className="text-3xl mb-3"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          ¿Cómo te sientes hoy?
        </h2>
        <p
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            opacity: 0.8,
          }}
        >
          Selecciona tu estado de ánimo
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 max-w-md w-full">
        {moods.map((mood, index) => {
          const Icon = mood.icon;
          return (
            <motion.button
              key={mood.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectMood(mood.id, mood.colors)}
              className="rounded-3xl p-6 flex flex-col items-center gap-3 backdrop-blur-sm"
              style={{
                background: `${mood.gradient}, rgba(255, 255, 255, 0.5)`,
                backgroundBlendMode: 'overlay',
                border: '1px solid rgba(255, 255, 255, 0.6)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
              }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: mood.id === 'creative' ? [0, -5, 5, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                <Icon className="w-7 h-7" style={{ color: '#D4B3D0' }} />
              </motion.div>
              <span
                style={{
                  color: '#D4B3D0',
                  fontWeight: 300,
                  letterSpacing: '0.03em',
                  fontSize: '1.1rem',
                }}
              >
                {mood.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 italic text-center"
        style={{
          color: '#D4B3D0',
          fontWeight: 300,
          letterSpacing: '0.03em',
          fontSize: '0.9rem',
          opacity: 0.7,
        }}
      >
        Tu estado de ánimo personalizará tu experiencia
      </motion.p>
    </motion.div>
  );
}
