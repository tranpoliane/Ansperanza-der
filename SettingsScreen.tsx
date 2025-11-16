import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Type, Eye } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
  moodColors: string[];
  dyslexicFont: boolean;
  onToggleDyslexicFont: (enabled: boolean) => void;
  largeFontSize: boolean;
  onToggleLargeFontSize: (enabled: boolean) => void;
}

export function SettingsScreen({ 
  onBack, 
  moodColors, 
  dyslexicFont, 
  onToggleDyslexicFont,
  largeFontSize,
  onToggleLargeFontSize
}: SettingsScreenProps) {
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
          Configuración
        </h1>

        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Accessibility Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-5 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            className="mb-4"
            style={{
              color: '#D4B3D0',
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.03em',
            }}
          >
            Accesibilidad
          </h2>

          {/* Dyslexic Font Option */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div
              className="flex items-center justify-between p-4 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(188, 224, 195, 0.5)',
                  }}
                >
                  <Type className="w-5 h-5" style={{ color: '#86BCA1' }} />
                </div>
                <div>
                  <h3
                    style={{
                      color: '#D4B3D0',
                      fontSize: '0.95rem',
                      fontWeight: 400,
                      marginBottom: '0.25rem',
                    }}
                  >
                    Fuente para dislexia
                  </h3>
                  <p
                    style={{
                      color: '#D4B3D0',
                      fontSize: '0.8rem',
                      fontWeight: 300,
                      opacity: 0.7,
                    }}
                  >
                    Facilita la lectura
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleDyslexicFont(!dyslexicFont)}
                className="relative w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  background: dyslexicFont
                    ? 'linear-gradient(135deg, #BCE0C3, #86BCA1)'
                    : 'rgba(201, 217, 240, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <motion.div
                  animate={{
                    x: dyslexicFont ? 26 : 2,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 rounded-full"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Large Font Option */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div
              className="flex items-center justify-between p-4 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
              }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(174, 227, 233, 0.5)',
                  }}
                >
                  <Eye className="w-5 h-5" style={{ color: '#AEE3E9' }} />
                </div>
                <div>
                  <h3
                    style={{
                      color: '#D4B3D0',
                      fontSize: '0.95rem',
                      fontWeight: 400,
                      marginBottom: '0.25rem',
                    }}
                  >
                    Tamaño de letra grande
                  </h3>
                  <p
                    style={{
                      color: '#D4B3D0',
                      fontSize: '0.8rem',
                      fontWeight: 300,
                      opacity: 0.7,
                    }}
                  >
                    Para facilitar la lectura
                  </p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleLargeFontSize(!largeFontSize)}
                className="relative w-14 h-8 rounded-full transition-all duration-300 flex-shrink-0"
                style={{
                  background: largeFontSize
                    ? 'linear-gradient(135deg, #AEE3E9, #C9D9F0)'
                    : 'rgba(201, 217, 240, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <motion.div
                  animate={{
                    x: largeFontSize ? 26 : 2,
                  }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-6 h-6 rounded-full"
                  style={{
                    background: '#FFFFFF',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                  }}
                />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* General Settings Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="rounded-3xl p-5 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h2
            className="mb-4"
            style={{
              color: '#D4B3D0',
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.03em',
            }}
          >
            General
          </h2>

          <div className="space-y-3">
            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
              }}
            >
              <p
                style={{
                  color: '#D4B3D0',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  opacity: 0.8,
                }}
              >
                Idioma: Español
              </p>
            </div>
            <div
              className="p-4 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.6)',
              }}
            >
              <p
                style={{
                  color: '#D4B3D0',
                  fontSize: '0.85rem',
                  fontWeight: 300,
                  opacity: 0.8,
                }}
              >
                Notificaciones: Activadas
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="p-4 backdrop-blur-sm"
        style={{ background: 'rgba(255, 255, 255, 0.3)' }}
      >
        <p
          className="text-center italic"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '0.75rem',
            opacity: 0.7,
          }}
        >
          Los cambios se aplican inmediatamente
        </p>
      </motion.div>
    </motion.div>
  );
}
