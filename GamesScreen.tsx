import { motion } from 'motion/react';
import { ArrowLeft, Lightbulb, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { LightGameScreen } from './LightGameScreen';
import { SoundRecognitionGame } from './SoundRecognitionGame';

interface GamesScreenProps {
  onBack: () => void;
}

type GameMode = 'menu' | 'light' | 'sound';

export function GamesScreen({ onBack }: GamesScreenProps) {
  const [currentGame, setCurrentGame] = useState<GameMode>('menu');

  if (currentGame === 'light') {
    return <LightGameScreen onBack={() => setCurrentGame('menu')} />;
  }

  if (currentGame === 'sound') {
    return <SoundRecognitionGame onBack={() => setCurrentGame('menu')} />;
  }

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
          Juegos Relajantes
        </h2>

        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-4"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '1rem'
          }}
        >
          Elige un juego para relajarte
        </motion.p>

        <div className="w-full max-w-md space-y-5">
          {/* Light Game Card */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentGame('light')}
            className="w-full rounded-3xl backdrop-blur-sm p-8 flex items-center gap-6 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(188, 224, 195, 0.5), rgba(255, 255, 255, 0.5))',
              border: '1px solid rgba(188, 224, 195, 0.5)',
            }}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #BCE0C3, #86BCA1)',
                boxShadow: '0 4px 16px rgba(188, 224, 195, 0.4)',
              }}
            >
              <Lightbulb className="w-8 h-8" style={{ color: '#FFFFFF' }} />
            </motion.div>

            <div className="flex-1 text-left">
              <h3
                className="mb-1"
                style={{
                  color: '#D4B3D0',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  fontSize: '1.3rem'
                }}
              >
                Camino de Luz
              </h3>
              <p
                style={{
                  color: '#D4B3D0',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  fontSize: '0.9rem',
                  opacity: 0.8
                }}
              >
                Ejercita tu memoria visual
              </p>
            </div>

            <div className="text-2xl">✨</div>
          </motion.button>

          {/* Sound Recognition Game Card */}
          <motion.button
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setCurrentGame('sound')}
            className="w-full rounded-3xl backdrop-blur-sm p-8 flex items-center gap-6 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, rgba(174, 227, 233, 0.5), rgba(255, 255, 255, 0.5))',
              border: '1px solid rgba(174, 227, 233, 0.5)',
            }}
          >
            <motion.div
              whileHover={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #AEE3E9, #C9D9F0)',
                boxShadow: '0 4px 16px rgba(174, 227, 233, 0.4)',
              }}
            >
              <Volume2 className="w-8 h-8" style={{ color: '#FFFFFF' }} />
            </motion.div>

            <div className="flex-1 text-left">
              <h3
                className="mb-1"
                style={{
                  color: '#D4B3D0',
                  fontWeight: 400,
                  letterSpacing: '0.03em',
                  fontSize: '1.3rem'
                }}
              >
                Encuentra el sonido
              </h3>
              <p
                style={{
                  color: '#D4B3D0',
                  fontWeight: 300,
                  letterSpacing: '0.02em',
                  fontSize: '0.9rem',
                  opacity: 0.8
                }}
              >
                Entrena tu atención auditiva
              </p>
            </div>

            <div className="text-2xl">🎵</div>
          </motion.button>
        </div>

        {/* Decorative text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '0.85rem',
            opacity: 0.7
          }}
        >
          Juegos diseñados para calmar tu mente
        </motion.p>
      </div>
    </motion.div>
  );
}
