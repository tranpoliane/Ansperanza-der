import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Star, Send } from 'lucide-react';

interface FeedbackScreenProps {
  onBack: () => void;
  moodColors: string[];
}

export function FeedbackScreen({ onBack, moodColors }: FeedbackScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const primaryColor = moodColors[0] || '#AEE3E9';
  const secondaryColor = moodColors[1] || '#C9D9F0';

  const handleSubmit = () => {
    if (rating > 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setRating(0);
        setFeedback('');
      }, 3000);
    }
  };

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
          Tu Opinión
        </h1>

        <div className="w-10" />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
        {!submitted ? (
          <>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-center max-w-sm"
              style={{
                color: '#D4B3D0',
                fontWeight: 300,
                letterSpacing: '0.03em',
                fontSize: '1rem',
              }}
            >
              ¿Cómo ha sido tu experiencia con Ansperanza?
            </motion.p>

            {/* Star Rating */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="flex gap-3"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                >
                  <Star
                    className="w-10 h-10"
                    style={{
                      color: (hoveredRating || rating) >= star ? '#FBD5D9' : '#D4B3D0',
                      fill: (hoveredRating || rating) >= star ? '#FBD5D9' : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </motion.button>
              ))}
            </motion.div>

            {/* Feedback Text */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full max-w-md"
            >
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Cuéntanos más sobre tu experiencia... (opcional)"
                rows={6}
                className="w-full rounded-3xl p-5 backdrop-blur-sm resize-none"
                style={{
                  background: 'rgba(255, 255, 255, 0.7)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  color: '#D4B3D0',
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  outline: 'none',
                }}
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              disabled={rating === 0}
              className="px-12 py-4 rounded-full backdrop-blur-sm flex items-center gap-3"
              style={{
                background: rating === 0 
                  ? 'rgba(200, 200, 200, 0.5)' 
                  : 'rgba(188, 224, 195, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                opacity: rating === 0 ? 0.5 : 1,
                cursor: rating === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              <Send className="w-5 h-5" style={{ color: '#FFFFFF' }} />
              <span
                style={{
                  color: '#FFFFFF',
                  fontWeight: 300,
                  letterSpacing: '0.03em',
                  fontSize: '1rem',
                }}
              >
                Enviar Opinión
              </span>
            </motion.button>
          </>
        ) : (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(188, 224, 195, 0.8)',
              }}
            >
              <Star className="w-12 h-12" style={{ color: '#FFFFFF', fill: '#FFFFFF' }} />
            </motion.div>
            <p
              style={{
                color: '#D4B3D0',
                fontWeight: 400,
                letterSpacing: '0.03em',
                fontSize: '1.2rem',
              }}
            >
              ¡Gracias por tu opinión!
            </p>
            <p
              style={{
                color: '#D4B3D0',
                fontWeight: 300,
                letterSpacing: '0.03em',
                fontSize: '0.9rem',
                opacity: 0.8,
              }}
            >
              Tu feedback nos ayuda a mejorar
            </p>
          </motion.div>
        )}
      </div>

      {/* Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
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
          Tus comentarios son confidenciales y anónimos
        </p>
      </motion.div>
    </motion.div>
  );
}
