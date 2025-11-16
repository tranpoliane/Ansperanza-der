import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface MotivationalMessageScreenProps {
  mood: string;
  onContinue: () => void;
}

const motivationalMessages: { [key: string]: string } = {
  joyful: 'La alegría es contagiosa. Comparte tu luz con el mundo.',
  calm: 'La calma es un superpoder. Disfruta de este momento de paz.',
  creative: 'La creatividad florece en la serenidad. Deja que fluya libremente.',
  peaceful: 'En la serenidad encuentras tu verdadero yo. Respira profundo.',
  neutral: 'Cada día es una nueva oportunidad. Avanza con confianza.',
  anxious: 'Confía en el tiempo, que suele dar dulces salidas a muchas amargas dificultades.',
  sad: 'Confía en el tiempo, que suele dar dulces salidas a muchas amargas dificultades.',
};

const moodColors: { [key: string]: string[] } = {
  joyful: ['#FBD5D9', '#FFE5E8'],
  calm: ['#AEE3E9', '#C9D9F0'],
  creative: ['#D4B3D0', '#E5D4E3'],
  peaceful: ['#BCE0C3', '#86BCA1'],
  neutral: ['#C9D9F0', '#D4B3D0'],
  anxious: ['#86BCA1', '#AEE3E9'],
};

export function MotivationalMessageScreen({ mood, onContinue }: MotivationalMessageScreenProps) {
  const message = motivationalMessages[mood] || motivationalMessages.calm;
  const colors = moodColors[mood] || moodColors.calm;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center p-8"
      style={{
        background: `linear-gradient(to bottom, ${colors[0]}, ${colors[1]})`,
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10"
        >
          <Sparkles className="w-6 h-6" style={{ color: '#D4B3D0' }} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-32 right-12"
        >
          <Sparkles className="w-5 h-5" style={{ color: '#D4B3D0' }} />
        </motion.div>

        <motion.div
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className="absolute top-1/3 right-16"
        >
          <Sparkles className="w-4 h-4" style={{ color: '#D4B3D0' }} />
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
        className="relative z-10 max-w-md"
      >
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            boxShadow: '0 8px 32px rgba(212, 179, 208, 0.3)',
          }}
        >
          <Sparkles className="w-12 h-12" style={{ color: '#D4B3D0' }} />
        </motion.div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mb-12 px-4"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '1.3rem',
            lineHeight: '1.8',
            fontStyle: 'italic',
          }}
        >
          "{message}"
        </motion.p>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          className="mx-auto flex items-center gap-3 px-10 py-4 rounded-full backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.9)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <span
            style={{
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.03em',
              fontSize: '1rem',
            }}
          >
            Continuar
          </span>
          <ArrowRight className="w-5 h-5" style={{ color: '#D4B3D0' }} />
        </motion.button>
      </motion.div>

      {/* Subtle bottom text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 text-center italic"
        style={{
          color: '#D4B3D0',
          fontWeight: 300,
          letterSpacing: '0.03em',
          fontSize: '0.85rem',
          opacity: 0.6,
        }}
      >
        Ansperanza está contigo
      </motion.p>
    </motion.div>
  );
}
