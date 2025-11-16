import { motion } from 'motion/react';
import { ArrowLeft, Trees, Waves, Wind, Flame, Volume2, Podcast } from 'lucide-react';
import { useState } from 'react';

interface SoundsScreenProps {
  onBack: () => void;
}

interface Sound {
  id: string;
  name: string;
  icon: typeof Trees;
  color: string;
}

export function SoundsScreen({ onBack }: SoundsScreenProps) {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const sounds: Sound[] = [
    {
      id: 'forest',
      name: 'Bosque',
      icon: Trees,
      color: '#86BCA1',
    },
    {
      id: 'ocean',
      name: 'Océano',
      icon: Waves,
      color: '#AEE3E9',
    },
    {
      id: 'wind',
      name: 'Viento',
      icon: Wind,
      color: '#C9D9F0',
    },
    {
      id: 'fire',
      name: 'Fuego',
      icon: Flame,
      color: '#FBD5D9',
    },
  ];

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
          <ArrowLeft className="w-5 h-5" style={{ color: '#D4B3D0', opacity: 0.5 }} />
        </motion.button>

        <h2 
          className="text-2xl text-center flex-1"
          style={{ 
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.05em'
          }}
        >
          Sonidos
        </h2>

        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
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
          Elige un sonido relajante
        </motion.p>

        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          {sounds.map((sound, index) => {
            const Icon = sound.icon;
            const isActive = activeSound === sound.id;

            return (
              <motion.button
                key={sound.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveSound(isActive ? null : sound.id)}
                className="relative aspect-square rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-6"
                style={{
                  background: isActive 
                    ? `linear-gradient(135deg, ${sound.color}80, rgba(255, 255, 255, 0.6))`
                    : 'rgba(255, 255, 255, 0.5)',
                  border: isActive
                    ? `2px solid ${sound.color}`
                    : '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: isActive
                    ? `0 8px 24px ${sound.color}40`
                    : '0 4px 12px rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* Icon */}
                <motion.div
                  animate={isActive ? {
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: isActive ? Infinity : 0,
                    ease: 'easeInOut',
                  }}
                >
                  <Icon 
                    className="w-12 h-12" 
                    style={{ color: sound.color }}
                  />
                </motion.div>

                {/* Sound name */}
                <span
                  style={{
                    color: '#D4B3D0',
                    fontWeight: 300,
                    letterSpacing: '0.05em',
                    fontSize: '0.95rem'
                  }}
                >
                  {sound.name}
                </span>

                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: sound.color,
                      boxShadow: `0 4px 12px ${sound.color}60`,
                    }}
                  >
                    <Volume2 className="w-4 h-4" style={{ color: 'white' }} />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Volume slider (shown when a sound is active) */}
        {activeSound && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xs mt-4"
          >
            <div className="flex items-center gap-4 px-6 py-4 rounded-2xl backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
              }}
            >
              <Volume2 className="w-5 h-5" style={{ color: '#D4B3D0' }} />
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="70"
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: 'linear-gradient(to right, #AEE3E9, #C9D9F0, #D4B3D0)',
                  outline: 'none',
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Podcast section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="w-full max-w-md mt-auto mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-8 py-5 rounded-2xl backdrop-blur-sm flex items-center justify-center gap-4"
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            }}
          >
            <Podcast className="w-7 h-7" style={{ color: '#D4B3D0' }} />
            <span
              style={{
                color: '#D4B3D0',
                fontWeight: 300,
                letterSpacing: '0.05em',
                fontSize: '1.1rem'
              }}
            >
              Escuchar Podcasts
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
