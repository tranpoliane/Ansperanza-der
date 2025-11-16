import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Info, Settings, HelpCircle, Palette, CreditCard, User, MessageSquare } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToPersonalization?: () => void;
  onNavigateToSubscription?: () => void;
  onNavigateToFeedback?: () => void;
  onNavigateToSettings?: () => void;
}

export function MenuDrawer({ 
  isOpen, 
  onClose, 
  onNavigateToPersonalization,
  onNavigateToSubscription,
  onNavigateToFeedback,
  onNavigateToSettings
}: MenuDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 z-40"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 bottom-0 z-50 w-72 overflow-y-auto"
            style={{
              background: 'linear-gradient(to bottom, rgba(174, 227, 233, 0.95), rgba(201, 217, 240, 0.95))',
              backdropFilter: 'blur(20px)',
              boxShadow: '4px 0 24px rgba(0, 0, 0, 0.1)',
            }}
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: 'rgba(212, 179, 208, 0.2)' }}>
              <h2
                className="text-2xl"
                style={{
                  color: '#D4B3D0',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                }}
              >
                Ansperanza
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full backdrop-blur-sm flex items-center justify-center"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <X className="w-5 h-5" style={{ color: '#D4B3D0' }} />
              </motion.button>
            </div>

            {/* User Profile Section */}
            <div className="p-4 border-b" style={{ borderColor: 'rgba(212, 179, 208, 0.2)' }}>
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #AEE3E9, #C9D9F0)',
                    border: '2px solid rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <User className="w-7 h-7" style={{ color: '#D4B3D0' }} />
                </div>
                <div className="flex-1">
                  <h3
                    className="mb-0.5"
                    style={{
                      color: '#D4B3D0',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      fontSize: '1.1rem',
                    }}
                  >
                    María García
                  </h3>
                  <p
                    style={{
                      color: '#D4B3D0',
                      fontWeight: 300,
                      letterSpacing: '0.02em',
                      fontSize: '0.85rem',
                      opacity: 0.7,
                    }}
                  >
                    28 años
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-2">
              {/* Subscription/Payment Button - Featured */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onNavigateToSubscription?.();
                  onClose();
                }}
                className="w-full rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(188, 224, 195, 0.8), rgba(134, 188, 161, 0.8))',
                  border: '1px solid rgba(188, 224, 195, 0.5)',
                  boxShadow: '0 4px 12px rgba(188, 224, 195, 0.3)',
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #BCE0C3, #86BCA1)',
                    boxShadow: '0 4px 12px rgba(188, 224, 195, 0.4)',
                  }}
                >
                  <CreditCard className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                </motion.div>
                <div className="flex-1 text-left">
                  <h3
                    className="mb-1"
                    style={{
                      color: '#D4B3D0',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      fontSize: '1.1rem',
                    }}
                  >
                    Mi Suscripción
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
                    Premium activo
                  </p>
                </div>
              </motion.button>

              {/* Donation Button */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl p-5 flex items-center gap-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 213, 217, 0.8), rgba(212, 179, 208, 0.8))',
                  border: '1px solid rgba(251, 213, 217, 0.5)',
                  boxShadow: '0 4px 12px rgba(251, 213, 217, 0.3)',
                }}
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FBD5D9, #D4B3D0)',
                    boxShadow: '0 4px 12px rgba(251, 213, 217, 0.4)',
                  }}
                >
                  <Heart className="w-6 h-6" style={{ color: '#FFFFFF' }} fill="#FFFFFF" />
                </motion.div>
                <div className="flex-1 text-left">
                  <h3
                    className="mb-1"
                    style={{
                      color: '#D4B3D0',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      fontSize: '1.1rem',
                    }}
                  >
                    Apoyar Ansperanza
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
                    Haz una donación
                  </p>
                </div>
              </motion.button>

              {/* Personalization Option */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onNavigateToPersonalization?.();
                  onClose();
                }}
                className="w-full rounded-2xl p-4 flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(251, 213, 217, 0.4)',
                  }}
                >
                  <Palette className="w-5 h-5" style={{ color: '#D4B3D0' }} />
                </div>
                <span
                  style={{
                    color: '#D4B3D0',
                    fontWeight: 300,
                    letterSpacing: '0.03em',
                  }}
                >
                  Personalización
                </span>
              </motion.button>

              {/* Feedback/Opinion Option */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onNavigateToFeedback?.();
                  onClose();
                }}
                className="w-full rounded-2xl p-4 flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(251, 213, 217, 0.4)',
                  }}
                >
                  <MessageSquare className="w-5 h-5" style={{ color: '#D4B3D0' }} />
                </div>
                <span
                  style={{
                    color: '#D4B3D0',
                    fontWeight: 300,
                    letterSpacing: '0.03em',
                  }}
                >
                  Dar mi Opinión
                </span>
              </motion.button>

              {/* About Option */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl p-4 flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(174, 227, 233, 0.4)',
                  }}
                >
                  <Info className="w-5 h-5" style={{ color: '#D4B3D0' }} />
                </div>
                <span
                  style={{
                    color: '#D4B3D0',
                    fontWeight: 300,
                    letterSpacing: '0.03em',
                  }}
                >
                  Acerca de
                </span>
              </motion.button>

              {/* Settings Option */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onNavigateToSettings?.();
                  onClose();
                }}
                className="w-full rounded-2xl p-4 flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(188, 224, 195, 0.4)',
                  }}
                >
                  <Settings className="w-5 h-5" style={{ color: '#D4B3D0' }} />
                </div>
                <span
                  style={{
                    color: '#D4B3D0',
                    fontWeight: 300,
                    letterSpacing: '0.03em',
                  }}
                >
                  Configuración
                </span>
              </motion.button>

              {/* Help Option */}
              <motion.button
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-2xl p-4 flex items-center gap-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.5)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'rgba(201, 217, 240, 0.4)',
                  }}
                >
                  <HelpCircle className="w-5 h-5" style={{ color: '#D4B3D0' }} />
                </div>
                <span
                  style={{
                    color: '#D4B3D0',
                    fontWeight: 300,
                    letterSpacing: '0.03em',
                  }}
                >
                  Ayuda
                </span>
              </motion.button>
            </div>

            {/* Footer */}
            <div className="p-6 mt-8">
              <p
                className="text-center"
                style={{
                  color: '#D4B3D0',
                  fontWeight: 300,
                  letterSpacing: '0.03em',
                  fontSize: '0.85rem',
                  opacity: 0.7,
                }}
              >
                Versión 1.0.0
              </p>
              <p
                className="text-center mt-2 italic"
                style={{
                  color: '#D4B3D0',
                  fontWeight: 300,
                  letterSpacing: '0.03em',
                  fontSize: '0.8rem',
                  opacity: 0.6,
                }}
              >
                De la ansiedad a la esperanza
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
