import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Save, Trash2, Send } from 'lucide-react';

interface FreeWritingScreenProps {
  onBack: () => void;
  moodColors: string[];
}

export function FreeWritingScreen({ onBack, moodColors }: FreeWritingScreenProps) {
  const [text, setText] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);
  const [sentMessage, setSentMessage] = useState(false);

  const handleSave = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  const handleSend = () => {
    setSentMessage(true);
    setTimeout(() => setSentMessage(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

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
      <div className="flex items-center justify-between p-6 backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.3)' }}>
        <motion.button
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={onBack}
          className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.5)',
          }}
        >
          <ArrowLeft className="w-5 h-5" style={{ color: '#D4B3D0' }} />
        </motion.button>

        <h1
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.05em',
            fontSize: '1.5rem',
          }}
        >
          Espacio Libre
        </h1>

        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClear}
            className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            <Trash2 className="w-5 h-5" style={{ color: '#D4B3D0' }} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            <Save className="w-5 h-5" style={{ color: '#D4B3D0' }} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSend}
            className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
            style={{
              background: 'rgba(188, 224, 195, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.5)',
            }}
          >
            <Send className="w-5 h-5" style={{ color: '#FFFFFF' }} />
          </motion.button>
        </div>
      </div>

      {/* Writing Area */}
      <div className="flex-1 p-6 overflow-hidden">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="h-full rounded-3xl overflow-hidden backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe libremente tus pensamientos, emociones, sueños..."
            className="w-full h-full p-6 bg-transparent resize-none outline-none"
            style={{
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.02em',
              fontSize: '1.1rem',
              lineHeight: '1.8',
            }}
          />
        </motion.div>
      </div>

      {/* Saved Message */}
      {savedMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-sm"
          style={{
            background: 'rgba(188, 224, 195, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p
            style={{
              color: '#FFFFFF',
              fontWeight: 300,
              letterSpacing: '0.03em',
            }}
          >
            ✓ Guardado
          </p>
        </motion.div>
      )}

      {/* Sent Message */}
      {sentMessage && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full backdrop-blur-sm"
          style={{
            background: 'rgba(174, 227, 233, 0.9)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
          }}
        >
          <p
            style={{
              color: '#FFFFFF',
              fontWeight: 300,
              letterSpacing: '0.03em',
            }}
          >
            ✓ Enviado al médico
          </p>
        </motion.div>
      )}

      {/* Character count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-20 right-6 px-4 py-2 rounded-full backdrop-blur-sm"
        style={{
          background: 'rgba(255, 255, 255, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}
      >
        <p
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '0.85rem',
            opacity: 0.7,
          }}
        >
          {text.length} caracteres
        </p>
      </motion.div>
    </motion.div>
  );
}
