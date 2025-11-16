import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, TrendingDown, AlertCircle, Smile, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell } from 'recharts';

interface ProgressScreenProps {
  onBack: () => void;
  moodColors: string[];
}

// Données mock pour démonstration
const mockAnxietyLog = [
  { date: '2025-11-04', level: 'low', duration: 15 },
  { date: '2025-11-02', level: 'medium', duration: 30 },
  { date: '2025-10-30', level: 'low', duration: 10 },
  { date: '2025-10-27', level: 'high', duration: 45 },
  { date: '2025-10-24', level: 'medium', duration: 25 },
];

const mockUsageStats = {
  totalTime: '12h 34min',
  weeklyAverage: '1h 47min',
  mostUsedFeature: 'Respiración Guiada',
  streak: 7,
  lastAnxietyCrisis: '2 días',
};

// Données pour le graphique hebdomadaire
const weeklyData = [
  { day: 'Lun', time: 85, crises: 1 },
  { day: 'Mar', time: 110, crises: 0 },
  { day: 'Mié', time: 95, crises: 2 },
  { day: 'Jue', time: 120, crises: 0 },
  { day: 'Vie', time: 75, crises: 1 },
  { day: 'Sáb', time: 140, crises: 0 },
  { day: 'Dom', time: 90, crises: 1 },
];

export function ProgressScreen({ onBack, moodColors }: ProgressScreenProps) {
  const [selectedMonth, setSelectedMonth] = useState('noviembre');
  
  const primaryColor = moodColors[0] || '#AEE3E9';
  const secondaryColor = moodColors[1] || '#C9D9F0';

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return '#BCE0C3';
      case 'medium':
        return '#FBD5D9';
      case 'high':
        return '#F9BFCA';
      default:
        return '#D4B3D0';
    }
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'low':
        return 'Leve';
      case 'medium':
        return 'Moderada';
      case 'high':
        return 'Alta';
      default:
        return '';
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
          Mi Progreso
        </h1>

        <div className="w-10" />
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl p-4 backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(188, 224, 195, 0.5)' }}>
                <Smile className="w-4 h-4" style={{ color: '#86BCA1' }} />
              </div>
              <span style={{ color: '#D4B3D0', fontSize: '0.75rem', fontWeight: 300, opacity: 0.8 }}>
                Racha
              </span>
            </div>
            <p style={{ color: '#D4B3D0', fontSize: '1.3rem', fontWeight: 400 }}>
              {mockUsageStats.streak} días
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl p-4 backdrop-blur-sm"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(174, 227, 233, 0.5)' }}>
                <Clock className="w-4 h-4" style={{ color: '#AEE3E9' }} />
              </div>
              <span style={{ color: '#D4B3D0', fontSize: '0.75rem', fontWeight: 300, opacity: 0.8 }}>
                Tiempo total
              </span>
            </div>
            <p style={{ color: '#D4B3D0', fontSize: '1.3rem', fontWeight: 400 }}>
              {mockUsageStats.totalTime}
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl p-4 backdrop-blur-sm col-span-2"
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(251, 213, 217, 0.5)' }}>
                <TrendingDown className="w-4 h-4" style={{ color: '#FBD5D9' }} />
              </div>
              <span style={{ color: '#D4B3D0', fontSize: '0.75rem', fontWeight: 300, opacity: 0.8 }}>
                Última crisis de ansiedad
              </span>
            </div>
            <p style={{ color: '#D4B3D0', fontSize: '1.3rem', fontWeight: 400 }}>
              Hace {mockUsageStats.lastAnxietyCrisis}
            </p>
          </motion.div>
        </div>

        {/* Anxiety Log Calendar */}
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
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5" style={{ color: '#D4B3D0' }} />
            <h2 style={{ color: '#D4B3D0', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.03em' }}>
              Registro de Ansiedad
            </h2>
          </div>

          <div className="space-y-3">
            {mockAnxietyLog.map((entry, index) => (
              <motion.div
                key={entry.date}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(255, 255, 255, 0.6)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: getLevelColor(entry.level) }}
                  />
                  <div>
                    <p style={{ color: '#D4B3D0', fontSize: '0.85rem', fontWeight: 400 }}>
                      {new Date(entry.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                    </p>
                    <p style={{ color: '#D4B3D0', fontSize: '0.75rem', fontWeight: 300, opacity: 0.7 }}>
                      {getLevelLabel(entry.level)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p style={{ color: '#D4B3D0', fontSize: '0.8rem', fontWeight: 300 }}>
                    {entry.duration} min
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="rounded-3xl p-5 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5" style={{ color: '#D4B3D0' }} />
            <h2 style={{ color: '#D4B3D0', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.03em' }}>
              Progreso Semanal
            </h2>
          </div>

          <div className="w-full h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212, 179, 208, 0.2)" />
                <XAxis 
                  dataKey="day" 
                  stroke="#D4B3D0" 
                  style={{ fontSize: '0.75rem', fontWeight: 300 }}
                />
                <YAxis 
                  stroke="#D4B3D0" 
                  style={{ fontSize: '0.75rem', fontWeight: 300 }}
                  label={{ value: 'Minutos', angle: -90, position: 'insideLeft', style: { fill: '#D4B3D0', fontSize: '0.75rem' } }}
                />
                <Bar dataKey="time" radius={[8, 8, 0, 0]}>
                  {weeklyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.crises > 0 ? '#FBD5D9' : '#BCE0C3'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: '#BCE0C3' }} />
              <span style={{ color: '#D4B3D0', fontSize: '0.75rem', fontWeight: 300 }}>
                Sin crisis
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ background: '#FBD5D9' }} />
              <span style={{ color: '#D4B3D0', fontSize: '0.75rem', fontWeight: 300 }}>
                Con crisis
              </span>
            </div>
          </div>
        </motion.div>

        {/* Usage Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="rounded-3xl p-5 backdrop-blur-sm"
          style={{
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5" style={{ color: '#D4B3D0' }} />
            <h2 style={{ color: '#D4B3D0', fontSize: '1rem', fontWeight: 400, letterSpacing: '0.03em' }}>
              Resumen Semanal
            </h2>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span style={{ color: '#D4B3D0', fontSize: '0.85rem', fontWeight: 300 }}>
                Promedio semanal
              </span>
              <span style={{ color: '#D4B3D0', fontSize: '0.9rem', fontWeight: 400 }}>
                {mockUsageStats.weeklyAverage}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span style={{ color: '#D4B3D0', fontSize: '0.85rem', fontWeight: 300 }}>
                Más utilizado
              </span>
              <span style={{ color: '#D4B3D0', fontSize: '0.9rem', fontWeight: 400 }}>
                {mockUsageStats.mostUsedFeature}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-4" />
      </div>

      {/* Info text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
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
          Tus datos son privados y seguros
        </p>
      </motion.div>
    </motion.div>
  );
}
