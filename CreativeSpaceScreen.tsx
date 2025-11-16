import { motion } from 'motion/react';
import { ArrowLeft, PenLine, Palette } from 'lucide-react';

interface CreativeSpaceScreenProps {
  onBack: () => void;
  onSelectWriting: () => void;
  onSelectDrawing: () => void;
  moodColors: string[];
}

export function CreativeSpaceScreen({ onBack, onSelectWriting, onSelectDrawing, moodColors }: CreativeSpaceScreenProps) {
  const primaryColor = moodColors[0] || '#AEE3E9';
  const secondaryColor = moodColors[1] || '#C9D9F0';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${primaryColor}, ${secondaryColor})`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <ArrowLeft className="w-4 h-4" style={{ color: '#D4B3D0' }} />
        </motion.button>

        <h1
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.05em',
            fontSize: '1.1rem',
          }}
        >
          Espacio Creativo
        </h1>

        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '0.9rem',
            opacity: 0.9,
          }}
        >
          Elige cómo deseas expresarte hoy
        </motion.p>

        {/* Writing Option */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectWriting}
          className="w-full max-w-sm rounded-3xl p-6 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <motion.div
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            <PenLine className="w-8 h-8" style={{ color: '#FFFFFF' }} />
          </motion.div>
          <h3
            className="mb-1"
            style={{
              color: '#D4B3D0',
              fontWeight: 400,
              letterSpacing: '0.03em',
              fontSize: '1.05rem',
            }}
          >
            Escritura Libre
          </h3>
          <p
            style={{
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.02em',
              fontSize: '0.85rem',
              opacity: 0.8,
            }}
          >
            Expresa tus pensamientos y emociones con palabras
          </p>
        </motion.button>

        {/* Drawing Option */}
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring' }}
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelectDrawing}
          className="w-full max-w-sm rounded-3xl p-6 backdrop-blur-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6))',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <motion.div
            animate={{
              rotate: [0, -5, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            <Palette className="w-8 h-8" style={{ color: '#FFFFFF' }} />
          </motion.div>
          <h3
            className="mb-1"
            style={{
              color: '#D4B3D0',
              fontWeight: 400,
              letterSpacing: '0.03em',
              fontSize: '1.05rem',
            }}
          >
            Lienzo Creativo
          </h3>
          <p
            style={{
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.02em',
              fontSize: '0.85rem',
              opacity: 0.8,
            }}
          >
            Dibuja y colorea según tu estado de ánimo
          </p>
        </motion.button>
      </div>

      {/* Info text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="pb-6 px-6"
      >
        <p
          className="text-center italic"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '0.8rem',
            opacity: 0.7,
          }}
        >
          Podrás compartir tu creación con tu médico si lo deseas
        </p>
      </motion.div>
    </motion.div>
  );
}
