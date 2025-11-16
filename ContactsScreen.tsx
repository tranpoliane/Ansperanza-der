import { motion } from 'motion/react';
import { ArrowLeft, Phone, Mail, MapPin, Plus, Stethoscope } from 'lucide-react';
import { useState } from 'react';

interface ContactsScreenProps {
  onBack: () => void;
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  phone: string;
  email: string;
  color: string;
}

export function ContactsScreen({ onBack }: ContactsScreenProps) {
  const [contacts] = useState<Doctor[]>([
    {
      id: 1,
      name: 'Dr. María González',
      specialty: 'Psicología',
      phone: '+34 600 123 456',
      email: 'maria.gonzalez@ejemplo.com',
      color: '#AEE3E9',
    },
    {
      id: 2,
      name: 'Dr. Carlos Ruiz',
      specialty: 'Psiquiatría',
      phone: '+34 600 234 567',
      email: 'carlos.ruiz@ejemplo.com',
      color: '#C9D9F0',
    },
    {
      id: 3,
      name: 'Dra. Ana Martínez',
      specialty: 'Terapia Cognitiva',
      phone: '+34 600 345 678',
      email: 'ana.martinez@ejemplo.com',
      color: '#86BCA1',
    },
  ]);

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
          Contactos Médicos
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.5)'
          }}
        >
          <Plus className="w-5 h-5" style={{ color: '#86BCA1' }} />
        </motion.button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
          style={{
            color: '#D4B3D0',
            fontWeight: 300,
            letterSpacing: '0.03em',
            fontSize: '0.95rem'
          }}
        >
          Tus profesionales de confianza
        </motion.p>

        <div className="space-y-4 max-w-2xl mx-auto">
          {contacts.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="backdrop-blur-sm rounded-3xl p-6 shadow-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.5)',
              }}
            >
              {/* Header with name and specialty */}
              <div className="flex items-start gap-4 mb-4">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${doctor.color}, rgba(255, 255, 255, 0.8))`,
                    boxShadow: `0 4px 12px ${doctor.color}40`,
                  }}
                >
                  <Stethoscope className="w-6 h-6" style={{ color: '#FFFFFF' }} />
                </motion.div>

                <div className="flex-1">
                  <h3
                    className="mb-1"
                    style={{
                      color: '#D4B3D0',
                      fontWeight: 400,
                      letterSpacing: '0.03em',
                      fontSize: '1.1rem'
                    }}
                  >
                    {doctor.name}
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
                    {doctor.specialty}
                  </p>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <motion.a
                  href={`tel:${doctor.phone}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'rgba(174, 227, 233, 0.2)',
                    border: '1px solid rgba(174, 227, 233, 0.3)',
                  }}
                >
                  <Phone className="w-4 h-4" style={{ color: '#AEE3E9' }} />
                  <span
                    style={{
                      color: '#D4B3D0',
                      fontWeight: 300,
                      fontSize: '0.9rem'
                    }}
                  >
                    {doctor.phone}
                  </span>
                </motion.a>

                <motion.a
                  href={`mailto:${doctor.email}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'rgba(201, 217, 240, 0.2)',
                    border: '1px solid rgba(201, 217, 240, 0.3)',
                  }}
                >
                  <Mail className="w-4 h-4" style={{ color: '#C9D9F0' }} />
                  <span
                    style={{
                      color: '#D4B3D0',
                      fontWeight: 300,
                      fontSize: '0.85rem'
                    }}
                  >
                    {doctor.email}
                  </span>
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Emergency button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 max-w-2xl mx-auto"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-5 rounded-2xl backdrop-blur-sm flex items-center justify-center gap-3"
            style={{
              background: 'linear-gradient(135deg, rgba(251, 213, 217, 0.6), rgba(227, 200, 224, 0.6))',
              border: '1px solid rgba(251, 213, 217, 0.5)',
              boxShadow: '0 4px 16px rgba(251, 213, 217, 0.3)',
            }}
          >
            <Phone className="w-6 h-6" style={{ color: '#FBD5D9' }} />
            <span
              style={{
                color: '#D4B3D0',
                fontWeight: 300,
                letterSpacing: '0.05em',
                fontSize: '1.1rem'
              }}
            >
              Línea de Emergencia 24/7
            </span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
