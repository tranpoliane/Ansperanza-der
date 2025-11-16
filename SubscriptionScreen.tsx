import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CreditCard, Check, Calendar } from 'lucide-react';

interface SubscriptionScreenProps {
  onBack: () => void;
  moodColors: string[];
}

const subscriptionPlans = [
  { id: 'monthly', name: 'Mensual', price: '4.99€', duration: '/mes' },
  { id: 'yearly', name: 'Anual', price: '49.99€', duration: '/año', badge: 'Ahorra 17%' },
];

const paymentMethods = [
  { id: 'card', name: 'Tarjeta de crédito', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: CreditCard },
  { id: 'apple', name: 'Apple Pay', icon: CreditCard },
  { id: 'google', name: 'Google Pay', icon: CreditCard },
];

export function SubscriptionScreen({ onBack, moodColors }: SubscriptionScreenProps) {
  const [selectedPlan, setSelectedPlan] = useState('yearly');
  const primaryColor = moodColors[0] || '#AEE3E9';
  const secondaryColor = moodColors[1] || '#C9D9F0';

  // Mock data - utilisateur abonné
  const subscriptionStartDate = '15 de septiembre, 2025';
  const daysSubscribed = 51;

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
          Suscripción
        </h1>

        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Current Subscription */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="rounded-3xl p-6 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(188, 224, 195, 0.5)' }}>
              <Check className="w-6 h-6" style={{ color: '#86BCA1' }} />
            </div>
            <div>
              <h2 style={{ color: '#D4B3D0', fontSize: '1.1rem', fontWeight: 400 }}>
                Suscripción Activa
              </h2>
              <p style={{ color: '#D4B3D0', fontSize: '0.85rem', fontWeight: 300, opacity: 0.7 }}>
                Plan Anual
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: '#D4B3D0', opacity: 0.6 }} />
              <p style={{ color: '#D4B3D0', fontSize: '0.85rem', fontWeight: 300 }}>
                Desde: {subscriptionStartDate}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-4 h-4 rounded-full"
                style={{ background: '#BCE0C3' }}
              />
              <p style={{ color: '#D4B3D0', fontSize: '0.85rem', fontWeight: 300 }}>
                {daysSubscribed} días contigo
              </p>
            </div>
          </div>
        </motion.div>

        {/* Subscription Plans */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h3 style={{ color: '#D4B3D0', fontSize: '0.95rem', fontWeight: 400, letterSpacing: '0.03em', paddingLeft: '0.5rem' }}>
            Planes Disponibles
          </h3>
          {subscriptionPlans.map((plan, index) => (
            <motion.button
              key={plan.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPlan(plan.id)}
              className="w-full rounded-2xl p-5 backdrop-blur-sm text-left relative"
              style={{
                background: selectedPlan === plan.id 
                  ? 'rgba(188, 224, 195, 0.7)' 
                  : 'rgba(255, 255, 255, 0.6)',
                border: selectedPlan === plan.id 
                  ? '2px solid rgba(134, 188, 161, 0.8)' 
                  : '1px solid rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              }}
            >
              {plan.badge && (
                <div 
                  className="absolute -top-2 -right-2 px-3 py-1 rounded-full"
                  style={{
                    background: '#FBD5D9',
                    fontSize: '0.7rem',
                    fontWeight: 400,
                    color: '#FFFFFF',
                  }}
                >
                  {plan.badge}
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h4 style={{ color: '#D4B3D0', fontSize: '1rem', fontWeight: 400 }}>
                    {plan.name}
                  </h4>
                  <p style={{ color: '#D4B3D0', fontSize: '0.8rem', fontWeight: 300, opacity: 0.7 }}>
                    {plan.duration}
                  </p>
                </div>
                <div className="text-right">
                  <p style={{ color: '#D4B3D0', fontSize: '1.5rem', fontWeight: 400 }}>
                    {plan.price}
                  </p>
                </div>
              </div>
              {selectedPlan === plan.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-5 right-5 w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: '#86BCA1' }}
                >
                  <Check className="w-4 h-4" style={{ color: '#FFFFFF' }} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Payment Methods */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-3"
        >
          <h3 style={{ color: '#D4B3D0', fontSize: '0.95rem', fontWeight: 400, letterSpacing: '0.03em', paddingLeft: '0.5rem' }}>
            Métodos de Pago
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods.map((method, index) => (
              <motion.button
                key={method.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-2xl p-4 backdrop-blur-sm flex flex-col items-center justify-center gap-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                }}
              >
                <method.icon className="w-6 h-6" style={{ color: '#D4B3D0' }} />
                <p style={{ color: '#D4B3D0', fontSize: '0.75rem', fontWeight: 300 }}>
                  {method.name}
                </p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="rounded-2xl p-4 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}
        >
          <p
            className="text-center italic"
            style={{
              color: '#D4B3D0',
              fontWeight: 300,
              letterSpacing: '0.03em',
              fontSize: '0.75rem',
              opacity: 0.8,
            }}
          >
            Cancela en cualquier momento. Renovación automática.
          </p>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>
    </motion.div>
  );
}
