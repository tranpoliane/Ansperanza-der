import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Volume2, Check, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SoundRecognitionGameProps {
  onBack: () => void;
}

interface SoundOption {
  id: string;
  name: string;
  emoji: string;
  color: string;
}

const soundOptions: SoundOption[] = [
  { id: 'rain', name: 'Lluvia', emoji: '🌧️', color: '#AEE3E9' },
  { id: 'wind', name: 'Viento', emoji: '💨', color: '#C9D9F0' },
  { id: 'fire', name: 'Fuego', emoji: '🔥', color: '#FBD5D9' },
  { id: 'ocean', name: 'Olas', emoji: '🌊', color: '#86BCA1' },
];

export function SoundRecognitionGame({ onBack }: SoundRecognitionGameProps) {
  const [currentSound, setCurrentSound] = useState<SoundOption | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const playSound = () => {
    // Select a random sound
    const randomSound = soundOptions[Math.floor(Math.random() * soundOptions.length)];
    setCurrentSound(randomSound);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setIsPlaying(true);
    setRound(round + 1);

    // Simulate sound playing for 2 seconds
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  const handleAnswer = (soundId: string) => {
    if (!currentSound || selectedAnswer) return;

    setSelectedAnswer(soundId);
    const correct = soundId === currentSound.id;
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }

    // Auto-advance to next round after 2 seconds
    setTimeout(() => {
      playSound();
    }, 2000);
  };

  useEffect(() => {
    // Start first round
    playSound();
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

        <div className="flex-1 text-center">
          <h2 
            className="text-2xl mb-1"
            style={{ 
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.05em'
            }}
          >
            Encuentra el sonido
          </h2>
          <p
            style={{
              color: '#D4B3D0',
              fontWeight: 300,
              fontSize: '0.9rem',
              opacity: 0.7
            }}
          >
            Ronda {round} • Puntos: {score}
          </p>
        </div>

        <div className="w-12" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 gap-8">
        {/* Sound playing indicator */}
        <motion.div
          className="relative w-32 h-32 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="playing"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.6, 1],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <Volume2 className="w-16 h-16" style={{ color: '#D4B3D0' }} />
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="waiting"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Volume2 className="w-16 h-16" style={{ color: '#D4B3D0', opacity: 0.3 }} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Ripple effect when playing */}
          {isPlaying && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid #D4B3D0',
                }}
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  border: '2px solid #D4B3D0',
                }}
                animate={{
                  scale: [1, 1.5],
                  opacity: [0.5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                  delay: 0.5,
                }}
              />
            </>
          )}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '1rem'
          }}
        >
          {isPlaying ? 'Escucha el sonido...' : '¿Qué sonido escuchaste?'}
        </motion.p>

        {/* Answer options */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {soundOptions.map((sound, index) => {
            const isSelected = selectedAnswer === sound.id;
            const isCurrentSound = currentSound?.id === sound.id;
            const showResult = selectedAnswer !== null;

            return (
              <motion.button
                key={sound.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={!selectedAnswer ? { scale: 1.05, y: -4 } : {}}
                whileTap={!selectedAnswer ? { scale: 0.95 } : {}}
                onClick={() => handleAnswer(sound.id)}
                disabled={selectedAnswer !== null}
                className="relative aspect-square rounded-3xl backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-4"
                style={{
                  background: isSelected
                    ? showResult && isCorrect
                      ? `linear-gradient(135deg, ${sound.color}80, rgba(134, 188, 161, 0.6))`
                      : showResult && !isCorrect
                      ? `linear-gradient(135deg, ${sound.color}80, rgba(251, 213, 217, 0.6))`
                      : `linear-gradient(135deg, ${sound.color}80, rgba(255, 255, 255, 0.6))`
                    : 'rgba(255, 255, 255, 0.5)',
                  border: isSelected
                    ? showResult && isCorrect
                      ? '2px solid #86BCA1'
                      : showResult && !isCorrect
                      ? '2px solid #FBD5D9'
                      : `2px solid ${sound.color}`
                    : '1px solid rgba(255, 255, 255, 0.5)',
                  boxShadow: isSelected
                    ? `0 8px 24px ${sound.color}40`
                    : '0 4px 12px rgba(0, 0, 0, 0.05)',
                  cursor: selectedAnswer ? 'default' : 'pointer',
                }}
              >
                {/* Emoji */}
                <span className="text-5xl mb-1">{sound.emoji}</span>

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

                {/* Result indicator */}
                {showResult && (
                  <AnimatePresence>
                    {(isSelected && isCorrect) || (!isSelected && isCurrentSound && !isCorrect) ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: isSelected && isCorrect ? '#86BCA1' : sound.color,
                          boxShadow: `0 4px 12px ${isSelected && isCorrect ? '#86BCA1' : sound.color}60`,
                        }}
                      >
                        {isSelected && isCorrect ? (
                          <Check className="w-5 h-5" style={{ color: 'white' }} />
                        ) : (
                          <Volume2 className="w-5 h-5" style={{ color: 'white' }} />
                        )}
                      </motion.div>
                    ) : isSelected && !isCorrect ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          background: '#FBD5D9',
                          boxShadow: '0 4px 12px rgba(251, 213, 217, 0.6)',
                        }}
                      >
                        <X className="w-5 h-5" style={{ color: 'white' }} />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
